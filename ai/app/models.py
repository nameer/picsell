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
    vector_store_id: str
    sessions: list[SessionInput]


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


class Summary(BaseModel):
    summary: str
    topics: list[Topic]
    sentiments: list[Sentiment]
