from fastapi import APIRouter

from app.schemas.tax import EMIRequest
from app.services.tax_engine import calculate_emi

router = APIRouter()


@router.post("/calculate-emi")
def emi(req: EMIRequest):
    return calculate_emi(req.loan_amount, req.annual_rate, req.tenure_years)
