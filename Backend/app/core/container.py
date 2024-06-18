from dependency_injector import containers, providers
from redis import Redis

from app.core.config import settings
from app.core.database import Database
from app.repository import *
from app.services import *


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            "app.api.v1.endpoints.gig",
            "app.api.v1.endpoints.user",
            "app.api.v1.endpoints.category",
            "app.api.v1.endpoints.auth",
            "app.api.v1.endpoints.message",
            "app.api.v1.endpoints.order",
            "app.core.dependencies",
        ]
    )

    db = providers.Singleton(Database, db_url=settings.DATABASE_URI)
    redis = providers.Singleton(
        Redis, host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB
    )

    user_repository = providers.Factory(
        UserRepository, session_factory=db.provided.session
    )

    hire_manager_repository = providers.Factory(
        HireManagerRepository, session_factory=db.provided.session
    )

    freelancer_repository = providers.Factory(
        FreelancerRepository, session_factory=db.provided.session
    )

    category_repository = providers.Factory(
        CategoryRepository, session_factory=db.provided.session
    )

    gig_repository = providers.Factory(
        GigRepository, session_factory=db.provided.session
    )
    order_repository = providers.Factory(
        OrderRepository, session_factory=db.provided.session
    )
    message_repository = providers.Factory(
        MessageRepository, session_factory=db.provided.session
    )

    user_service = providers.Factory(
        UserService,
        user_repository=user_repository,
        freelancer_repository=freelancer_repository,
    )
    auth_service = providers.Factory(
        AuthService,
        user_repository=user_repository,
        hire_manager_repository=hire_manager_repository,
        redis_client=redis,
    )
    category_service = providers.Factory(
        CategoryService, category_repository=category_repository
    )
    gig_service = providers.Factory(GigService, gig_repository=gig_repository)
    order_service = providers.Factory(
        OrderService,
        order_repository=order_repository,
        freelancer_repository=freelancer_repository,
        hire_manager_repository=hire_manager_repository,
    )
    message_service = providers.Factory(
        MessageService, message_repository=message_repository
    )
