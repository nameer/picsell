from collections import defaultdict
from typing import Annotated

from fastapi import APIRouter, Depends, status

from app import crud
from app.api.deps import SessionDep, get_campaign
from app.core import ai
from app.models import Campaign, CampaignCreate, CampaignOverview

router = APIRouter()


@router.post("", status_code=status.HTTP_201_CREATED)
def create_campaign(session: SessionDep, data: CampaignCreate) -> Campaign:
    return crud.create_campaign(session, data)


@router.get("/{campaign_id}", response_model=Campaign)
def get_campaign(campaign: Annotated[Campaign, Depends(get_campaign)]) -> Campaign:
    return campaign


@router.get("/{campaign_id}/overview", dependencies=[Depends(get_campaign)])
def get_campaign_overview(session: SessionDep, campaign_id: int) -> CampaignOverview:
    engagements = crud.get_engagements(session, campaign_id)
    interactions = defaultdict(list)
    for engagement in engagements:
        interactions[engagement.session_id].append(
            {"question": engagement.question, "response": engagement.response}
        )
    sessions = [
        {"session_id": session_id, "interactions": interactions}
        for session_id, interactions in interactions.items()
    ]

    overview = ai.generate_overview({"sessions": sessions})

    leads = defaultdict(int)
    for sentiment in overview["sentiments"]:
        key = {1: "positive", 0: "neutral", -1: "negative"}.get(sentiment["sentiment"])
        leads[key] += 1

    return {
        "summary": overview["summary"],
        "score": overview["score"],
        "topics": overview["topics"],
        "leads": dict(leads),
    }
