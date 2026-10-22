import { describe, expect, it } from 'vitest'
import {
  calculateNewRegime, calculateOldRegime, compareRegimes, oldRegimeBreakEven, calculateHRADetailed,
} from './taxEngine'

describe('new regime 87A rebate and marginal relief', () => {
  it('makes ₹12.75 lakh salary tax-free', () => {
    expect(calculateNewRegime(1275000).totalTax).toBe(0)
  })

  it('caps tax at the income above ₹12 lakh just over the limit', () => {
    const r = calculateNewRegime(1285000)
    expect(r.taxableIncome).toBe(1210000)
    expect(r.marginalRelief).toBe(51500)
    expect(r.taxAfterRebate).toBe(10000)
    expect(r.totalTax).toBe(10400)
  })

  it('gives no marginal relief once normal tax is lower', () => {
    const r = calculateNewRegime(1475000)
    expect(r.marginalRelief).toBe(0)
    expect(r.totalTax).toBe(93600)
  })

  it('deducts employer NPS under 80CCD(2)', () => {
    const r = calculateNewRegime(1300000, { employerNps80CCD2: 50000 })
    expect(r.taxableIncome).toBe(1175000)
    expect(r.totalTax).toBe(0)
  })

  it('caps new regime surcharge at 25%', () => {
    const r = calculateNewRegime(55000000)
    expect(r.surcharge / r.taxOnIncome).toBeCloseTo(0.25, 3)
  })
})

describe('old regime', () => {
  it('applies surcharge marginal relief just above ₹50 lakh', () => {
    const r = calculateOldRegime(5060000)
    expect(r.taxableIncome).toBe(5010000)
    expect(r.surcharge).toBe(7000)
  })

  it('uses age-based basic exemption', () => {
    expect(calculateOldRegime(750000, { age: 30 }).totalTax).toBe(54600)
    expect(calculateOldRegime(750000, { age: 65 }).totalTax).toBe(52000)
    expect(calculateOldRegime(750000, { age: 85 }).totalTax).toBe(41600)
  })

  it('caps professional tax at ₹2,500 and adds employer NPS', () => {
    const r = calculateOldRegime(1000000, { professionalTax: 5000, employerNps80CCD2: 40000 })
    expect(r.professionalTax).toBe(2500)
    expect(r.deductionsTotal).toBe(50000 + 2500 + 40000)
  })
})

describe('compareRegimes', () => {
  it('recommends new regime with no deductions and reports the break-even', () => {
    const r = compareRegimes(1500000, {})
    expect(r.better).toBe('new')
    expect(r.saving).toBe(r.oldR.totalTax - r.newR.totalTax)
    const extra = r.breakEvenExtraDeductions
    expect(extra).toBeGreaterThan(0)
    expect(calculateOldRegime(1500000, { other: extra }).totalTax).toBeLessThanOrEqual(r.newR.totalTax)
    expect(calculateOldRegime(1500000, { other: extra - 2000 }).totalTax).toBeGreaterThan(r.newR.totalTax)
  })

  it('recommends old regime with heavy deductions', () => {
    const r = compareRegimes(2000000, {
      hraExemption: 300000, section80C: 150000, section80D: 50000, homeLoanInterest: 200000, nps80CCD1B: 50000,
    })
    expect(r.better).toBe('old')
    expect(r.breakEvenExtraDeductions).toBe(0)
  })

  it('returns 0 break-even when old already wins', () => {
    expect(oldRegimeBreakEven(2000000, { hraExemption: 600000, section80C: 150000, homeLoanInterest: 200000 })).toBe(0)
  })
})

describe('calculateHRADetailed', () => {
  it('annualises monthly inputs and finds the binding limit', () => {
    const r = calculateHRADetailed({ basicMonthly: 50000, hraMonthly: 25000, rentMonthly: 20000, isMetro: true })
    expect(r.exemption).toBe(180000)
    expect(r.monthlyExemption).toBe(15000)
    expect(r.binding).toBe('rentMinus10Pct')
    expect(r.optimalRentAnnual).toBe(360000)
    expect(r.landlordPANRequired).toBe(true)
  })

  it('handles part-year rent and estimates tax saved', () => {
    const r = calculateHRADetailed({ basicMonthly: 40000, hraMonthly: 16000, rentMonthly: 8000, isMetro: false, months: 6, slabRate: 0.2 })
    expect(r.exemption).toBe(24000)
    expect(r.landlordPANRequired).toBe(false)
    expect(r.taxSaved).toBe(Math.round(24000 * 0.2 * 1.04))
  })
})
