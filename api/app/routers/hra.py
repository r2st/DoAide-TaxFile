from fastapi import APIRouter

from app.schemas.tax import HRARequest
from app.services.tax_engine import calculate_hra_exemption

router = APIRouter()


@router.post("/calculate-hra")
def calculate_hra(req: HRARequest):
    return calculate_hra_exemption(
        req.basic_salary,
        req.da,
        req.hra_received,
        req.rent_paid,
        req.city_type == "metro",
    )
