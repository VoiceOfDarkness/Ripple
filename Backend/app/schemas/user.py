from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from app.schemas.order import Order
from pydantic import BaseModel, ConfigDict, EmailStr, Field

if TYPE_CHECKING:
    from app.schemas.services import Gigs


# User schemas
class BaseUser(BaseModel):
    user_name: Optional[str] = Field(max_length=128)
    email: EmailStr
    first_name: Optional[str] = Field(None, max_length=128)
    last_name: Optional[str] = Field(None, max_length=128)


class User(BaseUser):
    id: Optional[int] = None

    is_active: bool = False
    is_banned: bool = False


class UpdateUser(BaseModel):
    user_name: Optional[str] = Field(None, max_length=128)
    first_name: Optional[str] = Field(None, max_length=128)
    last_name: Optional[str] = Field(None, max_length=128)


class UpdatePrivateUser(BaseModel):
    hash_password: Optional[str] = Field(None, min_length=8)


class UserPrivate(User):
    hash_password: str


class CreateUser(BaseUser):
    password: str


# Freelancer schemas
class BaseFreelancer(BaseModel):
    user_id: int


class Freelancer(BaseFreelancer):
    location: str | None
    overview: str | None
    registration_date: datetime
    user: User
    orders: List["Order"]
    gigs: List["Gigs"]


class CreateFreelancer(BaseFreelancer):
    pass


class FreelancerNoRelation(BaseFreelancer):
    location: str | None
    overview: str | None
    registration_date: datetime
    user: User


# HireManager schemas
class BaseHireManager(BaseModel):
    user_id: int


class HireManager(BaseHireManager):
    location: str | None
    registration_date: datetime
    user: User
    orders: List["Order"]


class CreateHireManager(BaseHireManager):
    pass
