import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { compareRegimes, formatINR, formatPct } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 1000, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  section: { marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--doaide-border)' },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 12 },
  row: {
    display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0',
    borderBottom: '1px solid var(--doaide-border)', fontSize: 14,
  },
  rowLabel: { color: 'var(--doaide-text-secondary)' },
  rowValue: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 500, whiteSpace: 'nowrap' },
  compGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 16 },
  winner: {
    border: '2px solid var(--doaide-gold)', boxShadow: 'var(--doaide-shadow-gold)',
    borderRadius: 'var(--doaide-radius-lg)', padding: 20,
  },
  loser: { border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-lg)', padding: 20, opacity: 0.85 },
  regimeLabel: { fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  saving: {
    marginTop: 24, padding: 20, borderRadius: 'var(--doaide-radius-md)',
    background: 'var(--doaide-bg-alt)', textAlign: 'center',
  },
  savingAmount: { fontFamily: 'var(--doaide-font-display)', fontSize: 'clamp(24px, 5vw, 32px)', color: 'var(--doaide-gold)', fontWeight: 700 },
  insight: {
    marginTop: 12, padding: '12px 16px', borderLeft: '3px solid var(--doaide-gold)',
    background: 'var(--doaide-bg-alt)', fontSize: 14, lineHeight: 1.6,
  },
  tableWrap: { overflowX: 'auto' },
  slabTable: { width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 8 },
  th: {
    textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid var(--doaide-border)',
    color: 'var(--doaide-text-secondary)', fontWeight: 500,
  },
  td: { padding: '6px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  actions: { display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' },
  link: { color: 'var(--doaide-gold)', textDecoration: 'none' },
  note: { fontSize: 13, color: 'var(--doaide-text-muted)', marginTop: 16, lineHeight: 1.6 },
}

export const FAQS = [
  { q: 'Which tax regime is better for FY 2026-27?', a: 'It depends on how much you can claim in deductions. With no deductions the new regime is almost always cheaper. The old regime wins only when HRA, 80C, 80D, home-loan interest and NPS together are large — this calculator shows the exact break-even amount for your salary.' },
  { q: 'What are the new regime tax slabs for FY 2026-27?', a: 'Up to ₹4 lakh: nil; ₹4–8 lakh: 5%; ₹8–12 lakh: 10%; ₹12–16 lakh: 15%; ₹16–20 lakh: 20%; ₹20–24 lakh: 25%; above ₹24 lakh: 30%, plus 4% cess. Salaried taxpayers get a ₹75,000 standard deduction.' },
  { q: 'Is income up to ₹12.75 lakh tax-free in the new regime?', a: 'For salaried individuals, yes: after the ₹75,000 standard deduction, taxable income up to ₹12 lakh gets a full rebate under Section 87A (up to ₹60,000). Just above ₹12 lakh, marginal relief ensures your tax never exceeds the income earned above ₹12 lakh.' },
  { q: 'Which deductions are allowed in the new regime?', a: 'Mainly the ₹75,000 standard deduction and the employer’s NPS contribution under Section 80CCD(2) (up to 14% of basic + DA). HRA, 80C, 80D, home-loan interest on a self-occupied house, LTA and professional tax are not allowed.' },
  { q: 'Can I switch between the old and new regime every year?', a: 'Salaried individuals without business income can choose either regime every year when filing the ITR. Taxpayers with business or professional income can switch back to the new regime only once after opting out.' },
  { q: 'Do senior citizens get different slabs?', a: 'Only in the old regime: the basic exemption is ₹3 lakh for ages 60–79 and ₹5 lakh for 80 and above. New regime slabs are the same for everyone.' },
]

const EMPTY = {
  grossSalary: '', otherIncome: '', age: '30',
  hraExemption: '', section80C: '', section80D: '', homeLoanInterest: '', nps80CCD1B: '',
  employerNps80CCD2: '', professionalTax: '', otherDeductions: '',
}

