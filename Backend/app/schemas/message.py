from pydantic import BaseModel, Field


class Message(BaseModel):
    content: str = Field(..., max_length=500)
