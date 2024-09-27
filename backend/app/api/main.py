from fastapi import APIRouter, Depends

from app.api.campaign import router as campaign_router
from app.api.deps import get_campaign
from app.api.qa import router as qa_router

api_router = APIRouter()


@api_router.get("/health")
def health():
    return {"status": "ok"}


api_router.include_router(campaign_router, prefix="/campaigns", tags=["Campaigns"])
api_router.include_router(
    qa_router,
    prefix="/qa",
    tags=["Question Answering"],
    dependencies=[Depends(get_campaign)],
)
