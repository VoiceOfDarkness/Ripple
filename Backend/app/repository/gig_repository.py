from contextlib import AbstractAsyncContextManager
from typing import Callable, List, Optional

from app.models.services import Gigs, Image
from app.models.user import Freelancer
from app.repository.base_repository import BaseRepository
from app.schemas.services import CreateGigs
from sqlalchemy.orm import Session, selectinload
from sqlalchemy.future import select


class GigRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractAsyncContextManager[Session]]
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

            await session.add(db_obj)
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

    async def get(self) -> Optional[List[Gigs]]:
        async with self._session_factory() as session:
            stmt = select(Gigs).options(
                selectinload(Gigs.category),
                selectinload(Gigs.freelancer).selectinload(Freelancer.user),
                selectinload(Gigs.images),
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().all()
            return db_obj

    async def get_by_id(self, gig_id: int):
        async with self._session_factory() as session:
            stmt = (
                select(Gigs)
                .options(
                    selectinload(Gigs.category),
                    selectinload(Gigs.freelancer).selectinload(Freelancer.user),
                    selectinload(Gigs.images),
                )
                .where(Gigs.id == gig_id)
            )
            result = await session.execute(stmt)
            db_obj = result.scalars().one_or_none()
            return db_obj
