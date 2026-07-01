from ninja import Router
from ninja.throttling import AnonRateThrottle

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.db import IntegrityError

from datetime import datetime, timedelta
from django.conf import settings
import jwt

from core.schemas.auth import (
    RegisterSchema,
    LoginSchema,
    TokenSchema,
    MessageSchema,
)

router = Router(
    tags=["Authentication"],
    throttle=AnonRateThrottle("100/m")
)


# ==========================
# REGISTER
# ==========================

@router.post(
    "/register",
    response=MessageSchema
)
def register(request, payload: RegisterSchema):

    try:
        User.objects.create(
            username=payload.username,
            email=payload.email,
            password=make_password(payload.password)
        )

        return {
            "success": True,
            "message": "Register berhasil"
        }

    except IntegrityError:

        return {
            "success": False,
            "message": "Username sudah digunakan"
        }


# ==========================
# LOGIN
# ==========================

@router.post(
    "/login",
    response={
        200: TokenSchema,
        401: MessageSchema,
    }
)
def login(request, payload: LoginSchema):

    user = authenticate(
        username=payload.username,
        password=payload.password
    )

    if user is None:
        return 401, {
            "success": False,
            "message": "Username atau password salah"
        }

    payload_jwt = {
        "user_id": user.id,
        "username": user.username,
        "exp": datetime.utcnow() + timedelta(hours=24),
    }

    token = jwt.encode(
        payload_jwt,
        settings.SECRET_KEY,
        algorithm="HS256"
    )

    return 200, {
        "success": True,
        "access_token": token,
        "token_type": "Bearer"
    }


# ==========================
# LOGOUT
# ==========================

@router.post(
    "/logout",
    response=MessageSchema
)
def logout(request):

    return {
        "success": True,
        "message": "Logout berhasil. Hapus token pada client."
    }


# ==========================
# ME
# ==========================

@router.get("/me")
def me(request):

    return {
        "message": "Endpoint profile akan digunakan setelah JWT diaktifkan."
    }