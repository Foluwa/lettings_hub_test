from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import SessionLocal
from app.schemas.portfolio import PortfolioCreate, PortfolioUpdate, PortfolioResponse
from app.services.portfolio_service import create_or_update_portfolio, get_portfolio, update_portfolio

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PortfolioResponse)
def create_portfolio_route(portfolio: PortfolioCreate, db: Session = Depends(get_db)):
    existing_portfolio = get_portfolio(db)
    if existing_portfolio:
        raise HTTPException(status_code=400, detail="Portfolio already exists. Use PUT to update.")
    return create_or_update_portfolio(db, portfolio)

@router.get("/", response_model=PortfolioResponse)
def read_portfolio(db: Session = Depends(get_db)):
    portfolio = get_portfolio(db)
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio

@router.put("/", response_model=PortfolioResponse)
def update_portfolio_route(portfolio: PortfolioUpdate, db: Session = Depends(get_db)):
    existing_portfolio = get_portfolio(db)
    if not existing_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found. Use POST to create.")
    return update_portfolio(db, portfolio)
