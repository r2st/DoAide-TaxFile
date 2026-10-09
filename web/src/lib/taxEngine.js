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
  const additionalCapped1B = Math.min(annualContribution, 50000)
  const remainingForCCD1 = Math.max(annualContribution - additionalCapped1B, 0)
  const selfCapped80CCD1 = Math.min(remainingForCCD1, grossIncome * 0.10)
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

export function calculateTakeHomeSalary(ctc, isMetro = false, pfContributionRate = 0.12) {
  const basic = Math.round(ctc * 0.40)
  const hra = Math.round(basic * (isMetro ? 0.50 : 0.40))
  const employerPF = Math.round(Math.min(basic, 180000) * pfContributionRate)
  const employeePF = employerPF
  const gratuity = Math.round(basic * 0.0481)
  const professionalTax = 2400
  const specialAllowance = Math.max(ctc - basic - hra - employerPF - gratuity, 0)
  const grossSalary = basic + hra + specialAllowance
  const totalDeductions = employeePF + professionalTax
  const annualInHand = grossSalary - totalDeductions
  const taxableIncome = grossSalary - Math.min(75000, grossSalary)
  const newRegime = calculateNewRegime(grossSalary)
  const monthlyTax = Math.round(newRegime.totalTax / 12)
  const monthlyInHand = Math.round((annualInHand - newRegime.totalTax) / 12)

  return {
    ctc: Math.round(ctc),
    basic,
    hra,
    specialAllowance: Math.round(specialAllowance),
    employerPF,
    employeePF,
    gratuity,
    professionalTax,
    grossSalary: Math.round(grossSalary),
    totalDeductions: Math.round(totalDeductions),
    annualInHand: Math.round(annualInHand),
    estimatedTax: newRegime.totalTax,
    taxableIncome: Math.round(taxableIncome),
    monthlyGross: Math.round(grossSalary / 12),
    monthlyDeductions: Math.round(totalDeductions / 12),
    monthlyTax,
    monthlyInHand: Math.max(monthlyInHand, 0),
    annualTakeHome: Math.max(annualInHand - newRegime.totalTax, 0),
  }
}

export function calculateGratuity(lastDrawnSalary, yearsOfService, isGovernment = false) {
  const cappedYears = Math.max(yearsOfService, 0)
  let gratuityAmount
  if (isGovernment) {
    gratuityAmount = Math.round((lastDrawnSalary * cappedYears * 15) / 30)
  } else {
    gratuityAmount = Math.round((lastDrawnSalary * cappedYears * 15) / 26)
  }
  const exemptionLimit = 2000000
  const exemptAmount = Math.min(gratuityAmount, exemptionLimit)
  const taxableAmount = Math.max(gratuityAmount - exemptionLimit, 0)
  const eligible = cappedYears >= 5

  return {
    lastDrawnSalary: Math.round(lastDrawnSalary),
    yearsOfService: cappedYears,
    isGovernment,
    gratuityAmount,
    exemptionLimit,
    exemptAmount,
    taxableAmount,
    eligible,
    formula: isGovernment
      ? `(${formatINR(lastDrawnSalary)} × ${cappedYears} × 15) / 30`
      : `(${formatINR(lastDrawnSalary)} × ${cappedYears} × 15) / 26`,
  }
}

export function calculatePPF(annualInvestment, existingBalance = 0, yearsRemaining = 15, interestRate = 7.1) {
  const rate = interestRate / 100
  const schedule = []
  let balance = existingBalance
  let totalInvested = existingBalance
  let totalInterest = 0

  for (let year = 1; year <= yearsRemaining; year++) {
    const interest = Math.round((balance + annualInvestment) * rate)
    balance = balance + annualInvestment + interest
    totalInvested += annualInvestment
    totalInterest += interest
    schedule.push({
      year,
      investment: Math.round(annualInvestment),
      interest,
      balance: Math.round(balance),
      totalInvested: Math.round(totalInvested),
    })
  }

  return {
    annualInvestment: Math.round(annualInvestment),
    interestRate,
    yearsRemaining,
    existingBalance: Math.round(existingBalance),
    maturityAmount: Math.round(balance),
    totalInvested: Math.round(totalInvested),
    totalInterest: Math.round(totalInterest),
    schedule,
  }
}

