from fastapi import APIRouter

from app.core import ai
from app.models import QAInput, QAOutput

router = APIRouter()


@router.post("", response_model=QAOutput)
def question_answer(data: QAInput) -> dict:
    answer = ai.qa(data.campaign_id, data.session_id, data.query)
    # TODO: Save the answer to the database
    return answer
