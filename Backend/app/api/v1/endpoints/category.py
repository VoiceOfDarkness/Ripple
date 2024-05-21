from fastapi import Depends, APIRouter, Body
from dependency_injector.wiring import inject, Provide
from typing import List

from app.core.container import Container
from app.services.category_service import CategoryService
from app.schemas.category import Category, BaseCategory, CreateCategory

category_router = APIRouter(tags=["category"])


@category_router.get("/categories", response_model=List[Category])
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


@category_router.post("/categories", response_model=CreateCategory)
@inject
async def create_category(
    category: BaseCategory = Body(...),
    service: CategoryService = Depends(Provide[Container.category_service]),
):
    return service.add(category)