function SlabBreakdown({ breakdown }) {
  const rows = (breakdown || []).filter(b => b.tax > 0)
  if (rows.length === 0) return null
  return (
    <div style={{ marginTop: 12, ...s.tableWrap }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--doaide-text-secondary)', marginBottom: 4 }}>Slab-wise breakdown</div>
      <table style={s.slabTable}>
        <thead><tr><th style={s.th}>Slab</th><th style={s.th}>Rate</th><th style={s.th}>Tax</th></tr></thead>
        <tbody>
          {rows.map((b, i) => (
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

function RegimeCard({ data, label, isWinner, effectiveRate }) {
  return (
    <div style={isWinner ? s.winner : s.loser} data-testid={`regime-${data.regime}`}>
      <div style={{ ...s.regimeLabel, color: isWinner ? 'var(--doaide-gold)' : 'var(--doaide-text-secondary)' }}>
        {isWinner ? '★ ' : ''}{label}
      </div>
      <div style={s.row}><span style={s.rowLabel}>Gross income</span><span style={s.rowValue}>{formatINR(data.grossIncome)}</span></div>
      <div style={s.row}><span style={s.rowLabel}>Total deductions</span><span style={s.rowValue}>{formatINR(data.deductionsTotal)}</span></div>
      <div style={s.row}><span style={s.rowLabel}>Taxable income</span><span style={s.rowValue}>{formatINR(data.taxableIncome)}</span></div>
      <div style={s.row}><span style={s.rowLabel}>Tax on income</span><span style={s.rowValue}>{formatINR(data.taxOnIncome)}</span></div>
      {data.rebate87A > 0 && (
        <div style={s.row}><span style={s.rowLabel}>Section 87A rebate</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>-{formatINR(data.rebate87A)}</span></div>
      )}
      {data.marginalRelief > 0 && (
        <div style={s.row}><span style={s.rowLabel}>Marginal relief</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>-{formatINR(data.marginalRelief)}</span></div>
      )}
      {data.surcharge > 0 && (
        <div style={s.row}><span style={s.rowLabel}>Surcharge</span><span style={s.rowValue}>{formatINR(data.surcharge)}</span></div>
      )}
      <div style={s.row}><span style={s.rowLabel}>Cess (4%)</span><span style={s.rowValue}>{formatINR(data.cess)}</span></div>
      <div style={{ ...s.row, fontWeight: 600, fontSize: 16 }}>
        <span>Total tax</span>
        <span style={{ color: isWinner ? 'var(--doaide-gold)' : 'var(--doaide-text)' }}>{formatINR(data.totalTax)}</span>
      </div>
      <div style={{ ...s.row, borderBottom: 'none' }}><span style={s.rowLabel}>Effective tax rate</span><span style={s.rowValue}>{formatPct(effectiveRate)}</span></div>
      <SlabBreakdown breakdown={data.slabBreakdown} />
    </div>
  )
}

export default function OldVsNewRegimeComparison() {
  const [form, setForm] = useState(EMPTY)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))
  const result = useMemo(() => {
    const num = k => Math.max(Number(form[k]) || 0, 0)
    const gross = num('grossSalary') + num('otherIncome')
    if (num('grossSalary') <= 0) return null
    return compareRegimes(gross, {
      age: num('age'),
      hraExemption: num('hraExemption'),
      section80C: num('section80C'),
      section80D: num('section80D'),
      homeLoanInterest: num('homeLoanInterest'),
      nps80CCD1B: num('nps80CCD1B'),
      employerNps80CCD2: num('employerNps80CCD2'),
      professionalTax: num('professionalTax'),
      other: num('otherDeductions'),
    })
  }, [form])

  const shareText = result
    ? `Old vs new regime: the ${result.better} regime saves me ${formatINR(result.saving)} in FY 2026-27. Check yours free:`
    : 'Free old vs new tax regime calculator for FY 2026-27:'

  return (
    <div style={s.page}>
      <SEOHead
        title="Old vs New Tax Regime Calculator FY 2026-27 — Free | DoAide TaxFile"
        description="Compare old vs new tax regime for FY 2026-27 with your salary, HRA, 80C, 80D, home loan and NPS. See tax under both, savings, and the break-even deductions."
        keywords="old vs new tax regime calculator 2026-27, tax regime comparison, new regime vs old regime FY 2026-27, which tax regime is better, break even deductions"
        canonical="https://tax.doaide.com/old-vs-new-regime"
        faqs={FAQS}
        breadcrumbs={[{ name: 'Old vs New Regime Calculator', url: 'https://tax.doaide.com/old-vs-new-regime' }]}
      />

      <h1 style={s.title}>Old vs New Tax Regime Calculator</h1>
      <p style={s.subtitle}>FY 2026-27 (AY 2027-28) — results update as you type</p>

      <div style={s.form}>
        <InputField label="Gross annual salary" value={form.grossSalary} onChange={set('grossSalary')} currency />
        <InputField label="Other income" value={form.otherIncome} onChange={set('otherIncome')} currency hint="Interest, rent, freelance (net)" />
        <InputField label="Your age" type="select" value={form.age} onChange={set('age')}
          options={[{ value: '30', label: 'Below 60' }, { value: '60', label: '60 to 79' }, { value: '80', label: '80 and above' }]} />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Deductions — old regime only</div>
        <div style={s.form}>
          <InputField label="HRA exemption" value={form.hraExemption} onChange={set('hraExemption')} currency hint="Use the HRA calculator if unsure" />
          <InputField label="Section 80C (max ₹1.5L)" value={form.section80C} onChange={set('section80C')} currency hint="EPF, PPF, ELSS, LIC, tuition, principal" />
          <InputField label="Section 80D" value={form.section80D} onChange={set('section80D')} currency hint="Health insurance (self + parents)" />
          <InputField label="Home loan interest 24(b)" value={form.homeLoanInterest} onChange={set('homeLoanInterest')} currency hint="Max ₹2L, self-occupied" />
          <InputField label="NPS 80CCD(1B)" value={form.nps80CCD1B} onChange={set('nps80CCD1B')} currency hint="Max ₹50,000" />
          <InputField label="Professional tax" value={form.professionalTax} onChange={set('professionalTax')} currency hint="Max ₹2,500" />
          <InputField label="Other (80E, 80G, 80TTA…)" value={form.otherDeductions} onChange={set('otherDeductions')} currency />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Allowed in both regimes</div>
        <div style={s.form}>
          <InputField label="Employer NPS 80CCD(2)" value={form.employerNps80CCD2} onChange={set('employerNps80CCD2')} currency hint="Up to 14% of basic (new) / 10% (old)" />
        </div>
      </div>

      {result && (
        <>
          <div style={s.saving} data-testid="regime-verdict">
            <div style={{ fontSize: 14, color: 'var(--doaide-text-secondary)', marginBottom: 4 }}>
              {result.saving === 0 ? 'Both regimes cost the same' : `The ${result.better} regime saves you`}
            </div>
            <div style={s.savingAmount}>{formatINR(result.saving)}</div>
            <div style={{ fontSize: 13, color: 'var(--doaide-text-muted)', marginTop: 4 }}>
              per year ({formatINR(Math.round(result.saving / 12))} per month)
            </div>
          </div>

          {result.better === 'new' && result.breakEvenExtraDeductions != null && (
            <div style={s.insight} data-testid="break-even">
              The old regime would win only if you claimed about <strong>{formatINR(result.breakEvenExtraDeductions)}</strong> more in old-regime deductions
              (total old-regime deductions of about {formatINR(result.oldR.deductionsTotal + result.breakEvenExtraDeductions)} including the standard deduction).
            </div>
          )}
          {result.better === 'new' && result.breakEvenExtraDeductions == null && (
            <div style={s.insight} data-testid="break-even">At this income, no realistic amount of deductions makes the old regime cheaper.</div>
          )}
          {result.better === 'old' && (
            <div style={s.insight} data-testid="break-even">
              Your deductions of {formatINR(result.oldR.deductionsTotal)} make the old regime cheaper. Remember to choose it when filing your ITR
              (and tell your employer, so TDS is deducted correctly).
            </div>
          )}

          <div style={s.compGrid}>
            <RegimeCard data={result.newR} label="New regime" isWinner={result.better === 'new'} effectiveRate={result.effectiveRateNew} />
            <RegimeCard data={result.oldR} label="Old regime" isWinner={result.better === 'old'} effectiveRate={result.effectiveRateOld} />
          </div>

          <div style={s.actions}>
            <ShareButtons text={shareText} url="https://tax.doaide.com/old-vs-new-regime" />
            <PrintButton />
          </div>
        </>
      )}

      <ResultCard title="Old vs new regime at a glance" style={{ marginTop: 32 }}>
        <div style={s.tableWrap}>
          <table style={s.slabTable}>
            <thead><tr><th style={s.th}>Feature</th><th style={s.th}>New regime</th><th style={s.th}>Old regime</th></tr></thead>
            <tbody>
              <tr><td style={s.td}>Standard deduction</td><td style={s.td}>₹75,000</td><td style={s.td}>₹50,000</td></tr>
              <tr><td style={s.td}>87A rebate</td><td style={s.td}>Up to ₹60,000 (taxable ≤ ₹12L)</td><td style={s.td}>Up to ₹12,500 (taxable ≤ ₹5L)</td></tr>
              <tr><td style={s.td}>HRA, LTA</td><td style={s.td}>Not allowed</td><td style={s.td}>Allowed</td></tr>
              <tr><td style={s.td}>80C / 80D / 80CCD(1B)</td><td style={s.td}>Not allowed</td><td style={s.td}>₹1.5L / up to ₹1L / ₹50K</td></tr>
              <tr><td style={s.td}>Home loan interest (self-occupied)</td><td style={s.td}>Not allowed</td><td style={s.td}>Up to ₹2L</td></tr>
              <tr><td style={s.td}>Employer NPS 80CCD(2)</td><td style={s.td}>Up to 14% of salary</td><td style={s.td}>Up to 10% of salary</td></tr>
              <tr><td style={s.td}>Max surcharge</td><td style={s.td}>25%</td><td style={s.td}>37%</td></tr>
            </tbody>
          </table>
        </div>
      </ResultCard>

      <p style={s.note}>
        Need your HRA figure? Use the <Link to="/hra-calculator" style={s.link}>HRA exemption calculator</Link>. Selling shares or property this year?
        Capital gains are taxed separately — see the <Link to="/capital-gains-calculator" style={s.link}>capital gains calculator</Link>.
        Estimates only; surcharge on special-rate income and other edge cases are not modelled.
      </p>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
