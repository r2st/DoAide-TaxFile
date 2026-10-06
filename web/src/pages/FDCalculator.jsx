import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateFD, formatINR } from '../lib/taxEngine'

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
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  sectionLabel: { fontSize: 12, fontWeight: 600, color: 'var(--doaide-gold)', marginTop: 16, marginBottom: 8, textTransform: 'uppercase' },
  infoBox: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
}

const FAQS = [
  { q: 'How is FD interest calculated?', a: 'FD interest is calculated using the compound interest formula: A = P × (1 + r/n)^(n×t), where P is principal, r is annual rate, n is compounding frequency, and t is tenure in years. Most banks compound quarterly.' },
  { q: 'Is TDS deducted on FD interest?', a: 'Yes, banks deduct TDS at 10% if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). If you don\'t have a PAN, TDS is deducted at 20%. Submit Form 15G/15H if your total income is below the taxable limit.' },
  { q: 'What is a tax-saver FD?', a: 'Tax-saver FDs have a 5-year lock-in and qualify for Section 80C deduction up to ₹1.5 lakh. However, the interest earned is fully taxable. These FDs cannot be withdrawn prematurely.' },
  { q: 'Which compounding frequency gives the best returns?', a: 'Monthly compounding gives slightly better returns than quarterly, which is better than annual. For example, on ₹10 lakh at 7% for 5 years: monthly compounding gives ₹14,17,625 vs quarterly ₹14,14,778.' },
]

export default function FDCalculator() {
  const [form, setForm] = useState({ principal: '', rate: '7', tenure: '5', compounding: '4', isSenior: false })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateFD(
      Number(form.principal) || 0,
      Number(form.rate) || 7,
      Number(form.tenure) || 5,
      Number(form.compounding) || 4,
      form.isSenior,
    )
    setResult(r)
  }

  const shareText = result ? `FD Returns\nPrincipal: ${formatINR(result.principal)}\nMaturity: ${formatINR(result.maturityAmount)}\nInterest: ${formatINR(result.totalInterest)}\n\ntax.doaide.com/fd-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="FD Calculator - Fixed Deposit Interest & TDS | DoAide TaxFile"
        description="Calculate FD maturity amount with different compounding frequencies. See TDS impact on your fixed deposit returns."
        keywords="FD calculator, fixed deposit calculator, FD interest calculator, FD maturity calculator, TDS on FD"
        canonical="https://tax.doaide.com/fd-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>FD Calculator</h1>
      <p style={s.subtitle}>Fixed Deposit — Calculate maturity amount with TDS impact</p>

      <div style={s.form}>
        <InputField label="Principal Amount" value={form.principal} onChange={set('principal')} currency />
        <InputField label="Interest Rate (% p.a.)" type="number" value={form.rate} onChange={set('rate')} placeholder="7" />
        <InputField label="Tenure (Years)" type="number" value={form.tenure} onChange={set('tenure')} placeholder="5" />
        <InputField label="Compounding" type="select" value={form.compounding} onChange={set('compounding')}
          options={[
            { value: '1', label: 'Annually' },
            { value: '2', label: 'Half-Yearly' },
            { value: '4', label: 'Quarterly' },
            { value: '12', label: 'Monthly' },
          ]} />
        <InputField label="Senior Citizen (60+)" type="checkbox" value={form.isSenior} onChange={set('isSenior')} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate FD Returns</button>

      {result && (
        <ResultCard title="FD Maturity Details" gold>
          <div style={s.row}><span style={s.rowLabel}>Principal</span><span style={s.rowValue}>{formatINR(result.principal)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Rate ({result.compoundingLabel} compounding)</span><span style={s.rowValue}>{result.annualRate}%</span></div>
          <div style={s.row}><span style={s.rowLabel}>Tenure</span><span style={s.rowValue}>{result.tenureYears} years</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Interest Earned</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.totalInterest)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Maturity Amount</span>
            <span style={s.highlight}>{formatINR(result.maturityAmount)}</span>
          </div>

          <div style={s.sectionLabel}>TDS Impact</div>
          <div style={s.row}><span style={s.rowLabel}>TDS Threshold</span><span style={s.rowValue}>{formatINR(result.tdsThreshold)}/year</span></div>
          <div style={s.row}><span style={s.rowLabel}>TDS Applicable</span><span style={s.rowValue}>{result.tdsApplicable ? 'Yes (10%)' : 'No'}</span></div>
          {result.tdsApplicable && (
            <>
              <div style={s.row}><span style={s.rowLabel}>TDS Deducted</span><span style={{ ...s.rowValue, color: '#ef4444' }}>-{formatINR(result.tdsAmount)}</span></div>
              <div style={s.row}><span style={s.rowLabel}>Effective Return After TDS</span><span style={s.rowValue}>{formatINR(result.effectiveReturn)}</span></div>
            </>
          )}

          <div style={s.infoBox}>
            <strong>Note:</strong> TDS is deducted at source if annual interest exceeds {formatINR(result.tdsThreshold)}.
            Submit Form 15G (or 15H for seniors) if your total income is below the taxable limit to avoid TDS.
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
