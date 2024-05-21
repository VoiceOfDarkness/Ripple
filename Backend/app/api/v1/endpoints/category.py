from fastapi import Depends, APIRouter, Body
from dependency_injector.wiring import inject, Provide
from pydantic import BaseModel
from typing import Optional, List

from app.core.container import Container
from app.services.category_service import CategoryService

category_router = APIRouter(tags=["category"])


class GigOut(BaseModel):
    id: int
    seller_id: int
    title: str
    description: str
    category_id: int
    price: float
    delivery_time: int
    image: str
    rating: float
    num_reviews: int


class CategoryOut(BaseModel):
    id: int
    name: str
    gigs: Optional[List[GigOut]] = None


class CategoryIn(BaseModel):
    name: str


@category_router.get("/categories", response_model=List[CategoryOut])
@inject
async def get_categories(
    service: CategoryService = Depends(Provide[Container.category_service]),
):
    return service.get_list()


@category_router.get("/category/{category_id}")
@inject
async def get_category(
    category_id: int,
    service: CategoryService = Depends(Provide[Container.category_service]),
):
    return service.get(category_id)


@category_router.post("/categories")
@inject
async def create_category(
    category: CategoryIn,
    service: CategoryService = Depends(Provide[Container.category_service]),
):
    return service.add(category)
