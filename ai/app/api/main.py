from fastapi import APIRouter

from app.core import bot
from app.models import (
    Overview,
    QAInput,
    QAOutput,
    Suggestion,
    SuggestionInput,
    SummaryInput,
)

api_router = APIRouter()


@api_router.get("/health")
def health():
    return {"status": "ok"}


@api_router.post("/qa", response_model=QAOutput)
def qa(data: QAInput) -> dict:
    message = bot.qa(data.session_id, data.question)
    return {"message": message}


@api_router.post("/summary", response_model=Overview)
def summary(input: SummaryInput) -> dict:
    bot_response = bot.summary_analysis(input)
    return eval(bot_response)


@api_router.post("/suggestion", response_model=Suggestion)
def suggestion(input: SuggestionInput) -> dict:
    suggestion = bot.premarket_suggestion(input)
    return {"suggestion": suggestion}
