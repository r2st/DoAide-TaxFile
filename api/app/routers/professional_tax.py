from fastapi import APIRouter

from app.schemas.tax import ProfessionalTaxRequest
from app.services.tax_engine import calculate_professional_tax

router = APIRouter()


@router.post("/calculate-professional-tax")
def professional_tax(req: ProfessionalTaxRequest):
    return calculate_professional_tax(req.monthly_salary, req.state)
