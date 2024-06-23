from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class Payload(BaseModel):
    exp: int
    sub: str


class Token(BaseModel):
    access_token: str
    token_type: str
    expiration: datetime


class SignIn(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)


class SignUp(BaseModel):
    username: str = Field(..., description="User name")
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(
        ..., min_length=8, description="Password must be at least 8 characters long"
    )


class EmailVerification(BaseModel):
    is_active: bool


class ChangePassword(BaseModel):
    old_password: str = Field(..., min_length=8, description="Old password")
    new_password: str = Field(..., min_length=8, description="New password")


class FreelancerSignUp:
    user_id: int
    location: str
    overview: str


class SignInResponse(BaseModel):
    access_token: str
    token_type: str
    expiration: datetime
