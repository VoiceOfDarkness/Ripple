from decimal import Decimal
from typing import List

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.services import BaseGigs, Gigs, GigDetail
from app.schemas.user import User
from app.services.gig_service import GigService
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import ValidationError

gig_router = APIRouter(tags=["gigs"])


@gig_router.get("/gigs", response_model=List[Gigs])
@inject
async def get_gigs(
    page: int = 1,
    size: int = 10,
    service: GigService = Depends(Provide[Container.gig_service]),
):
    return await service.get_paginated(page, size)


@gig_router.get("/gig/search", response_model=List[Gigs])
@inject
async def search_gigs(
    query: str,
    page: int = 1,
    size: int = 10,
    service: GigService = Depends(Provide[Container.gig_service]),
):
    return await service.search(query, page, size)


@gig_router.get("/gig/{gig_id}", response_model=GigDetail)
@inject
async def get_gig(
    gig_id: int,
    service: GigService = Depends(Provide[Container.gig_service]),
):
    return await service.get(gig_id)


@gig_router.post("/gigs", status_code=status.HTTP_201_CREATED)
@inject
async def create_gig(
    title: str = Form(...),
    description: str = Form(...),
    category_id: int = Form(...),
    price: Decimal = Form(...),
    delivery_time: int = Form(...),
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_user),
    service: GigService = Depends(Provide[Container.gig_service]),
):
    try:
        gig = BaseGigs(
            title=title,
            description=description,
            category_id=category_id,
            price=price,
            delivery_time=delivery_time,
            files=files,
        )
    except ValidationError as e:
        errors = [err["msg"] for err in e.errors()]
        raise HTTPException(status_code=422, detail=errors)
    return await service.add(current_user.id, gig, files)


@gig_router.delete("/gig/{gig_id}", status_code=status.HTTP_200_OK)
@inject
async def delete_gig(
    gig_id: int,
    current_user: User = Depends(get_current_user),
    service: GigService = Depends(Provide[Container.gig_service]),
):
    return await service.delete(gig_id, current_user.id)
