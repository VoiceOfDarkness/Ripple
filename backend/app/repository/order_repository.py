from contextlib import AbstractAsyncContextManager
from typing import Callable

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select

from app.models.order import Order
from app.models.user import HireManager, Freelancer, User
from app.schemas.order import CreateOrder, UpdateOrder
from app.repository.base_repository import BaseRepository


class OrderRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractAsyncContextManager[AsyncSession]]
    ) -> None:
        self._session_factory = session_factory
        super().__init__(session_factory, Order)

    async def get_by_hire_manager(self, hire_manager_id: int):
        async with self._session_factory() as session:
            stmt = (
                select(Order)
                .options(
                    selectinload(Order.hire_manager).selectinload(HireManager.user),
                    selectinload(Order.freelancer).selectinload(Freelancer.user),
                    selectinload(Order.gigs),
                )
                .where(Order.buyer_id == hire_manager_id)
            )

            result = await session.execute(stmt)
            db_obj = result.scalars().all()

        return db_obj

    async def get_by_freelancer(self, freelancer_id: int):
        async with self._session_factory() as session:
            stmt = (
                select(Order)
                .options(
                    selectinload(Order.hire_manager).selectinload(HireManager.user),
                    selectinload(Order.freelancer).selectinload(Freelancer.user),
                    selectinload(Order.gigs),
                )
                .where(Order.seller_id == freelancer_id)
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().all()

        return db_obj

    async def create(self, hire_manager_id: int, order: CreateOrder):
        async with self._session_factory() as session:
            db_obj = Order(
                buyer_id=hire_manager_id,
                **order.model_dump(),
            )
            session.add(db_obj)
            await session.commit()
            await session.refresh(db_obj)
        return db_obj

    async def update(self, order_id: int, order: UpdateOrder, user: User):
        async with self._session_factory() as session:
            stmt = select(Order).where(Order.id == order_id)
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()
            
            if db_obj.seller_id == user.id:
                for key, value in order.model_dump(exclude_none=True).items():
                    setattr(db_obj, key, value)
                await session.commit()
                await session.refresh(db_obj)