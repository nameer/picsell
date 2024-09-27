from fastapi import APIRouter

from app import crud
from app.api.deps import SessionDep
from app.models import Campaign, CampaignCreate

router = APIRouter()


@router.post("")
def create_campaign(session: SessionDep, data: CampaignCreate) -> Campaign:
    return crud.create_campaign(session, data)
