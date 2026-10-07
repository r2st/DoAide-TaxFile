import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateLumpsum, formatINR } from '../lib/taxEngine'

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
  { q: 'What is a lumpsum investment?', a: 'A lumpsum investment is when you invest a large amount of money at once in a mutual fund or other asset, as opposed to investing smaller amounts periodically through SIP.' },
  { q: 'Lumpsum vs SIP — which is better?', a: 'Lumpsum works best when markets are at a low or you have a windfall (bonus, inheritance). SIP is better for regular salary earners as it averages out market volatility. Both can be combined.' },
  { q: 'How are lumpsum mutual fund returns calculated?', a: 'Lumpsum returns use compound interest: Future Value = Principal × (1 + r)^n, where r is the annual return rate and n is the number of years.' },
  { q: 'What is a good return rate for lumpsum investment?', a: 'Historically, equity mutual funds in India have returned 12-15% CAGR over long periods (10+ years). Debt funds return 6-8%. Actual returns depend on market conditions and fund selection.' },
]

export default function LumpsumCalculator() {
  const [form, setForm] = useState({ principal: '', returnRate: '12', years: '10' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateLumpsum(Number(form.principal) || 0, Number(form.returnRate) || 12, Number(form.years) || 10)
    setResult(r)
  }

  const shareText = result ? `Lumpsum Returns\nInvested: ${formatINR(result.principal)}\nValue after ${result.years}yr: ${formatINR(result.futureValue)}\nGains: ${formatINR(result.totalGains)}\n\ntax.doaide.com/lumpsum-calculator` : ''
  const investedPct = result ? Math.round((result.principal / result.futureValue) * 100) : 0

  return (
    <div style={s.page}>
      <SEOHead
        title="Lumpsum Calculator - One-Time Investment Returns | DoAide TaxFile"
        description="Free lumpsum investment calculator. Calculate how your one-time investment grows over time with compound interest. Compare with SIP returns."
        keywords="lumpsum calculator, lump sum calculator, one time investment calculator, mutual fund lumpsum calculator"
        canonical="https://tax.doaide.com/lumpsum-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Lumpsum Calculator</h1>
      <p style={s.subtitle}>Calculate returns on your one-time investment</p>

      <div style={s.form}>
        <InputField label="Investment Amount" value={form.principal} onChange={set('principal')} currency />
        <InputField label="Expected Return (% p.a.)" type="number" value={form.returnRate} onChange={set('returnRate')} placeholder="12" />
        <InputField label="Investment Period (Years)" type="number" value={form.years} onChange={set('years')} placeholder="10" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Returns</button>

      {result && (
        <ResultCard title="Lumpsum Investment Returns" gold>
          <div style={s.row}><span style={s.rowLabel}>Amount Invested</span><span style={s.rowValue}>{formatINR(result.principal)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Estimated Returns</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.totalGains)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Total Value</span>
            <span style={s.highlight}>{formatINR(result.futureValue)}</span>
          </div>
          <div style={s.bar}>
            <div style={{ ...s.barInvested, width: `${investedPct}%` }}>Invested</div>
            <div style={{ ...s.barGained, width: `${100 - investedPct}%` }}>Returns</div>
          </div>
          <div style={s.legend}>
            <span><span style={{ ...s.legendDot, background: 'var(--doaide-gold)' }} /> Invested: {formatINR(result.principal)}</span>
            <span><span style={{ ...s.legendDot, background: 'var(--doaide-success)' }} /> Returns: {formatINR(result.totalGains)}</span>
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
