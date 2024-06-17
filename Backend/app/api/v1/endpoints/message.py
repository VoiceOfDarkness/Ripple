from fastapi import APIRouter, Depends, Body, WebSocket, WebSocketDisconnect
from dependency_injector.wiring import Provide, inject
from typing import List

from app.core.container import Container
from app.schemas.user import User
from app.schemas.message import MessageCreate, MessageRead
from app.core.dependencies import get_current_user
from app.services.message_service import MessageService
from app.services.message_service import manager

message_router = APIRouter(tags=["messages"])


@message_router.get("/message", response_model=List[MessageRead])
@inject
async def read_messages(
    current_user: User = Depends(get_current_user),
    service: MessageService = Depends(Provide[Container.message_service]),
):
    return await service.get_messages(current_user.id)


@message_router.post("/message", response_model=MessageRead)
@inject
async def create_message(
    current_user: User = Depends(get_current_user),
    service: MessageService = Depends(Provide[Container.message_service]),
    message: MessageCreate = Body(...),
):
    new_message = await service.add_message(current_user.id, message)
    await manager.broadcast(f"New message from {current_user.id}: {message.content}")
    return new_message


@message_router.websocket("/ws")
@inject
async def websocket_endpoint(
    websocket: WebSocket,
    current_user: User = Depends(get_current_user),
    service: MessageService = Depends(Provide[Container.message_service]),
):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"User {current_user.id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"User {current_user.id} left the chat")
