from pydantic import BaseModel, Field
from typing import Optional

class FoodItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=150)
    serving_size_g: float = Field(default=100.0, ge=1.0)
    calories: float = Field(default=0.0, ge=0)
    protein_g: float = Field(default=0.0, ge=0)
    carbs_g: float = Field(default=0.0, ge=0)
    fat_g: float = Field(default=0.0, ge=0)
    saturated_fat_g: float = Field(default=0.0, ge=0)
    fiber_g: float = Field(default=0.0, ge=0)
    sugar_g: float = Field(default=0.0, ge=0)
    sodium_mg: float = Field(default=0.0, ge=0)

class FoodItemResponse(FoodItemCreate):
    id: int
    
    class Config:
        from_attributes = True

class ScanCreate(BaseModel):
    user_id: str = Field(..., regex="^[0-9a-f-]{36}$")
    detected_food: str = Field(..., min_length=1, max_length=150)
    confidence: float = Field(default=0.0, ge=0, le=1)
    serving_multiplier: float = Field(default=1.0, ge=0.1, le=3.0)
    calories: float = Field(default=0.0, ge=0)
    protein_g: float = Field(default=0.0, ge=0)
    carbs_g: float = Field(default=0.0, ge=0)
    fat_g: float = Field(default=0.0, ge=0)
    fiber_g: float = Field(default=0.0, ge=0)
    sugar_g: float = Field(default=0.0, ge=0)
    sodium_mg: float = Field(default=0.0, ge=0)
    health_score: int = Field(default=0)
    score_category: Optional[str] = None

class ScanResponse(ScanCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    
    class Config:
        from_attributes = True