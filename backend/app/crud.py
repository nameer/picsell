from datetime import datetime

from sqlmodel import Session, select

from app.models import (
    Campaign,
   
    CampaignCreate,
    CampaignUpdate,
   
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

def update_campaign(
    session: Session, db_campaign: Campaign, campaign_in: CampaignUpdate
):
    update_data = eval(campaign_in.json(exclude_unset=True))
    db_campaign.sqlmodel_update(update_data)
    session.add(db_campaign)
    session.commit()
    session.refresh(db_campaign)
    return db_campaign


# === Engagement === #


def create_engagement(session: Session, data: EngagementCreate) -> Engagement:
    engagement = Engagement.from_orm(data)
    session.add(engagement)
    session.commit()
    session.refresh(engagement)
    return engagement


def get_engagements(session: Session, campaign_id: int) -> list[Engagement]:
    return session.exec(
        select(Engagement).where(Engagement.campaign_id == campaign_id)
    ).all()


def get_last_engagement_time(session: Session, campaign_id: int) -> datetime:
    return session.exec(
        select(Engagement.created_at)
        .where(Engagement.campaign_id == campaign_id)
        .order_by(Engagement.created_at.desc())
    ).first()


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
    return session.exec(
        select(OverviewCache)
        .where(OverviewCache.campaign_id == campaign_id)
        .order_by(OverviewCache.created_at.desc())
    ).first()
