from datetime import datetime
from typing import ForwardRef, List

from app.models.order import Order
from app.models.services import Gigs
from app.models.message import Message
from sqlalchemy import Column, String
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "user"

    id: int | None = Field(default=None, primary_key=True)
    user_name: str | None = Field(max_length=50, default=None, nullable=True)
    hash_password: str = Field(max_length=128, nullable=False)
    user_image: str | None = Field(max_length=255, default=None, nullable=True)
    email: str = Field(sa_column=Column("email", String(255), unique=True))
    first_name: str | None = Field(max_length=50, default=None, nullable=True)
    last_name: str | None = Field(max_length=50, default=None, nullable=True)
    
    freelancers: "Freelancer" = Relationship(back_populates="user")
    hire_managers: "HireManager" = Relationship(back_populates="user")
    
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


class Freelancer(SQLModel, table=True):
    __tablename__ = "freelancer"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    location: str = Field(max_length=128, nullable=True)
    registration_date: datetime = Field(default=datetime.now(), nullable=False)
    overview: str = Field(max_length=1024, nullable=True)
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
