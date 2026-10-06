import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
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
  },
  row: {
    display: 'flex', justifyContent: 'space-between', padding: '10px 0',
    borderBottom: '1px solid var(--doaide-border)', fontSize: 14,
  },
  rowLabel: { color: 'var(--doaide-text-secondary)' },
  rowValue: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 500 },
  info: {
    padding: 16, background: 'var(--doaide-gold-bg)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, color: 'var(--doaide-gold)', lineHeight: 1.7, marginBottom: 24,
  },
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  actions: { display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' },
}

const FAQS = [
  { q: 'What is Form 16?', a: 'Form 16 is a TDS certificate issued by your employer. Part A contains details of TDS deducted and deposited. Part B is a detailed statement of your salary, deductions claimed, and tax computed. It is essential for filing your ITR.' },
  { q: 'When do employers issue Form 16?', a: 'Employers must issue Form 16 by June 15 following the financial year. For FY 2026-27, the deadline is June 15, 2027. If your employer delays, you can request it or use Form 26AS as an alternative reference.' },
  { q: 'Can I file ITR without Form 16?', a: 'Yes, you can file ITR without Form 16 using your salary slips, Form 26AS (TDS details), and AIS (Annual Information Statement). However, Form 16 makes filing much easier as it summarizes all information.' },
  { q: 'What if there is a mismatch between Form 16 and Form 26AS?', a: 'Always reconcile Form 16 with Form 26AS. If TDS amounts differ, contact your employer to rectify their TDS returns. The Income Tax Department relies on Form 26AS for TDS verification.' },
  { q: 'How do I use this Form 16 analyzer?', a: 'Enter the key figures from your Form 16 Part B — gross salary, deductions, and TDS deducted. The analyzer will verify the tax calculation, compare old vs new regime, and check if you are eligible for a refund.' },
]

export default function Form16Analyzer() {
  const [form, setForm] = useState({
    grossSalary: '', basicSalary: '', da: '', hraReceived: '', rentPaid: '',
    cityType: 'non_metro', section80C: '', section80D: '', homeLoanInterest: '',
    nps80CCD1B: '', otherDeductions: '', tdsDeducted: '', otherIncome: '',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const analyze = () => {
    const gross = (Number(form.grossSalary) || 0) + (Number(form.otherIncome) || 0)
    if (gross <= 0) return

    let hraExempt = 0
    const hraRcv = Number(form.hraReceived) || 0
    const rent = Number(form.rentPaid) || 0
    if (hraRcv > 0 && rent > 0) {
      const hraResult = calculateHRA(
        Number(form.basicSalary) || 0, Number(form.da) || 0,
        hraRcv, rent, form.cityType === 'metro',
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

    const tds = Number(form.tdsDeducted) || 0
    const recommended = newR.totalTax <= oldR.totalTax ? 'new' : 'old'
    const bestTax = Math.min(newR.totalTax, oldR.totalTax)
    const savings = Math.abs(newR.totalTax - oldR.totalTax)
    const refund = Math.max(tds - bestTax, 0)
    const due = Math.max(bestTax - tds, 0)

    setResult({ newRegime: newR, oldRegime: oldR, recommended, savings, tdsDeducted: tds, refund, due, bestTax })
  }

  const shareText = result
    ? `Form 16 Analysis (FY 2026-27)\nBest Regime: ${result.recommended === 'new' ? 'New' : 'Old'}\nTax: ${formatINR(result.bestTax)}\nTDS Deducted: ${formatINR(result.tdsDeducted)}\n${result.refund > 0 ? `Refund Due: ${formatINR(result.refund)}` : `Tax Due: ${formatINR(result.due)}`}\n\ntax.doaide.com/form-16-analyzer`
    : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Form 16 Analyzer - Extract & Calculate Tax | DoAide TaxFile"
        description="Analyze your Form 16 data. Enter key figures to verify tax calculation, compare regimes, and check if you're eligible for a refund for FY 2026-27."
        keywords="Form 16 analyzer, Form 16 calculator, Form 16 tax calculation, verify Form 16"
        canonical="https://tax.doaide.com/form-16-analyzer"
        faqs={FAQS}
      />

      <h1 style={s.title}>Form 16 Analyzer</h1>
      <p style={s.subtitle}>Enter your Form 16 details — verify tax, compare regimes, check refund eligibility</p>

      <div style={s.info}>
        Enter the key figures from your Form 16 Part B below. We will verify the tax calculation,
        compare old vs new regime, and determine if you are eligible for a refund.
      </div>

      <div style={s.form}>
        <InputField label="Gross Salary (Part B - Sl. 1)" value={form.grossSalary} onChange={set('grossSalary')} currency />
        <InputField label="Other Income" value={form.otherIncome} onChange={set('otherIncome')} currency hint="Interest, rental, etc." />
        <InputField label="TDS Deducted (Part A total)" value={form.tdsDeducted} onChange={set('tdsDeducted')} currency hint="Total TDS by employer" />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Salary Breakup (for HRA)</div>
        <div style={s.form}>
          <InputField label="Basic Salary" value={form.basicSalary} onChange={set('basicSalary')} currency />
          <InputField label="Dearness Allowance" value={form.da} onChange={set('da')} currency />
          <InputField label="HRA Received" value={form.hraReceived} onChange={set('hraReceived')} currency />
          <InputField label="Rent Paid (Annual)" value={form.rentPaid} onChange={set('rentPaid')} currency />
          <InputField label="City Type" type="select" value={form.cityType} onChange={set('cityType')}
            options={[{ value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)' }, { value: 'non_metro', label: 'Non-Metro' }]} />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Deductions (from Form 16 Part B)</div>
        <div style={s.form}>
          <InputField label="Section 80C" value={form.section80C} onChange={set('section80C')} currency hint="Max ₹1,50,000" />
          <InputField label="Section 80D" value={form.section80D} onChange={set('section80D')} currency />
          <InputField label="Home Loan Interest (24b)" value={form.homeLoanInterest} onChange={set('homeLoanInterest')} currency hint="Max ₹2,00,000" />
          <InputField label="NPS 80CCD(1B)" value={form.nps80CCD1B} onChange={set('nps80CCD1B')} currency />
          <InputField label="Other Deductions" value={form.otherDeductions} onChange={set('otherDeductions')} currency />
        </div>
      </div>

      <button style={s.btn} onClick={analyze}>Analyze Form 16</button>

      {result && (
        <>
          <ResultCard title="Refund / Tax Due" gold style={{ marginBottom: 0 }}>
            <div style={s.row}>
              <span style={s.rowLabel}>TDS Deducted by Employer</span>
              <span style={s.rowValue}>{formatINR(result.tdsDeducted)}</span>
            </div>
            <div style={s.row}>
              <span style={s.rowLabel}>Actual Tax Liability ({result.recommended === 'new' ? 'New' : 'Old'} Regime)</span>
              <span style={s.rowValue}>{formatINR(result.bestTax)}</span>
            </div>
            {result.refund > 0 ? (
              <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
                <span style={{ ...s.highlight, color: 'var(--doaide-success)' }}>Refund Due</span>
                <span style={{ ...s.highlight, color: 'var(--doaide-success)' }}>{formatINR(result.refund)}</span>
              </div>
            ) : (
              <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
                <span style={{ ...s.highlight, color: 'var(--doaide-error)' }}>Additional Tax Due</span>
                <span style={{ ...s.highlight, color: 'var(--doaide-error)' }}>{formatINR(result.due)}</span>
              </div>
            )}
          </ResultCard>

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