export function calculateSIP(monthlyAmount, annualReturnRate, years, stepUpPercent = 0) {
  const monthlyRate = annualReturnRate / 100 / 12
  const months = years * 12
  let totalInvested = 0
  let futureValue = 0
  let currentSIP = monthlyAmount

  for (let month = 1; month <= months; month++) {
    if (stepUpPercent > 0 && month > 1 && (month - 1) % 12 === 0) {
      currentSIP = Math.round(currentSIP * (1 + stepUpPercent / 100))
    }
    totalInvested += currentSIP
    futureValue = (futureValue + currentSIP) * (1 + monthlyRate)
  }

  futureValue = Math.round(futureValue)
  totalInvested = Math.round(totalInvested)
  const wealthGained = futureValue - totalInvested

  return {
    monthlyAmount: Math.round(monthlyAmount),
    annualReturnRate,
    years,
    stepUpPercent,
    totalInvested,
    futureValue,
    wealthGained,
  }
}

export function calculateFD(principal, annualRate, tenureYears, compoundingFrequency = 4, isSenior = false) {
  const n = compoundingFrequency
  const r = annualRate / 100
  const maturityAmount = Math.round(principal * Math.pow(1 + r / n, n * tenureYears))
  const totalInterest = maturityAmount - Math.round(principal)
  const tdsThreshold = isSenior ? 50000 : 40000
  const tdsApplicable = totalInterest > tdsThreshold
  const tdsAmount = tdsApplicable ? Math.round(totalInterest * 0.10) : 0
  const interestAfterTDS = totalInterest - tdsAmount
  const effectiveReturn = Math.round(principal + interestAfterTDS)

  return {
    principal: Math.round(principal),
    annualRate,
    tenureYears,
    compoundingFrequency: n,
    compoundingLabel: { 1: 'Annually', 2: 'Half-Yearly', 4: 'Quarterly', 12: 'Monthly' }[n] || 'Quarterly',
    maturityAmount,
    totalInterest,
    tdsThreshold,
    tdsApplicable,
    tdsAmount,
    interestAfterTDS,
    effectiveReturn,
    isSenior,
  }
}

export function calculateMutualFund(investmentType, amount, annualReturnRate, years) {
  if (investmentType === 'sip') {
    const sip = calculateSIP(amount, annualReturnRate, years)
    return { ...sip, investmentType: 'sip' }
  }
  const futureValue = Math.round(amount * Math.pow(1 + annualReturnRate / 100, years))
  const totalInvested = Math.round(amount)
  const wealthGained = futureValue - totalInvested
  const absoluteReturn = totalInvested > 0 ? ((futureValue - totalInvested) / totalInvested) * 100 : 0
  const cagr = totalInvested > 0 ? (Math.pow(futureValue / totalInvested, 1 / years) - 1) * 100 : 0

  return {
    investmentType: 'lumpsum',
    amount: totalInvested,
    annualReturnRate,
    years,
    totalInvested,
    futureValue,
    wealthGained,
    absoluteReturn: Math.round(absoluteReturn * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
  }
}

export function calculateEMI(loanAmount, annualRate, tenureYears) {
  const monthlyRate = annualRate / 100 / 12
  const months = tenureYears * 12
  let emi
  if (monthlyRate === 0) {
    emi = Math.round(loanAmount / months)
  } else {
    emi = Math.round(loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1))
  }
  const totalPayment = emi * months
  const totalInterest = totalPayment - Math.round(loanAmount)
  const schedule = []
  let balance = loanAmount

  for (let year = 1; year <= tenureYears; year++) {
    let yearPrincipal = 0
    let yearInterest = 0
    for (let m = 0; m < 12; m++) {
      const interestComponent = Math.round(balance * monthlyRate)
      const principalComponent = emi - interestComponent
      yearPrincipal += principalComponent
      yearInterest += interestComponent
      balance = Math.max(balance - principalComponent, 0)
    }
    schedule.push({
      year,
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      balance: Math.round(balance),
    })
  }

  return {
    loanAmount: Math.round(loanAmount),
    annualRate,
    tenureYears,
    emi,
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    schedule,
  }
}

export function calculateCompoundInterest(principal, annualRate, years, compoundingFrequency = 1) {
  const n = compoundingFrequency
  const r = annualRate / 100
  const amount = Math.round(principal * Math.pow(1 + r / n, n * years))
  const totalInterest = amount - Math.round(principal)
  const simpleInterest = Math.round(principal * r * years)
  const compoundingBenefit = totalInterest - simpleInterest

  const yearlyBreakdown = []
  for (let y = 1; y <= years; y++) {
    const bal = Math.round(principal * Math.pow(1 + r / n, n * y))
    yearlyBreakdown.push({
      year: y,
      balance: bal,
      interest: bal - Math.round(principal),
    })
  }

  return {
    principal: Math.round(principal),
    annualRate,
    years,
    compoundingFrequency: n,
    compoundingLabel: { 1: 'Annually', 2: 'Half-Yearly', 4: 'Quarterly', 12: 'Monthly', 365: 'Daily' }[n] || `${n}x/year`,
    totalAmount: amount,
    totalInterest,
    simpleInterest,
    compoundingBenefit,
    yearlyBreakdown,
  }
}

