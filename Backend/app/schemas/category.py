from pydantic import BaseModel, Field
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.services import Gigs

class BaseCategory(BaseModel):
    name: str = Field(..., max_length=128)

class Category(BaseCategory):
    id: int
    gigs: list["Gigs"]

class CreateCategory(BaseCategory):
    pass