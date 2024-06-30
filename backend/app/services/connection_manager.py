from fastapi import WebSocket
from typing import Dict
import logging
import asyncio

logger = logging.getLogger(__name__)


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}
        self.lock = asyncio.Lock()

    async def connect(self, websocket: WebSocket, user_id: int):
        async with self.lock:
            await websocket.accept()
            self.active_connections[user_id] = websocket
            logger.info(
                f"User {user_id} connected. Current connections: {self.active_connections}"
            )

    async def disconnect(self, user_id: int):
        async with self.lock:
            if user_id in self.active_connections:
                del self.active_connections[user_id]
                logger.info(
                    f"User {user_id} disconnected. Current connections: {self.active_connections}"
                )

    async def send_personal_message(self, message: str, user_id: int):
        async with self.lock:
            logger.info(
                f"Sending message to user {user_id}. Current connections: {self.active_connections}"
            )
            websocket = self.active_connections.get(user_id)
            if websocket:
                data = {"content": message}
                logger.info(f"Message to user {user_id}: {data['content']}")
                await websocket.send_json(data)


manager = ConnectionManager()
