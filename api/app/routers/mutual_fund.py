from fastapi import APIRouter

from app.schemas.tax import MutualFundRequest
from app.services.tax_engine import calculate_mutual_fund

router = APIRouter()


@router.post("/calculate-mutual-fund")
def mutual_fund(req: MutualFundRequest):
    return calculate_mutual_fund(req.investment_type, req.amount, req.annual_return_rate, req.years)
