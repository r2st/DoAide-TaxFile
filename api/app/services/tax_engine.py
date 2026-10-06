"""Core tax calculation engine for FY 2026-27 (AY 2027-28)."""

from __future__ import annotations

NEW_REGIME_SLABS = [
    (400_000, 0.00),
    (800_000, 0.05),
    (1_200_000, 0.10),
    (1_600_000, 0.15),
    (2_000_000, 0.20),
    (2_400_000, 0.25),
    (float("inf"), 0.30),
]

OLD_REGIME_SLABS = [
    (250_000, 0.00),
    (500_000, 0.05),
    (1_000_000, 0.20),
    (float("inf"), 0.30),
]

SURCHARGE_SLABS = [
    (5_000_000, 0.00),
    (10_000_000, 0.10),
    (20_000_000, 0.15),
    (50_000_000, 0.25),
    (float("inf"), 0.37),
]

NEW_REGIME_STANDARD_DEDUCTION = 75_000
OLD_REGIME_STANDARD_DEDUCTION = 50_000
CESS_RATE = 0.04
SECTION_80C_LIMIT = 150_000
SECTION_80CCD_1B_LIMIT = 50_000
SECTION_80D_LIMIT_SELF = 25_000
SECTION_80D_LIMIT_SENIOR = 50_000
SECTION_80D_LIMIT_PARENTS = 25_000
SECTION_80D_LIMIT_PARENTS_SENIOR = 50_000


def _apply_slabs(taxable: float, slabs: list[tuple[float, float]]) -> tuple[float, list[dict]]:
    tax = 0.0
    prev = 0
    breakdown = []
    for limit, rate in slabs:
        if taxable <= prev:
            break
        chunk = min(taxable, limit) - prev
        slab_tax = chunk * rate
        tax += slab_tax
        breakdown.append({
            "from": prev,
            "to": min(taxable, limit),
            "rate": rate,
            "tax": round(slab_tax),
        })
        prev = limit
    return round(tax), breakdown


def _surcharge(tax: float, total_income: float) -> float:
    for limit, rate in SURCHARGE_SLABS:
        if total_income <= limit:
            return round(tax * rate)
    return round(tax * 0.37)


def calculate_new_regime(gross_income: float) -> dict:
    standard_deduction = min(NEW_REGIME_STANDARD_DEDUCTION, gross_income)
    taxable = max(gross_income - standard_deduction, 0)
    tax, slab_breakdown = _apply_slabs(taxable, NEW_REGIME_SLABS)

    rebate_87a = 0
    if taxable <= 1_200_000:
        rebate_87a = min(tax, 60_000)
    tax_after_rebate = max(tax - rebate_87a, 0)

    surcharge = _surcharge(tax_after_rebate, gross_income)
    tax_plus_surcharge = tax_after_rebate + surcharge
    cess = round(tax_plus_surcharge * CESS_RATE)
    total = tax_plus_surcharge + cess

    return {
        "regime": "new",
        "gross_income": round(gross_income),
        "standard_deduction": standard_deduction,
        "deductions_total": standard_deduction,
        "taxable_income": round(taxable),
        "tax_on_income": tax,
        "slab_breakdown": slab_breakdown,
        "rebate_87a": rebate_87a,
        "tax_after_rebate": tax_after_rebate,
        "surcharge": surcharge,
        "cess": cess,
        "total_tax": total,
    }


