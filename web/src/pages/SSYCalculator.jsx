import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import HowItWorks from '../components/HowItWorks'
import { calculateSSY, formatINR } from '../lib/taxEngine'

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
  { q: 'Who is eligible for Sukanya Samriddhi Yojana?', a: 'Parents or legal guardians of a girl child below 10 years of age can open an SSY account. A maximum of two accounts can be opened — one per girl child. The scheme is available at post offices and authorized banks.' },
  { q: 'What is the current SSY interest rate?', a: 'The current SSY interest rate is 8.2% per annum (as of FY 2026-27). The rate is reviewed and set by the government every quarter. It is one of the highest rates among small savings schemes.' },
  { q: 'When does SSY mature and can I withdraw early?', a: 'SSY matures 21 years from the date of opening. Deposits are required only for the first 15 years. Partial withdrawal (up to 50% of balance) is allowed after the girl turns 18 for education or marriage.' },
  { q: 'What are the tax benefits of SSY?', a: 'SSY enjoys EEE (Exempt-Exempt-Exempt) tax status. The annual deposit qualifies for Section 80C deduction (up to ₹1.5L), the interest earned is tax-free, and the maturity amount is completely tax-free.' },
  { q: 'What is the minimum and maximum deposit in SSY?', a: 'The minimum annual deposit is ₹250 and the maximum is ₹2,50,000. If you miss the minimum deposit, a penalty of ₹50 per year applies to revive the account.' },
]

const STEPS = [
  'Enter the annual investment amount you plan to deposit (minimum ₹250, maximum ₹2,50,000 per year).',
  'Enter the girl child\'s current age — deposits are allowed until she turns 15 (from account opening).',
  'The calculator computes year-by-year returns at the current 8.2% interest rate.',
  'The account matures 21 years from opening. Interest compounds annually even after deposits stop.',
  'You get Section 80C tax deduction on deposits and the entire maturity amount is tax-free (EEE status).',
]

export default function SSYCalculator() {
  const [form, setForm] = useState({ annualInvestment: '', girlAge: '', existingBalance: '', interestRate: '8.2' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateSSY(
      Number(form.annualInvestment) || 0,
      Number(form.existingBalance) || 0,
      Number(form.girlAge) || 0,
      Number(form.interestRate) || 8.2,
    )
    setResult(r)
  }

  const shareText = result ? `SSY Maturity: ${formatINR(result.maturityAmount)}\nInvested: ${formatINR(result.totalInvested)}\nInterest: ${formatINR(result.totalInterest)}\nTax Benefit: EEE (fully tax-free)\n\ntax.doaide.com/ssy-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Sukanya Samriddhi Yojana Calculator - SSY Returns | DoAide TaxFile"
        description="Calculate Sukanya Samriddhi Yojana returns with year-by-year breakdown. Current rate 8.2% p.a., 21-year maturity, EEE tax benefit under Section 80C."
        keywords="SSY calculator, Sukanya Samriddhi Yojana calculator, SSY interest rate, SSY returns, Section 80C SSY"
        canonical="https://tax.doaide.com/ssy-calculator"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Investment Calculators' }, { label: 'SSY Calculator' }]} />

      <h1 style={s.title}>Sukanya Samriddhi Calculator</h1>
      <p style={s.subtitle}>Calculate SSY returns at 8.2% p.a. — 21-year maturity with EEE tax benefit</p>

      <HowItWorks steps={STEPS} />

      <div style={s.form}>
        <InputField label="Annual Investment" value={form.annualInvestment} onChange={set('annualInvestment')} currency hint="Min ₹250, Max ₹2,50,000" />
        <InputField label="Girl's Current Age" type="number" value={form.girlAge} onChange={set('girlAge')} placeholder="0" hint="Account must be opened before age 10" />
        <InputField label="Existing Balance" value={form.existingBalance} onChange={set('existingBalance')} currency hint="Current SSY balance (optional)" />
        <InputField label="Interest Rate (%)" type="number" value={form.interestRate} onChange={set('interestRate')} placeholder="8.2" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate SSY Returns</button>

      {result && (
        <ResultCard title="SSY Maturity Projection" gold>
          <div style={s.row}><span style={s.rowLabel}>Deposit Period</span><span style={s.rowValue}>{result.depositYears} years</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Invested</span><span style={s.rowValue}>{formatINR(result.totalInvested)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Interest Earned</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.totalInterest)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Tax Saved (80C/year)</span><span style={s.rowValue}>{formatINR(Math.round(result.taxBenefit80C * 0.312))}</span></div>
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
                  <th style={s.th}>Age</th>
                  <th style={s.th}>Investment</th>
                  <th style={s.th}>Interest</th>
                  <th style={s.th}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map(row => (
                  <tr key={row.year}>
                    <td style={s.td}>{row.year}</td>
                    <td style={s.td}>{row.age}</td>
                    <td style={s.td}>{row.investment > 0 ? formatINR(row.investment) : '—'}</td>
                    <td style={s.td}>{formatINR(row.interest)}</td>
                    <td style={{ ...s.td, fontWeight: 600 }}>{formatINR(row.balance)}</td>
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
