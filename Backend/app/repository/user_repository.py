from contextlib import AbstractContextManager
from typing import Callable

from app.models.user import HireManager, Freelancer, User
from app.repository.base_repository import BaseRepository
from sqlalchemy.orm import Session, joinedload


class UserRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self.session_factory = session_factory
        super().__init__(session_factory, User)

    def get_by_username_or_email(self, username_or_email: str) -> User:
        with self.session_factory() as session:
            return (
                session.query(User)
                .filter(
                    (User.user_name == username_or_email)
                    | (User.email == username_or_email)
                )
                .first()
            )


class HireManagerRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self.session_factory = session_factory
        super().__init__(session_factory, HireManager)

    def get_by_user_id(self, user_id: int):
        with self.session_factory() as session:
            db_obj = (
                session.query(HireManager)
                .filter(HireManager.user_id == user_id)
                .first()
            )
        return db_obj


class FreelancerRepository(BaseRepository):
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]]):
        self.session_factory = session_factory
        super().__init__(session_factory, Freelancer)

    def create(self, user_id: int):
        with self.session_factory() as session:
            freelancer = Freelancer(user_id=user_id)

            session.add(freelancer)
            session.commit()
            session.refresh(freelancer)

    def get_by_user_id(self, user_id: int):
        with self.session_factory() as session:
            db_obj = (
                session.query(Freelancer).filter(Freelancer.user_id == user_id).first()
            )
        return db_obj
