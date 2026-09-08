# Healthy Food Detection & Nutrition Scoring System
## Full Implementation Specification

**Project Type:** AI/ML + Full-Stack Web/Mobile Application  
**Suggested Project Name:** NutriScan AI  
**Primary Goal:** Allow users to upload or scan a picture of food, detect the food item(s), estimate nutrition, and generate a health score with understandable recommendations.

---

# 1. Project Overview

NutriScan AI is an intelligent food analysis system that allows a user to:

- Upload an image of food.
- Capture a food image using a mobile/web camera.
- Detect one or more food items present in the image.
- Estimate calories and major nutrients.
- Generate a health score from 0 to 100.
- Explain why the food received that score.
- Suggest healthier alternatives or improvements.
- Save food scans in a personal history.
- Track daily calorie and nutrition intake.
- View weekly/monthly nutrition trends.

The system combines:

1. Computer Vision for food recognition.
2. Nutrition database/API integration.
3. Rule-based health scoring.
4. Optional ML-based personalized scoring.
5. Full-stack user management and history tracking.

---

# 2. Problem Statement

People often consume food without knowing its nutritional quality. Nutrition labels are not always available, restaurant meals may not provide exact information, and manually searching nutrition values is inconvenient.

The proposed system solves this by allowing users to simply scan food and receive:

- Food identification.
- Estimated nutrition.
- Health score.
- Health explanation.
- Recommendations.

The system is intended as a nutrition-assistance tool and not a medical diagnostic system.

---

# 3. Main Objectives

## Core Objectives

- Detect food from an uploaded/captured image.
- Identify the most likely food category.
- Retrieve nutritional information.
- Calculate a health score.
- Display calorie and macronutrient estimates.
- Show reasons behind the score.
- Store scan history.

## Advanced Objectives

- Detect multiple food items on a plate.
- Estimate serving size.
- Calculate total meal nutrition.
- Personalize scoring based on user goals.
- Suggest healthier food replacements.
- Generate daily nutrition summaries.
- Track nutrition habits over time.

---

# 4. Target Users

- College students.
- Fitness-conscious users.
- People trying to improve eating habits.
- Users tracking calories.
- General users wanting simple nutrition information.

---

# 5. Recommended Technology Stack

## Frontend

### Option A — Web Application

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts or Chart.js

### Option B — Mobile Application

- React Native
- Expo
- Native camera support
- Axios

### Recommended for Final-Year Project

Use:

```text
Frontend: React.js
Backend: FastAPI
ML/CV: Python + PyTorch/TensorFlow
Database: PostgreSQL
Image Storage: Cloudinary / AWS S3 / Cloudflare R2
Authentication: JWT
Deployment:
Frontend -> Vercel
Backend -> Render / Railway / AWS
Database -> Neon / Supabase PostgreSQL
```

---

# 6. High-Level Architecture

```text
                   +----------------------+
                   |       USER           |
                   +----------+-----------+
                              |
                              v
                   +----------------------+
                   | React Web / Mobile   |
                   | Camera / Upload UI   |
                   +----------+-----------+
                              |
                              v
                   +----------------------+
                   | FastAPI Backend      |
                   +----------+-----------+
                              |
         +--------------------+--------------------+
         |                    |                    |
         v                    v                    v
+----------------+   +------------------+   +-------------------+
| Food Detection |   | Nutrition Engine |   | Authentication    |
| ML Model       |   | / Nutrition API  |   | JWT               |
+-------+--------+   +---------+--------+   +-------------------+
        |                      |
        +----------+-----------+
                   |
                   v
          +--------------------+
          | Health Score Engine|
          +---------+----------+
                    |
                    v
          +--------------------+
          | PostgreSQL         |
          | Users / Scans      |
          +--------------------+
```

---

# 7. Complete User Flow

## New User Flow

```text
Open App
   |
   v
Register/Login
   |
   v
Create Profile
   |
   +--> Age (optional)
   +--> Gender (optional)
   +--> Height (optional)
   +--> Weight (optional)
   +--> Goal
         - Healthy eating
         - Weight loss
         - Weight gain
         - Maintain weight
         - High protein
   |
   v
Dashboard
```

## Food Scan Flow

```text
Dashboard
   |
   v
Upload Image / Open Camera
   |
   v
Image Validation
   |
   v
Food Detection Model
   |
   v
Detected Food(s)
   |
   v
Nutrition Lookup
   |
   v
Serving Estimate
   |
   v
Health Score Calculation
   |
   v
Result Page
   |
   +--> Food Name
   +--> Confidence
   +--> Calories
   +--> Protein
   +--> Carbs
   +--> Fat
   +--> Fiber
   +--> Sugar
   +--> Sodium
   +--> Health Score
   +--> Explanation
   +--> Suggestions
   |
   v
Save Scan
```

---

# 8. Main Application Modules

## 8.1 Authentication Module

Features:

- Register.
- Login.
- Logout.
- Password hashing.
- JWT-based authentication.
- Profile management.

