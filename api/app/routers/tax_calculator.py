from fastapi import APIRouter

from app.schemas.tax import TaxCalculatorRequest
from app.services.tax_engine import calculate_hra_exemption, calculate_new_regime, calculate_old_regime

router = APIRouter()


@router.post("/calculate-tax")
def calculate_tax(req: TaxCalculatorRequest):
    gross = req.gross_salary + req.other_income
    is_metro = req.city_type == "metro"

    hra_exempt = 0.0
    if req.hra_received > 0 and req.rent_paid > 0:
        hra_result = calculate_hra_exemption(
            req.basic_salary, req.da, req.hra_received, req.rent_paid, is_metro
        )
        hra_exempt = hra_result["exemption"]

    new = calculate_new_regime(gross)
    old = calculate_old_regime(
        gross,
        hra_exemption=hra_exempt,
        section_80c=req.section_80c,
        section_80d=req.section_80d,
        home_loan_interest=req.home_loan_interest,
        nps_80ccd_1b=req.nps_80ccd_1b,
        other_deductions=req.other_deductions,
    )

    better = "new" if new["total_tax"] <= old["total_tax"] else "old"
    savings = abs(new["total_tax"] - old["total_tax"])

    return {
        "new_regime": new,
        "old_regime": old,
        "recommended": better,
        "savings": savings,
        "fy": "2026-27",
        "ay": "2027-28",
    }
