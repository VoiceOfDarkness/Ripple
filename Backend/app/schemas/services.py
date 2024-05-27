from decimal import Decimal
from typing import TYPE_CHECKING, List

from app.schemas.user import Freelancer
from pydantic import BaseModel, Field
from typing import List
from typing import TYPE_CHECKING

from pydantic import BaseModel, Field

from app.schemas.user import Freelancer

if TYPE_CHECKING:
    from app.schemas.category import Category

# Gigs schemas
class BaseGigs(BaseModel):
    title: str = Field(..., max_length=128)
    description: str = Field(..., max_length=512)
    category_id: int
    price: Decimal = Field(..., max_digits=5, decimal_places=2)
    delivery_time: int
    image: str = Field(..., max_length=512)


class Gigs(BaseGigs):
    id: int
    seller_id: int
    freelancer: "Freelancer"
    category: "Category"
    rating: float = Field(ge=0, le=10, default=0)
    num_reviews: int = Field(default=0)

class CreateGigs(BaseGigs):
    seller_id: int

class UpdateGigs(BaseGigs):
    pass