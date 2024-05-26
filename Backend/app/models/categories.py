from typing import TYPE_CHECKING, List

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.services import Gigs


class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=128, nullable=False)
    gigs: List["Gigs"] = Relationship(back_populates="category")  # type: ignore