export function calculateSection80D(selfPremium, spousePremium = 0, childrenPremium = 0, parentsPremium = 0, isSelfSenior = false, isParentsSenior = false, preventiveCheckup = 0) {
  const selfFamilyPremium = selfPremium + spousePremium + childrenPremium
  const selfLimit = isSelfSenior ? 50000 : 25000
  const parentsLimit = isParentsSenior ? 50000 : 25000
  const maxPreventive = 5000
  const preventive = Math.min(preventiveCheckup, maxPreventive)
  const selfDeduction = Math.min(selfFamilyPremium + preventive, selfLimit)
  const parentsDeduction = Math.min(parentsPremium, parentsLimit)
  const totalDeduction = selfDeduction + parentsDeduction
  const taxSaving30 = Math.round(totalDeduction * 0.312)
  const taxSaving20 = Math.round(totalDeduction * 0.208)
  const selfRemaining = Math.max(selfLimit - selfFamilyPremium - preventive, 0)
  const parentsRemaining = Math.max(parentsLimit - parentsPremium, 0)

  return {
    selfFamilyPremium: Math.round(selfFamilyPremium),
    parentsPremium: Math.round(parentsPremium),
    preventiveCheckup: preventive,
    selfLimit,
    parentsLimit,
    selfDeduction,
    parentsDeduction,
    totalDeduction,
    selfRemaining,
    parentsRemaining,
    taxSavingHighSlab: taxSaving30,
    taxSavingMidSlab: taxSaving20,
    isSelfSenior,
    isParentsSenior,
  }
}

export function calculateSSY(annualInvestment, existingBalance = 0, girlAge = 0, interestRate = 8.2) {
  const rate = interestRate / 100
  const depositYears = Math.min(15, 21 - Math.max(girlAge, 0))
  const maturityYear = 21
  const schedule = []
  let balance = existingBalance
  let totalInvested = existingBalance
  let totalInterest = 0
  const cappedInvestment = Math.min(annualInvestment, 250000)

  for (let year = 1; year <= maturityYear; year++) {
    const investment = year <= depositYears ? cappedInvestment : 0
    const interest = Math.round((balance + investment) * rate)
    balance = balance + investment + interest
    totalInvested += investment
    totalInterest += interest
    schedule.push({
      year,
      age: girlAge + year,
      investment: Math.round(investment),
      interest,
      balance: Math.round(balance),
    })
  }

  return {
    annualInvestment: Math.round(cappedInvestment),
    interestRate,
    girlAge,
    depositYears,
    maturityYear,
    existingBalance: Math.round(existingBalance),
    maturityAmount: Math.round(balance),
    totalInvested: Math.round(totalInvested),
    totalInterest: Math.round(totalInterest),
    taxBenefit80C: Math.min(Math.round(cappedInvestment), 150000),
    schedule,
  }
}

export function calculateEPF(basicSalary, employeeRate = 12, employerRate = 12, currentBalance = 0, yearsToRetire = 30, interestRate = 8.25) {
  const monthlyBasic = Math.round(basicSalary / 12)
  const employeeMonthly = Math.round(monthlyBasic * employeeRate / 100)
  const employerPFMonthly = Math.round(monthlyBasic * Math.min(employerRate, 12) / 100)
  const employerPensionMonthly = Math.round(Math.min(monthlyBasic, 15000) * 8.33 / 100)
  const employerEPFMonthly = Math.max(employerPFMonthly - employerPensionMonthly, 0)
  const totalMonthlyContribution = employeeMonthly + employerEPFMonthly
  const annualContribution = totalMonthlyContribution * 12
  const monthlyRate = interestRate / 100 / 12
  let balance = currentBalance
  const schedule = []

  for (let year = 1; year <= yearsToRetire; year++) {
    let yearContribution = 0
    let yearInterest = 0
    for (let m = 0; m < 12; m++) {
      balance += totalMonthlyContribution
      yearContribution += totalMonthlyContribution
      const interest = Math.round(balance * monthlyRate)
      balance += interest
      yearInterest += interest
    }
    schedule.push({
      year,
      contribution: Math.round(yearContribution),
      interest: Math.round(yearInterest),
      balance: Math.round(balance),
    })
  }

  return {
    basicSalary: Math.round(basicSalary),
    employeeMonthly,
    employerEPFMonthly,
    employerPensionMonthly,
    totalMonthlyContribution,
    annualContribution,
    interestRate,
    currentBalance: Math.round(currentBalance),
    yearsToRetire,
    maturityAmount: Math.round(balance),
    totalContributed: Math.round(currentBalance + annualContribution * yearsToRetire),
    totalInterest: Math.round(balance - currentBalance - annualContribution * yearsToRetire),
    taxBenefit80C: Math.min(employeeMonthly * 12, 150000),
    schedule,
  }
}

