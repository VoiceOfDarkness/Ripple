from datetime import datetime

from sqlmodel import SQLModel, Field, Relationship
from typing import List, ForwardRef

from app.utils.security import pwd_context
from app.models.services import Gigs

from app.models.order import Order


class User(SQLModel, table=True):
    __tablename__ = "user"

    id: int | None = Field(default=None, primary_key=True)
    user_name: str = Field(max_length=128)
    hash_password: str = Field(max_length=128)
    email: str = Field(max_length=128)
    first_name: str = Field(max_length=128)
    last_name: str = Field(max_length=128)
    freelancers: List["Freelancer"] = Relationship(back_populates="user")
    hire_managers: List["HireManager"] = Relationship(back_populates="user")

    def set_password(self, password: str) -> None:
        self.hash_password = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hash_password)


class Freelancer(SQLModel, table=True):
    __tablename__ = "freelancer"

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    location: str = Field(max_length=128)
    registration_date: datetime = Field(default=datetime.now())
    overview: str = Field(max_length=1024)
    user: User = Relationship(back_populates="freelancers")
    gigs: List[ForwardRef('Gigs')] = Relationship(back_populates="freelancer")  # type: ignore
    orders: List[ForwardRef('Order')] = Relationship(back_populates="freelancer")  # type: ignore


class HireManager(SQLModel, table=True):
    __tablename__ = "hire_manager"

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    registration_date: datetime = Field(default=datetime.now())
    location: str = Field(max_length=128)
    user: User = Relationship(back_populates="hire_managers")
    orders: List[ForwardRef('Order')] = Relationship(back_populates="hire_manager")  # type: ignore
