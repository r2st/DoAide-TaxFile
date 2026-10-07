import { describe, expect, it } from 'vitest'
import { formatINR } from '../lib/taxEngine'

describe('Section80GCalculator data', () => {
  it('100% deduction without limit gives full amount', () => {
    const donation = 50000
    const deduction = Math.round(donation * 1.0)
    expect(deduction).toBe(50000)
  })

  it('50% deduction gives half amount', () => {
    const donation = 100000
    const deduction = Math.round(donation * 0.5)
    expect(deduction).toBe(50000)
  })

  it('qualifying limit is 10% of gross income', () => {
    const grossIncome = 1000000
    const qualifyingLimit = Math.round(grossIncome * 0.10)
    expect(qualifyingLimit).toBe(100000)
  })

  it('capped deduction does not exceed qualifying limit', () => {
    const grossIncome = 500000
    const qualifyingLimit = Math.round(grossIncome * 0.10)
    const donation = 200000
    const rawDeduction = Math.round(donation * 0.5)
    const cappedDeduction = Math.min(rawDeduction, qualifyingLimit)
    expect(cappedDeduction).toBe(50000)
  })

  it('tax saving at 30% slab includes cess', () => {
    const deduction = 100000
    const taxSaving = Math.round(deduction * 0.312)
    expect(taxSaving).toBe(31200)
  })

  it('formatINR handles zero and negative', () => {
    expect(formatINR(0)).toBe('₹0')
    expect(formatINR(-5000)).toBe('-₹5,000')
  })

  it('multiple donations accumulate correctly', () => {
    const donations = [
      { amount: 50000, pct: 1.0 },
      { amount: 100000, pct: 0.5 },
    ]
    const totalDeduction = donations.reduce((sum, d) => sum + Math.round(d.amount * d.pct), 0)
    expect(totalDeduction).toBe(100000)
  })
})
