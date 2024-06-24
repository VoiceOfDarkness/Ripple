from datetime import timedelta
from logging import getLogger

import redis
from app.core.config import settings
from app.core.security import (
    create_access_token,
    get_password_hash,
    oauth,
    verify_password,
)
from app.repository.user_repository import HireManagerRepository, UserRepository
from app.schemas.auth import ChangePassword, EmailVerification, SignUp, Token
from app.schemas.user import CreateHireManager as HireManager
from app.schemas.user import UpdatePrivateUser as UpdateUser
from app.schemas.user import CreateUser, User
from app.tasks.email_service import send_verification_code
from app.utils.verification_code import generate_verification_code
from fastapi import Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm

logger = getLogger(__name__)


class AuthService:
    def __init__(
        self,
        user_repository: UserRepository,
        hire_manager_repository: HireManagerRepository,
        redis_client: redis.Redis,
    ) -> None:
        self.user_repository = user_repository
        self.hire_manager_repository = hire_manager_repository
        self.redis = redis_client

    async def sign_in(self, form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
        user = await self.user_repository.get_by_username_or_email(form_data.email)
        if not user or not verify_password(form_data.password, user.hash_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect username or password",
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please verify your email",
            )

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token, expiration = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expiration": expiration,
        }

    async def sign_in_google(self, request: Request) -> Token:
        redirect_uri = request.url_for("auth_google_callback")
        return await oauth.google.authorize_redirect(request, redirect_uri)

    async def auth_google_callback(self, request: Request):
        try:
            token = await oauth.google.authorize_access_token(request)
            user_data = token["userinfo"]

        except Exception as e:
            logger.error(f"Error parsing ID token: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid ID token: {e}"
            )

        user = await self.user_repository.get_by_username_or_email(user_data["email"])
        if not user:
            user = await self.user_repository.create(
                CreateUser(
                    user_name=user_data["name"],
                    email=user_data["email"],
                    user_image=user_data["picture"],
                    is_active=True,
                    hash_password=get_password_hash(settings.DEFAULT_USER_PASSWORD),
                )
            )

            await self.hire_manager_repository.create(
                HireManager(
                    user_id=user.id,
                )
            )

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token, expiration = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )

        response = RedirectResponse(url=f"{settings.FRONTEND_URL}/")
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=False,
            expires=expiration,
            secure=False,
        )
        return response

    async def sign_up(self, sign_up: SignUp):
        user = await self.user_repository.get_by_username_or_email(sign_up.email)
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User already registered",
            )
        hashed_password = get_password_hash(sign_up.password)
        new_user = await self.user_repository.create(
            CreateUser(
                user_name=sign_up.username,
                email=sign_up.email,
                hash_password=hashed_password,
            )
        )

        await self.hire_manager_repository.create(
            HireManager(
                user_id=new_user.id,
            )
        )

        verification_code = await generate_verification_code()
        self.redis.set(
            verification_code,
            sign_up.email,
            ex=settings.VERIFICATION_CODE_EXPIRE_SECONDS,
        )

        send_verification_code.delay(sign_up.email, verification_code)

        return JSONResponse(
            content={"message": "User created"}, status_code=status.HTTP_201_CREATED
        )

    async def verify_code(self, code: str) -> bool:
        redis_email = self.redis.get(code)

        if redis_email is not None:
            user = await self.user_repository.get_by_username_or_email(
                redis_email.decode("utf-8")
            )

        await self.user_repository.update(user.id, EmailVerification(is_active=True))

        if not redis_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid code"
            )
        return JSONResponse(
            content={"message": "code verified"}, status_code=status.HTTP_200_OK
        )

    async def resend_code(self, email: str):
        user = await self.user_repository.get_by_username_or_email(email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User not found"
            )

        verification_code = await generate_verification_code()
        self.redis.set(
            verification_code,
            email,
            ex=settings.VERIFICATION_CODE_EXPIRE_SECONDS,
        )

        send_verification_code.delay(email, verification_code)

        return JSONResponse(
            content={"message": "Verification code sent"},
            status_code=status.HTTP_200_OK,
        )

    async def change_password(self, user_password: ChangePassword, current_user: User):
        user = await self.user_repository.get_by_username_or_email(current_user.email)

        if not verify_password(user_password.old_password, user.hash_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password"
            )

        hashed_password = get_password_hash(user_password.new_password)
        await self.user_repository.update(
            user.id, UpdateUser(hash_password=hashed_password)
        )

        return JSONResponse(
            {"message": "Password updated successfully"}, status_code=status.HTTP_200_OK
        )
