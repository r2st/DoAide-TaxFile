import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateTakeHomeSalary, formatINR } from '../lib/taxEngine'

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
  monthlyBox: {
    marginTop: 20, padding: 20, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    textAlign: 'center',
  },
  monthlyAmount: { fontSize: 36, fontWeight: 700, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-gold)' },
  monthlyLabel: { fontSize: 14, color: 'var(--doaide-text-secondary)', marginTop: 4 },
}

const FAQS = [
  { q: 'What is CTC and how is it different from in-hand salary?', a: 'CTC (Cost to Company) is the total cost your employer incurs, including salary, PF, gratuity, and benefits. Your in-hand salary is what you actually receive after deducting PF, professional tax, and income tax from the gross salary.' },
  { q: 'How is basic salary calculated from CTC?', a: 'Basic salary is typically 40-50% of CTC. A lower basic reduces PF and gratuity deductions but also reduces HRA and leave encashment. Most companies keep it at 40% for optimal balance.' },
  { q: 'What is included in employer PF contribution?', a: 'Employer contributes 12% of basic salary (up to ₹15,000/month or ₹1,80,000/year) to EPF. Of this, 8.33% goes to EPS (Employee Pension Scheme) and 3.67% to EPF. The employee also contributes an equal 12%.' },
  { q: 'Is professional tax the same across all states?', a: 'No, professional tax varies by state and is capped at ₹2,500 per year. Maharashtra, Karnataka, and West Bengal charge ₹2,400-₹2,500 annually. Some states like Delhi and Haryana do not levy professional tax.' },
]

export default function TakeHomeSalaryCalculator() {
  const [form, setForm] = useState({ ctc: '', cityType: 'non_metro' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const ctc = Number(form.ctc) || 0
    if (ctc <= 0) return
    setResult(calculateTakeHomeSalary(ctc, form.cityType === 'metro'))
  }

  const shareText = result ? `Take-Home Salary from ${formatINR(result.ctc)} CTC\nMonthly In-Hand: ${formatINR(result.monthlyInHand)}\nAnnual Take-Home: ${formatINR(result.annualTakeHome)}\n\ntax.doaide.com/take-home-salary-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Take-Home Salary Calculator - CTC to In-Hand | DoAide TaxFile"
        description="Calculate your in-hand salary from CTC. Breakup of basic, HRA, PF, gratuity, professional tax and income tax deductions for FY 2026-27."
        keywords="take home salary calculator, CTC to in-hand salary, salary calculator India, CTC breakup calculator"
        canonical="https://tax.doaide.com/take-home-salary-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Take-Home Salary Calculator</h1>
      <p style={s.subtitle}>CTC to In-Hand — See exactly what you take home each month</p>

      <div style={s.form}>
        <InputField label="Annual CTC" value={form.ctc} onChange={set('ctc')} currency />
        <InputField label="City Type" type="select" value={form.cityType} onChange={set('cityType')}
          options={[{ value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)' }, { value: 'non_metro', label: 'Non-Metro' }]} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Take-Home Salary</button>

      {result && (
        <ResultCard title="Salary Breakdown" gold>
          <div style={s.monthlyBox}>
            <div style={s.monthlyAmount}>{formatINR(result.monthlyInHand)}</div>
            <div style={s.monthlyLabel}>Monthly In-Hand (after tax)</div>
          </div>

          <div style={s.sectionLabel}>CTC Breakup</div>
          <div style={s.row}><span style={s.rowLabel}>Basic Salary</span><span style={s.rowValue}>{formatINR(result.basic)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>HRA</span><span style={s.rowValue}>{formatINR(result.hra)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Special Allowance</span><span style={s.rowValue}>{formatINR(result.specialAllowance)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Employer PF</span><span style={s.rowValue}>{formatINR(result.employerPF)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Gratuity</span><span style={s.rowValue}>{formatINR(result.gratuity)}</span></div>

          <div style={s.sectionLabel}>Deductions from Salary</div>
          <div style={s.row}><span style={s.rowLabel}>Employee PF</span><span style={s.rowValue}>-{formatINR(result.employeePF)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Professional Tax</span><span style={s.rowValue}>-{formatINR(result.professionalTax)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Estimated Income Tax (New Regime)</span><span style={s.rowValue}>-{formatINR(result.estimatedTax)}</span></div>

          <div style={s.sectionLabel}>Summary</div>
          <div style={s.row}><span style={s.rowLabel}>Annual Gross Salary</span><span style={s.rowValue}>{formatINR(result.grossSalary)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Annual Take-Home</span><span style={s.rowValue}>{formatINR(result.annualTakeHome)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Monthly In-Hand</span>
            <span style={s.highlight}>{formatINR(result.monthlyInHand)}</span>
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
