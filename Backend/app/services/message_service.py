from fastapi import WebSocketDisconnect

from app.services.base_service import BaseService
from app.repository.message_repository import MessageRepository
from app.services.connection_manager import manager


class MessageService(BaseService):
    def __init__(self, message_repository: MessageRepository) -> None:
        self.message_repository = message_repository
        super().__init__(message_repository)

    async def get_messages(self, user_id: int):
        return self.message_repository.get_message_by_user_id(user_id)

    async def websocket_handler(self, websocket, user_id):
        await manager.connect(websocket)
        try:
            while True:
                data = await websocket.receive_text()
                await manager.broadcast(f"User {user_id}: {data}")
        except WebSocketDisconnect:
            manager.disconnect(websocket)
            await manager.broadcast(f"User {user_id} left the chat")
