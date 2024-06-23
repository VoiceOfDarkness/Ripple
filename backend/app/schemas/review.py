from pydantic import BaseModel, Field

from app.schemas.user import User


class BaseReview(BaseModel):
    rating: int
    comment: str


class CreateReview(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    comment: str = Field(..., min_length=1)
    gig_id: int


class ReviewResponse(BaseReview):
    id: int
    user: User

    class Config:
        from_attributes = True
