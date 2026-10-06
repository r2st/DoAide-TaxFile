from fastapi import APIRouter

from app.schemas.tax import PPFRequest
from app.services.tax_engine import calculate_ppf

router = APIRouter()


@router.post("/calculate-ppf")
def ppf(req: PPFRequest):
    return calculate_ppf(req.annual_investment, req.existing_balance, req.years_remaining, req.interest_rate)
