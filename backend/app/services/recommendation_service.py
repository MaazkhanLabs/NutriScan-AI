from typing import List, Dict, Any

def generate_recommendations(nutrition: Dict[str, Any]) -> List[str]:
    recommendations = []
    
    if nutrition.get("sodium_mg", 0) > 600:
        recommendations.append(
            "Reduce salt or choose a lower-sodium version."
        )
    
    if nutrition.get("fiber_g", 0) < 3:
        recommendations.append(
            "Add vegetables, fruit, or whole grains for more fiber."
        )
    
    if nutrition.get("protein_g", 0) < 10:
        recommendations.append(
            "Add a protein source such as dal, eggs, paneer or lean meat."
        )
    
    if nutrition.get("sugar_g", 0) > 12:
        recommendations.append(
            "Reduce added sugar or choose an unsweetened alternative."
        )
    
    return recommendations