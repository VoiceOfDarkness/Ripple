from fastapi import WebSocketDisconnect, WebSocket, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import logging
import json
import uuid

from app.services.base_service import BaseService
from app.repository.message_repository import MessageRepository
from app.schemas.message import MessageCreate, ChatCreate
from app.schemas.user import User
from app.services.connection_manager import manager

logger = logging.getLogger(__name__)


class MessageService(BaseService):
    def __init__(self, message_repository: MessageRepository) -> None:
        self.message_repository = message_repository
        super().__init__(message_repository)

    async def get_chats(self, user_id: int):
        return await self.message_repository.get_chats_by_user_id(user_id)

    async def get_chat(self, chat_id: int, user_id: int):
        return await self.message_repository.get_chat_by_id(chat_id, user_id)

    async def add_message(self, user_id: int, message: MessageCreate):
        await self.message_repository.add_message(user_id, message)

        return JSONResponse(
            content={"message": "Message sent"},
            status_code=status.HTTP_201_CREATED,
        )

    async def create_chat(self, chat: ChatCreate, user_id: int):
        chat = await self.message_repository.create_chat(chat, user_id)

        return JSONResponse(
            content={"chat_id": jsonable_encoder(chat.id)},
            status_code=status.HTTP_201_CREATED,
        )

    async def websocket_handler(
        self, websocket: WebSocket, chat_id: uuid.UUID, user: User
    ):
        logger.info(f"AAAAAAAAAAA {user}")
        await manager.connect(websocket, user.id)
        try:
            while True:
                data = await websocket.receive_text()
                message_data = json.loads(data)
                content = message_data.get("content")
                receiver_id = message_data.get("recipient_id")

                logger.info(f"Received message: {content}")

                if content:
                    message = MessageCreate(content=content, chat_id=chat_id)
                    await self.add_message(
                        user.id,
                        message,
                    )

                    await manager.send_personal_message(content, websocket, receiver_id)

        except WebSocketDisconnect:
            manager.disconnect(user.id)
        except Exception as e:
            logger.error(f"Error in websocket_handler: {e}")
            await websocket.close()
