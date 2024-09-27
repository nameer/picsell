from fastapi import APIRouter

from app.api.campaign import router as campaign_router

api_router = APIRouter()


@api_router.get("/health")
def health():
    return {"status": "ok"}


api_router.include_router(campaign_router, prefix="/campaigns", tags=["Campaigns"])
