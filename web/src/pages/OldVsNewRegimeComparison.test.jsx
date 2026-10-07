import { describe, expect, it } from 'vitest'
import { calculateNewRegime, calculateOldRegime, formatINR } from '../lib/taxEngine'

describe('OldVsNewRegimeComparison data', () => {
  it('calculates new regime correctly for ₹10L salary', () => {
    const r = calculateNewRegime(1000000)
    expect(r.totalTax).toBeGreaterThanOrEqual(0)
    expect(r.standardDeduction).toBe(75000)
    expect(r.taxableIncome).toBe(925000)
  })

  it('calculates old regime with deductions', () => {
    const r = calculateOldRegime(1000000, { section80C: 150000, section80D: 25000 })
    expect(r.totalTax).toBeGreaterThanOrEqual(0)
    expect(r.standardDeduction).toBe(50000)
    expect(r.section80C).toBe(150000)
    expect(r.section80D).toBe(25000)
  })

  it('new regime has zero tax below rebate threshold', () => {
    const r = calculateNewRegime(1200000)
    expect(r.rebate87A).toBeGreaterThan(0)
  })

  it('old regime 87A rebate applies for low income', () => {
    const r = calculateOldRegime(500000)
    expect(r.rebate87A).toBeGreaterThan(0)
    expect(r.totalTax).toBe(0)
  })

  it('comparison shows new regime better for no deductions', () => {
    const newR = calculateNewRegime(1500000)
    const oldR = calculateOldRegime(1500000, {})
    expect(newR.totalTax).toBeLessThan(oldR.totalTax)
  })

  it('old regime deductions reduce tax liability', () => {
    const oldNoDeductions = calculateOldRegime(2000000, {})
    const oldWithDeductions = calculateOldRegime(2000000, {
      section80C: 150000, section80D: 50000, hraExemption: 200000,
      homeLoanInterest: 200000, nps80CCD1B: 50000,
    })
    expect(oldWithDeductions.totalTax).toBeLessThan(oldNoDeductions.totalTax)
  })

  it('formatINR formats correctly', () => {
    expect(formatINR(100000)).toBe('₹1,00,000')
    expect(formatINR(0)).toBe('₹0')
  })
})
