from sqlalchemy.orm import Session
from app.db import models
from app.schemas.portfolio import PortfolioCreate, PortfolioUpdate
from datetime import datetime
import json
from pydantic import HttpUrl

def get_portfolio(db: Session):
    portfolio = db.query(models.Portfolio).first()
    if portfolio:
        portfolio.deserialize()  
    return portfolio

def create_or_update_portfolio(db: Session, portfolio_data: PortfolioCreate):
    db_portfolio = models.Portfolio(
        first_name=portfolio_data.first_name,
        last_name=portfolio_data.last_name,
        location=portfolio_data.location,
        about=portfolio_data.about,
        education=json.dumps([edu.dict() for edu in portfolio_data.education]),
        work_experience=json.dumps([exp.dict() for exp in portfolio_data.work_experience]),
        skills=json.dumps(portfolio_data.skills),
        interests=portfolio_data.interests,
        certifications=json.dumps([cert.dict() for cert in portfolio_data.certifications]),
        github=str(portfolio_data.github) if portfolio_data.github else None,
        linkedin=str(portfolio_data.linkedin) if portfolio_data.linkedin else None,
        twitter=str(portfolio_data.twitter) if portfolio_data.twitter else None
    )

    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    db_portfolio.deserialize() 
    return db_portfolio

# def update_portfolio(db: Session, portfolio_data: PortfolioUpdate):
#     db_portfolio = get_portfolio(db)
#     if not db_portfolio:
#         return None

#     for field, value in portfolio_data.dict(exclude_unset=True).items():
#         if field in ["education", "work_experience", "certifications"]:
#             if value and isinstance(value, list):
#                 value = json.dumps([item.dict() if hasattr(item, "dict") else item for item in value])
#         elif field == "skills":
#             value = json.dumps(value)  
#         elif isinstance(value, HttpUrl):
#             value = str(value)
#         setattr(db_portfolio, field, value)

#     db_portfolio.updated_at = datetime.utcnow()
#     db.commit()
#     db.refresh(db_portfolio)
#     db_portfolio.deserialize()  
#     return db_portfolio

def update_portfolio(db: Session, portfolio_data: PortfolioUpdate):
    db_portfolio = get_portfolio(db)
    if not db_portfolio:
        return None
    
    print(portfolio_data.dict(exclude_unset=True))
    print('portfolio_data: ', portfolio_data)

    for field, value in portfolio_data.dict(exclude_unset=True).items():
        if field in ["education", "work_experience", "certifications"]:
            if value and isinstance(value, list):
                value = json.dumps([item.dict() if hasattr(item, "dict") else item for item in value])
        elif field == "skills":
            value = json.dumps(value)  
        elif field in ["github", "linkedin", "twitter"] and value is not None:
            # Convert URL fields to strings
            value = str(value)
        setattr(db_portfolio, field, value)

    db_portfolio.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_portfolio)
    db_portfolio.deserialize()  
    return db_portfolio