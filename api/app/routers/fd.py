from fastapi import APIRouter

from app.schemas.tax import FDRequest
from app.services.tax_engine import calculate_fd

router = APIRouter()


@router.post("/calculate-fd")
def fd(req: FDRequest):
    return calculate_fd(req.principal, req.annual_rate, req.tenure_years, req.compounding_frequency, req.is_senior)
