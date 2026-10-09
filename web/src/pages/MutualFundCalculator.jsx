import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateMutualFund, formatINR } from '../lib/taxEngine'

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
  tabs: { display: 'flex', gap: 0, marginBottom: 24, borderBottom: '2px solid var(--doaide-border)' },
  tab: { padding: '10px 24px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--doaide-text-secondary)', borderBottom: '2px solid transparent', marginBottom: -2 },
  tabActive: { color: 'var(--doaide-gold)', borderBottomColor: 'var(--doaide-gold)' },
  bar: { display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32, marginTop: 20 },
  barInvested: { background: 'var(--doaide-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--doaide-text-on-gold)' },
  barGained: { background: 'var(--doaide-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#fff' },
}

const FAQS = [
  { q: 'What is the difference between SIP and lump sum in mutual funds?', a: 'SIP invests a fixed amount monthly, spreading risk through rupee cost averaging. Lump sum invests the entire amount at once. SIP suits regular income earners; lump sum works well when you have a surplus or during market dips.' },
  { q: 'How are mutual fund returns taxed?', a: 'Equity funds: STCG (held <12 months) at 20%, LTCG at 12.5% with ₹1.25L exemption. Debt funds: gains taxed at slab rate regardless of holding period. ELSS qualifies for 80C deduction with 3-year lock-in.' },
  { q: 'What is CAGR in mutual funds?', a: 'CAGR (Compound Annual Growth Rate) represents the mean annual growth rate over a specified period. It smooths out yearly fluctuations to show the rate at which an investment would have grown if it had grown at a steady rate.' },
  { q: 'What is a good expected return rate for mutual funds?', a: 'Historically: Large-cap equity funds: 10-12% p.a., Mid-cap: 12-15%, Small-cap: 14-18%, Debt funds: 6-8%, Hybrid funds: 8-10%. These are long-term averages; actual returns vary significantly year to year.' },
]

export default function MutualFundCalculator() {
  const [investmentType, setInvestmentType] = useState('sip')
  const [form, setForm] = useState({ amount: '', returnRate: '12', years: '10' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateMutualFund(
      investmentType,
      Number(form.amount) || 0,
      Number(form.returnRate) || 12,
      Number(form.years) || 10,
    )
    setResult(r)
  }

  const shareText = result ? `Mutual Fund ${investmentType === 'sip' ? 'SIP' : 'Lumpsum'}\nInvested: ${formatINR(result.totalInvested)}\nValue: ${formatINR(result.futureValue)}\nGains: ${formatINR(result.wealthGained)}\n\ntax.doaide.com/mutual-fund-calculator` : ''
  const investedPct = result && result.futureValue > 0 ? Math.round((result.totalInvested / result.futureValue) * 100) : 50

  return (
    <div style={s.page}>
      <SEOHead
        title="Mutual Fund Calculator 2026 — SIP & Lumpsum Returns Free | DoAide TaxFile"
        description="Free mutual fund calculator for SIP and lump sum investments. Calculate projected wealth with expected return rates. Instant results, no login required."
        keywords="mutual fund calculator 2026, mutual fund SIP calculator, lumpsum investment calculator, CAGR calculator mutual fund, mutual fund returns online"
        canonical="https://tax.doaide.com/mutual-fund-calculator"
        faqs={FAQS}
        breadcrumbs={[{ name: 'Mutual Fund Calculator', url: 'https://tax.doaide.com/mutual-fund-calculator' }]}
      />

      <h1 style={s.title}>Mutual Fund Calculator</h1>
      <p style={s.subtitle}>SIP & Lumpsum — Project your mutual fund returns</p>

      <div style={s.tabs}>
        <div style={{ ...s.tab, ...(investmentType === 'sip' ? s.tabActive : {}) }} onClick={() => { setInvestmentType('sip'); setResult(null) }}>SIP</div>
        <div style={{ ...s.tab, ...(investmentType === 'lumpsum' ? s.tabActive : {}) }} onClick={() => { setInvestmentType('lumpsum'); setResult(null) }}>Lumpsum</div>
      </div>

      <div style={s.form}>
        <InputField label={investmentType === 'sip' ? 'Monthly SIP Amount' : 'Investment Amount'} value={form.amount} onChange={set('amount')} currency />
        <InputField label="Expected Return (% p.a.)" type="number" value={form.returnRate} onChange={set('returnRate')} placeholder="12" />
        <InputField label="Investment Period (Years)" type="number" value={form.years} onChange={set('years')} placeholder="10" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Returns</button>

      {result && (
        <ResultCard title={`Mutual Fund ${investmentType === 'sip' ? 'SIP' : 'Lumpsum'} Returns`} gold>
          <div style={s.row}><span style={s.rowLabel}>Total Invested</span><span style={s.rowValue}>{formatINR(result.totalInvested)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Wealth Gained</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.wealthGained)}</span></div>
          {result.cagr != null && <div style={s.row}><span style={s.rowLabel}>CAGR</span><span style={s.rowValue}>{result.cagr}%</span></div>}
          {result.absoluteReturn != null && <div style={s.row}><span style={s.rowLabel}>Absolute Return</span><span style={s.rowValue}>{result.absoluteReturn}%</span></div>}
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Total Value</span>
            <span style={s.highlight}>{formatINR(result.futureValue)}</span>
          </div>

          <div style={s.bar}>
            <div style={{ ...s.barInvested, width: `${investedPct}%` }}>Invested</div>
            <div style={{ ...s.barGained, width: `${100 - investedPct}%` }}>Gains</div>
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
