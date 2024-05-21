from sqlmodel import SQLModel, Field, Relationship

from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.services import Gigs


class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=128)
    gigs: List["Gigs"] = Relationship(back_populates="category")  # type: ignore
