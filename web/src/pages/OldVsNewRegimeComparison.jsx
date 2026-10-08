import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateNewRegime, calculateOldRegime, formatINR, formatPct } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 1000, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  section: { marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--doaide-border)' },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 12 },
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
  compGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16,
  },
  winner: {
    border: '2px solid var(--doaide-gold)',
    boxShadow: 'var(--doaide-shadow-gold)',
    borderRadius: 'var(--doaide-radius-lg)',
    padding: 20,
  },
  loser: {
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)',
    padding: 20,
    opacity: 0.85,
  },
  regimeLabel: {
    fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 12,
  },
  saving: {
    marginTop: 20, padding: 16, borderRadius: 'var(--doaide-radius-md)',
    background: 'var(--doaide-bg-alt)', textAlign: 'center',
  },
  savingAmount: {
    fontFamily: 'var(--doaide-font-display)', fontSize: 28, color: 'var(--doaide-gold)',
    fontWeight: 700,
  },
  slabTable: {
    width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 8,
  },
  th: {
    textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid var(--doaide-border)',
    color: 'var(--doaide-text-secondary)', fontWeight: 500,
  },
  td: {
    padding: '6px 8px', borderBottom: '1px solid var(--doaide-border)',
    fontFamily: 'var(--doaide-font-mono)',
  },
  actions: { display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' },
}

const FAQS = [
  { q: 'Which tax regime should I choose for FY 2026-27?', a: 'If your total deductions (80C, 80D, HRA, home loan, NPS) exceed approximately ₹3.75 lakh, the old regime may save more tax. If you have fewer deductions, the new regime with its lower slab rates and higher standard deduction (₹75,000) is usually better. Use this calculator to compare with your actual numbers.' },
  { q: 'What is the standard deduction difference between old and new regime?', a: 'The new regime offers ₹75,000 standard deduction (increased from ₹50,000 in Budget 2024). The old regime offers ₹50,000 standard deduction. This ₹25,000 difference partially offsets the loss of other deductions in the new regime.' },
  { q: 'Can I switch between old and new regime every year?', a: 'Yes, salaried individuals can switch between regimes every year. Businesses with professional income can switch only once from new to old. You must inform your employer which regime you choose at the start of the financial year.' },
  { q: 'What deductions are NOT available in the new regime?', a: 'The new regime does not allow HRA exemption, Section 80C (PPF, ELSS, LIC), Section 80D (health insurance), home loan interest deduction (Section 24), LTA, professional tax, and most other Chapter VI-A deductions. Only standard deduction (₹75,000) and employer NPS contribution (80CCD(2)) are allowed.' },
  { q: 'What is the rebate under Section 87A?', a: 'Under the new regime, if taxable income is up to ₹12 lakh, you get a rebate of up to ₹60,000 — effectively making income up to ₹12.75 lakh (with standard deduction) tax-free. Under the old regime, the rebate is ₹12,500 for income up to ₹5 lakh.' },
]

