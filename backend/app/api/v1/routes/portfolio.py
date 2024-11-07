from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.base import SessionLocal
from app.schemas.portfolio import PortfolioCreate, PortfolioUpdate, PortfolioResponse
from app.services.portfolio_service import create_or_update_portfolio, get_portfolio, update_portfolio
from app.api.v1.routes.user import get_current_user 
from app.db import models

router = APIRouter()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create portfolio (protected)
@router.post("/", response_model=PortfolioResponse, status_code=status.HTTP_201_CREATED)
def create_portfolio_route(
    portfolio: PortfolioCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user) 
):
    existing_portfolio = get_portfolio(db)
    if existing_portfolio:
        raise HTTPException(status_code=400, detail="Portfolio already exists. Use PUT to update.")
    return create_or_update_portfolio(db, portfolio)

# Get portfolio (public)
@router.get("/", response_model=PortfolioResponse)
def read_portfolio(db: Session = Depends(get_db)):
    portfolio = get_portfolio(db)
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio

# Update portfolio (protected)
@router.put("/", response_model=PortfolioResponse)
def update_portfolio_route(
    portfolio: PortfolioUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)  
):
    existing_portfolio = get_portfolio(db)
    if not existing_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found. Use POST to create.")
    return update_portfolio(db, portfolio)
