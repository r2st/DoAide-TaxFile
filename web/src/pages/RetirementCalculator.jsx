import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateRetirement, formatINR } from '../lib/taxEngine'

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
  corpusBox: { marginTop: 20, padding: 20, textAlign: 'center', borderRadius: 12, background: 'var(--doaide-gold-alpha, rgba(200,170,80,0.08))', border: '1px solid var(--doaide-gold)' },
  corpusValue: { fontSize: 28, fontWeight: 700, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-gold)' },
  corpusLabel: { fontSize: 13, color: 'var(--doaide-text-secondary)', marginTop: 4 },
  sipBox: { marginTop: 12, padding: 16, textAlign: 'center', borderRadius: 12, background: 'var(--doaide-success-bg, rgba(40,167,69,0.08))', border: '1px solid var(--doaide-success)' },
  sipValue: { fontSize: 24, fontWeight: 700, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-success)' },
  sipLabel: { fontSize: 13, color: 'var(--doaide-text-secondary)', marginTop: 4 },
}

const FAQS = [
  { q: 'How much money do I need to retire in India?', a: 'It depends on your lifestyle and expenses. A common rule: multiply your annual expenses at retirement by 25-30. If you expect ₹1 lakh/month expenses at 60, you need roughly ₹3-3.6 crore as a retirement corpus.' },
  { q: 'What is the right age to start retirement planning?', a: 'The earlier the better. Starting at 25 vs 35 can mean needing 2-3x less monthly SIP due to compounding. Even small amounts from age 25 grow significantly over 35 years.' },
  { q: 'How does inflation affect retirement planning?', a: 'At 6% inflation, ₹50,000/month today becomes ₹1.6 lakh/month in 20 years. Your retirement corpus must account for this inflation. This calculator factors in inflation to give you a realistic corpus requirement.' },
  { q: 'Where should I invest for retirement?', a: 'A mix of EPF, PPF, NPS, equity mutual funds (SIP), and some debt/FD for stability. Younger investors should allocate more to equity (70-80%) and gradually shift to debt as retirement nears.' },
]

export default function RetirementCalculator() {
  const [form, setForm] = useState({ currentAge: '30', retirementAge: '60', lifeExpectancy: '85', monthlyExpenses: '', inflationRate: '6', returnRate: '12', currentSavings: '0' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateRetirement(
      Number(form.currentAge) || 30, Number(form.retirementAge) || 60,
      Number(form.lifeExpectancy) || 85, Number(form.monthlyExpenses) || 0,
      Number(form.inflationRate) || 6, Number(form.returnRate) || 12,
      Number(form.currentSavings) || 0,
    )
    setResult(r)
  }

  const shareText = result ? `Retirement Plan\nRetire at: ${result.retirementAge}\nMonthly expenses at retirement: ${formatINR(result.monthlyExpenseAtRetirement)}\nCorpus needed: ${formatINR(result.corpusNeeded)}\nMonthly SIP needed: ${formatINR(result.monthlySIPNeeded)}\n\ntax.doaide.com/retirement-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Retirement Calculator India - Plan Your Retirement Corpus | DoAide TaxFile"
        description="Free retirement calculator for India. Calculate how much corpus you need to retire comfortably. Factors in inflation, current savings, and expected returns."
        keywords="retirement calculator India, retirement planning calculator, retirement corpus calculator, pension calculator, how much to save for retirement"
        canonical="https://tax.doaide.com/retirement-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Retirement Calculator</h1>
      <p style={s.subtitle}>Plan how much you need to retire comfortably</p>

      <div style={s.form}>
        <InputField label="Current Age" type="number" value={form.currentAge} onChange={set('currentAge')} placeholder="30" />
        <InputField label="Retirement Age" type="number" value={form.retirementAge} onChange={set('retirementAge')} placeholder="60" />
        <InputField label="Life Expectancy" type="number" value={form.lifeExpectancy} onChange={set('lifeExpectancy')} placeholder="85" />
        <InputField label="Current Monthly Expenses" value={form.monthlyExpenses} onChange={set('monthlyExpenses')} currency />
        <InputField label="Expected Inflation (%)" type="number" value={form.inflationRate} onChange={set('inflationRate')} placeholder="6" />
        <InputField label="Expected Return on Investment (%)" type="number" value={form.returnRate} onChange={set('returnRate')} placeholder="12" />
        <InputField label="Current Retirement Savings" value={form.currentSavings} onChange={set('currentSavings')} currency hint="EPF + PPF + NPS + MF etc." />
      </div>

      <button style={s.btn} onClick={calculate}>Plan My Retirement</button>

      {result && (
        <ResultCard title="Retirement Plan" gold>
          <div style={s.corpusBox}>
            <div style={s.corpusValue}>{formatINR(result.corpusNeeded)}</div>
            <div style={s.corpusLabel}>Retirement Corpus Needed</div>
          </div>

          {result.monthlySIPNeeded > 0 && (
            <div style={s.sipBox}>
              <div style={s.sipValue}>{formatINR(result.monthlySIPNeeded)}/month</div>
              <div style={s.sipLabel}>Start investing this much to reach your goal</div>
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <div style={s.row}><span style={s.rowLabel}>Years to Retirement</span><span style={s.rowValue}>{result.yearsToRetire} years</span></div>
            <div style={s.row}><span style={s.rowLabel}>Years in Retirement</span><span style={s.rowValue}>{result.yearsInRetirement} years</span></div>
            <div style={s.row}><span style={s.rowLabel}>Monthly Expense at Retirement</span><span style={{ ...s.rowValue, color: 'var(--doaide-gold)' }}>{formatINR(result.monthlyExpenseAtRetirement)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Current Savings (Future Value)</span><span style={s.rowValue}>{formatINR(result.currentSavingsFV)}</span></div>
            <div style={{ ...s.row, borderBottom: 'none' }}><span style={s.rowLabel}>Remaining Gap</span><span style={{ ...s.rowValue, color: result.gap > 0 ? 'var(--doaide-error, #dc3545)' : 'var(--doaide-success)' }}>{formatINR(result.gap)}</span></div>
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
