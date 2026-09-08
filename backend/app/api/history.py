from fastapi import APIRouter, Depends
from app.core.database import db, get_db

router = APIRouter(prefix="/api/history", tags=["history"])

@router.get("/")
async def history(db_inst=Depends(get_db)):
    scans = await db_inst.fetch_all("SELECT id, detected_food, confidence, calories, health_score, category, created_at FROM food_scans ORDER BY created_at DESC LIMIT 20")
    return {"scans": scans}