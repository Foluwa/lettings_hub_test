from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.types import JSON
from datetime import datetime
from app.db.base import Base

class Portfolio(Base):
    __tablename__ = "portfolio"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    location = Column(String)
    about = Column(String)
    education = Column(JSON)  # Stores list of education details
    work_experience = Column(JSON)  # Stores list of work experience
    skills = Column(JSON)  # Stores list of skills
    interests = Column(String)  # Can be formatted as HTML for WYSIWYG support
    certifications = Column(JSON)  # Stores list of certifications
    github = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    twitter = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
