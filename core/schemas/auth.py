from ninja import Schema


class RegisterSchema(Schema):
    username: str
    email: str
    password: str


class LoginSchema(Schema):
    username: str
    password: str


class TokenSchema(Schema):
    success: bool
    access_token: str
    token_type: str


class MessageSchema(Schema):
    success: bool
    message: str