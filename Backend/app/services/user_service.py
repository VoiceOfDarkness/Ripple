from app.repository.user_repository import UserRepository
from app.repository.user_repository import FreelancerRepository
from app.schemas.user import User
from app.services.base_service import BaseService


class UserService(BaseService):
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository
        super().__init__(user_repository)

    def get_by_username_or_email(self, username: str) -> User:
        try:
            return self.user_repository.get_by_username_or_email(username)
        except Exception as e:
            raise Exception("Error getting user by username or email: ", e)


class FreelancerService(BaseService):
    def __init__(self, freelancer_repository: FreelancerRepository) -> None:
        self.freelancer_repository = freelancer_repository
        super().__init__(freelancer_repository)
