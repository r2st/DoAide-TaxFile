from fastapi import APIRouter

from app.schemas.tax import RefundRequest
from app.services.tax_engine import calculate_refund

router = APIRouter()


@router.post("/calculate-refund")
def refund(req: RefundRequest):
    return calculate_refund(
        req.total_income, req.tds_deducted, req.advance_tax_paid,
        req.self_assessment_tax, req.regime,
    )
