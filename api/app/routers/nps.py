from fastapi import APIRouter

from app.schemas.tax import NPSRequest
from app.services.tax_engine import calculate_nps_benefit

router = APIRouter()


@router.post("/nps-benefit")
def nps_benefit(req: NPSRequest):
    return calculate_nps_benefit(
        annual_contribution=req.annual_contribution,
        employer_contribution=req.employer_contribution,
        gross_income=req.gross_income,
        age=req.age,
    )
