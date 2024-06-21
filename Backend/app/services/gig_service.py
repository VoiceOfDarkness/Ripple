import logging
import uuid
from pathlib import Path

import aiofiles
from app.core.config import settings
from app.repository.gig_repository import GigRepository
from app.schemas.services import BaseGigs, CreateGigs
from app.services.base_service import BaseService
from fastapi import UploadFile


class GigService(BaseService):
    def __init__(self, gig_repository: GigRepository) -> None:
        self.gig_repository = gig_repository
        super().__init__(gig_repository)

    async def add(self, seller_id: int, gig: BaseGigs, files: UploadFile):
        unique_id = str(uuid.uuid4())
        dir_path = Path(settings.MEDIA_ROOT) / unique_id
        dir_path.mkdir(parents=True, exist_ok=True)

        file_paths = []

        for file in files:
            file_path = dir_path / file.filename
            async with aiofiles.open(file_path, "wb") as out_file:
                while content := await file.read(settings.DEFAULT_CHUNK_SIZE):
                    await out_file.write(content)
            file_paths.append(f"{unique_id}/{file.filename}")

        create_gig = CreateGigs(
            title=gig.title,
            description=gig.description,
            category_id=gig.category_id,
            price=gig.price,
            delivery_time=gig.delivery_time,
            images=file_paths,
        )

        return await self.gig_repository.create(seller_id, create_gig)
