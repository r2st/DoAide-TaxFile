import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import HowItWorks from '../components/HowItWorks'
import { calculateEPF, formatINR } from '../lib/taxEngine'

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
}

const FAQS = [
  { q: 'How is EPF contribution calculated?', a: 'Employee contributes 12% of basic salary to EPF. Employer also contributes 12%, but this is split: 8.33% goes to Employee Pension Scheme (EPS, capped at ₹15,000 basic) and the rest (3.67%) goes to EPF. Both employee and employer EPF portions earn interest.' },
  { q: 'What is the current EPF interest rate?', a: 'The EPF interest rate for FY 2026-27 is 8.25% per annum. The rate is declared by EPFO annually. Interest is calculated monthly but credited at year-end. EPF interest is tax-free up to ₹2.5 lakh annual contribution.' },
  { q: 'Can I withdraw EPF before retirement?', a: 'Partial withdrawal is allowed for specific purposes: home purchase (after 5 years), medical emergency, marriage, education, and during unemployment (after 2 months). Full withdrawal is allowed at age 58 or after 2 months of leaving employment.' },
  { q: 'Is EPF contribution eligible for 80C?', a: 'Yes, employee EPF contribution qualifies for Section 80C deduction up to ₹1,50,000. Employer contribution is exempt under Section 10. The interest earned and maturity amount are also tax-free if the account has been active for 5+ years.' },
  { q: 'What happens to EPF when I change jobs?', a: 'You can transfer your EPF balance to the new employer using the UAN (Universal Account Number). The UAN remains the same across employers. Transfer can be done online through the EPFO member portal.' },
]

const STEPS = [
  'Enter your annual basic salary — EPF is calculated as a percentage of basic + dearness allowance.',
  'Employee contributes 12% of basic to EPF. Employer also contributes 12%, split into EPF (3.67%) and EPS (8.33%).',
  'The calculator projects your retirement corpus at the current 8.25% interest rate.',
  'Interest compounds monthly. Your EPF balance grows through contributions and compound interest.',
  'Employee contribution qualifies for Section 80C deduction. Maturity is tax-free after 5 years.',
]

export default function EPFCalculator() {
  const [form, setForm] = useState({
    basicSalary: '', employeeRate: '12', employerRate: '12',
    currentBalance: '', yearsToRetire: '30', interestRate: '8.25',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateEPF(
      Number(form.basicSalary) || 0,
      Number(form.employeeRate) || 12,
      Number(form.employerRate) || 12,
      Number(form.currentBalance) || 0,
      Number(form.yearsToRetire) || 30,
      Number(form.interestRate) || 8.25,
    )
    setResult(r)
  }

  const shareText = result ? `EPF Retirement Corpus: ${formatINR(result.maturityAmount)}\nMonthly Contribution: ${formatINR(result.totalMonthlyContribution)}\nInterest Earned: ${formatINR(result.totalInterest)}\n\ntax.doaide.com/epf-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="EPF Calculator - Employee Provident Fund Returns | DoAide TaxFile"
        description="Calculate your EPF retirement corpus with employer contribution split, EPS pension, and year-by-year projection at 8.25% interest rate."
        keywords="EPF calculator, employee provident fund calculator, EPF interest rate, PF calculator, EPF maturity calculator"
        canonical="https://tax.doaide.com/epf-calculator"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Salary & Employment' }, { label: 'EPF Calculator' }]} />

      <h1 style={s.title}>EPF Calculator</h1>
      <p style={s.subtitle}>Employee Provident Fund — Retirement corpus projection at 8.25% p.a.</p>

      <HowItWorks steps={STEPS} />

      <div style={s.form}>
        <InputField label="Annual Basic Salary" value={form.basicSalary} onChange={set('basicSalary')} currency />
        <InputField label="Employee Contribution (%)" type="number" value={form.employeeRate} onChange={set('employeeRate')} placeholder="12" />
        <InputField label="Employer Contribution (%)" type="number" value={form.employerRate} onChange={set('employerRate')} placeholder="12" />
        <InputField label="Current EPF Balance" value={form.currentBalance} onChange={set('currentBalance')} currency hint="Optional" />
        <InputField label="Years to Retirement" type="number" value={form.yearsToRetire} onChange={set('yearsToRetire')} placeholder="30" />
        <InputField label="Interest Rate (%)" type="number" value={form.interestRate} onChange={set('interestRate')} placeholder="8.25" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate EPF</button>

      {result && (
        <ResultCard title="EPF Projection" gold>
          <div style={s.sectionLabel}>Monthly Contribution Breakdown</div>
          <div style={s.row}><span style={s.rowLabel}>Employee EPF (per month)</span><span style={s.rowValue}>{formatINR(result.employeeMonthly)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Employer EPF (per month)</span><span style={s.rowValue}>{formatINR(result.employerEPFMonthly)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Employer Pension / EPS (per month)</span><span style={s.rowValue}>{formatINR(result.employerPensionMonthly)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Monthly to EPF</span><span style={{ ...s.rowValue, fontWeight: 600 }}>{formatINR(result.totalMonthlyContribution)}</span></div>

          <div style={s.sectionLabel}>Corpus Summary</div>
          <div style={s.row}><span style={s.rowLabel}>Annual EPF Contribution</span><span style={s.rowValue}>{formatINR(result.annualContribution)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Contributed</span><span style={s.rowValue}>{formatINR(result.totalContributed)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Total Interest Earned</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.totalInterest)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Tax Benefit 80C (per year)</span><span style={s.rowValue}>{formatINR(Math.round(result.taxBenefit80C * 0.312))}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Retirement Corpus</span>
            <span style={s.highlight}>{formatINR(result.maturityAmount)}</span>
          </div>

          <div style={s.sectionLabel}>Year-by-Year Growth</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Year</th>
                  <th style={s.th}>Contribution</th>
                  <th style={s.th}>Interest</th>
                  <th style={s.th}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map(row => (
                  <tr key={row.year}>
                    <td style={s.td}>{row.year}</td>
                    <td style={s.td}>{formatINR(row.contribution)}</td>
                    <td style={s.td}>{formatINR(row.interest)}</td>
                    <td style={{ ...s.td, fontWeight: 600 }}>{formatINR(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
