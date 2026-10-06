import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import FAQSection from '../components/FAQSection'
import { calculateHRA, formatINR } from '../lib/taxEngine'

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
  formula: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
}

const FAQS = [
  { q: 'What is HRA exemption?', a: 'HRA (House Rent Allowance) exemption under Section 10(13A) allows salaried individuals living in rented accommodation to claim tax exemption on the HRA component of their salary.' },
  { q: 'How is HRA exemption calculated?', a: 'HRA exemption is the minimum of three amounts: (1) Actual HRA received, (2) 50% of salary (basic + DA) for metros or 40% for non-metros, and (3) Rent paid minus 10% of salary (basic + DA).' },
  { q: 'Which cities are metro for HRA?', a: 'For HRA purposes, metro cities are Delhi, Mumbai, Kolkata, and Chennai. All other cities are considered non-metro and get 40% of salary as the limit instead of 50%.' },
  { q: 'Can I claim HRA if I own a house?', a: 'Yes, you can claim HRA even if you own a house in a different city. However, you cannot claim both HRA exemption and home loan interest deduction for the same property.' },
]

export default function HRACalculator() {
  const [form, setForm] = useState({ basicSalary: '', da: '', hraReceived: '', rentPaid: '', cityType: 'non_metro' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateHRA(
      Number(form.basicSalary) || 0, Number(form.da) || 0,
      Number(form.hraReceived) || 0, Number(form.rentPaid) || 0,
      form.cityType === 'metro',
    )
    setResult(r)
  }

  const shareText = result ? `HRA Exemption: ${formatINR(result.exemption)}\nTaxable HRA: ${formatINR(result.taxableHRA)}\n\nCalculated on tax.doaide.com` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="HRA Exemption Calculator - Section 10(13A) | DoAide TaxFile"
        description="Calculate your HRA tax exemption under Section 10(13A). Enter basic salary, HRA received, and rent paid to find your exemption amount."
        keywords="HRA exemption calculator, HRA calculation, Section 10(13A), house rent allowance"
        canonical="https://tax.doaide.com/hra-calculator"
      />

      <h1 style={s.title}>HRA Exemption Calculator</h1>
      <p style={s.subtitle}>Section 10(13A) — Calculate your House Rent Allowance exemption</p>

      <div style={s.form}>
        <InputField label="Basic Salary (Annual)" value={form.basicSalary} onChange={set('basicSalary')} currency />
        <InputField label="Dearness Allowance (Annual)" value={form.da} onChange={set('da')} currency />
        <InputField label="HRA Received (Annual)" value={form.hraReceived} onChange={set('hraReceived')} currency />
        <InputField label="Rent Paid (Annual)" value={form.rentPaid} onChange={set('rentPaid')} currency />
        <InputField label="City Type" type="select" value={form.cityType} onChange={set('cityType')}
          options={[{ value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)' }, { value: 'non_metro', label: 'Non-Metro' }]} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate HRA Exemption</button>

      {result && (
        <ResultCard title="HRA Exemption Breakdown" gold>
          <div style={s.row}>
            <span style={s.rowLabel}>Actual HRA Received</span>
            <span style={s.rowValue}>{formatINR(result.actualHRA)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>{form.cityType === 'metro' ? '50%' : '40%'} of Salary (Basic + DA)</span>
            <span style={s.rowValue}>{formatINR(result.percentOfSalary)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Rent Paid - 10% of Salary</span>
            <span style={s.rowValue}>{formatINR(result.rentMinus10Pct)}</span>
          </div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 16 }}>
            <span style={s.highlight}>HRA Exemption (Minimum of above)</span>
            <span style={s.highlight}>{formatINR(result.exemption)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Taxable HRA</span>
            <span style={s.rowValue}>{formatINR(result.taxableHRA)}</span>
          </div>

          <div style={s.formula}>
            Exemption = min( {formatINR(result.actualHRA)} , {formatINR(result.percentOfSalary)} , {formatINR(result.rentMinus10Pct)} ) = {formatINR(result.exemption)}
          </div>

          <div style={{ marginTop: 16 }}>
            <WhatsAppShare text={shareText} />
          </div>
        </ResultCard>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
