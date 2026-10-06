const NEW_REGIME_SLABS = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.10],
  [1600000, 0.15],
  [2000000, 0.20],
  [2400000, 0.25],
  [Infinity, 0.30],
]

const OLD_REGIME_SLABS = [
  [250000, 0],
  [500000, 0.05],
  [1000000, 0.20],
  [Infinity, 0.30],
]

const SURCHARGE_SLABS = [
  [5000000, 0],
  [10000000, 0.10],
  [20000000, 0.15],
  [50000000, 0.25],
  [Infinity, 0.37],
]

export function formatINR(amount) {
  if (amount == null) return '—'
  const num = Math.round(amount)
  const isNeg = num < 0
  const abs = Math.abs(num).toString()
  if (abs.length <= 3) return (isNeg ? '-' : '') + '₹' + abs
  let result = abs.slice(-3)
  let rest = abs.slice(0, -3)
  while (rest.length > 2) {
    result = rest.slice(-2) + ',' + result
    rest = rest.slice(0, -2)
  }
  if (rest.length > 0) result = rest + ',' + result
  return (isNeg ? '-' : '') + '₹' + result
}

export function formatPct(rate) {
  if (rate == null) return '—'
  return (rate * 100).toFixed(1).replace(/\.0$/, '') + '%'
}

function applySlabs(taxable, slabs) {
  let tax = 0
  let prev = 0
  const breakdown = []
  for (const [limit, rate] of slabs) {
    if (taxable <= prev) break
    const chunk = Math.min(taxable, limit) - prev
    const slabTax = Math.round(chunk * rate)
    tax += slabTax
    breakdown.push({ from: prev, to: Math.min(taxable, limit), rate, tax: slabTax })
    prev = limit
  }
  return { tax: Math.round(tax), breakdown }
}

function calcSurcharge(tax, totalIncome) {
  for (const [limit, rate] of SURCHARGE_SLABS) {
    if (totalIncome <= limit) return Math.round(tax * rate)
  }
  return Math.round(tax * 0.37)
}

export function calculateNewRegime(grossIncome) {
  const stdDeduction = Math.min(75000, grossIncome)
  const taxable = Math.max(grossIncome - stdDeduction, 0)
  const { tax, breakdown } = applySlabs(taxable, NEW_REGIME_SLABS)
  let rebate87A = 0
  if (taxable <= 1200000) rebate87A = Math.min(tax, 60000)
  const afterRebate = Math.max(tax - rebate87A, 0)
  const surcharge = calcSurcharge(afterRebate, grossIncome)
  const cess = Math.round((afterRebate + surcharge) * 0.04)
  const total = afterRebate + surcharge + cess

  return {
    regime: 'new',
    grossIncome: Math.round(grossIncome),
    standardDeduction: stdDeduction,
    deductionsTotal: stdDeduction,
    taxableIncome: Math.round(taxable),
    taxOnIncome: tax,
    slabBreakdown: breakdown,
    rebate87A,
    taxAfterRebate: afterRebate,
    surcharge,
    cess,
    totalTax: total,
  }
}

export function calculateOldRegime(grossIncome, deductions = {}) {
  const stdDeduction = Math.min(50000, grossIncome)
  const hra = deductions.hraExemption || 0
  const s80c = Math.min(deductions.section80C || 0, 150000)
  const s80d = deductions.section80D || 0
  const homeLoan = Math.min(deductions.homeLoanInterest || 0, 200000)
  const nps = Math.min(deductions.nps80CCD1B || 0, 50000)
  const other = deductions.other || 0
  const totalDed = stdDeduction + hra + s80c + s80d + homeLoan + nps + other
  const taxable = Math.max(grossIncome - totalDed, 0)
  const { tax, breakdown } = applySlabs(taxable, OLD_REGIME_SLABS)
  let rebate87A = 0
  if (taxable <= 500000) rebate87A = Math.min(tax, 12500)
  const afterRebate = Math.max(tax - rebate87A, 0)
  const surcharge = calcSurcharge(afterRebate, grossIncome)
  const cess = Math.round((afterRebate + surcharge) * 0.04)
  const total = afterRebate + surcharge + cess

  return {
    regime: 'old',
    grossIncome: Math.round(grossIncome),
    standardDeduction: stdDeduction,
    hraExemption: Math.round(hra),
    section80C: s80c,
    section80D: Math.round(s80d),
    homeLoanInterest: homeLoan,
    nps80CCD1B: nps,
    otherDeductions: Math.round(other),
    deductionsTotal: Math.round(totalDed),
    taxableIncome: Math.round(taxable),
    taxOnIncome: tax,
    slabBreakdown: breakdown,
    rebate87A,
    taxAfterRebate: afterRebate,
    surcharge,
    cess,
    totalTax: total,
  }
}

