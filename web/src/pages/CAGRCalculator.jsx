import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateCAGR, formatINR, formatPct } from '../lib/taxEngine'

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
  cagrBox: { marginTop: 20, padding: 20, textAlign: 'center', borderRadius: 12, background: 'var(--doaide-gold-alpha, rgba(200,170,80,0.08))', border: '1px solid var(--doaide-gold)' },
  cagrValue: { fontSize: 36, fontWeight: 700, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-gold)' },
  cagrLabel: { fontSize: 13, color: 'var(--doaide-text-secondary)', marginTop: 4 },
}

const FAQS = [
  { q: 'What is CAGR?', a: 'CAGR (Compound Annual Growth Rate) is the average annual rate of return of an investment over a specified period, assuming profits are reinvested at the end of each year. It smooths out volatility to give a single growth rate.' },
  { q: 'How is CAGR calculated?', a: 'CAGR = (Ending Value / Beginning Value)^(1/Years) − 1. For example, if ₹1 lakh grows to ₹2 lakh in 5 years: CAGR = (2,00,000/1,00,000)^(1/5) − 1 = 14.87%.' },
  { q: 'CAGR vs absolute return — what is the difference?', a: 'Absolute return is the total percentage gain/loss without considering time. CAGR accounts for time and compounding, making it better for comparing investments held for different durations.' },
  { q: 'Is CAGR the actual return I earn each year?', a: 'No, CAGR is a smoothed/average return. Your actual year-by-year returns may vary significantly. CAGR is useful for comparing different investments on a like-for-like basis.' },
]

export default function CAGRCalculator() {
  const [form, setForm] = useState({ beginValue: '', endValue: '', years: '' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateCAGR(Number(form.beginValue) || 0, Number(form.endValue) || 0, Number(form.years) || 1)
    setResult(r)
  }

  const shareText = result ? `CAGR Calculation\nBeginning: ${formatINR(result.beginningValue)}\nEnding: ${formatINR(result.endingValue)}\nPeriod: ${result.years} years\nCAGR: ${result.cagr}%\n\ntax.doaide.com/cagr-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="CAGR Calculator - Compound Annual Growth Rate | DoAide TaxFile"
        description="Free CAGR calculator. Calculate the compound annual growth rate of your investment. Compare investment returns over different time periods."
        keywords="CAGR calculator, compound annual growth rate calculator, investment return calculator, CAGR formula"
        canonical="https://tax.doaide.com/cagr-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>CAGR Calculator</h1>
      <p style={s.subtitle}>Compound Annual Growth Rate — Measure your investment performance</p>

      <div style={s.form}>
        <InputField label="Beginning Value" value={form.beginValue} onChange={set('beginValue')} currency />
        <InputField label="Ending Value" value={form.endValue} onChange={set('endValue')} currency />
        <InputField label="Number of Years" type="number" value={form.years} onChange={set('years')} placeholder="5" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate CAGR</button>

      {result && (
        <ResultCard title="CAGR Results" gold>
          <div style={s.cagrBox}>
            <div style={s.cagrValue}>{result.cagr}%</div>
            <div style={s.cagrLabel}>Compound Annual Growth Rate</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={s.row}><span style={s.rowLabel}>Beginning Value</span><span style={s.rowValue}>{formatINR(result.beginningValue)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Ending Value</span><span style={s.rowValue}>{formatINR(result.endingValue)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Total Gain/Loss</span><span style={{ ...s.rowValue, color: result.totalGain >= 0 ? 'var(--doaide-success)' : 'var(--doaide-error, #dc3545)' }}>{result.totalGain >= 0 ? '+' : ''}{formatINR(result.totalGain)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Absolute Return</span><span style={s.rowValue}>{result.absoluteReturn}%</span></div>
            <div style={{ ...s.row, borderBottom: 'none' }}><span style={s.rowLabel}>Duration</span><span style={s.rowValue}>{result.years} years</span></div>
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
