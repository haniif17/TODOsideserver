from ninja import NinjaAPI

api = NinjaAPI(
    title="ToDo Management API",
    version="1.0.0",
    description="REST API Project UAS"
)

from core.api.auth import router as auth_router
from core.api.category import router as category_router
from core.api.todo import router as todo_router

api.add_router("/auth/", auth_router)
api.add_router("/categories/", category_router)
api.add_router("/todos/", todo_router)