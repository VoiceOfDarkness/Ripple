from typing import List

from app.schemas.services import Gigs
from pydantic import BaseModel, Field


class BaseCategory(BaseModel):
    id: int
    name: str = Field(..., max_length=128)


class Category(BaseCategory):
    gigs: List["Gigs"]


class CategoryResponse(BaseCategory):
    pass


class CreateCategory(BaseModel):
    name: str = Field(..., max_length=128)
