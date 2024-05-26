import logging

from app.api.v1.main import routers
from app.core.config import settings
from app.core.container import Container
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=None,
    version="0.1.0",
)

container = Container()
db = container.db()

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(routers, prefix=settings.API_V1_STR)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


@app.get("/")
def check():
    return {"message": "OK!"}
