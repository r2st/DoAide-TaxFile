from app.services.tax_engine import (
    calculate_advance_tax,
    calculate_capital_gains,
    calculate_compound_interest,
    calculate_emi,
    calculate_epf,
    calculate_fd,
    calculate_gratuity,
    calculate_home_loan_benefit,
    calculate_hra_exemption,
    calculate_mutual_fund,
    calculate_new_regime,
    calculate_nps_benefit,
    calculate_old_regime,
    calculate_ppf,
    calculate_professional_tax,
    calculate_refund,
    calculate_salary_optimizer,
    calculate_section_80d,
    calculate_senior_citizen_tax,
    calculate_sip,
    calculate_ssy,
    calculate_take_home_salary,
    calculate_tax_loss_harvesting,
    calculate_tds,
    compare_elss_vs_ppf_vs_fd,
    plan_80c,
    select_itr_form,
)


class TestNewRegime:
    def test_income_below_standard_deduction(self):
        result = calculate_new_regime(50_000)
        assert result["total_tax"] == 0

    def test_income_12_lakh_gets_full_rebate(self):
        result = calculate_new_regime(1_200_000)
        assert result["rebate_87a"] > 0
        assert result["total_tax"] == 0

    def test_income_12_75_lakh(self):
        result = calculate_new_regime(1_275_000)
        assert result["taxable_income"] == 1_200_000
        assert result["total_tax"] == 0

    def test_income_15_lakh(self):
        result = calculate_new_regime(1_500_000)
        taxable = 1_500_000 - 75_000
        assert result["taxable_income"] == taxable
        assert result["rebate_87a"] == 0
        assert result["total_tax"] > 0

    def test_income_25_lakh(self):
        result = calculate_new_regime(2_500_000)
        assert result["total_tax"] > 0
        assert result["cess"] > 0

    def test_surcharge_kicks_in(self):
        result = calculate_new_regime(6_000_000)
        assert result["surcharge"] > 0


class TestOldRegime:
    def test_income_below_exemption(self):
        result = calculate_old_regime(200_000)
        assert result["total_tax"] == 0

    def test_rebate_under_5_lakh(self):
        result = calculate_old_regime(500_000)
        assert result["total_tax"] == 0

    def test_deductions_reduce_tax(self):
        no_deductions = calculate_old_regime(1_000_000)
        with_80c = calculate_old_regime(1_000_000, section_80c=150_000)
        assert with_80c["total_tax"] < no_deductions["total_tax"]

    def test_80c_cap(self):
        result = calculate_old_regime(1_000_000, section_80c=300_000)
        assert result["section_80c"] == 150_000

    def test_home_loan_cap(self):
        result = calculate_old_regime(1_000_000, home_loan_interest=500_000)
        assert result["home_loan_interest"] == 200_000


class TestHRA:
    def test_metro_exemption(self):
        result = calculate_hra_exemption(500_000, 0, 200_000, 180_000, True)
        assert result["exemption"] == min(200_000, 250_000, 130_000)
        assert result["exemption"] == 130_000

    def test_non_metro_exemption(self):
        result = calculate_hra_exemption(500_000, 0, 200_000, 180_000, False)
        pct = 0.40 * 500_000
        rent_minus = 180_000 - 50_000
        assert result["exemption"] == min(200_000, pct, rent_minus)

    def test_zero_rent(self):
        result = calculate_hra_exemption(500_000, 0, 200_000, 0, True)
        assert result["exemption"] == 0

    def test_with_da(self):
        result = calculate_hra_exemption(400_000, 100_000, 200_000, 180_000, True)
        assert result["percent_of_salary"] == 250_000


class TestITRSelector:
    def test_simple_salaried(self):
        result = select_itr_form(has_salary=True, total_income=800_000)
        assert result["form"] == "ITR-1"

    def test_capital_gains(self):
        result = select_itr_form(has_capital_gains=True)
        assert result["form"] == "ITR-2"

    def test_business_income(self):
        result = select_itr_form(has_business_income=True)
        assert result["form"] == "ITR-3"

    def test_presumptive(self):
        result = select_itr_form(
            has_business_income=True, is_presumptive_tax=True, total_income=3_000_000
        )
        assert result["form"] == "ITR-4"

    def test_high_income(self):
        result = select_itr_form(total_income=6_000_000)
        assert result["form"] == "ITR-2"


