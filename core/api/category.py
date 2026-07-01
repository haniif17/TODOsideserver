from ninja.throttling import AnonRateThrottle
from ninja import Router
from django.shortcuts import get_object_or_404

from core.models import Category
from core.schemas.category import CategoryIn, CategoryOut

router = Router(
    tags=["Categories"],
    throttle=AnonRateThrottle("60/m")
)


# ==========================
# GET ALL CATEGORY
# ==========================
@router.get("/", response=list[CategoryOut])
def get_categories(request):
    return Category.objects.all()


# ==========================
# GET CATEGORY BY ID
# ==========================
@router.get("/{category_id}", response=CategoryOut)
def get_category(request, category_id: int):
    return get_object_or_404(Category, id=category_id)


# ==========================
# CREATE CATEGORY
# ==========================
@router.post("/", response=CategoryOut)
def create_category(request, payload: CategoryIn):

    category = Category.objects.create(
        name=payload.name,
        description=payload.description
    )

    return category


# ==========================
# UPDATE CATEGORY
# ==========================
@router.put("/{category_id}", response=CategoryOut)
def update_category(request, category_id: int, payload: CategoryIn):

    category = get_object_or_404(Category, id=category_id)

    category.name = payload.name
    category.description = payload.description

    category.save()

    return category


# ==========================
# DELETE CATEGORY
# ==========================
@router.delete("/{category_id}")
def delete_category(request, category_id: int):

    category = get_object_or_404(Category, id=category_id)

    category.delete()

    return {
        "success": True,
        "message": "Category deleted successfully"
    }