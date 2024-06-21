from app.core.config import settings
from app.core.container import Container
from app.core.exceptions import AuthError
from app.core.security import JWTBearer, decode_jwt
from app.schemas.auth import Payload
from app.services.user_service import UserService
from dependency_injector.wiring import Provide, inject
from fastapi import Depends, WebSocket, status, HTTPException
from jose import JWTError
from pydantic import ValidationError


@inject
async def get_current_user(
    payload: str = Depends(JWTBearer(tokenUrl=f"{settings.API_V1_STR}/auth/sign-in")),
    service: UserService = Depends(Provide[Container.user_service]),
):
    try:
        token_data = Payload(**payload)
    except (JWTError, ValidationError):
        raise AuthError("Could not validate credentials")

    current_user = await service.get_by_username_or_email(token_data.sub)
    if not current_user:
        raise AuthError(detail="User not found")
    return current_user


@inject
async def get_current_user_from_cookie(
    websocket: WebSocket,
    service: UserService = Depends(Provide[Container.user_service]),
):
    cookies = websocket._cookies
    token = cookies.get("access_token")
    if token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    try:
        token_data = decode_jwt(token)
    except (JWTError, ValidationError):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Could not validate credentials")

    current_user = await service.get_by_username_or_email(token_data.get("sub"))
    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return current_user
