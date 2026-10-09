import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateSIP, formatINR } from '../lib/taxEngine'

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
  bar: { display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32, marginTop: 20 },
  barInvested: { background: 'var(--doaide-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'var(--doaide-text-on-gold)' },
  barGained: { background: 'var(--doaide-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#fff' },
  legend: { display: 'flex', gap: 20, marginTop: 8, fontSize: 12, color: 'var(--doaide-text-secondary)' },
  legendDot: { width: 10, height: 10, borderRadius: 2, display: 'inline-block', marginRight: 6, verticalAlign: 'middle' },
}

const FAQS = [
  { q: 'What is SIP and how does it work?', a: 'SIP (Systematic Investment Plan) lets you invest a fixed amount regularly in mutual funds. It leverages rupee cost averaging — you buy more units when prices are low and fewer when prices are high, reducing the impact of market volatility.' },
  { q: 'What is step-up SIP?', a: 'Step-up SIP (or top-up SIP) allows you to increase your SIP amount annually by a fixed percentage. For example, a 10% step-up on ₹10,000 SIP means investing ₹11,000 in the second year, ₹12,100 in the third year, and so on.' },
  { q: 'What returns can I expect from SIP?', a: 'Returns depend on the type of fund: large-cap equity funds historically return 10-12% p.a., mid/small-cap 12-15%, and debt funds 6-8%. Past performance does not guarantee future results.' },
  { q: 'Is SIP better than lump sum investment?', a: 'SIP works better in volatile markets as it averages out the purchase cost. Lump sum can outperform SIP in consistently rising markets. For most retail investors, SIP is recommended for disciplined investing.' },
]

export default function SIPCalculator() {
  const [form, setForm] = useState({ monthlyAmount: '', returnRate: '12', years: '10', stepUp: '0' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateSIP(
      Number(form.monthlyAmount) || 0,
      Number(form.returnRate) || 12,
      Number(form.years) || 10,
      Number(form.stepUp) || 0,
    )
    setResult(r)
  }

  const shareText = result ? `SIP Returns\nMonthly SIP: ${formatINR(result.monthlyAmount)}\nInvested: ${formatINR(result.totalInvested)}\nValue: ${formatINR(result.futureValue)}\nGains: ${formatINR(result.wealthGained)}\n\ntax.doaide.com/sip-calculator` : ''

  const investedPct = result ? Math.round((result.totalInvested / result.futureValue) * 100) : 0

  return (
    <div style={s.page}>
      <SEOHead
        title="SIP Calculator 2026 — Calculate Mutual Fund Returns Free | DoAide TaxFile"
        description="Free SIP calculator with step-up option. Calculate how your monthly mutual fund investments grow with compounding. Instant results, no login required."
        keywords="SIP calculator 2026, systematic investment plan calculator, step up SIP calculator, mutual fund SIP returns, SIP return calculator online"
        canonical="https://tax.doaide.com/sip-calculator"
        faqs={FAQS}
        breadcrumbs={[{ name: 'SIP Calculator', url: 'https://tax.doaide.com/sip-calculator' }]}
      />

      <h1 style={s.title}>SIP Calculator</h1>
      <p style={s.subtitle}>Systematic Investment Plan — Calculate your wealth over time</p>

      <div style={s.form}>
        <InputField label="Monthly SIP Amount" value={form.monthlyAmount} onChange={set('monthlyAmount')} currency />
        <InputField label="Expected Return (% p.a.)" type="number" value={form.returnRate} onChange={set('returnRate')} placeholder="12" />
        <InputField label="Investment Period (Years)" type="number" value={form.years} onChange={set('years')} placeholder="10" />
        <InputField label="Annual Step-Up (%)" type="number" value={form.stepUp} onChange={set('stepUp')} placeholder="0" hint="Optional: increase SIP by this % yearly" />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate SIP Returns</button>

      {result && (
        <ResultCard title="SIP Investment Returns" gold>
          <div style={s.row}><span style={s.rowLabel}>Total Invested</span><span style={s.rowValue}>{formatINR(result.totalInvested)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Wealth Gained</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.wealthGained)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Total Value</span>
            <span style={s.highlight}>{formatINR(result.futureValue)}</span>
          </div>

          <div style={s.bar}>
            <div style={{ ...s.barInvested, width: `${investedPct}%` }}>Invested</div>
            <div style={{ ...s.barGained, width: `${100 - investedPct}%` }}>Gains</div>
          </div>
          <div style={s.legend}>
            <span><span style={{ ...s.legendDot, background: 'var(--doaide-gold)' }} /> Invested: {formatINR(result.totalInvested)}</span>
            <span><span style={{ ...s.legendDot, background: 'var(--doaide-success)' }} /> Gains: {formatINR(result.wealthGained)}</span>
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
