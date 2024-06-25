import uuid
from typing import List, Optional

from pydantic import BaseModel, Field
from datetime import datetime


class Messsage(BaseModel):
    id: int
    sender_id: int
    chat_id: uuid.UUID
    content: str
    timestamp: datetime

    class Config:
        from_attributes = True


class MessageCreate(BaseModel):
    content: str = Field(..., max_length=500)
    chat_id: uuid.UUID


class ChatCreate(BaseModel):
    user_id_2: int


class ChatResponse(BaseModel):
    id: uuid.UUID
    user_id_1: int
    user_id_2: int


class ChatDetailResponse(BaseModel):
    id: uuid.UUID
    user_id_1: int
    user_id_2: int
    messages: Optional[List[Messsage]]