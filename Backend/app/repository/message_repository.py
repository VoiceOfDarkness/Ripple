from contextlib import AbstractContextManager
from typing import Callable

from app.models.message import Message
from app.schemas.message import MessageCreate
from app.repository.base_repository import BaseRepository
from sqlalchemy.orm import Session
from sqlalchemy.future import select


class MessageRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self._session_factory = session_factory
        super().__init__(session_factory, Message)

    async def get_message_by_user_id(self, user_id: int):
        async with self._session_factory() as session:
            stmt = select(Message).where(
                Message.sender_id == user_id or Message.receiver_id == user_id
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().all()

            return db_obj

    async def add_message(self, user_id, scheme: MessageCreate):
        message_data = scheme.model_dump()
        message_data["sender_id"] = user_id
        query = Message(**message_data)

        async with self._session_factory() as session:
            session.add(query)
            await session.commit()
            await session.refresh(query)

        return query
