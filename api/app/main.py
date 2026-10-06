from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import (
    advance_tax,
    capital_gains,
    hra,
    itr_selector,
    recommendations,
    section_80c,
    tax_calculator,
    tds,
)

app = FastAPI(
    title="DoAide TaxFile API",
    description="Free Income Tax Return Filing Assistant for India — FY 2026-27",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tax_calculator.router, prefix="/api/v1", tags=["Tax Calculator"])
app.include_router(hra.router, prefix="/api/v1", tags=["HRA"])
app.include_router(itr_selector.router, prefix="/api/v1", tags=["ITR Selector"])
app.include_router(section_80c.router, prefix="/api/v1", tags=["Section 80C"])
app.include_router(capital_gains.router, prefix="/api/v1", tags=["Capital Gains"])
app.include_router(tds.router, prefix="/api/v1", tags=["TDS"])
app.include_router(advance_tax.router, prefix="/api/v1", tags=["Advance Tax"])
app.include_router(recommendations.router, prefix="/api/v1", tags=["Recommendations"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "doaide-taxfile"}
