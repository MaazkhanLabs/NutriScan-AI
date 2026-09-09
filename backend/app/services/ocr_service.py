import io
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
                self.reader = easyocr.Reader(['en'], gpu=False, verbose=False)
                print("EasyOCR Engine initialized successfully!")
            except Exception as e:
                print(f"Error initializing EasyOCR: {e}")
                self.reader = None

    def preprocess_fast_image(self, pil_image: Image.Image) -> np.ndarray:
        # Convert to RGB
        rgb_img = pil_image.convert("RGB")
        
        # 1. Cap maximum image dimensions for lightning fast CPU OCR (max 1000px)
        rgb_img.thumbnail((1000, 1000), Image.Resampling.LANCZOS)

        # 2. Sharpen & Enhance Contrast for clear text recognition
        sharpened = ImageEnhance.Sharpness(rgb_img).enhance(2.0)
        contrast = ImageEnhance.Contrast(sharpened).enhance(1.6)

        # 3. Convert to numpy array for EasyOCR
        img_np = np.array(contrast)
        return img_np

    def normalize_ocr_text(self, raw_text: str) -> str:
        text = raw_text

        # Common OCR Character Corrections for Food Packaging
        corrections = {
            r"\b1ngredients\b": "ingredients",
            r"\b1ngred1ents\b": "ingredients",
            r"\bingred1ents\b": "ingredients",
            r"\bpa1m\b": "palm",
            r"\bpa1mo1ein\b": "palmolein",
            r"\bpalmole1n\b": "palmolein",
            r"\bh1gh\b": "high",
            r"\bfructos\b": "fructose",
            r"\bsyrup\b": "syrup",
            r"\bE[- ]?211\b": "e211",
            r"\bE[- ]?250\b": "e250",
            r"\bE[- ]?621\b": "e621",
            r"\bE[- ]?320\b": "e320",
            r"\bE[- ]?319\b": "e319",
            r"\bE[- ]?102\b": "e102",
            r"\bINS[- ]?\(?621\)?\b": "ins 621",
            r"\bINS[- ]?\(?211\)?\b": "ins 211",
            r"\bINS[- ]?\(?319\)?\b": "ins 319",
            r"\bINS[- ]?\(?320\)?\b": "ins 320",
            r"\bINS[- ]?\(?250\)?\b": "ins 250",
            r"\bINS[- ]?\(?407\)?\b": "ins 407",
            r"\btrans[- ]?fat\b": "trans fat",
            r"\bmonosod1um\b": "monosodium",
            r"\bglutamat\b": "glutamate",
            r"\bpreservat1ve\b": "preservative",
            r"\bchem1cal\b": "chemical",
        }

        import re
        for pattern, replacement in corrections.items():
            text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

        return text

    def extract_text_from_image(self, image: Image.Image) -> str:
        if not self.reader:
            self.initialize_reader()

        if not self.reader:
            return ""

        try:
            # Single fast optimal image pass (takes 2-3 seconds on CPU)
            img_np = self.preprocess_fast_image(image)
            lines = self.reader.readtext(img_np, detail=0, paragraph=False, batch_size=4)

            combined_text = " ".join(lines)
            normalized = self.normalize_ocr_text(combined_text)
            return normalized.strip()

        except Exception as e:
            print(f"Fast OCR Pipeline error: {e}")
            return ""

ocr_service = OCRService()
