from django.test import TestCase
from django.contrib.auth.models import User
from ninja.testing import TestClient

from config.api import api
from core.models import Category, Todo


client = TestClient(api)


class AuthenticationTest(TestCase):

    def test_register(self):

        response = client.post(
            "/auth/register",
            json={
                "username": "daffa",
                "email": "daffa@gmail.com",
                "password": "daffa12345"
            }
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(User.objects.filter(username="daffa").exists())

    def test_login(self):

        User.objects.create_user(
            username="daffa",
            email="daffa@gmail.com",
            password="daffa12345"
        )

        response = client.post(
            "/auth/login",
            json={
                "username": "daffa",
                "password": "daffa12345"
            }
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("access_token", response.json())


class CategoryTest(TestCase):

    def test_create_category(self):

        response = client.post(
            "/categories/",
            json={
                "name": "Kuliah",
                "description": "Tugas Kampus"
            }
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Category.objects.count(), 1)

    def test_get_categories(self):

        Category.objects.create(
            name="Kuliah",
            description="Tugas"
        )

        response = client.get("/categories/")

        self.assertEqual(response.status_code, 200)


class TodoTest(TestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            username="admin",
            password="admin123"
        )

        self.category = Category.objects.create(
            name="Kuliah",
            description="Tugas"
        )

    def test_create_todo(self):

        response = client.post(
            "/todos/",
            json={
                "category_id": self.category.id,
                "title": "Belajar Django",
                "description": "Unit Testing",
                "status": "pending",
                "priority": "high",
                "deadline": "2026-07-10",
                "is_completed": False
            }
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Todo.objects.count(), 1)

    def test_get_todos(self):

        Todo.objects.create(
            user=self.user,
            category=self.category,
            title="Belajar",
            description="Testing",
            status="pending",
            priority="medium",
            deadline="2026-07-10"
        )

        response = client.get("/todos/")

        self.assertEqual(response.status_code, 200)

    def test_update_todo(self):

        todo = Todo.objects.create(
            user=self.user,
            category=self.category,
            title="Lama",
            description="Desc",
            status="pending",
            priority="medium",
            deadline="2026-07-10"
        )

        response = client.put(
            f"/todos/{todo.id}",
            json={
                "category_id": self.category.id,
                "title": "Baru",
                "description": "Updated",
                "status": "completed",
                "priority": "high",
                "deadline": "2026-07-20",
                "is_completed": True
            }
        )

        self.assertEqual(response.status_code, 200)

    def test_delete_todo(self):

        todo = Todo.objects.create(
            user=self.user,
            category=self.category,
            title="Delete",
            description="Delete",
            status="pending",
            priority="medium",
            deadline="2026-07-10"
        )

        response = client.delete(f"/todos/{todo.id}")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Todo.objects.count(), 0)