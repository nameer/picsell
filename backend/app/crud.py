from sqlmodel import Session, select

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


def get_campaigns(session: Session) -> list[Campaign]:
    campaigns = session.exec(select(Campaign)).all()
    return campaigns


def get_campaign_by_id(session: Session, id: int) -> Campaign:
    statement = select(Campaign).where(Campaign.id == id)
    session_campaign = session.exec(statement).first()
    return session_campaign
