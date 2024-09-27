from fastapi import APIRouter

from app import crud
from app.api.deps import SessionDep
from app.core import ai
from app.models import EngagementCreate, QAInput, QAOutput

router = APIRouter()


@router.post("", response_model=QAOutput)
def question_answer(session: SessionDep, data: QAInput) -> dict:
    answer = ai.qa(data.campaign_id, data.session_id, data.question)
    log_data = EngagementCreate(
        **data.dict(),
        response=answer["message"],
    )
    crud.create_engagement(session, log_data)
    return answer