class TestCapitalGains:
    def test_equity_ltcg(self):
        result = calculate_capital_gains("equity", 100_000, 300_000, 15)
        assert result["gain_type"] == "LTCG"
        assert result["exemption"] == 125_000
        assert result["taxable_gain"] == 75_000

    def test_equity_stcg(self):
        result = calculate_capital_gains("equity", 100_000, 300_000, 6)
        assert result["gain_type"] == "STCG"
        assert result["rate"] == 0.20

    def test_real_estate_ltcg(self):
        result = calculate_capital_gains("real_estate", 5_000_000, 8_000_000, 30)
        assert result["gain_type"] == "LTCG"
        assert result["rate"] == 0.125

    def test_loss(self):
        result = calculate_capital_gains("equity", 300_000, 200_000, 15)
        assert result["gain"] == -100_000
        assert result["taxable_gain"] == 0


class TestTDS:
    def test_professional_fees(self):
        result = calculate_tds("professional_fees", 100_000, True)
        assert result["tds"] == 10_000

    def test_below_threshold(self):
        result = calculate_tds("professional_fees", 20_000, True)
        assert result["tds"] == 0

    def test_no_pan(self):
        result = calculate_tds("professional_fees", 100_000, False)
        assert result["rate"] == 0.20
        assert result["tds"] == 20_000


class TestAdvanceTax:
    def test_below_threshold(self):
        result = calculate_advance_tax(8_000, 0)
        assert result["advance_tax_applicable"] is False

    def test_installments(self):
        result = calculate_advance_tax(100_000, 20_000)
        assert result["advance_tax_applicable"] is True
        assert len(result["installments"]) == 4
        total = sum(i["amount"] for i in result["installments"])
        assert total == 80_000


class Test80CPlanner:
    def test_remaining_limit(self):
        result = plan_80c({"ppf": 50_000, "elss": 30_000})
        assert result["remaining_80c"] == 70_000

    def test_over_limit(self):
        result = plan_80c({"ppf": 100_000, "elss": 100_000})
        assert result["capped_80c"] == 150_000
        assert result["remaining_80c"] == 0

    def test_nps_separate(self):
        result = plan_80c({"ppf": 100_000, "nps_80ccd_1b": 40_000})
        assert result["nps_80ccd_1b"] == 40_000
        assert result["total_deduction"] == 140_000


class TestNPSBenefit:
    def test_basic_contribution(self):
        result = calculate_nps_benefit(50_000, gross_income=1_000_000)
        assert result["deduction_80ccd1"] == 50_000
        assert result["deduction_80ccd1b"] == 50_000

    def test_80ccd1_cap_at_10_percent(self):
        result = calculate_nps_benefit(200_000, gross_income=1_000_000)
        assert result["deduction_80ccd1"] == 100_000

    def test_80ccd1b_cap_at_50k(self):
        result = calculate_nps_benefit(100_000, gross_income=1_000_000)
        assert result["deduction_80ccd1b"] == 50_000

    def test_employer_contribution(self):
        result = calculate_nps_benefit(50_000, employer_contribution=100_000, gross_income=1_000_000)
        assert result["deduction_80ccd2"] == 100_000

    def test_employer_cap_14_percent(self):
        result = calculate_nps_benefit(50_000, employer_contribution=200_000, gross_income=1_000_000)
        assert result["deduction_80ccd2"] == 140_000

    def test_corpus_projection(self):
        result = calculate_nps_benefit(50_000, age=30)
        assert result["years_to_retire"] == 30
        assert result["estimated_corpus"] > 0

    def test_zero_income(self):
        result = calculate_nps_benefit(50_000)
        assert result["deduction_80ccd1"] == 0
        assert result["deduction_80ccd2"] == 0


