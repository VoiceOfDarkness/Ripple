import uuid

from fastapi import APIRouter, Depends, Body, WebSocket
from dependency_injector.wiring import Provide, inject
from typing import List

from app.core.container import Container
from app.schemas.user import User
from app.schemas.message import ChatCreate, ChatResponse, ChatDetailResponse
from app.core.dependencies import get_current_user, get_current_user_from_cookie
from app.services.message_service import MessageService

message_router = APIRouter(tags=["messages"])


@message_router.get("/chat", response_model=List[ChatResponse])
@inject
async def get_chats(
    current_user: User = Depends(get_current_user),
    service: MessageService = Depends(Provide[Container.message_service]),
):
    return await service.get_chats(current_user.id)


@message_router.get("/chat/{chat_id}", response_model=ChatDetailResponse)
@inject
async def get_chat(
    chat_id: str,
    current_user: User = Depends(get_current_user),
    service: MessageService = Depends(Provide[Container.message_service]),
):
    return await service.get_chat(chat_id, current_user.id)


@message_router.post("/chat")
@inject
async def create_chat(
    current_user: User = Depends(get_current_user),
    chat: ChatCreate = Body(...),
    service: MessageService = Depends(Provide[Container.message_service]),
):
    return await service.create_chat(chat, current_user.id)


@message_router.websocket("/ws")
@inject
async def websocket_endpoint(
    websocket: WebSocket,
    chat_id: uuid.UUID,
    current_user: User = Depends(get_current_user_from_cookie),
    service: MessageService = Depends(Provide[Container.message_service]),
):
    return await service.websocket_handler(websocket, chat_id, current_user)
