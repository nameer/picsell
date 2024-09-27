from fastapi import APIRouter, HTTPException, status

from app import crud
from app.api.deps import SessionDep
from app.models import Campaign, CampaignCreate

router = APIRouter()


@router.post("", status_code=status.HTTP_201_CREATED)
def create_campaign(session: SessionDep, data: CampaignCreate) -> Campaign:
    return crud.create_campaign(session, data)


@router.get("", response_model=list[Campaign])
def get_campaigns(session: SessionDep) -> list[Campaign]:
    return crud.get_campaigns(session)


@router.get("/{id}", response_model=Campaign)
def get_campaign_by_id(id: int, session: SessionDep) -> Campaign:
    campaign = crud.get_campaign_by_id(session, id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Item not found")
    return campaign