class TestHomeLoanBenefit:
    def test_basic_deductions(self):
        result = calculate_home_loan_benefit(200_000, 300_000, 5_000_000)
        assert result["section_80c"] == 150_000
        assert result["section_24b"] == 200_000

    def test_interest_cap_self_occupied(self):
        result = calculate_home_loan_benefit(100_000, 300_000, 5_000_000, is_let_out=False)
        assert result["section_24b"] == 200_000

    def test_let_out_no_interest_cap(self):
        result = calculate_home_loan_benefit(100_000, 300_000, 5_000_000, is_let_out=True)
        assert result["section_24b"] == 300_000

    def test_80eea_first_time_buyer(self):
        result = calculate_home_loan_benefit(
            100_000, 300_000, 3_000_000, is_first_time_buyer=True, property_value=4_000_000,
        )
        assert result["section_80eea"] == 100_000

    def test_80eea_not_eligible_high_value(self):
        result = calculate_home_loan_benefit(
            100_000, 300_000, 3_000_000, is_first_time_buyer=True, property_value=5_000_000,
        )
        assert result["section_80eea"] == 0

    def test_principal_cap(self):
        result = calculate_home_loan_benefit(200_000, 100_000, 5_000_000)
        assert result["section_80c"] == 150_000


class TestSeniorCitizenTax:
    def test_senior_higher_exemption(self):
        result = calculate_senior_citizen_tax(400_000, 65)
        assert result["total_tax_old"] == 0
        assert result["category"] == "Senior Citizen (60-79)"

    def test_super_senior_higher_exemption(self):
        result = calculate_senior_citizen_tax(500_000, 82)
        assert result["total_tax_old"] == 0
        assert result["category"] == "Super Senior Citizen (80+)"

    def test_regime_comparison(self):
        result = calculate_senior_citizen_tax(1_500_000, 65, section_80c=150_000, section_80d=50_000)
        assert result["recommended"] in ("new", "old")
        assert result["savings"] >= 0

    def test_special_benefits_senior(self):
        result = calculate_senior_citizen_tax(800_000, 65)
        assert any("80TTB" in b for b in result["special_benefits"])
        assert any("80D" in b for b in result["special_benefits"])

    def test_special_benefits_super_senior(self):
        result = calculate_senior_citizen_tax(800_000, 85)
        assert any("advance tax" in b.lower() for b in result["special_benefits"])

    def test_deductions_reduce_old_regime(self):
        no_ded = calculate_senior_citizen_tax(1_500_000, 65)
        with_ded = calculate_senior_citizen_tax(1_500_000, 65, section_80c=150_000)
        assert with_ded["total_tax_old"] <= no_ded["total_tax_old"]

    def test_new_regime_same_regardless_of_age(self):
        senior = calculate_senior_citizen_tax(1_500_000, 65)
        super_senior = calculate_senior_citizen_tax(1_500_000, 85)
        assert senior["total_tax_new"] == super_senior["total_tax_new"]


class TestTakeHomeSalary:
    def test_basic_is_40_percent(self):
        result = calculate_take_home_salary(1_200_000)
        assert result["basic"] == 480_000

    def test_positive_monthly_in_hand(self):
        result = calculate_take_home_salary(1_000_000)
        assert result["monthly_in_hand"] > 0

    def test_metro_hra_higher(self):
        metro = calculate_take_home_salary(1_200_000, is_metro=True)
        non_metro = calculate_take_home_salary(1_200_000, is_metro=False)
        assert metro["hra"] > non_metro["hra"]


class TestGratuity:
    def test_private_employee(self):
        result = calculate_gratuity(50_000, 10)
        assert result["gratuity_amount"] == round((50_000 * 10 * 15) / 26)

    def test_government_employee(self):
        result = calculate_gratuity(50_000, 10, is_government=True)
        assert result["gratuity_amount"] == round((50_000 * 10 * 15) / 30)

    def test_ineligible_under_5_years(self):
        result = calculate_gratuity(50_000, 3)
        assert result["eligible"] is False

    def test_exemption_cap(self):
        result = calculate_gratuity(200_000, 30)
        assert result["exempt_amount"] <= 2_000_000
        assert result["taxable_amount"] > 0


