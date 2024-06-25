from contextlib import AbstractAsyncContextManager
from typing import Callable

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy.future import select

from app.models.review import Review
from app.models.services import Gigs
from app.models.user import User
from app.repository.base_repository import BaseRepository
from app.schemas.review import CreateReview


class ReviewRepository(BaseRepository):
    def __init__(
        self,
        session_factory: Callable[..., AbstractAsyncContextManager[AsyncSession]],
    ) -> None:
        self._session_factory = session_factory
        super().__init__(session_factory, Review)

    async def get(self):
        async with self._session_factory() as session:
            stmt = select(Review).options(joinedload(Review.user))
            result = await session.execute(stmt)
            db_obj = result.scalars().all()

        return db_obj

    async def create(self, user_id: int, review: CreateReview):
        async with self._session_factory() as session:
            db_obj = Review(
                user_id=user_id,
                **review.model_dump(),
            )
            session.add(db_obj)

            stmt = select(Gigs).where(Gigs.id == review.gig_id)
            result = await session.execute(stmt)
            gig = result.scalars().first()

            gig.num_reviews += 1
            new_rating = (
                gig.rating * (gig.num_reviews - 1) + review.rating
            ) / gig.num_reviews
            gig.rating = new_rating

            await session.commit()
            await session.refresh(db_obj)
        return db_obj

    async def delete(self, review_id: int):
        async with self._session_factory() as session:
            stmt = select(Review).where(Review.id == review_id)
            result = await session.execute(stmt)
            db_obj = result.scalars().first()

            stmt = select(Gigs).where(Gigs.id == db_obj.gig_id)
            result = await session.execute(stmt)
            gig = result.scalars().first()

            gig.num_reviews -= 1
            new_rating = (
                gig.rating * (gig.num_reviews + 1) - db_obj.rating
            ) / gig.num_reviews
            gig.rating = new_rating

            session.delete(db_obj)
            await session.commit()
        return db_obj
