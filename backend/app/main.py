from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import db

from app.api.auth import router as auth_router
from app.api.scan import router as scan_router
from app.api.foods import router as foods_router
from app.api.history import router as history_router
from app.api.dashboard import router as dashboard_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()

app = FastAPI(
    title="NutriScan AI API",
    description="Healthy Food Detection & Nutrition Scoring System",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(scan_router)
app.include_router(foods_router)
app.include_router(history_router)
app.include_router(dashboard_router)


@app.get("/")
async def root():
    return {"message": "NutriScan AI API is running"}