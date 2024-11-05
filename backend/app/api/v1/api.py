from fastapi import APIRouter
from app.api.v1.routes import portfolio, user

router = APIRouter()

# Include routers from different modules
router.include_router(portfolio.router, prefix="/portfolios", tags=["portfolios"])
router.include_router(user.router, prefix="/users", tags=["users"])
