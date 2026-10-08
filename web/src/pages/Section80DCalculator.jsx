import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateSection80D, formatINR } from '../lib/taxEngine'

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
  sectionLabel: { fontSize: 12, fontWeight: 600, color: 'var(--doaide-gold)', marginTop: 16, marginBottom: 8, textTransform: 'uppercase' },
  limitBar: {
    marginTop: 8, height: 8, borderRadius: 4, background: 'var(--doaide-border)', overflow: 'hidden',
  },
  limitFill: {
    height: '100%', borderRadius: 4, background: 'var(--doaide-gold)', transition: 'width 0.3s ease',
  },
  infoBox: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
}

const FAQS = [
  { q: 'What is Section 80D deduction?', a: 'Section 80D allows tax deductions for health insurance premiums paid for yourself, your family (spouse and children), and your parents. The deduction is available only under the old tax regime.' },
  { q: 'What are the deduction limits under 80D?', a: 'For self and family: ₹25,000 (₹50,000 if senior citizen). For parents: ₹25,000 (₹50,000 if parents are senior citizens). Maximum total deduction: ₹1,00,000 if both self and parents are senior citizens.' },
  { q: 'Does 80D include preventive health checkup?', a: 'Yes, expenses up to ₹5,000 for preventive health checkup are included within the overall 80D limit. This is available even if you don\'t have health insurance.' },
  { q: 'Can I claim 80D for parents\' insurance?', a: 'Yes, you can claim a separate deduction for health insurance premiums paid for your parents, in addition to your own family coverage. Parents need not be dependents; you just need to be paying the premium.' },
]

export default function Section80DCalculator() {
  const [form, setForm] = useState({
    selfPremium: '', spousePremium: '', childrenPremium: '', parentsPremium: '',
    preventiveCheckup: '', isSelfSenior: false, isParentsSenior: false,
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateSection80D(
      Number(form.selfPremium) || 0,
      Number(form.spousePremium) || 0,
      Number(form.childrenPremium) || 0,
      Number(form.parentsPremium) || 0,
      form.isSelfSenior,
      form.isParentsSenior,
      Number(form.preventiveCheckup) || 0,
    )
    setResult(r)
  }

  const shareText = result ? `Section 80D Deduction: ${formatINR(result.totalDeduction)}\nTax Saving (30%): ${formatINR(result.taxSavingHighSlab)}\n\ntax.doaide.com/80d-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80D Calculator - Health Insurance Tax Benefit | DoAide TaxFile"
        description="Calculate Section 80D tax deduction for health insurance premiums. Self, family, and parents coverage with senior citizen limits."
        keywords="80D calculator, Section 80D deduction, health insurance tax benefit, medical insurance deduction"
        canonical="https://tax.doaide.com/80d-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Section 80D Calculator</h1>
      <p style={s.subtitle}>Health Insurance — Calculate your tax deduction under Section 80D</p>

      <div style={s.form}>
        <InputField label="Self Premium (Annual)" value={form.selfPremium} onChange={set('selfPremium')} currency />
        <InputField label="Spouse Premium (Annual)" value={form.spousePremium} onChange={set('spousePremium')} currency />
        <InputField label="Children Premium (Annual)" value={form.childrenPremium} onChange={set('childrenPremium')} currency />
        <InputField label="Parents Premium (Annual)" value={form.parentsPremium} onChange={set('parentsPremium')} currency />
        <InputField label="Preventive Health Checkup" value={form.preventiveCheckup} onChange={set('preventiveCheckup')} currency hint="Max ₹5,000 within limit" />
        <InputField label="Are you a Senior Citizen (60+)?" type="checkbox" value={form.isSelfSenior} onChange={set('isSelfSenior')} />
        <InputField label="Are your parents Senior Citizens (60+)?" type="checkbox" value={form.isParentsSenior} onChange={set('isParentsSenior')} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate 80D Benefit</button>

      {result && (
        <ResultCard title="Section 80D Deduction Breakdown" gold>
          <div style={s.sectionLabel}>Self & Family</div>
          <div style={s.row}><span style={s.rowLabel}>Premium (Self + Spouse + Children)</span><span style={s.rowValue}>{formatINR(result.selfFamilyPremium)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Preventive Checkup</span><span style={s.rowValue}>{formatINR(result.preventiveCheckup)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Deduction (limit: {formatINR(result.selfLimit)})</span><span style={s.rowValue}>{formatINR(result.selfDeduction)}</span></div>
          <div style={s.limitBar}>
            <div style={{ ...s.limitFill, width: `${Math.min((result.selfDeduction / result.selfLimit) * 100, 100)}%` }} />
          </div>
          {result.selfRemaining > 0 && <div style={{ fontSize: 12, color: 'var(--doaide-text-muted)', marginTop: 4 }}>Remaining: {formatINR(result.selfRemaining)}</div>}

          <div style={s.sectionLabel}>Parents</div>
          <div style={s.row}><span style={s.rowLabel}>Parents Premium</span><span style={s.rowValue}>{formatINR(result.parentsPremium)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Deduction (limit: {formatINR(result.parentsLimit)})</span><span style={s.rowValue}>{formatINR(result.parentsDeduction)}</span></div>
          <div style={s.limitBar}>
            <div style={{ ...s.limitFill, width: `${Math.min((result.parentsDeduction / result.parentsLimit) * 100, 100)}%` }} />
          </div>
          {result.parentsRemaining > 0 && <div style={{ fontSize: 12, color: 'var(--doaide-text-muted)', marginTop: 4 }}>Remaining: {formatINR(result.parentsRemaining)}</div>}

          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 16 }}>
            <span style={s.highlight}>Total 80D Deduction</span>
            <span style={s.highlight}>{formatINR(result.totalDeduction)}</span>
          </div>

          <div style={s.sectionLabel}>Tax Savings (Old Regime)</div>
          <div style={s.row}><span style={s.rowLabel}>At 31.2% (highest slab + cess)</span><span style={s.rowValue}>{formatINR(result.taxSavingHighSlab)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>At 20.8% (middle slab + cess)</span><span style={s.rowValue}>{formatINR(result.taxSavingMidSlab)}</span></div>

          <div style={s.infoBox}>
            <strong>Limits:</strong> Self & family — ₹25,000 (₹50,000 for senior citizens). Parents — ₹25,000 (₹50,000 if senior).
            Preventive checkup up to ₹5,000 is included within the self/family limit. Max total: ₹1,00,000.
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
