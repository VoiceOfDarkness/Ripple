from app.core.container import Container
from app.schemas.auth import SignIn, SignInResponse, SignUp, User, Token
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, Request

auth_router = APIRouter(prefix="/auth", tags=["auth"])


@auth_router.post("/sign-in", response_model=SignInResponse)
@inject
def sign_in(user_data: SignIn, service=Depends(Provide[Container.auth_service])):
    return service.sign_in(user_data)


@auth_router.post("/sign-up", response_model=User)
@inject
def sign_up(user_data: SignUp, service=Depends(Provide[Container.auth_service])):
    return service.sign_up(user_data)


@auth_router.get("/sign-in/google", response_model=SignInResponse)
@inject
async def sign_in_google(
    request: Request, service=Depends(Provide[Container.auth_service])
):
    return await service.sign_in_google(request)


@auth_router.get("/google/callback", response_model=Token)
@inject
async def auth_google_callback(
    request: Request, service=Depends(Provide[Container.auth_service])
):
    return await service.auth_google_callback(request)
