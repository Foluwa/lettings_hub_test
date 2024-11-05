from fastapi import APIRouter

router = APIRouter()

# Example route
@router.get("/test")
def test_user():
    return {"message": "User route is working!"}
