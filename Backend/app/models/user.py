from datetime import datetime

from sqlmodel import SQLModel, Field, Relationship, null
from sqlalchemy import Column, String
from typing import List, ForwardRef

from app.utils.security import pwd_context
from app.models.services import Gigs

from app.models.order import Order


# consider user payment field relationship
class User(SQLModel, table=True):
    __tablename__ = "user" # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_name: str = Field(max_length=128, nullable=False)
    hash_password: str = Field(max_length=128, nullable=False)
    email: str = Field(sa_column=Column("email", String(255), unique=True))
    first_name: str = Field(max_length=128, nullable=False)
    last_name: str = Field(max_length=128, nullable=False)
    freelancers: List["Freelancer"] = Relationship(back_populates="user")
    hire_managers: List["HireManager"] = Relationship(back_populates="user")
    is_active: bool = Field(default=True)
    is_blocked: bool = Field(default=False)

    def set_password(self, password: str) -> None:
        self.hash_password = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hash_password)


class Freelancer(SQLModel, table=True):
    __tablename__ = "freelancer" # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    location: str = Field(max_length=128)
    registration_date: datetime = Field(default=datetime.now(), nullable=False)
    overview: str = Field(max_length=1024)
    user: User = Relationship(back_populates="freelancers")
    gigs: List[ForwardRef('Gigs')] = Relationship(back_populates="freelancer")  # type: ignore
    orders: List[ForwardRef('Order')] = Relationship(back_populates="freelancer")  # type: ignore


class HireManager(SQLModel, table=True):
    __tablename__ = "hire_manager" # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    registration_date: datetime = Field(default=datetime.now(), nullable=False)
    location: str = Field(max_length=128)
    user: User = Relationship(back_populates="hire_managers")
    orders: List[ForwardRef('Order')] = Relationship(back_populates="hire_manager")  # type: ignore