export function calculateHRA(basicSalary, da, hraReceived, rentPaid, isMetro) {
  const salary = basicSalary + da
  const metroPct = isMetro ? 0.50 : 0.40
  const c1 = hraReceived
  const c2 = Math.round(metroPct * salary)
  const c3 = Math.max(Math.round(rentPaid - 0.10 * salary), 0)
  const exemption = Math.max(Math.min(c1, c2, c3), 0)
  return {
    actualHRA: Math.round(hraReceived),
    percentOfSalary: c2,
    rentMinus10Pct: c3,
    exemption,
    taxableHRA: Math.round(Math.max(hraReceived - exemption, 0)),
  }
}

export function selectITRForm({
  hasSalary = true,
  hasBusinessIncome = false,
  hasCapitalGains = false,
  hasForeignAssets = false,
  hasCryptoIncome = false,
  totalIncome = 0,
  houseProperties = 1,
  isPresumptiveTax = false,
  isDirector = false,
  hasUnlistedShares = false,
} = {}) {
  if (hasBusinessIncome) {
    if (isPresumptiveTax && totalIncome <= 5000000) {
      return { form: 'ITR-4', name: 'Sugam', reason: 'Presumptive taxation under Section 44AD/44ADA/44AE with income up to ₹50 lakh.', deadline: 'July 31, 2027' }
    }
    return { form: 'ITR-3', name: 'Business/Profession', reason: 'Business or professional income not eligible for presumptive taxation.', deadline: 'July 31, 2027 (Oct 31 if audit required)' }
  }
  if (hasCapitalGains || hasForeignAssets || hasCryptoIncome || totalIncome > 5000000 || houseProperties > 2 || isDirector || hasUnlistedShares) {
    const reasons = []
    if (hasCapitalGains) reasons.push('capital gains')
    if (hasForeignAssets) reasons.push('foreign assets/income')
    if (hasCryptoIncome) reasons.push('crypto/VDA income')
    if (totalIncome > 5000000) reasons.push('income exceeds ₹50L')
    if (houseProperties > 2) reasons.push('more than 2 house properties')
    if (isDirector) reasons.push('director in a company')
    if (hasUnlistedShares) reasons.push('unlisted equity shares')
    return { form: 'ITR-2', name: 'Without Business Income', reason: `You have ${reasons.join(', ')}.`, deadline: 'July 31, 2027' }
  }
  return { form: 'ITR-1', name: 'Sahaj', reason: 'Salaried individual with income up to ₹50L, up to 2 house properties, no capital gains.', deadline: 'July 31, 2027' }
}

export const INVESTMENT_OPTIONS = [
  { name: 'PPF', returns: '7.1%', lockIn: '15 years', risk: 'Low', maxAnnual: '₹1,50,000' },
  { name: 'ELSS Mutual Funds', returns: '~12%', lockIn: '3 years', risk: 'High', maxAnnual: 'No limit' },
  { name: 'NSC', returns: '7.7%', lockIn: '5 years', risk: 'Low', maxAnnual: 'No limit' },
  { name: 'Tax Saver FD', returns: '6.5-7.5%', lockIn: '5 years', risk: 'Low', maxAnnual: 'No limit' },
  { name: 'SCSS', returns: '8.2%', lockIn: '5 years', risk: 'Low', maxAnnual: '₹30,00,000' },
  { name: 'Sukanya Samriddhi', returns: '8.2%', lockIn: '21 years', risk: 'Low', maxAnnual: '₹2,50,000' },
  { name: 'LIC Premium', returns: '~5-6%', lockIn: 'Varies', risk: 'Low', maxAnnual: 'Varies' },
  { name: 'Home Loan Principal', returns: 'N/A', lockIn: 'N/A', risk: 'N/A', maxAnnual: 'N/A' },
  { name: 'Tuition Fees', returns: 'N/A', lockIn: 'N/A', risk: 'N/A', maxAnnual: '2 children' },
  { name: 'NPS (80CCD 1B)', returns: '~9-12%', lockIn: 'Till 60', risk: 'Medium', maxAnnual: '₹50,000', separateLimit: true },
]

