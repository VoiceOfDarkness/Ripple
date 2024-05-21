from fastapi import APIRouter

from app.api.v1.endpoints.user import user_router
from app.api.v1.endpoints.category import category_router

routers = APIRouter()
router_list = [category_router, user_router]

for router in router_list:
    routers.include_router(router)
