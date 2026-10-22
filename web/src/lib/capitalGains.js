// Capital gains rules for transfers on or after 23 July 2024 (Finance (No. 2) Act 2024),
// which continue to apply for FY 2025-26 and FY 2026-27.

// Cost Inflation Index, keyed by the starting year of the financial year (2001 = FY 2001-02).
export const CII = {
  2001: 100, 2002: 105, 2003: 109, 2004: 113, 2005: 117, 2006: 122, 2007: 129,
  2008: 137, 2009: 148, 2010: 167, 2011: 184, 2012: 200, 2013: 220, 2014: 240,
  2015: 254, 2016: 264, 2017: 272, 2018: 280, 2019: 289, 2020: 301, 2021: 317,
  2022: 331, 2023: 348, 2024: 363, 2025: 376,
}
const CII_FIRST_YEAR = 2001
const CII_LATEST_YEAR = Math.max(...Object.keys(CII).map(Number))

export const LTCG_EQUITY_EXEMPTION = 125000
export const RULE_CHANGE_DATE = '2024-07-23'
export const DEBT_MF_CUTOFF_DATE = '2023-04-01'

// ltcgMonths: held MORE than this many months => long-term.
// stcg / ltcg: a rate, or 'slab' for the investor's slab rate.
export const ASSET_TYPES = {
  listed_equity: {
    label: 'Listed shares (STT paid)', ltcgMonths: 12, stcg: 0.20, ltcg: 0.125, equityExemption: true,
    sections: 'STCG u/s 111A @ 20%; LTCG u/s 112A @ 12.5% above ₹1.25 lakh',
  },
  equity_mf: {
    label: 'Equity mutual fund / equity ETF', ltcgMonths: 12, stcg: 0.20, ltcg: 0.125, equityExemption: true,
    sections: 'STCG u/s 111A @ 20%; LTCG u/s 112A @ 12.5% above ₹1.25 lakh',
  },
  debt_mf: {
    label: 'Debt mutual fund', ltcgMonths: 24, stcg: 'slab', ltcg: 0.125,
    sections: 'Units bought on/after 1 Apr 2023: always slab rate (Sec 50AA). Earlier units: LTCG @ 12.5% after 24 months',
  },
  listed_bonds: {
    label: 'Listed bonds / debentures', ltcgMonths: 12, stcg: 'slab', ltcg: 0.125,
    sections: 'LTCG u/s 112 @ 12.5% after 12 months; STCG at slab',
  },
  property: {
    label: 'Land / house property', ltcgMonths: 24, stcg: 'slab', ltcg: 0.125, indexationOption: true,
    sections: 'LTCG u/s 112 @ 12.5% without indexation, or 20% with indexation for property bought before 23 Jul 2024 (resident individual/HUF)',
  },
  physical_gold: {
    label: 'Physical gold / jewellery', ltcgMonths: 24, stcg: 'slab', ltcg: 0.125,
    sections: 'LTCG @ 12.5% after 24 months; STCG at slab',
  },
  gold_etf: {
    label: 'Gold ETF / SGB sold on exchange', ltcgMonths: 12, stcg: 'slab', ltcg: 0.125,
    sections: 'Listed units: LTCG @ 12.5% after 12 months; SGBs redeemed at maturity are tax-free',
  },
  unlisted_shares: {
    label: 'Unlisted shares / startup ESOPs', ltcgMonths: 24, stcg: 'slab', ltcg: 0.125,
    sections: 'LTCG u/s 112 @ 12.5% after 24 months; STCG at slab',
  },
  crypto: {
    label: 'Crypto / Virtual Digital Assets', ltcgMonths: null, stcg: 0.30, ltcg: 0.30, flatVDA: true,
    sections: 'Flat 30% u/s 115BBH regardless of holding period; no deduction except cost; losses cannot be set off',
  },
}

function parseDate(d) {
  if (d instanceof Date) return d
  const [y, m, day] = String(d).split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, day))
}

export function financialYearOf(date) {
  const d = parseDate(date)
  return d.getUTCMonth() >= 3 ? d.getUTCFullYear() : d.getUTCFullYear() - 1
}

export function fyLabel(startYear) {
  return `FY ${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`
}

export function monthsHeld(buyDate, sellDate) {
  const b = parseDate(buyDate)
  const s = parseDate(sellDate)
  let months = (s.getUTCFullYear() - b.getUTCFullYear()) * 12 + (s.getUTCMonth() - b.getUTCMonth())
  if (s.getUTCDate() < b.getUTCDate()) months -= 1
  return Math.max(months, 0)
}

// "Held for more than N months": long-term only once the sale date is after buyDate + N months.
export function isLongTerm(buyDate, sellDate, ltcgMonths) {
  if (ltcgMonths == null) return false
  const b = parseDate(buyDate)
  const threshold = new Date(Date.UTC(b.getUTCFullYear(), b.getUTCMonth() + ltcgMonths, b.getUTCDate()))
  return parseDate(sellDate) > threshold
}

export function ciiFor(fyStart) {
  if (fyStart < CII_FIRST_YEAR) return { value: CII[CII_FIRST_YEAR], clamped: true }
  if (fyStart > CII_LATEST_YEAR) return { value: CII[CII_LATEST_YEAR], estimated: true }
  return { value: CII[fyStart] }
}

