from contextlib import AbstractContextManager
from typing import Callable

from sqlalchemy.orm import Session

from app.models.user import User
from app.repository.base_repository import BaseRepository


class UserRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self.session_factory = session_factory
        super().__init__(session_factory, User)

    def create(self, scheme) -> User:
        with self.session_factory() as session:
            db_user = User(**scheme.dict(exclude={"password"}))
            db_user.set_password(scheme.password)
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            return db_user
