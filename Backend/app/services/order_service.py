from app.repository.order_repository import OrderRepository
from app.repository.user_repository import FreelancerRepository, HireManagerRepository
from app.services.base_service import BaseService
from fastapi.responses import JSONResponse

import logging

from app.schemas.user import User
from app.schemas.order import CreateOrder


logger = logging.getLogger(__name__)


class OrderService(BaseService):
    def __init__(
        self,
        order_repository: OrderRepository,
        freelancer_repository: FreelancerRepository,
        hire_manager_repository: HireManagerRepository,
    ) -> None:
        self.order_repository = order_repository
        self.freelancer_repository = freelancer_repository
        self.hire_manager_repository = hire_manager_repository
        super().__init__(order_repository)

    async def add_order(self, user: User, order: CreateOrder):
        if user.is_hire_manager:
            hire_manager = self.hire_manager_repository.get_by_user_id(user.id)
            logger.info(f"hire_manager: {hire_manager}")
            self.order_repository.create(hire_manager.id, order)

            return JSONResponse(content={"message": "Order created"}, status_code=201)

        return JSONResponse(
            content={"message": "You are not authorized to create order"},
            status_code=401,
        )

    async def get_order(self, user: User):
        if user.is_freelancer:
            freelancer = self.freelancer_repository.get_by_user_id(user.id)
            return self.order_repository.get_by_freelancer(freelancer.id)

        if user.is_hire_manager:
            hire_manager = self.hire_manager_repository.get_by_user_id(user.id)
            return self.order_repository.get_by_hire_manager(hire_manager.id)
