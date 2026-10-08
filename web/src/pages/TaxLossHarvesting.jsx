import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import HowItWorks from '../components/HowItWorks'
import { calculateTaxLossHarvesting, formatINR } from '../lib/taxEngine'

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
  savingsBanner: {
    background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', padding: '20px', textAlign: 'center',
    marginTop: 24,
  },
  savingsAmount: { fontSize: 28, fontWeight: 600, color: 'var(--doaide-gold)', fontFamily: 'var(--doaide-font-mono)' },
  savingsLabel: { fontSize: 14, color: 'var(--doaide-gold)', marginTop: 4 },
  info: {
    padding: 16, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', fontSize: 13, color: 'var(--doaide-text-secondary)',
    lineHeight: 1.7, marginTop: 16,
  },
}

const FAQS = [
  { q: 'What is tax loss harvesting?', a: 'Tax loss harvesting is a strategy where you sell investments that are at a loss to offset capital gains from profitable investments. This reduces your overall taxable capital gains and hence your tax liability. You can repurchase the same or similar investments afterward.' },
  { q: 'Can I carry forward capital losses?', a: 'Yes, if your capital losses exceed your capital gains in a year, the excess loss can be carried forward for up to 8 assessment years. Long-term capital losses can only be set off against long-term capital gains. Short-term losses can be set off against both STCG and LTCG.' },
  { q: 'Is there a wash sale rule in India?', a: 'India does not have a specific wash sale rule like the US. You can sell a stock at a loss to book the loss for tax purposes and repurchase the same stock immediately. However, the intent must be genuine — transactions should not appear to be a sham or colorable device.' },
  { q: 'How is LTCG taxed on equity?', a: 'Long-term capital gains on listed equity and equity mutual funds are taxed at 12.5% on gains exceeding ₹1.25 lakh in a financial year. The ₹1.25 lakh exemption applies to the net LTCG after setting off losses. Health and education cess of 4% applies on the tax.' },
  { q: 'When should I do tax loss harvesting?', a: 'The best time is typically towards the end of the financial year (January-March) when you can assess your total capital gains and losses. However, you can harvest losses any time during the year when an investment is significantly in the red.' },
]

const STEPS = [
  'Enter your total capital gains from profitable investments sold during the financial year.',
  'Enter the total capital losses you can book by selling underperforming investments.',
  'Select whether these are long-term (LTCG) or short-term (STCG) capital gains.',
  'The calculator shows your tax before and after harvesting, and the exact amount you save.',
  'Any excess losses beyond your gains can be carried forward for up to 8 years.',
]

export default function TaxLossHarvesting() {
  const [form, setForm] = useState({ gains: '', losses: '', gainType: 'LTCG' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateTaxLossHarvesting(
      Number(form.gains) || 0,
      Number(form.losses) || 0,
      form.gainType,
    )
    setResult(r)
  }

  const shareText = result ? `Tax Loss Harvesting\nGains: ${formatINR(result.totalGains)}\nLosses Used: ${formatINR(result.lossUtilized)}\nTax Saved: ${formatINR(result.taxSaved)}\n\ntax.doaide.com/tax-loss-harvesting` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Tax Loss Harvesting Calculator - Save Capital Gains Tax | DoAide TaxFile"
        description="Calculate how much tax you can save by booking losses to offset capital gains. Supports LTCG and STCG with carry forward loss calculation."
        keywords="tax loss harvesting calculator India, capital gains tax saving, LTCG tax harvesting, set off capital losses"
        canonical="https://tax.doaide.com/tax-loss-harvesting"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Income Tax' }, { label: 'Tax Loss Harvesting' }]} />

      <h1 style={s.title}>Tax Loss Harvesting</h1>
      <p style={s.subtitle}>Calculate how much tax you can save by booking losses against capital gains</p>

      <HowItWorks steps={STEPS} />

      <div style={s.form}>
        <InputField label="Total Capital Gains" value={form.gains} onChange={set('gains')} currency hint="Profits from investments sold" />
        <InputField label="Total Capital Losses" value={form.losses} onChange={set('losses')} currency hint="Losses you can book by selling" />
        <InputField label="Gain Type" type="select" value={form.gainType} onChange={set('gainType')} options={[
          { value: 'LTCG', label: 'Long-Term Capital Gains (LTCG)' },
          { value: 'STCG', label: 'Short-Term Capital Gains (STCG)' },
        ]} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Tax Savings</button>

      {result && (
        <>
          {result.taxSaved > 0 && (
            <div style={s.savingsBanner}>
              <div style={s.savingsAmount}>{formatINR(result.taxSaved)}</div>
              <div style={s.savingsLabel}>Tax saved through loss harvesting</div>
            </div>
          )}

          <ResultCard title="Tax Comparison" gold>
            <div style={s.row}><span style={s.rowLabel}>Total Capital Gains</span><span style={s.rowValue}>{formatINR(result.totalGains)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Total Capital Losses</span><span style={{ ...s.rowValue, color: 'var(--doaide-error)' }}>-{formatINR(result.totalLosses)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Net Capital Gain</span><span style={s.rowValue}>{formatINR(result.netGain)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Loss Utilized</span><span style={s.rowValue}>{formatINR(result.lossUtilized)}</span></div>
            {result.exemption > 0 && (
              <div style={s.row}><span style={s.rowLabel}>LTCG Exemption</span><span style={s.rowValue}>{formatINR(result.exemption)}</span></div>
            )}

            <div style={{ marginTop: 16 }}>
              <div style={s.row}>
                <span style={s.rowLabel}>Tax WITHOUT Harvesting</span>
                <span style={{ ...s.rowValue, color: 'var(--doaide-error)' }}>{formatINR(result.taxWithoutHarvesting)}</span>
              </div>
              <div style={s.row}>
                <span style={s.rowLabel}>Tax WITH Harvesting</span>
                <span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.taxWithHarvesting)}</span>
              </div>
              <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
                <span style={s.highlight}>Tax Saved</span>
                <span style={{ ...s.highlight, color: 'var(--doaide-success)' }}>{formatINR(result.taxSaved)}</span>
              </div>
            </div>

            {result.carryForwardLoss > 0 && (
              <div style={s.info}>
                <strong>Carry Forward Loss:</strong> {formatINR(result.carryForwardLoss)} can be carried forward for up to {result.carryForwardYears} assessment years to offset future {result.gainType === 'LTCG' ? 'long-term' : 'capital'} gains.
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
              <ShareButtons text={shareText} />
              <PrintButton />
            </div>
          </ResultCard>
        </>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
