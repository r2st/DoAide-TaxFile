from fastapi import APIRouter

from app.schemas.tax import Section80CRequest
from app.services.tax_engine import plan_80c

router = APIRouter()


@router.post("/plan-80c")
def plan_section_80c(req: Section80CRequest):
    investments = req.model_dump()
    return plan_80c(investments)
