from datetime import datetime
from enum import Enum
from typing import Annotated, Any, Self

from pydantic import HttpUrl, NonNegativeInt, PositiveInt, model_validator
from sqlmodel import JSON, Column, Field, SQLModel

# === Campaign === #


class CampaignStatus(Enum):
    DRAFTED = "drafted"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class CampaignBase(SQLModel):
    name: str
    video_url: HttpUrl | None = None
    video_duration: PositiveInt | None = None
    document_urls: list[HttpUrl] | None = None

    @model_validator(mode="after")
    def validate_video_fields(self) -> Self:
        if bool(self.video_url) ^ bool(self.video_duration):
            raise ValueError("video_duration must be provided with video_url")
        return self


class CampaignCreate(CampaignBase):
    @model_validator(mode="after")
    def validate_urls(self) -> Self:
        if not self.video_url and not self.document_urls:
            raise ValueError("Either video_url or document_urls must be provided")
        return self


class CampaignUpdate(SQLModel):
    name: str | None = None
    video_url: HttpUrl | None = None
    video_duration: PositiveInt | None = None
    document_urls: list[HttpUrl] | None = []

    @model_validator(mode="after")
    def validate_video_fields(self) -> Self:
        if bool(self.video_url) ^ bool(self.video_duration):
            raise ValueError("video_duration must be provided with video_url")
        return self


class Campaign(CampaignBase, table=True):
    id: int = Field(default=None, primary_key=True)

    video_url: str | None = None
    document_urls: list[str] | None = Field(None, sa_column=Column(JSON))
    status: CampaignStatus = CampaignStatus.DRAFTED

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @model_validator(mode="before")
    @classmethod
    def validate_urls(cls, values: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(values, CampaignBase):
            return values
        if values.video_url:
            values.video_url = str(values.video_url)
        if values.document_urls:
            values.document_urls = [str(url) for url in values.document_urls]
        return values


# === Engagement === #


class EngagementCreate(SQLModel):
    campaign_id: int = Field(foreign_key="campaign.id")
    session_id: str

    time: NonNegativeInt
    question: str
    response: str


class Engagement(EngagementCreate, table=True):
    id: int = Field(default=None, primary_key=True)

    created_at: datetime = Field(default_factory=datetime.utcnow)


# === QA === #


class QAQuestion(SQLModel):
    question: str
    time: NonNegativeInt


class QAInput(QAQuestion):
    campaign_id: int
    session_id: str


class QAOutput(SQLModel):
    message: str


# === Overview === #


class SubTopic(SQLModel):
    name: str
    value: Annotated[int, Field(ge=0)]


class Topic(SQLModel):
    name: str
    subtopics: list[SubTopic]


class Summaries(SQLModel):
    engagement_peak: list[str]
    ai_query_performance: list[str]
    customer_feedback: list[str]
    additional_insights: list[str]


class Lead(SQLModel):
    positive: int = 0
    neutral: int = 0
    negative: int = 0


class CampaignOverview(SQLModel):
    summary: Summaries
    score: Annotated[int, Field(ge=0, le=100)]
    topics: list[Topic]
    leads: Lead


class OverviewCache(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)

    campaign_id: int = Field(foreign_key="campaign.id")
    data: dict = Field(sa_column=Column(JSON))

    created_at: datetime = Field(default_factory=datetime.utcnow)


# === HotSpots === #


class PlotPoint(SQLModel):
    x: int
    y: int


class HotSpots(SQLModel):
    total_duration: PositiveInt
    max_heat: NonNegativeInt
    plot: list[PlotPoint]


# === Suggestion === #


class SuggestionInput(SQLModel):
    query: str


class Suggestion(SQLModel):
    suggestion: str
