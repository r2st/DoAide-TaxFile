from fastapi import APIRouter

from app.schemas.tax import CapitalGainsRequest
from app.services.tax_engine import calculate_capital_gains

router = APIRouter()


@router.post("/calculate-capital-gains")
def calc_capital_gains(req: CapitalGainsRequest):
    return calculate_capital_gains(
        req.asset_type,
        req.purchase_price,
        req.sale_price,
        req.holding_months,
    )
