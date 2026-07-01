from ninja.security import HttpBearer
from django.contrib.auth.models import User
from django.conf import settings
import jwt


class JWTAuth(HttpBearer):

    def authenticate(self, request, token):

        try:

            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=["HS256"]
            )

            user = User.objects.get(
                id=payload["user_id"]
            )

            return user

        except Exception:
            return None