export function compareELSSvsPPFvsFD(annualInvestment, years, taxSlab = 0.312, fdRate = 7.0, elssReturn = 12, ppfRate = 7.1) {
  const elss = calculateMutualFund('lumpsum', annualInvestment, elssReturn, years)
  const elssLTCG = Math.max(elss.futureValue - annualInvestment - 125000, 0) * 0.125
  const elssAfterTax = Math.round(elss.futureValue - elssLTCG)

  const ppf = calculatePPF(annualInvestment, 0, years, ppfRate)
  const ppfAfterTax = ppf.maturityAmount

  const fd = calculateFD(annualInvestment, fdRate, years, 4)
  const fdInterestTax = Math.round(fd.totalInterest * taxSlab)
  const fdAfterTax = Math.round(fd.maturityAmount - fdInterestTax)

  const investments = [
    {
      name: 'ELSS',
      invested: Math.round(annualInvestment),
      preReturn: elss.futureValue,
      tax: Math.round(elssLTCG),
      afterTaxReturn: elssAfterTax,
      effectiveReturn: years > 0 ? Math.round((Math.pow(elssAfterTax / annualInvestment, 1 / years) - 1) * 10000) / 100 : 0,
      lockIn: '3 years',
      risk: 'High',
      taxStatus: 'LTCG >₹1.25L at 12.5%',
    },
    {
      name: 'PPF',
      invested: ppf.totalInvested,
      preReturn: ppf.maturityAmount,
      tax: 0,
      afterTaxReturn: ppfAfterTax,
      effectiveReturn: ppf.totalInvested > 0 && years > 0 ? Math.round((Math.pow(ppfAfterTax / ppf.totalInvested, 1 / years) - 1) * 10000) / 100 : 0,
      lockIn: '15 years',
      risk: 'Low',
      taxStatus: 'EEE — fully tax-free',
    },
    {
      name: 'Tax Saver FD',
      invested: Math.round(annualInvestment),
      preReturn: fd.maturityAmount,
      tax: Math.round(fdInterestTax),
      afterTaxReturn: fdAfterTax,
      effectiveReturn: years > 0 ? Math.round((Math.pow(fdAfterTax / annualInvestment, 1 / years) - 1) * 10000) / 100 : 0,
      lockIn: '5 years',
      risk: 'Low',
      taxStatus: 'Interest taxed at slab rate',
    },
  ]

  const taxSaving80C = Math.round(Math.min(annualInvestment, 150000) * taxSlab)

  investments.sort((a, b) => b.afterTaxReturn - a.afterTaxReturn)

  return {
    annualInvestment: Math.round(annualInvestment),
    years,
    taxSlab,
    taxSaving80C,
    investments,
    bestOption: investments[0].name,
  }
}

export function calculateTaxLossHarvesting(gains, losses, gainType = 'LTCG') {
  const totalGains = Math.round(gains)
  const totalLosses = Math.round(losses)
  const netGain = Math.max(totalGains - totalLosses, 0)
  const lossUtilized = Math.min(totalLosses, totalGains)
  const carryForwardLoss = Math.max(totalLosses - totalGains, 0)

  let taxRate, exemption, taxableWithout, taxableWith
  if (gainType === 'LTCG') {
    taxRate = 0.125
    exemption = 125000
    taxableWithout = Math.max(totalGains - exemption, 0)
    taxableWith = Math.max(netGain - exemption, 0)
  } else {
    taxRate = 0.20
    exemption = 0
    taxableWithout = totalGains
    taxableWith = netGain
  }

  const taxWithout = Math.round(taxableWithout * taxRate)
  const taxWith = Math.round(taxableWith * taxRate)
  const cessWithout = Math.round(taxWithout * 0.04)
  const cessWith = Math.round(taxWith * 0.04)
  const totalTaxWithout = taxWithout + cessWithout
  const totalTaxWith = taxWith + cessWith
  const taxSaved = totalTaxWithout - totalTaxWith

  return {
    totalGains,
    totalLosses,
    netGain,
    lossUtilized,
    carryForwardLoss,
    gainType,
    taxRate,
    exemption,
    taxableWithoutHarvesting: taxableWithout,
    taxableWithHarvesting: taxableWith,
    taxWithoutHarvesting: totalTaxWithout,
    taxWithHarvesting: totalTaxWith,
    taxSaved,
    carryForwardYears: carryForwardLoss > 0 ? 8 : 0,
  }
}

