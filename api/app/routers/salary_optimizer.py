from fastapi import APIRouter

from app.schemas.tax import SalaryOptimizerRequest
from app.services.tax_engine import calculate_salary_optimizer

router = APIRouter()


@router.post("/optimize-salary")
def salary_optimizer(req: SalaryOptimizerRequest):
    return calculate_salary_optimizer(req.ctc)
