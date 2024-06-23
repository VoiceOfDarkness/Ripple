from fastapi import UploadFile, status
from fastapi.responses import JSONResponse

from app.core.elasticsearch import get_elasticsearch_client
from app.repository.gig_repository import GigRepository
from app.schemas.services import BaseGigs, CreateGigs
from app.services.base_service import BaseService
from app.utils.file_manager import save_files, remove_files


class GigService(BaseService):
    def __init__(self, gig_repository: GigRepository) -> None:
        self.gig_repository = gig_repository
        super().__init__(gig_repository)

    async def add(self, seller_id: int, gig: BaseGigs, files: UploadFile):
        file_paths = await save_files(files)
        es = get_elasticsearch_client()

        create_gig = CreateGigs(
            title=gig.title,
            description=gig.description,
            category_id=gig.category_id,
            price=gig.price,
            delivery_time=gig.delivery_time,
            images=file_paths,
        )

        db_gig = await self.gig_repository.create(seller_id, create_gig)

        es_document = {
            "id": db_gig.id,
            "title": db_gig.title,
            "description": db_gig.description,
            "category": {
                "id": db_gig.category.id,
                "name": db_gig.category.name,
            },
            "price": float(db_gig.price),
            "delivery_time": db_gig.delivery_time,
            "seller_id": db_gig.seller_id,
            "freelancer": {
                "user_id": db_gig.freelancer.user.id,
                "overview": db_gig.freelancer.overview,
                "user": {
                    "user_name": db_gig.freelancer.user.user_name,
                    "user_image": db_gig.freelancer.user.user_image,
                    "email": db_gig.freelancer.user.email,
                    "location": db_gig.freelancer.user.location,
                    "first_name": db_gig.freelancer.user.first_name,
                    "last_name": db_gig.freelancer.user.last_name,
                    "created_at": db_gig.freelancer.user.created_at,
                    "id": db_gig.freelancer.user.id,
                    "is_active": db_gig.freelancer.user.is_active,
                    "is_banned": db_gig.freelancer.user.is_blocked,
                    "is_freelancer": db_gig.freelancer.user.is_freelancer,
                    "is_hire_manager": db_gig.freelancer.user.is_hire_manager,
                },
            },
            "images": [
                {"id": image.id, "filename": image.filename, "gig_id": image.gig_id}
                for image in db_gig.images
            ],
        }
        es.index(index="gigs", id=db_gig.id, body=es_document)

        return JSONResponse(
            content={"message": "Gig created successfully"},
            status_code=status.HTTP_201_CREATED,
        )

    async def search(self, query: str, page: int, size: int):
        es = get_elasticsearch_client()
        result = es.search(
            index="gigs",
            body={
                "query": {
                    "multi_match": {
                        "query": query,
                        "fields": ["title", "description"],
                    }
                },
                "from": (page - 1) * size,
                "size": size,
            },
        )

        sources = [hit["_source"] for hit in result["hits"]["hits"]]
        return sources

    async def delete(self, gig_id):
        es = get_elasticsearch_client()
        es.delete(index="gigs", id=gig_id)

        images = await self.gig_repository.delete(gig_id)
        await remove_files(images)

        return JSONResponse(
            content={"message": "Gig deleted successfully"},
            status_code=status.HTTP_200_OK,
        )
