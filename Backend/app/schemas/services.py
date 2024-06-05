from decimal import Decimal
from typing import TYPE_CHECKING, ForwardRef, Optional

from app.schemas.user import FreelancerNoRelation
from pydantic import BaseModel, Field

if TYPE_CHECKING:
    from app.schemas.category import BaseCategory


class BaseGigs(BaseModel):
    title: str = Field(..., max_length=128, example="Professional Logo Design")
    description: str = Field(
        ...,
        max_length=512,
        example="I will create a unique and eye-catching logo for your brand.",
    )
    category_id: int = Field(..., example=1)
    price: Decimal = Field(
        ..., decimal_places=2, example=49.99
    )  # Expanded for higher prices
    delivery_time: int = Field(..., example=3)  # Days


# Model for creating new gigs
class CreateGigs(BaseGigs):
    pass


class FileCreateGigs(BaseModel):
    data: CreateGigs
    image_filename: Optional[str] = None


# # Model for gig updates (only modifiable fields)
# class UpdateGigs(BaseModel):
#     title: Optional[str] = Field(None, max_length=128)
#     description: Optional[str] = Field(None, max_length=512)
#     price: Optional[Decimal] = Field(None, decimal_places=2)
#     delivery_time: Optional[int] = None


# Model for full gig representation
class Gigs(BaseGigs):
    id: int
    seller_id: int
    freelancer: "FreelancerNoRelation"
    category: "BaseCategory"
    rating: float = Field(ge=0, le=5, default=0)
    num_reviews: int = Field(default=0)
    image_filename: str = Field(..., max_length=512, example="logo_design.jpg")


class GigsTest(BaseGigs):
    id: int
    seller_id: int
    rating: float = Field(ge=0, le=5, default=0)
    num_reviews: int = Field(default=0)
    image_filename: str = Field(..., max_length=512, example="logo_design.jpg")
