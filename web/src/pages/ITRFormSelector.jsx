import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { selectITRForm } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 700, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32, lineHeight: 1.6 },
  progress: { display: 'flex', gap: 4, marginBottom: 32 },
  progressDot: { flex: 1, height: 4, borderRadius: 2, transition: 'background 0.3s ease' },
  stepLabel: { fontSize: 12, color: 'var(--doaide-text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  question: { fontFamily: 'var(--doaide-font-display)', fontSize: 22, color: 'var(--doaide-text)', marginBottom: 20, lineHeight: 1.4 },
  hint: { fontSize: 13, color: 'var(--doaide-text-muted)', marginBottom: 20, lineHeight: 1.6 },
  optionsGrid: { display: 'grid', gap: 12 },
  option: {
    padding: '16px 20px', border: '2px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-md)',
    cursor: 'pointer', textAlign: 'left', background: 'var(--doaide-surface)', transition: 'all 0.2s ease',
    fontSize: 15, fontWeight: 500, color: 'var(--doaide-text)', display: 'flex', alignItems: 'center', gap: 12,
    minHeight: 44,
  },
  optionSelected: { borderColor: 'var(--doaide-gold)', background: 'var(--doaide-gold-bg)' },
  optionIcon: { fontSize: 20, flexShrink: 0, width: 28, textAlign: 'center' },
  optionLabel: { flex: 1 },
  optionDesc: { fontSize: 12, color: 'var(--doaide-text-muted)', fontWeight: 400, marginTop: 2 },
  navRow: { display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 12 },
  btn: {
    padding: '12px 28px', background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    border: 'none', borderRadius: 'var(--doaide-radius-md)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
    minHeight: 44,
  },
  btnBack: {
    padding: '12px 28px', background: 'transparent', color: 'var(--doaide-text-muted)',
    border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-md)', fontSize: 15,
    cursor: 'pointer', minHeight: 44,
  },
  resultForm: { fontFamily: 'var(--doaide-font-display)', fontSize: 48, color: 'var(--doaide-gold)', marginBottom: 4 },
  resultName: { fontSize: 18, fontWeight: 600, marginBottom: 12 },
  resultReason: { fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.6, marginBottom: 16 },
  deadline: {
    display: 'inline-block', padding: '8px 16px', background: 'var(--doaide-gold-bg)',
    borderRadius: 'var(--doaide-radius-md)', fontSize: 14, color: 'var(--doaide-gold)', fontWeight: 500,
  },
  restart: { marginTop: 24, padding: '10px 24px', background: 'transparent', border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-md)', fontSize: 14, cursor: 'pointer', color: 'var(--doaide-text-secondary)' },
  currencyWrap: { position: 'relative', marginTop: 4 },
  currencyPrefix: { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--doaide-font-mono)', fontSize: 16, color: 'var(--doaide-text-muted)' },
  input: {
    width: '100%', padding: '14px 14px 14px 32px', border: '2px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', fontSize: 16, fontFamily: 'var(--doaide-font-mono)',
    background: 'var(--doaide-surface)', color: 'var(--doaide-text)', boxSizing: 'border-box',
    minHeight: 44,
  },
}

