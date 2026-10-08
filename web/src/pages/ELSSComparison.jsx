import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import HowItWorks from '../components/HowItWorks'
import { compareELSSvsPPFvsFD, formatINR } from '../lib/taxEngine'

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
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginTop: 24 },
  card: {
    background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', padding: 20,
  },
  cardWinner: { borderColor: 'var(--doaide-gold-dim)', boxShadow: 'var(--doaide-shadow-gold)' },
  cardTitle: { fontFamily: 'var(--doaide-font-display)', fontSize: 20, marginBottom: 4 },
  badge: {
    display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px',
    borderRadius: 12, marginBottom: 12,
  },
  winBadge: { background: 'var(--doaide-gold-bg)', color: 'var(--doaide-gold)' },
  taxSaving: {
    background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', padding: '16px 20px', textAlign: 'center',
    fontSize: 16, color: 'var(--doaide-gold)', fontWeight: 600, marginTop: 24,
  },
}

const FAQS = [
  { q: 'What is ELSS and how does it compare to PPF and FD?', a: 'ELSS (Equity Linked Savings Scheme) is a mutual fund with a 3-year lock-in offering market-linked returns (~12% historically). PPF offers guaranteed 7.1% for 15 years. Tax-saver FD gives 6.5-7.5% for 5 years. All qualify for Section 80C deduction up to ₹1.5 lakh.' },
  { q: 'Which tax-saving investment gives the best after-tax returns?', a: 'ELSS typically gives the highest after-tax returns over long periods due to equity exposure, but carries market risk. PPF offers the best risk-adjusted tax-free returns. FD interest is fully taxable at your slab rate, making it the least tax-efficient for high earners.' },
  { q: 'How is ELSS taxed?', a: 'ELSS gains held for more than 1 year are taxed as LTCG at 12.5% on gains exceeding ₹1.25 lakh per year. Short-term gains (< 1 year, not applicable due to 3-year lock-in) would be taxed at 20%.' },
  { q: 'Is PPF really tax-free?', a: 'Yes, PPF has EEE (Exempt-Exempt-Exempt) status. The investment qualifies for 80C deduction, the interest earned is completely tax-free, and the maturity amount is also tax-free. This makes PPF\'s effective return higher than its stated rate for high-tax-bracket investors.' },
  { q: 'Can I invest in all three simultaneously?', a: 'Yes, you can invest in ELSS, PPF, and tax-saver FD simultaneously. All qualify for Section 80C, but the combined deduction is capped at ₹1.5 lakh. A diversified approach across all three balances risk and returns.' },
]

const STEPS = [
  'Enter the lumpsum investment amount you want to compare across ELSS, PPF, and Tax-Saver FD.',
  'Set the investment period — note PPF has a 15-year lock-in, ELSS has 3 years, and FD has 5 years.',
  'Select your tax slab to calculate the tax impact on FD interest and ELSS gains.',
  'The calculator computes pre-tax returns, applicable taxes, and after-tax returns for each option.',
  'Compare effective CAGR (after-tax) to find the best option for your risk profile and investment horizon.',
]

