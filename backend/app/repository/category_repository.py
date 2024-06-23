from contextlib import AbstractContextManager
from typing import Callable

from app.models.categories import Category
from app.repository.base_repository import BaseRepository
from sqlalchemy.ext.asyncio import AsyncSession


class CategoryRepository(BaseRepository):
    def __init__(
        self, session_factory: Callable[..., AbstractContextManager[AsyncSession]]
    ):
        self._session_factory = session_factory
        super().__init__(session_factory, Category)
