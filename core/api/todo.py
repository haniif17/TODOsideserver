from ninja.throttling import AnonRateThrottle
from ninja import Router
from ninja.pagination import paginate, PageNumberPagination
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q

from core.models import Todo, Category
from core.schemas.todo import TodoIn, TodoOut

router = Router(
    tags=["Todos"],
    throttle=AnonRateThrottle("30/m")
)


def serialize(todo):
    return {
        "id": todo.id,
        "title": todo.title,
        "description": todo.description,
        "status": todo.status,
        "priority": todo.priority,
        "deadline": todo.deadline,
        "is_completed": todo.is_completed,

        "category": todo.category.name,
        "category_id": todo.category.id,

        "user": todo.user.username,

        "created_at": todo.created_at,
        "updated_at": todo.updated_at,
    }


# ==================================================
# GET ALL TODOS + SEARCH + FILTER + PAGINATION
# ==================================================

@router.get("/", response=list[TodoOut])
@paginate(PageNumberPagination, page_size=5)
def get_todos(
    request,
    search: str = None,
    status: str = None,
    priority: str = None,
    category: str = None,
):

    todos = (
        Todo.objects
        .select_related("category", "user")
        .order_by("-created_at")
    )

    # SEARCH
    if search:
        todos = todos.filter(
            Q(title__icontains=search) |
            Q(description__icontains=search)
        )

    # FILTER STATUS
    if status:
        todos = todos.filter(status=status)

    # FILTER PRIORITY
    if priority:
        todos = todos.filter(priority=priority)

    # FILTER CATEGORY
    if category:
        todos = todos.filter(category__name__icontains=category)

    return [serialize(todo) for todo in todos]


# ==================================================
# GET TODO BY ID
# ==================================================

@router.get("/{todo_id}", response=TodoOut)
def get_todo(request, todo_id: int):

    todo = get_object_or_404(Todo, id=todo_id)

    return serialize(todo)


# ==================================================
# CREATE TODO
# ==================================================

@router.post("/", response=TodoOut)
def create_todo(request, payload: TodoIn):

    category = get_object_or_404(Category, id=payload.category_id)

    # Sementara menggunakan admin.
    # Setelah JWT selesai akan diganti menjadi:
    # user = request.user
    user = User.objects.get(username="admin")

    todo = Todo.objects.create(
        user=user,
        category=category,
        title=payload.title,
        description=payload.description,
        status=payload.status,
        priority=payload.priority,
        deadline=payload.deadline,
        is_completed=payload.is_completed,
    )

    return serialize(todo)


# ==================================================
# UPDATE TODO
# ==================================================

@router.put("/{todo_id}", response=TodoOut)
def update_todo(request, todo_id: int, payload: TodoIn):

    todo = get_object_or_404(Todo, id=todo_id)

    todo.category = get_object_or_404(Category, id=payload.category_id)
    todo.title = payload.title
    todo.description = payload.description
    todo.status = payload.status
    todo.priority = payload.priority
    todo.deadline = payload.deadline
    todo.is_completed = payload.is_completed

    todo.save()

    return serialize(todo)


# ==================================================
# DELETE TODO
# ==================================================

@router.delete("/{todo_id}")
def delete_todo(request, todo_id: int):

    todo = get_object_or_404(Todo, id=todo_id)

    todo.delete()

    return {
        "success": True,
        "message": "Todo deleted successfully"
    }