from sqlmodel import Session

from app.models import Campaign, CampaignCreate, Engagement, EngagementCreate


def create_campaign(session: Session, data: CampaignCreate) -> Campaign:
    campaign = Campaign.from_orm(data)
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign


def create_engagement(session: Session, data: EngagementCreate) -> Engagement:
    engagement = Engagement.from_orm(data)
    session.add(engagement)
    session.commit()
    session.refresh(engagement)
    return engagement


def get_campaign(session: Session, campaign_id: int) -> Campaign | None:
    campaign = session.get(Campaign, campaign_id)
    return campaign
