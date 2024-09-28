from collections import defaultdict
from typing import Annotated

from fastapi import APIRouter, Depends, status

from app import crud
from app.api.deps import SessionDep, get_campaign
from app.core import ai
from app.models import (
    Campaign,
    CampaignCreate,
    CampaignOverview,
    CampaignUpdate,
    HotSpots,
)

router = APIRouter()


@router.post("", status_code=status.HTTP_201_CREATED)
def create_campaign(session: SessionDep, data: CampaignCreate) -> Campaign:
    return crud.create_campaign(session, data)


@router.get("", response_model=list[Campaign])
def get_campaigns(session: SessionDep) -> list[Campaign]:
    return crud.get_campaigns(session)


@router.get("/{campaign_id}", response_model=Campaign)
def get_campaign_details(
    campaign_id: int,  # noqa: ARG001
    campaign: Annotated[Campaign, Depends(get_campaign)],
) -> Campaign:
    return campaign


@router.get("/{campaign_id}/hot-spots", response_model=HotSpots)
def get_campaign_video_hot_spots(
    session: SessionDep,
    campaign: Annotated[Campaign, Depends(get_campaign)],
    campaign_id: int,
) -> dict:
    points = crud.get_time_based_engagement(session, campaign_id)

    plots = [{"x": x, "y": y} for x, y in points]
    max_heat = max(y for _, y in points)

    return {
        "total_duration": campaign.video_duration,
        "max_heat": max_heat,
        "plot": plots,
    }


@router.get("/{campaign_id}/overview", dependencies=[Depends(get_campaign)])
def get_campaign_overview(session: SessionDep, campaign_id: int) -> CampaignOverview:
    last_engagement_time = crud.get_last_engagement_time(session, campaign_id)
    if not last_engagement_time:
        return {
            "summary": {
                "engagement_peak": [],
                "ai_query_performance": [],
                "customer_feedback": [],
                "additional_insights": [],
            },
            "score": 0,
            "topics": [],
            "leads": {"positive": 0, "neutral": 0, "negative": 0},
        }

    overview_cache = crud.get_latest_overview_cache(session, campaign_id)
    if overview_cache and last_engagement_time < overview_cache.created_at:
        return overview_cache.data

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

    data = {
        "summary": overview["summary"],
        "score": overview["score"],
        "topics": overview["topics"],
        "leads": dict(leads),
    }
    crud.create_overview_cache(session, campaign_id, data)
    return data


@router.put("/{campaign_id}")
def update_campaign(
    session: SessionDep,
    campaign: Annotated[Campaign, Depends(get_campaign)],
    campaign_id: int,  # noqa: ARG001
    data: CampaignUpdate,
) -> Campaign:
    return crud.update_campaign(session, campaign, data)
