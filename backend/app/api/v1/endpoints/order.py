from fastapi import APIRouter, Depends, Body
from dependency_injector.wiring import Provide, inject
from typing import List

from app.core.container import Container
from app.services.order_service import OrderService
from app.schemas.order import CreateOrder, UpdateOrder, Order
from app.schemas.user import User
from app.core.dependencies import get_current_user

order_router = APIRouter(tags=["order"])


@order_router.get("/orders", response_model=List[Order])
@inject
async def get_orders(
    current_user: User = Depends(get_current_user),
    service: OrderService = Depends(Provide[Container.order_service]),
):
    return await service.get_order(current_user)


@order_router.post("/order")
@inject
async def create_order(
    order: CreateOrder = Body(...),
    current_user: User = Depends(get_current_user),
    service: OrderService = Depends(Provide[Container.order_service]),
):
    return await service.add_order(current_user, order)


@order_router.patch("/order/{order_id}")
@inject
async def update_order(
    order_id: int,
    order: UpdateOrder = Body(...),
    current_user: User = Depends(get_current_user),
    service: OrderService = Depends(Provide[Container.order_service]),
):
    return await service.update_order(order_id, order, current_user)
