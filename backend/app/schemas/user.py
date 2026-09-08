from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid
import uuid as uuid_module

def generate_id():
    return str(uuid_module.uuid4())

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=5, max_length=255)
    password: str = Field(..., min_length=6)
    goal: Optional[str] = None

class UserLogin(BaseModel):
    email: str = Field(..., min_length=5, max_length=255)
    password: str

class UserResponse(BaseModel):
    id: str = Field(default_factory=generate_id)
    name: str
    email: str
    goal: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True