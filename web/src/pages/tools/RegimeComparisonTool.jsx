import { useState } from 'react'
import SEOHead from '../../components/SEOHead'
import InputField from '../../components/InputField'
import ResultCard from '../../components/ResultCard'
import FAQSection from '../../components/FAQSection'
import ShareButtons from '../../components/ShareButtons'
import WhatsAppShare from '../../components/WhatsAppShare'
import PrintButton from '../../components/PrintButton'
import { Link } from 'react-router-dom'
import { calculateNewRegime, calculateOldRegime, calculateHRA, formatINR, formatPct } from '../../lib/taxEngine'

const s = {
  page: { maxWidth: 1000, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 'clamp(24px, 5vw, 36px)', marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  section: { marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--doaide-border)' },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 12 },
  btn: {
    marginTop: 24, padding: '14px 32px', background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    border: 'none', borderRadius: 'var(--doaide-radius-md)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
    minHeight: 44, width: '100%', maxWidth: 320,
  },
  row: {
    display: 'flex', justifyContent: 'space-between', padding: '10px 0',
    borderBottom: '1px solid var(--doaide-border)', fontSize: 14,
  },
  rowLabel: { color: 'var(--doaide-text-secondary)' },
  rowValue: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 500 },
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  compGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 16,
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
    marginTop: 20, padding: 20, borderRadius: 'var(--doaide-radius-md)',
    background: 'var(--doaide-bg-alt)', textAlign: 'center',
  },
  savingAmount: {
    fontFamily: 'var(--doaide-font-display)', fontSize: 'clamp(24px, 5vw, 32px)', color: 'var(--doaide-gold)',
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
  actions: { display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap', alignItems: 'center' },
  barChart: { marginTop: 24, padding: 20, background: 'var(--doaide-surface)', borderRadius: 'var(--doaide-radius-lg)', border: '1px solid var(--doaide-border)' },
  barRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 },
  barLabel: { width: 100, fontSize: 13, fontWeight: 500, color: 'var(--doaide-text-secondary)', flexShrink: 0 },
  barOuter: { flex: 1, height: 32, background: 'var(--doaide-bg-alt)', borderRadius: 6, overflow: 'hidden', position: 'relative' },
  barAmount: { fontSize: 13, fontFamily: 'var(--doaide-font-mono)', fontWeight: 600, width: 100, textAlign: 'right', flexShrink: 0 },
  relatedTools: {
    marginTop: 48, padding: 24, background: 'var(--doaide-surface)',
    border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-lg)',
  },
  relatedTitle: { fontSize: 16, fontWeight: 600, marginBottom: 16 },
  relatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 },
  relatedLink: {
    padding: '14px 16px', background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    textDecoration: 'none', color: 'var(--doaide-text)', fontSize: 14, display: 'block', minHeight: 44,
  },
  cta: {
    marginTop: 32, padding: 24, borderRadius: 'var(--doaide-radius-lg)',
    background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))',
    border: '1px solid var(--doaide-gold-dim)', textAlign: 'center',
  },
}

const FAQS = [
  { q: 'Which tax regime should I choose for FY 2026-27?', a: 'If your total deductions (80C, 80D, HRA, home loan, NPS) exceed approximately ₹3.75 lakh, the old regime may save more tax. If you have fewer deductions, the new regime with its lower slab rates and higher standard deduction (₹75,000) is usually better. Use this calculator to compare with your actual numbers.' },
  { q: 'What is the standard deduction in old vs new regime?', a: 'The new regime offers ₹75,000 standard deduction (increased from ₹50,000 in Budget 2024). The old regime offers ₹50,000 standard deduction. This ₹25,000 difference partially offsets the loss of other deductions in the new regime.' },
  { q: 'Can I switch between old and new regime every year?', a: 'Yes, salaried individuals can switch between regimes every year. Businesses with professional income can switch only once from new to old. You must inform your employer which regime you choose at the start of the financial year.' },
  { q: 'What deductions are NOT available in the new regime?', a: 'The new regime does not allow HRA exemption, Section 80C (PPF, ELSS, LIC), Section 80D (health insurance), home loan interest deduction (Section 24), LTA, professional tax, and most other Chapter VI-A deductions. Only standard deduction (₹75,000) and employer NPS contribution (80CCD(2)) are allowed.' },
  { q: 'What is the rebate under Section 87A?', a: 'Under the new regime, if taxable income is up to ₹12 lakh, you get a rebate of up to ₹60,000 — effectively making income up to ₹12.75 lakh (with standard deduction) tax-free. Under the old regime, the rebate is ₹12,500 for income up to ₹5 lakh.' },
  { q: 'How are new regime tax slabs structured for FY 2026-27?', a: 'New regime slabs: 0-₹4L at 0%, ₹4-8L at 5%, ₹8-12L at 10%, ₹12-16L at 15%, ₹16-20L at 20%, ₹20-24L at 25%, above ₹24L at 30%. Plus 4% Health & Education Cess on total tax.' },
  { q: 'How is HRA exemption calculated in old regime?', a: 'HRA exemption is the minimum of: (1) Actual HRA received, (2) 50% of salary for metro cities or 40% for non-metro, (3) Rent paid minus 10% of salary. This exemption reduces your taxable income under the old regime.' },
]

