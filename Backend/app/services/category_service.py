from app.repository.category_repository import CategoryRepository
from app.services.base_service import BaseService


class CategoryService(BaseService):
    def __init__(self, category_repository: CategoryRepository) -> None:
        self.category_repository = category_repository
        super().__init__(category_repository)
