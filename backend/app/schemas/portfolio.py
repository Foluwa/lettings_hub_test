from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime
from urllib.parse import urlparse

class Education(BaseModel):
    school_name: str
    degree_name: str
    year: int
    gpa: float  

class WorkExperience(BaseModel):
    role: str
    company_name: str
    description: str
    duration: str

class Certification(BaseModel):
    name: str
    url: Optional[str] = None

    @validator('url', pre=True, always=True)
    def validate_url(cls, value):
        if value:
            parsed_url = urlparse(value)
            if not all([parsed_url.scheme, parsed_url.netloc]):
                raise ValueError("Invalid URL format")
        return value

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
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None

    @validator("github", "linkedin", "twitter", pre=True, always=True)
    def validate_social_url(cls, value):
        if value:
            parsed_url = urlparse(value)
            if not all([parsed_url.scheme, parsed_url.netloc]):
                raise ValueError("Invalid URL format")
        return value

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
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None

    @validator("github", "linkedin", "twitter", pre=True, always=True)
    def validate_social_url(cls, value):
        if value:
            parsed_url = urlparse(value)
            if not all([parsed_url.scheme, parsed_url.netloc]):
                raise ValueError("Invalid URL format")
        return value

class PortfolioResponse(PortfolioBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