class TestPPF:
    def test_schedule_length(self):
        result = calculate_ppf(150_000, 0, 15)
        assert len(result["schedule"]) == 15

    def test_maturity_exceeds_invested(self):
        result = calculate_ppf(150_000, 0, 15)
        assert result["maturity_amount"] > result["total_invested"]

    def test_existing_balance(self):
        result = calculate_ppf(100_000, 500_000, 5)
        assert result["maturity_amount"] > 500_000 + 100_000 * 5


class TestSIP:
    def test_basic_sip(self):
        result = calculate_sip(10_000, 12, 10)
        assert result["total_invested"] == 1_200_000
        assert result["future_value"] > 1_200_000

    def test_step_up_increases_value(self):
        no_step = calculate_sip(10_000, 12, 10, 0)
        with_step = calculate_sip(10_000, 12, 10, 10)
        assert with_step["total_invested"] > no_step["total_invested"]
        assert with_step["future_value"] > no_step["future_value"]

    def test_zero_return(self):
        result = calculate_sip(10_000, 0, 5)
        assert result["future_value"] == result["total_invested"]


class TestFD:
    def test_maturity_greater_than_principal(self):
        result = calculate_fd(1_000_000, 7, 5)
        assert result["maturity_amount"] > 1_000_000

    def test_tds_applied(self):
        result = calculate_fd(1_000_000, 8, 5)
        assert result["tds_applicable"] is True
        assert result["tds_amount"] > 0

    def test_senior_higher_threshold(self):
        regular = calculate_fd(500_000, 7, 1)
        senior = calculate_fd(500_000, 7, 1, is_senior=True)
        assert senior["tds_threshold"] > regular["tds_threshold"]


class TestMutualFund:
    def test_lumpsum(self):
        result = calculate_mutual_fund("lumpsum", 100_000, 12, 10)
        assert result["investment_type"] == "lumpsum"
        assert result["future_value"] > 100_000

    def test_sip_mode(self):
        result = calculate_mutual_fund("sip", 10_000, 12, 10)
        assert result["investment_type"] == "sip"
        assert result["total_invested"] == 1_200_000


class TestEMI:
    def test_emi_positive(self):
        result = calculate_emi(5_000_000, 8.5, 20)
        assert result["emi"] > 0

    def test_total_equals_principal_plus_interest(self):
        result = calculate_emi(3_000_000, 9, 15)
        assert result["total_payment"] == result["loan_amount"] + result["total_interest"]

    def test_schedule_length(self):
        result = calculate_emi(1_000_000, 10, 10)
        assert len(result["schedule"]) == 10

    def test_balance_near_zero(self):
        result = calculate_emi(1_000_000, 8, 5)
        assert result["schedule"][-1]["balance"] < 100


class TestCompoundInterest:
    def test_compound_exceeds_simple(self):
        result = calculate_compound_interest(100_000, 10, 5)
        assert result["total_interest"] > result["simple_interest"]
        assert result["compounding_benefit"] > 0

    def test_frequent_compounding_better(self):
        annual = calculate_compound_interest(100_000, 10, 5, 1)
        monthly = calculate_compound_interest(100_000, 10, 5, 12)
        assert monthly["total_amount"] > annual["total_amount"]

    def test_yearly_breakdown(self):
        result = calculate_compound_interest(100_000, 8, 10, 4)
        assert len(result["yearly_breakdown"]) == 10
        assert result["yearly_breakdown"][0]["balance"] > 100_000


class TestSection80D:
    def test_self_cap_non_senior(self):
        result = calculate_section_80d(self_premium=30_000)
        assert result["self_deduction"] == 25_000

    def test_self_cap_senior(self):
        result = calculate_section_80d(self_premium=60_000, is_self_senior=True)
        assert result["self_deduction"] == 50_000

    def test_parents_separate(self):
        result = calculate_section_80d(self_premium=20_000, parents_premium=30_000, is_parents_senior=True)
        assert result["parents_deduction"] == 30_000
        assert result["total_deduction"] == 20_000 + 30_000

    def test_tax_savings(self):
        result = calculate_section_80d(self_premium=25_000, parents_premium=25_000)
        assert result["tax_saving_high_slab"] > 0


