import { describe, it, expect } from 'vitest'
import {
  formatINR,
  calculateNewRegime,
  calculateOldRegime,
  calculateHRA,
  selectITRForm,
  plan80C,
  calculateCapitalGains,
  calculateTDS,
  calculateAdvanceTax,
  calculateNPSBenefit,
  calculateHomeLoanBenefit,
  calculateSeniorCitizenTax,
  calculateStandardDeductions,
  generateRentReceipt,
  calculateTakeHomeSalary,
  calculateGratuity,
  calculatePPF,
  calculateSIP,
  calculateFD,
  calculateMutualFund,
  calculateEMI,
  calculateCompoundInterest,
  calculateSection80D,
  calculateSalaryOptimizer,
  calculateSSY,
  calculateEPF,
  compareELSSvsPPFvsFD,
  calculateTaxLossHarvesting,
  calculateRefund,
  calculateProfessionalTax,
} from './taxEngine'

describe('formatINR', () => {
  it('formats with Indian grouping', () => {
    expect(formatINR(1234567)).toBe('₹12,34,567')
  })
  it('handles zero', () => {
    expect(formatINR(0)).toBe('₹0')
  })
  it('handles null', () => {
    expect(formatINR(null)).toBe('—')
  })
})

describe('calculateNewRegime', () => {
  it('returns zero tax for income below standard deduction', () => {
    const r = calculateNewRegime(50000)
    expect(r.totalTax).toBe(0)
  })

  it('applies full rebate at ₹12L', () => {
    const r = calculateNewRegime(1200000)
    expect(r.rebate87A).toBeGreaterThan(0)
    expect(r.totalTax).toBe(0)
  })

  it('applies full rebate at ₹12.75L (taxable = 12L)', () => {
    const r = calculateNewRegime(1275000)
    expect(r.taxableIncome).toBe(1200000)
    expect(r.totalTax).toBe(0)
  })

  it('charges tax at ₹15L', () => {
    const r = calculateNewRegime(1500000)
    expect(r.taxableIncome).toBe(1425000)
    expect(r.totalTax).toBeGreaterThan(0)
  })

  it('applies surcharge for high income', () => {
    const r = calculateNewRegime(6000000)
    expect(r.surcharge).toBeGreaterThan(0)
  })
})

describe('calculateOldRegime', () => {
  it('returns zero tax below exemption', () => {
    const r = calculateOldRegime(200000)
    expect(r.totalTax).toBe(0)
  })

  it('applies 80C deduction', () => {
    const no80c = calculateOldRegime(1000000)
    const with80c = calculateOldRegime(1000000, { section80C: 150000 })
    expect(with80c.totalTax).toBeLessThan(no80c.totalTax)
  })

  it('caps 80C at ₹1.5L', () => {
    const r = calculateOldRegime(1000000, { section80C: 300000 })
    expect(r.section80C).toBe(150000)
  })

  it('caps home loan interest at ₹2L', () => {
    const r = calculateOldRegime(1000000, { homeLoanInterest: 500000 })
    expect(r.homeLoanInterest).toBe(200000)
  })
})

describe('calculateHRA', () => {
  it('calculates metro exemption', () => {
    const r = calculateHRA(500000, 0, 200000, 180000, true)
    expect(r.exemption).toBe(130000)
  })

  it('returns 0 for zero rent', () => {
    const r = calculateHRA(500000, 0, 200000, 0, true)
    expect(r.exemption).toBe(0)
  })
})

describe('selectITRForm', () => {
  it('returns ITR-1 for simple salaried', () => {
    const r = selectITRForm({ hasSalary: true, totalIncome: 800000 })
    expect(r.form).toBe('ITR-1')
  })

  it('returns ITR-2 for capital gains', () => {
    const r = selectITRForm({ hasCapitalGains: true })
    expect(r.form).toBe('ITR-2')
  })

  it('returns ITR-3 for business income', () => {
    const r = selectITRForm({ hasBusinessIncome: true })
    expect(r.form).toBe('ITR-3')
  })

  it('returns ITR-4 for presumptive', () => {
    const r = selectITRForm({ hasBusinessIncome: true, isPresumptiveTax: true, totalIncome: 3000000 })
    expect(r.form).toBe('ITR-4')
  })
})