Backend endpoints:

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
PUT  /api/auth/profile
```

---

# 9. Food Detection Module

The ML model receives an image and predicts which food is present.

Example input:

```text
Image: pizza.jpg
```

Example output:

```json
{
  "food_name": "pizza",
  "confidence": 0.94
}
```

---

# 10. Food Recognition Approaches

## Approach 1 — Image Classification

Use when one main food item is visible.

Recommended models:

- MobileNetV3
- EfficientNet-B0
- ResNet50

Example:

```text
Input Image
    |
    v
EfficientNet
    |
    v
Softmax
    |
    v
Pizza = 94%
Burger = 3%
Sandwich = 2%
Other = 1%
```

This is the easiest and most suitable approach for a college project.

## Approach 2 — Object Detection

Use when a plate contains multiple foods.

Recommended:

- YOLOv8
- YOLO11
- Faster R-CNN

Example:

```text
Plate Image
   |
   v
YOLO
   |
   +--> Rice
   +--> Dal
   +--> Salad
   +--> Chapati
```

## Recommended Development Strategy

### Phase 1

Implement classification.

### Phase 2

Add multi-food object detection.

---

# 11. Recommended Dataset

## Food-101

Food-101 contains 101 food categories with 101,000 images.

Example categories:

- Pizza
- Hamburger
- Sushi
- Ice cream
- Chicken wings
- French fries
- Steak
- Pancakes
- Omelette
- Donuts

You can train an EfficientNet model using Food-101.

## Optional Indian Food Dataset

Create or use a dataset containing:

- Biryani
- Idli
- Dosa
- Vada
- Poha
- Pav bhaji
- Samosa
- Pani puri
- Dal
- Rice
- Chapati
- Paneer
- Chole
- Rajma
- Upma
- Khichdi

For an Indian college project, adding local food categories can make the project more relevant.

---

# 12. Dataset Directory Structure

```text
dataset/
│
├── train/
│   ├── pizza/
│   ├── burger/
│   ├── biryani/
│   ├── dosa/
│   └── salad/
│
├── validation/
│   ├── pizza/
│   ├── burger/
│   ├── biryani/
│   ├── dosa/
│   └── salad/
│
└── test/
    ├── pizza/
    ├── burger/
    ├── biryani/
    ├── dosa/
    └── salad/
```

---

# 13. ML Model Training Pipeline

```text
Collect Dataset
      |
      v
Clean Dataset
      |
      v
Resize Images
      |
      v
Data Augmentation
      |
      v
Train/Validation/Test Split
      |
      v
Transfer Learning
      |
      v
Train Model
      |
      v
Evaluate Model
      |
      v
Save Model
      |
      v
Deploy in Backend
```

---

# 14. Image Preprocessing

Recommended size:

```text
224 x 224
```

Example transformations:

```python
transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(
        brightness=0.2,
        contrast=0.2,
        saturation=0.2
    ),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])
```

---

# 15. Transfer Learning Strategy

Use a pretrained EfficientNet-B0.

```python
import torch
import torch.nn as nn
from torchvision import models

model = models.efficientnet_b0(weights="DEFAULT")

num_features = model.classifier[1].in_features

model.classifier[1] = nn.Linear(
    num_features,
    number_of_food_classes
)
```

Loss:

```python
criterion = nn.CrossEntropyLoss()
```

Optimizer:

```python
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.0001
)
```

---

# 16. Model Evaluation Metrics

Measure:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion matrix

Target:

```text
Prototype Accuracy: 70%+
Good Project Accuracy: 80%+
Strong Model: 85%+
```

Accuracy depends heavily on dataset quality and food categories.

---

# 17. Model Output Format

Backend model service should return:

```json
{
  "prediction": "biryani",
  "confidence": 0.91,
  "top_predictions": [
    {
      "food": "biryani",
      "confidence": 0.91
    },
    {
      "food": "fried_rice",
      "confidence": 0.05
    },
    {
      "food": "pulao",
      "confidence": 0.02
    }
  ]
}
```

---

# 18. Nutrition Data Module

Once food is identified, obtain nutrition information.

Nutrition data should include:

```text
Calories
Protein
Carbohydrates
Fat
Saturated Fat
Fiber
Sugar
Sodium
```

Possible sources:

- USDA FoodData Central
- Edamam Nutrition API
- Nutritionix
- Spoonacular
- Custom nutrition database

For a final-year project, it is useful to keep a local nutrition table for common foods and optionally use an external API as fallback.

---

# 19. Nutrition Table Example

```text
Food: Vegetable Salad
Serving: 200 g

Calories: 120 kcal
Protein: 5 g
Carbs: 18 g
Fat: 4 g
Fiber: 7 g
Sugar: 8 g
Sodium: 180 mg
Saturated Fat: 1 g
```

---

# 20. Serving Size Estimation

Image-only portion estimation is difficult.

Use three implementation levels.

## Level 1 — Default Serving

Example:

```text
Pizza -> 1 slice
Burger -> 1 burger
Biryani -> 1 bowl
Salad -> 1 bowl
```

## Level 2 — User Selection

After detection:

```text
Detected: Biryani

