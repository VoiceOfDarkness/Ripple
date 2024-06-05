from contextlib import AbstractContextManager
from typing import Callable

from sqlalchemy.orm import Session


class BaseRepository:
    def __init__(self, session_factory: Callable[..., AbstractContextManager[Session]], model) -> None:
        self.session_factory = session_factory
        self.model = model

    def create(self, schema) -> None:
        with self.session_factory() as session:
            db_obj = self.model(**schema.dict())
            try:
                session.add(db_obj)
                session.commit()
                session.refresh(db_obj)
            except Exception as e:
                print(e)
        return db_obj

    def get(self):
        with self.session_factory() as session:
            db_obj = session.query(self.model).all()
        return db_obj

    def get_all_paginated(self, page, per_page):
        offset = (page - 1) * per_page
        with self.session_factory() as session:
            db_obj = session.query(self.model).limit(per_page).offset(offset).all()
        return db_obj

    def get_by_id(self, id: int):
        with self.session_factory() as session:
            db_obj = session.query(self.model).filter(self.model.id == id).first()
        return db_obj

    def update(self, id: int, schema) -> None:
        with self.session_factory() as session:
            db_obj = session.get(self.model, id)
            
            for key, value in schema.model_dump(exclude_none=True).items():
                setattr(db_obj, key, value)
            session.add(db_obj)
            session.commit()
            session.refresh(db_obj)
        return db_obj

    def delete(self, id: int) -> None:
        with self.session_factory() as session:
            db_obj = session.get(self.model, id)
            session.delete(db_obj)
            session.commit()
        return db_obj
