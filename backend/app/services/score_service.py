from typing import Dict, Any

def calculate_health_score(nutrition: Dict[str, Any]) -> Dict[str, Any]:
    score = 100

    calories = nutrition.get("calories", 0)
    sugar = nutrition.get("sugar_g", 0)
    sodium = nutrition.get("sodium_mg", 0)
    saturated_fat = nutrition.get("saturated_fat_g", 0)
    protein = nutrition.get("protein_g", 0)
    fiber = nutrition.get("fiber_g", 0)

    # Calories penalty
    if calories > 700:
        score -= 15
    elif calories > 500:
        score -= 10
    elif calories > 300:
        score -= 5

    # Sugar penalty
    if sugar > 20:
        score -= 15
    elif sugar > 12:
        score -= 10
    elif sugar > 5:
        score -= 5

    # Sodium penalty
    if sodium > 900:
        score -= 15
    elif sodium > 600:
        score -= 10
    elif sodium > 300:
        score -= 5

    # Saturated fat penalty
    if saturated_fat > 12:
        score -= 15
    elif saturated_fat > 7:
        score -= 10
    elif saturated_fat > 3:
        score -= 5

    # Protein bonus
    if protein >= 30:
        score += 10
    elif protein >= 20:
        score += 6
    elif protein >= 10:
        score += 3

    # Fiber bonus
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