from fastapi import APIRouter, Depends, Body, WebSocket
from dependency_injector.wiring import Provide, inject

from app.core.container import Container
from app.schemas.user import User
from app.schemas.message import Message
from app.core.dependencies import get_current_user
from app.services.message_service import MessageService

message_router = APIRouter(tags=["messages"])


@message_router.get("/message")
@inject
async def read_messages(
    current_user: User = Depends(get_current_user),
    service: MessageService = Depends(Provide[Container.message_service]),
):
    return await service.get_messages(current_user.id)


@message_router.post("/message")
@inject
async def create_message(
    current_user: User = Depends(get_current_user),
    service: MessageService = Depends(Provide[Container.message_service]),
    message: Message = Body(...),
):
    return service.add(current_user.id, message)


@message_router.websocket("/ws")
@inject
async def websocket_endpoint(
    websocket: WebSocket,
    current_user: User = Depends(get_current_user),
    service: MessageService = Depends(Provide[Container.message_service]),
):
    return await service.websocket_handler(websocket, current_user.id)
