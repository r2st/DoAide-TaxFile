import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateStandardDeductions, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 900, margin: '0 auto' },
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
  rowLimit: { fontFamily: 'var(--doaide-font-mono)', fontSize: 12, color: 'var(--doaide-text-muted)' },
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  progressBar: {
    height: 8, borderRadius: 4, background: 'var(--doaide-bg-alt)',
    overflow: 'hidden', marginTop: 4, marginBottom: 8,
  },
  progressFill: {
    height: '100%', borderRadius: 4,
    background: 'linear-gradient(90deg, var(--doaide-gold-dim), var(--doaide-gold))',
  },
}

const FAQS = [
  { q: 'What is the standard deduction for FY 2026-27?', a: 'The standard deduction is ₹50,000 for salaried individuals under the old regime and ₹75,000 under the new regime. It is a flat deduction from salary income — no bills or proof required.' },
  { q: 'What are the major deduction sections available?', a: 'Key sections: 80C (₹1.5L — PPF, ELSS, LIC, etc.), 80D (₹25K-₹50K — health insurance), 80CCD(1B) (₹50K — NPS), 80E (education loan interest, no limit), 80G (donations), 80TTA/80TTB (savings/deposit interest), Section 24(b) (₹2L — home loan interest).' },
  { q: 'Can I claim deductions under the new tax regime?', a: 'The new regime allows only the ₹75,000 standard deduction and employer NPS contribution (80CCD-2). All other deductions (80C, 80D, HRA, etc.) are not available. Choose the regime that results in lower tax for your specific situation.' },
  { q: 'What is Section 80E?', a: 'Section 80E allows deduction of interest paid on education loans for higher studies. There is no upper limit on the deduction amount. The deduction is available for 8 years from the year you start repaying the loan.' },
  { q: 'What is Section 80G?', a: 'Section 80G provides deduction for donations to specified funds and charitable institutions. Some donations qualify for 100% deduction (PM Relief Fund, etc.) while others get 50% deduction, subject to qualifying limits.' },
  { q: 'What is the difference between 80TTA and 80TTB?', a: '80TTA is for individuals below 60 — deduction up to ₹10,000 on savings account interest. 80TTB is for senior citizens (60+) — deduction up to ₹50,000 on interest from all deposits (savings, FD, post office). You cannot claim both.' },
]