def calculate_old_regime(
    gross_income: float,
    hra_exemption: float = 0,
    section_80c: float = 0,
    section_80d: float = 0,
    home_loan_interest: float = 0,
    nps_80ccd_1b: float = 0,
    other_deductions: float = 0,
) -> dict:
    standard_deduction = min(OLD_REGIME_STANDARD_DEDUCTION, gross_income)
    capped_80c = min(section_80c, SECTION_80C_LIMIT)
    capped_80ccd = min(nps_80ccd_1b, SECTION_80CCD_1B_LIMIT)
    capped_home_loan = min(home_loan_interest, 200_000)

    total_deductions = (
        standard_deduction
        + hra_exemption
        + capped_80c
        + section_80d
        + capped_home_loan
        + capped_80ccd
        + other_deductions
    )
    taxable = max(gross_income - total_deductions, 0)
    tax, slab_breakdown = _apply_slabs(taxable, OLD_REGIME_SLABS)

    rebate_87a = 0
    if taxable <= 500_000:
        rebate_87a = min(tax, 12_500)
    tax_after_rebate = max(tax - rebate_87a, 0)

    surcharge = _surcharge(tax_after_rebate, gross_income)
    tax_plus_surcharge = tax_after_rebate + surcharge
    cess = round(tax_plus_surcharge * CESS_RATE)
    total = tax_plus_surcharge + cess

    return {
        "regime": "old",
        "gross_income": round(gross_income),
        "standard_deduction": standard_deduction,
        "hra_exemption": round(hra_exemption),
        "section_80c": capped_80c,
        "section_80d": round(section_80d),
        "home_loan_interest": capped_home_loan,
        "nps_80ccd_1b": capped_80ccd,
        "other_deductions": round(other_deductions),
        "deductions_total": round(total_deductions),
        "taxable_income": round(taxable),
        "tax_on_income": tax,
        "slab_breakdown": slab_breakdown,
        "rebate_87a": rebate_87a,
        "tax_after_rebate": tax_after_rebate,
        "surcharge": surcharge,
        "cess": cess,
        "total_tax": total,
    }


def calculate_hra_exemption(
    basic_salary: float,
    da: float,
    hra_received: float,
    rent_paid: float,
    is_metro: bool,
) -> dict:
    salary = basic_salary + da
    metro_pct = 0.50 if is_metro else 0.40
    component_1 = hra_received
    component_2 = metro_pct * salary
    component_3 = max(rent_paid - 0.10 * salary, 0)
    exemption = max(min(component_1, component_2, component_3), 0)
    return {
        "actual_hra": round(hra_received),
        "percent_of_salary": round(component_2),
        "rent_minus_10pct": round(component_3),
        "exemption": round(exemption),
        "taxable_hra": round(max(hra_received - exemption, 0)),
    }


def select_itr_form(
    has_salary: bool = False,  # noqa: ARG001
    has_business_income: bool = False,
    has_capital_gains: bool = False,
    has_foreign_assets: bool = False,
    has_crypto_income: bool = False,
    total_income: float = 0,
    house_properties: int = 0,
    is_presumptive_tax: bool = False,
    is_director: bool = False,
    has_unlisted_shares: bool = False,
) -> dict:
    if has_business_income:
        if is_presumptive_tax and total_income <= 5_000_000:
            return {
                "form": "ITR-4",
                "name": "Sugam",
                "reason": "Presumptive taxation under Section 44AD/44ADA/44AE with total income up to ₹50 lakh.",
                "deadline": "July 31, 2027",
            }
        return {
            "form": "ITR-3",
            "name": "For Business/Profession",
            "reason": "You have business or professional income not eligible for presumptive taxation.",
            "deadline": "July 31, 2027 (October 31 if audit required)",
        }

    needs_itr2 = (
        has_capital_gains
        or has_foreign_assets
        or has_crypto_income
        or total_income > 5_000_000
        or house_properties > 2  # noqa: PLR2004
        or is_director
        or has_unlisted_shares
    )
    if needs_itr2:
        reasons = []
        if has_capital_gains:
            reasons.append("capital gains income")
        if has_foreign_assets:
            reasons.append("foreign assets or income")
        if has_crypto_income:
            reasons.append("crypto/VDA income")
        if total_income > 5_000_000:
            reasons.append("total income exceeds ₹50 lakh")
        if house_properties > 2:  # noqa: PLR2004
            reasons.append("more than 2 house properties")
        if is_director:
            reasons.append("director in a company")
        if has_unlisted_shares:
            reasons.append("holds unlisted equity shares")
        return {
            "form": "ITR-2",
            "name": "For Individuals without Business Income",
            "reason": f"You have {', '.join(reasons)}.",
            "deadline": "July 31, 2027",
        }

    return {
        "form": "ITR-1",
        "name": "Sahaj",
        "reason": "Salaried individual with income up to ₹50 lakh, up to 2 house properties, and no capital gains.",
        "deadline": "July 31, 2027",
    }


