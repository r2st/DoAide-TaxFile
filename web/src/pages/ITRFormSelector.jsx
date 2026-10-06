import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { selectITRForm, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 700, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  btn: {
    marginTop: 24, padding: '12px 32px', background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    border: 'none', borderRadius: 'var(--doaide-radius-md)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  resultForm: {
    fontFamily: 'var(--doaide-font-display)', fontSize: 48, color: 'var(--doaide-gold)', marginBottom: 4,
  },
  resultName: { fontSize: 18, fontWeight: 600, marginBottom: 12 },
  resultReason: { fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.6, marginBottom: 16 },
  deadline: {
    display: 'inline-block', padding: '8px 16px', background: 'var(--doaide-gold-bg)',
    borderRadius: 'var(--doaide-radius-md)', fontSize: 14, color: 'var(--doaide-gold)', fontWeight: 500,
  },
}

const FAQS = [
  { q: 'What is ITR-1 (Sahaj)?', a: 'ITR-1 is for resident individuals with total income up to ₹50 lakh from salary, one house property, and other sources (interest, etc.). You cannot use ITR-1 if you have capital gains, foreign assets, or more than 2 house properties.' },
  { q: 'When should I file ITR-2?', a: 'File ITR-2 if you have capital gains (shares, mutual funds, property), foreign assets or income, crypto/VDA income, income above ₹50 lakh, or are a director in a company.' },
  { q: 'What is presumptive taxation (ITR-4)?', a: 'Under Sections 44AD, 44ADA, and 44AE, small businesses and professionals can declare income at a prescribed rate (6-8% of turnover for business, 50% for professionals) without maintaining detailed books. ITR-4 is for this scheme, with total income up to ₹50 lakh.' },
  { q: 'What if I miss the filing deadline?', a: 'Late filing attracts a penalty of ₹5,000 under Section 234F (₹1,000 if income is below ₹5 lakh). You also lose the ability to carry forward certain losses. Interest under Sections 234A, 234B, and 234C may also apply.' },
]

export default function ITRFormSelector() {
  const [form, setForm] = useState({
    hasSalary: true, hasBusinessIncome: false, hasCapitalGains: false,
    hasForeignAssets: false, hasCryptoIncome: false, totalIncome: '',
    houseProperties: 1, isPresumptiveTax: false, isDirector: false, hasUnlistedShares: false,
  })
  const [result, setResult] = useState(null)

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const find = () => {
    const r = selectITRForm({
      ...form,
      totalIncome: Number(form.totalIncome) || 0,
    })
    setResult(r)
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="ITR Form Selector - Which ITR Form to File? | DoAide TaxFile"
        description="Find the right ITR form for your income. Answer simple questions to get ITR-1, ITR-2, ITR-3, or ITR-4 recommendation for FY 2026-27."
        keywords="ITR form selector, which ITR form to file, ITR-1 ITR-2 ITR-3 ITR-4"
        canonical="https://tax.doaide.com/itr-form-selector"
        faqs={FAQS}
      />

      <h1 style={s.title}>ITR Form Selector</h1>
      <p style={s.subtitle}>Answer a few questions to find the right ITR form</p>

      <div style={s.form}>
        <InputField label="Total Annual Income" value={form.totalIncome} onChange={set('totalIncome')} currency />
        <InputField label="Number of House Properties" type="number" value={form.houseProperties} onChange={set('houseProperties')} />
        <InputField label="I have salary income" type="checkbox" value={form.hasSalary} onChange={set('hasSalary')} />
        <InputField label="I have business or professional income" type="checkbox" value={form.hasBusinessIncome} onChange={set('hasBusinessIncome')} />
        {form.hasBusinessIncome && (
          <InputField label="I use presumptive taxation (44AD/44ADA/44AE)" type="checkbox" value={form.isPresumptiveTax} onChange={set('isPresumptiveTax')} />
        )}
        <InputField label="I have capital gains (shares, mutual funds, property)" type="checkbox" value={form.hasCapitalGains} onChange={set('hasCapitalGains')} />
        <InputField label="I have foreign assets or foreign income" type="checkbox" value={form.hasForeignAssets} onChange={set('hasForeignAssets')} />
        <InputField label="I have crypto/VDA income" type="checkbox" value={form.hasCryptoIncome} onChange={set('hasCryptoIncome')} />
        <InputField label="I am a director in a company" type="checkbox" value={form.isDirector} onChange={set('isDirector')} />
        <InputField label="I hold unlisted equity shares" type="checkbox" value={form.hasUnlistedShares} onChange={set('hasUnlistedShares')} />
      </div>

      <button style={s.btn} onClick={find}>Find My ITR Form</button>

      {result && (
        <ResultCard gold>
          <div style={s.resultForm}>{result.form}</div>
          <div style={s.resultName}>{result.name}</div>
          <div style={s.resultReason}>{result.reason}</div>
          <div style={s.deadline}>Filing Deadline: {result.deadline}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <WhatsAppShare text={`ITR Form: ${result.form} (${result.name})\n${result.reason}\nDeadline: ${result.deadline}\n\ntax.doaide.com/itr-form-selector`} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
