from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from app.schemas.order import Order
from pydantic import BaseModel, EmailStr, Field
from typing import List, TYPE_CHECKING

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.schemas.order import Order

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
    user_name: str = Field(..., max_length=128)
    email: EmailStr
    first_name: str = Field(..., max_length=128)
    last_name: str = Field(..., max_length=128)

class User(BaseUser):
    model_config = ConfigDict(orm_mode=True)

    id: int
    is_active: bool = True
    is_banned: bool = False


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
