from fastapi import APIRouter

from app.schemas.tax import CompoundInterestRequest
from app.services.tax_engine import calculate_compound_interest

router = APIRouter()


@router.post("/calculate-compound-interest")
def compound_interest(req: CompoundInterestRequest):
    return calculate_compound_interest(req.principal, req.annual_rate, req.years, req.compounding_frequency)
