import requests

from .config import settings


def get_url(endpoint: str = "") -> str:
    endpoint = endpoint[1:] if endpoint.startswith("/") else endpoint
    return f"{settings.AI_ENDPOINT}{endpoint}"


def qa(campaign_id: str, session_id: str, question: str) -> dict:
    v = requests.post(
        get_url("qa"),
        json={
            "campaign_id": campaign_id,
            "session_id": session_id,
            "query": question,
        },
    )
    return v.json()
