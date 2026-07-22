from fastapi import (
    APIRouter,
    UploadFile,
    File
)
from pypdf import PdfReader

import shutil
import os

from app.rag.chunker import (
    chunk_text
)

from app.rag.retriever import (
    create_vector_store
)

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/pdf")
async def upload_pdf(

    user_id: int,

    file: UploadFile = File(...)

):

    file_path = (
        f"{UPLOAD_DIR}/{file.filename}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    reader = PdfReader(file_path)

    extracted_text = ""

    for page in reader.pages:

        text = page.extract_text()

        if text:

            extracted_text += text

    chunks = chunk_text(
        extracted_text
    )

    create_vector_store(

        chunks,

        user_id

    )

    return {

        "filename":
        file.filename,

        "message":
        "PDF processed successfully",

        "chunks_created":
        len(chunks)

    }
