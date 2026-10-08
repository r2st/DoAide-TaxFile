import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculatePPF, formatINR } from '../lib/taxEngine'

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
}

const FAQS = [
  { q: 'What is PPF and what is the current interest rate?', a: 'Public Provident Fund (PPF) is a government-backed long-term savings scheme. The current interest rate is 7.1% per annum, compounded annually. The rate is reviewed quarterly by the government.' },
  { q: 'What is the lock-in period for PPF?', a: 'PPF has a 15-year lock-in period. Partial withdrawals are allowed from the 7th year onwards. The account can be extended in blocks of 5 years after maturity.' },
  { q: 'What is the maximum annual investment in PPF?', a: 'The minimum annual deposit is ₹500 and the maximum is ₹1,50,000. Deposits can be made in a maximum of 12 installments per year.' },
  { q: 'Is PPF interest taxable?', a: 'No. PPF enjoys EEE (Exempt-Exempt-Exempt) status. The investment qualifies for Section 80C deduction, the interest earned is tax-free, and the maturity amount is also tax-free.' },
]

export default function PPFCalculator() {
  const [form, setForm] = useState({ annualInvestment: '', existingBalance: '', yearsRemaining: '15', interestRate: '7.1' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculatePPF(
      Number(form.annualInvestment) || 0,
      Number(form.existingBalance) || 0,
      Number(form.yearsRemaining) || 15,
      Number(form.interestRate) || 7.1,
    )
    setResult(r)
  }

  const shareText = result ? `PPF Maturity: ${formatINR(result.maturityAmount)}\nInvested: ${formatINR(result.totalInvested)}\nInterest Earned: ${formatINR(result.totalInterest)}\n\ntax.doaide.com/ppf-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="PPF Calculator - Public Provident Fund Returns | DoAide TaxFile"
        description="Calculate PPF maturity amount with year-by-year breakdown. Current rate 7.1% p.a. with 15-year lock-in. Tax-free under Section 80C."
        keywords="PPF calculator, public provident fund calculator, PPF interest rate, PPF maturity calculator, Section 80C PPF"
        canonical="https://tax.doaide.com/ppf-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>PPF Calculator</h1>
      <p style={s.subtitle}>Public Provident Fund — Year-by-year returns at 7.1% p.a.</p>

      <div style={s.form}>
        <InputField label="Annual Investment" value={form.annualInvestment} onChange={set('annualInvestment')} currency hint="Max ₹1,50,000 per year" />
        <InputField label="Existing Balance" value={form.existingBalance} onChange={set('existingBalance')} currency hint="Current PPF balance (optional)" />
        <InputField label="Years Remaining" type="number" value={form.yearsRemaining} onChange={set('yearsRemaining')} placeholder="15" />
        <InputField label="Interest Rate (%)" type="number" value={form.interestRate} onChange={set('interestRate')} placeholder="7.1" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate PPF Returns</button>

      {result && (
        <ResultCard title="PPF Maturity Projection" gold>
          <div style={s.row}><span style={s.rowLabel}>Total Invested</span><span style={s.rowValue}>{formatINR(result.totalInvested)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Interest Earned</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.totalInterest)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Maturity Amount</span>
            <span style={s.highlight}>{formatINR(result.maturityAmount)}</span>
          </div>

          <div style={s.sectionLabel}>Year-by-Year Breakdown</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Year</th>
                  <th style={s.th}>Investment</th>
                  <th style={s.th}>Interest</th>
                  <th style={s.th}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map(row => (
                  <tr key={row.year}>
                    <td style={s.td}>{row.year}</td>
                    <td style={s.td}>{formatINR(row.investment)}</td>
                    <td style={s.td}>{formatINR(row.interest)}</td>
                    <td style={{ ...s.td, fontWeight: 600 }}>{formatINR(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