const round = n => Math.round(n)

export function computeCapitalGains({
  assetType,
  buyDate,
  sellDate,
  buyPrice,
  sellPrice,
  transferExpenses = 0,
  improvementCost = 0,
  improvementDate = null,
  slabRate = 0.30,
  ltcgExemptionUsed = 0,
  residentIndividual = true,
}) {
  const asset = ASSET_TYPES[assetType]
  if (!asset) throw new Error(`Unknown asset type: ${assetType}`)
  const warnings = []
  if (parseDate(sellDate) < parseDate(buyDate)) throw new Error('Sale date is before purchase date')
  if (parseDate(sellDate) < parseDate(RULE_CHANGE_DATE)) {
    warnings.push('This sale is before 23 Jul 2024, when older rates (15% STCG, 10% LTCG, indexation) applied. Results use current rules.')
  }

  const months = monthsHeld(buyDate, sellDate)
  let longTerm = isLongTerm(buyDate, sellDate, asset.ltcgMonths)
  let stcgRate = asset.stcg
  const ltcgRate = asset.ltcg

  // Debt MF units bought on/after 1 Apr 2023 are always deemed short-term (Sec 50AA).
  if (assetType === 'debt_mf' && parseDate(buyDate) >= parseDate(DEBT_MF_CUTOFF_DATE)) {
    longTerm = false
    warnings.push('Debt fund units bought on or after 1 Apr 2023 are taxed at slab rate irrespective of holding period.')
  }

  const gain = sellPrice - buyPrice - improvementCost - transferExpenses
  const result = {
    assetType, assetLabel: asset.label, sections: asset.sections,
    monthsHeld: months, gainType: asset.flatVDA ? 'VDA' : longTerm ? 'LTCG' : 'STCG',
    saleValue: round(sellPrice), costOfAcquisition: round(buyPrice), improvementCost: round(improvementCost),
    transferExpenses: round(transferExpenses), gain: round(gain),
    exemption: 0, taxableGain: 0, rate: null, rateLabel: '', tax: 0, cess: 0, totalTax: 0,
    indexation: null, warnings, lossNote: null,
  }

  if (gain <= 0) {
    result.lossNote = asset.flatVDA
      ? 'Crypto/VDA losses cannot be set off against any income or carried forward.'
      : longTerm
        ? 'Long-term capital loss can be set off only against long-term gains, and carried forward for 8 years (file ITR on time).'
        : 'Short-term capital loss can be set off against both short- and long-term gains, and carried forward for 8 years (file ITR on time).'
    return result
  }

  const rateOf = r => (r === 'slab' ? slabRate : r)
  const labelOf = r => (r === 'slab' ? `slab rate (${Math.round(slabRate * 100)}%)` : `${+(r * 100).toFixed(1)}%`)

  if (asset.flatVDA) {
    result.taxableGain = round(gain)
    result.rate = 0.30
    result.rateLabel = '30% flat (Sec 115BBH)'
  } else if (!longTerm) {
    result.taxableGain = round(gain)
    result.rate = rateOf(stcgRate)
    result.rateLabel = labelOf(stcgRate)
  } else {
    let taxable = gain
    if (asset.equityExemption) {
      result.exemption = round(Math.min(Math.max(LTCG_EQUITY_EXEMPTION - ltcgExemptionUsed, 0), gain))
      taxable = gain - result.exemption
    }
    result.taxableGain = round(taxable)
    result.rate = ltcgRate
    result.rateLabel = labelOf(ltcgRate)

    if (asset.indexationOption && residentIndividual && parseDate(buyDate) < parseDate(RULE_CHANGE_DATE)) {
      const buyCII = ciiFor(financialYearOf(buyDate))
      const sellCII = ciiFor(financialYearOf(sellDate))
      const impCII = ciiFor(financialYearOf(improvementDate || buyDate))
      const indexedCost = buyPrice * sellCII.value / buyCII.value
      const indexedImprovement = improvementCost * sellCII.value / impCII.value
      const indexedGain = Math.max(sellPrice - indexedCost - indexedImprovement - transferExpenses, 0)
      const taxWithout = taxable * 0.125
      const taxWith = indexedGain * 0.20
      result.indexation = {
        buyCII: buyCII.value, sellCII: sellCII.value,
        indexedCost: round(indexedCost), indexedImprovement: round(indexedImprovement),
        indexedGain: round(indexedGain),
        taxWithoutIndexation: round(taxWithout), taxWithIndexation: round(taxWith),
        chosen: taxWith < taxWithout ? 'with' : 'without',
      }
      if (buyCII.clamped) warnings.push('Property bought before 1 Apr 2001: use its fair market value on 1 Apr 2001 as the purchase price.')
      if (sellCII.estimated) warnings.push(`CII for ${fyLabel(financialYearOf(sellDate))} is not yet notified; using ${fyLabel(CII_LATEST_YEAR)} CII (${CII[CII_LATEST_YEAR]}).`)
      if (taxWith < taxWithout) {
        result.taxableGain = round(indexedGain)
        result.rate = 0.20
        result.rateLabel = '20% with indexation (grandfathered option)'
      }
    }
  }

  result.tax = round(result.taxableGain * result.rate)
  result.cess = round(result.tax * 0.04)
  result.totalTax = result.tax + result.cess
  return result
}
