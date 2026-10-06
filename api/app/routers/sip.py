from fastapi import APIRouter

from app.schemas.tax import SIPRequest
from app.services.tax_engine import calculate_sip

router = APIRouter()


@router.post("/calculate-sip")
def sip(req: SIPRequest):
    return calculate_sip(req.monthly_amount, req.annual_return_rate, req.years, req.step_up_percent)
