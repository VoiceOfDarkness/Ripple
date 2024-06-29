import uuid

from datetime import datetime
from typing import TYPE_CHECKING, List

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import User


class Chat(SQLModel, table=True):
    __tablename__ = "chat"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id_1: int = Field(index=True, foreign_key="user.id")
    user_id_2: int = Field(index=True, foreign_key="user.id")
    messages: List["Message"] = Relationship(
        back_populates="chat", sa_relationship_kwargs={"cascade": "all, delete"}
    )

    user1: "User" = Relationship(
        back_populates="chats_as_user1",
        sa_relationship_kwargs={"foreign_keys": "Chat.user_id_1"},
    )
    user2: "User" = Relationship(
        back_populates="chats_as_user2",
        sa_relationship_kwargs={"foreign_keys": "Chat.user_id_2"},
    )


class Message(SQLModel, table=True):
    __tablename__ = "message"

    id: int | None = Field(default=None, primary_key=True)
    chat_id: uuid.UUID = Field(index=True, foreign_key="chat.id")
    sender_id: int = Field(index=True, foreign_key="user.id")
    content: str = Field(max_length=500)
    timestamp: datetime = Field(default_factory=datetime.now)
    is_read: bool = Field(default=False)
    chat: "Chat" = Relationship(back_populates="messages")
    sender: "User" = Relationship(
        back_populates="sent_messages",
        sa_relationship_kwargs={"foreign_keys": "Message.sender_id"},
    )
