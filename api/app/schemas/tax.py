from __future__ import annotations

from pydantic import BaseModel, Field


class TaxCalculatorRequest(BaseModel):
    gross_salary: float = Field(ge=0)
    basic_salary: float = Field(default=0, ge=0)
    da: float = Field(default=0, ge=0)
    hra_received: float = Field(default=0, ge=0)
    rent_paid: float = Field(default=0, ge=0)
    city_type: str = Field(default="non_metro", pattern="^(metro|non_metro)$")
    section_80c: float = Field(default=0, ge=0)
    section_80d: float = Field(default=0, ge=0)
    home_loan_interest: float = Field(default=0, ge=0)
    nps_80ccd_1b: float = Field(default=0, ge=0)
    other_deductions: float = Field(default=0, ge=0)
    other_income: float = Field(default=0, ge=0)


class HRARequest(BaseModel):
    basic_salary: float = Field(ge=0)
    da: float = Field(default=0, ge=0)
    hra_received: float = Field(ge=0)
    rent_paid: float = Field(ge=0)
    city_type: str = Field(default="non_metro", pattern="^(metro|non_metro)$")


class ITRSelectorRequest(BaseModel):
    has_salary: bool = True
    has_business_income: bool = False
    has_capital_gains: bool = False
    has_foreign_assets: bool = False
    has_crypto_income: bool = False
    total_income: float = Field(default=0, ge=0)
    house_properties: int = Field(default=1, ge=0)
    is_presumptive_tax: bool = False
    is_director: bool = False
    has_unlisted_shares: bool = False


class Section80CRequest(BaseModel):
    ppf: float = Field(default=0, ge=0)
    elss: float = Field(default=0, ge=0)
    nsc: float = Field(default=0, ge=0)
    tax_saver_fd: float = Field(default=0, ge=0)
    lic: float = Field(default=0, ge=0)
    tuition_fees: float = Field(default=0, ge=0)
    home_loan_principal: float = Field(default=0, ge=0)
    scss: float = Field(default=0, ge=0)
    sukanya: float = Field(default=0, ge=0)
    other: float = Field(default=0, ge=0)
    nps_80ccd_1b: float = Field(default=0, ge=0)


class CapitalGainsRequest(BaseModel):
    asset_type: str = Field(pattern="^(equity|debt|real_estate|gold|crypto)$")
    purchase_price: float = Field(ge=0)
    sale_price: float = Field(ge=0)
    holding_months: int = Field(ge=0)


class TDSRequest(BaseModel):
    income_type: str
    amount: float = Field(ge=0)
    has_pan: bool = True


class AdvanceTaxRequest(BaseModel):
    total_tax: float = Field(ge=0)
    tds_deducted: float = Field(default=0, ge=0)


class RecommendationsRequest(BaseModel):
    gross_income: float = Field(ge=0)
    age: int = Field(default=30, ge=18, le=100)
    existing_80c: float = Field(default=0, ge=0)
    existing_80d: float = Field(default=0, ge=0)
    existing_hra_exemption: float = Field(default=0, ge=0)
    existing_home_loan: float = Field(default=0, ge=0)
    existing_nps: float = Field(default=0, ge=0)


class NPSRequest(BaseModel):
    annual_contribution: float = Field(ge=0)
    employer_contribution: float = Field(default=0, ge=0)
    gross_income: float = Field(default=0, ge=0)
    age: int = Field(default=30, ge=18, le=100)


class HomeLoanRequest(BaseModel):
    principal_per_year: float = Field(ge=0)
    interest_per_year: float = Field(ge=0)
    loan_amount: float = Field(ge=0)
    is_let_out: bool = False
    is_first_time_buyer: bool = False
    property_value: float = Field(default=0, ge=0)


class SeniorCitizenRequest(BaseModel):
    gross_income: float = Field(ge=0)
    age: int = Field(ge=60, le=120)
    section_80c: float = Field(default=0, ge=0)
    section_80d: float = Field(default=0, ge=0)
    section_80d_parents: float = Field(default=0, ge=0)
    section_80ttb: float = Field(default=0, ge=0)
    home_loan_interest: float = Field(default=0, ge=0)
    nps_80ccd_1b: float = Field(default=0, ge=0)
    other_deductions: float = Field(default=0, ge=0)


