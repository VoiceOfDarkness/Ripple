import aiofiles
import logging

from app.repository.gig_repository import GigRepository
from app.services.base_service import BaseService
from app.core.config import settings
from app.schemas.services import CreateGigs, FileCreateGigs, Gigs
from fastapi import UploadFile
from pathlib import Path

logger = logging.getLogger(__name__)


class GigService(BaseService):
    def __init__(self, gig_repository: GigRepository) -> None:
        self.gig_repository = gig_repository
        super().__init__(gig_repository)

    async def add(self, seller_id: int, gig: CreateGigs, file: UploadFile):
        image_path = Path(settings.MEDIA_ROOT) / file.filename

        logger.info(f"Saving image to {image_path}")
        logger.info(f"filename: {file.filename}")

        gig = FileCreateGigs(data=gig, image_filename=file.filename)

        async with aiofiles.open(image_path, "wb") as out_file:
            while content := await file.read(settings.DEFAULT_CHUNK_SIZE):
                await out_file.write(content)

        return self.gig_repository.create(seller_id, gig)
