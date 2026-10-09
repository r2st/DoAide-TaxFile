import { useState } from 'react'
import SEOHead from '../../components/SEOHead'
import InputField from '../../components/InputField'
import ResultCard from '../../components/ResultCard'
import FAQSection from '../../components/FAQSection'
import ShareButtons from '../../components/ShareButtons'
import WhatsAppShare from '../../components/WhatsAppShare'
import PrintButton from '../../components/PrintButton'
import { Link } from 'react-router-dom'
import { calculateHRA, formatINR } from '../../lib/taxEngine'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 'clamp(24px, 5vw, 36px)', marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
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
  formula: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
  stepCard: {
    marginTop: 16, padding: 16, background: 'var(--doaide-surface)',
    border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-md)',
  },
  stepNumber: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 28, height: 28, borderRadius: '50%', background: 'var(--doaide-gold)',
    color: 'var(--doaide-text-on-gold)', fontSize: 13, fontWeight: 700, marginRight: 10,
  },
  stepLabel: { fontSize: 14, fontWeight: 500, color: 'var(--doaide-text)' },
  stepValue: { fontSize: 16, fontFamily: 'var(--doaide-font-mono)', fontWeight: 600, marginTop: 4 },
  minBadge: {
    display: 'inline-block', padding: '2px 8px', background: 'var(--doaide-gold-bg)',
    color: 'var(--doaide-gold)', borderRadius: 12, fontSize: 11, fontWeight: 600, marginLeft: 8,
  },
  actions: { display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap', alignItems: 'center' },
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
  { q: 'What is HRA exemption and who can claim it?', a: 'HRA (House Rent Allowance) exemption under Section 10(13A) allows salaried individuals living in rented accommodation to claim tax exemption on the HRA component of their salary. You must be paying rent and receiving HRA as part of your salary to claim this exemption.' },
  { q: 'How is HRA exemption calculated?', a: 'HRA exemption is the minimum of three amounts: (1) Actual HRA received from employer, (2) 50% of salary (basic + DA) for metro cities or 40% for non-metro cities, and (3) Rent paid minus 10% of salary (basic + DA). The lowest of these three becomes your exempt amount.' },
  { q: 'Which cities are considered metro for HRA?', a: 'For HRA purposes, metro cities are Delhi, Mumbai, Kolkata, and Chennai. All other cities including Bengaluru, Hyderabad, Pune, and Ahmedabad are considered non-metro and get 40% of salary as the limit instead of 50%.' },
  { q: 'Can I claim HRA in the new tax regime?', a: 'No, HRA exemption is NOT available under the new tax regime. You can claim HRA exemption only if you opt for the old tax regime. Use our Regime Comparison Calculator to check which regime saves more tax for you.' },
  { q: 'Can I claim HRA if I own a house?', a: 'Yes, you can claim HRA even if you own a house in a different city. However, you cannot claim both HRA exemption and home loan interest deduction for the same property in the same city.' },
  { q: 'What documents do I need for HRA claim?', a: 'You need rent receipts (required if rent exceeds ₹3,000/month), rental agreement, and landlord PAN card (mandatory if annual rent exceeds ₹1,00,000). Keep these documents for at least 6 years for tax scrutiny purposes.' },
  { q: 'What if my rent paid is less than 10% of my salary?', a: 'If your rent paid is less than 10% of your salary (basic + DA), the third limit (rent minus 10% of salary) becomes zero or negative, which means zero. Your HRA exemption will be zero in this case because the minimum of the three values would be zero.' },
]

