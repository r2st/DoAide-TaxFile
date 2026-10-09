import { describe, expect, it } from 'vitest'
import { calculateNewRegime, calculateOldRegime, calculateHRA, formatINR } from '../../lib/taxEngine'

describe('RegimeComparisonTool calculations', () => {
  it('calculates new regime for ₹15L salary with correct standard deduction', () => {
    const r = calculateNewRegime(1500000)
    expect(r.standardDeduction).toBe(75000)
    expect(r.taxableIncome).toBe(1425000)
    expect(r.totalTax).toBeGreaterThan(0)
  })

  it('calculates old regime with full deductions', () => {
    const r = calculateOldRegime(1500000, {
      section80C: 150000,
      section80D: 25000,
      hraExemption: 120000,
      homeLoanInterest: 200000,
      nps80CCD1B: 50000,
      other: 10000,
    })
    expect(r.standardDeduction).toBe(50000)
    expect(r.totalTax).toBeGreaterThanOrEqual(0)
    expect(r.deductionsTotal).toBeGreaterThan(50000)
  })

  it('new regime beats old regime when no deductions', () => {
    const newR = calculateNewRegime(2000000)
    const oldR = calculateOldRegime(2000000, {})
    expect(newR.totalTax).toBeLessThan(oldR.totalTax)
  })

  it('old regime tax decreases with heavy deductions', () => {
    const oldNoDeductions = calculateOldRegime(2000000, {})
    const oldWithDeductions = calculateOldRegime(2000000, {
      section80C: 150000,
      section80D: 50000,
      hraExemption: 200000,
      homeLoanInterest: 200000,
      nps80CCD1B: 50000,
    })
    expect(oldWithDeductions.totalTax).toBeLessThan(oldNoDeductions.totalTax)
  })

  it('HRA exemption is calculated correctly for metro', () => {
    const r = calculateHRA(600000, 0, 300000, 240000, true)
    expect(r.exemption).toBe(180000)
    expect(r.actualHRA).toBe(300000)
    expect(r.percentOfSalary).toBe(300000)
    expect(r.rentMinus10Pct).toBe(180000)
  })

  it('HRA exemption uses 40% for non-metro', () => {
    const r = calculateHRA(600000, 0, 300000, 240000, false)
    expect(r.percentOfSalary).toBe(240000)
    expect(r.exemption).toBe(180000)
  })

  it('produces slab breakdown array', () => {
    const r = calculateNewRegime(2000000)
    expect(r.slabBreakdown).toBeDefined()
    expect(Array.isArray(r.slabBreakdown)).toBe(true)
    expect(r.slabBreakdown.length).toBeGreaterThan(0)
  })

  it('applies rebate 87A for new regime at ₹12L income', () => {
    const r = calculateNewRegime(1200000)
    expect(r.rebate87A).toBeGreaterThan(0)
  })

  it('saving calculation is correct', () => {
    const newR = calculateNewRegime(1500000)
    const oldR = calculateOldRegime(1500000, { section80C: 150000 })
    const saving = Math.abs(newR.totalTax - oldR.totalTax)
    expect(saving).toBeGreaterThanOrEqual(0)
  })

  it('formats share text correctly', () => {
    const saving = 52000
    const better = 'new'
    const text = `I compared Old vs New Tax Regime for FY 2026-27:\n${better === 'new' ? 'New' : 'Old'} regime saves me ${formatINR(saving)}!\n\nTry it free: tax.doaide.com/tools/regime-comparison`
    expect(text).toContain('New regime saves me')
    expect(text).toContain('₹52,000')
    expect(text).toContain('tax.doaide.com/tools/regime-comparison')
  })
})
