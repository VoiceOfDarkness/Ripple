import logging

logger = logging.getLogger(__name__)


class BaseService:
    def __init__(self, repository) -> None:
        self._repository = repository

    def add(self, schema):
        return self._repository.create(schema)

    def get_list(self):
        return self._repository.get()

    def get_paginated(self, page: int, per_page: int):
        return self._repository.get_all_paginated(page, per_page)

    def get(self, id: int):
        return self._repository.get_by_id(id)

    def update(self, id: int, schema):
        logger.info(f"ABOBA {schema.model_dump()}")
        return self._repository.update(id, schema)

    def delete(self, id: int):
        return self._repository.delete(id)