export default function RegimeComparisonTool() {
  const [form, setForm] = useState({
    grossSalary: '', hraReceived: '', rentPaid: '', cityType: 'non_metro',
    section80C: '', section80D: '', homeLoanInterest: '', nps80CCD1B: '', otherDeductions: '',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const gross = Number(form.grossSalary) || 0
    if (gross <= 0) return

    const basicSalary = Math.round(gross * 0.40)
    const hraReceived = Number(form.hraReceived) || 0
    const rentPaid = Number(form.rentPaid) || 0
    const isMetro = form.cityType === 'metro'

    let hraExemption = 0
    if (hraReceived > 0 && rentPaid > 0) {
      const hraResult = calculateHRA(basicSalary, 0, hraReceived, rentPaid, isMetro)
      hraExemption = hraResult.exemption
    }

    const newR = calculateNewRegime(gross)
    const oldR = calculateOldRegime(gross, {
      section80C: Number(form.section80C) || 0,
      section80D: Number(form.section80D) || 0,
      hraExemption,
      homeLoanInterest: Number(form.homeLoanInterest) || 0,
      nps80CCD1B: Number(form.nps80CCD1B) || 0,
      other: Number(form.otherDeductions) || 0,
    })

    const saving = Math.abs(newR.totalTax - oldR.totalTax)
    const better = newR.totalTax <= oldR.totalTax ? 'new' : 'old'

    setResult({ newR, oldR, saving, better, hraExemption })
  }

  const shareText = result
    ? `I compared Old vs New Tax Regime for FY 2026-27:\n${result.better === 'new' ? 'New' : 'Old'} regime saves me ${formatINR(result.saving)}!\n\nTry it free: tax.doaide.com/tools/regime-comparison`
    : ''

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

  function BarChart({ newTax, oldTax }) {
    const maxTax = Math.max(newTax, oldTax, 1)
    const newPct = (newTax / maxTax) * 100
    const oldPct = (oldTax / maxTax) * 100

    return (
      <div style={s.barChart}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Visual Comparison</div>
        <div style={s.barRow}>
          <span style={s.barLabel}>New Regime</span>
          <div style={s.barOuter}>
            <div style={{
              width: `${newPct}%`, height: '100%', borderRadius: 6,
              background: newTax <= oldTax ? 'var(--doaide-gold)' : 'var(--doaide-text-muted)',
              transition: 'width 0.6s ease',
            }} />
          </div>
          <span style={{ ...s.barAmount, color: newTax <= oldTax ? 'var(--doaide-gold)' : 'var(--doaide-text)' }}>{formatINR(newTax)}</span>
        </div>
        <div style={s.barRow}>
          <span style={s.barLabel}>Old Regime</span>
          <div style={s.barOuter}>
            <div style={{
              width: `${oldPct}%`, height: '100%', borderRadius: 6,
              background: oldTax < newTax ? 'var(--doaide-gold)' : 'var(--doaide-text-muted)',
              transition: 'width 0.6s ease',
            }} />
          </div>
          <span style={{ ...s.barAmount, color: oldTax < newTax ? 'var(--doaide-gold)' : 'var(--doaide-text)' }}>{formatINR(oldTax)}</span>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="Old vs New Tax Regime Comparison Calculator FY 2026-27 | DoAide TaxFile"
        description="Free old vs new income tax regime comparison calculator for FY 2026-27 (AY 2027-28). Enter salary, HRA, rent, 80C, 80D, home loan & NPS to compare tax under both regimes with slab-wise breakdown and visual chart."
        keywords="old vs new tax regime calculator, tax regime comparison 2026-27, income tax calculator India, new regime vs old regime, which tax regime is better, tax slab comparison, 80C 80D HRA tax saving"
        canonical="https://tax.doaide.com/tools/regime-comparison"
        faqs={FAQS}
      />

      <h1 style={s.title}>Old vs New Tax Regime Calculator</h1>
      <p style={s.subtitle}>
        Compare your tax under both regimes for FY 2026-27 — enter salary, HRA, rent and deductions to see which saves more
      </p>

      <div style={s.form}>
        <InputField label="Gross Annual Salary" value={form.grossSalary} onChange={set('grossSalary')} currency hint="Total CTC or gross salary per year" />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>HRA Details (for Old Regime)</div>
        <div style={s.form}>
          <InputField label="HRA Received (Annual)" value={form.hraReceived} onChange={set('hraReceived')} currency hint="HRA component from salary" />
          <InputField label="Rent Paid (Annual)" value={form.rentPaid} onChange={set('rentPaid')} currency hint="Total rent paid per year" />
          <InputField label="City Type" type="select" value={form.cityType} onChange={set('cityType')}
            options={[
              { value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)' },
              { value: 'non_metro', label: 'Non-Metro' },
            ]} />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Deductions (Old Regime Only)</div>
        <div style={s.form}>
          <InputField label="Section 80C (max ₹1.5L)" value={form.section80C} onChange={set('section80C')} currency hint="PPF, ELSS, LIC, tuition, EPF" />
          <InputField label="Section 80D — Medical Insurance" value={form.section80D} onChange={set('section80D')} currency hint="Health insurance premiums" />
          <InputField label="Home Loan Interest — Sec 24(b)" value={form.homeLoanInterest} onChange={set('homeLoanInterest')} currency hint="Max ₹2L for self-occupied" />
          <InputField label="NPS — 80CCD(1B)" value={form.nps80CCD1B} onChange={set('nps80CCD1B')} currency hint="Additional ₹50,000 NPS deduction" />
          <InputField label="Other Deductions" value={form.otherDeductions} onChange={set('otherDeductions')} currency hint="80E, 80G, 80TTA, etc." />
        </div>
      </div>

      <button style={s.btn} onClick={calculate}>Compare Tax Regimes</button>

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

          <BarChart newTax={result.newR.totalTax} oldTax={result.oldR.totalTax} />

          <div style={s.compGrid}>
            <RegimeCard data={result.newR} label="New Regime (FY 2026-27)" isWinner={result.better === 'new'} />
            <RegimeCard data={result.oldR} label="Old Regime (FY 2026-27)" isWinner={result.better === 'old'} />
          </div>

          {result.hraExemption > 0 && (
            <ResultCard title="HRA Exemption Applied" style={{ marginTop: 24 }}>
              <div style={s.row}>
                <span style={s.rowLabel}>Calculated HRA Exemption (Old Regime)</span>
                <span style={{ ...s.rowValue, color: 'var(--doaide-gold)' }}>{formatINR(result.hraExemption)}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--doaide-text-muted)', marginTop: 8 }}>
                Based on 40% basic salary assumption. Use our{' '}
                <Link to="/tools/hra-calculator" style={{ color: 'var(--doaide-gold)', textDecoration: 'none' }}>HRA Calculator</Link>{' '}
                for exact amounts with custom basic salary.
              </p>
            </ResultCard>
          )}

          <ResultCard title="Key Differences at a Glance" style={{ marginTop: 24 }}>
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
            <WhatsAppShare text={shareText} />
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </>
      )}

      <div style={s.cta}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Need help filing your ITR?</div>
        <p style={{ fontSize: 14, color: 'var(--doaide-text-secondary)', marginBottom: 16 }}>
          Use DoAide TaxFile to calculate taxes, plan deductions, and optimize your tax savings — all for free.
        </p>
        <Link to="/income-tax-calculator" style={{
          display: 'inline-block', padding: '12px 24px', background: 'var(--doaide-gold)',
          color: 'var(--doaide-text-on-gold)', borderRadius: 'var(--doaide-radius-md)',
          textDecoration: 'none', fontWeight: 600, fontSize: 14, minHeight: 44,
        }}>
          Calculate Income Tax →
        </Link>
      </div>

      <div style={s.relatedTools}>
        <div style={s.relatedTitle}>People Also Use</div>
        <div style={s.relatedGrid}>
          <Link to="/tools/hra-calculator" style={s.relatedLink}>🏠 HRA Exemption Calculator</Link>
          <Link to="/income-tax-calculator" style={s.relatedLink}>🧮 Income Tax Calculator</Link>
          <Link to="/80c-planner" style={s.relatedLink}>📊 80C Investment Planner</Link>
          <Link to="/take-home-salary-calculator" style={s.relatedLink}>💰 Take-Home Salary</Link>
          <Link to="/80d-calculator" style={s.relatedLink}>🏥 80D Health Insurance</Link>
          <Link to="/nps-calculator" style={s.relatedLink}>🏛️ NPS Tax Benefit</Link>
        </div>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