INVESTMENT_OPTIONS_80C = [
    {"name": "PPF", "returns": "7.1%", "lock_in": "15 years", "risk": "Low", "max": 150_000},
    {"name": "ELSS Mutual Funds", "returns": "~12% (market-linked)", "lock_in": "3 years", "risk": "High", "max": 150_000},
    {"name": "NSC", "returns": "7.7%", "lock_in": "5 years", "risk": "Low", "max": 150_000},
    {"name": "Tax Saver FD", "returns": "6.5-7.5%", "lock_in": "5 years", "risk": "Low", "max": 150_000},
    {"name": "SCSS", "returns": "8.2%", "lock_in": "5 years", "risk": "Low", "max": 150_000},
    {"name": "Sukanya Samriddhi", "returns": "8.2%", "lock_in": "21 years", "risk": "Low", "max": 150_000},
    {"name": "LIC Premium", "returns": "~5-6%", "lock_in": "Varies", "risk": "Low", "max": 150_000},
    {"name": "Home Loan Principal", "returns": "N/A", "lock_in": "N/A", "risk": "N/A", "max": 150_000},
    {"name": "Tuition Fees", "returns": "N/A", "lock_in": "N/A", "risk": "N/A", "max": 150_000},
    {"name": "NPS (80CCD 1B)", "returns": "~9-12%", "lock_in": "Till 60", "risk": "Medium", "max": 50_000, "separate_limit": True},
]


def plan_80c(investments: dict) -> dict:
    total = sum(v for k, v in investments.items() if k != "nps_80ccd_1b")
    capped = min(total, SECTION_80C_LIMIT)
    remaining = max(SECTION_80C_LIMIT - total, 0)
    nps = min(investments.get("nps_80ccd_1b", 0), SECTION_80CCD_1B_LIMIT)
    return {
        "total_invested": round(total),
        "capped_80c": capped,
        "remaining_80c": remaining,
        "nps_80ccd_1b": nps,
        "nps_remaining": max(SECTION_80CCD_1B_LIMIT - nps, 0),
        "total_deduction": capped + nps,
        "investment_options": INVESTMENT_OPTIONS_80C,
    }


HOLDING_PERIODS = {
    "equity": 12,
    "debt": 24,
    "real_estate": 24,
    "gold": 24,
    "crypto": 12,
}

LTCG_RATES = {
    "equity": 0.125,
    "debt": None,
    "real_estate": 0.125,
    "gold": 0.125,
    "crypto": 0.125,
}

STCG_RATES = {
    "equity": 0.20,
    "debt": None,
    "real_estate": None,
    "gold": None,
    "crypto": 0.20,
}


def calculate_capital_gains(
    asset_type: str,
    purchase_price: float,
    sale_price: float,
    holding_months: int,
) -> dict:
    gain = sale_price - purchase_price
    threshold = HOLDING_PERIODS.get(asset_type, 24)
    is_ltcg = holding_months >= threshold

    if is_ltcg:
        rate = LTCG_RATES.get(asset_type)
        gain_type = "LTCG"
        if asset_type == "equity":
            exemption = 125_000
            taxable_gain = max(gain - exemption, 0)
        else:
            exemption = 0
            taxable_gain = max(gain, 0)
        if rate is not None:
            tax = round(taxable_gain * rate)
        else:
            tax = None
    else:
        rate = STCG_RATES.get(asset_type)
        gain_type = "STCG"
        exemption = 0
        taxable_gain = max(gain, 0)
        if rate is not None:
            tax = round(taxable_gain * rate)
        else:
            tax = None

    cess = round(tax * CESS_RATE) if tax is not None else None
    total = (tax + cess) if tax is not None else None

    return {
        "asset_type": asset_type,
        "purchase_price": round(purchase_price),
        "sale_price": round(sale_price),
        "gain": round(gain),
        "holding_months": holding_months,
        "gain_type": gain_type,
        "exemption": exemption,
        "taxable_gain": round(taxable_gain),
        "rate": rate,
        "tax": tax,
        "cess": cess,
        "total_tax": total,
        "taxed_at_slab": rate is None,
    }


