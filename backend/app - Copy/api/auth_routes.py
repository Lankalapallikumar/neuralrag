from fastapi import APIRouter

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)

from app.models.user import (
    User
)

router = APIRouter()


# REGISTER
@router.post("/register")
def register(data: dict):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(

        User.email == data["email"]

    ).first()

    if existing_user:

        return {

            "error":
            "Email already exists"

        }

    new_user = User(

        username=data["username"],

        email=data["email"],

        password=data["password"],

        is_pro=False,

        free_queries_used=0

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message":
        "User registered successfully"

    }


# LOGIN
@router.post("/login")
def login(data: dict):

    db: Session = SessionLocal()

    user = db.query(User).filter(

        User.email == data["email"],

        User.password == data["password"]

    ).first()

    if not user:

        return {

            "error":
            "Invalid credentials"

        }

    return {

        "message":
        "Login successful",

        "user": {

            "id":
            user.id,

            "username":
            user.username,

            "email":
            user.email,

            "is_pro":
            user.is_pro,

            "free_queries_used":
            user.free_queries_used

        }

    }