from contextlib import AbstractContextManager
from typing import Callable

from app.models.message import Message
from app.schemas.message import MessageCreate
from app.repository.base_repository import BaseRepository
from sqlalchemy.orm import Session


class MessageRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self._session_factory = session_factory
        super().__init__(session_factory, Message)

    def get_message_by_user_id(self, user_id: int):
        with self._session_factory() as session:
            return (
                session.query(Message)
                .filter(
                    (Message.sender_id == user_id) | (Message.receiver_id == user_id)
                )
                .all()
            )

    def add_message(self, user_id, scheme: MessageCreate):
        message_data = scheme.model_dump()
        message_data['sender_id'] = user_id
        query = Message(**message_data)
        
        with self._session_factory() as session:
            session.add(query)
            session.commit()
            session.refresh(query)

        return query