export default function ELSSComparison() {
  const [form, setForm] = useState({
    amount: '', years: '5', taxSlab: '0.312', fdRate: '7.0', elssReturn: '12', ppfRate: '7.1',
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = compareELSSvsPPFvsFD(
      Number(form.amount) || 0,
      Number(form.years) || 5,
      Number(form.taxSlab) || 0.312,
      Number(form.fdRate) || 7.0,
      Number(form.elssReturn) || 12,
      Number(form.ppfRate) || 7.1,
    )
    setResult(r)
  }

  const shareText = result ? `Tax Saving Investment Comparison (${result.years} years)\nBest Option: ${result.bestOption}\n${result.investments.map(i => `${i.name}: ${formatINR(i.afterTaxReturn)} (${i.effectiveReturn}% CAGR)`).join('\n')}\n\ntax.doaide.com/elss-vs-ppf-vs-fd` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="ELSS vs PPF vs FD Comparison - Tax Saving Investments | DoAide TaxFile"
        description="Compare ELSS, PPF, and Tax-Saver FD side by side. Calculate after-tax returns, effective CAGR, and find the best Section 80C investment for your tax bracket."
        keywords="ELSS vs PPF vs FD, tax saving investment comparison, Section 80C comparison, best tax saving investment India"
        canonical="https://tax.doaide.com/elss-vs-ppf-vs-fd"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Investment Calculators' }, { label: 'ELSS vs PPF vs FD' }]} />

      <h1 style={s.title}>ELSS vs PPF vs FD</h1>
      <p style={s.subtitle}>Compare after-tax returns of top Section 80C investments side by side</p>

      <HowItWorks steps={STEPS} />

      <div style={s.form}>
        <InputField label="Investment Amount" value={form.amount} onChange={set('amount')} currency />
        <InputField label="Investment Period (Years)" type="number" value={form.years} onChange={set('years')} placeholder="5" />
        <InputField label="Tax Slab" type="select" value={form.taxSlab} onChange={set('taxSlab')} options={[
          { value: '0.312', label: '30% + cess (₹15L+)' },
          { value: '0.208', label: '20% + cess (₹10-15L)' },
          { value: '0.052', label: '5% + cess (₹5-10L)' },
        ]} />
        <InputField label="ELSS Expected Return (%)" type="number" value={form.elssReturn} onChange={set('elssReturn')} placeholder="12" />
        <InputField label="PPF Rate (%)" type="number" value={form.ppfRate} onChange={set('ppfRate')} placeholder="7.1" />
        <InputField label="FD Rate (%)" type="number" value={form.fdRate} onChange={set('fdRate')} placeholder="7.0" />
      </div>

      <button style={s.btn} onClick={calculate}>Compare Investments</button>

      {result && (
        <>
          <div style={s.taxSaving}>
            Section 80C Tax Saving: {formatINR(result.taxSaving80C)} per year
          </div>

          <div style={s.grid}>
            {result.investments.map((inv, i) => (
              <div key={inv.name} style={{ ...s.card, ...(i === 0 ? s.cardWinner : {}) }}>
                <h3 style={s.cardTitle}>{inv.name}</h3>
                {i === 0 && <span style={{ ...s.badge, ...s.winBadge }}>BEST AFTER-TAX RETURN</span>}
                {i > 0 && <span style={{ ...s.badge, color: 'var(--doaide-text-muted)' }}>—</span>}
                <div style={s.row}><span style={s.rowLabel}>Invested</span><span style={s.rowValue}>{formatINR(inv.invested)}</span></div>
                <div style={s.row}><span style={s.rowLabel}>Pre-Tax Return</span><span style={s.rowValue}>{formatINR(inv.preReturn)}</span></div>
                <div style={s.row}><span style={s.rowLabel}>Tax on Gains</span><span style={{ ...s.rowValue, color: inv.tax > 0 ? 'var(--doaide-error)' : 'var(--doaide-success)' }}>{inv.tax > 0 ? `-${formatINR(inv.tax)}` : 'Tax Free'}</span></div>
                <div style={s.row}><span style={s.rowLabel}>After-Tax Return</span><span style={{ ...s.rowValue, fontWeight: 600 }}>{formatINR(inv.afterTaxReturn)}</span></div>
                <div style={s.row}><span style={s.rowLabel}>Effective CAGR</span><span style={{ ...s.rowValue, color: 'var(--doaide-gold)' }}>{inv.effectiveReturn}%</span></div>
                <div style={s.row}><span style={s.rowLabel}>Lock-in</span><span style={s.rowValue}>{inv.lockIn}</span></div>
                <div style={s.row}><span style={s.rowLabel}>Risk</span><span style={s.rowValue}>{inv.risk}</span></div>
                <div style={{ ...s.row, borderBottom: 'none' }}><span style={s.rowLabel}>Tax Treatment</span><span style={{ ...s.rowValue, fontSize: 12 }}>{inv.taxStatus}</span></div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