describe('plan80C', () => {
  it('tracks remaining limit', () => {
    const r = plan80C({ ppf: 50000, elss: 30000 })
    expect(r.remaining80C).toBe(70000)
  })

  it('caps at ₹1.5L', () => {
    const r = plan80C({ ppf: 100000, elss: 100000 })
    expect(r.capped80C).toBe(150000)
  })
})

describe('calculateCapitalGains', () => {
  it('identifies LTCG for equity > 12 months', () => {
    const r = calculateCapitalGains('equity', 100000, 300000, 15)
    expect(r.gainType).toBe('LTCG')
    expect(r.exemption).toBe(125000)
  })

  it('identifies STCG for equity < 12 months', () => {
    const r = calculateCapitalGains('equity', 100000, 300000, 6)
    expect(r.gainType).toBe('STCG')
    expect(r.rate).toBe(0.20)
  })
})

describe('calculateTDS', () => {
  it('calculates professional fees TDS', () => {
    const r = calculateTDS('professional_fees', 100000)
    expect(r.tds).toBe(10000)
  })

  it('returns 0 below threshold', () => {
    const r = calculateTDS('professional_fees', 20000)
    expect(r.tds).toBe(0)
  })
})

describe('calculateAdvanceTax', () => {
  it('returns not applicable below ₹10K', () => {
    const r = calculateAdvanceTax(8000, 0)
    expect(r.applicable).toBe(false)
  })

  it('splits into 4 installments', () => {
    const r = calculateAdvanceTax(100000, 20000)
    expect(r.applicable).toBe(true)
    expect(r.installments).toHaveLength(4)
  })
})

describe('calculateNPSBenefit', () => {
  it('calculates basic contributions', () => {
    const r = calculateNPSBenefit(50000, 0, 1000000)
    expect(r.deduction80CCD1).toBe(50000)
    expect(r.deduction80CCD1B).toBe(50000)
  })

  it('caps 80CCD(1) at 10% of income', () => {
    const r = calculateNPSBenefit(200000, 0, 1000000)
    expect(r.deduction80CCD1).toBe(100000)
  })

  it('caps 80CCD(1B) at ₹50K', () => {
    const r = calculateNPSBenefit(100000, 0, 1000000)
    expect(r.deduction80CCD1B).toBe(50000)
  })

  it('includes employer contribution capped at 14%', () => {
    const r = calculateNPSBenefit(50000, 200000, 1000000)
    expect(r.deduction80CCD2).toBe(140000)
  })

  it('projects retirement corpus', () => {
    const r = calculateNPSBenefit(50000, 0, 1000000, 30)
    expect(r.yearsToRetire).toBe(30)
    expect(r.estimatedCorpus).toBeGreaterThan(0)
  })
})

describe('calculateHomeLoanBenefit', () => {
  it('caps interest at ₹2L for self-occupied', () => {
    const r = calculateHomeLoanBenefit(100000, 300000, 5000000)
    expect(r.section24b).toBe(200000)
  })

  it('allows full interest for let-out', () => {
    const r = calculateHomeLoanBenefit(100000, 300000, 5000000, true)
    expect(r.section24b).toBe(300000)
  })

  it('gives 80EEA for first-time buyer', () => {
    const r = calculateHomeLoanBenefit(100000, 300000, 3000000, false, true, 4000000)
    expect(r.section80EEA).toBe(100000)
  })

  it('denies 80EEA for high-value property', () => {
    const r = calculateHomeLoanBenefit(100000, 300000, 3000000, false, true, 5000000)
    expect(r.section80EEA).toBe(0)
  })

  it('caps principal at ₹1.5L', () => {
    const r = calculateHomeLoanBenefit(200000, 100000, 5000000)
    expect(r.section80C).toBe(150000)
  })
})