export function plan80C(investments) {
  const total = Object.entries(investments)
    .filter(([k]) => k !== 'nps80CCD1B')
    .reduce((sum, [, v]) => sum + (v || 0), 0)
  const capped = Math.min(total, 150000)
  const remaining = Math.max(150000 - total, 0)
  const nps = Math.min(investments.nps80CCD1B || 0, 50000)
  return { totalInvested: Math.round(total), capped80C: capped, remaining80C: remaining, nps80CCD1B: nps, npsRemaining: Math.max(50000 - nps, 0), totalDeduction: capped + nps }
}

const HOLDING_PERIODS = { equity: 12, debt: 24, real_estate: 24, gold: 24, crypto: 12 }
const LTCG_RATES = { equity: 0.125, debt: null, real_estate: 0.125, gold: 0.125, crypto: 0.125 }
const STCG_RATES = { equity: 0.20, debt: null, real_estate: null, gold: null, crypto: 0.20 }

export function calculateCapitalGains(assetType, purchasePrice, salePrice, holdingMonths) {
  const gain = salePrice - purchasePrice
  const threshold = HOLDING_PERIODS[assetType] || 24
  const isLTCG = holdingMonths >= threshold
  let rate, exemption = 0, taxableGain
  if (isLTCG) {
    rate = LTCG_RATES[assetType]
    if (assetType === 'equity') { exemption = 125000; taxableGain = Math.max(gain - exemption, 0) }
    else { taxableGain = Math.max(gain, 0) }
  } else {
    rate = STCG_RATES[assetType]
    taxableGain = Math.max(gain, 0)
  }
  const tax = rate != null ? Math.round(taxableGain * rate) : null
  const cess = tax != null ? Math.round(tax * 0.04) : null
  const total = tax != null ? tax + cess : null
  return { assetType, purchasePrice: Math.round(purchasePrice), salePrice: Math.round(salePrice), gain: Math.round(gain), holdingMonths, gainType: isLTCG ? 'LTCG' : 'STCG', exemption, taxableGain: Math.round(taxableGain), rate, tax, cess, totalTax: total, taxedAtSlab: rate == null }
}

const TDS_RATES = {
  salary: { rate: null, threshold: 0, section: '192' },
  interest_bank: { rate: 0.10, threshold: 40000, section: '194A' },
  interest_fd: { rate: 0.10, threshold: 40000, section: '194A' },
  rent_individual: { rate: 0.05, threshold: 600000, section: '194-IB' },
  rent_company: { rate: 0.10, threshold: 240000, section: '194-I' },
  professional_fees: { rate: 0.10, threshold: 30000, section: '194J' },
  commission: { rate: 0.05, threshold: 15000, section: '194H' },
  contractor_individual: { rate: 0.01, threshold: 30000, section: '194C' },
  contractor_company: { rate: 0.02, threshold: 30000, section: '194C' },
  lottery: { rate: 0.30, threshold: 10000, section: '194B' },
}

export function calculateTDS(incomeType, amount, hasPAN = true) {
  const info = TDS_RATES[incomeType]
  if (!info) return { error: 'Unknown income type' }
  if (info.rate == null) return { incomeType, amount: Math.round(amount), rate: null, tds: null, section: info.section, note: 'TDS on salary is deducted at slab rates by the employer.' }
  const rate = hasPAN ? info.rate : 0.20
  if (amount < info.threshold) return { incomeType, amount: Math.round(amount), rate, threshold: info.threshold, tds: 0, section: info.section, note: `Below TDS threshold of ${formatINR(info.threshold)}.` }
  return { incomeType, amount: Math.round(amount), rate, threshold: info.threshold, tds: Math.round(amount * rate), section: info.section, hasPAN }
}

