from langchain_groq import (
    ChatGroq
)

from dotenv import (
    load_dotenv
)

import os


# LOAD ENV
load_dotenv()


# CREATE LLM
llm = ChatGroq(

    groq_api_key=
    os.getenv(
        "GROQ_API_KEY"
    ),

    model_name=
    "llama-3.1-8b-instant",

    temperature=0,

    max_tokens=500

)


# GENERATE ANSWER
def generate_answer(

    context,

    question

):

    prompt = f"""
You are an intelligent AI assistant.

Answer ONLY from the provided context.

If answer is not present in context,
say:
"I could not find this in the PDF."

Provide concise and accurate answers.

Context:
{context}

Question:
{question}

Answer:
"""

    response = llm.invoke(
        prompt
    )

    return response.content