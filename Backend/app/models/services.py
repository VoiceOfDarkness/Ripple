from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.categories import Category
    from app.models.user import Freelancer


class Gigs(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    seller_id: int = Field(foreign_key="freelancer.id")
    title: str = Field(max_length=128)
    description: str = Field(max_length=512)
    category_id: int = Field(foreign_key="category.id")
    price: float = Field()
    delivery_time: int = Field()
    image: str = Field(max_length=512)
    rating: float = Field(default=0)
    num_reviews: int = Field(default=0)
    freelancer: "Freelancer" = Relationship(back_populates="gigs")
    category: "Category" = Relationship(back_populates="gigs")
