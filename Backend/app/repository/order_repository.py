from contextlib import AbstractContextManager
from typing import Callable

from sqlalchemy.orm import Session, joinedload

from app.models.order import Order
from app.models.user import HireManager, Freelancer
from app.models.services import Gigs
from app.schemas.order import CreateOrder
from app.repository.base_repository import BaseRepository


class OrderRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractContextManager[Session]]
    ) -> None:
        self._session_factory = session_factory
        super().__init__(session_factory, Order)

    def get_by_hire_manager(self, hire_manager_id: int):
        with self._session_factory() as session:
            db_obj = (
                session.query(Order)
                .options(
                    joinedload(Order.hire_manager).joinedload(HireManager.orders),
                    joinedload(Order.hire_manager).joinedload(HireManager.user),
                    joinedload(Order.freelancer).joinedload(Freelancer.orders),
                    joinedload(Order.freelancer).joinedload(Freelancer.user),
                    joinedload(Order.gigs).joinedload(Gigs.orders),
                )
                .filter(Order.buyer_id == hire_manager_id)
                .all()
            )
        return db_obj

    def get_by_freelancer(self, freelancer_id: int):
        with self._session_factory() as session:
            db_obj = (
                session.query(Order)
                .options(
                    joinedload(Order.hire_manager).joinedload(HireManager.orders),
                    joinedload(Order.hire_manager).joinedload(HireManager.user),
                    joinedload(Order.freelancer).joinedload(Freelancer.orders),
                    joinedload(Order.freelancer).joinedload(Freelancer.user),
                    joinedload(Order.gigs).joinedload(Gigs.orders),
                )
                .filter(Order.buyer_id == freelancer_id)
                .all()
            )
        return db_obj

    def create(self, hire_manager_id: int, order: CreateOrder):
        with self._session_factory() as session:
            db_obj = Order(
                buyer_id=hire_manager_id,
                **order.model_dump(),
            )
            session.add(db_obj)
            session.commit()
            session.refresh(db_obj)
        return db_obj
