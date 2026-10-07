import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateRD, formatINR } from '../lib/taxEngine'

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
  bar: { display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32, marginTop: 20 },
  barInvested: { background: 'var(--doaide-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--doaide-text-on-gold)' },
  barGained: { background: 'var(--doaide-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#fff' },
  legend: { display: 'flex', gap: 20, marginTop: 8, fontSize: 12, color: 'var(--doaide-text-secondary)' },
  legendDot: { width: 10, height: 10, borderRadius: 2, display: 'inline-block', marginRight: 6, verticalAlign: 'middle' },
}

const FAQS = [
  { q: 'What is a Recurring Deposit (RD)?', a: 'An RD is a bank deposit where you invest a fixed amount every month for a chosen tenure. It earns compound interest (usually compounded quarterly) and the full maturity amount is paid at the end of the tenure.' },
  { q: 'How is RD interest calculated?', a: 'RD interest is calculated using quarterly compounding. Each monthly deposit earns interest for its remaining tenure. The formula is: M = R × [(1 + i/n)^(n×t) − 1] / (1 − (1 + i/n)^(−1/3)), where R is monthly deposit, i is annual interest rate, n is compounding frequency.' },
  { q: 'Is RD interest taxable?', a: 'Yes, RD interest is fully taxable under "Income from Other Sources." If total interest from all FDs/RDs exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year, TDS at 10% is deducted by the bank.' },
  { q: 'RD vs FD — which is better?', a: 'FD gives slightly higher returns as the entire amount earns interest from day one. RD is better for those who want to save a fixed amount monthly and don\'t have a lump sum to invest.' },
]

export default function RDCalculator() {
  const [form, setForm] = useState({ monthlyDeposit: '', annualRate: '7.0', years: '5' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateRD(Number(form.monthlyDeposit) || 0, Number(form.annualRate) || 7, Number(form.years) || 5)
    setResult(r)
  }

  const shareText = result ? `RD Maturity\nMonthly: ${formatINR(result.monthlyDeposit)}\nInvested: ${formatINR(result.totalInvested)}\nInterest: ${formatINR(result.totalInterest)}\nMaturity: ${formatINR(result.maturityValue)}\n\ntax.doaide.com/rd-calculator` : ''
  const investedPct = result ? Math.round((result.totalInvested / result.maturityValue) * 100) : 0

  return (
    <div style={s.page}>
      <SEOHead
        title="RD Calculator - Recurring Deposit Maturity Calculator | DoAide TaxFile"
        description="Free RD calculator to calculate recurring deposit maturity amount and interest. Compare RD returns across banks with quarterly compounding."
        keywords="RD calculator, recurring deposit calculator, RD maturity calculator, RD interest calculator"
        canonical="https://tax.doaide.com/rd-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>RD Calculator</h1>
      <p style={s.subtitle}>Recurring Deposit — Calculate your maturity amount</p>

      <div style={s.form}>
        <InputField label="Monthly Deposit" value={form.monthlyDeposit} onChange={set('monthlyDeposit')} currency />
        <InputField label="Interest Rate (% p.a.)" type="number" value={form.annualRate} onChange={set('annualRate')} placeholder="7.0" />
        <InputField label="Tenure (Years)" type="number" value={form.years} onChange={set('years')} placeholder="5" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate RD Maturity</button>

      {result && (
        <ResultCard title="RD Maturity Details" gold>
          <div style={s.row}><span style={s.rowLabel}>Total Invested</span><span style={s.rowValue}>{formatINR(result.totalInvested)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Interest Earned</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.totalInterest)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Maturity Value</span>
            <span style={s.highlight}>{formatINR(result.maturityValue)}</span>
          </div>
          <div style={s.bar}>
            <div style={{ ...s.barInvested, width: `${investedPct}%` }}>Invested</div>
            <div style={{ ...s.barGained, width: `${100 - investedPct}%` }}>Interest</div>
          </div>
          <div style={s.legend}>
            <span><span style={{ ...s.legendDot, background: 'var(--doaide-gold)' }} /> Invested: {formatINR(result.totalInvested)}</span>
            <span><span style={{ ...s.legendDot, background: 'var(--doaide-success)' }} /> Interest: {formatINR(result.totalInterest)}</span>
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
