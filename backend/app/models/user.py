import uuid
from sqlalchemy import Column, String, Float, Integer, DateTime, UUID, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    age = Column(Integer)
    height_cm = Column(Float)
    weight_kg = Column(Float)
    goal = Column(String(50))
    created_at = Column(DateTime, default=func.now())

class FoodItemModel(Base):
    __tablename__ = "food_items"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(150), unique=True, nullable=False)
    serving_size_g = Column(Float, default=100.0)
    calories = Column(Float, default=0.0)
    protein_g = Column(Float, default=0.0)
    carbs_g = Column(Float, default=0.0)
    fat_g = Column(Float, default=0.0)
    saturated_fat_g = Column(Float, default=0.0)
    fiber_g = Column(Float, default=0.0)
    sugar_g = Column(Float, default=0.0)
    sodium_mg = Column(Float, default=0.0)

class FoodScanModel(Base):
    __tablename__ = "food_scans"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    image_url = Column(String, nullable=False)
    detected_food = Column(String(150))
    confidence = Column(Float, default=0.0)
    serving_multiplier = Column(Float, default=1.0)
    calories = Column(Float, default=0.0)
    protein_g = Column(Float, default=0.0)
    carbs_g = Column(Float, default=0.0)
    fat_g = Column(Float, default=0.0)
    fiber_g = Column(Float, default=0.0)
    sugar_g = Column(Float, default=0.0)
    sodium_mg = Column(Float, default=0.0)
    health_score = Column(Integer, default=0)
    score_category = Column(String(50))
    created_at = Column(DateTime, default=func.now())