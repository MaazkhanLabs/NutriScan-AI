import re
from typing import Dict, List, Any

# Comprehensive Dictionary of Packaged Food Additives & Ingredients with resilient matching patterns
HARMFUL_INGREDIENTS = [
    {
        "pattern": r"(palm oil|palmolein|palm kernel|palm fat|vegetable fat \(palm\)|ins 471|ins 472)",
        "name": "Palm Oil / Palmolein Fat",
        "category": "Unhealthy Saturated Fat",
        "risk_level": "High",
        "penalty": 15,
        "explanation": "High in saturated fatty acids; frequent consumption increases LDL cholesterol and cardiovascular risk."
    },
    {
        "pattern": r"(high fructose|hfcs|corn syrup|glucose syrup|invert sugar|liquid glucose)",
        "name": "High Fructose Corn Syrup / Glucose Syrup",
        "category": "Refined Sugar",
        "risk_level": "High",
        "penalty": 15,
        "explanation": "Causes rapid blood sugar spikes, insulin resistance, hepatic fat accumulation, and metabolic risk."
    },
    {
        "pattern": r"(hydrogenated|partially hydrogenated|trans fat|margarine|shortening|interesterified fat)",
        "name": "Trans Fats / Hydrogenated Vegetable Oil",
        "category": "Hazardous Trans Fat",
        "risk_level": "High",
        "penalty": 20,
        "explanation": "Contains artificial trans fats that raise bad cholesterol (LDL) and significantly increase heart disease risk."
    },
    {
        "pattern": r"(monosodium glutamate|msg|e621|e 621|ins 621|ins621|flavor enhancer 621|flavor enhancer \(621\)|flavour enhancer 621|flavour enhancer \(621\)|hydrolyzed vegetable protein|hvp)",
        "name": "Monosodium Glutamate (MSG / E621 / INS 621)",
        "category": "Flavor Enhancer",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Excitotoxin added to trigger overeating; may cause headaches or sensitivity in susceptible individuals."
    },
    {
        "pattern": r"(sodium nitrate|sodium nitrite|potassium nitrate|e250|e251|ins 250|ins 251|ins250|ins251|250|251)",
        "name": "Sodium Nitrite / Nitrate (E250/E251 / INS 250)",
        "category": "Synthetic Preservative",
        "risk_level": "High",
        "penalty": 15,
        "explanation": "Synthetic preservative associated with nitrosamine formation and increased long-term health risks."
    },
    {
        "pattern": r"(tbhq|bha|bht|butylated hydroxyanisole|butylated hydroxytoluene|tertiary butylhydroquinone|e319|e320|e321|ins 319|ins 320|ins 321|ins319|ins320|ins321)",
        "name": "TBHQ / BHA / BHT (E319/E320/E321 / INS 319)",
        "category": "Synthetic Fat Antioxidant",
        "risk_level": "High",
        "penalty": 15,
        "explanation": "Synthetic fat preservatives flagged by health authorities for potential cellular stress and endocrine disruption."
    },
    {
        "pattern": r"(sodium benzoate|potassium sorbate|benzoate|sorbate|e211|e202|ins 211|ins 202|ins211|ins202|211|202)",
        "name": "Sodium Benzoate (E211 / INS 211) & Potassium Sorbate",
        "category": "Chemical Preservative",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Artificial preservative used to extend shelf life; can react with Vitamin C under heat to form benzene."
    },
    {
        "pattern": r"(aspartame|sucralose|acesulfame|saccharin|e951|e955|e950|ins 950|ins 951|ins 955|ins950|ins951|ins955)",
        "name": "Artificial Sweeteners (Aspartame / Sucralose / Acesulfame-K)",
        "category": "Artificial Sweetener",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Synthetic low-calorie sweeteners that can alter gut microbiota and sweet preference thresholds."
    },
    {
        "pattern": r"(tartrazine|allura red|sunset yellow|brilliant blue|red 40|yellow 5|yellow 6|e102|e110|e129|e133|ins 102|ins 110|ins 129|ins 133)",
        "name": "Artificial Synthetic Dyes / Colors (E102/E110/E129)",
        "category": "Synthetic Food Coloring",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Petroleum-derived artificial dyes linked to hyperactivity and sensitivity issues."
    },
    {
        "pattern": r"(refined wheat flour|maida|refined flour|wheat flour \(maida\)|fortified wheat flour)",
        "name": "Refined Wheat Flour (Maida)",
        "category": "Processed Refined Carbs",
        "risk_level": "Medium",
        "penalty": 8,
        "explanation": "Stripped of natural bran and fiber; digests rapidly leading to glucose spikes and low satiety."
    },
    {
        "pattern": r"(maltodextrin|dextrose|corn syrup solids)",
        "name": "Maltodextrin / Dextrose",
        "category": "High Glycemic Sweetener",
        "risk_level": "Medium",
        "penalty": 8,
        "explanation": "Extremely high glycemic index ingredient that spikes blood glucose faster than table sugar."
    },
    {
        "pattern": r"(refined edible vegetable oil|refined vegetable oil|refined oil|edible vegetable oil|refined cottonseed oil|refined sunflower oil|refined soybean oil|vegetable oil)",
        "name": "Refined Edible Vegetable Oil",
        "category": "Processed Seed & Vegetable Oil",
        "risk_level": "Medium",
        "penalty": 15,
        "explanation": "Highly processed refined oil stripped of natural nutrients; high in omega-6 fats which can promote inflammation when consumed frequently."
    },
    {
        "pattern": r"(\bsugar\b|added sugar|sucrose|white sugar|cane sugar)",
        "name": "Added Refined Sugar",
        "category": "Added Refined Sugar",
        "risk_level": "Medium",
        "penalty": 12,
        "explanation": "Added empty calorie sweetener in savory snacks that spikes blood glucose and insulin levels."
    },
    {
        "pattern": r"(fried onion|fried garlic|deep fried|fried crisp|fried potato|fried flakes)",
        "name": "Fried Ingredients (Fried Onion/Crisps)",
        "category": "Deep-Fried Component",
        "risk_level": "Medium",
        "penalty": 10,
        "explanation": "Ingredients fried at high temperatures absorb dense, oxidized frying oil calories."
    },
    {
        "pattern": r"(\bsalt\b|added salt|iodised salt|iodized salt|table salt)",
        "name": "Added Sodium Salt",
        "category": "Added Sodium",
        "risk_level": "Low",
        "penalty": 8,
        "explanation": "Added sodium content; excessive intake contributes to fluid retention and elevated blood pressure."
    },
    {
        "pattern": r"(carrageenan|polysorbate 80|ins 407|ins 433|ins407|ins433|e407|e433)",
        "name": "Carrageenan / Polysorbate Emulsifiers (INS 407/433)",
        "category": "Inflammatory Emulsifier",
        "risk_level": "Medium",
        "penalty": 8,
        "explanation": "Synthetic thickeners/emulsifiers that can disturb mucosal lining integrity in sensitive digestive systems."
    }
]