export function calculateRefund(totalIncome, tdsDeducted, advanceTaxPaid = 0, selfAssessmentTax = 0, regime = 'new', deductions = {}) {
  let taxLiability
  if (regime === 'new') {
    const r = calculateNewRegime(totalIncome)
    taxLiability = r.totalTax
  } else {
    const r = calculateOldRegime(totalIncome, deductions)
    taxLiability = r.totalTax
  }

  const totalPaid = Math.round(tdsDeducted) + Math.round(advanceTaxPaid) + Math.round(selfAssessmentTax)
  const refundAmount = Math.max(totalPaid - taxLiability, 0)
  const taxDue = Math.max(taxLiability - totalPaid, 0)
  const interestOnRefund = refundAmount > 0 ? Math.round(refundAmount * 0.06 / 12 * 6) : 0

  return {
    totalIncome: Math.round(totalIncome),
    regime,
    taxLiability,
    tdsDeducted: Math.round(tdsDeducted),
    advanceTaxPaid: Math.round(advanceTaxPaid),
    selfAssessmentTax: Math.round(selfAssessmentTax),
    totalTaxPaid: totalPaid,
    refundAmount,
    taxDue,
    interestOnRefund,
    estimatedTimeline: refundAmount > 0 ? '4-6 months after e-verification' : null,
  }
}

const PROFESSIONAL_TAX_RATES = {
  maharashtra: [
    { from: 0, to: 7500, monthly: 0 },
    { from: 7501, to: 10000, monthly: 175 },
    { from: 10001, to: Infinity, monthly: 200, febMax: 300 },
  ],
  karnataka: [
    { from: 0, to: 15000, monthly: 0 },
    { from: 15001, to: 25000, monthly: 200 },
    { from: 25001, to: Infinity, monthly: 200 },
  ],
  west_bengal: [
    { from: 0, to: 10000, monthly: 0 },
    { from: 10001, to: 15000, monthly: 110 },
    { from: 15001, to: 25000, monthly: 130 },
    { from: 25001, to: 40000, monthly: 150 },
    { from: 40001, to: Infinity, monthly: 200 },
  ],
  andhra_pradesh: [
    { from: 0, to: 15000, monthly: 0 },
    { from: 15001, to: 20000, monthly: 150 },
    { from: 20001, to: Infinity, monthly: 200 },
  ],
  telangana: [
    { from: 0, to: 15000, monthly: 0 },
    { from: 15001, to: 20000, monthly: 150 },
    { from: 20001, to: Infinity, monthly: 200 },
  ],
  tamil_nadu: [
    { from: 0, to: 21000, monthly: 0 },
    { from: 21001, to: 30000, monthly: 135 },
    { from: 30001, to: 45000, monthly: 315 },
    { from: 45001, to: 60000, monthly: 690 },
    { from: 60001, to: 75000, monthly: 1025 },
    { from: 75001, to: Infinity, monthly: 1250 },
  ],
  gujarat: [
    { from: 0, to: 5999, monthly: 0 },
    { from: 6000, to: 8999, monthly: 80 },
    { from: 9000, to: 11999, monthly: 150 },
    { from: 12000, to: Infinity, monthly: 200 },
  ],
  madhya_pradesh: [
    { from: 0, to: 18750, monthly: 0 },
    { from: 18751, to: 25000, monthly: 125 },
    { from: 25001, to: Infinity, monthly: 208 },
  ],
  kerala: [
    { from: 0, to: 11999, monthly: 0 },
    { from: 12000, to: 17999, monthly: 120 },
    { from: 18000, to: 24999, monthly: 180 },
    { from: 25000, to: 29999, monthly: 250 },
    { from: 30000, to: Infinity, monthly: 208 },
  ],
  odisha: [
    { from: 0, to: 13304, monthly: 0 },
    { from: 13305, to: 25000, monthly: 125 },
    { from: 25001, to: Infinity, monthly: 200 },
  ],
  assam: [
    { from: 0, to: 10000, monthly: 0 },
    { from: 10001, to: 15000, monthly: 150 },
    { from: 15001, to: 25000, monthly: 180 },
    { from: 25001, to: Infinity, monthly: 208 },
  ],
  bihar: [
    { from: 0, to: 25000, monthly: 0 },
    { from: 25001, to: 50000, monthly: 100 },
    { from: 50001, to: Infinity, monthly: 208 },
  ],
  rajasthan: [
    { from: 0, to: Infinity, monthly: 0 },
  ],
  delhi: [
    { from: 0, to: Infinity, monthly: 0 },
  ],
  uttar_pradesh: [
    { from: 0, to: Infinity, monthly: 0 },
  ],
}