export default function StandardDeductionCalculator() {
  const [form, setForm] = useState({
    section80C: '', section80D: '', section80DParents: '',
    nps80CCD1B: '', section80E: '', section80G: '', section80TTA: '',
    section80TTB: '', section80EE: '', section80EEA: '', section24b: '',
    hraExemption: '', lta: '', isSenior: false, parentsSenior: false,
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const mapped = {}
    for (const [k, v] of Object.entries(form)) {
      mapped[k] = typeof v === 'boolean' ? v : (Number(v) || 0)
    }
    setResult(calculateStandardDeductions(mapped))
  }

  const shareText = result
    ? `Tax Deductions Summary (Old Regime)\nStandard: ${formatINR(result.standardDeduction)}\n80C: ${formatINR(result.section80C)}\n80D: ${formatINR(result.section80D + result.section80DParents)}\n24(b): ${formatINR(result.section24b)}\nTotal: ${formatINR(result.totalDeductions)}\n\ntax.doaide.com/standard-deduction-calculator`
    : ''

  function DeductionRow({ label, value, max, hint }) {
    const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={s.row}>
          <span style={s.rowLabel}>
            {label}
            {hint && <span style={{ display: 'block', fontSize: 11, color: 'var(--doaide-text-muted)' }}>{hint}</span>}
          </span>
          <span style={s.rowValue}>
            {formatINR(value)}
            {max > 0 && <span style={s.rowLimit}> / {formatINR(max)}</span>}
          </span>
        </div>
        {max > 0 && (
          <div style={s.progressBar}>
            <div style={{ ...s.progressFill, width: `${pct}%` }} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="Standard Deduction Calculator - All Sections | DoAide TaxFile"
        description="Comprehensive deduction calculator covering all major sections — 80C, 80D, 80CCD(1B), 80E, 80G, 80TTA, 80TTB, Section 24(b), HRA. Track your limits for FY 2026-27."
        keywords="standard deduction calculator, 80C 80D deduction, income tax deductions India, all tax deductions calculator"
        canonical="https://tax.doaide.com/standard-deduction-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Deduction Calculator</h1>
      <p style={s.subtitle}>All major sections — Track your deduction limits for FY 2026-27 (Old Regime)</p>

      <div style={s.form}>
        <InputField label="Are you a Senior Citizen (60+)?" type="checkbox" value={form.isSenior} onChange={set('isSenior')} />
        <InputField label="Are your parents Senior Citizens?" type="checkbox" value={form.parentsSenior} onChange={set('parentsSenior')} />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Section 80C & 80CCD</div>
        <div style={s.form}>
          <InputField label="Section 80C" value={form.section80C} onChange={set('section80C')} currency hint="PPF, ELSS, LIC, NSC, FD, etc. Max ₹1,50,000" />
          <InputField label="NPS 80CCD(1B)" value={form.nps80CCD1B} onChange={set('nps80CCD1B')} currency hint="Additional ₹50,000 beyond 80C" />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Section 80D — Health Insurance</div>
        <div style={s.form}>
          <InputField label="80D (Self & Family)" value={form.section80D} onChange={set('section80D')} currency hint={`Max ${form.isSenior ? '₹50,000 (senior)' : '₹25,000'}`} />
          <InputField label="80D (Parents)" value={form.section80DParents} onChange={set('section80DParents')} currency hint={`Max ${form.parentsSenior ? '₹50,000 (senior parents)' : '₹25,000'}`} />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Other Deductions</div>
        <div style={s.form}>
          <InputField label="Section 80E (Education Loan Interest)" value={form.section80E} onChange={set('section80E')} currency hint="No upper limit" />
          <InputField label="Section 80G (Donations)" value={form.section80G} onChange={set('section80G')} currency hint="Eligible donation amount" />
          <InputField label={form.isSenior ? 'Section 80TTB (Deposit Interest)' : 'Section 80TTA (Savings Interest)'} value={form.isSenior ? form.section80TTB : form.section80TTA}
            onChange={set(form.isSenior ? 'section80TTB' : 'section80TTA')} currency hint={form.isSenior ? 'Max ₹50,000' : 'Max ₹10,000'} />
          <InputField label="Section 80EE (Home Loan Interest — first-time)" value={form.section80EE} onChange={set('section80EE')} currency hint="Max ₹50,000" />
          <InputField label="Section 80EEA (Affordable Housing)" value={form.section80EEA} onChange={set('section80EEA')} currency hint="Max ₹1,50,000" />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Housing</div>
        <div style={s.form}>
          <InputField label="Section 24(b) Home Loan Interest" value={form.section24b} onChange={set('section24b')} currency hint="Max ₹2,00,000 (self-occupied)" />
          <InputField label="HRA Exemption" value={form.hraExemption} onChange={set('hraExemption')} currency hint="Use HRA Calculator to compute" />
          <InputField label="LTA (Leave Travel Allowance)" value={form.lta} onChange={set('lta')} currency />
        </div>
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Total Deductions</button>

      {result && (
        <ResultCard title="Deduction Summary" gold>
          <DeductionRow label="Standard Deduction" value={result.standardDeduction} max={50000} />
          <DeductionRow label="Section 80C" value={result.section80C} max={result.section80CMax} hint="PPF, ELSS, LIC, NSC, FD" />
          <DeductionRow label="Section 80D (Self)" value={result.section80D} max={result.section80DMax} hint="Health insurance" />
          <DeductionRow label="Section 80D (Parents)" value={result.section80DParents} max={result.section80DParentsMax} />
          <DeductionRow label="NPS 80CCD(1B)" value={result.nps80CCD1B} max={result.nps80CCD1BMax} />
          {result.section80E > 0 && <DeductionRow label="Section 80E" value={result.section80E} max={0} hint="Education loan interest" />}
          {result.section80G > 0 && <DeductionRow label="Section 80G" value={result.section80G} max={0} hint="Donations" />}
          {result.section80TTA > 0 && <DeductionRow label="Section 80TTA" value={result.section80TTA} max={result.section80TTAMax} />}
          {result.section80TTB > 0 && <DeductionRow label="Section 80TTB" value={result.section80TTB} max={result.section80TTBMax} />}
          {result.section80EE > 0 && <DeductionRow label="Section 80EE" value={result.section80EE} max={result.section80EEMax} />}
          {result.section80EEA > 0 && <DeductionRow label="Section 80EEA" value={result.section80EEA} max={result.section80EEAMax} />}
          <DeductionRow label="Section 24(b)" value={result.section24b} max={result.section24bMax} hint="Home loan interest" />
          {result.hraExemption > 0 && <DeductionRow label="HRA Exemption" value={result.hraExemption} max={0} />}
          {result.lta > 0 && <DeductionRow label="LTA" value={result.lta} max={0} />}

          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 16 }}>
            <span style={s.highlight}>Total Deductions</span>
            <span style={s.highlight}>{formatINR(result.totalDeductions)}</span>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
