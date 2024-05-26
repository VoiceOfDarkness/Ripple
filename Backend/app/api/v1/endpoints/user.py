from typing import List

from app.core.container import Container
from app.core.dependencies import get_current_user
from app.schemas.user import User
from app.services.user_service import UserService
from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends
from pydantic import BaseModel

user_router = APIRouter(
    prefix="/user", tags=["user"], dependencies=[Depends(get_current_user)]
)


@user_router.get("/", response_model=List[User])
@inject
def get_all_users(
    service: UserService = Depends(Provide[Container.user_service]),
    current_user: User = Depends(get_current_user),
):
    return service.get_list()