export default function OldVsNewRegimeComparison() {
  const [form, setForm] = useState({
    grossSalary: '', section80C: '', section80D: '', hraExemption: '',
    homeLoanInterest: '', nps80CCD1B: '', otherDeductions: '',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const gross = Number(form.grossSalary) || 0
    if (gross <= 0) return

    const newR = calculateNewRegime(gross)
    const oldR = calculateOldRegime(gross, {
      section80C: Number(form.section80C) || 0,
      section80D: Number(form.section80D) || 0,
      hraExemption: Number(form.hraExemption) || 0,
      homeLoanInterest: Number(form.homeLoanInterest) || 0,
      nps80CCD1B: Number(form.nps80CCD1B) || 0,
      other: Number(form.otherDeductions) || 0,
    })

    const saving = Math.abs(newR.totalTax - oldR.totalTax)
    const better = newR.totalTax <= oldR.totalTax ? 'new' : 'old'

    setResult({ newR, oldR, saving, better })
  }

  const shareText = result ? `Old vs New Regime: ${result.better === 'new' ? 'New' : 'Old'} regime saves ${formatINR(result.saving)}\n\ntax.doaide.com/old-vs-new-regime` : ''

  function SlabBreakdown({ breakdown, label }) {
    if (!breakdown || breakdown.length === 0) return null
    return (
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--doaide-text-secondary)', marginBottom: 4 }}>{label}</div>
        <table style={s.slabTable}>
          <thead>
            <tr><th style={s.th}>Slab</th><th style={s.th}>Rate</th><th style={s.th}>Tax</th></tr>
          </thead>
          <tbody>
            {breakdown.filter(b => b.tax > 0).map((b, i) => (
              <tr key={i}>
                <td style={s.td}>{formatINR(b.from)} – {b.to === Infinity ? '∞' : formatINR(b.to)}</td>
                <td style={s.td}>{formatPct(b.rate)}</td>
                <td style={s.td}>{formatINR(b.tax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  function RegimeCard({ data, label, isWinner }) {
    return (
      <div style={isWinner ? s.winner : s.loser}>
        <div style={{ ...s.regimeLabel, color: isWinner ? 'var(--doaide-gold)' : 'var(--doaide-text-secondary)' }}>
          {isWinner ? '★ ' : ''}{label}
        </div>
        <div style={s.row}><span style={s.rowLabel}>Gross Income</span><span style={s.rowValue}>{formatINR(data.grossIncome)}</span></div>
        <div style={s.row}><span style={s.rowLabel}>Standard Deduction</span><span style={s.rowValue}>{formatINR(data.standardDeduction)}</span></div>
        <div style={s.row}><span style={s.rowLabel}>Total Deductions</span><span style={s.rowValue}>{formatINR(data.deductionsTotal)}</span></div>
        <div style={s.row}><span style={s.rowLabel}>Taxable Income</span><span style={s.rowValue}>{formatINR(data.taxableIncome)}</span></div>
        <div style={s.row}><span style={s.rowLabel}>Tax on Income</span><span style={s.rowValue}>{formatINR(data.taxOnIncome)}</span></div>
        {data.rebate87A > 0 && (
          <div style={s.row}><span style={s.rowLabel}>Section 87A Rebate</span><span style={{ ...s.rowValue, color: '#34d399' }}>-{formatINR(data.rebate87A)}</span></div>
        )}
        <div style={s.row}><span style={s.rowLabel}>Surcharge</span><span style={s.rowValue}>{formatINR(data.surcharge)}</span></div>
        <div style={s.row}><span style={s.rowLabel}>Cess (4%)</span><span style={s.rowValue}>{formatINR(data.cess)}</span></div>
        <div style={{ ...s.row, borderBottom: 'none', fontWeight: 600, fontSize: 16 }}>
          <span>Total Tax</span>
          <span style={{ color: isWinner ? 'var(--doaide-gold)' : 'var(--doaide-text)' }}>{formatINR(data.totalTax)}</span>
        </div>
        <SlabBreakdown breakdown={data.slabBreakdown} label="Slab-wise Breakdown" />
      </div>
    )
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="Old vs New Tax Regime Comparison Calculator FY 2026-27 | DoAide TaxFile"
        description="Compare old and new income tax regimes side-by-side for FY 2026-27. Enter your salary and deductions to see which regime saves more tax. Free, instant results."
        keywords="old vs new tax regime, tax regime comparison, income tax calculator, FY 2026-27, new regime vs old regime"
        canonical="https://tax.doaide.com/old-vs-new-regime"
        faqs={FAQS}
      />

      <h1 style={s.title}>Old vs New Regime Comparison</h1>
      <p style={s.subtitle}>Side-by-side comparison — enter your salary and deductions to find which regime saves more tax</p>

      <div style={s.form}>
        <InputField label="Gross Annual Salary" value={form.grossSalary} onChange={set('grossSalary')} currency />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Deductions (Old Regime Only)</div>
        <div style={s.form}>
          <InputField label="Section 80C (max ₹1.5L)" value={form.section80C} onChange={set('section80C')} currency hint="PPF, ELSS, LIC, tuition" />
          <InputField label="Section 80D" value={form.section80D} onChange={set('section80D')} currency hint="Health insurance premiums" />
          <InputField label="HRA Exemption" value={form.hraExemption} onChange={set('hraExemption')} currency hint="Calculated HRA exempt amount" />
          <InputField label="Home Loan Interest (24b)" value={form.homeLoanInterest} onChange={set('homeLoanInterest')} currency hint="Max ₹2L for self-occupied" />
          <InputField label="NPS — 80CCD(1B)" value={form.nps80CCD1B} onChange={set('nps80CCD1B')} currency hint="Additional ₹50,000 NPS deduction" />
          <InputField label="Other Deductions" value={form.otherDeductions} onChange={set('otherDeductions')} currency hint="80E, 80G, 80TTA, etc." />
        </div>
      </div>

      <button style={s.btn} onClick={calculate}>Compare Regimes</button>

      {result && (
        <>
          <div style={s.saving}>
            <div style={{ fontSize: 14, color: 'var(--doaide-text-secondary)', marginBottom: 4 }}>
              {result.better === 'new' ? 'New' : 'Old'} regime saves you
            </div>
            <div style={s.savingAmount}>{formatINR(result.saving)}</div>
            <div style={{ fontSize: 13, color: 'var(--doaide-text-muted)', marginTop: 4 }}>
              per year ({formatINR(Math.round(result.saving / 12))} per month)
            </div>
          </div>

          <div style={s.compGrid}>
            <RegimeCard data={result.newR} label="New Regime (FY 2026-27)" isWinner={result.better === 'new'} />
            <RegimeCard data={result.oldR} label="Old Regime (FY 2026-27)" isWinner={result.better === 'old'} />
          </div>

          <ResultCard title="Key Differences" style={{ marginTop: 24 }}>
            <table style={s.slabTable}>
              <thead>
                <tr><th style={s.th}>Feature</th><th style={s.th}>New Regime</th><th style={s.th}>Old Regime</th></tr>
              </thead>
              <tbody>
                <tr><td style={s.td}>Standard Deduction</td><td style={s.td}>₹75,000</td><td style={s.td}>₹50,000</td></tr>
                <tr><td style={s.td}>Section 80C</td><td style={s.td}>Not allowed</td><td style={s.td}>Up to ₹1.5L</td></tr>
                <tr><td style={s.td}>Section 80D</td><td style={s.td}>Not allowed</td><td style={s.td}>Up to ₹1L</td></tr>
                <tr><td style={s.td}>HRA Exemption</td><td style={s.td}>Not allowed</td><td style={s.td}>Allowed</td></tr>
                <tr><td style={s.td}>Home Loan Interest</td><td style={s.td}>Not allowed</td><td style={s.td}>Up to ₹2L</td></tr>
                <tr><td style={s.td}>87A Rebate Limit</td><td style={s.td}>₹12L taxable</td><td style={s.td}>₹5L taxable</td></tr>
                <tr><td style={s.td}>NPS 80CCD(1B)</td><td style={s.td}>Not allowed</td><td style={s.td}>₹50,000</td></tr>
                <tr><td style={s.td}>Employer NPS 80CCD(2)</td><td style={s.td}>Allowed (14%)</td><td style={s.td}>Allowed (14%)</td></tr>
              </tbody>
            </table>
          </ResultCard>

          <div style={s.actions}>
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
