import enum
from datetime import datetime
from decimal import Decimal
from typing import TYPE_CHECKING, List

from pydantic import BaseModel, Field

if TYPE_CHECKING:
    from app.schemas.user import User


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


class ManagerOrder(BaseModel):
    user: "User"


class FreelancerOrder(BaseModel):
    user: "User"


class GigOrder(BaseModel):
    id: int
    title: str


class Order(BaseOrder):
    id: int
    order_date: datetime
    hire_manager: "ManagerOrder"
    freelancer: "FreelancerOrder"
    gigs: "GigOrder"

    class Config:
        from_attributes = True


class CreateOrder(BaseModel):
    seller_id: int
    gig_id: int
    status: OrderStatus = OrderStatus.pending
    total_price: Decimal


class UpdateOrder(BaseModel):
    status: OrderStatus = OrderStatus.pending