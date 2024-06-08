from app.repository.order_repository import OrderRepository
from app.services.base_service import BaseService


class OrderService(BaseService):
    def __init__(self, order_repository: OrderRepository) -> None:
        self.order_repository = order_repository
        super().__init__(order_repository)
