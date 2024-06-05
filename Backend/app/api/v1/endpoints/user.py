from typing import List

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.user import UpdateUser, User
from app.services.user_service import UserService
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Body, Depends

user_router = APIRouter(
    prefix="/user", tags=["user"], dependencies=[Depends(get_current_user)]
)


@user_router.get("/profile", response_model=User)
@inject
def get_profile(
    service: UserService = Depends(Provide[Container.user_service]),
    current_user: User = Depends(get_current_user),
):
    return current_user


@user_router.patch("/profile", response_model=User)
@inject
def update_profile(
    user_data: UpdateUser = Body(...), 
    current_user: UpdateUser = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
):
    return service.update(current_user.id, user_data)