TDS_RATES = {
    "salary": {"rate": None, "threshold": 0, "section": "192"},
    "interest_bank": {"rate": 0.10, "threshold": 40_000, "section": "194A"},
    "interest_fd": {"rate": 0.10, "threshold": 40_000, "section": "194A"},
    "rent_individual": {"rate": 0.05, "threshold": 600_000, "section": "194-IB"},
    "rent_company": {"rate": 0.10, "threshold": 240_000, "section": "194-I"},
    "professional_fees": {"rate": 0.10, "threshold": 30_000, "section": "194J"},
    "commission": {"rate": 0.05, "threshold": 15_000, "section": "194H"},
    "contractor_individual": {"rate": 0.01, "threshold": 30_000, "section": "194C"},
    "contractor_company": {"rate": 0.02, "threshold": 30_000, "section": "194C"},
    "lottery": {"rate": 0.30, "threshold": 10_000, "section": "194B"},
}


def calculate_tds(income_type: str, amount: float, has_pan: bool = True) -> dict:
    info = TDS_RATES.get(income_type)
    if not info:
        return {"error": f"Unknown income type: {income_type}"}

    if info["rate"] is None:
        return {
            "income_type": income_type,
            "amount": round(amount),
            "rate": None,
            "tds": None,
            "section": info["section"],
            "note": "TDS on salary is deducted at applicable slab rates by the employer.",
        }

    rate = 0.20 if not has_pan else info["rate"]
    if amount < info["threshold"]:
        return {
            "income_type": income_type,
            "amount": round(amount),
            "rate": rate,
            "threshold": info["threshold"],
            "tds": 0,
            "section": info["section"],
            "note": f"Amount is below TDS threshold of ₹{info['threshold']:,}.",
        }

    tds = round(amount * rate)
    return {
        "income_type": income_type,
        "amount": round(amount),
        "rate": rate,
        "threshold": info["threshold"],
        "tds": tds,
        "section": info["section"],
        "has_pan": has_pan,
    }


def calculate_advance_tax(total_tax: float, tds_deducted: float) -> dict:
    net_tax = max(total_tax - tds_deducted, 0)
    if net_tax < 10_000:
        return {
            "total_tax": round(total_tax),
            "tds_deducted": round(tds_deducted),
            "net_tax": round(net_tax),
            "advance_tax_applicable": False,
            "note": "Advance tax not applicable as net tax liability is less than ₹10,000.",
            "installments": [],
        }

    installments = [
        {"due_date": "June 15, 2026", "cumulative_pct": 15, "amount": round(net_tax * 0.15)},
        {"due_date": "September 15, 2026", "cumulative_pct": 45, "amount": round(net_tax * 0.30)},
        {"due_date": "December 15, 2026", "cumulative_pct": 75, "amount": round(net_tax * 0.30)},
        {"due_date": "March 15, 2027", "cumulative_pct": 100, "amount": round(net_tax * 0.25)},
    ]

    return {
        "total_tax": round(total_tax),
        "tds_deducted": round(tds_deducted),
        "net_tax": round(net_tax),
        "advance_tax_applicable": True,
        "installments": installments,
    }


SENIOR_OLD_REGIME_SLABS = [
    (300_000, 0.00),
    (500_000, 0.05),
    (1_000_000, 0.20),
    (float("inf"), 0.30),
]

SUPER_SENIOR_OLD_REGIME_SLABS = [
    (500_000, 0.00),
    (1_000_000, 0.20),
    (float("inf"), 0.30),
]


