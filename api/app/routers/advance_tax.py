from fastapi import APIRouter

from app.schemas.tax import AdvanceTaxRequest
from app.services.tax_engine import calculate_advance_tax

router = APIRouter()


@router.post("/calculate-advance-tax")
def calc_advance_tax(req: AdvanceTaxRequest):
    return calculate_advance_tax(req.total_tax, req.tds_deducted)
