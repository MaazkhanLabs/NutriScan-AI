import io
from PIL import Image
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

    def extract_text_from_image(self, image: Image.Image) -> str:
        if not self.reader:
            self.initialize_reader()

        if self.reader:
            try:
                # Convert PIL Image to RGB bytes or array
                buf = io.BytesIO()
                image.save(buf, format="JPEG")
                img_bytes = buf.getvalue()

                # Perform OCR text extraction
                results = self.reader.readtext(img_bytes, detail=0)
                extracted_text = " ".join(results)
                return extracted_text.strip()
            except Exception as e:
                print(f"OCR extraction error: {e}")

        return ""

ocr_service = OCRService()
