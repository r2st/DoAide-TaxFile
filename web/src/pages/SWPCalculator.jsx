import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateSWP, formatINR } from '../lib/taxEngine'

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
  alert: { marginTop: 16, padding: 12, borderRadius: 8, background: 'var(--doaide-warning-bg, #fff3cd)', border: '1px solid var(--doaide-warning-border, #ffc107)', fontSize: 13, color: 'var(--doaide-text-primary)' },
}

const FAQS = [
  { q: 'What is SWP (Systematic Withdrawal Plan)?', a: 'SWP is the opposite of SIP. It lets you withdraw a fixed amount from your mutual fund investment at regular intervals (monthly/quarterly) while the remaining amount continues to earn returns.' },
  { q: 'How does SWP work?', a: 'In SWP, you invest a lump sum and set up regular withdrawals. The remaining corpus continues to grow based on market returns. If the returns exceed your withdrawal rate, your corpus can actually grow over time.' },
  { q: 'Is SWP better than FD interest for regular income?', a: 'SWP from equity funds held over 1 year is taxed at 12.5% LTCG (above ₹1.25 lakh exemption), which is often lower than the tax on FD interest (taxed at your slab rate). SWP also offers potential capital appreciation.' },
  { q: 'What is a safe withdrawal rate?', a: 'A common rule of thumb is the "4% rule" — withdrawing 4% of your corpus annually (adjusted for inflation) should make your corpus last 25-30 years. In India, with higher inflation, 3-3.5% is often suggested.' },
]

export default function SWPCalculator() {
  const [form, setForm] = useState({ corpus: '', withdrawal: '', returnRate: '10', years: '20' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateSWP(Number(form.corpus) || 0, Number(form.withdrawal) || 0, Number(form.returnRate) || 10, Number(form.years) || 20)
    setResult(r)
  }

  const shareText = result ? `SWP Plan\nCorpus: ${formatINR(result.initialCorpus)}\nMonthly Withdrawal: ${formatINR(result.monthlyWithdrawal)}\nTotal Withdrawn: ${formatINR(result.totalWithdrawn)}\nRemaining: ${formatINR(result.finalBalance)}\n\ntax.doaide.com/swp-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="SWP Calculator - Systematic Withdrawal Plan Calculator | DoAide TaxFile"
        description="Free SWP calculator. Plan your regular income from mutual fund investments. See how long your corpus will last with monthly withdrawals."
        keywords="SWP calculator, systematic withdrawal plan calculator, mutual fund withdrawal calculator, SWP returns calculator"
        canonical="https://tax.doaide.com/swp-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>SWP Calculator</h1>
      <p style={s.subtitle}>Systematic Withdrawal Plan — Plan your regular income</p>

      <div style={s.form}>
        <InputField label="Total Investment (Corpus)" value={form.corpus} onChange={set('corpus')} currency />
        <InputField label="Monthly Withdrawal" value={form.withdrawal} onChange={set('withdrawal')} currency />
        <InputField label="Expected Return (% p.a.)" type="number" value={form.returnRate} onChange={set('returnRate')} placeholder="10" />
        <InputField label="Withdrawal Period (Years)" type="number" value={form.years} onChange={set('years')} placeholder="20" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate SWP</button>

      {result && (
        <ResultCard title="SWP Summary" gold>
          <div style={s.row}><span style={s.rowLabel}>Initial Corpus</span><span style={s.rowValue}>{formatINR(result.initialCorpus)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Monthly Withdrawal</span><span style={s.rowValue}>{formatINR(result.monthlyWithdrawal)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Withdrawn</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.totalWithdrawn)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Remaining Balance</span>
            <span style={s.highlight}>{formatINR(result.finalBalance)}</span>
          </div>
          {result.corpusExhausted && (
            <div style={s.alert}>
              ⚠ Your corpus would be exhausted in {Math.floor(result.monthsLasted / 12)} years {result.monthsLasted % 12} months. Consider reducing your monthly withdrawal or increasing the corpus.
            </div>
          )}
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
