from app.api.v1.endpoints.auth import auth_router
from app.api.v1.endpoints.category import category_router
from app.api.v1.endpoints.gig import gig_router
from app.api.v1.endpoints.user import user_router
from app.api.v1.endpoints.order import order_router
from app.api.v1.endpoints.message import message_router
from app.api.v1.endpoints.review import review_router
from fastapi import APIRouter

routers = APIRouter()
router_list = [
    review_router,
    order_router,
    gig_router,
    category_router,
    auth_router,
    user_router,
    message_router,
]

for router in router_list:
    routers.include_router(router)
