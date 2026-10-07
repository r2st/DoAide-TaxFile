from fastapi import APIRouter

from app.schemas.tax import TaxLossHarvestingRequest
from app.services.tax_engine import calculate_tax_loss_harvesting

router = APIRouter()


@router.post("/calculate-tax-loss-harvesting")
def tax_loss_harvesting(req: TaxLossHarvestingRequest):
    return calculate_tax_loss_harvesting(req.gains, req.losses, req.gain_type)
