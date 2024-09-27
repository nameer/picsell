from fastapi import APIRouter

from app.core import bot
from app.models import QAInput, Summary, SummaryInput

api_router = APIRouter()


@api_router.get("/health")
def health():
    return {"status": "ok"}


@api_router.post("/qa")
def qa(data: QAInput) -> str:
    return bot.qa(data.session_id, data.query)


@api_router.post("/summary", response_model=Summary)
def summary(input: SummaryInput) -> dict:
    bot_response = bot.summary_analysis(input)
    return eval(bot_response)
