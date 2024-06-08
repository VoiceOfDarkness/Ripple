from contextlib import AbstractContextManager
from typing import Callable, List, Optional

from sqlalchemy.orm import Session, joinedload, subqueryload

from app.models.order import Order
from app.models.user import Freelancer, HireManager
from app.repository.base_repository import BaseRepository


class OrderRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self._session_factory = session_factory
        super().__init__(session_factory, Order)

    # def create(self, user_id, order) -> None:
    #     with self._session_factory() as session:
    #         pass

    def get(self) -> Optional[List[Order]]:
        with self._session_factory() as session:
            return (
                session.query(Order)
                .options(
                    joinedload(Order.freelancer).joinedload(Freelancer.user),
                    joinedload(Order.hire_manager).joinedload(HireManager.user),
                    joinedload(Order.gigs),
                )
                .all()
            )
