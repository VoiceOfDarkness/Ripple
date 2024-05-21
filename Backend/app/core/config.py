import os
import pathlib
import secrets
from typing import List, Union

from dotenv import load_dotenv
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings

load_dotenv()

ENV: str = ""


class Settings(BaseSettings):
    ENV: str = os.getenv("ENV", "dev")
    API: str = os.getenv("API", "/api")
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Ripple"

    PROJECT_ROOT: str = str(pathlib.Path(__file__).parent.parent.parent)

    # date
    DATE_FORMAT: str = "%Y-%m-%d"
    DATETIME_FORMAT: str = "%Y-%m-%dT%H:%M:%S"

    # auth
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # CORS
    BACKEND_CORS_ORIGINS: Union[str, List[AnyHttpUrl]] = "localhost,localhost:8000,localhost:3000"

    @field_validator("BACKEND_CORS_ORIGINS")
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return v.split(",")
        return v

    # database
    DB_NAME: str = os.getenv("POSTGRES_NAME", "app")
    DB_USER: str = os.getenv("POSTGRES_USER", "ripple")
    DB_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "password")
    DB_HOST: str = os.getenv("POSTGRES_HOST", "db")
    DB_PORT: str = os.getenv("POSTGRES_PORT", "5432")

    DATABASE_URI_FORMAT: str = (
        "{db_engine}://{user}:{password}@{host}:{port}/{database}"
    )
    DATABASE_URI: str = (
        "postgresql://{user}:{password}@{host}:{port}/{database}".format(
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            database=DB_NAME,
        )
    )

    # redis
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = os.getenv("REDIS_PORT", 6379)
    REDIS_DB: int = os.getenv("REDIS_DB", 0)

    # email
    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    SMTP_PORT: int = 587
    SMTP_HOST: str | None = None
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None

    # celery
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
    CELERY_RESULT_BACKEND: str = os.getenv(
        "CELERY_RESULT_BACKEND", "redis://localhost:6379/0"
    )
    CELERY_ACCEPT_CONTENT: List[str] = ["json"]
    CELERY_TASK_SERIALIZER: str = "json"
    CELERY_RESULT_SERIALIZER: str = "json"

    # find query
    PAGE: int = 1
    PAGE_SIZE: int = 20
    ORDERING: str = "-id"

    class Config:
        case_sensitive = True


settings = Settings()
