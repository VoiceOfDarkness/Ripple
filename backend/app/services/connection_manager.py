from fastapi import WebSocket
from typing import Dict


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        await self.broadcast_user_status(user_id, is_online=True)

    async def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            await self.broadcast_user_status(user_id, is_online=False)

    async def send_personal_message(
        self, message: str, websocket: WebSocket, user_id: int
    ):
        if user_id in self.active_connections:
            websocket = self.active_connections[user_id]
            data = {"content": message}
            await websocket.send_json(data)

    async def broadcast_user_status(self, user_id: int, is_online: bool):
        status_message = {"user_id": user_id, "is_online": is_online}
        for connection_user_id, websocket in self.active_connections.items():
            if connection_user_id != user_id:
                await websocket.send_json(status_message)


manager = ConnectionManager()
