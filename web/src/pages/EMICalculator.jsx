import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateEMI, formatINR } from '../lib/taxEngine'

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
  emiBox: {
    marginTop: 20, padding: 20, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    textAlign: 'center',
  },
  emiAmount: { fontSize: 36, fontWeight: 700, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-gold)' },
  emiLabel: { fontSize: 14, color: 'var(--doaide-text-secondary)', marginTop: 4 },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 13 },
  th: { textAlign: 'left', padding: '8px 6px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600 },
  td: { padding: '8px 6px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  bar: { display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32, marginTop: 20 },
}

const FAQS = [
  { q: 'How is EMI calculated?', a: 'EMI is calculated using the formula: EMI = P × r × (1+r)^n / [(1+r)^n - 1], where P is loan amount, r is monthly interest rate, and n is total number of monthly installments. This ensures equal payments throughout the loan tenure.' },
  { q: 'What is an amortization schedule?', a: 'An amortization schedule shows the breakup of each EMI into principal and interest components. In the initial years, interest forms a larger portion; towards the end, principal repayment dominates.' },
  { q: 'Should I choose a longer or shorter tenure?', a: 'Shorter tenure means higher EMI but lower total interest. Longer tenure reduces EMI but significantly increases total interest paid. For example, a ₹50L loan at 8.5% costs ₹28L interest over 20 years but ₹50L over 30 years.' },
  { q: 'Can I get tax benefits on EMI?', a: 'For home loans: principal up to ₹1.5L under 80C, interest up to ₹2L under Section 24(b). Education loans: full interest deduction under 80E for 8 years. Personal and car loans have no tax benefit.' },
]

export default function EMICalculator() {
  const [form, setForm] = useState({ loanAmount: '', rate: '8.5', tenure: '20' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateEMI(
      Number(form.loanAmount) || 0,
      Number(form.rate) || 8.5,
      Number(form.tenure) || 20,
    )
    setResult(r)
  }

  const shareText = result ? `EMI: ${formatINR(result.emi)}/month\nLoan: ${formatINR(result.loanAmount)} at ${result.annualRate}% for ${result.tenureYears} years\nTotal Interest: ${formatINR(result.totalInterest)}\n\ntax.doaide.com/emi-calculator` : ''
  const principalPct = result && result.totalPayment > 0 ? Math.round((result.loanAmount / result.totalPayment) * 100) : 50

  return (
    <div style={s.page}>
      <SEOHead
        title="EMI Calculator - Home, Car & Personal Loan | DoAide TaxFile"
        description="Calculate EMI for home loan, car loan, and personal loan with amortization schedule. See principal vs interest breakup year by year."
        keywords="EMI calculator, home loan EMI calculator, car loan EMI, personal loan EMI calculator, amortization schedule"
        canonical="https://tax.doaide.com/emi-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>EMI Calculator</h1>
      <p style={s.subtitle}>Home, Car & Personal Loan — EMI with amortization schedule</p>

      <div style={s.form}>
        <InputField label="Loan Amount" value={form.loanAmount} onChange={set('loanAmount')} currency />
        <InputField label="Interest Rate (% p.a.)" type="number" value={form.rate} onChange={set('rate')} placeholder="8.5" />
        <InputField label="Tenure (Years)" type="number" value={form.tenure} onChange={set('tenure')} placeholder="20" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate EMI</button>

      {result && (
        <ResultCard title="EMI Breakdown" gold>
          <div style={s.emiBox}>
            <div style={s.emiAmount}>{formatINR(result.emi)}</div>
            <div style={s.emiLabel}>Monthly EMI</div>
          </div>

          <div style={s.row}><span style={s.rowLabel}>Loan Amount</span><span style={s.rowValue}>{formatINR(result.loanAmount)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Interest</span><span style={{ ...s.rowValue, color: '#ef4444' }}>{formatINR(result.totalInterest)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Total Payment</span>
            <span style={s.highlight}>{formatINR(result.totalPayment)}</span>
          </div>

          <div style={s.bar}>
            <div style={{ background: 'var(--doaide-gold)', width: `${principalPct}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--doaide-text-on-gold)' }}>Principal</div>
            <div style={{ background: '#ef4444', width: `${100 - principalPct}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#fff' }}>Interest</div>
          </div>

          <div style={s.sectionLabel}>Amortization Schedule (Yearly)</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Year</th>
                  <th style={s.th}>Principal</th>
                  <th style={s.th}>Interest</th>
                  <th style={s.th}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map(row => (
                  <tr key={row.year}>
                    <td style={s.td}>{row.year}</td>
                    <td style={s.td}>{formatINR(row.principalPaid)}</td>
                    <td style={s.td}>{formatINR(row.interestPaid)}</td>
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