const STEPS = [
  {
    key: 'incomeType',
    label: 'Step 1 of 6',
    question: 'What are your main sources of income?',
    hint: 'Select all that apply. This is the most important factor in choosing your ITR form.',
    multi: true,
    options: [
      { value: 'salary', icon: '💼', label: 'Salary / Pension', desc: 'Income from employer or pension fund' },
      { value: 'business', icon: '🏪', label: 'Business or Profession', desc: 'Freelancing, consulting, shop, trading business' },
      { value: 'capitalGains', icon: '📈', label: 'Capital Gains', desc: 'Shares, mutual funds, property sale, crypto' },
      { value: 'houseProperty', icon: '🏠', label: 'House Property', desc: 'Rental income or home loan interest' },
    ],
  },
  {
    key: 'totalIncome',
    label: 'Step 2 of 6',
    question: 'What is your approximate total annual income?',
    hint: 'Include all sources — salary, business, capital gains, rental income, interest, etc.',
    type: 'currency',
  },
  {
    key: 'specialCases',
    label: 'Step 3 of 6',
    question: 'Do any of these apply to you?',
    hint: 'Select all that apply. These affect which ITR form you need.',
    multi: true,
    options: [
      { value: 'foreignAssets', icon: '🌍', label: 'Foreign assets or income', desc: 'Bank accounts, property, or income outside India' },
      { value: 'crypto', icon: '🪙', label: 'Crypto / VDA income', desc: 'Bitcoin, Ethereum, NFTs, or other virtual digital assets' },
      { value: 'director', icon: '👔', label: 'Director in a company', desc: 'Director of any private or public company' },
      { value: 'unlistedShares', icon: '📄', label: 'Unlisted equity shares', desc: 'Holding shares of unlisted companies' },
    ],
  },
  {
    key: 'houseCount',
    label: 'Step 4 of 6',
    question: 'How many house properties do you own?',
    hint: 'Count self-occupied and rented properties. This can affect your ITR form choice.',
    options: [
      { value: '0', icon: '0️⃣', label: 'None' },
      { value: '1', icon: '1️⃣', label: '1 property' },
      { value: '2', icon: '2️⃣', label: '2 properties' },
      { value: '3plus', icon: '🏘️', label: '3 or more properties' },
    ],
  },
  {
    key: 'businessType',
    label: 'Step 5 of 6',
    question: 'Do you use presumptive taxation?',
    hint: 'Section 44AD (business, turnover ≤₹2-3Cr), 44ADA (professionals, receipts ≤₹50-75L), or 44AE (goods transport). This simplifies your return.',
    condition: (answers) => answers.incomeType?.includes('business'),
    options: [
      { value: 'presumptive', icon: '✅', label: 'Yes, I use presumptive taxation', desc: 'Sections 44AD, 44ADA, or 44AE' },
      { value: 'regular', icon: '📚', label: 'No, I maintain full books', desc: 'Regular accounting with P&L and balance sheet' },
      { value: 'unsure', icon: '❓', label: 'Not sure', desc: 'We\'ll recommend based on other answers' },
    ],
  },
  {
    key: 'confirm',
    label: 'Step 6 of 6',
    question: 'Ready to see your result?',
    hint: 'We\'ll recommend the right ITR form based on your answers.',
    type: 'confirm',
  },
]

const FAQS = [
  { q: 'What is ITR-1 (Sahaj)?', a: 'ITR-1 is for resident individuals with total income up to ₹50 lakh from salary, one house property, and other sources (interest, etc.). You cannot use ITR-1 if you have capital gains, foreign assets, or more than 2 house properties.' },
  { q: 'When should I file ITR-2?', a: 'File ITR-2 if you have capital gains (shares, mutual funds, property), foreign assets or income, crypto/VDA income, income above ₹50 lakh, or are a director in a company.' },
  { q: 'What is presumptive taxation (ITR-4)?', a: 'Under Sections 44AD, 44ADA, and 44AE, small businesses and professionals can declare income at a prescribed rate (6-8% of turnover for business, 50% for professionals) without maintaining detailed books. ITR-4 is for this scheme, with total income up to ₹50 lakh.' },
  { q: 'What if I miss the filing deadline?', a: 'Late filing attracts a penalty of ₹5,000 under Section 234F (₹1,000 if income is below ₹5 lakh). You also lose the ability to carry forward certain losses. Interest under Sections 234A, 234B, and 234C may also apply.' },
]

