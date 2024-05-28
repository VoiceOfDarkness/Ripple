from decimal import Decimal
from typing import TYPE_CHECKING

from app.models.categories import Category
from app.models.order import Order
from sqlalchemy import CheckConstraint, Column, Float
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import Freelancer


class Gigs(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    seller_id: int = Field(foreign_key="freelancer.id")
    title: str = Field(max_length=128, nullable=False)
    description: str = Field(max_length=512)
    image_filename: str = Field(max_length=255, default="placeholder.jpg")
    category_id: int = Field(foreign_key="category.id")
    price: Decimal = Field(default=0, max_digits=5, decimal_places=2, nullable=False)
    delivery_time: int = Field()  # Don't have any idea. Do we even need it?
    rating: float = Field(
        sa_column=Column(
            Float(precision=3, asdecimal=True),
            CheckConstraint("rating >= 0 AND rating <= 10"),
            default=0,
        )
    )
    num_reviews: int = Field(default=0)
    freelancer: "Freelancer" = Relationship(back_populates="gigs")
    category: "Category" = Relationship(back_populates="gigs")
    orders: list["Order"] = Relationship(back_populates="gigs")
