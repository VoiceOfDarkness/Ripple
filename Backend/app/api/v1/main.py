from app.api.v1.endpoints.auth import auth_router
from app.api.v1.endpoints.category import category_router
from app.api.v1.endpoints.gig import gig_router
from app.api.v1.endpoints.user import user_router
from fastapi import APIRouter

routers = APIRouter()
router_list = [gig_router, category_router, auth_router, user_router]

for router in router_list:
    routers.include_router(router)
