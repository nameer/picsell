from collections.abc import Generator
from json import JSONDecodeError
from typing import Annotated

from fastapi import Depends, HTTPException, Request, status
from sqlmodel import Session

from app import crud
from app.core.db import engine
from app.models import Campaign


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]


async def get_campaign(request: Request, session: SessionDep) -> Campaign:
    campaign_id = request.query_params.get("campaign_id")
    if campaign_id is None:
        print("pathparams", request.path_params)
        campaign_id = request.path_params.get("campaign_id")
        print("frompath", campaign_id)
    if campaign_id is None:
        try:
            body = await request.json()
        except JSONDecodeError:
            pass
        else:
            campaign_id = body.get("campaign_id")
    if not campaign_id:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, detail="Campaign ID not provided"
        )

    campaign = crud.get_campaign(session, campaign_id)
    if not campaign:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Campaign not found")
    return campaign