describe('calculateSeniorCitizenTax', () => {
  it('senior gets higher exemption', () => {
    const r = calculateSeniorCitizenTax(400000, 65)
    expect(r.totalTaxOld).toBe(0)
    expect(r.category).toBe('Senior Citizen (60-79)')
  })

  it('super senior gets ₹5L exemption', () => {
    const r = calculateSeniorCitizenTax(500000, 82)
    expect(r.totalTaxOld).toBe(0)
    expect(r.category).toBe('Super Senior Citizen (80+)')
  })

  it('compares regimes', () => {
    const r = calculateSeniorCitizenTax(1500000, 65, { section80C: 150000 })
    expect(['new', 'old']).toContain(r.recommended)
    expect(r.savings).toBeGreaterThanOrEqual(0)
  })

  it('includes special benefits', () => {
    const r = calculateSeniorCitizenTax(800000, 65)
    expect(r.specialBenefits.some(b => b.includes('80TTB'))).toBe(true)
  })

  it('new regime is age-independent', () => {
    const s = calculateSeniorCitizenTax(1500000, 65)
    const ss = calculateSeniorCitizenTax(1500000, 85)
    expect(s.totalTaxNew).toBe(ss.totalTaxNew)
  })
})

describe('calculateStandardDeductions', () => {
  it('caps 80C at ₹1.5L', () => {
    const r = calculateStandardDeductions({ section80C: 200000 })
    expect(r.section80C).toBe(150000)
  })

  it('caps NPS 80CCD(1B) at ₹50K', () => {
    const r = calculateStandardDeductions({ nps80CCD1B: 80000 })
    expect(r.nps80CCD1B).toBe(50000)
  })

  it('returns total deductions', () => {
    const r = calculateStandardDeductions({ section80C: 150000, section80D: 25000 })
    expect(r.totalDeductions).toBe(225000)
  })
})

describe('generateRentReceipt', () => {
  it('generates receipts for month range', () => {
    const r = generateRentReceipt({
      tenantName: 'Test User',
      landlordName: 'Landlord',
      landlordPAN: 'ABCDE1234F',
      address: '123 Street',
      rentAmount: 20000,
      fromMonth: 0,
      toMonth: 2,
      year: 2026,
    })
    expect(r.receipts).toHaveLength(3)
    expect(r.totalRent).toBe(60000)
  })

  it('includes receipt details', () => {
    const r = generateRentReceipt({
      tenantName: 'Test',
      landlordName: 'Landlord',
      landlordPAN: 'ABCDE1234F',
      address: 'Address',
      rentAmount: 15000,
      fromMonth: 0,
      toMonth: 0,
      year: 2026,
    })
    expect(r.receipts[0].amount).toBe(15000)
    expect(r.receipts[0].tenantName).toBe('Test')
    expect(r.receipts[0].month).toBe('April')
  })
})

describe('calculateTakeHomeSalary', () => {
  it('computes basic as 40% of CTC', () => {
    const r = calculateTakeHomeSalary(1200000)
    expect(r.basic).toBe(480000)
  })

  it('returns positive monthly in-hand', () => {
    const r = calculateTakeHomeSalary(1000000)
    expect(r.monthlyInHand).toBeGreaterThan(0)
  })

  it('CTC components sum roughly to CTC', () => {
    const r = calculateTakeHomeSalary(1500000)
    const components = r.basic + r.hra + r.specialAllowance + r.employerPF + r.gratuity
    expect(Math.abs(components - 1500000)).toBeLessThan(2)
  })

  it('applies metro HRA rate', () => {
    const metro = calculateTakeHomeSalary(1200000, true)
    const nonMetro = calculateTakeHomeSalary(1200000, false)
    expect(metro.hra).toBeGreaterThan(nonMetro.hra)
  })
})

describe('calculateGratuity', () => {
  it('calculates private employee gratuity', () => {
    const r = calculateGratuity(50000, 10)
    expect(r.gratuityAmount).toBe(Math.round((50000 * 10 * 15) / 26))
  })

  it('calculates government employee gratuity', () => {
    const r = calculateGratuity(50000, 10, true)
    expect(r.gratuityAmount).toBe(Math.round((50000 * 10 * 15) / 30))
  })

  it('marks ineligible under 5 years', () => {
    const r = calculateGratuity(50000, 3)
    expect(r.eligible).toBe(false)
  })

  it('caps exemption at ₹20L', () => {
    const r = calculateGratuity(200000, 30)
    expect(r.exemptAmount).toBeLessThanOrEqual(2000000)
    expect(r.taxableAmount).toBeGreaterThan(0)
  })
})

