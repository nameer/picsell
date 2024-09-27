from pydantic import BaseModel

# === QA === #

# Request #


class QAInput(BaseModel):
    campaign_id: int
    session_id: str
    query: str


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


class Topic(BaseModel):
    name: str
    value: int


class Sentiment(BaseModel):
    session_id: str
    sentiment: str


class Summary(BaseModel):
    summary: str
    score: int
    topics: list[Topic]
    sentiments: list[Sentiment]
