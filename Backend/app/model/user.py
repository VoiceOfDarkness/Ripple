from enum import Enum

from sqlmodel import Field
from app.model.base_model import BaseModel


class UserType(Enum):
    buyer = "buyer"
    seller = "seller"


class User(BaseModel, table=True):
    user_id: int = Field(default=None, primary_key=True, index=True)
    role: UserType = Field(default="buyer")
    name: str = Field(default=None)
    email: str = Field(default=None)
    description: str = Field(default=None)
    password_hash: str = Field(default=None)
    profile_picture: str = Field(default=None)
