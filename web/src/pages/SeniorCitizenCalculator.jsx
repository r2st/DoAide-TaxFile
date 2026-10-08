import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateSeniorCitizenTax, formatINR } from '../lib/taxEngine'

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
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  benefit: {
    padding: '8px 12px', background: 'var(--doaide-gold-bg)', borderRadius: 'var(--doaide-radius-sm)',
    fontSize: 13, color: 'var(--doaide-gold)', marginBottom: 6,
  },
  savingsBanner: {
    background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-md)', padding: '16px 20px', textAlign: 'center',
    fontSize: 16, color: 'var(--doaide-gold)', fontWeight: 600, marginTop: 16,
  },
}

const FAQS = [
  { q: 'What is the basic exemption limit for senior citizens?', a: 'For FY 2026-27 under the old regime: Senior citizens (60-79 years) have a basic exemption of ₹3,00,000. Super senior citizens (80+) have ₹5,00,000. Under the new regime, the standard ₹4,00,000 slab applies regardless of age.' },
  { q: 'What is Section 80TTB?', a: 'Section 80TTB allows senior citizens (60+) a deduction of up to ₹50,000 on interest income from bank deposits, post office deposits, and cooperative banks. This replaces Section 80TTA (₹10,000 limit) available to non-seniors.' },
  { q: 'What is the 80D limit for senior citizens?', a: 'Senior citizens can claim up to ₹50,000 under Section 80D for health insurance premium (vs ₹25,000 for those below 60). If paying for senior citizen parents, an additional ₹50,000 is available.' },
  { q: 'Do super senior citizens need to pay advance tax?', a: 'Super senior citizens (80+) who do not have income from business or profession are exempt from paying advance tax. They can pay their entire tax liability at the time of filing ITR.' },
  { q: 'Can senior citizens file ITR offline?', a: 'Super senior citizens (80+) filing ITR-1 or ITR-4 can file in paper form. All others must file electronically. Senior citizens (60-79) must file online.' },
  { q: 'What is Form 15H?', a: 'Form 15H is a declaration by senior citizens (60+) to the bank to not deduct TDS on interest income, if their total income is below the taxable limit. This avoids TDS and the hassle of claiming refunds.' },
]

export default function SeniorCitizenCalculator() {
  const [form, setForm] = useState({
    grossIncome: '', age: '65', section80C: '', section80D: '',
    section80DParents: '', section80TTB: '', homeLoanInterest: '',
    nps80CCD1B: '', otherDeductions: '',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const gross = Number(form.grossIncome) || 0
    if (gross <= 0) return
    const r = calculateSeniorCitizenTax(gross, Number(form.age) || 65, {
      section80C: Number(form.section80C) || 0,
      section80D: Number(form.section80D) || 0,
      section80DParents: Number(form.section80DParents) || 0,
      section80TTB: Number(form.section80TTB) || 0,
      homeLoanInterest: Number(form.homeLoanInterest) || 0,
      nps80CCD1B: Number(form.nps80CCD1B) || 0,
      other: Number(form.otherDeductions) || 0,
    })
    setResult(r)
  }

  const shareText = result
    ? `Senior Citizen Tax (${result.category})\nGross Income: ${formatINR(result.grossIncome)}\nOld Regime Tax: ${formatINR(result.totalTaxOld)}\nNew Regime Tax: ${formatINR(result.totalTaxNew)}\nRecommended: ${result.recommended === 'new' ? 'New' : 'Old'} Regime (save ${formatINR(result.savings)})\n\ntax.doaide.com/senior-citizen-calculator`
    : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Senior Citizen Tax Calculator - Special Exemptions FY 2026-27 | DoAide TaxFile"
        description="Income tax calculator for senior citizens (60+) and super senior citizens (80+). Special exemptions, higher 80D/80TTB limits, old vs new regime comparison."
        keywords="senior citizen tax calculator, super senior citizen tax, 80TTB deduction, senior citizen tax exemption"
        canonical="https://tax.doaide.com/senior-citizen-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Senior Citizen Tax Calculator</h1>
      <p style={s.subtitle}>FY 2026-27 — Special exemptions for Senior (60+) and Super Senior (80+) citizens</p>

      <div style={s.form}>
        <InputField label="Gross Annual Income" value={form.grossIncome} onChange={set('grossIncome')} currency />
        <InputField label="Age" type="number" value={form.age} onChange={set('age')} hint="60+ for senior, 80+ for super senior" />
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Deductions (Old Regime)</div>
        <div style={s.form}>
          <InputField label="Section 80C" value={form.section80C} onChange={set('section80C')} currency hint="PPF, ELSS, LIC, etc. Max ₹1,50,000" />
          <InputField label="Section 80D (Self)" value={form.section80D} onChange={set('section80D')} currency hint="Health insurance. Max ₹50,000 for seniors" />
          <InputField label="Section 80D (Parents)" value={form.section80DParents} onChange={set('section80DParents')} currency hint="Parents health insurance. Max ₹50,000" />
          <InputField label="Section 80TTB" value={form.section80TTB} onChange={set('section80TTB')} currency hint="Interest from deposits. Max ₹50,000 (seniors only)" />
          <InputField label="Home Loan Interest (24b)" value={form.homeLoanInterest} onChange={set('homeLoanInterest')} currency hint="Max ₹2,00,000" />
          <InputField label="NPS 80CCD(1B)" value={form.nps80CCD1B} onChange={set('nps80CCD1B')} currency hint="Additional ₹50,000" />
          <InputField label="Other Deductions" value={form.otherDeductions} onChange={set('otherDeductions')} currency hint="80E, 80G, etc." />
        </div>
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Tax</button>

      {result && (
        <ResultCard title={`Tax Calculation — ${result.category}`} gold>
          <div style={s.row}>
            <span style={s.rowLabel}>Gross Income</span>
            <span style={s.rowValue}>{formatINR(result.grossIncome)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Total Deductions (Old Regime)</span>
            <span style={s.rowValue}>{formatINR(result.deductionsTotal)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Taxable Income (Old Regime)</span>
            <span style={s.rowValue}>{formatINR(result.taxableIncome)}</span>
          </div>
          {result.rebate87A > 0 && (
            <div style={s.row}>
              <span style={s.rowLabel}>Section 87A Rebate</span>
              <span style={s.rowValue}>{formatINR(result.rebate87A)}</span>
            </div>
          )}
          <div style={s.row}>
            <span style={s.rowLabel}>Old Regime Tax</span>
            <span style={{ ...s.rowValue, fontWeight: 600 }}>{formatINR(result.totalTaxOld)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>New Regime Tax</span>
            <span style={{ ...s.rowValue, fontWeight: 600 }}>{formatINR(result.totalTaxNew)}</span>
          </div>

          <div style={s.savingsBanner}>
            {result.recommended === 'new' ? 'New' : 'Old'} Regime saves you {formatINR(result.savings)}
          </div>

          {result.specialBenefits.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Special Benefits for {result.category}</div>
              {result.specialBenefits.map((b, i) => (
                <div key={i} style={s.benefit}>{b}</div>
              ))}
            </div>
          )}

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
