from typing import List

from app.schemas.services import Gigs
from pydantic import BaseModel, Field


class BaseCategory(BaseModel):
    name: str = Field(..., max_length=128)


class Category(BaseCategory):
    id: int
    gigs: List["Gigs"]


class CreateCategory(BaseCategory):
    pass