export function calculateAdvanceTax(totalTax, tdsDeducted) {
  const netTax = Math.max(totalTax - tdsDeducted, 0)
  if (netTax < 10000) return { totalTax: Math.round(totalTax), tdsDeducted: Math.round(tdsDeducted), netTax: Math.round(netTax), applicable: false, installments: [] }
  return {
    totalTax: Math.round(totalTax),
    tdsDeducted: Math.round(tdsDeducted),
    netTax: Math.round(netTax),
    applicable: true,
    installments: [
      { dueDate: 'June 15, 2026', cumulativePct: 15, amount: Math.round(netTax * 0.15) },
      { dueDate: 'September 15, 2026', cumulativePct: 45, amount: Math.round(netTax * 0.30) },
      { dueDate: 'December 15, 2026', cumulativePct: 75, amount: Math.round(netTax * 0.30) },
      { dueDate: 'March 15, 2027', cumulativePct: 100, amount: Math.round(netTax * 0.25) },
    ],
  }
}

export function generateRecommendations(grossIncome, age, existing = {}) {
  const newResult = calculateNewRegime(grossIncome)
  const oldResult = calculateOldRegime(grossIncome, {
    hraExemption: existing.hraExemption || 0,
    section80C: existing.section80C || 0,
    section80D: existing.section80D || 0,
    homeLoanInterest: existing.homeLoanInterest || 0,
    nps80CCD1B: existing.nps80CCD1B || 0,
  })

  const suggestions = []
  const rem80C = Math.max(150000 - (existing.section80C || 0), 0)
  if (rem80C > 0) suggestions.push({ category: 'Section 80C', suggestion: `Invest ${formatINR(rem80C)} more in 80C instruments (PPF, ELSS, or NPS)`, saving: Math.round(rem80C * 0.312), priority: 'high' })
  const max80D = age >= 60 ? 50000 : 25000
  const rem80D = Math.max(max80D - (existing.section80D || 0), 0)
  if (rem80D > 0) suggestions.push({ category: 'Section 80D', suggestion: `Health insurance for ${formatINR(rem80D)} more deduction`, saving: Math.round(rem80D * 0.312), priority: 'high' })
  const remNPS = Math.max(50000 - (existing.nps80CCD1B || 0), 0)
  if (remNPS > 0) suggestions.push({ category: 'NPS (80CCD 1B)', suggestion: `Invest ${formatINR(remNPS)} in NPS for extra deduction beyond 80C`, saving: Math.round(remNPS * 0.312), priority: 'medium' })
  if (!(existing.homeLoanInterest > 0) && grossIncome > 1000000) suggestions.push({ category: 'Home Loan', suggestion: 'Home loan interest up to ₹2,00,000 deductible under Section 24(b)', saving: Math.round(200000 * 0.312), priority: 'low' })

  const better = newResult.totalTax <= oldResult.totalTax ? 'new' : 'old'
  suggestions.sort((a, b) => b.saving - a.saving)

  return { oldRegimeTax: oldResult.totalTax, newRegimeTax: newResult.totalTax, recommended: better, regimeSavings: Math.abs(newResult.totalTax - oldResult.totalTax), suggestions }
}

export function calculateNPSBenefit(annualContribution, employerContribution = 0, grossIncome = 0, age = 30) {
  const selfCapped80CCD1 = Math.min(annualContribution, grossIncome * 0.10)
  const additionalCapped1B = Math.min(annualContribution, 50000)
  const employerCapped80CCD2 = Math.min(employerContribution, grossIncome * 0.14)
  const totalDeduction = selfCapped80CCD1 + additionalCapped1B + employerCapped80CCD2
  const taxSaving30 = Math.round(totalDeduction * 0.312)
  const taxSaving20 = Math.round(totalDeduction * 0.208)
  const yearsToRetire = Math.max(60 - age, 0)
  const estimatedCorpus = yearsToRetire > 0
    ? Math.round((annualContribution + employerContribution) * ((Math.pow(1.10, yearsToRetire) - 1) / 0.10) * 1.10)
    : 0
  return {
    selfContribution: Math.round(annualContribution),
    employerContribution: Math.round(employerContribution),
    deduction80CCD1: selfCapped80CCD1,
    deduction80CCD1B: additionalCapped1B,
    deduction80CCD2: employerCapped80CCD2,
    totalDeduction: Math.round(totalDeduction),
    taxSavingHighSlab: taxSaving30,
    taxSavingMidSlab: taxSaving20,
    estimatedCorpus,
    yearsToRetire,
  }
}

