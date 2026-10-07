import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateInflation, formatINR } from '../lib/taxEngine'

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
  infoBox: { marginTop: 20, padding: 16, borderRadius: 12, background: 'var(--doaide-card-bg)', border: '1px solid var(--doaide-border)' },
  infoTitle: { fontSize: 14, fontWeight: 600, marginBottom: 8 },
}

const FAQS = [
  { q: 'What is inflation?', a: 'Inflation is the rate at which the general level of prices for goods and services rises, causing purchasing power to fall. In India, inflation is measured using CPI (Consumer Price Index) by the RBI.' },
  { q: 'What is the current inflation rate in India?', a: 'India\'s average CPI inflation has been around 5-6% in recent years. The RBI targets 4% inflation (with a +/- 2% band). Food inflation can be higher, while core inflation may be lower.' },
  { q: 'How does inflation affect my savings?', a: 'If your savings earn 6% interest but inflation is 6%, your real return is effectively 0%. To grow wealth, your investment returns must beat inflation. This is why equity investments (10-15% returns) are recommended for long-term goals.' },
  { q: 'How to protect against inflation?', a: 'Invest in assets that historically beat inflation: equity mutual funds, real estate, gold. Avoid keeping large amounts in savings accounts (3-4% interest). Index-linked bonds and inflation-beating FDs are other options.' },
]

export default function InflationCalculator() {
  const [form, setForm] = useState({ amount: '', inflationRate: '6', years: '10' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateInflation(Number(form.amount) || 0, Number(form.inflationRate) || 6, Number(form.years) || 10)
    setResult(r)
  }

  const shareText = result ? `Inflation Impact\n₹${result.currentAmount.toLocaleString('en-IN')} today\nWorth ₹${result.purchasingPower.toLocaleString('en-IN')} in ${result.years} years\nYou'll need ₹${result.futureAmount.toLocaleString('en-IN')}\n\ntax.doaide.com/inflation-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Inflation Calculator India - Future Value & Purchasing Power | DoAide TaxFile"
        description="Free inflation calculator for India. See how inflation erodes your purchasing power over time. Calculate the future cost of goods and the real value of your money."
        keywords="inflation calculator India, purchasing power calculator, future value calculator, inflation rate calculator, CPI inflation India"
        canonical="https://tax.doaide.com/inflation-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Inflation Calculator</h1>
      <p style={s.subtitle}>See how inflation affects your money over time</p>

      <div style={s.form}>
        <InputField label="Current Amount (₹)" value={form.amount} onChange={set('amount')} currency />
        <InputField label="Expected Inflation Rate (%)" type="number" value={form.inflationRate} onChange={set('inflationRate')} placeholder="6" />
        <InputField label="Number of Years" type="number" value={form.years} onChange={set('years')} placeholder="10" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Impact</button>

      {result && (
        <ResultCard title="Inflation Impact" gold>
          <div style={s.infoBox}>
            <div style={s.infoTitle}>What {formatINR(result.currentAmount)} today means in {result.years} years:</div>
            <div style={{ fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.6 }}>
              To buy what costs <strong>{formatINR(result.currentAmount)}</strong> today, you'll need <strong style={{ color: 'var(--doaide-gold)' }}>{formatINR(result.futureAmount)}</strong> in {result.years} years.
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={s.row}><span style={s.rowLabel}>Current Value</span><span style={s.rowValue}>{formatINR(result.currentAmount)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Future Cost (in {result.years} yrs)</span><span style={{ ...s.rowValue, color: 'var(--doaide-gold)' }}>{formatINR(result.futureAmount)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Purchasing Power of {formatINR(result.currentAmount)}</span><span style={{ ...s.rowValue, color: 'var(--doaide-error, #dc3545)' }}>{formatINR(result.purchasingPower)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Total Inflation ({result.years} yrs)</span><span style={s.rowValue}>{result.totalInflation}%</span></div>
            <div style={{ ...s.row, borderBottom: 'none' }}><span style={s.rowLabel}>Annual Inflation Rate</span><span style={s.rowValue}>{result.inflationRate}%</span></div>
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
