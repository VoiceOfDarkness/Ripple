from typing import List

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.user import User
from app.schemas.services import BaseGigs, Gigs, CreateGigs
from app.services.gig_service import GigService

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Body, Depends

gig_router = APIRouter(tags=["gigs"])


@gig_router.get("/gigs", response_model=List[Gigs])
@inject
async def get_gigs(
    service: GigService = Depends(Provide[Container.gig_service])
):
    return service.get_list()


@gig_router.get("/gig/{gig_id}")
@inject
async def get_gig(
    gig_id: int,
    service: GigService = Depends(Provide[Container.gig_service]),
):
    return service.get(gig_id)

@gig_router.post("/gigs/", response_model=CreateGigs)
@inject
async def create_gig(
    gig: BaseGigs = Body(...),
    service: GigService = Depends(Provide[Container.gig_service]),
    current_user: User = Depends(get_current_user),
):
    return service.add(current_user.id, gig)