describe('calculatePPF', () => {
  it('generates schedule for all years', () => {
    const r = calculatePPF(150000, 0, 15)
    expect(r.schedule).toHaveLength(15)
  })

  it('maturity exceeds total invested', () => {
    const r = calculatePPF(150000, 0, 15)
    expect(r.maturityAmount).toBeGreaterThan(r.totalInvested)
  })

  it('includes existing balance', () => {
    const r = calculatePPF(100000, 500000, 5)
    expect(r.maturityAmount).toBeGreaterThan(500000 + 100000 * 5)
  })
})

describe('calculateSIP', () => {
  it('calculates basic SIP', () => {
    const r = calculateSIP(10000, 12, 10)
    expect(r.totalInvested).toBe(1200000)
    expect(r.futureValue).toBeGreaterThan(1200000)
  })

  it('step-up increases total invested', () => {
    const noStep = calculateSIP(10000, 12, 10, 0)
    const withStep = calculateSIP(10000, 12, 10, 10)
    expect(withStep.totalInvested).toBeGreaterThan(noStep.totalInvested)
    expect(withStep.futureValue).toBeGreaterThan(noStep.futureValue)
  })

  it('zero return returns invested amount', () => {
    const r = calculateSIP(10000, 0, 5)
    expect(r.futureValue).toBe(r.totalInvested)
  })
})

describe('calculateFD', () => {
  it('calculates maturity with quarterly compounding', () => {
    const r = calculateFD(1000000, 7, 5, 4)
    expect(r.maturityAmount).toBeGreaterThan(1000000)
    expect(r.totalInterest).toBeGreaterThan(0)
  })

  it('applies TDS above threshold', () => {
    const r = calculateFD(1000000, 8, 5, 4)
    expect(r.tdsApplicable).toBe(true)
    expect(r.tdsAmount).toBeGreaterThan(0)
  })

  it('higher threshold for seniors', () => {
    const regular = calculateFD(500000, 7, 1, 4)
    const senior = calculateFD(500000, 7, 1, 4, true)
    expect(senior.tdsThreshold).toBeGreaterThan(regular.tdsThreshold)
  })
})

describe('calculateMutualFund', () => {
  it('calculates lumpsum returns', () => {
    const r = calculateMutualFund('lumpsum', 100000, 12, 10)
    expect(r.investmentType).toBe('lumpsum')
    expect(r.futureValue).toBeGreaterThan(100000)
    expect(r.cagr).toBeCloseTo(12, 0)
  })

  it('calculates SIP returns', () => {
    const r = calculateMutualFund('sip', 10000, 12, 10)
    expect(r.investmentType).toBe('sip')
    expect(r.totalInvested).toBe(1200000)
  })

  it('returns positive absolute return', () => {
    const r = calculateMutualFund('lumpsum', 100000, 10, 5)
    expect(r.absoluteReturn).toBeGreaterThan(0)
  })
})

describe('calculateEMI', () => {
  it('calculates monthly EMI', () => {
    const r = calculateEMI(5000000, 8.5, 20)
    expect(r.emi).toBeGreaterThan(0)
    expect(r.totalInterest).toBeGreaterThan(0)
  })

  it('total payment = principal + interest', () => {
    const r = calculateEMI(3000000, 9, 15)
    expect(r.totalPayment).toBe(r.loanAmount + r.totalInterest)
  })

  it('generates amortization schedule', () => {
    const r = calculateEMI(1000000, 10, 10)
    expect(r.schedule).toHaveLength(10)
    expect(r.schedule[0].principalPaid).toBeGreaterThan(0)
    expect(r.schedule[0].interestPaid).toBeGreaterThan(0)
  })

  it('balance reaches near zero at end', () => {
    const r = calculateEMI(1000000, 8, 5)
    expect(r.schedule[r.schedule.length - 1].balance).toBeLessThan(100)
  })
})

