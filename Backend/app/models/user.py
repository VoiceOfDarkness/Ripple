from datetime import datetime
from typing import ForwardRef, List

from app.models.order import Order
from app.models.services import Gigs
from app.models.message import Message
from app.models.review import Review
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "user"

    id: int | None = Field(default=None, primary_key=True)
    user_name: str | None = Field(max_length=50, default=None, nullable=True)
    hash_password: str = Field(max_length=128, nullable=False)
    user_image: str | None = Field(max_length=255, default=None, nullable=True)
    email: str = Field(sa_column=Column("email", String(255), unique=True))
    location: str | None = Field(max_length=128, default=None, nullable=True)
    first_name: str | None = Field(max_length=50, default=None, nullable=True)
    last_name: str | None = Field(max_length=50, default=None, nullable=True)

    freelancers: List["Freelancer"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "all, delete"}
    )
    hire_managers: List["HireManager"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "all, delete"}
    )
    reviews: List["Review"] = Relationship(back_populates="user")

    sent_messages: List["Message"] = Relationship(
        back_populates="sender",
        sa_relationship_kwargs={"foreign_keys": "Message.sender_id"},
    )
    received_messages: List["Message"] = Relationship(
        back_populates="receiver",
        sa_relationship_kwargs={"foreign_keys": "Message.receiver_id"},
    )

    is_active: bool = Field(default=True)
    is_blocked: bool = Field(default=False)

    is_freelancer: bool = Field(default=False)
    is_hire_manager: bool = Field(default=True)


class Freelancer(SQLModel, table=True):
    __tablename__ = "freelancer"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(
        sa_column=Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    )
    registration_date: datetime = Field(default=datetime.now(), nullable=False)
    overview: str = Field(max_length=1024, nullable=True)
    user: User = Relationship(back_populates="freelancers")
    gigs: List[ForwardRef("Gigs")] = Relationship(back_populates="freelancer")  # type: ignore
    orders: List[ForwardRef("Order")] = Relationship(back_populates="freelancer")  # type: ignore


class HireManager(SQLModel, table=True):
    __tablename__ = "hire_manager"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(
        sa_column=Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    )
    registration_date: datetime = Field(default=datetime.now(), nullable=False)
    user: User = Relationship(back_populates="hire_managers")
    orders: List[ForwardRef("Order")] = Relationship(back_populates="hire_manager")  # type: ignore
