from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import JSON
from datetime import datetime
import json
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to Portfolio (if needed)
    portfolios = relationship("Portfolio", back_populates="owner")


class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    location = Column(String)
    about = Column(String)
    education = Column(String) 
    work_experience = Column(String) 
    skills = Column(String) 
    interests = Column(String)
    certifications = Column(String) 
    github = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    twitter = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="portfolios")

    def serialize(self):
        if isinstance(self.education, list):
            self.education = json.dumps(self.education)
        if isinstance(self.work_experience, list):
            self.work_experience = json.dumps(self.work_experience)
        if isinstance(self.skills, list):
            self.skills = json.dumps(self.skills)
        if isinstance(self.certifications, list):
            self.certifications = json.dumps(self.certifications)

    def deserialize(self):
        if isinstance(self.education, str):
            self.education = json.loads(self.education)
        if isinstance(self.work_experience, str):
            self.work_experience = json.loads(self.work_experience)
        if isinstance(self.skills, str):
            self.skills = json.loads(self.skills)
        if isinstance(self.certifications, str):
            self.certifications = json.loads(self.certifications)