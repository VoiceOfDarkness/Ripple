class BaseService:
    def __init__(self, repository) -> None:
        self._repository = repository

    async def add(self, schema):
        return await self._repository.create(schema)

    async def get_list(self):
        return await self._repository.get()

    async def get_paginated(self, page: int, per_page: int):
        return await self._repository.get_all_paginated(page, per_page)

    async def get(self, id: int):
        return await self._repository.get_by_id(id)

    async def update(self, id: int, schema):
        return await self._repository.update(id, schema)

    async def delete(self, id: int):
        return await self._repository.delete(id)
