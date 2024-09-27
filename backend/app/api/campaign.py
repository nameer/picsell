from fastapi import APIRouter, status

from app import crud
from app.api.deps import SessionDep
from app.models import Campaign, CampaignCreate

router = APIRouter()


@router.post("", status_code=status.HTTP_201_CREATED)
def create_campaign(session: SessionDep, data: CampaignCreate) -> Campaign:
    return crud.create_campaign(session, data)
