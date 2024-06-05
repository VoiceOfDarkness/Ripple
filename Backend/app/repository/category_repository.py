from contextlib import AbstractContextManager
from typing import Callable, Optional

from app.models.categories import Category
from app.models.services import Gigs
from app.models.user import Freelancer
from app.repository.base_repository import BaseRepository
from sqlalchemy.orm import Session, joinedload


class CategoryRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self._session_factory = session_factory
        super().__init__(session_factory, Category)

    def get(self) -> Optional[Category]:
        with self._session_factory() as session:
            return session.query(Category).options(
                joinedload(Category.gigs).joinedload(Gigs.freelancer).joinedload(Freelancer.user),
                joinedload(Category.gigs).joinedload(Gigs.orders),
                joinedload(Category.gigs).joinedload(Gigs.category)
            ).all()