Choose serving:
○ Small
● Medium
○ Large
```

Multiplier example:

```text
Small  = 0.75
Medium = 1.00
Large  = 1.50
```

## Level 3 — AI Portion Estimation

Advanced version:

- Detect plate/bowl.
- Estimate food area.
- Use depth/reference object.
- Estimate food volume.
- Convert volume to grams.

For your initial implementation, Level 2 is recommended because it is practical and reasonably reliable.

---

# 21. Health Score Design

Final score:

```text
0 - 100
```

Interpretation:

```text
85-100 = Excellent
70-84  = Healthy
50-69  = Moderate
30-49  = Unhealthy
0-29   = Very Unhealthy
```

---

# 22. Health Score Formula

A transparent scoring model is better than showing a random AI score.

Start with:

```text
Score = 100
```

Subtract penalties for high:

- Calories
- Sugar
- Sodium
- Saturated fat

Add rewards for:

- Protein
- Fiber
- Vegetables/fruits
- Nutrient density

Example:

```text
Final Score =
100
- Calorie Penalty
- Sugar Penalty
- Sodium Penalty
- Saturated Fat Penalty
+ Protein Bonus
+ Fiber Bonus
```

Clamp:

```text
Score = max(0, min(100, score))
```

---

# 23. Example Scoring Rules

## Calories

```text
<= 300 kcal        -> 0 penalty
301-500 kcal       -> -5
501-700 kcal       -> -10
> 700 kcal         -> -15
```

## Sugar

```text
<= 5 g             -> 0
6-12 g             -> -5
13-20 g            -> -10
> 20 g             -> -15
```

## Sodium

```text
<= 300 mg          -> 0
301-600 mg         -> -5
601-900 mg         -> -10
> 900 mg           -> -15
```

## Saturated Fat

```text
<= 3 g             -> 0
4-7 g              -> -5
8-12 g             -> -10
> 12 g             -> -15
```

## Protein Bonus

```text
>= 10 g            -> +3
>= 20 g            -> +6
>= 30 g            -> +10
```

## Fiber Bonus

```text
>= 3 g             -> +3
>= 6 g             -> +6
>= 10 g            -> +10
```

---

# 24. Example Score Calculation

Food:

```text
Grilled Chicken Salad

Calories: 350
Sugar: 4 g
Sodium: 400 mg
Saturated fat: 2 g
Protein: 30 g
Fiber: 8 g
```

Calculation:

```text
Initial Score      = 100

Calories penalty   = -5
Sugar penalty      = 0
Sodium penalty     = -5
Sat. fat penalty   = 0

Protein bonus      = +10
Fiber bonus        = +6

Raw Score          = 106
Final Score        = 100
```

Result:

```text
Health Score: 100/100
Category: Excellent
```

You may later tune the formula using dietitian guidance or published nutrition standards.

---

# 25. Result Explanation Engine

The system should explain every score.

Example:

```text
Your meal received 82/100.

Positive factors:
✓ High in protein
✓ Good amount of fiber
✓ Low sugar

Negative factors:
⚠ Moderate sodium
⚠ Slightly high calorie content
```

Avoid simply showing:

```text
Score: 82
```

Explainability improves the research value of the project.

---

# 26. Recommendation Engine

Example:

```text
Detected Food:
Burger

Score:
48/100

Suggestions:
- Choose grilled instead of fried patty.
- Add vegetables.
- Reduce cheese or mayonnaise.
- Replace fries with salad.
- Choose water instead of a sugary drink.
```

---

# 27. Optional Personalized Score

User profile:

```text
Goal:
Weight Loss
```

Then calorie penalty can become stronger.

Example:

```text
Standard user:
600 kcal -> -10

