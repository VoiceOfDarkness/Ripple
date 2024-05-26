from datetime import datetime, timedelta
from typing import Dict, Optional

from app.core.config import settings
from authlib.integrations.starlette_client import OAuth
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
from fastapi.security.utils import get_authorization_scheme_param
from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ALGORITHM = "HS256"

oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)


def create_access_token(data: dict, expires_delta: timedelta):
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    payload = {"exp": expire, **data}
    enconded_jwt = jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)
    expiration_datetime = expire.strftime(settings.DATETIME_FORMAT)
    return enconded_jwt, expiration_datetime


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str):
    return pwd_context.hash(password)


def decode_jwt(token: str):
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        return (
            decoded_token
            if decoded_token["exp"] >= int(round(datetime.now().timestamp()))
            else None
        )
    except Exception as e:
        raise Exception("Error decoding JWT: ", e)


class JWTBearer(OAuth2PasswordBearer):
    def __init__(self, tokenUrl: str = None, auto_error: bool = True):
        super(JWTBearer, self).__init__(tokenUrl, auto_error=auto_error)

    async def __call__(self, request: Request):
        authorization: str = request.headers.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated"
                )
            else:
                return None
        return decode_jwt(param)


class OAuth2BearerToken(OAuth2AuthorizationCodeBearer):
    def __init__(
        self,
        authorizationUrl: str,
        tokenUrl: str,
        auto_error: bool = True,
    ):
        super().__init__(
            authorizationUrl,
            tokenUrl,
            auto_error,
        )

    async def __call__(self, request: Request) -> Optional[Dict[str, str]]:
        authorization: str = request.headers.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated"
                )
            else:
                return None
        try:
            token = await oauth.google.parse_id_token(request, param)
            return token
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials",
            )