describe('calculateCompoundInterest', () => {
  it('compound > simple interest', () => {
    const r = calculateCompoundInterest(100000, 10, 5)
    expect(r.totalInterest).toBeGreaterThan(r.simpleInterest)
    expect(r.compoundingBenefit).toBeGreaterThan(0)
  })

  it('more frequent compounding gives higher returns', () => {
    const annual = calculateCompoundInterest(100000, 10, 5, 1)
    const monthly = calculateCompoundInterest(100000, 10, 5, 12)
    expect(monthly.totalAmount).toBeGreaterThan(annual.totalAmount)
  })

  it('generates yearly breakdown', () => {
    const r = calculateCompoundInterest(100000, 8, 10, 4)
    expect(r.yearlyBreakdown).toHaveLength(10)
    expect(r.yearlyBreakdown[0].balance).toBeGreaterThan(100000)
  })
})

describe('calculateSection80D', () => {
  it('caps self+family at ₹25K for non-senior', () => {
    const r = calculateSection80D(30000, 0, 0, 0, false)
    expect(r.selfDeduction).toBe(25000)
  })

  it('caps self+family at ₹50K for senior', () => {
    const r = calculateSection80D(60000, 0, 0, 0, true)
    expect(r.selfDeduction).toBe(50000)
  })

  it('adds parents deduction separately', () => {
    const r = calculateSection80D(20000, 0, 0, 30000, false, true)
    expect(r.parentsDeduction).toBe(30000)
    expect(r.totalDeduction).toBe(20000 + 30000)
  })

  it('includes preventive checkup in limit', () => {
    const r = calculateSection80D(22000, 0, 0, 0, false, false, 5000)
    expect(r.selfDeduction).toBe(25000)
  })

  it('calculates tax savings', () => {
    const r = calculateSection80D(25000, 0, 0, 25000, false, false, 0)
    expect(r.taxSavingHighSlab).toBeGreaterThan(0)
  })
})

describe('calculateSalaryOptimizer', () => {
  it('returns 3 structures', () => {
    const r = calculateSalaryOptimizer(1200000)
    expect(r.structures).toHaveLength(3)
  })

  it('identifies best structure', () => {
    const r = calculateSalaryOptimizer(1500000)
    expect(r.recommended).toBeTruthy()
    expect(r.bestMonthlyInHand).toBeGreaterThan(0)
  })

  it('all structures have positive monthly in-hand', () => {
    const r = calculateSalaryOptimizer(2000000)
    r.structures.forEach(s => {
      expect(s.monthlyInHandEstimate).toBeGreaterThan(0)
    })
  })
})

describe('calculateSSY', () => {
  it('calculates maturity amount for girl age 1', () => {
    const r = calculateSSY(150000, 0, 1, 8.2)
    expect(r.maturityAmount).toBeGreaterThan(0)
    expect(r.depositYears).toBe(15)
    expect(r.schedule).toHaveLength(21)
  })

  it('caps investment at 2.5L', () => {
    const r = calculateSSY(300000, 0, 1, 8.2)
    expect(r.annualInvestment).toBe(250000)
  })

  it('handles existing balance', () => {
    const r = calculateSSY(100000, 500000, 5, 8.2)
    expect(r.maturityAmount).toBeGreaterThan(500000)
  })
})

describe('calculateEPF', () => {
  it('calculates retirement corpus', () => {
    const r = calculateEPF(600000, 12, 12, 0, 25, 8.25)
    expect(r.employeeMonthly).toBe(6000)
    expect(r.maturityAmount).toBeGreaterThan(0)
    expect(r.schedule).toHaveLength(25)
  })

  it('caps pension contribution at 15K monthly basic', () => {
    const r = calculateEPF(600000, 12, 12, 0, 1, 8.25)
    expect(r.employerPensionMonthly).toBe(Math.round(15000 * 8.33 / 100))
  })

  it('employer EPF monthly = total PF - pension', () => {
    const r = calculateEPF(600000, 12, 12, 0, 1, 8.25)
    const totalPF = Math.round(50000 * 12 / 100)
    expect(r.employerEPFMonthly).toBe(totalPF - r.employerPensionMonthly)
  })
})

