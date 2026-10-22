import { describe, expect, it } from 'vitest'
import { computeCapitalGains, financialYearOf, isLongTerm, monthsHeld, ciiFor } from './capitalGains'

const base = { buyPrice: 500000, sellPrice: 750000, slabRate: 0.3 }

describe('holding period', () => {
  it('needs MORE than 12 months for listed equity to be long-term', () => {
    expect(isLongTerm('2025-06-01', '2026-06-01', 12)).toBe(false)
    expect(isLongTerm('2025-06-01', '2026-06-02', 12)).toBe(true)
  })

  it('counts whole months held', () => {
    expect(monthsHeld('2023-01-15', '2026-01-14')).toBe(35)
    expect(monthsHeld('2023-01-15', '2026-01-15')).toBe(36)
  })

  it('maps dates to financial years', () => {
    expect(financialYearOf('2026-03-31')).toBe(2025)
    expect(financialYearOf('2026-04-01')).toBe(2026)
  })

  it('flags CII for years not yet notified', () => {
    expect(ciiFor(2024)).toEqual({ value: 363 })
    expect(ciiFor(2030).estimated).toBe(true)
  })
})

describe('equity', () => {
  it('applies the ₹1.25 lakh 112A exemption and 12.5% LTCG', () => {
    const r = computeCapitalGains({ ...base, assetType: 'equity_mf', buyDate: '2023-01-01', sellDate: '2026-06-01' })
    expect(r.gainType).toBe('LTCG')
    expect(r.exemption).toBe(125000)
    expect(r.taxableGain).toBe(125000)
    expect(r.tax).toBe(15625)
    expect(r.totalTax).toBe(16250)
  })

  it('reduces the exemption by the amount already used this year', () => {
    const r = computeCapitalGains({ ...base, assetType: 'listed_equity', buyDate: '2023-01-01', sellDate: '2026-06-01', ltcgExemptionUsed: 100000 })
    expect(r.exemption).toBe(25000)
    expect(r.taxableGain).toBe(225000)
  })

  it('taxes short-term equity at 20%', () => {
    const r = computeCapitalGains({ assetType: 'listed_equity', buyDate: '2025-06-01', sellDate: '2026-06-01', buyPrice: 100000, sellPrice: 200000 })
    expect(r.gainType).toBe('STCG')
    expect(r.rate).toBe(0.2)
    expect(r.totalTax).toBe(20800)
  })
})

describe('crypto', () => {
  it('is a flat 30% regardless of holding period, with no exemption', () => {
    const r = computeCapitalGains({ assetType: 'crypto', buyDate: '2021-01-01', sellDate: '2026-01-01', buyPrice: 100000, sellPrice: 180000 })
    expect(r.gainType).toBe('VDA')
    expect(r.exemption).toBe(0)
    expect(r.totalTax).toBe(24960)
  })

  it('explains that crypto losses cannot be set off', () => {
    const r = computeCapitalGains({ assetType: 'crypto', buyDate: '2024-01-01', sellDate: '2026-01-01', buyPrice: 200000, sellPrice: 150000 })
    expect(r.totalTax).toBe(0)
    expect(r.lossNote).toMatch(/cannot be set off/)
  })
})

describe('debt funds', () => {
  it('treats units bought on/after 1 Apr 2023 as short-term at slab', () => {
    const r = computeCapitalGains({ assetType: 'debt_mf', buyDate: '2023-05-01', sellDate: '2026-06-01', buyPrice: 100000, sellPrice: 200000, slabRate: 0.3 })
    expect(r.gainType).toBe('STCG')
    expect(r.totalTax).toBe(31200)
  })

  it('allows 12.5% LTCG for older units held over 24 months', () => {
    const r = computeCapitalGains({ assetType: 'debt_mf', buyDate: '2022-01-01', sellDate: '2025-01-02', buyPrice: 100000, sellPrice: 200000 })
    expect(r.gainType).toBe('LTCG')
    expect(r.rate).toBe(0.125)
  })
})

describe('property', () => {
  it('picks 20% with indexation when lower for property bought before 23 Jul 2024', () => {
    const r = computeCapitalGains({ assetType: 'property', buyDate: '2002-06-01', sellDate: '2025-12-01', buyPrice: 1000000, sellPrice: 6000000 })
    expect(r.indexation.buyCII).toBe(105)
    expect(r.indexation.sellCII).toBe(376)
    expect(r.indexation.chosen).toBe('with')
    expect(r.taxableGain).toBe(2419048)
    expect(r.rate).toBe(0.2)
    expect(r.totalTax).toBe(503162)
  })

  it('keeps 12.5% without indexation when that is lower', () => {
    const r = computeCapitalGains({ assetType: 'property', buyDate: '2010-06-01', sellDate: '2026-06-01', buyPrice: 2000000, sellPrice: 10000000 })
    expect(r.indexation.chosen).toBe('without')
    expect(r.rate).toBe(0.125)
    expect(r.tax).toBe(1000000)
    expect(r.warnings.some(w => w.includes('not yet notified'))).toBe(true)
  })

  it('offers no indexation for property bought on/after 23 Jul 2024', () => {
    const r = computeCapitalGains({ assetType: 'property', buyDate: '2024-08-01', sellDate: '2026-09-01', buyPrice: 5000000, sellPrice: 6000000 })
    expect(r.gainType).toBe('LTCG')
    expect(r.indexation).toBeNull()
  })

  it('taxes short-term property gains at the slab rate', () => {
    const r = computeCapitalGains({ assetType: 'property', buyDate: '2025-01-01', sellDate: '2026-06-01', buyPrice: 5000000, sellPrice: 5500000, slabRate: 0.2 })
    expect(r.gainType).toBe('STCG')
    expect(r.tax).toBe(100000)
  })
})

describe('validation', () => {
  it('rejects a sale before the purchase', () => {
    expect(() => computeCapitalGains({ assetType: 'listed_equity', buyDate: '2026-01-01', sellDate: '2025-01-01', buyPrice: 1, sellPrice: 2 })).toThrow()
  })

  it('warns when the sale predates the July 2024 rate change', () => {
    const r = computeCapitalGains({ assetType: 'listed_equity', buyDate: '2022-01-01', sellDate: '2024-03-01', buyPrice: 1, sellPrice: 2 })
    expect(r.warnings[0]).toMatch(/23 Jul 2024/)
  })
})
