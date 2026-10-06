from fastapi import APIRouter

from app.schemas.tax import TDSRequest
from app.services.tax_engine import calculate_tds

router = APIRouter()


@router.post("/calculate-tds")
def calc_tds(req: TDSRequest):
    return calculate_tds(req.income_type, req.amount, req.has_pan)
