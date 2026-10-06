import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import FAQSection from '../components/FAQSection'
import { calculateAdvanceTax, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 700, margin: '0 auto' },
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
  timeline: { marginTop: 24 },
  installment: {
    display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0',
    borderBottom: '1px solid var(--doaide-border)',
  },
  dot: {
    width: 12, height: 12, borderRadius: '50%', background: 'var(--doaide-gold)',
    flexShrink: 0,
  },
  installmentDate: { fontSize: 14, fontWeight: 600, minWidth: 160 },
  installmentPct: { fontSize: 13, color: 'var(--doaide-text-muted)', minWidth: 80 },
  installmentAmt: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 600, color: 'var(--doaide-gold)', marginLeft: 'auto' },
}

const FAQS = [
  { q: 'Who needs to pay advance tax?', a: 'Anyone whose total tax liability after TDS exceeds ₹10,000 in a financial year must pay advance tax. This includes salaried individuals with significant other income, freelancers, and businesses.' },
  { q: 'What are the advance tax due dates?', a: 'Advance tax must be paid in 4 installments: 15% by June 15, 45% by September 15 (cumulative), 75% by December 15 (cumulative), and 100% by March 15.' },
  { q: 'What is interest under Section 234B?', a: 'If advance tax paid is less than 90% of the assessed tax, interest at 1% per month is charged under Section 234B from April 1 of the assessment year until the date of tax payment or assessment.' },
  { q: 'What is interest under Section 234C?', a: 'Section 234C applies when there is a shortfall in any installment of advance tax. Interest at 1% per month is charged for 3 months on the shortfall amount for each missed/short installment.' },
]

export default function AdvanceTaxCalculator() {
  const [form, setForm] = useState({ totalTax: '', tdsDeducted: '' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateAdvanceTax(Number(form.totalTax) || 0, Number(form.tdsDeducted) || 0)
    setResult(r)
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="Advance Tax Calculator - Quarterly Installments | DoAide TaxFile"
        description="Calculate advance tax installments with due dates for FY 2026-27. Interest calculation under Section 234B and 234C."
        keywords="advance tax calculator, advance tax due dates, Section 234B, Section 234C, quarterly tax installments"
        canonical="https://tax.doaide.com/advance-tax-calculator"
      />

      <h1 style={s.title}>Advance Tax Calculator</h1>
      <p style={s.subtitle}>FY 2026-27 — Quarterly installment schedule</p>

      <div style={s.form}>
        <InputField label="Total Estimated Tax" value={form.totalTax} onChange={set('totalTax')} currency hint="Your total income tax for the year" />
        <InputField label="TDS Already Deducted" value={form.tdsDeducted} onChange={set('tdsDeducted')} currency hint="From salary, interest, etc." />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Installments</button>

      {result && (
        <ResultCard gold>
          <div style={s.row}>
            <span style={s.rowLabel}>Total Estimated Tax</span>
            <span style={s.rowValue}>{formatINR(result.totalTax)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>TDS Already Deducted</span>
            <span style={s.rowValue}>{formatINR(result.tdsDeducted)}</span>
          </div>
          <div style={{ ...s.row, fontSize: 16 }}>
            <span style={{ fontWeight: 600 }}>Net Tax Payable</span>
            <span style={{ fontFamily: 'var(--doaide-font-mono)', fontWeight: 600, color: 'var(--doaide-gold)' }}>
              {formatINR(result.netTax)}
            </span>
          </div>

          {!result.applicable ? (
            <div style={{ padding: '16px 0', color: 'var(--doaide-text-secondary)', fontSize: 14 }}>
              Advance tax is not applicable as net tax liability is less than ₹10,000.
              You can pay the entire amount at the time of filing ITR.
            </div>
          ) : (
            <div style={s.timeline}>
              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Quarterly Schedule</h4>
              {result.installments.map((inst, i) => (
                <div key={i} style={s.installment}>
                  <span style={s.dot} />
                  <span style={s.installmentDate}>{inst.dueDate}</span>
                  <span style={s.installmentPct}>{inst.cumulativePct}% cumulative</span>
                  <span style={s.installmentAmt}>{formatINR(inst.amount)}</span>
                </div>
              ))}
              <div style={{ ...s.installment, borderBottom: 'none', fontWeight: 600 }}>
                <span style={{ ...s.dot, background: 'var(--doaide-success)' }} />
                <span style={s.installmentDate}>Total</span>
                <span style={s.installmentPct} />
                <span style={s.installmentAmt}>{formatINR(result.netTax)}</span>
              </div>
            </div>
          )}
        </ResultCard>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
