from typing import List

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.services import BaseGigs, CreateGigs, Gigs, GigsTest
from app.schemas.user import User
from app.services.gig_service import GigService
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, File, UploadFile

gig_router = APIRouter(tags=["gigs"])


@gig_router.get("/gigs", response_model=List[Gigs])
@inject
async def get_gigs(service: GigService = Depends(Provide[Container.gig_service])):
    return service.get_list()


@gig_router.get("/gig/{gig_id}")
@inject
async def get_gig(
    gig_id: int,
    service: GigService = Depends(Provide[Container.gig_service]),
):
    return service.get(gig_id)


@gig_router.post("/gigs/", response_model=Gigs)
@inject
async def create_gig(
    file: UploadFile = File(...),
    service: GigService = Depends(Provide[Container.gig_service]),
    gig: CreateGigs = Depends(CreateGigs),
):
    current_user = 47
    return await service.add(current_user, gig, file)
