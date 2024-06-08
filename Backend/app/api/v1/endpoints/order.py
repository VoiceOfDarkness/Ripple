from typing import List

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Body, Depends

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.order import BaseOrder, CreateOrder, Order
from app.schemas.user import User
from app.services.order_service import OrderService

order_router = APIRouter(tags=["orders"])


@order_router.get("/orders", response_model=List[Order])
@inject
async def get_orders(service: OrderService = Depends(Provide[Container.order_service])):
    return service.get_list()


@order_router.get("/orders", response_model=CreateOrder)
@inject
async def create_order(
    order: BaseOrder = Body(...),
    service: OrderService = Depends(Provide[Container.order_service]),
    current_user: User = Depends(get_current_user),
):
    return service.add(current_user.id, order)
