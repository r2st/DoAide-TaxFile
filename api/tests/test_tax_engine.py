from app.services.tax_engine import (
    calculate_advance_tax,
    calculate_capital_gains,
    calculate_hra_exemption,
    calculate_new_regime,
    calculate_old_regime,
    calculate_tds,
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
