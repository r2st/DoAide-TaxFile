import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import FAQSection from '../components/FAQSection'
import { optimizeDeductions, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32, lineHeight: 1.6 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 },
  section: { marginTop: 32 },
  sectionTitle: { fontSize: 16, fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--doaide-border)' },
  btn: {
    marginTop: 24, padding: '14px 32px', background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    border: 'none', borderRadius: 'var(--doaide-radius-md)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
    width: '100%',
  },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 },
  summaryCard: { padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', textAlign: 'center' },
  summaryLabel: { fontSize: 12, color: 'var(--doaide-text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  summaryValue: { fontFamily: 'var(--doaide-font-mono)', fontSize: 20, fontWeight: 600 },
  suggestion: { padding: 16, border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 12 },
  suggestionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 },
  suggestionTitle: { fontWeight: 600, fontSize: 15 },
  badge: { fontSize: 12, padding: '2px 8px', borderRadius: 12, fontWeight: 500 },
  progressBar: { height: 6, background: 'var(--doaide-bg-alt)', borderRadius: 3, marginBottom: 8, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--doaide-gold)', borderRadius: 3, transition: 'width 0.3s ease' },
  optionsList: { paddingLeft: 20, margin: 0, fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.8 },
}

const FAQS = [
  { q: 'How can I save maximum tax under the old regime?', a: 'Maximize all available deductions: invest ₹1.5L in 80C (PPF, ELSS), get health insurance for 80D (₹25K self + ₹25K parents), contribute ₹50K to NPS (80CCD 1B), and claim HRA exemption if paying rent. Together these can save ₹1.5-2L+ in tax.' },
  { q: 'Should I choose old regime or new regime?', a: 'If your total deductions exceed ₹3-4 lakh, old regime usually saves more. If you have minimal deductions, new regime is better with its lower rates. Use our calculator above to compare with your actual numbers.' },
  { q: 'What is Section 80CCD(1B) for NPS?', a: 'Section 80CCD(1B) allows an additional deduction of ₹50,000 for NPS contributions, over and above the ₹1.5L limit under Section 80C. This can save up to ₹15,600 extra in tax at the 30% slab.' },
  { q: 'Can I claim both 80C and NPS deductions?', a: 'Yes! 80C covers up to ₹1.5L and NPS 80CCD(1B) provides an additional ₹50K deduction. You can claim both, for a total of ₹2L in deductions from these two sections alone.' },
  { q: 'How much tax can I save with health insurance?', a: 'Under Section 80D, you can deduct up to ₹25,000 for self/family health insurance (₹50,000 if senior citizen) and ₹25,000 for parents (₹50,000 if parents are senior citizens). Maximum possible deduction: ₹1,00,000.' },
]

