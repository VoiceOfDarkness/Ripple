from datetime import datetime

from sqlmodel import Column, DateTime, Field, SQLModel, func


class BaseModel(SQLModel):
    id: int = Field(primary=True, index=True)
    created_at: datetime = Field(default=func.now(), sa_column=Column(DateTime, default=func.now()))
    updated_at: datetime = Field(default=func.now(), sa_column=Column(DateTime, default=func.now(),
                                                                      onupdate=func.now()))
