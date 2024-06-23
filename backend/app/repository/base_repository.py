from contextlib import AbstractAsyncContextManager
from typing import Callable

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


class BaseRepository:
    def __init__(
        self,
        session_factory: Callable[..., AbstractAsyncContextManager[AsyncSession]],
        model,
    ) -> None:
        self.session_factory = session_factory
        self.model = model

    async def create(self, schema) -> None:
        async with self.session_factory() as session:
            db_obj = self.model(**schema.dict())
            try:
                await session.add(db_obj)
                await session.commit()
                await session.refresh(db_obj)
            except Exception as e:
                print(e)
        return db_obj

    async def get(self):
        async with self.session_factory() as session:
            stmt = select(self.model)
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()
        return await db_obj

    async def get_all_paginated(self, page, per_page):
        offset = (page - 1) * per_page
        async with self.session_factory() as session:
            stmt = select(self.model).offset(offset).limit(per_page)
            result = await session.execute(stmt)
            db_obj = result.scalars().all()
        return db_obj

    async def get_by_id(self, id: int):
        async with self.session_factory() as session:
            stmt = select(self.model).where(self.model.id == id)
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()
        return db_obj

    async def update(self, id: int, schema) -> None:
        async with self.session_factory() as session:
            stmt = select(self.model).where(self.model.id == id)
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()

            for key, value in schema.model_dump(exclude_none=True).items():
                setattr(db_obj, key, value)

            session.add(db_obj)
            await session.commit()
            await session.refresh(db_obj)
        return db_obj

    async def delete(self, id: int) -> None:
        async with self.session_factory() as session:
            stmt = select(self.model).where(self.model.id == id)
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()
            await session.delete(db_obj)
            await session.commit()
