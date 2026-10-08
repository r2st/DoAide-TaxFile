import { useState } from 'react'
import { calculateNewRegime, calculateOldRegime, formatINR } from '../lib/taxEngine'

const s = {
  page: {
    display: 'flex', flexDirection: 'column', minHeight: '100vh',
    background: '#fff', color: '#374151',
    fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", fontSize: 14, boxSizing: 'border-box',
  },
  header: {
    padding: '10px 16px', borderBottom: '1px solid #e5e7eb',
    fontWeight: 600, fontSize: 15, color: '#111827',
  },
  body: { flex: 1, padding: 16 },
  label: {
    display: 'block', fontSize: 12, color: '#6b7280',
    marginBottom: 4, fontWeight: 500,
  },
  input: {
    width: '100%', padding: '8px 10px', background: '#f9fafb', border: '1px solid #e5e7eb',
    borderRadius: 6, color: '#111827', fontSize: 14, outline: 'none', marginBottom: 12,
  },
  btn: {
    width: '100%', padding: '10px', background: '#946B0C', color: '#fff',
    border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer',
  },
  resultBox: {
    marginTop: 16, padding: 12, background: '#f9fafb', borderRadius: 8,
    border: '1px solid #e5e7eb',
  },
  row: {
    display: 'flex', justifyContent: 'space-between', padding: '5px 0',
    borderBottom: '1px solid #f3f4f6', fontSize: 13,
  },
  badge: {
    display: 'inline-block', padding: '2px 8px', borderRadius: 4,
    fontSize: 11, fontWeight: 600, background: '#dcfce7', color: '#166534',
  },
  powered: {
    display: 'block', textAlign: 'center', padding: '8px 16px',
    borderTop: '1px solid #e5e7eb', fontSize: 12,
    color: '#9ca3af', textDecoration: 'none',
  },
}

export default function EmbedIncomeTaxCalculator() {
  const [income, setIncome] = useState('')
  const [deductions80C, setDeductions80C] = useState('')
  const [deductions80D, setDeductions80D] = useState('')
  const [result, setResult] = useState(null)
  const [showEmbed, setShowEmbed] = useState(false)

  const calculate = () => {
    const gross = Number(income) || 0
    if (gross <= 0) return
    const newR = calculateNewRegime(gross)
    const oldR = calculateOldRegime(gross, {
      section80C: Number(deductions80C) || 0,
      section80D: Number(deductions80D) || 0,
      hraExemption: 0, homeLoanInterest: 0, nps80CCD1B: 0, other: 0,
    })
    const recommended = newR.totalTax <= oldR.totalTax ? 'new' : 'old'
    const savings = Math.abs(newR.totalTax - oldR.totalTax)
    setResult({ newRegime: newR, oldRegime: oldR, recommended, savings })
  }

  const embedCode = `<iframe src="https://tax.doaide.com/embed/income-tax-calculator" width="400" height="520" frameborder="0" style="border:1px solid #e5e7eb;border-radius:8px;" title="Income Tax Calculator"></iframe>`

  return (
    <div style={s.page}>
      <div style={s.header}>Income Tax Calculator FY 2026-27</div>
      <div style={s.body}>
        <label style={s.label}>Annual Income (₹)</label>
        <input style={s.input} type="number" placeholder="e.g. 1200000" value={income}
          onChange={(e) => setIncome(e.target.value)} />

        <label style={s.label}>Section 80C Deductions (₹)</label>
        <input style={s.input} type="number" placeholder="e.g. 150000" value={deductions80C}
          onChange={(e) => setDeductions80C(e.target.value)} />

        <label style={s.label}>Section 80D (Health Insurance) (₹)</label>
        <input style={s.input} type="number" placeholder="e.g. 25000" value={deductions80D}
          onChange={(e) => setDeductions80D(e.target.value)} />

        <button style={s.btn} onClick={calculate}>Calculate Tax</button>

        {result && (
          <div style={s.resultBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ fontSize: 13 }}>Regime Comparison</strong>
              <span style={s.badge}>Save {formatINR(result.savings)} with {result.recommended} regime</span>
            </div>
            <div style={s.row}><span>New Regime Tax</span><strong>{formatINR(result.newRegime.totalTax)}</strong></div>
            <div style={s.row}><span>Old Regime Tax</span><strong>{formatINR(result.oldRegime.totalTax)}</strong></div>
            <div style={{ ...s.row, borderBottom: 'none', fontWeight: 700, color: '#946B0C' }}>
              <span>Recommended</span><strong>{result.recommended === 'new' ? 'New Regime' : 'Old Regime'}</strong>
            </div>
          </div>
        )}

        <button onClick={() => setShowEmbed(!showEmbed)} style={{
          marginTop: 12, background: 'none', border: '1px solid #e5e7eb',
          color: '#9ca3af', padding: '6px 12px', borderRadius: 6,
          cursor: 'pointer', fontSize: 12, width: '100%',
        }}>
          {showEmbed ? 'Hide' : 'Get this widget for your site'}
        </button>
        {showEmbed && (
          <pre style={{
            marginTop: 8, padding: 10, background: '#f9fafb', borderRadius: 6,
            fontSize: 11, color: '#6b7280', overflow: 'auto', whiteSpace: 'pre-wrap',
            border: '1px solid #e5e7eb',
          }}>{embedCode}</pre>
        )}
      </div>
      <a style={s.powered} href="https://tax.doaide.com?ref=widget" target="_blank" rel="noopener noreferrer">
        Powered by <strong style={{ color: '#946B0C' }}>DoAide TaxFile</strong>
      </a>
    </div>
  )
}
