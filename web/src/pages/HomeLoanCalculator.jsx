import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateHomeLoanBenefit, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
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
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  sectionLabel: { fontSize: 12, fontWeight: 600, color: 'var(--doaide-gold)', marginTop: 16, marginBottom: 8, textTransform: 'uppercase' },
  infoBox: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
}

const FAQS = [
  { q: 'What tax benefits are available on a home loan?', a: 'Home loan tax benefits: (1) Section 80C — principal repayment up to ₹1.5 lakh, (2) Section 24(b) — interest up to ₹2 lakh for self-occupied property (no limit for let-out), (3) Section 80EEA — additional ₹1.5 lakh interest for first-time buyers (if applicable). These are available only under the old tax regime.' },
  { q: 'What is Section 24(b) deduction?', a: 'Section 24(b) allows deduction of home loan interest. For self-occupied property, the limit is ₹2,00,000 per year. For let-out (rented) property, there is no upper limit on interest deduction, but the overall loss from house property that can be set off against other income is limited to ₹2,00,000.' },
  { q: 'What is Section 80EEA?', a: 'Section 80EEA provides an additional deduction of up to ₹1,50,000 on home loan interest for first-time homebuyers. Conditions: property stamp duty value must not exceed ₹45 lakh, loan must be sanctioned by a financial institution, and you should not own any other house on the loan sanction date.' },
  { q: 'Can I claim home loan benefits under the new tax regime?', a: 'Under the new tax regime, you can claim interest deduction under Section 24(b) only for let-out property (not self-occupied). Section 80C (principal) and Section 80EEA are not available under the new regime.' },
  { q: 'Can both co-borrowers claim tax benefits?', a: 'Yes, if both co-borrowers are co-owners of the property, each can claim tax benefits proportional to their share of ownership and loan repayment. Both can individually claim up to ₹2 lakh under Section 24(b) and ₹1.5 lakh under Section 80C.' },
]

export default function HomeLoanCalculator() {
  const [form, setForm] = useState({
    principalPerYear: '', interestPerYear: '', loanAmount: '',
    isLetOut: false, isFirstTimeBuyer: false, propertyValue: '',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateHomeLoanBenefit(
      Number(form.principalPerYear) || 0,
      Number(form.interestPerYear) || 0,
      Number(form.loanAmount) || 0,
      form.isLetOut,
      form.isFirstTimeBuyer,
      Number(form.propertyValue) || 0,
    )
    setResult(r)
  }

  const shareText = result
    ? `Home Loan Tax Benefits\n80C (Principal): ${formatINR(result.section80C)}\n24(b) (Interest): ${formatINR(result.section24b)}\n${result.section80EEA > 0 ? `80EEA: ${formatINR(result.section80EEA)}\n` : ''}Total Deduction: ${formatINR(result.totalDeduction)}\nTax Saving: ${formatINR(result.taxSavingHighSlab)}\n\ntax.doaide.com/home-loan-calculator`
    : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Home Loan Tax Benefit Calculator - Section 24, 80C, 80EEA | DoAide TaxFile"
        description="Calculate home loan tax benefits under Section 24(b), 80C, and 80EEA. Find your total deduction on principal and interest for FY 2026-27."
        keywords="home loan tax benefit, Section 24 deduction, home loan interest deduction, 80EEA, home loan tax saving"
        canonical="https://tax.doaide.com/home-loan-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Home Loan Tax Benefit Calculator</h1>
      <p style={s.subtitle}>Section 24(b), 80C &amp; 80EEA — Calculate your total home loan deductions</p>

      <div style={s.form}>
        <InputField label="Annual Principal Repayment" value={form.principalPerYear} onChange={set('principalPerYear')} currency hint="EMI principal component per year" />
        <InputField label="Annual Interest Payment" value={form.interestPerYear} onChange={set('interestPerYear')} currency hint="EMI interest component per year" />
        <InputField label="Total Loan Amount" value={form.loanAmount} onChange={set('loanAmount')} currency />
        <InputField label="Property Stamp Duty Value" value={form.propertyValue} onChange={set('propertyValue')} currency hint="For 80EEA eligibility check" />
        <InputField label="Property is let out (rented)" type="checkbox" value={form.isLetOut} onChange={set('isLetOut')} />
        <InputField label="First-time home buyer" type="checkbox" value={form.isFirstTimeBuyer} onChange={set('isFirstTimeBuyer')} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Tax Benefits</button>

      {result && (
        <ResultCard title="Home Loan Tax Benefits" gold>
          <div style={s.sectionLabel}>Deductions Available (Old Regime)</div>
          <div style={s.row}>
            <span style={s.rowLabel}>Section 80C — Principal (max ₹1.5L)</span>
            <span style={s.rowValue}>{formatINR(result.section80C)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Section 24(b) — Interest {result.isLetOut ? '(no limit for let-out)' : '(max ₹2L)'}</span>
            <span style={s.rowValue}>{formatINR(result.section24b)}</span>
          </div>
          {result.section80EEA > 0 && (
            <div style={s.row}>
              <span style={s.rowLabel}>Section 80EEA — Additional Interest (max ₹1.5L)</span>
              <span style={s.rowValue}>{formatINR(result.section80EEA)}</span>
            </div>
          )}
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Total Deduction</span>
            <span style={s.highlight}>{formatINR(result.totalDeduction)}</span>
          </div>

          <div style={s.sectionLabel}>Tax Savings</div>
          <div style={s.row}>
            <span style={s.rowLabel}>At highest slab (31.2% incl. cess)</span>
            <span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.taxSavingHighSlab)}</span>
          </div>

          {result.isFirstTimeBuyer && result.section80EEA === 0 && (
            <div style={s.infoBox}>
              <strong>80EEA not applicable:</strong> Property stamp duty value must be ≤ ₹45 lakh and
              loan amount ≤ ₹35 lakh to qualify for the additional ₹1.5L interest deduction.
            </div>
          )}

          <div style={s.infoBox}>
            <strong>Note:</strong> Section 80C deduction is shared with other 80C investments (PPF, ELSS, etc.)
            within the overall ₹1.5L limit. Under the new regime, only Section 24(b) for let-out property is allowed.
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <WhatsAppShare text={shareText} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
