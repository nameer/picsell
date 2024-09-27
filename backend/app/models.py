from datetime import datetime
from enum import Enum

from pydantic import HttpUrl
from sqlmodel import JSON, Column, Field, SQLModel


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
    video_url: str
    document_urls: list[str] = Field(sa_column=Column(JSON))
    status: CampaignStatus = CampaignStatus.QUEUED
    vector_store_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
