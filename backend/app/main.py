from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.database.database import (
    engine,
    Base
)

from app.api.upload_routes import (
    router as upload_router
)

from app.api.chat_routes import (
    router as chat_router
)

from app.api.auth_routes import (
    router as auth_router
)

from app.api.payment_routes import (
    router as payment_router
)


# CREATE TABLES
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="NeuralRAG API"
)


# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ROUTES
app.include_router(
    upload_router,
    prefix="/upload",
    tags=["Upload"]
)

app.include_router(
    chat_router,
    prefix="/chat",
    tags=["Chat"]
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    payment_router,
    prefix="/payment",
    tags=["Payment"]
)


@app.get("/")
def root():

    return {

        "message":
        "NeuralRAG API Running"

    }