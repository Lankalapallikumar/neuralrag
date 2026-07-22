from fastapi import APIRouter

from sqlalchemy.orm import Session

from app.database.database import (
    SessionLocal
)
from app.models.chat import Chat

from app.models.message import Message

from app.models.user import User

from app.rag.retriever import (
    ask_pdf
)

router = APIRouter()


FREE_LIMIT = 3


@router.post("/")
def ask_question(data: dict):

    question = data.get(
        "question"
    )

    chat_id = data.get(
        "chat_id"
    )

    user_id = data.get(
        "user_id"
    )

    db: Session = SessionLocal()

    # GET USER
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        return {

            "error":
            "User not found"

        }

    # FREE LIMIT
    if (

        not user.is_pro

        and

        user.free_queries_used >= FREE_LIMIT

    ):

        return {

            "error":
            "You reached your free limit. Upgrade to Pro."

        }

    # CREATE CHAT
    if not chat_id:

        chat = Chat(

            title=question[:30],

            user_id=user_id

        )

        db.add(chat)

        db.commit()

        db.refresh(chat)

        chat_id = chat.id

    # SAVE USER MESSAGE
    user_message = Message(

        chat_id=chat_id,

        role="user",

        content=question

    )

    db.add(user_message)

    db.commit()

    # AI ANSWER
    try:

        answer = ask_pdf(

            question,

            user_id

        )

    except Exception as e:

        print(e)

        answer = (
            "Error generating answer."
        )

    # SAVE AI MESSAGE
    ai_message = Message(

        chat_id=chat_id,

        role="assistant",

        content=answer

    )

    db.add(ai_message)

    # INCREMENT FREE COUNT
    if not user.is_pro:

        user.free_queries_used += 1

    db.commit()

    return {

        "answer":
        answer,

        "chat_id":
        chat_id,

        "free_queries_used":
        user.free_queries_used,

        "is_pro":
        user.is_pro

    }


@router.get("/history/{user_id}")
def get_history(user_id: int):

    db: Session = SessionLocal()

    chats = db.query(Chat).filter(

        Chat.user_id == user_id

    ).all()

    result = []

    for chat in chats:

        result.append({

            "id":
            chat.id,

            "title":
            chat.title

        })

    return result


@router.get("/{chat_id}")
def get_chat(chat_id: int):

    db: Session = SessionLocal()

    messages = db.query(Message).filter(

        Message.chat_id == chat_id

    ).all()

    result = []

    for msg in messages:

        result.append({

            "role":
            msg.role,

            "content":
            msg.content

        })

    return result
