from datetime import datetime
from typing import ForwardRef, List

from app.models.order import Order
from app.models.services import Gigs
from app.models.message import Message
from app.models.review import Review
from app.models.message import Chat
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "user"

    id: int | None = Field(default=None, primary_key=True)
    user_name: str | None = Field(max_length=50, default=None, nullable=True)
    hash_password: str = Field(max_length=128, nullable=False)
    user_image: str | None = Field(max_length=255, default=None, nullable=True)
    email: str = Field(sa_column=Column("email", String(255), unique=True, index=True))
    location: str | None = Field(max_length=128, default=None, nullable=True)
    first_name: str | None = Field(max_length=50, default=None, nullable=True)
    last_name: str | None = Field(max_length=50, default=None, nullable=True)
    created_at: datetime = Field(default_factory=datetime.now)

    freelancers: List["Freelancer"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "all, delete"}
    )
    hire_managers: List["HireManager"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "all, delete"}
    )
    reviews: List["Review"] = Relationship(back_populates="user")

    chats_as_user1: List["Chat"] = Relationship(
        back_populates="user1",
        sa_relationship_kwargs={
            "foreign_keys": "Chat.user_id_1",
            "cascade": "all, delete",
        },
    )
    chats_as_user2: List["Chat"] = Relationship(
        back_populates="user2",
        sa_relationship_kwargs={
            "foreign_keys": "Chat.user_id_2",
            "cascade": "all, delete",
        },
    )

    sent_messages: List["Message"] = Relationship(
        back_populates="sender",
        sa_relationship_kwargs={"foreign_keys": "Message.sender_id"},
    )

    is_active: bool = Field(index=True, default=True)
    is_blocked: bool = Field(index=True, default=False)

    is_freelancer: bool = Field(index=True, default=False)
    is_hire_manager: bool = Field(index=True, default=True)


class Freelancer(SQLModel, table=True):
    __tablename__ = "freelancer"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(
        sa_column=Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    )
    overview: str = Field(max_length=1024, nullable=True)
    user: User = Relationship(back_populates="freelancers")
    gigs: List[ForwardRef("Gigs")] = Relationship(back_populates="freelancer")  # type: ignore
    orders: List[ForwardRef("Order")] = Relationship(back_populates="freelancer")  # type: ignore


class HireManager(SQLModel, table=True):
    __tablename__ = "hire_manager"  # type: ignore

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(
        sa_column=Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), index=True)
    )
    user: User = Relationship(back_populates="hire_managers")
    orders: List[ForwardRef("Order")] = Relationship(back_populates="hire_manager")  # type: ignore
