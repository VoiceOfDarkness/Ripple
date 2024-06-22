from decimal import Decimal
from typing import TYPE_CHECKING, List

from app.models.categories import Category
from app.models.order import Order
from app.models.review import Review
from sqlalchemy import CheckConstraint, Column, Float
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import Freelancer


class Gigs(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    seller_id: int = Field(index=True, foreign_key="freelancer.id")
    title: str = Field(max_length=128, nullable=False)
    description: str = Field(max_length=512)
    category_id: int = Field(index=True, foreign_key="category.id")
    price: Decimal = Field(
        index=True, default=0, max_digits=10, decimal_places=2, nullable=False
    )
    delivery_time: int = Field(default=0, nullable=False)
    rating: float = Field(
        sa_column=Column(
            Float(precision=3, asdecimal=True),
            CheckConstraint("rating >= 0 AND rating <= 10"),
            index=True,
            default=0,
        ),
    )
    num_reviews: int = Field(default=0)

    freelancer: "Freelancer" = Relationship(back_populates="gigs")
    category: "Category" = Relationship(back_populates="gigs")
    orders: List["Order"] = Relationship(back_populates="gigs")
    reviews: List["Review"] = Relationship(back_populates="gig")
    images: List["Image"] = Relationship(back_populates="gig")


class Image(SQLModel, table=True):
    id: int = Field(primary_key=True)
    filename: str = Field(max_length=255)
    gig_id: int = Field(index=True, foreign_key="gigs.id")
    gig: Gigs = Relationship(back_populates="images")
