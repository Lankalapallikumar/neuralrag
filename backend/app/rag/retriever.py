from langchain_community.vectorstores import (
    FAISS
)

from langchain.chains.question_answering import (
    load_qa_chain
)

from app.rag.embeddings import (
    embeddings
)

from app.rag.llm import (
    llm
)

import os


# VECTOR DB PATH
def get_db_path(user_id):

    return (
        f"faiss_index_{user_id}"
    )


# CREATE VECTOR STORE
def create_vector_store(

    chunks,

    user_id

):

    try:

        vector_store = FAISS.from_texts(

            texts=chunks,

            embedding=embeddings

        )

        vector_store.save_local(

            get_db_path(user_id)

        )

        print(
            "VECTOR STORE CREATED"
        )

    except Exception as e:

        print(
            "VECTOR STORE ERROR:",
            str(e)
        )


# LOAD VECTOR STORE
def load_vector_store(user_id):

    db_path = get_db_path(
        user_id
    )

    if not os.path.exists(
        db_path
    ):

        print(
            "VECTOR STORE NOT FOUND"
        )

        return None

    try:

        db = FAISS.load_local(

            db_path,

            embeddings,

            allow_dangerous_deserialization=True

        )

        print(
            "VECTOR STORE LOADED"
        )

        return db

    except Exception as e:

        print(
            "LOAD VECTOR ERROR:",
            str(e)
        )

        return None


# QA CHAIN
chain = load_qa_chain(

    llm,

    chain_type="stuff"

)


# ASK PDF
def ask_pdf(

    question: str,

    user_id: int

):

    try:

        print(
            "QUESTION:",
            question
        )

        # LOAD DB
        db = load_vector_store(
            user_id
        )

        if db is None:

            return (
                "Please upload PDF first."
            )

        print(
            "SEARCHING..."
        )

        # SEARCH DOCUMENTS
        docs = db.similarity_search(

            question,

            k=6

        )

        print(
            "DOCS FOUND:",
            len(docs)
        )

        if len(docs) == 0:

            return (
                "No relevant content found."
            )

        print(
            "GENERATING RESPONSE..."
        )

        # LLM RESPONSE
        response = chain.invoke({

            "input_documents": docs,

            "question": question

        })

        print(
            "RESPONSE GENERATED"
        )

        return response[
            "output_text"
        ]

    except Exception as e:

        print(
            "ASK PDF ERROR:",
            str(e)
        )

        return (
            "Error generating response."
        )