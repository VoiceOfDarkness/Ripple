from fastapi import Depends, APIRouter

from dependency_injector.wiring import inject, Provide
from pydantic import BaseModel

from app.core.container import Container
from app.services.user_service import UserService

user_router = APIRouter(tags=["user"])


class UserOut(BaseModel):
    id: int
    user_name: str
    email: str
    hash_password: str
    first_name: str
    last_name: str


class UserIn(BaseModel):
    user_name: str
    email: str
    password: str
    first_name: str
    last_name: str


@user_router.get("/{user_id}", response_model=UserOut)
@inject
async def get_user(user_id: int, service: UserService = Depends(Provide[Container.user_service])):  # type: ignore
    return service.get(user_id)


@user_router.post("/")
@inject
async def create_user(user: UserIn, service: UserService = Depends(Provide[Container.user_service])):  # type: ignore
    return service.add(user)
