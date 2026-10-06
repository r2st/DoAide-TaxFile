from fastapi import APIRouter

from app.schemas.tax import ITRSelectorRequest
from app.services.tax_engine import select_itr_form

router = APIRouter()


@router.post("/select-itr")
def select_itr(req: ITRSelectorRequest):
    return select_itr_form(
        has_salary=req.has_salary,
        has_business_income=req.has_business_income,
        has_capital_gains=req.has_capital_gains,
        has_foreign_assets=req.has_foreign_assets,
        has_crypto_income=req.has_crypto_income,
        total_income=req.total_income,
        house_properties=req.house_properties,
        is_presumptive_tax=req.is_presumptive_tax,
        is_director=req.is_director,
        has_unlisted_shares=req.has_unlisted_shares,
    )
