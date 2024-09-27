from fastapi import APIRouter, WebSocket
from pydantic import ValidationError

from app import crud
from app.api.deps import SessionDep
from app.core import ai
from app.models import EngagementCreate, QAInput, QAOutput, QAQuestion

router = APIRouter()


@router.post("", response_model=QAOutput)
def question_answer(session: SessionDep, data: QAInput) -> dict:
    response = ai.qa(data.campaign_id, data.session_id, data.question)
    log_data = EngagementCreate(**data.dict(), response=response["message"])
    crud.create_engagement(session, log_data)
    return response


@router.websocket("")
async def question_answer_ws(websocket: WebSocket, campaign_id: int, session_id: str):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        print(campaign_id, type(campaign_id))
        try:
            question = QAQuestion(**data).question
        except ValidationError:
            await websocket.send_json({"error": "Invalid format"})
            continue
        response = ai.qa(campaign_id, session_id, question)
        # TODO: log response
        await websocket.send_json(response)
