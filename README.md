# neuralrag
# NeuralRAG

NeuralRAG is a RAG (Retrieval-Augmented Generation) based application that combines document upload, indexing, retrieval, and chat-based interaction.

## Features
- Upload documents and process them for retrieval
- Chunk and index content for semantic search
- Query documents through a chat interface
- Backend API for authentication, chat, and uploads
- Frontend UI for interacting with the system

## Tech Stack
- Python (FastAPI / backend)
- Next.js / React (frontend)
- FAISS for vector indexing
- OpenAI / LLM-based retrieval workflow

## Project Structure
- backend/ - Python backend API and RAG logic
- rag-ai-frontend/ - Next.js frontend
- uploads/ - uploaded documents
- faiss_index/ - vector index files

## Setup
1. Clone the repository
2. Install backend dependencies
3. Install frontend dependencies
4. Run the backend and frontend locally

## Environment Variables
Create a .env file and add your required API keys and configuration values.

Example:
```env
OPENAI_API_KEY=your_key_here