Weight-loss user:
600 kcal -> -15
```

For a high-protein goal:

```text
Protein >= 25 g -> higher bonus
```

This makes the system more intelligent without requiring a complex ML model.

---

# 28. Database Design

Recommended database:

```text
PostgreSQL
```

---

# 29. Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    age INTEGER,
    height_cm FLOAT,
    weight_kg FLOAT,
    goal VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 30. Food Items Table

```sql
CREATE TABLE food_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    serving_size_g FLOAT,
    calories FLOAT,
    protein_g FLOAT,
    carbs_g FLOAT,
    fat_g FLOAT,
    saturated_fat_g FLOAT,
    fiber_g FLOAT,
    sugar_g FLOAT,
    sodium_mg FLOAT
);
```

---

# 31. Food Scans Table

```sql
CREATE TABLE food_scans (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    image_url TEXT,
    detected_food VARCHAR(150),
    confidence FLOAT,
    serving_multiplier FLOAT DEFAULT 1.0,
    calories FLOAT,
    protein_g FLOAT,
    carbs_g FLOAT,
    fat_g FLOAT,
    fiber_g FLOAT,
    sugar_g FLOAT,
    sodium_mg FLOAT,
    health_score INTEGER,
    score_category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 32. Scan Items Table

For multiple food detection:

```sql
CREATE TABLE scan_items (
    id UUID PRIMARY KEY,
    scan_id UUID REFERENCES food_scans(id),
    food_name VARCHAR(150),
    confidence FLOAT,
    calories FLOAT,
    protein_g FLOAT,
    carbs_g FLOAT,
    fat_g FLOAT,
    health_score INTEGER
);
```

---

# 33. Daily Nutrition Table

Optional:

```sql
CREATE TABLE daily_nutrition (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    date DATE,
    calories FLOAT,
    protein_g FLOAT,
    carbs_g FLOAT,
    fat_g FLOAT,
    fiber_g FLOAT
);
```

---

# 34. Backend Folder Structure

```text
backend/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── auth.py
│   │   ├── scan.py
│   │   ├── foods.py
│   │   ├── history.py
│   │   └── dashboard.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── food.py
│   │   └── scan.py
│   │
│   ├── schemas/
│   │   ├── user.py
│   │   ├── food.py
│   │   └── scan.py
│   │
│   ├── services/
│   │   ├── food_classifier.py
│   │   ├── nutrition_service.py
│   │   ├── score_service.py
│   │   ├── recommendation_service.py
│   │   └── storage_service.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   │
│   └── utils/
│       ├── image_utils.py
│       └── validators.py
│
├── ml/
│   ├── model.pth
│   ├── labels.json
│   ├── train.py
│   ├── evaluate.py
│   └── inference.py
│
├── requirements.txt
├── .env
└── Dockerfile
```

---

# 35. Frontend Folder Structure

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── FoodUploader.jsx
│   │   ├── CameraScanner.jsx
│   │   ├── NutritionCard.jsx
│   │   ├── HealthScoreGauge.jsx
│   │   └── RecommendationCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Scan.jsx
│   │   ├── Result.jsx
│   │   ├── History.jsx
│   │   └── Profile.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── scan.js
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# 36. Core Backend APIs

## Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
```

## Food Scan

```text
POST   /api/scans/analyze
GET    /api/scans/{scan_id}
DELETE /api/scans/{scan_id}
```

## History

```text
GET /api/scans/history
```

## Dashboard

```text
GET /api/dashboard/today
GET /api/dashboard/weekly
GET /api/dashboard/monthly
```

## Food Search

```text
GET /api/foods/search?q=biryani
```

---

# 37. Analyze Food API

Request:

```http
POST /api/scans/analyze
Content-Type: multipart/form-data
Authorization: Bearer JWT_TOKEN
```

Parameters:

```text
image
serving_size
```

Response:

```json
{
  "scan_id": "uuid",
  "detected_food": "Biryani",
  "confidence": 0.91,
  "serving": {
    "name": "medium",
    "grams": 300
  },
  "nutrition": {
    "calories": 520,
    "protein_g": 18,
    "carbs_g": 65,
    "fat_g": 20,
    "fiber_g": 4,
    "sugar_g": 5,
    "sodium_mg": 780
  },
  "health_score": 64,
  "category": "Moderate",
  "positives": [
    "Contains a reasonable amount of protein"
  ],
  "warnings": [
    "High sodium",
    "High calorie density"
  ],
  "recommendations": [
    "Reduce portion size",
    "Add salad",
    "Choose less oily preparation"
  ]
}
```

---

# 38. FastAPI Example

```python
from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/analyze")
async def analyze_food(
    image: UploadFile = File(...)
):
    image_bytes = await image.read()

    prediction = classifier.predict(image_bytes)

    nutrition = nutrition_service.get_nutrition(
        prediction["food_name"]
    )

    score = score_service.calculate(nutrition)

    recommendations = recommendation_service.generate(
        prediction["food_name"],
        nutrition,
        score
    )

    return {
        "detected_food": prediction["food_name"],
        "confidence": prediction["confidence"],
        "nutrition": nutrition,
        "health_score": score["score"],
        "category": score["category"],
        "recommendations": recommendations
    }
```

---

# 39. Model Inference Service

```python
class FoodClassifier:

    def __init__(self, model, labels, transform):
        self.model = model
        self.labels = labels
        self.transform = transform

    def predict(self, image):
        tensor = self.transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = self.model(tensor)

        probabilities = torch.softmax(outputs, dim=1)

        confidence, predicted = probabilities.max(1)

        return {
            "food_name": self.labels[predicted.item()],
            "confidence": float(confidence.item())
        }
```

---

# 40. Health Score Service

```python
def calculate_health_score(nutrition):

    score = 100

    calories = nutrition["calories"]
    sugar = nutrition["sugar_g"]
    sodium = nutrition["sodium_mg"]
    saturated_fat = nutrition["saturated_fat_g"]
    protein = nutrition["protein_g"]
    fiber = nutrition["fiber_g"]

    # Calories
    if calories > 700:
        score -= 15
    elif calories > 500:
        score -= 10
    elif calories > 300:
        score -= 5

    # Sugar
    if sugar > 20:
        score -= 15
    elif sugar > 12:
        score -= 10
    elif sugar > 5:
        score -= 5

    # Sodium
    if sodium > 900:
        score -= 15
    elif sodium > 600:
        score -= 10
    elif sodium > 300:
        score -= 5

    # Saturated fat
    if saturated_fat > 12:
        score -= 15
    elif saturated_fat > 7:
        score -= 10
    elif saturated_fat > 3:
        score -= 5

    # Protein
    if protein >= 30:
        score += 10
    elif protein >= 20:
        score += 6
    elif protein >= 10:
        score += 3

    # Fiber
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

    return {
        "score": score,
        "category": category
    }
```

---

# 41. Nutrition Lookup Service

Pseudo-code:

```python
def get_nutrition(food_name):

    food = database.find_food(food_name)

    if food:
        return food

    api_result = nutrition_api.search(food_name)

    if api_result:
        return api_result

    return None
```

Recommended priority:

```text
1. Local database
2. External nutrition API
3. User manual correction
```

---

# 42. Confidence Handling

Do not blindly accept low-confidence predictions.

Example:

```text
Confidence >= 80%
Automatically continue.

Confidence 50-79%
Show:
"We think this is Biryani. Is this correct?"

Confidence < 50%
Show:
"We could not confidently identify this food."
```

Then offer top predictions:

```text
1. Biryani
2. Pulao
3. Fried Rice
4. None of these
```

This greatly improves user experience.

---

# 43. Camera Scanning

Frontend:

```javascript
navigator.mediaDevices.getUserMedia({
  video: true
})
```

Flow:

```text
Open Camera
   |
   v
Capture Frame
   |
   v
Convert to Blob
   |
   v
Send Multipart Request
   |
   v
Backend ML Model
```

---

# 44. Image Upload Validation

Accept:

```text
JPG
JPEG
PNG
WEBP
```

Recommended max size:

```text
5 MB
```

Validate:

- File type.
- File size.
- Image dimensions.
- Corrupted image.
- Empty image.
- Unsupported file.

---

# 45. Image Storage

Do not store raw images directly in PostgreSQL.

Use object storage:

```text
Cloudinary
AWS S3
Cloudflare R2
```

Database stores:

```text
image_url
```

---

# 46. Frontend Screens

## 46.1 Landing Page

Sections:

```text
Navbar
Hero
How It Works
Features
Food Scan Demo
Health Score Explanation
Benefits
Call To Action
Footer
```

Hero:

```text
Know What's On Your Plate

Scan your meal and instantly discover
nutrition facts and a simple health score.

[Scan Food]
[Learn More]
```

---

# 47. Dashboard

Cards:

```text
Today's Calories
Today's Protein
Meals Scanned
Average Health Score
```

Charts:

```text
Weekly Calories
Protein Intake
Average Health Score
Meal History
```

---

# 48. Scan Page

Layout:

```text
+----------------------------------+
|          Scan Your Food          |
|                                  |
|   +--------------------------+   |
|   |                          |   |
|   |       CAMERA / IMAGE     |   |
|   |                          |   |
|   +--------------------------+   |
|                                  |
|  [Open Camera] [Upload Image]    |
|                                  |
+----------------------------------+
```

---

# 49. Analysis Loading Screen

Display:

```text
Analyzing your meal...

✓ Checking image
✓ Identifying food
✓ Calculating nutrition
✓ Generating health score
```

---

# 50. Result Page

```text
----------------------------------------
              BIRYANI
        Detection Confidence: 91%
----------------------------------------

Health Score

              64 / 100
              MODERATE

----------------------------------------
Nutrition

Calories       520 kcal
Protein        18 g
Carbs          65 g
Fat            20 g
Fiber           4 g
Sugar           5 g
Sodium        780 mg

----------------------------------------
What is good?

✓ Good protein
✓ Low sugar

What can improve?

⚠ High sodium
⚠ High calories

Suggestions

• Reduce portion size
• Add vegetables or salad
• Use less oil
----------------------------------------
```

---

# 51. History Page

Each item:

```text
Image
Food Name
Date
Calories
Health Score
```

Example:

```text
Biryani
Today, 1:20 PM
520 kcal
64/100
```

---

# 52. Analytics

Weekly dashboard:

```text
Average Daily Calories: 1,850
Average Health Score: 73
Average Protein: 68 g
Meals Scanned: 18
```

Graph:

```text
Monday       68
Tuesday      75
Wednesday    82
Thursday     71
Friday       79
```

---

# 53. Recommendation Rules

Example:

```python
def generate_recommendations(nutrition):

    recommendations = []

    if nutrition["sodium_mg"] > 600:
        recommendations.append(
            "Reduce salt or choose a lower-sodium version."
        )

    if nutrition["fiber_g"] < 3:
        recommendations.append(
            "Add vegetables, fruit, or whole grains for more fiber."
        )

    if nutrition["protein_g"] < 10:
        recommendations.append(
            "Add a protein source such as dal, eggs, paneer or lean meat."
        )

    if nutrition["sugar_g"] > 12:
        recommendations.append(
            "Reduce added sugar or choose an unsweetened alternative."
        )

    return recommendations
```

---

# 54. Optional AI Explanation

You can optionally use an LLM to convert nutrition values into friendly explanations.

Input:

```json
{
  "food": "burger",
  "calories": 650,
  "protein": 24,
  "sugar": 11,
  "sodium": 940,
  "score": 47
}
```

Output:

```text
This burger provides a useful amount of protein, but its sodium
and calorie levels are high. Reducing sauces and cheese or choosing
a grilled patty could improve the meal score.
```

Important:

The numerical health score should come from your own scoring algorithm, not only from an LLM.

---

# 55. Research Component

To make this stronger as a research project, compare different food detection models.

Example research question:

```text
Which transfer-learning architecture provides the best balance of
accuracy and inference speed for food image classification?
```

Compare:

```text
MobileNetV3
ResNet50
EfficientNet-B0
```

Metrics:

```text
Accuracy
Precision
Recall
F1
Model size
Inference time
```

Example table:

| Model | Accuracy | F1 | Size | Inference |
|---|---:|---:|---:|---:|
| MobileNetV3 | 82% | 0.81 | Small | Fast |
| ResNet50 | 86% | 0.85 | Large | Medium |
| EfficientNet-B0 | 88% | 0.87 | Medium | Fast |

Your actual values must come from your experiment.

---

# 56. Recommended Research Topic

```text
AI-Based Food Recognition and Explainable Nutritional Health Scoring
Using Transfer Learning
```

Alternative:

```text
NutriScan: An Intelligent Food Recognition and Nutrition Assessment
System Using Deep Learning
```

---

# 57. Unique Selling Points

Your project can be more than a basic food classifier by combining:

- Food image recognition.
- Nutrition estimation.
- Explainable health score.
- Serving size adjustment.
- Personal dietary goals.
- Meal history.
- Analytics.
- Healthier alternatives.
- Indian food support.

---

# 58. Minimum Viable Product

Build these first:

```text
1. Register/login
2. Upload food image
3. Detect food
4. Display confidence
5. Fetch nutrition
6. Calculate health score
7. Show explanation
8. Save result
9. View history
```

---

# 59. Phase 2 Features

Add:

```text
Camera scanning
Multiple food detection
Serving selection
Daily calorie tracking
Nutrition charts
Goal-based scoring
Food alternatives
```

---

# 60. Phase 3 Features

Advanced:

```text
Automatic portion estimation
Barcode scanning
Packaged-food detection
OCR nutrition label scanning
Personalized meal suggestions
Meal planning
Voice input
Restaurant-food database
AI nutrition assistant
```

---

# 61. Barcode Scanning

For packaged food:

```text
Camera
   |
   v
Barcode
   |
   v
Product Database
   |
   v
Nutrition Label
   |
   v
Health Score
```

Possible database:

```text
Open Food Facts
```

This can significantly expand your project.

---

# 62. OCR Nutrition Label Feature

Flow:

```text
Upload Nutrition Label
      |
      v
OCR
      |
      v
Extract:
Calories
Protein
Sugar
Fat
Sodium
      |
      v
Health Score
```

Tools:

```text
EasyOCR
Tesseract
Google Vision API
```

---

# 63. Multi-Food Detection Architecture

Example:

```text
Input Plate
    |
    v
YOLO Detector
    |
    +--> Rice
    +--> Dal
    +--> Chapati
    |
    v
Nutrition Lookup
    |
    v
Calculate Each Item
    |
    v
Total Meal Nutrition
    |
    v
Meal Health Score
```

---

# 64. Multiple Food Response

```json
{
  "items": [
    {
      "name": "rice",
      "confidence": 0.93,
      "calories": 260
    },
    {
      "name": "dal",
      "confidence": 0.88,
      "calories": 180
    },
    {
      "name": "chapati",
      "confidence": 0.91,
      "calories": 120
    }
  ],
  "meal": {
    "total_calories": 560,
    "health_score": 76
  }
}
```

---

# 65. Security

Implement:

- BCrypt/Argon2 password hashing.
- JWT expiry.
- Input validation.
- File type verification.
- Upload size limits.
- SQL injection protection through ORM.
- CORS restrictions.
- Rate limiting.
- HTTPS.
- Environment variables.
- No API keys in frontend source.

---

# 66. Recommended Python Packages

```text
fastapi
uvicorn
sqlalchemy
psycopg2-binary
alembic
pydantic
python-multipart
python-jose
passlib
bcrypt
pillow
torch
torchvision
numpy
pandas
scikit-learn
httpx
python-dotenv
```

---

# 67. Frontend Packages

```text
react
react-router-dom
axios
tailwindcss
recharts
lucide-react
react-dropzone
```

Optional:

```text
framer-motion
```

---

# 68. Environment Variables

Backend:

```env
DATABASE_URL=
JWT_SECRET=
JWT_ALGORITHM=HS256

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NUTRITION_API_KEY=

MODEL_PATH=ml/model.pth
```

Never commit `.env`.

---

# 69. Dockerfile

Example backend:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

# 70. Testing Strategy

## Unit Testing

Test:

- Health score function.
- Nutrition calculations.
- Serving multiplier.
- Authentication.
- Recommendations.

## API Testing

Use:

```text
Postman
Pytest
```

## ML Testing

Test:

```text
Prediction accuracy
Confidence calibration
Incorrect images
Low-light photos
Blurred images
Multiple foods
```

---

# 71. Health Score Unit Test

```python
def test_healthy_food_score():

    nutrition = {
        "calories": 250,
        "sugar_g": 3,
        "sodium_mg": 200,
        "saturated_fat_g": 2,
        "protein_g": 25,
        "fiber_g": 8
    }

    result = calculate_health_score(nutrition)

    assert result["score"] >= 80
```

---

# 72. Food Model Test Cases

Test images:

```text
Clear pizza image
Dark pizza image
Partial pizza image
Two-food plate
Non-food image
Blurred image
Unknown food
```

---

# 73. Non-Food Detection

The system should reject images such as:

```text
Person
Laptop
Car
Room
Document
```

Possible approach:

```text
Food / Non-Food classifier
        |
        v
Food classifier
```

Or include an `unknown` class.

---

# 74. Error Handling

Example:

```json
{
  "error": "LOW_CONFIDENCE",
  "message": "We could not confidently identify this food.",
  "suggestions": [
    "Try another angle",
    "Use better lighting",
    "Move closer to the food"
  ]
}
```

---

# 75. Suggested UI Color Theme

Healthy-food theme:

```text
Primary: Green
Secondary: Emerald
Background: White / Off-white
Success: Green
Warning: Amber
Danger: Red
Text: Dark Slate
```

Example:

```text
#16A34A
#22C55E
#F8FAFC
#F59E0B
#EF4444
#0F172A
```

---

# 76. Health Score UI

Display as a circular gauge.

Example:

```text
       82
      /100

     HEALTHY
```

Score visual categories:

```text
85-100 -> Excellent
70-84  -> Healthy
50-69  -> Moderate
30-49  -> Unhealthy
0-29   -> Very Unhealthy
```

Do not rely only on colors; show text labels as well.

---

# 77. Development Roadmap

## Week 1

```text
Finalize features
Design database
Create wireframes
Setup GitHub
Setup frontend/backend
```

## Week 2

```text
Authentication
Database models
Profile
Landing page
Dashboard UI
```

## Week 3

```text
Prepare dataset
Train food classifier
Evaluate model
Export model
```

## Week 4

```text
Integrate ML with FastAPI
Food upload API
Nutrition lookup
```

## Week 5

```text
Health score engine
Recommendations
Result page
History
```

## Week 6

```text
Camera scanning
Charts
Analytics
Serving-size UI
```

## Week 7

```text
Testing
Bug fixes
Optimization
Security
```

## Week 8

```text
Deployment
Documentation
Project report
Research results
Presentation
Demo video
```

---

# 78. Git Branch Strategy

```text
main
develop
feature/auth
feature/frontend
feature/ml-model
feature/nutrition
feature/scoring
feature/history
```

---

# 79. GitHub Repository Structure

```text
nutriscan-ai/
│
├── frontend/
├── backend/
├── notebooks/
├── datasets/
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── database.md
│
├── README.md
├── .gitignore
└── docker-compose.yml
```

Do not commit the full training dataset if it is very large.

---

# 80. Suggested README Demo

```text
NutriScan AI

1. Upload food image.
2. AI identifies the food.
3. System estimates nutrition.
4. Health score is calculated.
5. User receives suggestions.
```

---

# 81. Final Project Architecture Recommendation

Use this architecture for the first production version:

```text
React
  |
  v
FastAPI
  |
  +---- PostgreSQL
  |
  +---- Cloudinary/R2
  |
  +---- EfficientNet Food Classifier
  |
  +---- Nutrition Database/API
  |
  +---- Rule-Based Scoring Engine
```

Do not begin with a very complex AI system.

First make the complete application work from end to end.

Then improve the model.

---

# 82. Recommended Final Scope

For a strong but manageable final-year project, implement:

### Required

- User authentication.
- Food image upload.
- Camera capture.
- EfficientNet food classification.
- 20-50 common food classes initially.
- Nutrition lookup.
- Serving selection.
- 0-100 explainable score.
- Nutrition breakdown.
- Recommendations.
- Scan history.
- Dashboard.

### Advanced

- Indian food dataset.
- Multiple-food detection using YOLO.
- Barcode scanning.
- Nutrition-label OCR.
- Personalized health scoring.
- Weekly analytics.

---

# 83. Important Limitation

A single image cannot reliably determine exact:

- Food weight.
- Ingredients.
- Cooking oil quantity.
- Salt.
- Hidden sugar.
- Exact calories.

Therefore the UI should display:

```text
Nutrition values are estimates and may vary based on
portion size, ingredients, and preparation method.
```

The application should not claim medical accuracy.

---

# 84. Suggested Final-Year Project Abstract

NutriScan AI is an AI-powered food recognition and nutritional assessment system designed to help users better understand the nutritional quality of meals. Users can upload or capture an image of food, after which a deep-learning model identifies the food item. The system combines the prediction with nutritional data such as calories, protein, carbohydrates, fat, fiber, sugar, and sodium. A transparent scoring algorithm then calculates a health score from 0 to 100 and provides an explanation of positive and negative nutritional factors.

The system also stores scan history and provides nutrition analytics to help users monitor eating habits over time. Transfer-learning architectures such as MobileNet, ResNet, and EfficientNet can be evaluated to identify the best model based on accuracy and inference speed. Future extensions include multi-food detection, portion estimation, barcode scanning, nutrition-label OCR, and personalized recommendations.

---

# 85. Core Innovation

The major value of the project is not simply detecting food.

The complete intelligence pipeline is:

```text
IMAGE
  |
  v
FOOD DETECTION
  |
  v
NUTRITION MAPPING
  |
  v
PORTION ADJUSTMENT
  |
  v
HEALTH SCORE
  |
  v
EXPLANATION
  |
  v
RECOMMENDATION
  |
  v
HISTORY + ANALYTICS
```

That makes the project suitable for:

- Final-year implementation.
- AI/ML demonstration.
- Research comparison.
- Full-stack development.
- Real-world use case.

---

# 86. Recommended First Version

Start with approximately:

```text
30 food classes
```

Example:

```text
Apple
Banana
Orange
Salad
Burger
Pizza
French fries
Sandwich
Pasta
Rice
Dal
Chapati
Biryani
Dosa
Idli
Samosa
Poha
Pav bhaji
Paneer
Rajma
Chole
Chicken curry
Grilled chicken
Egg
Omelette
Cake
Donut
Ice cream
Noodles
Fried rice
```

Once this works properly, increase the number of classes.

---

# 87. Exact Implementation Order

Follow this order:

```text
STEP 1
Create frontend and backend repositories.

STEP 2
Configure PostgreSQL.

STEP 3
Implement registration and login.

STEP 4
Create dashboard and upload UI.

STEP 5
Prepare 20-30 food categories.

STEP 6
Train EfficientNet-B0.

STEP 7
Save trained model.

STEP 8
Create FastAPI inference service.

STEP 9
Connect React upload to FastAPI.

STEP 10
Create nutrition database.

STEP 11
Map detected food -> nutrition.

STEP 12
Implement serving multiplier.

STEP 13
Implement health scoring.

STEP 14
Create result explanation.

STEP 15
Save scan history.

STEP 16
Create analytics dashboard.

STEP 17
Add camera support.

STEP 18
Test.

STEP 19
Deploy.

STEP 20
Add advanced features only after MVP is stable.
```

---

# 88. Recommended Demo Scenario

During presentation:

```text
1. Login.
2. Open Scan Food.
3. Capture/upload Biryani.
4. Model predicts Biryani.
5. Confidence shown.
6. Select medium serving.
7. Nutrition displayed.
8. Health score generated.
9. Explanation shown.
10. Recommendation shown.
11. Scan appears in history.
12. Dashboard calories update.
```

This demonstrates AI, backend, frontend, database, scoring logic, and analytics in a single flow.

---

# 89. Final Recommendation

For the first complete version, use:

```text
Frontend:
React + Tailwind CSS

Backend:
FastAPI

Database:
PostgreSQL

ML:
PyTorch + EfficientNet-B0

Dataset:
Food-101 + selected Indian food images

Nutrition:
Local food table + external API fallback

Authentication:
JWT

Storage:
Cloudinary or Cloudflare R2

Deployment:
Vercel + Render/Railway + Neon/Supabase
```

The best project strategy is to build the system end-to-end first with a smaller number of accurately supported foods. After the full workflow is stable, increase the dataset size and add YOLO-based multi-food detection.

---

# 90. Expected Final Deliverables

Your project submission should ideally contain:

```text
1. Working web/mobile application
2. Trained food classification model
3. Dataset documentation
4. Backend API
5. PostgreSQL database
6. Health scoring algorithm
7. Model comparison results
8. Testing report
9. Research/project report
10. Architecture diagram
11. ER diagram
12. API documentation
13. GitHub repository
14. Deployment URL
15. Presentation
16. Demo video
```

---

# 91. Future Scope

Possible future improvements:

- Automatic meal portion estimation.
- 3D depth-based food volume estimation.
- Restaurant menu integration.
- Smart meal recommendations.
- Micronutrient tracking.
- Allergy warnings.
- Personalized dietary targets.
- Wearable device integration.
- Continuous learning from corrected predictions.
- Multi-language support.
- Voice-based nutrition assistant.
- Offline mobile inference using TensorFlow Lite or ONNX.

---

# 92. Conclusion

NutriScan AI is a practical AI + full-stack project where computer vision is combined with nutrition data and an explainable scoring system.

The recommended approach is:

```text
Food Image
    ↓
EfficientNet / YOLO
    ↓
Food Identification
    ↓
Nutrition Database
    ↓
Serving Adjustment
    ↓
Health Score Engine
    ↓
Explanation
    ↓
Recommendations
    ↓
History & Analytics
```

Build a small, accurate MVP first and then expand it with advanced AI features.

