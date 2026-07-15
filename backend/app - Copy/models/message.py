from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)

from datetime import datetime

from app.database.database import Base


class Message(Base):

    __tablename__ = "messages"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    chat_id = Column(
        Integer,
        ForeignKey("chats.id")
    )

    role = Column(
        String(50)
    )

    content = Column(
        String(5000)
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )