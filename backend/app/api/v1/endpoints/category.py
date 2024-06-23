from typing import List

from app.core.container import Container
from app.schemas.category import BaseCategory, CategoryResponse, CreateCategory
from app.services.category_service import CategoryService
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Body, Depends, status

category_router = APIRouter(tags=["category"])


@category_router.get("/categories", response_model=List[CategoryResponse])
@inject
async def get_categories(
    page: int = 1,
    size: int = 10,
    service: CategoryService = Depends(Provide[Container.category_service]),
):
    return await service.get_paginated(page, size)


@category_router.get("/category/{category_id}")
@inject
async def get_category(
    category_id: int,
    service: BaseCategory = Depends(Provide[Container.category_service]),
):
    return await service.get(category_id)


@category_router.post("/categories", status_code=status.HTTP_201_CREATED)
@inject
async def create_category(
    category: CreateCategory = Body(...),
    service: CategoryService = Depends(Provide[Container.category_service]),
):
    return await service.add(category)


@category_router.put("/category/{category_id}", status_code=status.HTTP_200_OK)
@inject
async def update_category(
    category_id: int,
    category: CreateCategory = Body(...),
    service: CategoryService = Depends(Provide[Container.category_service]),
):
    return await service.update(category_id, category)


@category_router.delete("/category/{category_id}", response_model=CategoryResponse)
@inject
async def delete_category(
    category_id: int,
    service: CategoryService = Depends(Provide[Container.category_service]),
):
    return await service.delete(category_id)
