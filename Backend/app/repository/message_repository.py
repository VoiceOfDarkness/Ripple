from contextlib import AbstractContextManager
from typing import Callable

from app.models.message import Message, Chat
from app.schemas.message import MessageCreate, ChatCreate
from app.repository.base_repository import BaseRepository
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload


class MessageRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractContextManager[AsyncSession]]
    ):
        self._session_factory = session_factory
        super().__init__(session_factory, Message)

    async def get_chat_by_id(self, chat_id: int, user_id: int):
        async with self._session_factory() as session:
            stmt = (
                select(Chat)
                .options(joinedload(Chat.messages))
                .where(
                    (Chat.id == chat_id)
                    & ((Chat.user_id_1 == user_id) | (Chat.user_id_2 == user_id))
                )
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().unique().one_or_none()

            return db_obj

    async def get_chats_by_user_id(self, user_id: int):
        async with self._session_factory() as session:
            stmt = (
                select(Chat)
                .options(joinedload(Chat.messages))
                .where((Chat.user_id_1 == user_id) | (Chat.user_id_2 == user_id))
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().unique().all()

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

    async def create_chat(self, chat: ChatCreate, user_id: int) -> Chat:
        async with self._session_factory() as session:
            stmt = select(Chat).where(
                ((Chat.user_id_1 == user_id) & (Chat.user_id_2 == chat.user_id_2))
                | ((Chat.user_id_1 == chat.user_id_2) & (Chat.user_id_2 == user_id))
            )
            result = await session.execute(stmt)
            db_chat = result.scalars().unique().one_or_none()

            if db_chat is None:
                chat = Chat(user_id_1=user_id, user_id_2=chat.user_id_2)
                session.add(chat)
                await session.commit()
                await session.refresh(chat)
                
                return chat

        return db_chat
