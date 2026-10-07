from fastapi import APIRouter

from app.schemas.tax import ELSSComparisonRequest
from app.services.tax_engine import compare_elss_vs_ppf_vs_fd

router = APIRouter()


@router.post("/compare-elss-ppf-fd")
def elss_comparison(req: ELSSComparisonRequest):
    return compare_elss_vs_ppf_vs_fd(
        req.annual_investment, req.years, req.tax_slab,
        req.fd_rate, req.elss_return, req.ppf_rate,
    )
