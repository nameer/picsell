from fastapi import APIRouter, BackgroundTasks, WebSocket
from pydantic import ValidationError
from sqlmodel import Session

from app import crud
from app.core import ai
from app.core.db import engine
from app.models import EngagementCreate, QAInput, QAOutput, QAQuestion

router = APIRouter()


def write_log(data: EngagementCreate):
    with Session(engine) as session:
        crud.create_engagement(session, data)


@router.post("", response_model=QAOutput)
def question_answer(data: QAInput, background_tasks: BackgroundTasks) -> dict:
    response = ai.qa(data.campaign_id, data.session_id, data.question)
    log_data = EngagementCreate(**data.dict(), response=response["message"])
    background_tasks.add_task(write_log, log_data)
    return response


@router.websocket("")
async def question_answer_ws(websocket: WebSocket, campaign_id: int, session_id: str):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        try:
            question = QAQuestion(**data).question
        except ValidationError:
            await websocket.send_json({"error": "Invalid format"})
            continue
        response = ai.qa(campaign_id, session_id, question)
        await websocket.send_json(response)

        log_data = EngagementCreate(
            campaign_id=campaign_id,
            session_id=session_id,
            question=question,
            response=response["message"],
        )
        write_log(log_data)