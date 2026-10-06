from fastapi import APIRouter

from app.schemas.tax import SeniorCitizenRequest
from app.services.tax_engine import calculate_senior_citizen_tax

router = APIRouter()


@router.post("/senior-citizen-tax")
def senior_citizen_tax(req: SeniorCitizenRequest):
    return calculate_senior_citizen_tax(
        gross_income=req.gross_income,
        age=req.age,
        section_80c=req.section_80c,
        section_80d=req.section_80d,
        section_80d_parents=req.section_80d_parents,
        section_80ttb=req.section_80ttb,
        home_loan_interest=req.home_loan_interest,
        nps_80ccd_1b=req.nps_80ccd_1b,
        other_deductions=req.other_deductions,
    )
