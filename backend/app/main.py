from fastapi import FastAPI

from app.api.main import api_router
from app.core import chat
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(api_router)


@app.get("/chat-health")
def chat_health():
    return chat.health()
