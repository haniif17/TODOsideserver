from ninja import Schema
from typing import Optional
from datetime import date, datetime


class TodoIn(Schema):
    category_id: int
    title: str
    description: Optional[str] = None
    status: str
    priority: str
    deadline: date
    is_completed: bool = False


class TodoOut(Schema):

    id: int

    title: str
    description: Optional[str]

    status: str
    priority: str
    deadline: date

    is_completed: bool

    category: str
    category_id: int

    user: str

    created_at: datetime
    updated_at: datetime