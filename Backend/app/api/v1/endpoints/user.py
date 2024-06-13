from typing import List

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.user import UpdateUser, User
from app.services.user_service import UserService
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Form, Depends, File, UploadFile

user_router = APIRouter(
    prefix="/user", tags=["user"], dependencies=[Depends(get_current_user)]
)


@user_router.get("/profile", response_model=User)
def get_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user


@user_router.patch("/profile", response_model=User)
@inject
async def update_profile(
    user_name: str = Form(None),
    user_image: UploadFile = File(None),
    first_name: str = Form(None),
    last_name: str = Form(None),
    current_user: UpdateUser = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
):
    user_data = UpdateUser(
        user_name=user_name,
        user_image=user_image.filename if user_image else None,
        first_name=first_name,
        last_name=last_name,
    )
    return await service.update(current_user.id, user_data, user_image)
