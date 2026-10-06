from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import (
    advance_tax,
    capital_gains,
    compound_interest,
    emi,
    fd,
    gratuity,
    home_loan,
    hra,
    itr_selector,
    mutual_fund,
    nps,
    ppf,
    recommendations,
    salary_optimizer,
    section_80c,
    section_80d,
    senior_citizen,
    sip,
    take_home_salary,
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
app.include_router(nps.router, prefix="/api/v1", tags=["NPS"])
app.include_router(home_loan.router, prefix="/api/v1", tags=["Home Loan"])
app.include_router(senior_citizen.router, prefix="/api/v1", tags=["Senior Citizen"])
app.include_router(take_home_salary.router, prefix="/api/v1", tags=["Take Home Salary"])
app.include_router(gratuity.router, prefix="/api/v1", tags=["Gratuity"])
app.include_router(ppf.router, prefix="/api/v1", tags=["PPF"])
app.include_router(sip.router, prefix="/api/v1", tags=["SIP"])
app.include_router(fd.router, prefix="/api/v1", tags=["FD"])
app.include_router(mutual_fund.router, prefix="/api/v1", tags=["Mutual Fund"])
app.include_router(emi.router, prefix="/api/v1", tags=["EMI"])
app.include_router(compound_interest.router, prefix="/api/v1", tags=["Compound Interest"])
app.include_router(section_80d.router, prefix="/api/v1", tags=["Section 80D"])
app.include_router(salary_optimizer.router, prefix="/api/v1", tags=["Salary Optimizer"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "doaide-taxfile"}
