from fastapi import APIRouter

from app.schemas.tax import GratuityRequest
from app.services.tax_engine import calculate_gratuity

router = APIRouter()


@router.post("/calculate-gratuity")
def gratuity(req: GratuityRequest):
    return calculate_gratuity(req.last_drawn_salary, req.years_of_service, req.is_government)
