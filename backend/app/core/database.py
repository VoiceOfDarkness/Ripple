from contextlib import asynccontextmanager
from typing import AsyncGenerator
import asyncio
import logging

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    async_scoped_session,
    async_sessionmaker,
)


class Database:
    def __init__(self, db_url: str) -> None:
        self._engine = create_async_engine(db_url, echo=True)
        self._session_factory = async_scoped_session(
            async_sessionmaker(
                autocommit=False,
                expire_on_commit=False,
                autoflush=False,
                bind=self._engine,
            ),
            scopefunc=asyncio.current_task,
        )

    @asynccontextmanager
    async def session(self) -> AsyncGenerator[AsyncSession, None]:  # type: ignore
        session: AsyncSession = self._session_factory()
        try:
            yield session
            await session.commit()
        except Exception as e:
            await session.rollback()
            logging.error(f"Session rollback due to exception: {e}")
            raise
        finally:
            await session.close()
