from app.core.container import Container
from app.schemas.auth import ChangePassword, SignIn, SignInResponse, SignUp, Token, User
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, Request, Body, status

from app.core.dependencies import get_current_user

auth_router = APIRouter(prefix="/auth", tags=["auth"])


@auth_router.post("/sign-in", response_model=SignInResponse)
@inject
async def sign_in(user_data: SignIn, service=Depends(Provide[Container.auth_service])):
    return await service.sign_in(user_data)


@auth_router.post("/sign-up", response_model=User)
@inject
async def sign_up(user_data: SignUp, service=Depends(Provide[Container.auth_service])):
    return await service.sign_up(user_data)


@auth_router.post("/sign-up/verify-code")
@inject
async def verify_code(
    code: str = Body(...), service=Depends(Provide[Container.auth_service])
):
    return await service.verify_code(code)


@auth_router.post("/sign-up/resend-code")
@inject
async def resend_code(
    email: str = Body(...), service=Depends(Provide[Container.auth_service])
):
    return await service.resend_code(email)


@auth_router.post("/settings/change-password")
@inject
async def change_password(
    user_password: ChangePassword,
    current_user: User = Depends(get_current_user),
    service=Depends(Provide[Container.auth_service]),
):
    return await service.change_password(user_password, current_user)


@auth_router.get("/sign-in/google", status_code=status.HTTP_302_FOUND)
@inject
async def sign_in_google(
    request: Request, service=Depends(Provide[Container.auth_service])
):
    return await service.sign_in_google(request)


@auth_router.get("/google/callback", status_code=status.HTTP_302_FOUND)
@inject
async def auth_google_callback(
    request: Request, service=Depends(Provide[Container.auth_service])
):
    return await service.auth_google_callback(request)