export const PROFESSIONAL_TAX_STATES = Object.keys(PROFESSIONAL_TAX_RATES).map(k => ({
  value: k,
  label: k.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
}))

export function calculateProfessionalTax(monthlySalary, state) {
  const slabs = PROFESSIONAL_TAX_RATES[state]
  if (!slabs) return { error: 'State not found', monthlyTax: 0, annualTax: 0 }

  let monthlyTax = 0
  for (const slab of slabs) {
    if (monthlySalary >= slab.from && monthlySalary <= slab.to) {
      monthlyTax = slab.monthly
      break
    }
  }

  const febSlab = slabs.find(s => monthlySalary >= s.from && monthlySalary <= s.to)
  const febAmount = febSlab && febSlab.febMax ? febSlab.febMax : monthlyTax
  const annualTax = monthlyTax * 11 + febAmount
  const maxAllowed = 2500

  return {
    state,
    stateLabel: state.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
    monthlySalary: Math.round(monthlySalary),
    monthlyTax,
    februaryTax: febAmount,
    annualTax: Math.min(annualTax, maxAllowed),
    maxAllowed,
    slabs: slabs.map(s => ({
      range: s.to === Infinity ? `Above ₹${s.from.toLocaleString('en-IN')}` : `₹${s.from.toLocaleString('en-IN')} - ₹${s.to.toLocaleString('en-IN')}`,
      monthly: s.monthly,
    })),
  }
}

export function calculateSalaryOptimizer(ctc) {
  const basicLow = Math.round(ctc * 0.30)
  const basicStd = Math.round(ctc * 0.40)
  const basicHigh = Math.round(ctc * 0.50)

  function buildStructure(basic, label) {
    const hra = Math.round(basic * 0.50)
    const lta = Math.round(Math.min(ctc * 0.05, 50000))
    const foodCoupons = Math.round(Math.min(26400, ctc * 0.03))
    const nps80ccd2 = Math.round(basic * 0.10)
    const epfEmployer = Math.round(Math.min(basic, 180000) * 0.12)
    const epfEmployee = epfEmployer
    const gratuity = Math.round(basic * 0.0481)
    const special = Math.max(ctc - basic - hra - lta - foodCoupons - nps80ccd2 - epfEmployer - gratuity, 0)
    const grossSalary = basic + hra + special + lta + foodCoupons
    const totalDeductions80C = Math.min(epfEmployee, 150000)
    const totalDeductionsOld = 50000 + totalDeductions80C + nps80ccd2
    const taxableOld = Math.max(grossSalary - totalDeductionsOld - Math.min(hra, grossSalary * 0.20), 0)
    const newR = calculateNewRegime(grossSalary)

    return {
      label,
      basic,
      hra,
      lta,
      foodCoupons,
      nps80ccd2,
      epfEmployer,
      epfEmployee,
      gratuity,
      specialAllowance: Math.round(special),
      grossSalary: Math.round(grossSalary),
      estimatedTaxNew: newR.totalTax,
      monthlyInHandEstimate: Math.round((grossSalary - epfEmployee - 2400 - newR.totalTax) / 12),
    }
  }

  const structures = [
    buildStructure(basicLow, 'Low Basic (30%)'),
    buildStructure(basicStd, 'Standard Basic (40%)'),
    buildStructure(basicHigh, 'High Basic (50%)'),
  ]

  const best = structures.reduce((a, b) => a.monthlyInHandEstimate > b.monthlyInHandEstimate ? a : b)

  return {
    ctc: Math.round(ctc),
    structures,
    recommended: best.label,
    bestMonthlyInHand: best.monthlyInHandEstimate,
  }
}

export function calculateGST(amount, gstRate, isInclusive = false) {
  const rate = gstRate / 100
  let baseAmount, gstAmount, totalAmount
  if (isInclusive) {
    totalAmount = amount
    baseAmount = Math.round(amount / (1 + rate))
    gstAmount = totalAmount - baseAmount
  } else {
    baseAmount = amount
    gstAmount = Math.round(amount * rate)
    totalAmount = baseAmount + gstAmount
  }
  const cgst = Math.round(gstAmount / 2)
  const sgst = Math.round(gstAmount / 2)
  const igst = gstAmount
  return { baseAmount, gstAmount, totalAmount, cgst, sgst, igst, gstRate }
}

export function calculateLumpsum(principal, annualReturnRate, years) {
  const r = annualReturnRate / 100
  const futureValue = Math.round(principal * Math.pow(1 + r, years))
  const totalGains = futureValue - principal
  return { principal, futureValue, totalGains, annualReturnRate, years }
}

