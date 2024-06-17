from contextlib import AbstractContextManager
from typing import Callable

from sqlalchemy.orm import Session, joinedload

from app.models.order import Order
from app.models.user import HireManager, Freelancer
from app.models.services import Gigs
from app.repository.base_repository import BaseRepository


class OrderRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]) -> None:
        self._session_factory = session_factory
        super().__init__(session_factory, Order)

    def get(self):
        with self._session_factory() as session:
            db_obj = session.query(Order).options(
                joinedload(Order.hire_manager).joinedload(HireManager.orders),
                joinedload(Order.hire_manager).joinedload(HireManager.user),
                joinedload(Order.freelancer).joinedload(Freelancer.orders),
                joinedload(Order.freelancer).joinedload(Freelancer.user),
                joinedload(Order.gigs).joinedload(Gigs.orders),
            ).all()
        return db_obj
