from fastapi import APIRouter

from app.core import bot
from app.models import QAInput, QAOutput, Summary, SummaryInput

api_router = APIRouter()


@api_router.get("/health")
def health():
    return {"status": "ok"}


@api_router.post("/qa", response_model=QAOutput)
def qa(data: QAInput) -> dict:
    message = bot.qa(data.session_id, data.query)
    return {"message": message}


@api_router.post("/summary", response_model=Summary)
def summary(input: SummaryInput) -> dict:
    bot_response = bot.summary_analysis(input)
    return eval(bot_response)