HEALTHY_INGREDIENTS = [
    {"pattern": r"(whole wheat|whole grain|whole oats|oat flour|quinoa|brown rice|oats|multigrain)", "name": "Whole Grains & Oats", "benefit": "Rich in dietary fiber and slow-release complex carbs."},
    {"pattern": r"(almond|walnut|cashew|chia seed|flaxseed|pumpkin seed|sunflower seed|nuts|seeds)", "name": "Nuts & Seeds", "benefit": "Provides healthy omega fatty acids, plant protein, and minerals."},
    {"pattern": r"(cocoa powder|dark chocolate|raw cocoa|cocoa beans)", "name": "Real Cocoa", "benefit": "High in natural polyphenol antioxidants and flavonoids."},
    {"pattern": r"(whey protein|milk protein|pea protein|soy protein|milk solids|cottage cheese|paneer)", "name": "Quality Protein", "benefit": "Supports muscle maintenance and meal satiety."},
    {"pattern": r"(real fruit|apple|banana|strawberry|mango|dates|raisins|berries|blueberries)", "name": "Real Fruit / Whole Berries", "benefit": "Contains natural fruit fibers and vitamins without artificial flavors."},
    {"pattern": r"(extra virgin olive oil|cold pressed oil|mustard oil|coconut oil)", "name": "Healthy Unrefined Oils", "benefit": "Rich in monounsaturated heart-healthy fatty acids."},
    {"pattern": r"(turmeric|ginger|cinnamon|green tea|black pepper)", "name": "Natural Superfood Spices", "benefit": "Contains natural anti-inflammatory compounds and antioxidants."}
]


def analyze_packaged_ingredients(extracted_text: str) -> Dict[str, Any]:
    text_clean = extracted_text.strip() if extracted_text else ""

    # Handle Unreadable / Empty Text gracefully
    if not text_clean or len(text_clean) < 4:
        return {
            "extracted_text": "No clear ingredient text detected in this image. Please take a clear, well-lit photo focusing directly on the INGREDIENTS list on the package.",
            "text_detected": False,
            "ingredient_score": 0,
            "rating": "Unreadable Label / Clear Text Needed",
            "verdict": "Unable to read ingredient text from photo. Please re-scan with a clearer, well-lit image of the ingredient list.",
            "harmful_count": 0,
            "harmful_additives": [],
            "healthy_count": 0,
            "healthy_ingredients": []
        }

    text_lower = text_clean.lower()
    
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
        "extracted_text": text_clean,
        "text_detected": True,
        "ingredient_score": score,
        "rating": rating,
        "verdict": verdict,
        "harmful_count": len(harmful_found),
        "harmful_additives": harmful_found,
        "healthy_count": len(healthy_found),
        "healthy_ingredients": healthy_found
    }

