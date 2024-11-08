from fastapi import FastAPI
from app.api.v1.api import router as api_router
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()
origins = [
    # "*",  #TODO remember to remove this when deploying to production
    "http://localhost:3000",
    "https://lettings-hub-test-padn.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Initialize the database
@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def root():
    return {"message": "The Lettings Hub API is live!"}

# Include API routes
app.include_router(api_router, prefix="/api/v1")
