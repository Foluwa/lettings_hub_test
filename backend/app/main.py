from fastapi import FastAPI
from app.api.v1.api import router as api_router
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles

app = FastAPI()
origins = [
    "*",  # TODO remember to remove this when deploying to production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Mount the React `build` directory as static files
# app.mount("/", StaticFiles(directory="frontend/build", html=True), name="static")


# Initialize the database
@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def root():
    return {"message": "The Lettings Hub API is live!"}



# Include API routes
app.include_router(api_router, prefix="/api/v1")
