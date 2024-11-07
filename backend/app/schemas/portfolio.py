from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional
from datetime import datetime

class Education(BaseModel):
    school_name: str
    degree_name: str
    year: int
    gpa: float #Optional[float] = None

class WorkExperience(BaseModel):
    role: str
    company_name: str
    description: str
    duration: str

class Certification(BaseModel):
    name: str
    url: Optional[HttpUrl] = None

class PortfolioBase(BaseModel):
    first_name: str
    last_name: str
    location: str
    about: str
    education: List[Education]
    work_experience: List[WorkExperience]
    skills: List[str]
    interests: str
    certifications: List[Certification]
    github: Optional[HttpUrl] = None
    linkedin: Optional[HttpUrl] = None
    twitter: Optional[HttpUrl] = None

class PortfolioCreate(PortfolioBase):
    pass

class PortfolioUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    location: Optional[str] = None
    about: Optional[str] = None
    education: Optional[List[Education]] = None
    work_experience: Optional[List[WorkExperience]] = None
    skills: Optional[List[str]] = None
    interests: Optional[str] = None
    certifications: Optional[List[Certification]] = None
    github: Optional[HttpUrl] = None
    linkedin: Optional[HttpUrl] = None
    twitter: Optional[HttpUrl] = None

class PortfolioResponse(PortfolioBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
