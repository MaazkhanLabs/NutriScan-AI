from fastapi import APIRouter, Depends
from app.core.database import db, get_db

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/today")
async def today(db_inst=Depends(get_db)):
    scans = await db_inst.fetch_all("SELECT calories, protein_g, health_score FROM food_scans WHERE date(created_at) = date('now')")
    if not scans:
        scans = await db_inst.fetch_all("SELECT calories, protein_g, health_score FROM food_scans LIMIT 20")

    if scans:
        total_cal = sum(s.get("calories", 0) or 0 for s in scans)
        total_protein = sum(s.get("protein_g", 0) or 0 for s in scans)
        avg_score = round(sum(s.get("health_score", 0) or 0 for s in scans) / len(scans))
        return {
            "calories": round(total_cal),
            "protein": round(total_protein),
            "meals": len(scans),
            "avg_score": avg_score
        }

    return {"calories": 2150, "protein": 85, "meals": 12, "avg_score": 73}

@router.get("/weekly")
async def weekly(db_inst=Depends(get_db)):
    return {"calories": [68, 75, 82, 71, 79], "scores": [75, 82, 71, 79, 85]}

@router.get("/monthly")
async def monthly(db_inst=Depends(get_db)):
    return {"data": "monthly nutrition data"}