describe('compareELSSvsPPFvsFD', () => {
  it('returns three investment options', () => {
    const r = compareELSSvsPPFvsFD(150000, 10, 0.30, 7.0, 12.0, 7.1)
    expect(r.investments).toHaveLength(3)
    expect(r.bestOption).toBeTruthy()
  })

  it('ELSS after-tax should be less than or equal to pre-return', () => {
    const r = compareELSSvsPPFvsFD(150000, 10, 0.30, 7.0, 12.0, 7.1)
    const elss = r.investments.find(i => i.name === 'ELSS')
    expect(elss.afterTaxReturn).toBeLessThanOrEqual(elss.preReturn)
  })

  it('PPF is tax-free', () => {
    const r = compareELSSvsPPFvsFD(150000, 10, 0.30, 7.0, 12.0, 7.1)
    const ppf = r.investments.find(i => i.name === 'PPF')
    expect(ppf.tax).toBe(0)
    expect(ppf.afterTaxReturn).toBe(ppf.preReturn)
  })

  it('FD has tax deducted', () => {
    const r = compareELSSvsPPFvsFD(150000, 10, 0.30, 7.0, 12.0, 7.1)
    const fd = r.investments.find(i => i.name === 'Tax Saver FD')
    expect(fd.tax).toBeGreaterThan(0)
  })
})

describe('calculateTaxLossHarvesting', () => {
  it('LTCG savings when losses offset gains', () => {
    const r = calculateTaxLossHarvesting(500000, 200000, 'LTCG')
    expect(r.taxSaved).toBeGreaterThan(0)
    expect(r.taxWithHarvesting).toBeLessThan(r.taxWithoutHarvesting)
  })

  it('carry forward excess losses', () => {
    const r = calculateTaxLossHarvesting(100000, 300000, 'LTCG')
    expect(r.carryForwardLoss).toBe(200000)
  })

  it('STCG calculation', () => {
    const r = calculateTaxLossHarvesting(500000, 100000, 'STCG')
    expect(r.gainType).toBe('STCG')
    expect(r.taxSaved).toBeGreaterThan(0)
  })
})

describe('calculateRefund', () => {
  it('refund when TDS exceeds liability', () => {
    const r = calculateRefund(800000, 100000, 0, 0, 'new')
    expect(r.refundAmount).toBeGreaterThan(0)
    expect(r.taxDue).toBe(0)
  })

  it('tax due when TDS is less than liability', () => {
    const r = calculateRefund(2000000, 10000, 0, 0, 'new')
    expect(r.taxDue).toBeGreaterThan(0)
    expect(r.refundAmount).toBe(0)
  })

  it('includes interest estimate on refund', () => {
    const r = calculateRefund(500000, 200000, 0, 0, 'new')
    if (r.refundAmount > 0) {
      expect(r.interestOnRefund).toBeGreaterThan(0)
    }
  })
})

describe('calculateProfessionalTax', () => {
  it('Maharashtra — salary above 10K', () => {
    const r = calculateProfessionalTax(50000, 'maharashtra')
    expect(r.monthlyTax).toBe(200)
    expect(r.februaryTax).toBe(300)
    expect(r.annualTax).toBe(2500)
  })

  it('Maharashtra — salary below 7500', () => {
    const r = calculateProfessionalTax(5000, 'maharashtra')
    expect(r.monthlyTax).toBe(0)
    expect(r.annualTax).toBe(0)
  })

  it('unknown state returns zero', () => {
    const r = calculateProfessionalTax(50000, 'delhi')
    expect(r.monthlyTax).toBe(0)
    expect(r.annualTax).toBe(0)
  })

  it('returns slab table', () => {
    const r = calculateProfessionalTax(50000, 'karnataka')
    expect(r.slabs.length).toBeGreaterThan(0)
  })
})
