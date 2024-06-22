from fastapi import APIRouter, Depends, Body
from dependency_injector.wiring import Provide, inject
from typing import List

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.user import User
from app.services.review_service import ReviewService
from app.schemas.review import CreateReview, ReviewResponse

review_router = APIRouter(tags=["Review"])


@review_router.get("/reviews", response_model=List[ReviewResponse])
@inject
async def get_reviews(
    review_service: ReviewService = Depends(Provide[Container.review_service]),
):
    return await review_service.get_list()


@review_router.post("/review")
@inject
async def create_review(
    review: CreateReview = Body(...),
    current_user: User = Depends(get_current_user),
    review_service: ReviewService = Depends(Provide[Container.review_service]),
):
    return await review_service.add_review(review, current_user)


@review_router.delete("/review/{review_id}")
@inject
async def delete_review(
    review_id: int,
    current_user: User = Depends(get_current_user),
    review_service: ReviewService = Depends(Provide[Container.review_service]),
):
    return await review_service.delete(review_id)
