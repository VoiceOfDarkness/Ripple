from app.core.config import settings
from app.core.container import Container
from app.core.exceptions import AuthError
from app.core.security import JWTBearer
from app.schemas.auth import Payload
from app.services.user_service import UserService
from dependency_injector.wiring import Provide, inject
from fastapi import Depends
from jose import JWTError
from pydantic import ValidationError


@inject
def get_current_user(
    payload: str = Depends(JWTBearer(tokenUrl=f"{settings.API_V1_STR}/auth/sign-in")),
    service: UserService = Depends(Provide[Container.user_service]),
):
    try:
        token_data = Payload(**payload)
    except (JWTError, ValidationError):
        raise AuthError("Could not validate credentials")

    current_user = service.get_by_username_or_email(token_data.sub)
    if not current_user:
        raise AuthError(detail="User not found")
    return current_user
