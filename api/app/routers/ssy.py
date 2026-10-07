from fastapi import APIRouter

from app.schemas.tax import SSYRequest
from app.services.tax_engine import calculate_ssy

router = APIRouter()


@router.post("/calculate-ssy")
def ssy(req: SSYRequest):
    return calculate_ssy(req.annual_investment, req.existing_balance, req.girl_age, req.interest_rate)
