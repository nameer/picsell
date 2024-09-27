from fastapi import APIRouter

from app.core import bot
from app.models import QAInput, QAOutput, Summary, SummaryInput

api_router = APIRouter()


@api_router.get("/health")
def health():
    return {"status": "ok"}


@api_router.post("/qa", response_model=QAOutput)
def qa(data: QAInput) -> dict:
    message = bot.qa(data.session_id, data.question)
    return {"message": message}


@api_router.post("/summary", response_model=Summary)
def summary(input: SummaryInput) -> dict:
    bot_response = bot.summary_analysis(input)
    return eval(bot_response)


@api_router.post("/suggestion", response_model=str)
def suggestion(input: str) -> str:
    suggestion_response = bot.premarket_suggestion(input)
    print("---------------")
    print(suggestion_response)
    return suggestion_response
