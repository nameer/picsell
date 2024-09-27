from fastapi import APIRouter

from app.core import bot

api_router = APIRouter()


@api_router.get("/health")
def health():
    return {"status": "ok"}


@api_router.get("/qa")
def qa(session_id: str, query: str) -> str:
    return bot.qa(session_id, query)