export default function HRACalculatorTool() {
  const [form, setForm] = useState({
    basicSalary: '', da: '', hraReceived: '', rentPaid: '', cityType: 'non_metro',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const basic = Number(form.basicSalary) || 0
    if (basic <= 0) return
    const r = calculateHRA(
      basic, Number(form.da) || 0,
      Number(form.hraReceived) || 0, Number(form.rentPaid) || 0,
      form.cityType === 'metro',
    )
    setResult(r)
  }

  const shareText = result
    ? `My HRA Exemption: ${formatINR(result.exemption)}\nTaxable HRA: ${formatINR(result.taxableHRA)}\n\nCalculate yours free: tax.doaide.com/tools/hra-calculator`
    : ''

  const isMetro = form.cityType === 'metro'
  const pct = isMetro ? '50%' : '40%'

  function findMinIndex(r) {
    const vals = [r.actualHRA, r.percentOfSalary, r.rentMinus10Pct]
    const min = Math.min(...vals)
    return vals.indexOf(min)
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="HRA Exemption Calculator - Section 10(13A) FY 2026-27 | DoAide TaxFile"
        description="Free HRA exemption calculator for FY 2026-27. Enter basic salary, DA, HRA received, rent paid & city type. See step-by-step calculation with all three limits and taxable HRA amount instantly."
        keywords="HRA exemption calculator, HRA calculation, Section 10(13A), house rent allowance calculator, HRA tax exemption, HRA calculator online free, hra exemption formula"
        canonical="https://tax.doaide.com/tools/hra-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>HRA Exemption Calculator</h1>
      <p style={s.subtitle}>
        Section 10(13A) — Calculate your House Rent Allowance tax exemption with step-by-step breakdown
      </p>

      <div style={s.form}>
        <InputField label="Basic Salary (Annual)" value={form.basicSalary} onChange={set('basicSalary')} currency hint="Your basic salary component per year" />
        <InputField label="Dearness Allowance (Annual)" value={form.da} onChange={set('da')} currency hint="DA component, enter 0 if not applicable" />
        <InputField label="HRA Received (Annual)" value={form.hraReceived} onChange={set('hraReceived')} currency hint="HRA component from your salary" />
        <InputField label="Rent Paid (Annual)" value={form.rentPaid} onChange={set('rentPaid')} currency hint="Total rent paid per year" />
        <InputField label="City Type" type="select" value={form.cityType} onChange={set('cityType')}
          options={[
            { value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)' },
            { value: 'non_metro', label: 'Non-Metro (Bengaluru, Hyderabad, Pune, etc.)' },
          ]} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate HRA Exemption</button>

      {result && (() => {
        const minIdx = findMinIndex(result)
        const steps = [
          { label: 'Actual HRA Received', value: result.actualHRA, desc: 'The HRA component you receive from your employer' },
          { label: `${pct} of Salary (Basic + DA)`, value: result.percentOfSalary, desc: `${pct} × ${formatINR((Number(form.basicSalary) || 0) + (Number(form.da) || 0))}` },
          { label: 'Rent Paid − 10% of Salary', value: result.rentMinus10Pct, desc: `${formatINR(Number(form.rentPaid) || 0)} − 10% × ${formatINR((Number(form.basicSalary) || 0) + (Number(form.da) || 0))}` },
        ]

        return (
          <>
            <ResultCard title="Step-by-Step HRA Calculation" gold>
              {steps.map((step, i) => (
                <div key={i} style={s.stepCard}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={s.stepNumber}>{i + 1}</span>
                    <span style={s.stepLabel}>
                      {step.label}
                      {i === minIdx && <span style={s.minBadge}>MINIMUM</span>}
                    </span>
                  </div>
                  <div style={{ ...s.stepValue, color: i === minIdx ? 'var(--doaide-gold)' : 'var(--doaide-text)' }}>
                    {formatINR(step.value)}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--doaide-text-muted)', marginTop: 2 }}>{step.desc}</div>
                </div>
              ))}

              <div style={{ marginTop: 20, padding: 16, background: 'var(--doaide-gold-bg)', borderRadius: 'var(--doaide-radius-md)' }}>
                <div style={s.row}>
                  <span style={s.highlight}>HRA Exemption (Minimum of above)</span>
                  <span style={s.highlight}>{formatINR(result.exemption)}</span>
                </div>
                <div style={{ ...s.row, borderBottom: 'none' }}>
                  <span style={s.rowLabel}>Taxable HRA</span>
                  <span style={s.rowValue}>{formatINR(result.taxableHRA)}</span>
                </div>
              </div>

              <div style={s.formula}>
                Exemption = min( {formatINR(result.actualHRA)} , {formatINR(result.percentOfSalary)} , {formatINR(result.rentMinus10Pct)} )<br />
                Exemption = {formatINR(result.exemption)}<br />
                Taxable HRA = {formatINR(result.actualHRA)} − {formatINR(result.exemption)} = {formatINR(result.taxableHRA)}
              </div>

              <div style={s.actions}>
                <WhatsAppShare text={shareText} />
                <ShareButtons text={shareText} />
                <PrintButton />
              </div>
            </ResultCard>

            <ResultCard title="Tax Impact" style={{ marginTop: 24 }}>
              <div style={s.row}>
                <span style={s.rowLabel}>Tax saved at 30% slab (+ cess)</span>
                <span style={{ ...s.rowValue, color: 'var(--doaide-gold)' }}>{formatINR(Math.round(result.exemption * 0.312))}</span>
              </div>
              <div style={s.row}>
                <span style={s.rowLabel}>Tax saved at 20% slab (+ cess)</span>
                <span style={s.rowValue}>{formatINR(Math.round(result.exemption * 0.208))}</span>
              </div>
              <div style={{ ...s.row, borderBottom: 'none' }}>
                <span style={s.rowLabel}>Tax saved at 5% slab (+ cess)</span>
                <span style={s.rowValue}>{formatINR(Math.round(result.exemption * 0.052))}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--doaide-text-muted)', marginTop: 12 }}>
                HRA exemption is only available under the old tax regime.{' '}
                <Link to="/tools/regime-comparison" style={{ color: 'var(--doaide-gold)', textDecoration: 'none' }}>
                  Compare regimes →
                </Link>
              </p>
            </ResultCard>
          </>
        )
      })()}

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 22, marginBottom: 16 }}>Worked Examples</h2>
        <div style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 }}>Example: ₹50K salary, ₹20K rent, Mumbai (Metro)</div>
          Basic: ₹6,00,000 | HRA: ₹3,00,000 | Rent: ₹2,40,000<br />
          min(₹3L, 50%×₹6L=₹3L, ₹2.4L−₹60K=₹1.8L) = <strong>₹1,80,000 exempt</strong>
        </div>
        <div style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 }}>Example: ₹80K salary, ₹25K rent, Bangalore (Non-Metro)</div>
          Basic+DA: ₹9,60,000 | HRA: ₹4,00,000 | Rent: ₹3,00,000<br />
          min(₹4L, 40%×₹9.6L=₹3.84L, ₹3L−₹96K=₹2.04L) = <strong>₹2,04,000 exempt</strong>
        </div>
      </div>

      <div style={s.cta}>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Should you choose Old or New Regime?</div>
        <p style={{ fontSize: 14, color: 'var(--doaide-text-secondary)', marginBottom: 16 }}>
          HRA exemption is only available in the old regime. Compare both regimes with your complete deductions.
        </p>
        <Link to="/tools/regime-comparison" style={{
          display: 'inline-block', padding: '12px 24px', background: 'var(--doaide-gold)',
          color: 'var(--doaide-text-on-gold)', borderRadius: 'var(--doaide-radius-md)',
          textDecoration: 'none', fontWeight: 600, fontSize: 14, minHeight: 44,
        }}>
          Compare Tax Regimes →
        </Link>
      </div>

      <div style={s.relatedTools}>
        <div style={s.relatedTitle}>People Also Use</div>
        <div style={s.relatedGrid}>
          <Link to="/tools/regime-comparison" style={s.relatedLink}>⚖️ Old vs New Regime</Link>
          <Link to="/income-tax-calculator" style={s.relatedLink}>🧮 Income Tax Calculator</Link>
          <Link to="/rent-receipt-generator" style={s.relatedLink}>📝 Rent Receipt Generator</Link>
          <Link to="/take-home-salary-calculator" style={s.relatedLink}>💰 Take-Home Salary</Link>
          <Link to="/80c-planner" style={s.relatedLink}>📊 80C Planner</Link>
          <Link to="/80d-calculator" style={s.relatedLink}>🏥 80D Calculator</Link>
        </div>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
