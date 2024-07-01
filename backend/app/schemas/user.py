from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from app.schemas.order import Order
from pydantic import BaseModel, EmailStr, Field

if TYPE_CHECKING:
    from app.schemas.services import Gigs


# User schemas
class BaseUser(BaseModel):
    user_name: Optional[str] = Field(max_length=128)
    user_image: Optional[str] = Field(None, max_length=255)
    email: EmailStr
    localtion: str = Field(None, max_length=128)
    created_at: Optional[datetime]
    first_name: Optional[str] = Field(None, max_length=128)
    last_name: Optional[str] = Field(None, max_length=128)


class User(BaseUser):
    id: Optional[int] = None
    overview: Optional[str] = Field(None, max_length=1024)

    is_active: bool = False
    is_banned: bool = False
    is_freelancer: bool = False
    is_hire_manager: bool = True


class UpdateUser(BaseModel):
    user_name: Optional[str] = Field(None, max_length=128)
    user_image: Optional[str] = Field(None, max_length=255)
    first_name: Optional[str] = Field(None, max_length=128)
    last_name: Optional[str] = Field(None, max_length=128)
    overview: Optional[str] = Field(None, max_length=1024)


class UpdatePrivateUser(BaseModel):
    hash_password: Optional[str] = Field(None, min_length=8)


class CreateUser(BaseModel):
    user_name: str = Field(..., max_length=128)
    user_image: Optional[str] = Field(None, max_length=255)
    is_active: bool = False
    email: EmailStr
    hash_password: str


# Freelancer schemas
class BaseFreelancer(BaseModel):
    user_id: int


class Freelancer(BaseFreelancer):
    user: User
    orders: List["Order"]
    gigs: List["Gigs"]


class FreelancerGigsImages(BaseModel):
    id: int
    filename: str
    gig_id: int


class FreelancerGigs(BaseModel):
    id: int
    title: str
    price: float
    rating: float
    num_reviews: int
    images: List[FreelancerGigsImages]


class FreelancerResponse(BaseFreelancer):
    user: User
    gigs: List["FreelancerGigs"]


class CreateFreelancer(BaseFreelancer):
    pass


class FreelancerNoRelation(BaseFreelancer):
    user: "User"


# HireManager schemas
class BaseHireManager(BaseModel):
    user_id: int


class HireManager(BaseHireManager):
    user: "User"


class CreateHireManager(BaseHireManager):
    pass
