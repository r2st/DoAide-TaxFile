import { describe, expect, it } from 'vitest'
import { calculateHRA, formatINR } from '../../lib/taxEngine'

describe('HRACalculatorTool calculations', () => {
  it('calculates HRA for metro city correctly', () => {
    const r = calculateHRA(600000, 0, 300000, 240000, true)
    expect(r.actualHRA).toBe(300000)
    expect(r.percentOfSalary).toBe(300000)
    expect(r.rentMinus10Pct).toBe(180000)
    expect(r.exemption).toBe(180000)
    expect(r.taxableHRA).toBe(120000)
  })

  it('calculates HRA for non-metro city correctly', () => {
    const r = calculateHRA(960000, 0, 400000, 300000, false)
    expect(r.actualHRA).toBe(400000)
    expect(r.percentOfSalary).toBe(384000)
    expect(r.rentMinus10Pct).toBe(204000)
    expect(r.exemption).toBe(204000)
    expect(r.taxableHRA).toBe(196000)
  })

  it('includes DA in salary for calculation', () => {
    const r = calculateHRA(500000, 100000, 300000, 200000, true)
    expect(r.percentOfSalary).toBe(300000)
    expect(r.rentMinus10Pct).toBe(140000)
    expect(r.exemption).toBe(140000)
  })

  it('returns zero exemption when rent is less than 10% of salary', () => {
    const r = calculateHRA(1200000, 0, 300000, 100000, true)
    expect(r.rentMinus10Pct).toBeLessThanOrEqual(0)
    expect(r.exemption).toBe(0)
  })

  it('returns zero when no HRA received', () => {
    const r = calculateHRA(600000, 0, 0, 240000, true)
    expect(r.exemption).toBe(0)
  })

  it('uses 50% for metro and 40% for non-metro', () => {
    const metro = calculateHRA(1000000, 0, 500000, 400000, true)
    const nonMetro = calculateHRA(1000000, 0, 500000, 400000, false)
    expect(metro.percentOfSalary).toBe(500000)
    expect(nonMetro.percentOfSalary).toBe(400000)
  })

  it('exemption is minimum of all three limits', () => {
    const r = calculateHRA(600000, 0, 100000, 240000, true)
    const min = Math.min(r.actualHRA, r.percentOfSalary, r.rentMinus10Pct)
    expect(r.exemption).toBe(Math.max(0, min))
  })

  it('taxable HRA equals actual HRA minus exemption', () => {
    const r = calculateHRA(600000, 0, 300000, 240000, true)
    expect(r.taxableHRA).toBe(r.actualHRA - r.exemption)
  })

  it('tax impact at 30% slab is approximately 31.2% with cess', () => {
    const r = calculateHRA(600000, 0, 300000, 240000, true)
    const taxSaved30 = Math.round(r.exemption * 0.312)
    expect(taxSaved30).toBe(Math.round(180000 * 0.312))
  })

  it('formats share text correctly', () => {
    const r = calculateHRA(600000, 0, 300000, 240000, true)
    const text = `My HRA Exemption: ${formatINR(r.exemption)}\nTaxable HRA: ${formatINR(r.taxableHRA)}\n\nCalculate yours free: tax.doaide.com/tools/hra-calculator`
    expect(text).toContain('₹1,80,000')
    expect(text).toContain('tax.doaide.com/tools/hra-calculator')
  })
})
