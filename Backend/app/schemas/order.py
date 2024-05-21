from pydantic import BaseModel, Field
import enum
from decimal import Decimal
from datetime import datetime

from typing import TYPE_CHECKING


if TYPE_CHECKING:
    from app.schemas.user import Freelancer, HireManager
    from app.schemas.services import Gigs

class OrderStatus(str, enum.Enum):
    pending = "pending"
    accepted = "in_progress"
    completed = "completed"
    cancelled = "cancelled"


# Order schemas
class BaseOrder(BaseModel):
    buyer_id: int
    seller_id: int
    gig_id: int
    status: OrderStatus = OrderStatus.pending
    total_price: Decimal

class Order(BaseOrder):
    id: int
    order_date: datetime
    freelancer: "Freelancer"
    hire_manager: "HireManager"
    gigs: "Gigs"


class CreateOrder(BaseOrder):
    pass