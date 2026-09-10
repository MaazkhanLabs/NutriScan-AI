from typing import Dict, Any

FRIED_KEYWORDS = [
    "samosa", "vada", "vada pav", "french fries", "fries", "churros", "donut", 
    "chole bhature", "bhature", "pakora", "bhajji", "fried", "deep fried", 
    "spring roll", "pani puri", "bhel puri", "jalebi", "gulab jamun", "poori"
]

REFINED_CARB_KEYWORDS = [
    "samosa", "vada pav", "pav bhaji", "maida", "white bread", "bun", "burger", 
    "chole bhature", "naan", "pizza", "pastry", "cake", "donut", "doughnut"
]

def calculate_health_score(nutrition: Dict[str, Any], food_name: str = "") -> Dict[str, Any]:
    score = 100

    calories = nutrition.get("calories", 0)
    sugar = nutrition.get("sugar_g", 0)
    sodium = nutrition.get("sodium_mg", 0)
    fat = nutrition.get("fat_g", 0)
    saturated_fat = nutrition.get("saturated_fat_g", 0)
    protein = nutrition.get("protein_g", 0)
    fiber = nutrition.get("fiber_g", 0)
    
    fn_lower = food_name.lower() if food_name else ""
    is_fried = nutrition.get("is_deep_fried", False) or any(k in fn_lower for k in FRIED_KEYWORDS)
    is_refined = nutrition.get("is_refined_carbs", False) or any(k in fn_lower for k in REFINED_CARB_KEYWORDS)

    # 1. Deep Frying & Cooking Oil Penalty (-22 pts)
    if is_fried:
        score -= 22

    # 2. Refined Wheat Flour (Maida) / High Glycemic Index Penalty (-12 pts)
    if is_refined:
        score -= 12

    # 3. Fat Calories Ratio Penalty (High Fat foods)
    fat_calories = fat * 9
    if calories > 0 and (fat_calories / calories) > 0.45:
        score -= 12
    elif calories > 0 and (fat_calories / calories) > 0.35:
        score -= 6

    # 4. Calories Penalty
    if calories > 700:
        score -= 15
    elif calories > 500:
        score -= 10
    elif calories > 350:
        score -= 5

    # 5. Sugar Penalty
    if sugar > 20:
        score -= 15
    elif sugar > 12:
        score -= 10
    elif sugar > 5:
        score -= 5

    # 6. Sodium Penalty
    if sodium > 900:
        score -= 15
    elif sodium > 600:
        score -= 10
    elif sodium > 350:
        score -= 5

    # 7. Saturated Fat Penalty
    if saturated_fat > 12:
        score -= 15
    elif saturated_fat > 7:
        score -= 10
    elif saturated_fat > 3:
        score -= 5

    # 8. Protein Bonus
    if protein >= 30:
        score += 10
    elif protein >= 20:
        score += 6
    elif protein >= 10:
        score += 3

    # 9. Fiber Bonus
    if fiber >= 10:
        score += 10
    elif fiber >= 6:
        score += 6
    elif fiber >= 3:
        score += 3

    score = max(0, min(100, score))

    if score >= 85:
        category = "Excellent"
    elif score >= 70:
        category = "Healthy"
    elif score >= 50:
        category = "Moderate"
    elif score >= 30:
        category = "Unhealthy"
    else:
        category = "Very Unhealthy"

    return {"score": score, "category": category}