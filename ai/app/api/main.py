from fastapi import APIRouter

from app.core import bot
from app.models import Summary, SummaryInput

api_router = APIRouter()


@api_router.get("/health")
def health():
    return {"status": "ok"}


@api_router.get("/qa")
def qa(session_id: str, query: str) -> str:
    return bot.qa(session_id, query)


@api_router.post("/summary", response_model=Summary)
def summary(input: SummaryInput) -> dict:
    bot_response = bot.summary_analysis(input)
    return eval(bot_response)
