from typing import Literal

from pydantic import BaseModel

# === QA === #

# Request #


class QAInput(BaseModel):
    campaign_id: int
    session_id: str
    question: str


class QAOutput(BaseModel):
    message: str


# === Summary === #

# Request #


class SessionInteraction(BaseModel):
    question: str
    response: str


class SessionInput(BaseModel):
    session_id: str
    interactions: list[SessionInteraction]


class SummaryInput(BaseModel):
    sessions: list[SessionInput]


class SuggestionInput(BaseModel):
    query: str


# Response #


class SubTopic(BaseModel):
    name: str
    value: int


class Topic(BaseModel):
    name: str
    subtopics: list[SubTopic]


class Sentiment(BaseModel):
    session_id: str
    sentiment: Literal[-1, 0, 1]


class Summaries(BaseModel):
    engagement_peak: list[str]
    ai_query_performance: list[str]
    customer_feedback: list[str]
    additional_insights: list[str]


class Overview(BaseModel):
    summary: Summaries
    score: int
    topics: list[Topic]
    sentiments: list[Sentiment]


class Suggestion(BaseModel):
    suggestion: str
