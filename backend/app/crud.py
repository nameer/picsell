from datetime import datetime

from sqlalchemy.sql import select
from sqlmodel import Session  # , select

from app.models import (
    Campaign,
    CampaignCreate,
    Engagement,
    EngagementCreate,
    OverviewCache,
)

# === Compaign === #


def create_campaign(session: Session, data: CampaignCreate) -> Campaign:
    campaign = Campaign.from_orm(data)
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign


def get_campaigns(session: Session) -> list[Campaign]:
    campaigns = session.exec(select(Campaign)).all()
    return campaigns


def get_campaign(session: Session, campaign_id: int) -> Campaign | None:
    campaign = session.get(Campaign, campaign_id)
    return campaign


# === Engagement === #


def create_engagement(session: Session, data: EngagementCreate) -> Engagement:
    engagement = Engagement.from_orm(data)
    session.add(engagement)
    session.commit()
    session.refresh(engagement)
    return engagement


def get_engagements(session: Session, campaign_id: int) -> list[Engagement]:
    engagements = session.exec(
        select(Engagement).where(Engagement.campaign_id == campaign_id)
    ).all()
    return [res[0] for res in engagements]


def get_last_engagement_time(session: Session, campaign_id: int) -> datetime:
    # TODO: potential sqlmodel failure?
    last_time = session.exec(
        select(Engagement.created_at)
        .where(Engagement.campaign_id == campaign_id)
        .order_by(Engagement.created_at.desc())
    ).first() or (None,)
    return last_time[0]


# === Overview Cache === #


def create_overview_cache(
    session: Session,
    campaign_id: int,
    data: dict,
) -> OverviewCache:
    overview_cache = OverviewCache(campaign_id=campaign_id, data=data)
    session.add(overview_cache)
    session.commit()
    session.refresh(overview_cache)
    return overview_cache


def get_latest_overview_cache(
    session: Session,
    campaign_id: int,
) -> OverviewCache | None:
    # TODO: potential sqlmodel failure?
    latest = session.exec(
        select(OverviewCache)
        .where(OverviewCache.campaign_id == campaign_id)
        .order_by(OverviewCache.created_at.desc())
    ).first() or (None,)
    return latest[0]
