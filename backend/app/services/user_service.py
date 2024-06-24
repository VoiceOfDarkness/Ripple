import uuid
import logging
import aiofiles
from pathlib import Path
from fastapi import status
from fastapi.responses import JSONResponse

from app.repository.user_repository import FreelancerRepository, UserRepository
from app.schemas.user import User, UpdateUser
from app.services.base_service import BaseService
from app.core.config import settings


logger = logging.getLogger(__name__)


class UserService(BaseService):
    def __init__(
        self,
        user_repository: UserRepository,
        freelancer_repository: FreelancerRepository,
    ) -> None:
        self.user_repository = user_repository
        self.freelancer_repository = freelancer_repository
        super().__init__(user_repository)

    async def get_by_username_or_email(self, username: str) -> User:
        try:
            return await self.user_repository.get_by_username_or_email(username)
        except Exception as e:
            raise Exception("Error getting user by username or email: ", e)

    async def get_profile(self, user: User):
        user_data = user.model_dump()
        if user.is_freelancer:
            freelancer = await self.freelancer_repository.get_by_user_id(user.id)
            if freelancer and hasattr(freelancer, "overview"):
                user_data["overview"] = (
                    freelancer.overview
                )
        return user_data

    async def update(self, user: User, user_data: UpdateUser, user_image):
        unique_id = str(uuid.uuid4())
        dir_path = Path(settings.MEDIA_ROOT) / unique_id
        dir_path.mkdir(parents=True, exist_ok=True)

        if user_image:
            file_path = dir_path / user_data.user_image
            async with aiofiles.open(file_path, "wb") as out_file:
                while content := await user_image.read(settings.DEFAULT_CHUNK_SIZE):
                    await out_file.write(content)

        try:
            if user_image:
                user_data.user_image = f"{unique_id}/{user_data.user_image}"
            if user.is_freelancer:
                freelancer = await self.freelancer_repository.get_by_user_id(user.id)
                await self.freelancer_repository.update(
                    freelancer.id, user_data.overview
                )
                user_data.overview = None
                logger.info(f"Freelancer updated {user_data}")
            return await self.user_repository.update(user.id, user_data)
        except Exception as e:
            raise Exception("Error updating user: ", e)

    async def switch_to_freelancer(self, user: User):
        freelancer = await self.freelancer_repository.get_by_user_id(user.id)

        if not freelancer:
            await self.freelancer_repository.create(user_id=user.id)

        user.is_freelancer = True
        user.is_hire_manager = False
        await self.user_repository.update(user.id, user)

        return JSONResponse(
            content={"message": "User switched to freelancer"},
            status_code=status.HTTP_200_OK,
        )

    async def switch_to_hire_manager(self, user: User):
        user.is_freelancer = False
        user.is_hire_manager = True
        await self.user_repository.update(user.id, user)

        return JSONResponse(
            content={"message": "User switched to hire manager"},
            status_code=status.HTTP_200_OK,
        )