export function calculateRD(monthlyDeposit, annualRate, tenureYears) {
  const r = annualRate / 100
  const n = 4
  const totalMonths = tenureYears * 12
  let maturityValue = 0
  for (let m = 1; m <= totalMonths; m++) {
    const remainingQuarters = ((totalMonths - m + 1) / 3)
    maturityValue += monthlyDeposit * Math.pow(1 + r / n, remainingQuarters)
  }
  maturityValue = Math.round(maturityValue)
  const totalInvested = Math.round(monthlyDeposit * totalMonths)
  const totalInterest = maturityValue - totalInvested
  return { monthlyDeposit, totalInvested, totalInterest, maturityValue, annualRate, tenureYears }
}

export function calculateSWP(corpus, monthlyWithdrawal, annualReturnRate, years) {
  const monthlyRate = annualReturnRate / 100 / 12
  const totalMonths = years * 12
  let balance = corpus
  let totalWithdrawn = 0
  let lastMonth = totalMonths
  for (let m = 1; m <= totalMonths; m++) {
    balance = balance * (1 + monthlyRate) - monthlyWithdrawal
    totalWithdrawn += monthlyWithdrawal
    if (balance <= 0) { balance = 0; lastMonth = m; break }
  }
  const finalBalance = Math.round(Math.max(balance, 0))
  return {
    initialCorpus: corpus, monthlyWithdrawal, annualReturnRate, years,
    totalWithdrawn: Math.round(totalWithdrawn), finalBalance,
    monthsLasted: lastMonth, corpusExhausted: balance <= 0,
  }
}

