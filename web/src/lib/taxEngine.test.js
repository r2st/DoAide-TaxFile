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
