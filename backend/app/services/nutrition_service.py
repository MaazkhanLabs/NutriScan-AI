import httpx
from typing import Optional, Dict, Any

PRESET_NUTRITION = {
    # Indian & Regional Favorites
    "vada pav": {"calories": 290, "protein_g": 6.5, "carbs_g": 43, "fat_g": 11, "saturated_fat_g": 3.2, "fiber_g": 3.8, "sugar_g": 3.0, "sodium_mg": 520},
    "vada": {"calories": 290, "protein_g": 6.5, "carbs_g": 43, "fat_g": 11, "saturated_fat_g": 3.2, "fiber_g": 3.8, "sugar_g": 3.0, "sodium_mg": 520},
    "samosa": {"calories": 260, "protein_g": 4.5, "carbs_g": 32, "fat_g": 13, "saturated_fat_g": 4.0, "fiber_g": 2.5, "sugar_g": 2.0, "sodium_mg": 410},
    "masala dosa": {"calories": 320, "protein_g": 6.0, "carbs_g": 52, "fat_g": 10, "saturated_fat_g": 2.5, "fiber_g": 4.0, "sugar_g": 2.0, "sodium_mg": 480},
    "dosa": {"calories": 300, "protein_g": 5.5, "carbs_g": 48, "fat_g": 9, "saturated_fat_g": 2.0, "fiber_g": 3.5, "sugar_g": 2.0, "sodium_mg": 450},
    "pav bhaji": {"calories": 410, "protein_g": 9.0, "carbs_g": 58, "fat_g": 16, "saturated_fat_g": 7.0, "fiber_g": 6.0, "sugar_g": 6.0, "sodium_mg": 780},
    "paneer butter masala": {"calories": 380, "protein_g": 14, "carbs_g": 16, "fat_g": 28, "saturated_fat_g": 14.0, "fiber_g": 3.0, "sugar_g": 6.0, "sodium_mg": 640},
    "dal tadka": {"calories": 190, "protein_g": 9.0, "carbs_g": 26, "fat_g": 6, "saturated_fat_g": 1.5, "fiber_g": 6.0, "sugar_g": 2.0, "sodium_mg": 420},
    "chicken biryani": {"calories": 580, "protein_g": 32, "carbs_g": 68, "fat_g": 18, "saturated_fat_g": 4.5, "fiber_g": 3, "sugar_g": 3, "sodium_mg": 690},
    "biryani": {"calories": 560, "protein_g": 28, "carbs_g": 66, "fat_g": 17, "saturated_fat_g": 4.0, "fiber_g": 3, "sugar_g": 3, "sodium_mg": 650},
    "chicken curry": {"calories": 420, "protein_g": 34, "carbs_g": 14, "fat_g": 24, "saturated_fat_g": 6.0, "fiber_g": 2.5, "sugar_g": 4.0, "sodium_mg": 620},

    # Food-101 Open-Source Model Classes
    "apple pie": {"calories": 411, "protein_g": 3.7, "carbs_g": 58, "fat_g": 19, "saturated_fat_g": 8.0, "fiber_g": 2.5, "sugar_g": 25, "sodium_mg": 327},
    "baby back ribs": {"calories": 612, "protein_g": 44, "carbs_g": 12, "fat_g": 42, "saturated_fat_g": 15.0, "fiber_g": 0.5, "sugar_g": 9, "sodium_mg": 840},
    "baklava": {"calories": 334, "protein_g": 5.0, "carbs_g": 40, "fat_g": 18, "saturated_fat_g": 4.5, "fiber_g": 2.0, "sugar_g": 21, "sodium_mg": 142},
    "beignets": {"calories": 270, "protein_g": 5.0, "carbs_g": 34, "fat_g": 13, "saturated_fat_g": 3.0, "fiber_g": 1.2, "sugar_g": 12, "sodium_mg": 210},
    "bibimbap": {"calories": 560, "protein_g": 24, "carbs_g": 78, "fat_g": 16, "saturated_fat_g": 3.5, "fiber_g": 5.0, "sugar_g": 7, "sodium_mg": 780},
    "bread pudding": {"calories": 310, "protein_g": 7.0, "carbs_g": 48, "fat_g": 11, "saturated_fat_g": 5.0, "fiber_g": 1.5, "sugar_g": 28, "sodium_mg": 310},
    "bruschetta": {"calories": 180, "protein_g": 4.5, "carbs_g": 22, "fat_g": 8.5, "saturated_fat_g": 1.5, "fiber_g": 2.0, "sugar_g": 2.5, "sodium_mg": 390},
    "caesar salad": {"calories": 330, "protein_g": 9.0, "carbs_g": 11, "fat_g": 28, "saturated_fat_g": 5.0, "fiber_g": 3.0, "sugar_g": 2.5, "sodium_mg": 560},
    "cannoli": {"calories": 240, "protein_g": 5.0, "carbs_g": 26, "fat_g": 13, "saturated_fat_g": 7.0, "fiber_g": 1.0, "sugar_g": 14, "sodium_mg": 110},
    "caprese salad": {"calories": 260, "protein_g": 11, "carbs_g": 6, "fat_g": 21, "saturated_fat_g": 8.0, "fiber_g": 1.0, "sugar_g": 4.0, "sodium_mg": 380},
    "carrot cake": {"calories": 415, "protein_g": 4.0, "carbs_g": 54, "fat_g": 21, "saturated_fat_g": 5.0, "fiber_g": 2.0, "sugar_g": 36, "sodium_mg": 350},
    "ceviche": {"calories": 190, "protein_g": 26, "carbs_g": 9, "fat_g": 5, "saturated_fat_g": 0.8, "fiber_g": 2.0, "sugar_g": 2.0, "sodium_mg": 480},
    "cheesecake": {"calories": 401, "protein_g": 7.0, "carbs_g": 38, "fat_g": 25, "saturated_fat_g": 13.0, "fiber_g": 0.5, "sugar_g": 27, "sodium_mg": 320},
    "chicken wings": {"calories": 430, "protein_g": 31, "carbs_g": 8, "fat_g": 30, "saturated_fat_g": 8.0, "fiber_g": 0.5, "sugar_g": 1.0, "sodium_mg": 920},
    "chocolate cake": {"calories": 424, "protein_g": 5.3, "carbs_g": 58, "fat_g": 20, "saturated_fat_g": 7.5, "fiber_g": 3.0, "sugar_g": 42, "sodium_mg": 360},
    "chocolate mousse": {"calories": 350, "protein_g": 6.0, "carbs_g": 32, "fat_g": 22, "saturated_fat_g": 13.0, "fiber_g": 2.0, "sugar_g": 26, "sodium_mg": 90},
    "churros": {"calories": 330, "protein_g": 4.0, "carbs_g": 41, "fat_g": 17, "saturated_fat_g": 4.0, "fiber_g": 1.8, "sugar_g": 16, "sodium_mg": 280},
    "club sandwich": {"calories": 590, "protein_g": 34, "carbs_g": 44, "fat_g": 29, "saturated_fat_g": 9.0, "fiber_g": 3.5, "sugar_g": 5, "sodium_mg": 1240},
    "cupcakes": {"calories": 305, "protein_g": 2.5, "carbs_g": 42, "fat_g": 14, "saturated_fat_g": 5.0, "fiber_g": 0.8, "sugar_g": 30, "sodium_mg": 210},
    "deviled eggs": {"calories": 210, "protein_g": 12, "carbs_g": 2, "fat_g": 17, "saturated_fat_g": 4.5, "fiber_g": 0.0, "sugar_g": 1.0, "sodium_mg": 340},
    "donuts": {"calories": 340, "protein_g": 4.0, "carbs_g": 41, "fat_g": 18, "saturated_fat_g": 8.0, "fiber_g": 1.5, "sugar_g": 21, "sodium_mg": 340},
    "dumplings": {"calories": 320, "protein_g": 14, "carbs_g": 38, "fat_g": 12, "saturated_fat_g": 3.0, "fiber_g": 2.0, "sugar_g": 2.0, "sodium_mg": 680},
    "eggs benedict": {"calories": 580, "protein_g": 28, "carbs_g": 32, "fat_g": 38, "saturated_fat_g": 16.0, "fiber_g": 1.5, "sugar_g": 3.0, "sodium_mg": 1120},
    "falafel": {"calories": 330, "protein_g": 13, "carbs_g": 32, "fat_g": 18, "saturated_fat_g": 2.5, "fiber_g": 8.0, "sugar_g": 3.0, "sodium_mg": 460},
    "filet mignon": {"calories": 480, "protein_g": 46, "carbs_g": 0, "fat_g": 31, "saturated_fat_g": 13.0, "fiber_g": 0.0, "sugar_g": 0.0, "sodium_mg": 140},
    "fish and chips": {"calories": 840, "protein_g": 36, "carbs_g": 79, "fat_g": 42, "saturated_fat_g": 6.0, "fiber_g": 5.0, "sugar_g": 2.0, "sodium_mg": 980},
    "french fries": {"calories": 365, "protein_g": 4.0, "carbs_g": 48, "fat_g": 17, "saturated_fat_g": 3.0, "fiber_g": 4.0, "sugar_g": 0.5, "sodium_mg": 420},
    "fried rice": {"calories": 460, "protein_g": 12, "carbs_g": 62, "fat_g": 18, "saturated_fat_g": 3.5, "fiber_g": 3.0, "sugar_g": 2.0, "sodium_mg": 820},
    "garlic bread": {"calories": 350, "protein_g": 8.0, "carbs_g": 42, "fat_g": 17, "saturated_fat_g": 7.0, "fiber_g": 2.0, "sugar_g": 2.5, "sodium_mg": 540},
    "gnocchi": {"calories": 380, "protein_g": 9.0, "carbs_g": 68, "fat_g": 8, "saturated_fat_g": 2.5, "fiber_g": 3.5, "sugar_g": 3.0, "sodium_mg": 620},
    "greek salad": {"calories": 240, "protein_g": 6.0, "carbs_g": 12, "fat_g": 19, "saturated_fat_g": 6.0, "fiber_g": 3.5, "sugar_g": 6.0, "sodium_mg": 680},
    "grilled cheese sandwich": {"calories": 440, "protein_g": 16, "carbs_g": 33, "fat_g": 27, "saturated_fat_g": 14.0, "fiber_g": 2.0, "sugar_g": 4.0, "sodium_mg": 820},
    "grilled salmon": {"calories": 410, "protein_g": 36, "carbs_g": 0, "fat_g": 28, "saturated_fat_g": 5.0, "fiber_g": 0.0, "sugar_g": 0.0, "sodium_mg": 280},
    "guacamole": {"calories": 230, "protein_g": 3.0, "carbs_g": 12, "fat_g": 21, "saturated_fat_g": 3.0, "fiber_g": 9.0, "sugar_g": 1.5, "sodium_mg": 380},
    "gyoza": {"calories": 290, "protein_g": 12, "carbs_g": 32, "fat_g": 12, "saturated_fat_g": 3.0, "fiber_g": 2.0, "sugar_g": 1.5, "sodium_mg": 590},
    "hamburger": {"calories": 540, "protein_g": 26, "carbs_g": 42, "fat_g": 29, "saturated_fat_g": 10.0, "fiber_g": 2.0, "sugar_g": 7.0, "sodium_mg": 890},
    "classic burger": {"calories": 540, "protein_g": 26, "carbs_g": 42, "fat_g": 29, "saturated_fat_g": 10.0, "fiber_g": 2.0, "sugar_g": 7.0, "sodium_mg": 890},
    "hot dog": {"calories": 310, "protein_g": 11, "carbs_g": 24, "fat_g": 19, "saturated_fat_g": 7.0, "fiber_g": 1.0, "sugar_g": 4.0, "sodium_mg": 810},
    "ice cream": {"calories": 273, "protein_g": 4.6, "carbs_g": 31, "fat_g": 15, "saturated_fat_g": 9.0, "fiber_g": 0.7, "sugar_g": 28, "sodium_mg": 115},
    "lasagna": {"calories": 610, "protein_g": 32, "carbs_g": 52, "fat_g": 29, "saturated_fat_g": 14.0, "fiber_g": 4.0, "sugar_g": 8.0, "sodium_mg": 990},
    "macaroni and cheese": {"calories": 510, "protein_g": 19, "carbs_g": 54, "fat_g": 24, "saturated_fat_g": 13.0, "fiber_g": 2.5, "sugar_g": 6.0, "sodium_mg": 870},
    "macarons": {"calories": 210, "protein_g": 3.5, "carbs_g": 28, "fat_g": 10, "saturated_fat_g": 2.5, "fiber_g": 1.5, "sugar_g": 24, "sodium_mg": 45},
    "miso soup": {"calories": 84, "protein_g": 6.0, "carbs_g": 8, "fat_g": 3, "saturated_fat_g": 0.5, "fiber_g": 2.0, "sugar_g": 2.0, "sodium_mg": 920},
    "nachos": {"calories": 680, "protein_g": 18, "carbs_g": 64, "fat_g": 39, "saturated_fat_g": 15.0, "fiber_g": 7.0, "sugar_g": 4.0, "sodium_mg": 1150},
    "omelette": {"calories": 320, "protein_g": 21, "carbs_g": 3, "fat_g": 24, "saturated_fat_g": 8.0, "fiber_g": 0.5, "sugar_g": 1.5, "sodium_mg": 460},
    "onion rings": {"calories": 410, "protein_g": 5.0, "carbs_g": 48, "fat_g": 22, "saturated_fat_g": 4.0, "fiber_g": 3.0, "sugar_g": 6.0, "sodium_mg": 740},
    "pad thai": {"calories": 620, "protein_g": 24, "carbs_g": 76, "fat_g": 25, "saturated_fat_g": 4.5, "fiber_g": 4.0, "sugar_g": 14, "sodium_mg": 1100},
    "paella": {"calories": 520, "protein_g": 28, "carbs_g": 64, "fat_g": 16, "saturated_fat_g": 3.0, "fiber_g": 3.5, "sugar_g": 3.0, "sodium_mg": 840},
    "pancakes": {"calories": 350, "protein_g": 8.0, "carbs_g": 59, "fat_g": 9, "saturated_fat_g": 2.5, "fiber_g": 2.0, "sugar_g": 18, "sodium_mg": 580},
    "panna cotta": {"calories": 310, "protein_g": 4.0, "carbs_g": 26, "fat_g": 21, "saturated_fat_g": 13.0, "fiber_g": 0.0, "sugar_g": 22, "sodium_mg": 65},
    "pho": {"calories": 450, "protein_g": 30, "carbs_g": 62, "fat_g": 8, "saturated_fat_g": 2.5, "fiber_g": 3.0, "sugar_g": 4.0, "sodium_mg": 1450},
    "pizza": {"calories": 650, "protein_g": 24, "carbs_g": 76, "fat_g": 26, "saturated_fat_g": 11.0, "fiber_g": 4, "sugar_g": 6, "sodium_mg": 980},
    "margherita pizza": {"calories": 650, "protein_g": 24, "carbs_g": 76, "fat_g": 26, "saturated_fat_g": 11.0, "fiber_g": 4, "sugar_g": 6, "sodium_mg": 980},
    "ramen": {"calories": 530, "protein_g": 22, "carbs_g": 66, "fat_g": 20, "saturated_fat_g": 7.0, "fiber_g": 3.0, "sugar_g": 3.0, "sodium_mg": 1680},
    "ravioli": {"calories": 430, "protein_g": 18, "carbs_g": 54, "fat_g": 16, "saturated_fat_g": 7.0, "fiber_g": 3.5, "sugar_g": 5.0, "sodium_mg": 760},
    "risotto": {"calories": 480, "protein_g": 12, "carbs_g": 62, "fat_g": 20, "saturated_fat_g": 9.0, "fiber_g": 2.0, "sugar_g": 3.0, "sodium_mg": 720},
    "sashimi": {"calories": 210, "protein_g": 34, "carbs_g": 0, "fat_g": 7, "saturated_fat_g": 1.5, "fiber_g": 0.0, "sugar_g": 0.0, "sodium_mg": 120},
    "spaghetti bolognese": {"calories": 540, "protein_g": 26, "carbs_g": 68, "fat_g": 18, "saturated_fat_g": 6.5, "fiber_g": 4.5, "sugar_g": 8.0, "sodium_mg": 680},
    "spring rolls": {"calories": 240, "protein_g": 6.0, "carbs_g": 30, "fat_g": 10, "saturated_fat_g": 2.0, "fiber_g": 2.5, "sugar_g": 4.0, "sodium_mg": 480},
    "steak": {"calories": 510, "protein_g": 48, "carbs_g": 0, "fat_g": 34, "saturated_fat_g": 14.0, "fiber_g": 0.0, "sugar_g": 0.0, "sodium_mg": 160},
    "sushi": {"calories": 350, "protein_g": 16, "carbs_g": 58, "fat_g": 5, "saturated_fat_g": 1.0, "fiber_g": 2.5, "sugar_g": 6.0, "sodium_mg": 540},
    "tacos": {"calories": 420, "protein_g": 22, "carbs_g": 38, "fat_g": 20, "saturated_fat_g": 8.0, "fiber_g": 5.0, "sugar_g": 3.0, "sodium_mg": 710},
    "tiramisu": {"calories": 380, "protein_g": 6.0, "carbs_g": 42, "fat_g": 21, "saturated_fat_g": 12.0, "fiber_g": 1.0, "sugar_g": 28, "sodium_mg": 130},
    "waffles": {"calories": 370, "protein_g": 8.0, "carbs_g": 52, "fat_g": 14, "saturated_fat_g": 4.5, "fiber_g": 2.0, "sugar_g": 14, "sodium_mg": 480},
    "fresh green salad": {"calories": 150, "protein_g": 4.0, "carbs_g": 18, "fat_g": 7, "saturated_fat_g": 1.0, "fiber_g": 6, "sugar_g": 5, "sodium_mg": 220},
    "grilled chicken salad": {"calories": 380, "protein_g": 38, "carbs_g": 12, "fat_g": 14, "saturated_fat_g": 2.5, "fiber_g": 5, "sugar_g": 4, "sodium_mg": 420}
}