class TestSalaryOptimizer:
    def test_three_structures(self):
        result = calculate_salary_optimizer(1_200_000)
        assert len(result["structures"]) == 3

    def test_recommends_best(self):
        result = calculate_salary_optimizer(1_500_000)
        assert result["recommended"]
        assert result["best_monthly_in_hand"] > 0

    def test_all_positive_in_hand(self):
        result = calculate_salary_optimizer(2_000_000)
        for s in result["structures"]:
            assert s["monthly_in_hand_estimate"] > 0


class TestSSY:
    def test_maturity_amount(self):
        result = calculate_ssy(150_000, 0, 1, 8.2)
        assert result["maturityAmount"] > 0
        assert result["depositYears"] > 0
        assert len(result["schedule"]) > 0

    def test_cap_at_250k(self):
        result = calculate_ssy(300_000, 0, 1, 8.2)
        assert result["annualInvestment"] == 250_000

    def test_existing_balance(self):
        result = calculate_ssy(100_000, 500_000, 5, 8.2)
        assert result["maturityAmount"] > 500_000


class TestEPF:
    def test_retirement_corpus(self):
        result = calculate_epf(50_000, 0.12, 0.12, 0, 25, 8.25)
        assert result["retirementCorpus"] > 0
        assert len(result["schedule"]) == 25

    def test_employer_split(self):
        result = calculate_epf(50_000, 0.12, 0.12, 0, 1, 8.25)
        assert result["employerEPF"] > 0
        assert result["pensionContribution"] > 0
        assert result["employerEPF"] + result["pensionContribution"] == result["employerTotal"]


class TestELSSComparison:
    def test_returns_all_three(self):
        result = compare_elss_vs_ppf_vs_fd(150_000, 10, 0.30, 7.0, 12.0, 7.1)
        assert "elss" in result
        assert "ppf" in result
        assert "fd" in result

    def test_ppf_tax_free(self):
        result = compare_elss_vs_ppf_vs_fd(150_000, 10, 0.30, 7.0, 12.0, 7.1)
        assert result["ppf"]["tax"] == 0

    def test_fd_has_tax(self):
        result = compare_elss_vs_ppf_vs_fd(150_000, 10, 0.30, 7.0, 12.0, 7.1)
        assert result["fd"]["tax"] > 0


class TestTaxLossHarvesting:
    def test_ltcg_savings(self):
        result = calculate_tax_loss_harvesting(500_000, 200_000, "ltcg")
        assert result["savings"] > 0
        assert result["taxWith"] < result["taxWithout"]

    def test_carry_forward(self):
        result = calculate_tax_loss_harvesting(100_000, 300_000, "ltcg")
        assert result["carryForward"] == 200_000

    def test_stcg(self):
        result = calculate_tax_loss_harvesting(500_000, 100_000, "stcg")
        assert result["gainType"] == "STCG"
        assert result["savings"] > 0


class TestRefund:
    def test_refund_when_tds_exceeds_liability(self):
        result = calculate_refund(800_000, 100_000, 0, 0, "new")
        assert result["refundAmount"] > 0
        assert result["taxDue"] == 0

    def test_tax_due_when_tds_insufficient(self):
        result = calculate_refund(2_000_000, 10_000, 0, 0, "new")
        assert result["taxDue"] > 0
        assert result["refundAmount"] == 0

    def test_interest_on_refund(self):
        result = calculate_refund(500_000, 200_000, 0, 0, "new")
        if result["refundAmount"] > 0:
            assert result["interestOnRefund"] > 0


class TestProfessionalTax:
    def test_maharashtra_above_10k(self):
        result = calculate_professional_tax(50_000, "maharashtra")
        assert result["monthlyTax"] == 200
        assert result["februaryTax"] == 300
        assert result["annualTax"] == 2500

    def test_maharashtra_below_7500(self):
        result = calculate_professional_tax(5_000, "maharashtra")
        assert result["monthlyTax"] == 0
        assert result["annualTax"] == 100  # February extra ₹100 still applies

    def test_unknown_state(self):
        result = calculate_professional_tax(50_000, "delhi")
        assert result["monthlyTax"] == 0

    def test_slab_table(self):
        result = calculate_professional_tax(50_000, "karnataka")
        assert len(result["slabs"]) > 0
