import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import HowItWorks from '../components/HowItWorks'
import { calculateProfessionalTax, PROFESSIONAL_TAX_STATES, formatINR } from '../lib/taxEngine'

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
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 13 },
  th: { textAlign: 'left', padding: '8px 6px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600 },
  td: { padding: '8px 6px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  info: {
    padding: 16, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.7,
  },
}

const FAQS = [
  { q: 'What is Professional Tax?', a: 'Professional Tax is a state-level tax levied on individuals earning income from salary, profession, or trade. It is collected by the state government. The maximum amount is capped at ₹2,500 per year as per Article 276 of the Constitution.' },
  { q: 'Which states levy Professional Tax in India?', a: 'States that levy professional tax include Maharashtra, Karnataka, West Bengal, Andhra Pradesh, Telangana, Tamil Nadu, Gujarat, Madhya Pradesh, Kerala, Odisha, Assam, and Bihar among others. Delhi, Uttar Pradesh, and Rajasthan do not levy professional tax.' },
  { q: 'Is Professional Tax deductible from income tax?', a: 'Yes, professional tax paid is fully deductible under Section 16(iii) of the Income Tax Act. It is allowed as a deduction from your salary income while calculating taxable income, regardless of whether you choose the old or new tax regime.' },
  { q: 'Who is responsible for paying Professional Tax?', a: 'For salaried employees, the employer deducts professional tax from salary and deposits it with the state government. Self-employed professionals and business owners must pay it directly. The employer must also register and pay their own professional tax.' },
  { q: 'What happens if Professional Tax is not paid?', a: 'Non-payment or late payment of professional tax attracts penalties. Employers who fail to deduct or deposit PT may face fines. The exact penalty varies by state but typically ranges from 1-2% per month of the unpaid amount.' },
]

const STEPS = [
  'Enter your monthly gross salary or professional income.',
  'Select the state where you are employed or practice your profession.',
  'The calculator applies state-specific slab rates to determine your monthly professional tax.',
  'Some states (like Maharashtra) have a different rate for February — the last month of the financial year.',
  'Professional tax is deductible from income tax under Section 16(iii). Maximum ₹2,500 per year.',
]

export default function ProfessionalTaxCalculator() {
  const [form, setForm] = useState({ monthlySalary: '', state: 'maharashtra' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateProfessionalTax(
      Number(form.monthlySalary) || 0,
      form.state,
    )
    setResult(r)
  }

  const shareText = result ? `Professional Tax (${result.stateLabel})\nMonthly Salary: ${formatINR(result.monthlySalary)}\nMonthly Tax: ${formatINR(result.monthlyTax)}\nAnnual Tax: ${formatINR(result.annualTax)}\n\ntax.doaide.com/professional-tax-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Professional Tax Calculator - State-wise Rates India | DoAide TaxFile"
        description="Calculate professional tax for all Indian states. State-wise slab rates for Maharashtra, Karnataka, West Bengal, Tamil Nadu, and more."
        keywords="professional tax calculator, state wise professional tax India, PT calculator, professional tax slab rates"
        canonical="https://tax.doaide.com/professional-tax-calculator"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Salary & Employment' }, { label: 'Professional Tax' }]} />

      <h1 style={s.title}>Professional Tax Calculator</h1>
      <p style={s.subtitle}>State-wise professional tax rates — calculate your monthly and annual PT</p>

      <HowItWorks steps={STEPS} />

      <div style={s.form}>
        <InputField label="Monthly Salary / Income" value={form.monthlySalary} onChange={set('monthlySalary')} currency />
        <InputField label="State" type="select" value={form.state} onChange={set('state')} options={PROFESSIONAL_TAX_STATES} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Professional Tax</button>

      {result && (
        <ResultCard title={`Professional Tax — ${result.stateLabel}`} gold>
          <div style={s.row}><span style={s.rowLabel}>Monthly Salary</span><span style={s.rowValue}>{formatINR(result.monthlySalary)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Monthly Tax (Apr-Jan)</span><span style={s.rowValue}>{formatINR(result.monthlyTax)}</span></div>
          {result.februaryTax !== result.monthlyTax && (
            <div style={s.row}><span style={s.rowLabel}>February Tax</span><span style={s.rowValue}>{formatINR(result.februaryTax)}</span></div>
          )}
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Annual Professional Tax</span>
            <span style={s.highlight}>{formatINR(result.annualTax)}</span>
          </div>

          <div style={{ ...s.info, marginTop: 16 }}>
            Professional tax is deductible under Section 16(iii) of the Income Tax Act. Maximum allowed: {formatINR(result.maxAllowed)}/year.
            {result.annualTax === 0 && ` ${result.stateLabel} does not levy professional tax.`}
          </div>

          <div style={s.sectionLabel}>{result.stateLabel} — Professional Tax Slabs</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Monthly Salary Range</th>
                  <th style={s.th}>Monthly Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.slabs.map((slab, i) => (
                  <tr key={i}>
                    <td style={s.td}>{slab.range}</td>
                    <td style={s.td}>{formatINR(slab.monthly)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <WhatsAppShare text={shareText} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
