from app.repository.gig_repository import GigRepository
from app.services.base_service import BaseService
from pydantic import BaseModel

class GigService(BaseService):
    def __init__(self, gig_repository: GigRepository) -> None:
        self.gig_repository = gig_repository
        super().__init__(gig_repository)
        
    def add(self, seller_id: int, gig: BaseModel):
        return self.gig_repository.create(seller_id, gig)