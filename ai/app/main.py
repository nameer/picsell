from fastapi import FastAPI

from app.api.main import api_router
from app.core.config import settings

app = FastAPI(title=f"AI service for {settings.PROJECT_NAME}")

app.include_router(api_router)