def calculate_nps_benefit(
    annual_contribution: float,
    employer_contribution: float = 0,
    gross_income: float = 0,
    age: int = 30,
) -> dict:
    self_capped_80ccd1 = min(annual_contribution, gross_income * 0.10) if gross_income > 0 else 0
    additional_capped_1b = min(annual_contribution, SECTION_80CCD_1B_LIMIT)
    employer_capped_80ccd2 = min(employer_contribution, gross_income * 0.14) if gross_income > 0 else 0
    total_deduction = self_capped_80ccd1 + additional_capped_1b + employer_capped_80ccd2
    years_to_retire = max(60 - age, 0)
    estimated_corpus = 0
    if years_to_retire > 0:
        total_annual = annual_contribution + employer_contribution
        estimated_corpus = round(total_annual * ((1.10 ** years_to_retire - 1) / 0.10) * 1.10)
    return {
        "self_contribution": round(annual_contribution),
        "employer_contribution": round(employer_contribution),
        "deduction_80ccd1": round(self_capped_80ccd1),
        "deduction_80ccd1b": round(additional_capped_1b),
        "deduction_80ccd2": round(employer_capped_80ccd2),
        "total_deduction": round(total_deduction),
        "tax_saving_high_slab": round(total_deduction * 0.312),
        "tax_saving_mid_slab": round(total_deduction * 0.208),
        "estimated_corpus": estimated_corpus,
        "years_to_retire": years_to_retire,
    }


def calculate_home_loan_benefit(
    principal_per_year: float,
    interest_per_year: float,
    loan_amount: float,
    is_let_out: bool = False,
    is_first_time_buyer: bool = False,
    property_value: float = 0,
) -> dict:
    sec_80c = min(principal_per_year, SECTION_80C_LIMIT)
    max_interest = interest_per_year if is_let_out else min(interest_per_year, 200_000)
    sec_80eea = 0
    if is_first_time_buyer and property_value <= 4_500_000 and loan_amount <= 3_500_000:
        sec_80eea = min(max(interest_per_year - 200_000, 0), 150_000)
    total_deduction = sec_80c + max_interest + sec_80eea
    return {
        "principal_per_year": round(principal_per_year),
        "interest_per_year": round(interest_per_year),
        "loan_amount": round(loan_amount),
        "section_80c": round(sec_80c),
        "section_24b": round(max_interest),
        "section_80eea": round(sec_80eea),
        "total_deduction": round(total_deduction),
        "tax_saving_high_slab": round(total_deduction * 0.312),
        "is_let_out": is_let_out,
        "is_first_time_buyer": is_first_time_buyer,
    }


def calculate_senior_citizen_tax(
    gross_income: float,
    age: int,
    section_80c: float = 0,
    section_80d: float = 0,
    section_80d_parents: float = 0,
    section_80ttb: float = 0,
    home_loan_interest: float = 0,
    nps_80ccd_1b: float = 0,
    other_deductions: float = 0,
) -> dict:
    is_super_senior = age >= 80  # noqa: PLR2004
    is_senior = age >= 60  # noqa: PLR2004

    new_result = calculate_new_regime(gross_income)

    standard_deduction = min(OLD_REGIME_STANDARD_DEDUCTION, gross_income)
    capped_80c = min(section_80c, SECTION_80C_LIMIT)
    max_80d = SECTION_80D_LIMIT_SENIOR if is_senior else SECTION_80D_LIMIT_SELF
    capped_80d = min(section_80d, max_80d)
    capped_80d_parents = min(section_80d_parents, SECTION_80D_LIMIT_PARENTS_SENIOR)
    capped_80ttb = min(section_80ttb, 50_000) if is_senior else 0
    capped_home_loan = min(home_loan_interest, 200_000)
    capped_nps = min(nps_80ccd_1b, SECTION_80CCD_1B_LIMIT)

    total_deductions = (
        standard_deduction + capped_80c + capped_80d + capped_80d_parents
        + capped_80ttb + capped_home_loan + capped_nps + other_deductions
    )
    taxable = max(gross_income - total_deductions, 0)

    if is_super_senior:
        slabs = SUPER_SENIOR_OLD_REGIME_SLABS
    elif is_senior:
        slabs = SENIOR_OLD_REGIME_SLABS
    else:
        slabs = OLD_REGIME_SLABS

    tax, _slab_breakdown = _apply_slabs(taxable, slabs)
    rebate_87a = 0
    if taxable <= 500_000:
        rebate_87a = min(tax, 12_500)
    tax_after_rebate = max(tax - rebate_87a, 0)
    surcharge = _surcharge(tax_after_rebate, gross_income)
    cess = round((tax_after_rebate + surcharge) * CESS_RATE)
    total_old = tax_after_rebate + surcharge + cess

    recommended = "new" if new_result["total_tax"] <= total_old else "old"
    savings = abs(new_result["total_tax"] - total_old)

    special_benefits = []
    if is_senior:
        special_benefits.append("Higher 80D limit: ₹50,000 (vs ₹25,000 for below 60)")
        special_benefits.append("Section 80TTB: Up to ₹50,000 deduction on interest from deposits")
        special_benefits.append("No TDS on interest up to ₹50,000 (Form 15H)")
    if is_super_senior:
        special_benefits.append("No advance tax requirement")
        special_benefits.append("Higher basic exemption: ₹5,00,000")
    elif is_senior:
        special_benefits.append("Higher basic exemption: ₹3,00,000")

    category = "Super Senior Citizen (80+)" if is_super_senior else ("Senior Citizen (60-79)" if is_senior else "Below 60")

    return {
        "category": category,
        "age": age,
        "gross_income": round(gross_income),
        "deductions_total": round(total_deductions),
        "taxable_income": round(taxable),
        "total_tax_old": total_old,
        "total_tax_new": new_result["total_tax"],
        "recommended": recommended,
        "savings": savings,
        "special_benefits": special_benefits,
    }