export function calculateHomeLoanBenefit(principalPerYear, interestPerYear, loanAmount, isLetOut = false, isFirstTimeBuyer = false, propertyValue = 0) {
  const sec80C = Math.min(principalPerYear, 150000)
  const maxInterest = isLetOut ? interestPerYear : Math.min(interestPerYear, 200000)
  const sec80EEA = (isFirstTimeBuyer && propertyValue <= 4500000 && loanAmount <= 3500000)
    ? Math.min(Math.max(interestPerYear - 200000, 0), 150000)
    : 0
  const totalDeduction = sec80C + maxInterest + sec80EEA
  const taxSaving30 = Math.round(totalDeduction * 0.312)
  return {
    principalPerYear: Math.round(principalPerYear),
    interestPerYear: Math.round(interestPerYear),
    loanAmount: Math.round(loanAmount),
    section80C: sec80C,
    section24b: Math.round(maxInterest),
    section80EEA: sec80EEA,
    totalDeduction: Math.round(totalDeduction),
    taxSavingHighSlab: taxSaving30,
    isLetOut,
    isFirstTimeBuyer,
  }
}

const SENIOR_SLABS_OLD = [
  [300000, 0],
  [500000, 0.05],
  [1000000, 0.20],
  [Infinity, 0.30],
]

const SUPER_SENIOR_SLABS_OLD = [
  [500000, 0],
  [1000000, 0.20],
  [Infinity, 0.30],
]

export function calculateSeniorCitizenTax(grossIncome, age, deductions = {}) {
  const isSuperSenior = age >= 80
  const isSenior = age >= 60
  const newR = calculateNewRegime(grossIncome)
  const stdDeduction = Math.min(50000, grossIncome)
  const s80c = Math.min(deductions.section80C || 0, 150000)
  const s80d = Math.min(deductions.section80D || 0, isSenior ? 50000 : 25000)
  const s80dParents = Math.min(deductions.section80DParents || 0, 50000)
  const s80TTB = Math.min(deductions.section80TTB || 0, 50000)
  const homeLoan = Math.min(deductions.homeLoanInterest || 0, 200000)
  const nps = Math.min(deductions.nps80CCD1B || 0, 50000)
  const other = deductions.other || 0
  const totalDed = stdDeduction + s80c + s80d + s80dParents + s80TTB + homeLoan + nps + other
  const taxable = Math.max(grossIncome - totalDed, 0)
  const slabs = isSuperSenior ? SUPER_SENIOR_SLABS_OLD : (isSenior ? SENIOR_SLABS_OLD : OLD_REGIME_SLABS)
  const { tax, breakdown } = applySlabs(taxable, slabs)
  let rebate87A = 0
  if (taxable <= 500000) rebate87A = Math.min(tax, 12500)
  const afterRebate = Math.max(tax - rebate87A, 0)
  const surcharge = calcSurcharge(afterRebate, grossIncome)
  const cess = Math.round((afterRebate + surcharge) * 0.04)
  const total = afterRebate + surcharge + cess
  const recommended = newR.totalTax <= total ? 'new' : 'old'
  const savings = Math.abs(newR.totalTax - total)
  return {
    category: isSuperSenior ? 'Super Senior Citizen (80+)' : (isSenior ? 'Senior Citizen (60-79)' : 'Below 60'),
    age,
    grossIncome: Math.round(grossIncome),
    standardDeduction: stdDeduction,
    section80C: s80c,
    section80D: Math.round(s80d),
    section80DParents: Math.round(s80dParents),
    section80TTB: Math.round(s80TTB),
    homeLoanInterest: homeLoan,
    nps80CCD1B: nps,
    otherDeductions: Math.round(other),
    deductionsTotal: Math.round(totalDed),
    taxableIncome: Math.round(taxable),
    taxOnIncome: tax,
    slabBreakdown: breakdown,
    rebate87A,
    taxAfterRebate: afterRebate,
    surcharge,
    cess,
    totalTaxOld: total,
    totalTaxNew: newR.totalTax,
    recommended,
    savings,
    specialBenefits: [
      ...(isSenior ? ['Higher 80D limit: ₹50,000 (vs ₹25,000 for below 60)'] : []),
      ...(isSenior ? ['Section 80TTB: Up to ₹50,000 deduction on interest from deposits'] : []),
      ...(isSuperSenior ? ['No advance tax requirement'] : []),
      ...(isSuperSenior ? ['Higher basic exemption: ₹5,00,000'] : isSenior ? ['Higher basic exemption: ₹3,00,000'] : []),
      ...(isSenior ? ['No TDS on interest up to ₹50,000 (Form 15H)'] : []),
    ],
  }
}

