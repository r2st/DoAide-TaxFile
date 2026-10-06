from fastapi import APIRouter

from app.schemas.tax import RecommendationsRequest
from app.services.tax_engine import generate_recommendations

router = APIRouter()


@router.post("/tax-recommendations")
def get_recommendations(req: RecommendationsRequest):
    return generate_recommendations(
        req.gross_income,
        req.age,
        existing_80c=req.existing_80c,
        existing_80d=req.existing_80d,
        existing_hra_exemption=req.existing_hra_exemption,
        existing_home_loan=req.existing_home_loan,
        existing_nps=req.existing_nps,
    )
