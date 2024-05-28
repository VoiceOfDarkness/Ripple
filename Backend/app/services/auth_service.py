from datetime import timedelta
from logging import getLogger

from app.core.config import settings
from app.core.security import (
    create_access_token,
    get_password_hash,
    oauth,
    verify_password,
)
from app.repository.user_repository import UserRepository, FreelancerRepository
from app.schemas.auth import SignUp, Token
from app.schemas.user import UserPrivate as User
from app.schemas.user import CreateFreelancer as Freelancer
from app.services.base_service import BaseService
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm

logger = getLogger(__name__)


class AuthService:
    def __init__(self, user_repository: UserRepository, freelancer_repository: FreelancerRepository) -> None:
        self.user_repository = user_repository
        self.freelancer_repository = freelancer_repository

    def sign_in(self, form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
        user = self.user_repository.get_by_username_or_email(form_data.email)
        if not user or not verify_password(form_data.password, user.hash_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect username or password",
            )
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token, expiration = create_access_token(
            data={"sub": user.user_name}, expires_delta=access_token_expires
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
            logger.info(f"Received token: {token}")

            user_data = token["userinfo"]
            logger.info(f"ID Token: {user_data}")

        except Exception as e:
            logger.error(f"Error parsing ID token: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid ID token: {e}"
            )

        user = self.user_repository.get_by_username_or_email(user_data["email"])
        if not user:
            user = self.user_repository.create(
                User(
                    user_name=user_data["name"],
                    email=user_data["email"],
                    hash_password=get_password_hash("default_password"),
                )
            )

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token, expiration = create_access_token(
            data={"sub": user.user_name}, expires_delta=access_token_expires
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "expiration": expiration,
        }

    def sign_up(self, sign_up: SignUp) -> User:
        user = self.user_repository.get_by_username_or_email(sign_up.email)
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User already registered",
            )
        hashed_password = get_password_hash(sign_up.password)
        new_user = self.user_repository.create(
            User(
                user_name=sign_up.username,
                email=sign_up.email,
                hash_password=hashed_password,
            )
        )
        
        freelancer = self.freelancer_repository.create(
            Freelancer(
                user_id=new_user.id,
            )
        )

        return new_user
