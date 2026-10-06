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
