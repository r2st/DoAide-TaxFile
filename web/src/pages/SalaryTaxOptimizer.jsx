import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateSalaryOptimizer, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 900, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  btn: {
    marginTop: 24, padding: '12px 32px', background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    border: 'none', borderRadius: 'var(--doaide-radius-md)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
  },
  sectionLabel: { fontSize: 12, fontWeight: 600, color: 'var(--doaide-gold)', marginTop: 16, marginBottom: 8, textTransform: 'uppercase' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 12, fontSize: 13 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600 },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  recommended: {
    background: 'var(--doaide-gold-bg)', borderLeft: '3px solid var(--doaide-gold)',
  },
  badge: {
    display: 'inline-block', fontSize: 10, fontWeight: 700, background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    padding: '2px 8px', borderRadius: 10, marginLeft: 8, verticalAlign: 'middle', fontFamily: 'var(--doaide-font-body)',
  },
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  row: {
    display: 'flex', justifyContent: 'space-between', padding: '10px 0',
    borderBottom: '1px solid var(--doaide-border)', fontSize: 14,
  },
  rowLabel: { color: 'var(--doaide-text-secondary)' },
  rowValue: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 500 },
  infoBox: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
}

const FAQS = [
  { q: 'How does salary structure affect tax?', a: 'A higher basic salary increases PF and gratuity (good for retirement) but also increases taxable income. Lower basic with more allowances like HRA, LTA, and food coupons can reduce tax under the old regime, though the new regime negates most of these benefits.' },
  { q: 'What is the optimal basic salary percentage?', a: 'It depends on your tax regime. Under the new regime (most common), basic at 40% is standard. Under the old regime, a lower basic (30%) with higher HRA and allowances may save more tax, provided you have rent receipts and claims.' },
  { q: 'What are food coupons and how do they save tax?', a: 'Food coupons (like Sodexo) up to ₹2,200/month (₹26,400/year) are exempt from tax. They\'re considered a perquisite and are not included in taxable income, saving up to ₹8,237 in tax at the highest slab.' },
  { q: 'Can I ask my employer to restructure my salary?', a: 'Yes, many employers allow salary restructuring within their policies. You can typically ask HR to adjust the ratio of basic, HRA, and special allowance. Changes usually take effect from the next financial year.' },
]

export default function SalaryTaxOptimizer() {
  const [form, setForm] = useState({ ctc: '' })
  const [result, setResult] = useState(null)

  const calculate = () => {
    const ctc = Number(form.ctc) || 0
    if (ctc <= 0) return
    setResult(calculateSalaryOptimizer(ctc))
  }

  const shareText = result ? `Salary Optimizer for ${formatINR(result.ctc)} CTC\nBest Structure: ${result.recommended}\nBest Monthly In-Hand: ${formatINR(result.bestMonthlyInHand)}\n\ntax.doaide.com/salary-tax-optimizer` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Salary Tax Optimizer - Optimal CTC Structure | DoAide TaxFile"
        description="Optimize your salary structure to maximize take-home pay. Compare 3 CTC breakups with different basic salary percentages."
        keywords="salary tax optimizer, CTC optimizer, salary structure optimization, optimal salary breakup, maximize take home salary"
        canonical="https://tax.doaide.com/salary-tax-optimizer"
        faqs={FAQS}
      />

      <h1 style={s.title}>Salary Tax Optimizer</h1>
      <p style={s.subtitle}>Find the optimal CTC structure to maximize your in-hand salary</p>

      <div style={s.form}>
        <InputField label="Annual CTC" value={form.ctc} onChange={(v) => setForm({ ctc: v })} currency />
      </div>

      <button style={s.btn} onClick={calculate}>Optimize Salary</button>

      {result && (
        <ResultCard title="Salary Structure Comparison" gold>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 0 }}>
            <span style={s.highlight}>Best: {result.recommended}</span>
            <span style={s.highlight}>{formatINR(result.bestMonthlyInHand)}/month</span>
          </div>

          <div style={s.sectionLabel}>Compare Structures</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Component</th>
                  {result.structures.map(str => (
                    <th key={str.label} style={s.th}>
                      {str.label}
                      {str.label === result.recommended && <span style={s.badge}>BEST</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Basic', 'basic'],
                  ['HRA', 'hra'],
                  ['Special Allowance', 'specialAllowance'],
                  ['LTA', 'lta'],
                  ['Food Coupons', 'foodCoupons'],
                  ['Employer PF', 'epfEmployer'],
                  ['Employer NPS (80CCD2)', 'nps80ccd2'],
                  ['Gratuity', 'gratuity'],
                  ['Gross Salary', 'grossSalary'],
                  ['Employee PF', 'epfEmployee'],
                  ['Estimated Tax (New)', 'estimatedTaxNew'],
                  ['Monthly In-Hand', 'monthlyInHandEstimate'],
                ].map(([label, key]) => (
                  <tr key={key} style={key === 'monthlyInHandEstimate' ? { background: 'var(--doaide-gold-bg)' } : {}}>
                    <td style={{ ...s.td, fontFamily: 'inherit', fontWeight: key === 'monthlyInHandEstimate' ? 700 : 400 }}>{label}</td>
                    {result.structures.map(str => (
                      <td key={str.label} style={{ ...s.td, fontWeight: key === 'monthlyInHandEstimate' ? 700 : 400, color: key === 'monthlyInHandEstimate' ? 'var(--doaide-gold)' : undefined }}>
                        {formatINR(str[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={s.infoBox}>
            <strong>Note:</strong> This optimizer shows the impact of different basic salary levels under the new tax regime.
            Under the old regime, additional deductions like HRA exemption, 80C, and 80D further affect the outcome.
            Discuss with your employer to restructure within their policies.
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <div style={{ marginTop: 40, maxWidth: 800 }}>
        <h2 style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 22, marginBottom: 16 }}>Worked Examples</h2>

        <div style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 }}>CTC ₹20L — 30% vs 40% vs 50% Basic</div>
          With 30% basic (₹6L): Higher HRA (₹3L), lower PF (₹21,600), more in-hand<br/>
          With 40% basic (₹8L): Standard HRA (₹4L), standard PF (₹21,600), balanced<br/>
          With 50% basic (₹10L): Lower HRA (₹5L), higher PF (₹21,600), more retirement savings<br/>
          New regime winner: <strong>30% Basic</strong> — saves ~₹12,000/year vs 50% basic<br/>
          Old regime: 30% basic + HRA exemption (if paying rent in metro) can save even more
        </div>

        <div style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 }}>CTC ₹12L — Maximizing take-home</div>
          30% basic (₹3.6L): Monthly in-hand ~₹82,500<br/>
          40% basic (₹4.8L): Monthly in-hand ~₹81,800<br/>
          50% basic (₹6L): Monthly in-hand ~₹81,100<br/>
          Difference: <strong>₹1,400/month</strong> (₹16,800/year) more with 30% basic<br/>
          Add food coupons (₹2,200/month): saves another ₹8,237/year in tax
        </div>

        <p style={{ fontSize: 14, color: 'var(--doaide-text-secondary)' }}>
          Read our detailed <a href="/guides/tax-on-salary" style={{ color: 'var(--doaide-gold)', textDecoration: 'none' }}>Income Tax on Salary Guide</a> for CTC breakdowns with complete worked examples.
        </p>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
