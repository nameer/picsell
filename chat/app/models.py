from pydantic import BaseModel

### Request ###


class SessionInteraction(BaseModel):
    question: str
    response: str


class SessionInput(BaseModel):
    session_id: int
    interactions: list[SessionInteraction]


class SummaryInput(BaseModel):
    vector_store_id: str
    sessions: list[SessionInput]


### Response ###


class Topic(BaseModel):
    name: str
    value: int


class Sentiment(BaseModel):
    session_id: int
    sentiment: str


class Summary(BaseModel):
    summary: str
    score: int
    topics: list[Topic]
    sentiments: list[Sentiment]
