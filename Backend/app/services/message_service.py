from fastapi import WebSocketDisconnect, WebSocket
import logging
import json

from app.services.base_service import BaseService
from app.repository.message_repository import MessageRepository
from app.schemas.message import MessageCreate
from app.schemas.user import User
from app.services.connection_manager import manager

logger = logging.getLogger(__name__)


class MessageService(BaseService):
    def __init__(self, message_repository: MessageRepository) -> None:
        self.message_repository = message_repository
        super().__init__(message_repository)

    async def get_messages(self, user_id: int):
        return await self.message_repository.get_message_by_user_id(user_id)

    async def add_message(self, user_id: int, message: MessageCreate):
        return await self.message_repository.add_message(user_id, message)

    async def websocket_handler(self, websocket: WebSocket, user: User):
        await manager.connect(websocket, user.id)
        try:
            while True:
                data = await websocket.receive_text()
                message_data = json.loads(data)
                content = message_data.get("content")
                receiver_id = message_data.get("recipient_id")

                logger.info(f"Received message: {content} to {receiver_id}")

                if content and receiver_id:
                    message = MessageCreate(content=content, receiver_id=receiver_id)
                    logger.info(f"Message: {message} {user.id}")
                    await self.add_message(user.id, message)

                    await manager.send_personal_message(
                        content, websocket, receiver_id, user.user_name
                    )
        except WebSocketDisconnect:
            manager.disconnect(user.id)
        except Exception as e:
            logger.error(f"Error in websocket_handler: {e}")
            await websocket.close()
