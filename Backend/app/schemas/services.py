from pydantic import BaseModel, Field
from typing import List
from decimal import Decimal
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.user import Freelancer
    from app.schemas.category import Category

# Gigs schemas
class BaseGigs(BaseModel):
    seller_id: int
    title: str = Field(..., max_length=128)
    description: str = Field(..., max_length=512)
    category_id: int
    price: Decimal = Field(..., max_digits=5, decimal_places=2)
    # delivery_time: int
    image: str = Field(..., max_length=512)
    rating: float = Field(..., ge=0, le=10, default=0)
    num_reviews: int = Field(default=0)

class Gigs(BaseGigs):
    id: int
    freelancer: "Freelancer"
    category: "Category"

class CreateGigs(BaseGigs):
    pass