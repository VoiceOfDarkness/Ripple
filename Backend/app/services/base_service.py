class BaseService:
    def __init__(self, repository) -> None:
        self._repository = repository

    def add(self, schema):
        return self._repository.create(schema)

    def get_list(self):
        return self._repository.get()

    def get(self, id: int):
        return self._repository.get_by_id(id)

    def update(self, id: int, schema):
        return self._repository.update(id, schema)

    def delete(self, id: int):
        return self._repository.delete(id)
