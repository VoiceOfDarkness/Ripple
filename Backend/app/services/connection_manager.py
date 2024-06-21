from fastapi import WebSocket
from typing import Dict


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    async def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    async def send_personal_message(self, message: str, websocket: WebSocket, user_id: int, user_name: str):
        if user_id in self.active_connections:
            websocket = self.active_connections[user_id]
            data = {"content": f"{user_name}: {message}"}
            await websocket.send_json(data)


manager = ConnectionManager()