class NutritionService:
    def __init__(self):
        self.api_key = ""

    async def get_nutrition(self, food_name: str) -> Optional[Dict[str, Any]]:
        # 1. Search local preset database first
        nutrition = await self._search_local_db(food_name)
        if nutrition:
            return nutrition

        # 2. Try external Spoonacular API if API key exists
        if self.api_key:
            nutrition = await self._search_external_api(food_name)
            if nutrition:
                return nutrition

        # 3. Dynamic Keyword Heuristic Fallback based on food category
        return self._estimate_by_keywords(food_name)

    async def _search_local_db(self, food_name: str) -> Optional[Dict[str, Any]]:
        key = food_name.lower().strip()
        for preset_key, data in PRESET_NUTRITION.items():
            if preset_key in key or key in preset_key:
                return data
        return None

    async def _search_external_api(self, food_name: str) -> Optional[Dict[str, Any]]:
        url = "https://api.spoonacular.com/food/ingredients/autocomplete"
        params = {"query": food_name, "apiKey": self.api_key}
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(url, params=params)
                if response.status_code == 200:
                    data = response.json()
                    return {
                        "calories": data.get("nutritions", {}).get("calories", 400),
                        "protein_g": data.get("nutritions", {}).get("protein", 20),
                        "carbs_g": data.get("nutritions", {}).get("carbs", 40),
                        "fat_g": data.get("nutritions", {}).get("fat", 15),
                        "saturated_fat_g": data.get("nutritions", {}).get("saturated_fat", 3),
                        "fiber_g": data.get("nutritions", {}).get("fiber", 4),
                        "sugar_g": data.get("nutritions", {}).get("sugar", 5),
                        "sodium_mg": data.get("nutritions", {}).get("sodium", 400),
                    }
        except Exception:
            pass
        return None

    def _estimate_by_keywords(self, food_name: str) -> Dict[str, Any]:
        fn = food_name.lower()
        if "salad" in fn or "vegetable" in fn:
            return {"calories": 180, "protein_g": 6, "carbs_g": 16, "fat_g": 9, "saturated_fat_g": 1.5, "fiber_g": 6, "sugar_g": 4, "sodium_mg": 280}
        if "cake" in fn or "pie" in fn or "sweet" in fn or "dessert" in fn:
            return {"calories": 390, "protein_g": 5, "carbs_g": 52, "fat_g": 18, "saturated_fat_g": 8, "fiber_g": 1.5, "sugar_g": 32, "sodium_mg": 290}
        if "soup" in fn or "broth" in fn:
            return {"calories": 160, "protein_g": 8, "carbs_g": 18, "fat_g": 5, "saturated_fat_g": 1.2, "fiber_g": 3, "sugar_g": 3, "sodium_mg": 780}
        if "chicken" in fn or "meat" in fn or "steak" in fn:
            return {"calories": 440, "protein_g": 36, "carbs_g": 12, "fat_g": 22, "saturated_fat_g": 6, "fiber_g": 1, "sugar_g": 2, "sodium_mg": 580}

        return {
            "calories": 380,
            "protein_g": 18,
            "carbs_g": 42,
            "fat_g": 14,
            "saturated_fat_g": 3.5,
            "fiber_g": 3.5,
            "sugar_g": 5,
            "sodium_mg": 480
        }