export function calculateStandardDeductions(deductions = {}) {
  const std = 50000
  const s80c = Math.min(deductions.section80C || 0, 150000)
  const s80d = Math.min(deductions.section80D || 0, deductions.isSenior ? 50000 : 25000)
  const s80dParents = Math.min(deductions.section80DParents || 0, deductions.parentsSenior ? 50000 : 25000)
  const s80ccd1b = Math.min(deductions.nps80CCD1B || 0, 50000)
  const s80e = deductions.section80E || 0
  const s80g = deductions.section80G || 0
  const s80tta = Math.min(deductions.section80TTA || 0, 10000)
  const s80ttb = deductions.isSenior ? Math.min(deductions.section80TTB || 0, 50000) : 0
  const s80ee = Math.min(deductions.section80EE || 0, 50000)
  const s80eea = Math.min(deductions.section80EEA || 0, 150000)
  const s24b = Math.min(deductions.section24b || 0, 200000)
  const hra = deductions.hraExemption || 0
  const lta = deductions.lta || 0
  const total = std + s80c + s80d + s80dParents + s80ccd1b + s80e + s80g + s80tta + s80ttb + s80ee + s80eea + s24b + hra + lta
  return {
    standardDeduction: std,
    section80C: s80c, section80CMax: 150000,
    section80D: Math.round(s80d), section80DMax: deductions.isSenior ? 50000 : 25000,
    section80DParents: Math.round(s80dParents), section80DParentsMax: deductions.parentsSenior ? 50000 : 25000,
    nps80CCD1B: s80ccd1b, nps80CCD1BMax: 50000,
    section80E: Math.round(s80e),
    section80G: Math.round(s80g),
    section80TTA: Math.round(s80tta), section80TTAMax: 10000,
    section80TTB: Math.round(s80ttb), section80TTBMax: 50000,
    section80EE: Math.round(s80ee), section80EEMax: 50000,
    section80EEA: Math.round(s80eea), section80EEAMax: 150000,
    section24b: Math.round(s24b), section24bMax: 200000,
    hraExemption: Math.round(hra),
    lta: Math.round(lta),
    totalDeductions: Math.round(total),
  }
}

export function generateRentReceipt({ tenantName, landlordName, landlordPAN, address, rentAmount, fromMonth, toMonth, year }) {
  const months = [
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December', 'January', 'February', 'March',
  ]
  const from = fromMonth || 0
  const to = toMonth != null ? toMonth : 11
  const receipts = []
  for (let i = from; i <= to; i++) {
    const isNextCalYear = i >= 9
    const calYear = isNextCalYear ? year + 1 : year
    receipts.push({
      month: months[i],
      year: calYear,
      amount: rentAmount,
      tenantName,
      landlordName,
      landlordPAN: landlordPAN || '',
      address,
      date: `${new Date(calYear, (i + 3) % 12, 1).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
    })
  }
  const totalRent = receipts.length * rentAmount
  return { receipts, totalRent, tenantName, landlordName, landlordPAN, address }
}
