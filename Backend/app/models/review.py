from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.services import Gigs


class Review(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True, index=True)
    gig_id: int = Field(foreign_key="gigs.id")
    user_id: int = Field(foreign_key="user.id")
    rating: int = Field(nullable=False)
    comment: str = Field(nullable=False)
    gig: "Gigs" = Relationship(back_populates="reviews")
    user: "User" = Relationship(back_populates="reviews")
