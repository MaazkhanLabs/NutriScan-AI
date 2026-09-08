from PIL import Image
import io
import torchvision.transforms as transforms

def open_image(file_bytes: bytes) -> Image.Image:
    """Open image from bytes."""
    return Image.open(io.BytesIO(file_bytes))

def preprocess_image(image: Image.Image) -> torch.Tensor:
    """Preprocess image for model inference."""
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])
    return transform(image)

def validate_image(file_bytes: bytes) -> bool:
    """Validate if bytes represent a valid image."""
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img.verify()
        return True
    except Exception:
        return False