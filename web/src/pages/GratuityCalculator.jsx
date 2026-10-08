import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateGratuity, formatINR } from '../lib/taxEngine'

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
  warning: {
    marginTop: 12, padding: 12, background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, color: '#ef4444',
  },
}

const FAQS = [
  { q: 'What is gratuity and who is eligible?', a: 'Gratuity is a lump sum paid by the employer to an employee as a token of appreciation for services rendered. Under the Payment of Gratuity Act, 1972, employees who have completed 5 or more years of continuous service are eligible.' },
  { q: 'How is gratuity calculated?', a: 'For private employees covered under the Act: Gratuity = (15 × Last Drawn Salary × Years of Service) / 26. For government employees: Gratuity = (15 × Last Drawn Salary × Years of Service) / 30. Last drawn salary includes basic pay and dearness allowance.' },
  { q: 'What is the tax exemption limit on gratuity?', a: 'Under Section 10(10) of the Income Tax Act, gratuity received up to ₹20 lakh is exempt from tax. Any amount exceeding this limit is taxable at your applicable slab rate.' },
  { q: 'Is gratuity paid if I resign before 5 years?', a: 'Generally, you need to complete 5 years to be eligible. However, in case of death or disability, the 5-year requirement is waived. Some companies voluntarily pay gratuity even before 5 years as per their policy.' },
]

export default function GratuityCalculator() {
  const [form, setForm] = useState({ lastDrawnSalary: '', yearsOfService: '', employeeType: 'private' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateGratuity(
      Number(form.lastDrawnSalary) || 0,
      Number(form.yearsOfService) || 0,
      form.employeeType === 'government',
    )
    setResult(r)
  }

  const shareText = result ? `Gratuity Amount: ${formatINR(result.gratuityAmount)}\nTax-Free: ${formatINR(result.exemptAmount)}\nTaxable: ${formatINR(result.taxableAmount)}\n\ntax.doaide.com/gratuity-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Gratuity Calculator - Section 10(10) | DoAide TaxFile"
        description="Calculate your gratuity amount and tax exemption under Section 10(10). For government and private sector employees."
        keywords="gratuity calculator, gratuity calculation formula, Section 10(10), gratuity tax exemption"
        canonical="https://tax.doaide.com/gratuity-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Gratuity Calculator</h1>
      <p style={s.subtitle}>Section 10(10) — Calculate your gratuity and tax exemption</p>

      <div style={s.form}>
        <InputField label="Last Drawn Salary (Basic + DA, Monthly)" value={form.lastDrawnSalary} onChange={set('lastDrawnSalary')} currency />
        <InputField label="Years of Service" type="number" value={form.yearsOfService} onChange={set('yearsOfService')} placeholder="5" />
        <InputField label="Employee Type" type="select" value={form.employeeType} onChange={set('employeeType')}
          options={[{ value: 'private', label: 'Private Sector' }, { value: 'government', label: 'Government' }]} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Gratuity</button>

      {result && (
        <ResultCard title="Gratuity Calculation" gold>
          {!result.eligible && (
            <div style={s.warning}>
              ⚠ Minimum 5 years of continuous service required for gratuity eligibility.
            </div>
          )}

          <div style={s.row}><span style={s.rowLabel}>Last Drawn Salary (Monthly)</span><span style={s.rowValue}>{formatINR(result.lastDrawnSalary)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Years of Service</span><span style={s.rowValue}>{result.yearsOfService} years</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Gratuity Amount</span>
            <span style={s.highlight}>{formatINR(result.gratuityAmount)}</span>
          </div>
          <div style={s.row}><span style={s.rowLabel}>Tax-Exempt (up to ₹20L)</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.exemptAmount)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Taxable Amount</span><span style={s.rowValue}>{formatINR(result.taxableAmount)}</span></div>

          <div style={s.formula}>
            Formula: {result.formula} = {formatINR(result.gratuityAmount)}
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
