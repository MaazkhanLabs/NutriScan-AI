import re
from typing import Dict, List, Any

# Comprehensive Dictionary of Packaged Food Additives & Ingredients
HARMFUL_INGREDIENTS = [
    {
        "pattern": r"\b(palm oil|palmolein|palm kernel oil)\b",
        "name": "Palm Oil / Palmolein",
        "category": "Unhealthy Saturated Fat",
        "risk_level": "High",
        "penalty": 15,
        "explanation": "High in saturated fatty acids; frequent consumption increases LDL cholesterol and cardiovascular risk."
    },
    {
        "pattern": r"\b(high fructose corn syrup|hfcs|corn syrup)\b",
        "name": "High Fructose Corn Syrup (HFCS)",
        "category": "Refined Sugar",
        "risk_level": "High",
        "penalty": 15,
        "explanation": "Causes rapid blood sugar spikes, insulin resistance, hepatic fat accumulation, and metabolic risk."
    },
    {
        "pattern": r"\b(hydrogenated|partially hydrogenated|trans fat|margarine|shortening)\b",
        "name": "Trans Fats / Hydrogenated Oils",
        "category": "Hazardous Trans Fat",
        "risk_level": "High",
        "penalty": 20,
        "explanation": "Contains artificial trans fats that raise bad cholesterol (LDL) and significantly increase heart disease risk."
    },
    {
        "pattern": r"\b(monosodium glutamate|msg|e621|flavor enhancer 621|hydrolyzed vegetable protein)\b",
        "name": "Monosodium Glutamate (MSG / E621)",
        "category": "Flavor Enhancer",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Excitotoxin added to trigger overeating; may cause headaches or sensitivity in susceptible individuals."
    },
    {
        "pattern": r"\b(sodium nitrate|sodium nitrite|potassium nitrate|e250|e251)\b",
        "name": "Sodium Nitrite / Nitrate (E250/E251)",
        "category": "Preservative",
        "risk_level": "High",
        "penalty": 15,
        "explanation": "Synthetic meat preservative associated with nitrosamine formation and increased health risks."
    },
    {
        "pattern": r"\b(bha|bht|butylated hydroxyanisole|butylated hydroxytoluene|e320|e321)\b",
        "name": "BHA / BHT (E320/E321)",
        "category": "Synthetic Antioxidant",
        "risk_level": "High",
        "penalty": 15,
        "explanation": "Synthetic fat preservatives flagged by health authorities for potential endocrine disruption."
    },
    {
        "pattern": r"\b(sodium benzoate|potassium sorbate|e211|e202)\b",
        "name": "Sodium Benzoate (E211) / Sorbate",
        "category": "Chemical Preservative",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Artificial preservative used to extend shelf life; can react with Vitamin C under heat to form benzene."
    },
    {
        "pattern": r"\b(aspartame|sucralose|acesulfame|saccharin|e951|e955|e950)\b",
        "name": "Artificial Sweeteners (Aspartame/Sucralose)",
        "category": "Artificial Sweetener",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Synthetic low-calorie sweeteners that can alter gut microbiota and sweet preference thresholds."
    },
    {
        "pattern": r"\b(tartrazine|allura red|sunset yellow|brilliant blue|red 40|yellow 5|yellow 6|e102|e110|e129|e133)\b",
        "name": "Artificial Synthetic Dyes / Colors",
        "category": "Food Coloring",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Petroleum-derived artificial dyes linked to hyperactivity and sensitivity issues."
    },
    {
        "pattern": r"\b(refined wheat flour|maida|refined flour)\b",
        "name": "Refined Wheat Flour (Maida)",
        "category": "Processed Carbs",
        "risk_level": "Medium",
        "penalty": 8,
        "explanation": "Stripped of natural bran and fiber; digests rapidly leading to glucose spikes and low satiety."
    },
    {
        "pattern": r"\b(maltodextrin|dextrose|invert sugar)\b",
        "name": "Maltodextrin / Dextrose",
        "category": "High Glycemic Sweetener",
        "risk_level": "Medium",
        "penalty": 8,
        "explanation": "Extremely high glycemic index ingredient that spikes blood glucose faster than table sugar."
    }
]

HEALTHY_INGREDIENTS = [
    {"pattern": r"\b(whole wheat|whole grain|whole oats|oat flour|quinoa|brown rice)\b", "name": "Whole Grains & Oats", "benefit": "Rich in dietary fiber and slow-release complex carbs."},
    {"pattern": r"\b(almonds|walnuts|cashews|chia seeds|flaxseeds|pumpkin seeds|sunflower seeds)\b", "name": "Nuts & Seeds", "benefit": "Provides healthy omega fatty acids, plant protein, and minerals."},
    {"pattern": r"\b(cocoa powder|dark chocolate|raw cocoa)\b", "name": "Real Cocoa", "benefit": "High in natural polyphenol antioxidants and flavonoids."},
    {"pattern": r"\b(whey protein|milk protein|pea protein|soy protein)\b", "name": "Protein Concentrates", "benefit": "Supports muscle maintenance and meal satiety."},
    {"pattern": r"\b(real fruit|apple|banana|strawberry|mango|dates|raisins)\b", "name": "Real Fruit / Fruit Pieces", "benefit": "Contains natural fruit fibers and vitamins without artificial flavors."}
]


def analyze_packaged_ingredients(extracted_text: str) -> Dict[str, Any]:
    text_lower = extracted_text.lower()
    
    score = 100
    harmful_found = []
    healthy_found = []
    
    # 1. Scan for harmful additives
    for item in HARMFUL_INGREDIENTS:
        if re.search(item["pattern"], text_lower):
            score -= item["penalty"]
            harmful_found.append({
                "name": item["name"],
                "category": item["category"],
                "risk_level": item["risk_level"],
                "explanation": item["explanation"]
            })
            
    # 2. Scan for healthy ingredients
    for item in HEALTHY_INGREDIENTS:
        if re.search(item["pattern"], text_lower):
            score += 5
            healthy_found.append({
                "name": item["name"],
                "benefit": item["benefit"]
            })

    score = max(0, min(100, score))

    # Determine health classification rating
    if score >= 80:
        rating = "Healthy & Clean Label"
        verdict = "This packaged product has a clean label with mostly natural ingredients and minimal harmful additives."
    elif score >= 55:
        rating = "Moderate / Consume in Moderation"
        verdict = "This packaged product contains some refined ingredients or additives. Enjoy occasionally in moderation."
    elif score >= 35:
        rating = "Unhealthy / Ultra-Processed"
        verdict = "This packaged food is highly processed and contains multiple unhealthy additives (palm oil, preservatives, or refined sugars)."
    else:
        rating = "Very Unhealthy / Hazardous Additives"
        verdict = "Avoid or minimize consumption! This product contains hazardous ultra-processed ingredients, trans fats, or heavy chemical additives."

    return {
        "extracted_text": extracted_text if extracted_text else "No clear text detected. Please ensure the ingredient label photo is clear and well-lit.",
        "ingredient_score": score,
        "rating": rating,
        "verdict": verdict,
        "harmful_count": len(harmful_found),
        "harmful_additives": harmful_found,
        "healthy_count": len(healthy_found),
        "healthy_ingredients": healthy_found
    }
