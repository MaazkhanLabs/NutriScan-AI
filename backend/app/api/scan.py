from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.core.database import db, get_db
from app.services.food_classifier import FoodClassifier
from app.services.nutrition_service import NutritionService
from app.services.score_service import calculate_health_score
from app.services.recommendation_service import generate_recommendations
from PIL import Image
import io
import uuid
import json
from datetime import datetime

router = APIRouter(prefix="/api/scans", tags=["scans"])

classifier = FoodClassifier(
    model_path="backend/app/ml/model.pth",
    labels_path="backend/app/ml/labels.json"
)
nutrition_service = NutritionService()

@router.post("/analyze")
async def analyze_food(
    file: UploadFile = File(...),
    db_inst=Depends(get_db)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File must be an image"
        )

    image_bytes = await file.read()
    try:
        image = Image.open(io.BytesIO(image_bytes))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file format")

    prediction = classifier.predict(image)
    detected_food = prediction["food_name"]
    confidence = prediction["confidence"]

    nutrition = await nutrition_service.get_nutrition(detected_food)

    if not nutrition:
        nutrition = {
            "calories": 400, "protein_g": 20, "carbs_g": 40, "fat_g": 15,
            "saturated_fat_g": 3.0, "fiber_g": 4, "sugar_g": 5, "sodium_mg": 400
        }

    score_result = calculate_health_score(nutrition)
    recommendations = generate_recommendations(nutrition)

    positives = []
    if nutrition.get("protein_g", 0) >= 20:
        positives.append(f"High in protein ({nutrition['protein_g']}g)")
    if nutrition.get("fiber_g", 0) >= 4:
        positives.append(f"Good source of dietary fiber ({nutrition['fiber_g']}g)")
    if nutrition.get("saturated_fat_g", 0) <= 3:
        positives.append("Low in saturated fat")
    if not positives:
        positives.append("Provides balanced calories for energy")

    warnings = []
    if nutrition.get("sodium_mg", 0) > 600:
        warnings.append(f"High sodium content ({nutrition['sodium_mg']}mg)")
    if nutrition.get("sugar_g", 0) > 12:
        warnings.append(f"High in sugar ({nutrition['sugar_g']}g)")
    if nutrition.get("saturated_fat_g", 0) > 7:
        warnings.append(f"Elevated saturated fat ({nutrition['saturated_fat_g']}g)")

    scan_id = str(uuid.uuid4())

    try:
        await db_inst.execute(
            """INSERT INTO food_scans (id, user_id, detected_food, confidence, calories, protein_g, carbs_g, fat_g, health_score, category, nutrition_json)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)""",
            scan_id, 1, detected_food, confidence,
            nutrition["calories"], nutrition["protein_g"], nutrition["carbs_g"], nutrition["fat_g"],
            score_result["score"], score_result["category"], json.dumps(nutrition)
        )
    except Exception as e:
        print(f"Error saving scan to DB: {e}")

    return {
        "scan_id": scan_id,
        "detected_food": detected_food,
        "confidence": confidence,
        "serving": {
            "name": "medium",
            "grams": 300
        },
        "nutrition": nutrition,
        "health_score": score_result["score"],
        "category": score_result["category"],
        "positives": positives,
        "warnings": warnings,
        "recommendations": recommendations
    }