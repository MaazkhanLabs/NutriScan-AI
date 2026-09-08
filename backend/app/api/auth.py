from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from app.core.database import db, get_db
from app.core.security import create_access_token, decode_access_token
from app.schemas.user import UserCreate, UserLogin
from passlib.context import CryptContext
from typing import Optional

router = APIRouter(prefix="/api/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
async def register(user_data: UserCreate, db_inst=Depends(get_db)):
    existing = await db_inst.fetch_one(
        "SELECT id FROM users WHERE email = $1", user_data.email
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = pwd_context.hash(user_data.password)

    user_id = await db_inst.fetch_val(
        """INSERT INTO users (name, email, password_hash, goal)
           VALUES ($1, $2, $3, $4)
           RETURNING id""",
        user_data.name, user_data.email, hashed_password, user_data.goal or "General Health"
    )

    access_token = create_access_token(
        subject=str(user_id or 1),
        expires_delta=timedelta(minutes=60*24)
    )

    return {"access_token": access_token, "token_type": "bearer", "user": {"id": user_id, "name": user_data.name, "email": user_data.email}}

@router.post("/login")
async def login(credentials: UserLogin, db_inst=Depends(get_db)):
    user = await db_inst.fetch_one(
        "SELECT id, name, email, password_hash, goal FROM users WHERE email = $1", credentials.email
    )

    if not user or not pwd_context.verify(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    access_token = create_access_token(subject=str(user["id"]))

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "goal": user.get("goal", "")
        }
    }

@router.get("/me")
async def me(token: str, db_inst=Depends(get_db)):
    payload = decode_access_token(token)
    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    user = await db_inst.fetch_one(
        "SELECT id, name, email, goal FROM users WHERE id = $1", int(user_id)
    )

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"id": user["id"], "name": user["name"], "email": user["email"], "goal": user.get("goal")}