from fastapi import APIRouter, Query, Depends
from app.core.database import db, get_db

router = APIRouter(prefix="/api/foods", tags=["foods"])

@router.get("/search")
async def search(q: str = Query(...), db_inst=Depends(get_db)):
    results = await db_inst.fetch_all(
        "SELECT id, name, calories FROM food_items WHERE name LIKE $1 LIMIT 10",
        f"%{q}%"
    )
    return {"results": results}