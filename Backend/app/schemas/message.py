from pydantic import BaseModel, Field
from datetime import datetime


class MessageCreate(BaseModel):
    receiver_id: int = Field(..., gt=0)
    content: str = Field(..., max_length=500)


class MessageRead(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    content: str
    timestamp: datetime

    class Config:
        from_attributes = True
