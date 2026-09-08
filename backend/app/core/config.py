import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost/nutriscan")
    CLOUDINARY_URL: str = os.getenv("CLOUDINARY_URL", "")
    ML_MODEL_PATH: str = os.getenv("ML_MODEL_PATH", "backend/app/ml/model.pth")
    LABELS_PATH: str = os.getenv("LABELS_PATH", "backend/app/ml/labels.json")
    NUTRITION_API_KEY: str = os.getenv("NUTRITION_API_KEY", "")
    CORS_ORIGINS: list = ["http://localhost:3000", "http://127.0.0.1:3000"]

settings = Settings()