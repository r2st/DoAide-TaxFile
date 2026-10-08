import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import HowItWorks from '../components/HowItWorks'
import { calculateRefund, formatINR } from '../lib/taxEngine'

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
  timeline: {
    marginTop: 16, padding: 16, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.7,
  },
  timelineTitle: { fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontSize: 14 },
  step: { display: 'flex', gap: 8, marginBottom: 8 },
  stepDot: {
    width: 8, height: 8, borderRadius: '50%', background: 'var(--doaide-gold)', marginTop: 6, flexShrink: 0,
  },
}

const FAQS = [
  { q: 'When will I get my income tax refund?', a: 'Typically 4-6 months after e-verifying your ITR. If filed and verified early (before July 31), refunds often arrive in 2-3 months. Delays can occur due to processing backlogs, incorrect bank details, or outstanding tax demands.' },
  { q: 'How do I check my refund status?', a: 'Visit incometax.gov.in → Login → e-File → Income Tax Returns → View Filed Returns. You can also check on tin.tin.nsdl.com using your PAN and assessment year. The status shows whether your refund has been processed, issued, or credited.' },
  { q: 'Is there interest on delayed refunds?', a: 'Yes, the Income Tax Department pays simple interest at 6% per annum (0.5% per month) on delayed refunds. Interest is calculated from the date of tax payment or April 1 of the assessment year, whichever is later, to the date of granting the refund.' },
  { q: 'Why is my refund less than expected?', a: 'Common reasons: outstanding tax demands from previous years were adjusted against the refund, the assessing officer disallowed certain deductions, or there was a mismatch between Form 16 and Form 26AS TDS details.' },
  { q: 'What if my refund fails due to wrong bank details?', a: 'You can raise a refund reissue request on the income tax portal. Go to Services → Refund Reissue → Submit a request with correct bank account details. The bank account must be pre-validated and linked to your PAN.' },
]

const STEPS = [
  'Enter your total annual income from all sources (salary, interest, rental, etc.).',
  'Enter the TDS already deducted by your employer, banks, and other deductors.',
  'Add any advance tax or self-assessment tax you have paid during the year.',
  'Select your tax regime — the calculator computes your actual tax liability.',
  'If TDS + advance tax exceeds your liability, you get a refund with 6% p.a. interest.',
]

export default function RefundCalculator() {
  const [form, setForm] = useState({
    totalIncome: '', tdsDeducted: '', advanceTax: '', selfAssessmentTax: '', regime: 'new',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateRefund(
      Number(form.totalIncome) || 0,
      Number(form.tdsDeducted) || 0,
      Number(form.advanceTax) || 0,
      Number(form.selfAssessmentTax) || 0,
      form.regime,
    )
    setResult(r)
  }

  const shareText = result ? `Income Tax Refund Estimate\nIncome: ${formatINR(result.totalIncome)}\nTax Liability: ${formatINR(result.taxLiability)}\nTotal Paid: ${formatINR(result.totalTaxPaid)}\n${result.refundAmount > 0 ? `Refund: ${formatINR(result.refundAmount)}` : `Due: ${formatINR(result.taxDue)}`}\n\ntax.doaide.com/refund-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Income Tax Refund Calculator - Estimate Your Refund | DoAide TaxFile"
        description="Calculate your income tax refund amount and estimated timeline. Compare TDS deducted vs actual liability for FY 2026-27."
        keywords="income tax refund calculator, tax refund estimator, ITR refund calculator, when will I get refund"
        canonical="https://tax.doaide.com/refund-calculator"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Income Tax' }, { label: 'Refund Calculator' }]} />

      <h1 style={s.title}>Refund Calculator</h1>
      <p style={s.subtitle}>Estimate your income tax refund amount and timeline</p>

      <HowItWorks steps={STEPS} />

      <div style={s.form}>
        <InputField label="Total Annual Income" value={form.totalIncome} onChange={set('totalIncome')} currency />
        <InputField label="TDS Deducted" value={form.tdsDeducted} onChange={set('tdsDeducted')} currency hint="From Form 26AS / AIS" />
        <InputField label="Advance Tax Paid" value={form.advanceTax} onChange={set('advanceTax')} currency hint="Optional" />
        <InputField label="Self-Assessment Tax Paid" value={form.selfAssessmentTax} onChange={set('selfAssessmentTax')} currency hint="Optional" />
        <InputField label="Tax Regime" type="select" value={form.regime} onChange={set('regime')} options={[
          { value: 'new', label: 'New Regime' },
          { value: 'old', label: 'Old Regime' },
        ]} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Refund</button>

      {result && (
        <ResultCard title={result.refundAmount > 0 ? 'Refund Estimate' : 'Tax Due'} gold>
          <div style={s.row}><span style={s.rowLabel}>Total Income</span><span style={s.rowValue}>{formatINR(result.totalIncome)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Tax Liability ({result.regime === 'new' ? 'New' : 'Old'} Regime)</span><span style={s.rowValue}>{formatINR(result.taxLiability)}</span></div>
          <div style={{ ...s.row, borderBottom: '2px solid var(--doaide-border)' }}>
            <span style={s.rowLabel}>TDS Deducted</span><span style={s.rowValue}>{formatINR(result.tdsDeducted)}</span>
          </div>
          {result.advanceTaxPaid > 0 && (
            <div style={s.row}><span style={s.rowLabel}>Advance Tax Paid</span><span style={s.rowValue}>{formatINR(result.advanceTaxPaid)}</span></div>
          )}
          {result.selfAssessmentTax > 0 && (
            <div style={s.row}><span style={s.rowLabel}>Self-Assessment Tax</span><span style={s.rowValue}>{formatINR(result.selfAssessmentTax)}</span></div>
          )}
          <div style={s.row}><span style={s.rowLabel}>Total Tax Paid</span><span style={{ ...s.rowValue, fontWeight: 600 }}>{formatINR(result.totalTaxPaid)}</span></div>

          {result.refundAmount > 0 ? (
            <>
              <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
                <span style={{ ...s.highlight, color: 'var(--doaide-success)' }}>Refund Amount</span>
                <span style={{ ...s.highlight, color: 'var(--doaide-success)' }}>{formatINR(result.refundAmount)}</span>
              </div>
              {result.interestOnRefund > 0 && (
                <div style={s.row}><span style={s.rowLabel}>Estimated Interest (6% p.a., ~6 months)</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>+{formatINR(result.interestOnRefund)}</span></div>
              )}
              <div style={s.timeline}>
                <div style={s.timelineTitle}>Refund Timeline</div>
                <div style={s.step}><span style={s.stepDot} /><span>File ITR on incometax.gov.in</span></div>
                <div style={s.step}><span style={s.stepDot} /><span>E-verify within 30 days (Aadhaar OTP / Net Banking / DSC)</span></div>
                <div style={s.step}><span style={s.stepDot} /><span>CPC Bangalore processes the return (1-3 months)</span></div>
                <div style={s.step}><span style={s.stepDot} /><span>Refund credited to pre-validated bank account (4-6 months total)</span></div>
              </div>
            </>
          ) : result.taxDue > 0 ? (
            <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
              <span style={{ ...s.highlight, color: 'var(--doaide-error)' }}>Additional Tax Due</span>
              <span style={{ ...s.highlight, color: 'var(--doaide-error)' }}>{formatINR(result.taxDue)}</span>
            </div>
          ) : (
            <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
              <span style={s.highlight}>No Refund, No Tax Due</span>
              <span style={{ ...s.highlight, color: 'var(--doaide-success)' }}>₹0</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
