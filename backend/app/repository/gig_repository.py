from contextlib import AbstractAsyncContextManager
from typing import Callable, List, Optional

from app.models.services import Gigs, Image
from app.models.user import Freelancer
from app.models.review import Review
from app.repository.base_repository import BaseRepository
from app.schemas.services import CreateGigs
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


class GigRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractAsyncContextManager[AsyncSession]]
    ):
        self._session_factory = session_factory
        super().__init__(session_factory, Gigs)

    async def create(self, seller_id: int, gig: CreateGigs) -> Optional[Gigs]:
        async with self._session_factory() as session:
            stmt = select(Freelancer).where(Freelancer.user_id == seller_id)
            result = await session.execute(stmt)
            freelancer = result.scalars().one_or_none()

            gig = gig.model_dump()
            image_paths = gig.pop("images")

            db_obj = Gigs(
                **gig,
                seller_id=freelancer.id,
            )

            for image_path in image_paths:
                image = Image(filename=image_path, gig=db_obj)
                session.add(image)

            session.add(db_obj)
            await session.commit()
            await session.refresh(db_obj)

            stmt = (
                select(Gigs)
                .options(
                    selectinload(Gigs.category),
                    selectinload(Gigs.freelancer).selectinload(Freelancer.user),
                    selectinload(Gigs.images),
                )
                .where(Gigs.id == db_obj.id)
            )

            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()

        return db_obj

    async def get_all_paginated(self, page: int, per_page: int) -> Optional[List[Gigs]]:
        async with self._session_factory() as session:
            total_stmt = select(func.count(Gigs.id))
            total_result = await session.execute(total_stmt)
            total = total_result.scalar()

            offset = (page - 1) * per_page
            stmt = (
                select(Gigs)
                .options(
                    selectinload(Gigs.category),
                    selectinload(Gigs.freelancer).selectinload(Freelancer.user),
                    selectinload(Gigs.images),
                )
                .offset(offset)
                .limit(per_page)
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().all()

            total_pages = (total + per_page - 1) // per_page

            return {
                "data": db_obj,
                "current_page": page,
                "page_size": per_page,
                "total_items": total,
                "total_pages": total_pages,
            }

    async def get_by_id(self, gig_id: int):
        async with self._session_factory() as session:
            stmt = (
                select(Gigs)
                .options(
                    selectinload(Gigs.category),
                    selectinload(Gigs.freelancer).selectinload(Freelancer.user),
                    selectinload(Gigs.images),
                    selectinload(Gigs.reviews).selectinload(Review.user),
                )
                .where(Gigs.id == gig_id)
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()
            return db_obj

    async def delete(self, gig_id: int, user_id: int) -> None:
        async with self._session_factory() as session:
            stmt = select(Freelancer).where(Freelancer.user_id == user_id)
            result = await session.execute(stmt)
            freelancer = result.scalars().one_or_none()

            stmt = (
                select(Gigs)
                .where((Gigs.id == gig_id) & (Gigs.seller_id == freelancer.id))
                .options(selectinload(Gigs.images))
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()

            if db_obj is None:
                return []

            image_filenames = [image.filename for image in db_obj.images]

            await session.delete(db_obj)
            await session.commit()

        return image_filenames