def generate_recommendations(
    gross_income: float,
    age: int,
    existing_80c: float = 0,
    existing_80d: float = 0,
    existing_hra_exemption: float = 0,
    existing_home_loan: float = 0,
    existing_nps: float = 0,
) -> dict:
    new_result = calculate_new_regime(gross_income)
    old_result = calculate_old_regime(
        gross_income,
        hra_exemption=existing_hra_exemption,
        section_80c=existing_80c,
        section_80d=existing_80d,
        home_loan_interest=existing_home_loan,
        nps_80ccd_1b=existing_nps,
    )

    suggestions = []
    remaining_80c = max(SECTION_80C_LIMIT - existing_80c, 0)
    if remaining_80c > 0:
        tax_saving = round(remaining_80c * 0.312)
        suggestions.append({
            "category": "Section 80C",
            "suggestion": f"Invest ₹{remaining_80c:,.0f} more in 80C instruments (PPF, ELSS, or NPS)",
            "potential_saving": tax_saving,
            "priority": "high",
        })

    max_80d = SECTION_80D_LIMIT_SENIOR if age >= 60 else SECTION_80D_LIMIT_SELF  # noqa: PLR2004
    remaining_80d = max(max_80d - existing_80d, 0)
    if remaining_80d > 0:
        suggestions.append({
            "category": "Section 80D",
            "suggestion": f"Get health insurance to claim ₹{remaining_80d:,.0f} more under 80D",
            "potential_saving": round(remaining_80d * 0.312),
            "priority": "high",
        })

    remaining_nps = max(SECTION_80CCD_1B_LIMIT - existing_nps, 0)
    if remaining_nps > 0:
        suggestions.append({
            "category": "NPS (80CCD 1B)",
            "suggestion": f"Invest ₹{remaining_nps:,.0f} in NPS for additional deduction beyond 80C",
            "potential_saving": round(remaining_nps * 0.312),
            "priority": "medium",
        })

    if existing_home_loan == 0 and gross_income > 1_000_000:
        suggestions.append({
            "category": "Home Loan",
            "suggestion": "Home loan interest up to ₹2,00,000 is deductible under Section 24(b)",
            "potential_saving": round(200_000 * 0.312),
            "priority": "low",
        })

    better_regime = "new" if new_result["total_tax"] <= old_result["total_tax"] else "old"
    savings = abs(new_result["total_tax"] - old_result["total_tax"])

    return {
        "old_regime_tax": old_result["total_tax"],
        "new_regime_tax": new_result["total_tax"],
        "recommended_regime": better_regime,
        "regime_savings": savings,
        "suggestions": sorted(suggestions, key=lambda s: s["potential_saving"], reverse=True),
    }
