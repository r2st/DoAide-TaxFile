from fastapi import APIRouter

from app.schemas.tax import Section80DRequest
from app.services.tax_engine import calculate_section_80d

router = APIRouter()


@router.post("/calculate-80d")
def section_80d(req: Section80DRequest):
    return calculate_section_80d(
        req.self_premium,
        req.spouse_premium,
        req.children_premium,
        req.parents_premium,
        req.is_self_senior,
        req.is_parents_senior,
        req.preventive_checkup,
    )
