import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import HowItWorks from '../components/HowItWorks'
import { calculateNewRegime, calculateOldRegime, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 900, margin: '0 auto' },
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
  textarea: {
    width: '100%', minHeight: 180, background: 'var(--doaide-bg-alt)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', padding: '12px', color: 'var(--doaide-text)',
    fontSize: 13, fontFamily: 'var(--doaide-font-mono)', resize: 'vertical', outline: 'none',
  },
  parseBtn: {
    marginTop: 12, padding: '8px 20px', background: 'var(--doaide-surface)', color: 'var(--doaide-gold)',
    border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-md)', fontSize: 13,
    fontWeight: 600, cursor: 'pointer',
  },
  section: { marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--doaide-border)' },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 12 },
  explanation: {
    background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', padding: 20, marginTop: 12,
  },
  explainItem: {
    padding: '12px 0', borderBottom: '1px solid var(--doaide-border)',
  },
  explainTitle: { fontSize: 15, fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 4 },
  explainDesc: { fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.6 },
  explainAmount: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 600, color: 'var(--doaide-gold)' },
}

const FAQS = [
  { q: 'What is Form 16 and why do I need it?', a: 'Form 16 is a TDS certificate issued by your employer showing your salary, deductions, and tax deducted. Part A shows TDS details. Part B shows a detailed salary breakup. You need it for filing your Income Tax Return.' },
  { q: 'How do I get the text from my Form 16 PDF?', a: 'Open your Form 16 PDF, press Ctrl+A (or Cmd+A on Mac) to select all text, then Ctrl+C to copy. Paste it in the text area above. The tool will try to extract key figures automatically.' },
  { q: 'What if the auto-extraction misses some values?', a: 'The auto-extraction uses pattern matching which may not work with all Form 16 formats. You can manually enter or correct values in the fields below the text area. The analysis uses whatever values are in the fields.' },
  { q: 'What does the plain-English breakdown show?', a: 'The breakdown translates your Form 16 numbers into simple explanations: what your employer paid you, what tax deductions you claimed, how much tax was calculated, and whether you\'re owed a refund or need to pay more.' },
  { q: 'Can this tool file my ITR?', a: 'No, this tool only analyzes and explains your Form 16 data. To file your ITR, visit incometax.gov.in. Use our ITR Form Selector to find the right form, then use this analysis to verify your return.' },
]

const STEPS = [
  'Download your Form 16 PDF from your employer or HR portal.',
  'Open the PDF, select all text (Ctrl+A), and copy it (Ctrl+C).',
  'Paste the text in the box below — the tool will extract key numbers automatically.',
  'Review and correct any extracted values in the fields below.',
  'Click "Decode Form 16" to get a plain-English breakdown of your tax situation.',
]

function parseForm16Text(text) {
  const extract = (patterns) => {
    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        const numStr = match[1].replace(/,/g, '')
        const num = parseFloat(numStr)
        if (!isNaN(num) && num > 0) return num
      }
    }
    return 0
  }

  return {
    grossSalary: extract([
      /gross\s*(?:total\s*)?salary[^0-9]*?(\d[\d,]*\.?\d*)/i,
      /total\s*salary[^0-9]*?(\d[\d,]*\.?\d*)/i,
      /income\s*(?:under|from)\s*(?:the\s*)?head\s*(?:"|")?salaries?(?:"|")?[^0-9]*?(\d[\d,]*\.?\d*)/i,
    ]),
    section80C: extract([
      /(?:80C|80\s*C)[^0-9]*?(\d[\d,]*\.?\d*)/i,
      /deduction.*?80C[^0-9]*?(\d[\d,]*\.?\d*)/i,
    ]),
    section80D: extract([
      /(?:80D|80\s*D)[^0-9]*?(\d[\d,]*\.?\d*)/i,
    ]),
    tdsDeducted: extract([
      /tax\s*(?:deducted|paid)[^0-9]*?(\d[\d,]*\.?\d*)/i,
      /total\s*tax\s*(?:deducted|deposited)[^0-9]*?(\d[\d,]*\.?\d*)/i,
      /TDS[^0-9]*?(\d[\d,]*\.?\d*)/i,
    ]),
    otherDeductions: extract([
      /other\s*deduction[^0-9]*?(\d[\d,]*\.?\d*)/i,
    ]),
  }
}

