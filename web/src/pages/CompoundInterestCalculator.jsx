import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateCompoundInterest, formatINR } from '../lib/taxEngine'

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
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 13 },
  th: { textAlign: 'left', padding: '8px 6px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600 },
  td: { padding: '8px 6px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  formula: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
}

const FAQS = [
  { q: 'What is compound interest?', a: 'Compound interest is interest calculated on the initial principal and also on the accumulated interest from previous periods. It\'s "interest on interest" and makes your money grow faster than simple interest.' },
  { q: 'How does compounding frequency affect returns?', a: 'More frequent compounding generates higher returns. Daily compounding > Monthly > Quarterly > Half-Yearly > Annually. However, the difference between daily and monthly compounding is usually negligible.' },
  { q: 'What is the rule of 72?', a: 'The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by the annual interest rate. For example, at 8% interest, money doubles in approximately 72/8 = 9 years.' },
  { q: 'How is compound interest different from simple interest?', a: 'Simple interest is calculated only on the principal amount. Compound interest is calculated on principal plus accumulated interest. Over long periods, compound interest generates significantly more returns than simple interest.' },
]

export default function CompoundInterestCalculator() {
  const [form, setForm] = useState({ principal: '', rate: '8', years: '10', compounding: '1' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateCompoundInterest(
      Number(form.principal) || 0,
      Number(form.rate) || 8,
      Number(form.years) || 10,
      Number(form.compounding) || 1,
    )
    setResult(r)
  }

  const shareText = result ? `Compound Interest\nPrincipal: ${formatINR(result.principal)}\nTotal Amount: ${formatINR(result.totalAmount)}\nInterest Earned: ${formatINR(result.totalInterest)}\n\ntax.doaide.com/compound-interest-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Compound Interest Calculator - CI vs SI | DoAide TaxFile"
        description="Calculate compound interest with different compounding frequencies. Compare compound vs simple interest. Year-by-year growth breakdown."
        keywords="compound interest calculator, CI calculator, compound vs simple interest, compounding frequency calculator"
        canonical="https://tax.doaide.com/compound-interest-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Compound Interest Calculator</h1>
      <p style={s.subtitle}>Compare compound vs simple interest with different frequencies</p>

      <div style={s.form}>
        <InputField label="Principal Amount" value={form.principal} onChange={set('principal')} currency />
        <InputField label="Annual Interest Rate (%)" type="number" value={form.rate} onChange={set('rate')} placeholder="8" />
        <InputField label="Time Period (Years)" type="number" value={form.years} onChange={set('years')} placeholder="10" />
        <InputField label="Compounding Frequency" type="select" value={form.compounding} onChange={set('compounding')}
          options={[
            { value: '1', label: 'Annually' },
            { value: '2', label: 'Half-Yearly' },
            { value: '4', label: 'Quarterly' },
            { value: '12', label: 'Monthly' },
            { value: '365', label: 'Daily' },
          ]} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate</button>

      {result && (
        <ResultCard title="Interest Calculation" gold>
          <div style={s.row}><span style={s.rowLabel}>Principal</span><span style={s.rowValue}>{formatINR(result.principal)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Compound Interest ({result.compoundingLabel})</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.totalInterest)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Simple Interest (comparison)</span><span style={s.rowValue}>{formatINR(result.simpleInterest)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Compounding Benefit</span><span style={{ ...s.rowValue, color: 'var(--doaide-gold)' }}>+{formatINR(result.compoundingBenefit)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Total Amount</span>
            <span style={s.highlight}>{formatINR(result.totalAmount)}</span>
          </div>

          <div style={s.formula}>
            A = P × (1 + r/n)^(n×t) = {formatINR(result.principal)} × (1 + {result.annualRate}% / {result.compoundingFrequency})^({result.compoundingFrequency} × {result.years}) = {formatINR(result.totalAmount)}
          </div>

          <div style={s.sectionLabel}>Year-by-Year Growth</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Year</th>
                  <th style={s.th}>Balance</th>
                  <th style={s.th}>Total Interest</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.map(row => (
                  <tr key={row.year}>
                    <td style={s.td}>{row.year}</td>
                    <td style={{ ...s.td, fontWeight: 600 }}>{formatINR(row.balance)}</td>
                    <td style={s.td}>{formatINR(row.interest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
