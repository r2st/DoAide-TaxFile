from fastapi import APIRouter

from app.schemas.tax import EPFRequest
from app.services.tax_engine import calculate_epf

router = APIRouter()


@router.post("/calculate-epf")
def epf(req: EPFRequest):
    return calculate_epf(
        req.basic_salary, req.employee_rate, req.employer_rate,
        req.current_balance, req.years_to_retire, req.interest_rate,
    )
