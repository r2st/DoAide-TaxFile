import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateNPSBenefit, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
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
  sectionLabel: { fontSize: 12, fontWeight: 600, color: 'var(--doaide-gold)', marginTop: 16, marginBottom: 8, textTransform: 'uppercase' },
  infoBox: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
}

const FAQS = [
  { q: 'What is NPS and how does it save tax?', a: 'NPS (National Pension System) is a government-backed retirement savings scheme. It offers tax benefits under three sections: 80CCD(1) within the 80C limit of ₹1.5 lakh, 80CCD(1B) for an additional ₹50,000 deduction, and 80CCD(2) for employer contributions up to 14% of salary (central govt) or 10% (others).' },
  { q: 'What is Section 80CCD(1B)?', a: 'Section 80CCD(1B) allows an additional deduction of up to ₹50,000 for NPS contributions, over and above the ₹1.5 lakh limit under Section 80C. This is available only under the old tax regime.' },
  { q: 'Is employer NPS contribution taxable?', a: 'Employer contribution to NPS up to 14% of salary (basic + DA) for central government employees, or 10% for others, is exempt from tax under Section 80CCD(2). This benefit is available under both old and new tax regimes.' },
  { q: 'What happens to NPS at retirement?', a: 'At age 60, you must use at least 40% of the corpus to buy an annuity (pension). Up to 60% can be withdrawn as a lump sum, which is entirely tax-free. The annuity income is taxable at your slab rate.' },
  { q: 'Can I claim NPS benefits under the new regime?', a: 'Under the new regime, only employer NPS contribution under 80CCD(2) is allowed. The self-contribution deductions under 80CCD(1) and 80CCD(1B) are not available in the new regime.' },
]

export default function NPSCalculator() {
  const [form, setForm] = useState({
    annualContribution: '', employerContribution: '', grossIncome: '', age: '30',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateNPSBenefit(
      Number(form.annualContribution) || 0,
      Number(form.employerContribution) || 0,
      Number(form.grossIncome) || 0,
      Number(form.age) || 30,
    )
    setResult(r)
  }

  const shareText = result
    ? `NPS Tax Benefit\nTotal Deduction: ${formatINR(result.totalDeduction)}\nTax Saving (30% slab): ${formatINR(result.taxSavingHighSlab)}\nEstimated Corpus at 60: ${formatINR(result.estimatedCorpus)}\n\ntax.doaide.com/nps-calculator`
    : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="NPS Calculator 2026 — Tax Benefit Under 80CCD Free | DoAide TaxFile"
        description="Free NPS tax benefit calculator for FY 2026-27. Calculate deductions under Section 80CCD(1), 80CCD(1B), and 80CCD(2) with estimated retirement corpus. No login required."
        keywords="NPS calculator 2026, NPS tax benefit calculator, Section 80CCD calculator, 80CCD 1B deduction, NPS retirement corpus calculator"
        canonical="https://tax.doaide.com/nps-calculator"
        faqs={FAQS}
        breadcrumbs={[{ name: 'NPS Calculator', url: 'https://tax.doaide.com/nps-calculator' }]}
      />

      <h1 style={s.title}>NPS Tax Benefit Calculator</h1>
      <p style={s.subtitle}>Section 80CCD — Calculate your NPS deductions and estimated retirement corpus</p>

      <div style={s.form}>
        <InputField label="Your Annual NPS Contribution" value={form.annualContribution} onChange={set('annualContribution')} currency />
        <InputField label="Employer NPS Contribution" value={form.employerContribution} onChange={set('employerContribution')} currency hint="If employer contributes to NPS" />
        <InputField label="Gross Annual Income" value={form.grossIncome} onChange={set('grossIncome')} currency hint="For calculating 80CCD(1) limit" />
        <InputField label="Current Age" type="number" value={form.age} onChange={set('age')} placeholder="30" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate NPS Benefits</button>

      {result && (
        <ResultCard title="NPS Tax Benefit Breakdown" gold>
          <div style={s.sectionLabel}>Tax Deductions</div>
          <div style={s.row}>
            <span style={s.rowLabel}>80CCD(1) — Self (within 80C limit, 10% of salary)</span>
            <span style={s.rowValue}>{formatINR(result.deduction80CCD1)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>80CCD(1B) — Additional ₹50,000</span>
            <span style={s.rowValue}>{formatINR(result.deduction80CCD1B)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>80CCD(2) — Employer (up to 14% of salary)</span>
            <span style={s.rowValue}>{formatINR(result.deduction80CCD2)}</span>
          </div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Total NPS Deduction</span>
            <span style={s.highlight}>{formatINR(result.totalDeduction)}</span>
          </div>

          <div style={s.sectionLabel}>Tax Savings (Old Regime)</div>
          <div style={s.row}>
            <span style={s.rowLabel}>At 31.2% (highest slab + cess)</span>
            <span style={s.rowValue}>{formatINR(result.taxSavingHighSlab)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>At 20.8% (middle slab + cess)</span>
            <span style={s.rowValue}>{formatINR(result.taxSavingMidSlab)}</span>
          </div>

          {result.yearsToRetire > 0 && (
            <>
              <div style={s.sectionLabel}>Retirement Projection</div>
              <div style={s.row}>
                <span style={s.rowLabel}>Years to Retirement (age 60)</span>
                <span style={s.rowValue}>{result.yearsToRetire} years</span>
              </div>
              <div style={s.row}>
                <span style={s.rowLabel}>Estimated Corpus (at 10% p.a.)</span>
                <span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.estimatedCorpus)}</span>
              </div>
            </>
          )}

          <div style={s.infoBox}>
            <strong>Note:</strong> 80CCD(1) falls within the overall 80C limit of ₹1.5L. 80CCD(1B) is an additional
            deduction of up to ₹50,000 beyond 80C. Employer contribution under 80CCD(2) is available under both
            old and new tax regimes.
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 22, marginBottom: 16 }}>Worked Examples</h2>

        <div style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 }}>Private-sector employee, ₹15L gross salary</div>
          Self contribution: ₹1,00,000/year | Employer NPS: ₹60,000 (10% of basic ₹6L)<br/>
          80CCD(1): min(₹1L, 10% of ₹15L) = ₹1,00,000 (within 80C limit)<br/>
          80CCD(1B): ₹50,000 (additional deduction)<br/>
          80CCD(2): ₹60,000 (employer, both regimes)<br/>
          Total deduction: <strong>₹2,10,000</strong> | Tax saving at 31.2%: <strong>₹65,520</strong>
        </div>

        <div style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 }}>Central govt employee, ₹10L gross, age 30</div>
          Self contribution: ₹50,000 | Employer NPS: ₹56,000 (14% of basic ₹4L)<br/>
          80CCD(1): ₹50,000 | 80CCD(1B): ₹50,000 | 80CCD(2): ₹56,000<br/>
          Total deduction: <strong>₹1,56,000</strong> | Tax saving: <strong>₹48,672</strong><br/>
          Estimated corpus at 60 (10% return, 30 years): <strong>₹1.74 Cr</strong>
        </div>

        <p style={{ fontSize: 14, color: 'var(--doaide-text-secondary)' }}>
          Read our detailed <a href="/guides/nps-vs-ppf-vs-elss" style={{ color: 'var(--doaide-gold)', textDecoration: 'none' }}>NPS vs PPF vs ELSS Guide</a> for a comprehensive comparison of tax-saving investments.
        </p>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
