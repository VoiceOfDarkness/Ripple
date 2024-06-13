import uuid
import aiofiles
from pathlib import Path

from app.repository.user_repository import FreelancerRepository, UserRepository
from app.schemas.user import User
from app.services.base_service import BaseService
from app.core.config import settings


class UserService(BaseService):
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository
        super().__init__(user_repository)

    def get_by_username_or_email(self, username: str) -> User:
        try:
            return self.user_repository.get_by_username_or_email(username)
        except Exception as e:
            raise Exception("Error getting user by username or email: ", e)

    async def update(self, user_id, user_data, user_image):
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
            return self.user_repository.update(user_id, user_data)
        except Exception as e:
            raise Exception("Error updating user: ", e)


class FreelancerService(BaseService):
    def __init__(self, freelancer_repository: FreelancerRepository) -> None:
        self.freelancer_repository = freelancer_repository
        super().__init__(freelancer_repository)