export default function ITRFormSelector() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({ incomeType: [], specialCases: [], totalIncome: '' })
  const [result, setResult] = useState(null)

  const activeSteps = STEPS.filter(s => !s.condition || s.condition(answers))
  const currentStep = activeSteps[step]
  const totalSteps = activeSteps.length

  const setMulti = (key, value) => {
    setAnswers(a => {
      const arr = a[key] || []
      return { ...a, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }
    })
  }

  const setSingle = (key, value) => setAnswers(a => ({ ...a, [key]: value }))

  const canProceed = () => {
    if (!currentStep) return false
    if (currentStep.type === 'currency') return Number(answers.totalIncome) > 0
    if (currentStep.type === 'confirm') return true
    if (currentStep.multi) return true
    return !!answers[currentStep.key]
  }

  const next = () => {
    if (step >= totalSteps - 1) {
      const incomeTypes = answers.incomeType || []
      const specials = answers.specialCases || []
      const totalIncome = Number(answers.totalIncome) || 0
      const houseCount = answers.houseCount === '3plus' ? 3 : Number(answers.houseCount || 0)
      const businessType = answers.businessType || 'unsure'

      const r = selectITRForm({
        hasSalary: incomeTypes.includes('salary'),
        hasBusinessIncome: incomeTypes.includes('business'),
        hasCapitalGains: incomeTypes.includes('capitalGains'),
        hasForeignAssets: specials.includes('foreignAssets'),
        hasCryptoIncome: specials.includes('crypto'),
        isDirector: specials.includes('director'),
        hasUnlistedShares: specials.includes('unlistedShares'),
        totalIncome,
        houseProperties: houseCount,
        isPresumptiveTax: businessType === 'presumptive',
      })
      setResult(r)
    } else {
      setStep(step + 1)
    }
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
  }

  const restart = () => {
    setStep(0)
    setAnswers({ incomeType: [], specialCases: [], totalIncome: '' })
    setResult(null)
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="Which ITR Form Do I Need? Free Wizard | DoAide TaxFile"
        description="Find the right ITR form in under 2 minutes. Answer 5-6 simple questions about your income sources and get a personalized ITR-1, ITR-2, ITR-3, or ITR-4 recommendation for FY 2026-27."
        keywords="which ITR form to file, ITR form selector, ITR-1 ITR-2 ITR-3 ITR-4, ITR form wizard, which ITR form"
        canonical="https://tax.doaide.com/itr-form-selector"
        faqs={FAQS}
      />

      <h1 style={s.title}>Which ITR Form Do I Need?</h1>
      <p style={s.subtitle}>
        Answer {totalSteps} simple questions to get your personalized ITR form recommendation. Takes under 2 minutes — no login required.
      </p>

      {!result ? (
        <>
          <div style={s.progress}>
            {activeSteps.map((_, i) => (
              <div key={i} style={{ ...s.progressDot, background: i <= step ? 'var(--doaide-gold)' : 'var(--doaide-border)' }} />
            ))}
          </div>

          <div style={s.stepLabel}>{currentStep.label}</div>
          <div style={s.question}>{currentStep.question}</div>
          {currentStep.hint && <div style={s.hint}>{currentStep.hint}</div>}

          {currentStep.type === 'currency' ? (
            <div style={s.currencyWrap}>
              <span style={s.currencyPrefix}>₹</span>
              <input
                type="number"
                style={s.input}
                value={answers.totalIncome}
                onChange={e => setSingle('totalIncome', e.target.value)}
                placeholder="e.g. 1200000"
                autoFocus
              />
            </div>
          ) : currentStep.type === 'confirm' ? (
            <div style={{ padding: 20, background: 'var(--doaide-surface)', borderRadius: 'var(--doaide-radius-lg)', border: '1px solid var(--doaide-border)' }}>
              <div style={{ fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.8 }}>
                <strong>Your answers:</strong>
                <br />Income sources: {(answers.incomeType || []).join(', ') || 'None selected'}
                <br />Total income: ₹{Number(answers.totalIncome || 0).toLocaleString('en-IN')}
                <br />Properties: {answers.houseCount === '3plus' ? '3+' : answers.houseCount || '0'}
                {answers.incomeType?.includes('business') && (
                  <><br />Business type: {answers.businessType === 'presumptive' ? 'Presumptive' : answers.businessType === 'regular' ? 'Regular books' : 'Not sure'}</>
                )}
                {(answers.specialCases || []).length > 0 && (
                  <><br />Special: {answers.specialCases.join(', ')}</>
                )}
              </div>
            </div>
          ) : (
            <div style={s.optionsGrid}>
              {currentStep.options.map(opt => {
                const selected = currentStep.multi
                  ? (answers[currentStep.key] || []).includes(opt.value)
                  : answers[currentStep.key] === opt.value
                return (
                  <button
                    key={opt.value}
                    style={{ ...s.option, ...(selected ? s.optionSelected : {}) }}
                    onClick={() => currentStep.multi ? setMulti(currentStep.key, opt.value) : setSingle(currentStep.key, opt.value)}
                  >
                    <span style={s.optionIcon}>{opt.icon}</span>
                    <span style={s.optionLabel}>
                      {opt.label}
                      {opt.desc && <div style={s.optionDesc}>{opt.desc}</div>}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          <div style={s.navRow}>
            {step > 0 ? (
              <button style={s.btnBack} onClick={back}>← Back</button>
            ) : <span />}
            <button
              style={{ ...s.btn, opacity: canProceed() ? 1 : 0.5 }}
              onClick={next}
              disabled={!canProceed()}
            >
              {step >= totalSteps - 1 ? 'Show My ITR Form →' : 'Next →'}
            </button>
          </div>
        </>
      ) : (
        <>
          <ResultCard gold>
            <div style={s.resultForm}>{result.form}</div>
            <div style={s.resultName}>{result.name}</div>
            <div style={s.resultReason}>{result.reason}</div>
            <div style={s.deadline}>Filing Deadline: {result.deadline}</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
              <ShareButtons text={`ITR Form: ${result.form} (${result.name})\n${result.reason}\nDeadline: ${result.deadline}\n\ntax.doaide.com/itr-form-selector`} />
              <PrintButton />
            </div>
          </ResultCard>
          <button style={s.restart} onClick={restart}>← Start Over</button>
        </>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
