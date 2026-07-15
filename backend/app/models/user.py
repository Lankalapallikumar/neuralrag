from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean
)

from app.database.database import (
    Base
)


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True
    )

    email = Column(
        String,
        unique=True
    )

    password = Column(
        String
    )

    is_pro = Column(
        Boolean,
        default=False
    )

    free_queries_used = Column(
        Integer,
        default=0
    )