export default function Form16Decoder() {
  const [rawText, setRawText] = useState('')
  const [form, setForm] = useState({
    grossSalary: '', section80C: '', section80D: '', tdsDeducted: '', otherDeductions: '',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const handleParse = () => {
    if (!rawText.trim()) return
    const parsed = parseForm16Text(rawText)
    setForm({
      grossSalary: parsed.grossSalary || '',
      section80C: parsed.section80C || '',
      section80D: parsed.section80D || '',
      tdsDeducted: parsed.tdsDeducted || '',
      otherDeductions: parsed.otherDeductions || '',
    })
  }

  const decode = () => {
    const gross = Number(form.grossSalary) || 0
    if (gross <= 0) return

    const newR = calculateNewRegime(gross)
    const oldR = calculateOldRegime(gross, {
      section80C: Number(form.section80C) || 0,
      section80D: Number(form.section80D) || 0,
      other: Number(form.otherDeductions) || 0,
    })

    const tds = Number(form.tdsDeducted) || 0
    const recommended = newR.totalTax <= oldR.totalTax ? 'new' : 'old'
    const bestTax = Math.min(newR.totalTax, oldR.totalTax)
    const refund = Math.max(tds - bestTax, 0)
    const due = Math.max(bestTax - tds, 0)

    setResult({
      gross, newRegime: newR, oldRegime: oldR, recommended, bestTax,
      tds, refund, due,
      section80C: Number(form.section80C) || 0,
      section80D: Number(form.section80D) || 0,
      otherDeductions: Number(form.otherDeductions) || 0,
    })
  }

  const shareText = result ? `Form 16 Decoded\nGross Salary: ${formatINR(result.gross)}\nBest Regime: ${result.recommended === 'new' ? 'New' : 'Old'}\nTax: ${formatINR(result.bestTax)}\n${result.refund > 0 ? `Refund: ${formatINR(result.refund)}` : `Due: ${formatINR(result.due)}`}\n\ntax.doaide.com/form-16-decoder` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Form 16 Decoder - Plain English Tax Breakdown | DoAide TaxFile"
        description="Paste your Form 16 data and get a plain-English breakdown of your salary, deductions, tax calculation, and refund eligibility for FY 2026-27."
        keywords="Form 16 decoder, Form 16 explainer, understand Form 16, Form 16 plain English, tax breakdown"
        canonical="https://tax.doaide.com/form-16-decoder"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Income Tax' }, { label: 'Form 16 Decoder' }]} />

      <h1 style={s.title}>Form 16 Decoder</h1>
      <p style={s.subtitle}>Paste your Form 16 text — get a plain-English breakdown of your tax</p>

      <HowItWorks steps={STEPS} />

      <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--doaide-text-secondary)', display: 'block', marginBottom: 6 }}>
          Paste Form 16 Text (optional — or fill fields manually below)
        </label>
        <textarea
          style={s.textarea}
          value={rawText}
          onChange={e => setRawText(e.target.value)}
          placeholder="Copy all text from your Form 16 PDF and paste here..."
        />
        <button style={s.parseBtn} onClick={handleParse}>Extract Values from Text</button>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Key Values (review & correct if needed)</div>
        <div style={s.form}>
          <InputField label="Gross Salary" value={form.grossSalary} onChange={set('grossSalary')} currency />
          <InputField label="Section 80C Deductions" value={form.section80C} onChange={set('section80C')} currency hint="Max ₹1,50,000" />
          <InputField label="Section 80D (Health Insurance)" value={form.section80D} onChange={set('section80D')} currency />
          <InputField label="TDS Deducted" value={form.tdsDeducted} onChange={set('tdsDeducted')} currency hint="Total TDS by employer" />
          <InputField label="Other Deductions" value={form.otherDeductions} onChange={set('otherDeductions')} currency />
        </div>
      </div>

      <button style={s.btn} onClick={decode}>Decode Form 16</button>

      {result && (
        <>
          <ResultCard title="Plain English Breakdown" gold>
            <div style={s.explanation}>
              <div style={s.explainItem}>
                <div style={s.explainTitle}>Your Employer Paid You</div>
                <div style={s.explainDesc}>
                  Your total gross salary for FY 2026-27 is <span style={s.explainAmount}>{formatINR(result.gross)}</span>.
                  This includes your basic salary, HRA, special allowances, and all other components before any deductions.
                </div>
              </div>

              <div style={s.explainItem}>
                <div style={s.explainTitle}>Tax Deductions You Claimed</div>
                <div style={s.explainDesc}>
                  {result.section80C > 0 && <span>Section 80C: {formatINR(result.section80C)} (investments in PPF, ELSS, EPF, LIC, etc.)<br /></span>}
                  {result.section80D > 0 && <span>Section 80D: {formatINR(result.section80D)} (health insurance premiums)<br /></span>}
                  {result.otherDeductions > 0 && <span>Other deductions: {formatINR(result.otherDeductions)}<br /></span>}
                  {result.section80C === 0 && result.section80D === 0 && result.otherDeductions === 0 && (
                    <span>No deductions claimed under the old regime. The new regime offers only a standard deduction of ₹75,000.</span>
                  )}
                </div>
              </div>

              <div style={s.explainItem}>
                <div style={s.explainTitle}>Tax Calculated</div>
                <div style={s.explainDesc}>
                  <strong>New Regime:</strong> Taxable income {formatINR(result.newRegime.taxableIncome)} → Tax {formatINR(result.newRegime.totalTax)}<br />
                  <strong>Old Regime:</strong> Taxable income {formatINR(result.oldRegime.taxableIncome)} → Tax {formatINR(result.oldRegime.totalTax)}<br />
                  <span style={{ color: 'var(--doaide-gold)', fontWeight: 600 }}>
                    The {result.recommended === 'new' ? 'New' : 'Old'} Regime saves you {formatINR(Math.abs(result.newRegime.totalTax - result.oldRegime.totalTax))} more.
                  </span>
                </div>
              </div>

              <div style={s.explainItem}>
                <div style={s.explainTitle}>Tax Already Paid (TDS)</div>
                <div style={s.explainDesc}>
                  Your employer deducted <span style={s.explainAmount}>{formatINR(result.tds)}</span> as TDS throughout the year and deposited it with the government on your behalf.
                </div>
              </div>

              <div style={{ ...s.explainItem, borderBottom: 'none' }}>
                <div style={s.explainTitle}>{result.refund > 0 ? 'You Are Owed a Refund' : 'Additional Tax Due'}</div>
                <div style={s.explainDesc}>
                  {result.refund > 0 ? (
                    <span>
                      Your employer deducted more TDS than your actual tax liability. You can claim a refund of{' '}
                      <span style={{ ...s.explainAmount, color: 'var(--doaide-success)' }}>{formatINR(result.refund)}</span>{' '}
                      by filing your ITR and e-verifying it. Refunds typically take 4-6 months.
                    </span>
                  ) : result.due > 0 ? (
                    <span>
                      Your TDS was less than your actual liability. You need to pay{' '}
                      <span style={{ ...s.explainAmount, color: 'var(--doaide-error)' }}>{formatINR(result.due)}</span>{' '}
                      as self-assessment tax before filing your ITR.
                    </span>
                  ) : (
                    <span>Your TDS exactly matches your tax liability. No refund or additional payment needed.</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
              <WhatsAppShare text={shareText} />
              <PrintButton />
            </div>
          </ResultCard>
        </>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
