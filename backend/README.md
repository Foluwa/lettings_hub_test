# Backend Docs

## Demo

The stack is FastAPI for the API, Pydantic for data validation, and SQLAlchemy for ORM interactions with an SQLite database. 

## To Run
- Ensure you are in the backend directory, 
- Then `pip install -r requirements.txt`
- To Start `uvicorn app.main:app --reload`

## Folder Dicrectory
- `app/`
  - `main.py`               # Entry point
  - `api/`
    - `__init__.py`
    - `v1/`                 # Versioned API routes
      - `routes/`
        - `user.py`         # User routes
        - `portfolio.py`    # Portfolio CRUD routes
      - `api.py`            # Aggregates all routes
  - `core/`
    - `config.py`           # Configuration settings
    - `security.py`         # JWT token generation and validation
  - `db/`
    - `base.py`             # Base database connection
    - `models.py`           # Database models
    - `init_db.py`          # Database initialization or seeding
  - `services/`
    - `user_service.py`     # Logic for users
    - `portfolio_service.py`# Logic for portfolio
  - `schemas/`
    - `user.py`             # Schema for admin users
    - `portfolio.py`        # Schema for portfolio
- `requirements.txt`
- `.env.sample`

