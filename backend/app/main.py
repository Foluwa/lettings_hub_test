from fastapi import FastAPI
from app.api.v1.api import router as api_router
from app.db.init_db import init_db

app = FastAPI()

# Initialize the database
@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def root():
    return {"message": "The Lettings Hub API is live!"}

# Include API routes
app.include_router(api_router, prefix="/api/v1")
