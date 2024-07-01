from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.user import UpdateUser, User, FreelancerResponse
from app.services.user_service import UserService
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Form, Depends, File, UploadFile, status

user_router = APIRouter(
    prefix="/user", tags=["user"]
)


@user_router.get("/{user_id}", response_model=FreelancerResponse)
@inject
async def get_freelancer(
    user_id: int,
    service: UserService = Depends(Provide[Container.user_service]),
):
    return await service.get_freelancer(user_id)


@user_router.get("/profile", response_model=User)
@inject
async def get_profile(
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
):
    return await service.get_profile(current_user)


@user_router.patch("/profile", status_code=status.HTTP_200_OK)
@inject
async def update_profile(
    user_name: str = Form(None),
    user_image: UploadFile = File(None),
    first_name: str = Form(None),
    last_name: str = Form(None),
    overview: str = Form(None),
    current_user: UpdateUser = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
):
    user_data = UpdateUser(
        user_name=user_name,
        user_image=user_image.filename if user_image else None,
        first_name=first_name,
        last_name=last_name,
        overview=overview,
    )
    return await service.update(current_user, user_data, user_image)


@user_router.patch("/switch_to_freelancer")
@inject
async def switch_to_freelancer(
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
):
    return await service.switch_to_freelancer(current_user)


@user_router.patch("/switch_to_hire_manager")
@inject
async def switch_to_hire_manager(
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(Provide[Container.user_service]),
):
    return await service.switch_to_hire_manager(current_user)
