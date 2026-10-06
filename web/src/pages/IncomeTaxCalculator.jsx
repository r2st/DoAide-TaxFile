import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ComparisonTable from '../components/ComparisonTable'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateNewRegime, calculateOldRegime, calculateHRA, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 900, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  section: { marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--doaide-border)' },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 12 },
  btn: {
    marginTop: 24, padding: '12px 32px', background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    border: 'none', borderRadius: 'var(--doaide-radius-md)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
    transition: 'opacity var(--doaide-transition)',
  },
  actions: { display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' },
}

const FAQS = [
  { q: 'Which tax regime should I choose for FY 2026-27?', a: 'It depends on your deductions. If your total deductions (80C, 80D, HRA, home loan) exceed approximately ₹3.75 lakh, the old regime may save more. Use the calculator above to compare both regimes with your actual numbers.' },
  { q: 'What is Section 87A rebate?', a: 'Section 87A provides a rebate for resident individuals. Under the new regime, if taxable income is up to ₹12 lakh, you get a rebate of up to ₹60,000. Under the old regime, if taxable income is up to ₹5 lakh, the rebate is up to ₹12,500.' },
  { q: 'Is surcharge applicable on my income?', a: 'Surcharge applies on income above ₹50 lakh: 10% (₹50L-1Cr), 15% (₹1-2Cr), 25% (₹2-5Cr), and 37% (above ₹5Cr). The surcharge is calculated on the income tax amount, not on income.' },
  { q: 'What is Health and Education Cess?', a: 'A 4% cess is levied on income tax plus surcharge. This cess funds health and education initiatives and is mandatory for all taxpayers.' },
  { q: 'When is the last date to file ITR?', a: 'For salaried individuals and non-audit cases, the deadline is July 31, 2027. For audit cases, it is October 31, 2027. Late filing attracts penalties under Section 234F.' },
]

export default function IncomeTaxCalculator() {
  const [form, setForm] = useState({
    grossSalary: '', basicSalary: '', da: '', hraReceived: '', rentPaid: '',
    cityType: 'non_metro', section80C: '', section80D: '', homeLoanInterest: '',
    nps80CCD1B: '', otherDeductions: '', otherIncome: '',
  })
  const [result, setResult] = useState(null)

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const gross = (Number(form.grossSalary) || 0) + (Number(form.otherIncome) || 0)
    if (gross <= 0) return

    let hraExempt = 0
    const hraRcv = Number(form.hraReceived) || 0
    const rent = Number(form.rentPaid) || 0
    if (hraRcv > 0 && rent > 0) {
      const hraResult = calculateHRA(
        Number(form.basicSalary) || 0,
        Number(form.da) || 0,
        hraRcv, rent,
        form.cityType === 'metro',
      )
      hraExempt = hraResult.exemption
    }

    const newR = calculateNewRegime(gross)
    const oldR = calculateOldRegime(gross, {
      hraExemption: hraExempt,
      section80C: Number(form.section80C) || 0,
      section80D: Number(form.section80D) || 0,
      homeLoanInterest: Number(form.homeLoanInterest) || 0,
      nps80CCD1B: Number(form.nps80CCD1B) || 0,
      other: Number(form.otherDeductions) || 0,
    })

    const recommended = newR.totalTax <= oldR.totalTax ? 'new' : 'old'
    const savings = Math.abs(newR.totalTax - oldR.totalTax)
    setResult({ newRegime: newR, oldRegime: oldR, recommended, savings })
  }

  const shareText = result
    ? `My Tax Calculation (FY 2026-27)\nNew Regime: ${formatINR(result.newRegime.totalTax)}\nOld Regime: ${formatINR(result.oldRegime.totalTax)}\nSavings: ${formatINR(result.savings)} with ${result.recommended} regime\n\nCalculated on tax.doaide.com`
    : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Income Tax Calculator FY 2026-27 - Old vs New Regime | DoAide TaxFile"
        description="Free income tax calculator for India FY 2026-27. Compare old and new tax regime side by side. Calculate tax with HRA, 80C, 80D deductions."
        keywords="income tax calculator India 2026, old vs new regime calculator, tax calculator FY 2026-27"
        canonical="https://tax.doaide.com/income-tax-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Income Tax Calculator</h1>
      <p style={s.subtitle}>FY 2026-27 (AY 2027-28) — Compare Old vs New Regime</p>

      <div style={s.form}>
        <InputField label="Gross Annual Salary" value={form.grossSalary} onChange={set('grossSalary')} currency />
        <InputField label="Other Income" value={form.otherIncome} onChange={set('otherIncome')} currency hint="Interest, rental, freelance" />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Salary Breakup (for HRA calculation)</div>
        <div style={s.form}>
          <InputField label="Basic Salary" value={form.basicSalary} onChange={set('basicSalary')} currency />
          <InputField label="Dearness Allowance (DA)" value={form.da} onChange={set('da')} currency />
          <InputField label="HRA Received" value={form.hraReceived} onChange={set('hraReceived')} currency />
          <InputField label="Annual Rent Paid" value={form.rentPaid} onChange={set('rentPaid')} currency />
          <InputField label="City Type" type="select" value={form.cityType} onChange={set('cityType')}
            options={[{ value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)' }, { value: 'non_metro', label: 'Non-Metro' }]} />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Deductions (Old Regime only)</div>
        <div style={s.form}>
          <InputField label="Section 80C" value={form.section80C} onChange={set('section80C')} currency hint="PPF, ELSS, LIC, etc. Max ₹1,50,000" />
          <InputField label="Section 80D" value={form.section80D} onChange={set('section80D')} currency hint="Health insurance premium" />
          <InputField label="Home Loan Interest (24b)" value={form.homeLoanInterest} onChange={set('homeLoanInterest')} currency hint="Max ₹2,00,000" />
          <InputField label="NPS 80CCD(1B)" value={form.nps80CCD1B} onChange={set('nps80CCD1B')} currency hint="Additional ₹50,000" />
          <InputField label="Other Deductions" value={form.otherDeductions} onChange={set('otherDeductions')} currency hint="80E, 80G, etc." />
        </div>
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Tax</button>

      {result && (
        <>
          <ComparisonTable
            newRegime={result.newRegime}
            oldRegime={result.oldRegime}
            recommended={result.recommended}
            savings={result.savings}
          />
          <div style={s.actions}>
            <WhatsAppShare text={shareText} />
            <PrintButton />
          </div>
        </>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
