import io
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageOps
from typing import List, Dict, Any

try:
    import easyocr
    HAS_EASYOCR = True
except ImportError:
    HAS_EASYOCR = False


class OCRService:
    def __init__(self):
        self.reader = None

    def initialize_reader(self):
        if HAS_EASYOCR and not self.reader:
            try:
                print("Initializing EasyOCR Engine for Packaged Food Ingredients...")
                self.reader = easyocr.Reader(['en'], gpu=False)
                print("EasyOCR Engine initialized successfully!")
            except Exception as e:
                print(f"Error initializing EasyOCR: {e}")
                self.reader = None

    def preprocess_image_variants(self, pil_image: Image.Image) -> List[np.ndarray]:
        variants = []
        
        # Ensure RGB
        rgb_img = pil_image.convert("RGB")
        w, h = rgb_img.size

        # 1. Dynamic Upscaling for small images/tiny fonts
        if w < 1600 or h < 1600:
            scale_factor = 2.0
            new_size = (int(w * scale_factor), int(h * scale_factor))
            rgb_img = rgb_img.resize(new_size, Image.Resampling.BICUBIC)

        # Convert PIL to OpenCV BGR array
        open_cv_image = np.array(rgb_img)
        open_cv_image = open_cv_image[:, :, ::-1].copy() # RGB to BGR

        # Variant 1: Enhanced Sharpened RGB Image
        sharpened_pil = ImageEnhance.Sharpness(rgb_img).enhance(2.5)
        contrast_pil = ImageEnhance.Contrast(sharpened_pil).enhance(1.8)
        var1 = np.array(contrast_pil)[:, :, ::-1].copy()
        variants.append(var1)

        # Variant 2: CLAHE (Contrast Limited Adaptive Histogram Equalization) Grayscale
        gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
        var2 = clahe.apply(gray)
        variants.append(var2)

        # Variant 3: Adaptive Thresholding (Crisp Black/White for Low Contrast Labels)
        blurred = cv2.GaussianBlur(gray, (3, 3), 0)
        var3 = cv2.adaptiveThreshold(
            blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
        )
        variants.append(var3)

        return variants

    def normalize_ocr_text(self, raw_text: str) -> str:
        text = raw_text

        # Common OCR Character Corrections for Food Packaging
        corrections = {
            r"\b1ngredients\b": "ingredients",
            r"\bpa1m\b": "palm",
            r"\bpa1mo1ein\b": "palmolein",
            r"\bh1gh\b": "high",
            r"\bfructos\b": "fructose",
            r"\bsyrup\b": "syrup",
            r"\bE[- ]?211\b": "e211",
            r"\bE[- ]?250\b": "e250",
            r"\bE[- ]?621\b": "e621",
            r"\bE[- ]?320\b": "e320",
            r"\bE[- ]?102\b": "e102",
            r"\btrans[- ]?fat\b": "trans fat",
            r"\bmonosod1um\b": "monosodium",
            r"\bglutamat\b": "glutamate",
            r"\bpreservat1ve\b": "preservative",
            r"\bchem1cal\b": "chemical",
        }

        for pattern, replacement in corrections.items():
            import re
            text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

        return text

    def extract_text_from_image(self, image: Image.Image) -> str:
        if not self.reader:
            self.initialize_reader()

        if not self.reader:
            return ""

        all_extracted_lines = []

        try:
            # Generate preprocessed image variants
            variants = self.preprocess_image_variants(image)

            # Multi-Pass OCR Execution
            for idx, img_var in enumerate(variants):
                try:
                    lines = self.reader.readtext(img_var, detail=0, paragraph=False)
                    for line in lines:
                        cleaned = line.strip()
                        if cleaned and len(cleaned) > 2 and cleaned not in all_extracted_lines:
                            all_extracted_lines.append(cleaned)
                except Exception as e:
                    print(f"OCR Pass {idx+1} notice: {e}")

            # Combine and normalize all detected text lines
            combined_text = " ".join(all_extracted_lines)
            normalized = self.normalize_ocr_text(combined_text)
            return normalized.strip()

        except Exception as e:
            print(f"Multi-Pass OCR Pipeline error: {e}")
            return ""

ocr_service = OCRService()
