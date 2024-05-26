from datetime import datetime
from typing import ForwardRef, List

from app.models.order import Order
from app.models.services import Gigs
from sqlalchemy import Column, String
from sqlmodel import Field, Relationship, SQLModel, null


class User(SQLModel, table=True):
    __tablename__ = "user"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_name: str | None = Field(max_length=50, default=None, nullable=True)
    hash_password: str = Field(max_length=128, nullable=False)
    email: str = Field(sa_column=Column("email", String(255), unique=True))
    first_name: str | None = Field(max_length=50, default=None, nullable=True)
    last_name: str | None = Field(max_length=50, default=None, nullable=True)
    freelancers: List["Freelancer"] = Relationship(back_populates="user")
    hire_managers: List["HireManager"] = Relationship(back_populates="user")
    is_active: bool = Field(default=True)
    is_blocked: bool = Field(default=False)


class Freelancer(SQLModel, table=True):
    __tablename__ = "freelancer"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    location: str = Field(max_length=128)
    registration_date: datetime = Field(default=datetime.now, nullable=False)
    overview: str = Field(max_length=1024)
    user: User = Relationship(back_populates="freelancers")
    gigs: List[ForwardRef("Gigs")] = Relationship(back_populates="freelancer")  # type: ignore
    orders: List[ForwardRef("Order")] = Relationship(back_populates="freelancer")  # type: ignore


class HireManager(SQLModel, table=True):
    __tablename__ = "hire_manager"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    registration_date: datetime = Field(default=datetime.now(), nullable=False)
    location: str = Field(max_length=128)
    user: User = Relationship(back_populates="hire_managers")
    orders: List[ForwardRef("Order")] = Relationship(back_populates="hire_manager")  # type: ignore
