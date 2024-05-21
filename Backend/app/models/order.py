from datetime import datetime
from decimal import Decimal

from sqlmodel import Field, SQLModel, Relationship
from typing import TYPE_CHECKING, ForwardRef
import enum

if TYPE_CHECKING:
    from app.models.user import Freelancer, HireManager
    from app.models.services import Gigs


class OrderStatus(str, enum.Enum):
    pending = "pending"
    accepted = "in_progress"
    completed = "completed"
    cancelled = "cancelled"


class Order(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    buyer_id: int = Field(foreign_key="hire_manager.id")
    seller_id: int = Field(foreign_key="freelancer.id")
    gig_id: int = Field(foreign_key="gigs.id")
    status: OrderStatus = Field(default=OrderStatus.pending)
    order_date: datetime = Field(default=datetime.now(), nullable=False)
    total_price: Decimal = Field(nullable=False)
    freelancer: ForwardRef("Freelancer") = Relationship(back_populates="orders")  # type: ignore
    hire_manager: ForwardRef("HireManager") = Relationship(back_populates="orders")  # type: ignore
    gigs: ForwardRef("Gigs") = Relationship(back_populates="orders")  # type: ignore
