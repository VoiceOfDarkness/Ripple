from app.models.services import Gigs
from app.repository.base_repository import BaseRepository
from sqlalchemy.orm import Session, joinedload
from contextlib import AbstractContextManager
from typing import Callable, Optional
from app.models.user import Freelancer


class GigRepository(BaseRepository):
    def __init__(
            self, 
            session_factory: Callable[..., AbstractContextManager[Session]]
        ):
        self._session_factory = session_factory
        super().__init__(session_factory, Gigs)
        
    def create(self, seller_id: int, gig: Gigs) -> Optional[Gigs]:
        with self._session_factory() as session:
            freelancer = session.query(Freelancer).filter(Freelancer.user_id == seller_id).first()
            db_obj = Gigs(**gig.model_dump(), seller_id=freelancer.id)
            session.add(db_obj)
            session.commit()
            session.refresh(db_obj)
        return db_obj