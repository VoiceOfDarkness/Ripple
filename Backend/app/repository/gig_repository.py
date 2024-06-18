from contextlib import AbstractContextManager
from typing import Callable, List, Optional

from app.models.services import Gigs, Image
from app.models.user import Freelancer
from app.repository.base_repository import BaseRepository
from app.schemas.services import CreateGigs
from sqlalchemy.orm import Session, joinedload


class GigRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self._session_factory = session_factory
        super().__init__(session_factory, Gigs)

    def create(self, seller_id: int, gig: CreateGigs) -> Optional[Gigs]:
        with self._session_factory() as session:
            freelancer = (
                session.query(Freelancer)
                .filter(Freelancer.user_id == seller_id)
                .first()
            )

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
            session.commit()
            session.refresh(db_obj)

            db_obj = (
                session.query(Gigs)
                .options(
                    joinedload(Gigs.category),
                    joinedload(Gigs.freelancer).joinedload(Freelancer.user),
                    joinedload(Gigs.images),
                )
                .filter(Gigs.id == db_obj.id)
                .one()
            )

        return db_obj

    def get(self) -> Optional[List[Gigs]]:
        with self._session_factory() as session:
            return (
                session.query(Gigs)
                .options(
                    joinedload(Gigs.category),
                    joinedload(Gigs.freelancer).joinedload(Freelancer.user),
                    joinedload(Gigs.images),
                )
                .all()
            )

    def get_by_id(self, gig_id: int):
        with self._session_factory() as session:
            return (
                session.query(Gigs)
                .options(
                    joinedload(Gigs.category),
                    joinedload(Gigs.freelancer).joinedload(Freelancer.user),
                    joinedload(Gigs.images),
                )
                .filter(Gigs.id == gig_id)
                .first()
            )