class TakeHomeSalaryRequest(BaseModel):
    ctc: float = Field(ge=0)
    is_metro: bool = False
    pf_contribution_rate: float = Field(default=0.12, ge=0, le=1)


class GratuityRequest(BaseModel):
    last_drawn_salary: float = Field(ge=0)
    years_of_service: float = Field(ge=0)
    is_government: bool = False


class PPFRequest(BaseModel):
    annual_investment: float = Field(ge=0, le=150000)
    existing_balance: float = Field(default=0, ge=0)
    years_remaining: int = Field(default=15, ge=1, le=50)
    interest_rate: float = Field(default=7.1, ge=0, le=20)


class SIPRequest(BaseModel):
    monthly_amount: float = Field(ge=0)
    annual_return_rate: float = Field(ge=0, le=50)
    years: int = Field(ge=1, le=50)
    step_up_percent: float = Field(default=0, ge=0, le=100)


class FDRequest(BaseModel):
    principal: float = Field(ge=0)
    annual_rate: float = Field(ge=0, le=20)
    tenure_years: float = Field(ge=0)
    compounding_frequency: int = Field(default=4, ge=1, le=365)
    is_senior: bool = False


class MutualFundRequest(BaseModel):
    investment_type: str = Field(pattern="^(sip|lumpsum)$")
    amount: float = Field(ge=0)
    annual_return_rate: float = Field(ge=0, le=50)
    years: int = Field(ge=1, le=50)


class EMIRequest(BaseModel):
    loan_amount: float = Field(ge=0)
    annual_rate: float = Field(ge=0, le=50)
    tenure_years: int = Field(ge=1, le=50)


class CompoundInterestRequest(BaseModel):
    principal: float = Field(ge=0)
    annual_rate: float = Field(ge=0, le=100)
    years: int = Field(ge=1, le=100)
    compounding_frequency: int = Field(default=1, ge=1, le=365)


class Section80DRequest(BaseModel):
    self_premium: float = Field(default=0, ge=0)
    spouse_premium: float = Field(default=0, ge=0)
    children_premium: float = Field(default=0, ge=0)
    parents_premium: float = Field(default=0, ge=0)
    is_self_senior: bool = False
    is_parents_senior: bool = False
    preventive_checkup: float = Field(default=0, ge=0)


class SalaryOptimizerRequest(BaseModel):
    ctc: float = Field(ge=0)


class SSYRequest(BaseModel):
    annual_investment: float = Field(ge=0, le=250000)
    existing_balance: float = Field(default=0, ge=0)
    girl_age: int = Field(default=1, ge=0, le=10)
    interest_rate: float = Field(default=8.2, ge=0, le=20)


class EPFRequest(BaseModel):
    basic_salary: float = Field(ge=0)
    employee_rate: float = Field(default=0.12, ge=0, le=1)
    employer_rate: float = Field(default=0.12, ge=0, le=1)
    current_balance: float = Field(default=0, ge=0)
    years_to_retire: int = Field(default=25, ge=1, le=50)
    interest_rate: float = Field(default=8.25, ge=0, le=20)


class ELSSComparisonRequest(BaseModel):
    annual_investment: float = Field(ge=0)
    years: int = Field(default=10, ge=1, le=50)
    tax_slab: float = Field(default=0.30, ge=0, le=0.42)
    fd_rate: float = Field(default=7.0, ge=0, le=20)
    elss_return: float = Field(default=12.0, ge=0, le=50)
    ppf_rate: float = Field(default=7.1, ge=0, le=20)


class TaxLossHarvestingRequest(BaseModel):
    gains: float = Field(ge=0)
    losses: float = Field(ge=0)
    gain_type: str = Field(default="ltcg", pattern="^(ltcg|stcg)$")


class RefundRequest(BaseModel):
    total_income: float = Field(ge=0)
    tds_deducted: float = Field(default=0, ge=0)
    advance_tax_paid: float = Field(default=0, ge=0)
    self_assessment_tax: float = Field(default=0, ge=0)
    regime: str = Field(default="new", pattern="^(new|old)$")


class ProfessionalTaxRequest(BaseModel):
    monthly_salary: float = Field(ge=0)
    state: str = Field(default="maharashtra")
