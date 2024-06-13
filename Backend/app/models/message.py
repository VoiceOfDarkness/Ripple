from datetime import datetime
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.user import User


class Message(SQLModel, table=True):
    __tablename__ = "messages"

    id: int | None = Field(default=None, primary_key=True)
    sender_id: int = Field(foreign_key="user.id")
    receiver_id: int = Field(foreign_key="user.id")
    content: str = Field(max_length=500)
    timestamp: datetime = Field(default=datetime.now())
    sender: "User" = Relationship(
        back_populates="sent_messages",
        sa_relationship_kwargs={"foreign_keys": "Message.sender_id"},
    )
    receiver: "User" = Relationship(
        back_populates="received_messages",
        sa_relationship_kwargs={"foreign_keys": "Message.receiver_id"},
    )
