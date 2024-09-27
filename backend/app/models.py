from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import HttpUrl, model_validator
from sqlmodel import JSON, Column, Field, SQLModel

# === Campaign === #


class CampaignStatus(Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class CampaignBase(SQLModel):
    name: str
    video_url: HttpUrl
    document_urls: list[HttpUrl]


class CampaignCreate(CampaignBase):
    pass


class CampaignUpdate(CampaignBase):
    pass


class Campaign(CampaignBase, table=True):
    id: int = Field(default=None, primary_key=True)
    vector_store_id: str | None = None

    video_url: str
    document_urls: list[str] = Field(sa_column=Column(JSON))
    status: CampaignStatus = CampaignStatus.QUEUED

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @model_validator(mode="before")
    @classmethod
    def validate_urls(cls, values: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(values, CampaignBase):
            return values
        values.video_url = str(values.video_url)
        values.document_urls = [str(url) for url in values.document_urls]
        return values


# === Engagement === #


class EngagementCreate(SQLModel):
    campaign_id: int = Field(foreign_key="campaign.id")
    session_id: str

    question: str
    response: str


class Engagement(EngagementCreate, table=True):
    id: int = Field(default=None, primary_key=True)

    created_at: datetime = Field(default_factory=datetime.utcnow)


# === QA === #


class QAQuestion(SQLModel):
    question: str


class QAInput(QAQuestion):
    campaign_id: int
    session_id: str
    question: str


class QAOutput(SQLModel):
    message: str