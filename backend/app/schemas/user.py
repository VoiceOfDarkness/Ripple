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
    created_at: datetime
    first_name: Optional[str] = Field(None, max_length=128)
    last_name: Optional[str] = Field(None, max_length=128)


class User(BaseUser):
    id: Optional[int] = None

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


class UserPrivate(User):
    hash_password: str

# Freelancer schemas
class BaseFreelancer(BaseModel):
    user_id: int


class Freelancer(BaseFreelancer):
    overview: str | None
    user: User
    orders: List["Order"]
    gigs: List["Gigs"]


class CreateFreelancer(BaseFreelancer):
    pass


class FreelancerNoRelation(BaseFreelancer):
    overview: str | None
    user: "User"


# HireManager schemas
class BaseHireManager(BaseModel):
    user_id: int


class HireManager(BaseHireManager):
    user: "User"


class CreateHireManager(BaseHireManager):
    pass
