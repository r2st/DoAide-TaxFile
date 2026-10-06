from fastapi import APIRouter

from app.schemas.tax import TakeHomeSalaryRequest
from app.services.tax_engine import calculate_take_home_salary

router = APIRouter()


@router.post("/calculate-take-home-salary")
def take_home_salary(req: TakeHomeSalaryRequest):
    return calculate_take_home_salary(req.ctc, req.is_metro, req.pf_contribution_rate)
