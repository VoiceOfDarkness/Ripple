
import pathlib
from decimal import Decimal
from typing import TYPE_CHECKING, List

from app.schemas.user import FreelancerNoRelation
from fastapi import File, UploadFile
from pydantic import BaseModel, Field, field_validator

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
    )
    delivery_time: int = Field(..., example=3)
    files: List[UploadFile] = File(...)

    @field_validator("files")
    def validate_files(cls, v: List[UploadFile]):
        if not v:
            raise ValueError("At least one file must be provided")
        for file in v:
            filename = pathlib.Path(file.filename).suffix
            if filename not in [".jpg", ".jpeg", ".png"]:
                raise ValueError("Only image files are allowed")
        return v


# Model for creating new gigs
class CreateGigs(BaseModel):
    title: str = Field(..., max_length=128, example="Professional Logo Design")
    description: str = Field(
        ...,
        max_length=512,
        example="I will create a unique and eye-catching logo for your brand.",
    )
    category_id: int = Field(..., example=1)
    price: Decimal = Field(
        ..., decimal_places=2, example=49.99
    )
    delivery_time: int = Field(..., example=3)
    images: List[str] = Field(..., max_length=512, example="logo_design.jpg")


# # Model for gig updates (only modifiable fields)
# class UpdateGigs(BaseModel):
#     title: Optional[str] = Field(None, max_length=128)
#     description: Optional[str] = Field(None, max_length=512)
#     price: Optional[Decimal] = Field(None, decimal_places=2)
#     delivery_time: Optional[int] = None


class Image(BaseModel):
    id: int
    filename: str = Field(..., max_length=512)
    gig_id: int


# Model for full gig representation
class Gigs(BaseModel):
    id: int
    title: str
    price: Decimal
    seller_id: int
    freelancer: "FreelancerNoRelation"
    category: "BaseCategory"
    rating: float = Field(ge=0, le=5, default=0)
    num_reviews: int = Field(default=0)
    images: List["Image"]
