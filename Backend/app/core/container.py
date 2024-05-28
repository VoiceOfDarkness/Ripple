from app.core.config import settings
from app.core.database import Database
from app.repository import *
from app.services import *
from dependency_injector import containers, providers


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(
        modules=[
            "app.api.v1.endpoints.gig",
            "app.api.v1.endpoints.user",
            "app.api.v1.endpoints.category",
            "app.api.v1.endpoints.auth",
            "app.core.dependencies",
        ]
    )

    db = providers.Singleton(Database, db_url=settings.DATABASE_URI)

    user_repository = providers.Factory(
        UserRepository, session_factory=db.provided.session
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

    user_service = providers.Factory(UserService, user_repository=user_repository)
    auth_service = providers.Factory(AuthService, user_repository=user_repository, freelancer_repository=freelancer_repository)
    category_service = providers.Factory(
        CategoryService, category_repository=category_repository
    )
    gig_service = providers.Factory(
        GigService, gig_repository=gig_repository
    )
