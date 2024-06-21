from contextlib import AbstractAsyncContextManager
from typing import Callable

from app.models.user import HireManager, Freelancer, User
from app.repository.base_repository import BaseRepository
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.future import select


class UserRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractAsyncContextManager[Session]]
    ):
        self.session_factory = session_factory
        super().__init__(session_factory, User)

    async def get_by_username_or_email(self, username_or_email: str) -> User:
        async with self.session_factory() as session:
            stmt = select(User).where(
                User.user_name == username_or_email or User.email == username_or_email
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()

            return db_obj


class HireManagerRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractAsyncContextManager[Session]]
    ):
        self.session_factory = session_factory
        super().__init__(session_factory, HireManager)

    async def get_by_user_id(self, user_id: int):
        async with self.session_factory() as session:
            stmt = select(HireManager).where(HireManager.user_id == user_id)
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()

        return db_obj


class FreelancerRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractAsyncContextManager[Session]]
    ):
        self.session_factory = session_factory
        super().__init__(session_factory, Freelancer)

    async def create(self, user_id: int):
        async with self.session_factory() as session:
            freelancer = Freelancer(user_id=user_id)

            session.add(freelancer)
            await session.commit()
            await session.refresh(freelancer)

    async def get_by_user_id(self, user_id: int):
        async with self.session_factory() as session:
            stmt = select(Freelancer).where(Freelancer.user_id == user_id)
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()

        return db_obj

    async def update(self, freelancer_id: int, overview: str):
        async with self.session_factory() as session:
            stmt = select(Freelancer).where(Freelancer.id == freelancer_id)
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()

            setattr(db_obj, "overview", overview)

            session.add(db_obj)
            await session.commit()
            await session.refresh(db_obj)

        return db_obj