export function calculateCAGR(beginningValue, endingValue, years) {
  if (beginningValue <= 0 || years <= 0) return { cagr: 0, absoluteReturn: 0, totalGain: 0 }
  const cagr = (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100
  const absoluteReturn = ((endingValue - beginningValue) / beginningValue) * 100
  const totalGain = endingValue - beginningValue
  return { cagr: Math.round(cagr * 100) / 100, absoluteReturn: Math.round(absoluteReturn * 100) / 100, totalGain: Math.round(totalGain), beginningValue, endingValue, years }
}

export function calculateInflation(currentAmount, inflationRate, years) {
  const r = inflationRate / 100
  const futureAmount = Math.round(currentAmount * Math.pow(1 + r, years))
  const purchasingPower = Math.round(currentAmount / Math.pow(1 + r, years))
  const totalInflation = Math.round(((Math.pow(1 + r, years) - 1)) * 10000) / 100
  return { currentAmount, futureAmount, purchasingPower, inflationRate, years, totalInflation }
}

export function optimizeDeductions(grossIncome, age = 30, existing = {}) {
  const newResult = calculateNewRegime(grossIncome)

  const s80c = Math.min(existing.section80C || 0, 150000)
  const s80d = Math.min(existing.section80D || 0, age >= 60 ? 50000 : 25000)
  const s80dParents = Math.min(existing.section80DParents || 0, existing.parentsSenior ? 50000 : 25000)
  const nps = Math.min(existing.nps80CCD1B || 0, 50000)
  const hra = existing.hraExemption || 0
  const homeLoan = Math.min(existing.homeLoanInterest || 0, 200000)
  const s80e = existing.section80E || 0
  const s80g = existing.section80G || 0

  const currentOld = calculateOldRegime(grossIncome, {
    section80C: s80c, section80D: s80d + s80dParents,
    nps80CCD1B: nps, hraExemption: hra,
    homeLoanInterest: homeLoan, other: s80e + s80g,
  })

  const max80C = 150000
  const max80D = age >= 60 ? 50000 : 25000
  const max80DParents = existing.parentsSenior ? 50000 : 25000
  const maxNPS = 50000
  const maxHomeLoan = 200000

  const rem80C = Math.max(max80C - s80c, 0)
  const rem80D = Math.max(max80D - s80d, 0)
  const rem80DParents = Math.max(max80DParents - s80dParents, 0)
  const remNPS = Math.max(maxNPS - nps, 0)
  const remHomeLoan = Math.max(maxHomeLoan - homeLoan, 0)

  const optimizedOld = calculateOldRegime(grossIncome, {
    section80C: max80C, section80D: max80D + max80DParents,
    nps80CCD1B: maxNPS, hraExemption: hra,
    homeLoanInterest: homeLoan, other: s80e + s80g,
  })

  const suggestions = []
  const marginalRate = grossIncome > 1000000 ? 0.312 : grossIncome > 500000 ? 0.208 : 0.052

  if (rem80C > 0) suggestions.push({
    section: 'Section 80C', current: s80c, max: max80C, remaining: rem80C,
    potentialSaving: Math.round(rem80C * marginalRate),
    options: ['PPF (7.1%, 15yr lock-in)', 'ELSS Mutual Funds (~12%, 3yr lock-in)', 'Tax Saver FD (6.5-7.5%, 5yr)', 'NSC (7.7%, 5yr)', 'EPF contribution'],
    priority: 'high',
  })
  if (rem80D > 0) suggestions.push({
    section: 'Section 80D (Self)', current: s80d, max: max80D, remaining: rem80D,
    potentialSaving: Math.round(rem80D * marginalRate),
    options: ['Health insurance premium for self/spouse/children', 'Preventive health check-up (₹5,000 within limit)'],
    priority: 'high',
  })
  if (rem80DParents > 0) suggestions.push({
    section: 'Section 80D (Parents)', current: s80dParents, max: max80DParents, remaining: rem80DParents,
    potentialSaving: Math.round(rem80DParents * marginalRate),
    options: ['Health insurance premium for parents'],
    priority: 'medium',
  })
  if (remNPS > 0) suggestions.push({
    section: 'NPS 80CCD(1B)', current: nps, max: maxNPS, remaining: remNPS,
    potentialSaving: Math.round(remNPS * marginalRate),
    options: ['Additional NPS contribution (beyond 80C limit)'],
    priority: 'medium',
  })
  if (homeLoan === 0 && grossIncome > 800000) suggestions.push({
    section: 'Section 24(b) Home Loan', current: 0, max: maxHomeLoan, remaining: maxHomeLoan,
    potentialSaving: Math.round(maxHomeLoan * marginalRate),
    options: ['Home loan interest deduction up to ₹2,00,000'],
    priority: 'low',
  })

  suggestions.sort((a, b) => b.potentialSaving - a.potentialSaving)
  const totalPotentialSaving = suggestions.reduce((sum, s) => sum + s.potentialSaving, 0)

  const betterRegime = optimizedOld.totalTax <= newResult.totalTax ? 'old' : 'new'
  const regimeSavings = Math.abs(optimizedOld.totalTax - newResult.totalTax)

  return {
    grossIncome: Math.round(grossIncome),
    currentTaxOld: currentOld.totalTax,
    currentTaxNew: newResult.totalTax,
    optimizedTaxOld: optimizedOld.totalTax,
    currentBetterRegime: currentOld.totalTax <= newResult.totalTax ? 'old' : 'new',
    optimizedBetterRegime: betterRegime,
    regimeSavings,
    totalPotentialSaving,
    savingsVsCurrent: Math.max(Math.min(currentOld.totalTax, newResult.totalTax) - Math.min(optimizedOld.totalTax, newResult.totalTax), 0),
    suggestions,
    deductionsSummary: {
      section80C: { current: s80c, max: max80C },
      section80D: { current: s80d, max: max80D },
      section80DParents: { current: s80dParents, max: max80DParents },
      nps80CCD1B: { current: nps, max: maxNPS },
      homeLoanInterest: { current: homeLoan, max: maxHomeLoan },
    },
  }
}

export function calculateRetirement(currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, expectedReturn, currentSavings = 0) {
  const yearsToRetire = retirementAge - currentAge
  const yearsInRetirement = lifeExpectancy - retirementAge
  const r = inflationRate / 100
  const monthlyExpenseAtRetirement = Math.round(monthlyExpenses * Math.pow(1 + r, yearsToRetire))
  const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12
  const realReturn = ((1 + expectedReturn / 100) / (1 + r) - 1)
  let corpusNeeded
  if (realReturn <= 0) {
    corpusNeeded = annualExpenseAtRetirement * yearsInRetirement
  } else {
    corpusNeeded = Math.round(annualExpenseAtRetirement * (1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn)
  }
  const savingsFV = Math.round(currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetire))
  const gap = Math.max(corpusNeeded - savingsFV, 0)
  const monthlyRate = expectedReturn / 100 / 12
  const totalMonths = yearsToRetire * 12
  let monthlySIPNeeded = 0
  if (gap > 0 && totalMonths > 0) {
    if (monthlyRate === 0) {
      monthlySIPNeeded = Math.round(gap / totalMonths)
    } else {
      monthlySIPNeeded = Math.round(gap * monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1))
    }
  }
  return {
    currentAge, retirementAge, lifeExpectancy, yearsToRetire, yearsInRetirement,
    monthlyExpenseAtRetirement, corpusNeeded, currentSavingsFV: savingsFV,
    gap, monthlySIPNeeded,
  }
}
