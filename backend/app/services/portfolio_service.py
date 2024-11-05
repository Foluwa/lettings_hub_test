from sqlalchemy.orm import Session
from app.db import models
from app.schemas.portfolio import PortfolioCreate, PortfolioUpdate 
from datetime import datetime

def get_portfolio(db: Session):
    # Retrieve the single portfolio record
    return db.query(models.Portfolio).first()

def create_or_update_portfolio(db: Session, portfolio_data: PortfolioCreate):
    db_portfolio = get_portfolio(db)
    if db_portfolio:
        # Update existing portfolio
        for key, value in portfolio_data.dict(exclude_unset=True).items():
            setattr(db_portfolio, key, value)
        db_portfolio.updated_at = datetime.utcnow()
    else:
        # Create a new portfolio
        db_portfolio = models.Portfolio(**portfolio_data.dict())
        db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio

def update_portfolio(db: Session, portfolio_data: PortfolioUpdate):
    db_portfolio = get_portfolio(db)
    for key, value in portfolio_data.dict(exclude_unset=True).items():
        setattr(db_portfolio, key, value)
    db_portfolio.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio