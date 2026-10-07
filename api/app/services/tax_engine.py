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

def format_inr(amount):
    s = str(int(amount))
    if len(s) <= 3:
        return s
    last3 = s[-3:]
    rest = s[:-3]
    parts = []
    while len(rest) > 2:
        parts.append(rest[-2:])
        rest = rest[:-2]
    if rest:
        parts.append(rest)
    parts.reverse()
    return ",".join(parts) + "," + last3


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


def calculate_take_home_salary(
    ctc: float,
    is_metro: bool = False,
    pf_contribution_rate: float = 0.12,
) -> dict:
    basic = round(ctc * 0.40)
    hra = round(basic * (0.50 if is_metro else 0.40))
    employer_pf = round(min(basic, 180_000) * pf_contribution_rate)
    employee_pf = employer_pf
    gratuity = round(basic * 0.0481)
    professional_tax = 2_400
    special_allowance = max(ctc - basic - hra - employer_pf - gratuity, 0)
    gross_salary = basic + hra + round(special_allowance)
    total_deductions = employee_pf + professional_tax
    annual_in_hand = gross_salary - total_deductions
    new_regime = calculate_new_regime(gross_salary)
    monthly_tax = round(new_regime["total_tax"] / 12)
    monthly_in_hand = round((annual_in_hand - new_regime["total_tax"]) / 12)

    return {
        "ctc": round(ctc),
        "basic": basic,
        "hra": hra,
        "special_allowance": round(special_allowance),
        "employer_pf": employer_pf,
        "employee_pf": employee_pf,
        "gratuity": gratuity,
        "professional_tax": professional_tax,
        "gross_salary": round(gross_salary),
        "total_deductions": round(total_deductions),
        "annual_in_hand": round(annual_in_hand),
        "estimated_tax": new_regime["total_tax"],
        "monthly_gross": round(gross_salary / 12),
        "monthly_deductions": round(total_deductions / 12),
        "monthly_tax": monthly_tax,
        "monthly_in_hand": max(monthly_in_hand, 0),
        "annual_take_home": max(annual_in_hand - new_regime["total_tax"], 0),
    }


def calculate_gratuity(
    last_drawn_salary: float,
    years_of_service: float,
    is_government: bool = False,
) -> dict:
    capped_years = max(years_of_service, 0)
    if is_government:
        gratuity_amount = round((last_drawn_salary * capped_years * 15) / 30)
    else:
        gratuity_amount = round((last_drawn_salary * capped_years * 15) / 26)
    exemption_limit = 2_000_000
    exempt_amount = min(gratuity_amount, exemption_limit)
    taxable_amount = max(gratuity_amount - exemption_limit, 0)
    eligible = capped_years >= 5

    return {
        "last_drawn_salary": round(last_drawn_salary),
        "years_of_service": capped_years,
        "is_government": is_government,
        "gratuity_amount": gratuity_amount,
        "exemption_limit": exemption_limit,
        "exempt_amount": exempt_amount,
        "taxable_amount": taxable_amount,
        "eligible": eligible,
    }


def calculate_ppf(
    annual_investment: float,
    existing_balance: float = 0,
    years_remaining: int = 15,
    interest_rate: float = 7.1,
) -> dict:
    rate = interest_rate / 100
    balance = existing_balance
    total_invested = existing_balance
    total_interest = 0
    schedule = []

    for year in range(1, years_remaining + 1):
        interest = round((balance + annual_investment) * rate)
        balance = balance + annual_investment + interest
        total_invested += annual_investment
        total_interest += interest
        schedule.append({
            "year": year,
            "investment": round(annual_investment),
            "interest": interest,
            "balance": round(balance),
            "total_invested": round(total_invested),
        })

    return {
        "annual_investment": round(annual_investment),
        "interest_rate": interest_rate,
        "years_remaining": years_remaining,
        "existing_balance": round(existing_balance),
        "maturity_amount": round(balance),
        "total_invested": round(total_invested),
        "total_interest": round(total_interest),
        "schedule": schedule,
    }


def calculate_sip(
    monthly_amount: float,
    annual_return_rate: float,
    years: int,
    step_up_percent: float = 0,
) -> dict:
    monthly_rate = annual_return_rate / 100 / 12
    months = years * 12
    total_invested = 0
    future_value = 0.0
    current_sip = monthly_amount

    for month in range(1, months + 1):
        if step_up_percent > 0 and month > 1 and (month - 1) % 12 == 0:
            current_sip = round(current_sip * (1 + step_up_percent / 100))
        total_invested += current_sip
        future_value = (future_value + current_sip) * (1 + monthly_rate)

    future_value = round(future_value)
    total_invested = round(total_invested)
    wealth_gained = future_value - total_invested

    return {
        "monthly_amount": round(monthly_amount),
        "annual_return_rate": annual_return_rate,
        "years": years,
        "step_up_percent": step_up_percent,
        "total_invested": total_invested,
        "future_value": future_value,
        "wealth_gained": wealth_gained,
    }


def calculate_fd(
    principal: float,
    annual_rate: float,
    tenure_years: float,
    compounding_frequency: int = 4,
    is_senior: bool = False,
) -> dict:
    n = compounding_frequency
    r = annual_rate / 100
    maturity_amount = round(principal * (1 + r / n) ** (n * tenure_years))
    total_interest = maturity_amount - round(principal)
    tds_threshold = 50_000 if is_senior else 40_000
    tds_applicable = total_interest > tds_threshold
    tds_amount = round(total_interest * 0.10) if tds_applicable else 0
    interest_after_tds = total_interest - tds_amount

    return {
        "principal": round(principal),
        "annual_rate": annual_rate,
        "tenure_years": tenure_years,
        "compounding_frequency": n,
        "maturity_amount": maturity_amount,
        "total_interest": total_interest,
        "tds_threshold": tds_threshold,
        "tds_applicable": tds_applicable,
        "tds_amount": tds_amount,
        "interest_after_tds": interest_after_tds,
        "is_senior": is_senior,
    }


def calculate_mutual_fund(
    investment_type: str,
    amount: float,
    annual_return_rate: float,
    years: int,
) -> dict:
    if investment_type == "sip":
        result = calculate_sip(amount, annual_return_rate, years)
        return {**result, "investment_type": "sip"}

    future_value = round(amount * (1 + annual_return_rate / 100) ** years)
    total_invested = round(amount)
    wealth_gained = future_value - total_invested
    absolute_return = ((future_value - total_invested) / total_invested * 100) if total_invested > 0 else 0
    cagr = ((future_value / total_invested) ** (1 / years) - 1) * 100 if total_invested > 0 and years > 0 else 0

    return {
        "investment_type": "lumpsum",
        "amount": total_invested,
        "annual_return_rate": annual_return_rate,
        "years": years,
        "total_invested": total_invested,
        "future_value": future_value,
        "wealth_gained": wealth_gained,
        "absolute_return": round(absolute_return, 2),
        "cagr": round(cagr, 2),
    }


def calculate_emi(
    loan_amount: float,
    annual_rate: float,
    tenure_years: int,
) -> dict:
    monthly_rate = annual_rate / 100 / 12
    months = tenure_years * 12

    if monthly_rate == 0:
        emi = round(loan_amount / months)
    else:
        emi = round(
            loan_amount * monthly_rate * (1 + monthly_rate) ** months
            / ((1 + monthly_rate) ** months - 1)
        )

    total_payment = emi * months
    total_interest = total_payment - round(loan_amount)
    schedule = []
    balance = loan_amount

    for year in range(1, tenure_years + 1):
        year_principal = 0
        year_interest = 0
        for _ in range(12):
            interest_component = round(balance * monthly_rate)
            principal_component = emi - interest_component
            year_principal += principal_component
            year_interest += interest_component
            balance = max(balance - principal_component, 0)
        schedule.append({
            "year": year,
            "principal_paid": round(year_principal),
            "interest_paid": round(year_interest),
            "balance": round(balance),
        })

    return {
        "loan_amount": round(loan_amount),
        "annual_rate": annual_rate,
        "tenure_years": tenure_years,
        "emi": emi,
        "total_payment": round(total_payment),
        "total_interest": round(total_interest),
        "schedule": schedule,
    }


def calculate_compound_interest(
    principal: float,
    annual_rate: float,
    years: int,
    compounding_frequency: int = 1,
) -> dict:
    n = compounding_frequency
    r = annual_rate / 100
    amount = round(principal * (1 + r / n) ** (n * years))
    total_interest = amount - round(principal)
    simple_interest = round(principal * r * years)
    compounding_benefit = total_interest - simple_interest

    yearly_breakdown = []
    for y in range(1, years + 1):
        bal = round(principal * (1 + r / n) ** (n * y))
        yearly_breakdown.append({
            "year": y,
            "balance": bal,
            "interest": bal - round(principal),
        })

    return {
        "principal": round(principal),
        "annual_rate": annual_rate,
        "years": years,
        "compounding_frequency": n,
        "total_amount": amount,
        "total_interest": total_interest,
        "simple_interest": simple_interest,
        "compounding_benefit": compounding_benefit,
        "yearly_breakdown": yearly_breakdown,
    }


def calculate_section_80d(
    self_premium: float = 0,
    spouse_premium: float = 0,
    children_premium: float = 0,
    parents_premium: float = 0,
    is_self_senior: bool = False,
    is_parents_senior: bool = False,
    preventive_checkup: float = 0,
) -> dict:
    self_family_premium = self_premium + spouse_premium + children_premium
    self_limit = 50_000 if is_self_senior else 25_000
    parents_limit = 50_000 if is_parents_senior else 25_000
    preventive = min(preventive_checkup, 5_000)
    self_deduction = min(self_family_premium + preventive, self_limit)
    parents_deduction = min(parents_premium, parents_limit)
    total_deduction = self_deduction + parents_deduction
    tax_saving_30 = round(total_deduction * 0.312)
    tax_saving_20 = round(total_deduction * 0.208)

    return {
        "self_family_premium": round(self_family_premium),
        "parents_premium": round(parents_premium),
        "preventive_checkup": round(preventive),
        "self_limit": self_limit,
        "parents_limit": parents_limit,
        "self_deduction": round(self_deduction),
        "parents_deduction": round(parents_deduction),
        "total_deduction": round(total_deduction),
        "self_remaining": max(self_limit - round(self_family_premium) - round(preventive), 0),
        "parents_remaining": max(parents_limit - round(parents_premium), 0),
        "tax_saving_high_slab": tax_saving_30,
        "tax_saving_mid_slab": tax_saving_20,
        "is_self_senior": is_self_senior,
        "is_parents_senior": is_parents_senior,
    }


def calculate_salary_optimizer(ctc: float) -> dict:
    def build_structure(basic: float, label: str) -> dict:
        hra = round(basic * 0.50)
        lta = round(min(ctc * 0.05, 50_000))
        food_coupons = round(min(26_400, ctc * 0.03))
        nps_80ccd2 = round(basic * 0.10)
        epf_employer = round(min(basic, 180_000) * 0.12)
        epf_employee = epf_employer
        gratuity = round(basic * 0.0481)
        special = max(ctc - basic - hra - lta - food_coupons - nps_80ccd2 - epf_employer - gratuity, 0)
        gross_salary = basic + hra + round(special) + lta + food_coupons
        new_r = calculate_new_regime(gross_salary)
        monthly_in_hand = round((gross_salary - epf_employee - 2_400 - new_r["total_tax"]) / 12)

        return {
            "label": label,
            "basic": basic,
            "hra": hra,
            "lta": lta,
            "food_coupons": food_coupons,
            "nps_80ccd2": nps_80ccd2,
            "epf_employer": epf_employer,
            "epf_employee": epf_employee,
            "gratuity": gratuity,
            "special_allowance": round(special),
            "gross_salary": round(gross_salary),
            "estimated_tax_new": new_r["total_tax"],
            "monthly_in_hand_estimate": monthly_in_hand,
        }

    structures = [
        build_structure(round(ctc * 0.30), "Low Basic (30%)"),
        build_structure(round(ctc * 0.40), "Standard Basic (40%)"),
        build_structure(round(ctc * 0.50), "High Basic (50%)"),
    ]

    best = max(structures, key=lambda s: s["monthly_in_hand_estimate"])

    return {
        "ctc": round(ctc),
        "structures": structures,
        "recommended": best["label"],
        "best_monthly_in_hand": best["monthly_in_hand_estimate"],
    }


def calculate_ssy(annual_investment: float, existing_balance: float = 0, girl_age: int = 1, interest_rate: float = 8.2):
    rate = interest_rate / 100
    deposit_years = max(0, 15 - girl_age)
    maturity_years = max(0, 21 - girl_age)
    capped = min(annual_investment, 250_000)
    balance = existing_balance
    schedule = []

    for year in range(1, maturity_years + 1):
        deposit = capped if year <= deposit_years else 0
        interest = round((balance + deposit) * rate)
        balance = balance + deposit + interest
        schedule.append({
            "year": year,
            "age": girl_age + year,
            "deposit": deposit,
            "interest": interest,
            "balance": round(balance),
        })

    total_invested = round(existing_balance + capped * deposit_years)
    return {
        "annualInvestment": capped,
        "interestRate": interest_rate,
        "girlAge": girl_age,
        "depositYears": deposit_years,
        "maturityYears": maturity_years,
        "maturityAmount": round(balance),
        "totalInvested": total_invested,
        "totalInterest": round(balance - total_invested),
        "schedule": schedule,
    }


def calculate_epf(basic_salary: float, employee_rate: float = 0.12, employer_rate: float = 0.12,
                  current_balance: float = 0, years_to_retire: int = 25, interest_rate: float = 8.25):
    monthly_basic = basic_salary
    employee_contribution = round(monthly_basic * employee_rate)
    employer_total = round(monthly_basic * employer_rate)
    pension_basic = min(monthly_basic, 15_000)
    pension_contribution = round(pension_basic * 0.0833)
    employer_epf = employer_total - pension_contribution

    monthly_rate = interest_rate / 100 / 12
    balance = current_balance
    schedule = []

    for year in range(1, years_to_retire + 1):
        yearly_employee = 0
        yearly_employer = 0
        for _ in range(12):
            balance += employee_contribution + employer_epf
            interest_month = balance * monthly_rate
            balance += interest_month
            yearly_employee += employee_contribution
            yearly_employer += employer_epf
        schedule.append({
            "year": year,
            "employeeContribution": yearly_employee,
            "employerEPF": yearly_employer,
            "balance": round(balance),
        })

    total_employee = employee_contribution * 12 * years_to_retire
    total_employer_epf = employer_epf * 12 * years_to_retire

    return {
        "basicSalary": round(monthly_basic),
        "employeeContribution": employee_contribution,
        "employerEPF": employer_epf,
        "pensionContribution": pension_contribution,
        "employerTotal": employer_total,
        "totalEmployeeContribution": total_employee,
        "totalEmployerEPF": total_employer_epf,
        "retirementCorpus": round(balance),
        "totalInterestEarned": round(balance - current_balance - total_employee - total_employer_epf),
        "schedule": schedule,
    }


def compare_elss_vs_ppf_vs_fd(annual_investment: float, years: int = 10, tax_slab: float = 0.30,
                                fd_rate: float = 7.0, elss_return: float = 12.0, ppf_rate: float = 7.1):
    def compound(principal, rate, n):
        return principal * ((1 + rate / 100) ** n - 1) / (rate / 100) if rate > 0 else principal * n

    ppf_val = compound(annual_investment, ppf_rate, min(years, 15))
    ppf_tax = 0
    ppf_after = round(ppf_val)

    fd_val = compound(annual_investment, fd_rate, years)
    fd_invested = annual_investment * years
    fd_interest = fd_val - fd_invested
    fd_tax = round(fd_interest * (tax_slab + tax_slab * 0.04))
    fd_after = round(fd_val - fd_tax)

    elss_val = compound(annual_investment, elss_return, years)
    elss_invested = annual_investment * years
    elss_gain = elss_val - elss_invested
    ltcg_exempt = 125_000
    taxable_gain = max(0, elss_gain - ltcg_exempt)
    elss_tax = round(taxable_gain * 0.125)
    elss_after = round(elss_val - elss_tax)

    return {
        "annualInvestment": round(annual_investment),
        "years": years,
        "elss": {
            "preReturn": round(elss_val),
            "tax": elss_tax,
            "afterTax": elss_after,
            "lockIn": 3,
            "risk": "High",
        },
        "ppf": {
            "preReturn": round(ppf_val),
            "tax": ppf_tax,
            "afterTax": ppf_after,
            "lockIn": 15,
            "risk": "Nil",
        },
        "fd": {
            "preReturn": round(fd_val),
            "tax": fd_tax,
            "afterTax": fd_after,
            "lockIn": 5,
            "risk": "Nil",
        },
    }


def calculate_tax_loss_harvesting(gains: float, losses: float, gain_type: str = "ltcg"):
    net = gains - losses
    if gain_type == "ltcg":
        exempt = 125_000
        taxable_without = max(0, gains - exempt)
        tax_without = round(taxable_without * 0.125)
        taxable_with = max(0, net - exempt)
        tax_with = round(taxable_with * 0.125)
    else:
        tax_without = round(gains * 0.20)
        taxable_with = max(0, net)
        tax_with = round(taxable_with * 0.20)

    savings = tax_without - tax_with
    carry_forward = max(0, losses - gains)

    return {
        "gains": round(gains),
        "losses": round(losses),
        "gainType": gain_type.upper(),
        "taxWithout": tax_without,
        "taxWith": tax_with,
        "savings": savings,
        "carryForward": round(carry_forward),
        "netGain": round(net),
    }


def calculate_refund(total_income: float, tds_deducted: float = 0, advance_tax_paid: float = 0,
                     self_assessment_tax: float = 0, regime: str = "new"):
    if regime == "new":
        result = calculate_new_regime(total_income)
    else:
        result = calculate_old_regime(total_income)

    tax_liability = result["total_tax"]
    total_paid = tds_deducted + advance_tax_paid + self_assessment_tax
    diff = total_paid - tax_liability
    refund_amount = max(0, diff)
    tax_due = max(0, -diff)
    interest = round(refund_amount * 0.06 * 0.5) if refund_amount > 0 else 0

    return {
        "totalIncome": round(total_income),
        "regime": regime,
        "taxLiability": tax_liability,
        "tdsDeducted": round(tds_deducted),
        "advanceTaxPaid": round(advance_tax_paid),
        "selfAssessmentTax": round(self_assessment_tax),
        "totalTaxPaid": round(total_paid),
        "refundAmount": round(refund_amount),
        "taxDue": round(tax_due),
        "interestOnRefund": interest,
    }


PROFESSIONAL_TAX_RATES = {
    "maharashtra": {
        "label": "Maharashtra",
        "slabs": [
            {"min": 0, "max": 7500, "monthly": 0},
            {"min": 7501, "max": 10000, "monthly": 175},
            {"min": 10001, "max": float("inf"), "monthly": 200},
        ],
        "february_extra": 100,
    },
    "karnataka": {
        "label": "Karnataka",
        "slabs": [
            {"min": 0, "max": 15000, "monthly": 0},
            {"min": 15001, "max": 25000, "monthly": 200},
            {"min": 25001, "max": float("inf"), "monthly": 200},
        ],
    },
    "west_bengal": {
        "label": "West Bengal",
        "slabs": [
            {"min": 0, "max": 10000, "monthly": 0},
            {"min": 10001, "max": 15000, "monthly": 110},
            {"min": 15001, "max": 25000, "monthly": 130},
            {"min": 25001, "max": 40000, "monthly": 150},
            {"min": 40001, "max": float("inf"), "monthly": 200},
        ],
    },
    "andhra_pradesh": {
        "label": "Andhra Pradesh",
        "slabs": [
            {"min": 0, "max": 15000, "monthly": 0},
            {"min": 15001, "max": 20000, "monthly": 150},
            {"min": 20001, "max": float("inf"), "monthly": 200},
        ],
    },
    "telangana": {
        "label": "Telangana",
        "slabs": [
            {"min": 0, "max": 15000, "monthly": 0},
            {"min": 15001, "max": 20000, "monthly": 150},
            {"min": 20001, "max": float("inf"), "monthly": 200},
        ],
    },
    "tamil_nadu": {
        "label": "Tamil Nadu",
        "slabs": [
            {"min": 0, "max": 21000, "monthly": 0},
            {"min": 21001, "max": 30000, "monthly": 135},
            {"min": 30001, "max": 45000, "monthly": 315},
            {"min": 45001, "max": 60000, "monthly": 690},
            {"min": 60001, "max": 75000, "monthly": 1025},
            {"min": 75001, "max": float("inf"), "monthly": 1250},
        ],
    },
    "gujarat": {
        "label": "Gujarat",
        "slabs": [
            {"min": 0, "max": 5999, "monthly": 0},
            {"min": 6000, "max": 8999, "monthly": 80},
            {"min": 9000, "max": 11999, "monthly": 150},
            {"min": 12000, "max": float("inf"), "monthly": 200},
        ],
    },
}


def calculate_professional_tax(monthly_salary: float, state: str = "maharashtra"):
    state_data = PROFESSIONAL_TAX_RATES.get(state)
    if not state_data:
        return {
            "monthlySalary": round(monthly_salary),
            "monthlyTax": 0,
            "februaryTax": 0,
            "annualTax": 0,
            "maxAllowed": 2500,
            "stateLabel": state.replace("_", " ").title(),
            "slabs": [],
        }

    monthly_tax = 0
    for slab in state_data["slabs"]:
        if monthly_salary >= slab["min"] and monthly_salary <= slab["max"]:
            monthly_tax = slab["monthly"]
            break

    feb_extra = state_data.get("february_extra", 0)
    february_tax = monthly_tax + feb_extra
    annual_tax = monthly_tax * 11 + february_tax

    formatted_slabs = []
    for slab in state_data["slabs"]:
        top = slab["max"]
        if top == float("inf"):
            range_str = f"Above {format_inr(slab['min'])}"
        else:
            range_str = f"{format_inr(slab['min'])} - {format_inr(top)}"
        formatted_slabs.append({"range": range_str, "monthly": slab["monthly"]})

    return {
        "monthlySalary": round(monthly_salary),
        "monthlyTax": monthly_tax,
        "februaryTax": february_tax,
        "annualTax": annual_tax,
        "maxAllowed": 2500,
        "stateLabel": state_data["label"],
        "slabs": formatted_slabs,
    }
