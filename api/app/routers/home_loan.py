from fastapi import APIRouter

from app.schemas.tax import HomeLoanRequest
from app.services.tax_engine import calculate_home_loan_benefit

router = APIRouter()


@router.post("/home-loan-benefit")
def home_loan_benefit(req: HomeLoanRequest):
    return calculate_home_loan_benefit(
        principal_per_year=req.principal_per_year,
        interest_per_year=req.interest_per_year,
        loan_amount=req.loan_amount,
        is_let_out=req.is_let_out,
        is_first_time_buyer=req.is_first_time_buyer,
        property_value=req.property_value,
    )
