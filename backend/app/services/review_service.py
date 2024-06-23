from app.repository.review_repository import ReviewRepository
from app.services.base_service import BaseService
from fastapi import status
from fastapi.responses import JSONResponse

from app.schemas.user import User
from app.schemas.review import CreateReview


class ReviewService(BaseService):
    def __init__(self, review_repository: ReviewRepository) -> None:
        self.review_repository = review_repository
        super().__init__(review_repository)

    async def add_review(self, review: CreateReview, user: User):
        user_id = user.id
        await self.review_repository.create(user_id, review)

        return JSONResponse(
            content={"message": "Review added successfully"},
            status_code=status.HTTP_201_CREATED,
        )
