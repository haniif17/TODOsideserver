from ninja import Schema
from typing import Optional
from datetime import datetime


class CategoryIn(Schema):
    name: str
    description: Optional[str] = None


class CategoryOut(Schema):
    id: int
    name: str
    description: Optional[str]
    created_at: datetime
    updated_at: datetime