export default function TaxSavingCalculator() {
  const [form, setForm] = useState({
    grossIncome: '', age: 30,
    section80C: '', section80D: '', section80DParents: '', parentsSenior: false,
    nps80CCD1B: '', hraExemption: '', homeLoanInterest: '',
    section80E: '', section80G: '',
  })
  const [result, setResult] = useState(null)

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const income = Number(form.grossIncome) || 0
    if (income <= 0) return
    const r = optimizeDeductions(income, form.age, {
      section80C: Number(form.section80C) || 0,
      section80D: Number(form.section80D) || 0,
      section80DParents: Number(form.section80DParents) || 0,
      parentsSenior: form.parentsSenior,
      nps80CCD1B: Number(form.nps80CCD1B) || 0,
      hraExemption: Number(form.hraExemption) || 0,
      homeLoanInterest: Number(form.homeLoanInterest) || 0,
      section80E: Number(form.section80E) || 0,
      section80G: Number(form.section80G) || 0,
    })
    setResult(r)
  }

  const priorityColor = (p) => p === 'high' ? 'var(--doaide-error)' : p === 'medium' ? 'var(--doaide-warning)' : 'var(--doaide-info)'
  const priorityBg = (p) => p === 'high' ? 'rgba(220,38,38,0.1)' : p === 'medium' ? 'rgba(217,119,6,0.1)' : 'rgba(37,99,235,0.1)'

  return (
    <div style={s.page}>
      <SEOHead
        title="Tax Saving Calculator — Optimize 80C, 80D, NPS, HRA Deductions | DoAide TaxFile"
        description="Calculate how much tax you can save with optimal 80C, 80D, NPS, HRA deductions. Personalized recommendations to minimize your tax for FY 2026-27."
        keywords="tax saving calculator India, 80C deduction calculator, 80D calculator, NPS tax benefit, maximize tax savings, tax deduction optimizer"
        canonical="https://tax.doaide.com/tax-saving-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Tax Saving Calculator</h1>
      <p style={s.subtitle}>
        Enter your income and current deductions to see exactly how much more you can save.
        Get personalized recommendations for 80C, 80D, NPS, and HRA optimization.
      </p>

      <div style={s.section}>
        <div style={s.sectionTitle}>Income Details</div>
        <div style={s.grid}>
          <InputField label="Gross Annual Income" value={form.grossIncome} onChange={set('grossIncome')} currency />
          <InputField label="Age" type="number" value={form.age} onChange={set('age')} />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Current Deductions (Enter what you already have)</div>
        <div style={s.grid}>
          <InputField label="Section 80C (PPF, ELSS, LIC, EPF...)" value={form.section80C} onChange={set('section80C')} currency hint="Max ₹1,50,000" />
          <InputField label="Section 80D — Self/Family" value={form.section80D} onChange={set('section80D')} currency hint={`Max ₹${form.age >= 60 ? '50,000' : '25,000'}`} />
          <InputField label="Section 80D — Parents" value={form.section80DParents} onChange={set('section80DParents')} currency hint="Max ₹25,000 (₹50,000 if senior)" />
          <InputField label="Parents are senior citizens (60+)" type="checkbox" value={form.parentsSenior} onChange={set('parentsSenior')} />
          <InputField label="NPS — 80CCD(1B)" value={form.nps80CCD1B} onChange={set('nps80CCD1B')} currency hint="Max ₹50,000 (additional)" />
          <InputField label="HRA Exemption" value={form.hraExemption} onChange={set('hraExemption')} currency hint="Use HRA Calculator for exact amount" />
          <InputField label="Home Loan Interest — Sec 24(b)" value={form.homeLoanInterest} onChange={set('homeLoanInterest')} currency hint="Max ₹2,00,000" />
          <InputField label="Education Loan Interest — Sec 80E" value={form.section80E} onChange={set('section80E')} currency hint="No upper limit" />
        </div>
      </div>

      <button style={s.btn} onClick={calculate}>Optimize My Tax Savings</button>

      {result && (
        <>
          <ResultCard gold style={{ marginTop: 32 }}>
            <div style={s.summaryGrid}>
              <div style={s.summaryCard}>
                <div style={s.summaryLabel}>Current Tax (Best Regime)</div>
                <div style={{ ...s.summaryValue, color: 'var(--doaide-text)' }}>
                  {formatINR(Math.min(result.currentTaxOld, result.currentTaxNew))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--doaide-text-muted)', marginTop: 2 }}>
                  {result.currentBetterRegime === 'old' ? 'Old Regime' : 'New Regime'}
                </div>
              </div>
              <div style={s.summaryCard}>
                <div style={s.summaryLabel}>After Optimization</div>
                <div style={{ ...s.summaryValue, color: 'var(--doaide-success)' }}>
                  {formatINR(Math.min(result.optimizedTaxOld, result.currentTaxNew))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--doaide-text-muted)', marginTop: 2 }}>
                  {result.optimizedBetterRegime === 'old' ? 'Old Regime' : 'New Regime'}
                </div>
              </div>
              <div style={s.summaryCard}>
                <div style={s.summaryLabel}>Additional Savings</div>
                <div style={{ ...s.summaryValue, color: 'var(--doaide-gold)' }}>
                  {formatINR(result.savingsVsCurrent)}
                </div>
                <div style={{ fontSize: 11, color: 'var(--doaide-text-muted)', marginTop: 2 }}>
                  More you can save
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 16px', background: 'var(--doaide-gold-bg)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 14, lineHeight: 1.6, color: 'var(--doaide-text-secondary)' }}>
              <strong style={{ color: 'var(--doaide-gold)' }}>Recommendation:</strong>{' '}
              {result.optimizedBetterRegime === 'new'
                ? `The New Regime is better for you even after maximizing deductions. You save ${formatINR(result.regimeSavings)} compared to the old regime.`
                : `The Old Regime saves you more — ${formatINR(result.regimeSavings)} less tax than the new regime. Maximize your deductions below.`}
            </div>
          </ResultCard>

          {result.suggestions.length > 0 && (
            <ResultCard title="Optimization Opportunities" style={{ marginTop: 16 }}>
              {result.suggestions.map((sug, i) => (
                <div key={i} style={s.suggestion}>
                  <div style={s.suggestionHeader}>
                    <span style={s.suggestionTitle}>{sug.section}</span>
                    <span style={{ ...s.badge, color: priorityColor(sug.priority), background: priorityBg(sug.priority) }}>
                      {sug.priority} priority
                    </span>
                  </div>
                  <div style={s.progressBar}>
                    <div style={{ ...s.progressFill, width: `${sug.max > 0 ? (sug.current / sug.max) * 100 : 0}%` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--doaide-text-secondary)', marginBottom: 8 }}>
                    <span>Used: {formatINR(sug.current)} / {formatINR(sug.max)}</span>
                    <span style={{ color: 'var(--doaide-gold)', fontWeight: 600 }}>Save {formatINR(sug.potentialSaving)}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--doaide-text-muted)', marginBottom: 4 }}>
                    Invest {formatINR(sug.remaining)} more to maximize:
                  </div>
                  <ul style={s.optionsList}>
                    {sug.options.map((opt, j) => <li key={j}>{opt}</li>)}
                  </ul>
                </div>
              ))}
            </ResultCard>
          )}

          <div style={{ marginTop: 16 }}>
            <ResultCard title="Tax Comparison">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)' }}>Scenario</th>
                      <th style={{ textAlign: 'right', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)' }}>Old Regime</th>
                      <th style={{ textAlign: 'right', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)' }}>New Regime</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' }}>Current deductions</td>
                      <td style={{ textAlign: 'right', padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' }}>{formatINR(result.currentTaxOld)}</td>
                      <td style={{ textAlign: 'right', padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' }}>{formatINR(result.currentTaxNew)}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' }}>After maximizing deductions</td>
                      <td style={{ textAlign: 'right', padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)', fontWeight: 600 }}>{formatINR(result.optimizedTaxOld)}</td>
                      <td style={{ textAlign: 'right', padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' }}>{formatINR(result.currentTaxNew)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ResultCard>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <ShareButtons text={`Tax Saving Analysis:\nCurrent tax: ${formatINR(Math.min(result.currentTaxOld, result.currentTaxNew))}\nAfter optimization: ${formatINR(Math.min(result.optimizedTaxOld, result.currentTaxNew))}\nPotential savings: ${formatINR(result.savingsVsCurrent)}\n\ntax.doaide.com/tax-saving-calculator`} />
          </div>
        </>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
