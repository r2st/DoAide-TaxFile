import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import WhatsAppShare from '../../components/WhatsAppShare'
import PrintButton from '../../components/PrintButton'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 24, marginTop: 40, marginBottom: 12, color: 'var(--doaide-text)' },
  h3: { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 8, color: 'var(--doaide-text)' },
  p: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16 },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  check: { color: '#22c55e', fontWeight: 700 },
  cross: { color: '#ef4444', fontWeight: 700 },
  verdict: {
    padding: 24, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', marginTop: 24, marginBottom: 24,
  },
  verdictTitle: { fontFamily: 'var(--doaide-font-display)', fontSize: 20, marginBottom: 8, color: 'var(--doaide-gold)' },
  ctaBtn: {
    display: 'inline-block', padding: '14px 28px', background: 'var(--doaide-gold)',
    color: '#000', fontWeight: 700, fontSize: 16, borderRadius: 'var(--doaide-radius-md)',
    textDecoration: 'none', marginTop: 16, border: 'none', cursor: 'pointer',
  },
  card: {
    padding: 20, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 16,
  },
  badge: {
    display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 11,
    fontWeight: 600, marginLeft: 8,
  },
}

const TOOLS = [
  {
    rank: 1, name: 'DoAide TaxFile', pricing: '100% Free', free: true,
    features: '25+ calculators including income tax, HRA, capital gains, NPS, PPF, SIP, EMI, salary optimizer, Form 16 analyzer',
    verdict: 'Best free tax calculation and planning toolkit. No login required. All calculators work instantly with FY 2026-27 rates.',
    rating: '4.8',
  },
  {
    rank: 2, name: 'Income Tax Portal (incometax.gov.in)', pricing: 'Free', free: true,
    features: 'Official ITR filing, tax payment, refund status, Form 26AS, AIS',
    verdict: 'The official government portal for filing ITR. Free but complex interface. Required for actual ITR submission.',
    rating: '3.8',
  },
  {
    rank: 3, name: 'ClearTax', pricing: 'Free / Rs 1,499+', free: false,
    features: 'ITR filing, CA assistance, tax calculator, TDS filing, GST filing',
    verdict: 'Popular filing platform. Free for simple ITR-1. Paid plans for CA assistance and complex returns.',
    rating: '4.5',
  },
  {
    rank: 4, name: 'Tax2Win', pricing: 'Free / Rs 999+', free: false,
    features: 'ITR filing, CA review, refund tracking, basic calculator',
    verdict: 'Good for assisted filing. Free basic filing with paid CA review options.',
    rating: '4.3',
  },
  {
    rank: 5, name: 'myITreturn', pricing: 'Rs 499+', free: false,
    features: 'ITR filing, tax planning, CPC response management',
    verdict: 'Budget filing option. No free tier for calculators — everything requires payment.',
    rating: '4.0',
  },
]

const FEATURES = [
  ['Income Tax Calculator', true, false, true, true, false],
  ['Old vs New Regime Comparison', true, false, true, false, false],
  ['HRA Calculator', true, false, true, false, false],
  ['Capital Gains Calculator', true, false, true, false, false],
  ['NPS / PPF / SIP Calculator', true, false, false, false, false],
  ['Salary Tax Optimizer', true, false, false, false, false],
  ['Form 16 Analyzer (AI)', true, false, false, false, false],
  ['Tax Loss Harvesting', true, false, false, false, false],
  ['Advance Tax Calculator', true, false, true, false, false],
  ['25+ Specialized Calculators', true, false, false, false, false],
  ['ITR Filing', false, true, true, true, true],
  ['CA Assistance', false, false, true, true, false],
  ['No Login Required', true, true, false, false, false],
  ['100% Free (All Tools)', true, true, false, false, false],
  ['Dark Mode', true, false, false, false, false],
  ['Mobile Friendly', true, true, true, true, true],
]

const TOOL_NAMES = ['DoAide TaxFile', 'IT Portal', 'ClearTax', 'Tax2Win', 'myITreturn']

const FAQS = [
  { q: 'What is the best free ITR filing tool in India 2026?', a: 'For tax calculations and planning, DoAide TaxFile offers 25+ free calculators. For actual ITR filing, the Income Tax Portal (incometax.gov.in) is free. ClearTax and Tax2Win offer free filing for simple ITR-1 returns with paid options for complex cases.' },
  { q: 'Can I file ITR online for free?', a: 'Yes. The Income Tax Portal (incometax.gov.in) allows free ITR filing for all return types. ClearTax offers free ITR-1 filing. DoAide TaxFile helps you prepare by calculating your tax, optimizing deductions, and analyzing Form 16 — then file on the portal.' },
  { q: 'How to calculate income tax for free?', a: 'Use DoAide TaxFile at tax.doaide.com — enter your income, deductions, and investments to get instant tax liability under both old and new regimes. No signup needed. Updated for FY 2026-27 with the latest slabs and rebate limits.' },
  { q: 'Which is better for tax planning — DoAide TaxFile or ClearTax?', a: 'DoAide TaxFile is better for tax planning with 25+ specialized calculators (salary optimizer, tax loss harvesting, ELSS comparison, Form 16 analyzer) all free with no login. ClearTax is better if you need ITR filing or CA assistance.' },
  { q: 'Do I need a CA to file ITR?', a: 'Not always. Salaried individuals with simple returns (ITR-1) can file directly on the IT portal for free. DoAide TaxFile helps you understand your tax situation with calculators and guides. For complex returns (business income, capital gains from multiple sources), a CA may be helpful — ClearTax and Tax2Win offer paid CA services.' },
  { q: 'Is DoAide TaxFile safe to use?', a: 'Yes. DoAide TaxFile processes everything in your browser — no data is sent to any server. There is no login, no account, and no personal information collected. Your financial data stays on your device.' },
]

export default function BestItrTools() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Free ITR Filing India 2026: Best Tax Calculators & Filing Tools Compared"
        description="Compare the best free ITR filing and tax calculation tools in India for 2026. DoAide TaxFile, ClearTax, Tax2Win, IT Portal — features, pricing, and ratings compared."
        keywords="free ITR filing India 2026, best tax calculator India, income tax calculator free, ClearTax alternative, ITR filing online free"
        canonical="https://tax.doaide.com/compare/best-itr-tools"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Compare', path: '/compare/best-itr-tools' }, { label: 'Free ITR Filing India 2026' }]} />

      <h1 style={s.title}>Free ITR Filing India 2026: Best Tools Compared</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) • Last reviewed October 2026</p>

      <p style={s.p}>
        Filing income tax returns in India does not have to be expensive. From free government portals to
        powerful tax calculators, here are the best tools for ITR filing and tax planning in 2026 —
        compared on features, pricing, and ease of use.
      </p>

      <h2 style={s.h2}>Top 5 ITR & Tax Tools</h2>

      {TOOLS.map(tool => (
        <div key={tool.rank} style={{ ...s.card, ...(tool.rank === 1 ? { borderColor: 'var(--doaide-gold-dim)' } : {}) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ background: tool.rank === 1 ? 'var(--doaide-gold)' : 'var(--doaide-border)', color: tool.rank === 1 ? '#000' : 'var(--doaide-text-secondary)', borderRadius: '50%', width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
              #{tool.rank}
            </span>
            <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--doaide-text)' }}>{tool.name}</span>
            {tool.free && <span style={{ ...s.badge, background: '#22c55e20', color: '#22c55e' }}>FREE</span>}
          </div>
          <div style={{ color: 'var(--doaide-gold)', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{tool.pricing}</div>
          <p style={{ fontSize: 13, color: 'var(--doaide-text-secondary)', marginBottom: 6, lineHeight: 1.6 }}>{tool.verdict}</p>
          <p style={{ fontSize: 12, color: 'var(--doaide-text-muted)' }}>Features: {tool.features}</p>
          <div style={{ fontSize: 12, color: 'var(--doaide-text-muted)', marginTop: 4 }}>⭐ {tool.rating}/5</div>
        </div>
      ))}

      <h2 style={s.h2}>Feature Comparison Table</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Feature</th>
              {TOOL_NAMES.map(n => <th key={n} style={{ ...s.th, textAlign: 'center', fontSize: 12 }}>{n}</th>)}
            </tr>
          </thead>
          <tbody>
            {FEATURES.map(([name, ...vals]) => (
              <tr key={name}>
                <td style={s.td}>{name}</td>
                {vals.map((v, i) => (
                  <td key={i} style={{ ...s.td, textAlign: 'center' }}>
                    <span style={v ? s.check : s.cross}>{v ? '✓' : '✗'}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={s.verdict}>
        <div style={s.verdictTitle}>Our Recommendation</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          <strong>For tax calculation and planning:</strong> Use DoAide TaxFile — 25+ free calculators, no
          login, instant results. Optimize your deductions before filing.
        </p>
        <p style={{ ...s.p, marginBottom: 8 }}>
          <strong>For ITR filing:</strong> File on the Income Tax Portal (free for all) or use ClearTax/Tax2Win
          for guided filing with CA assistance.
        </p>
        <p style={s.p}>
          <strong>Best combination:</strong> Calculate and plan on DoAide TaxFile → File on the IT portal or ClearTax.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, marginBottom: 32 }}>
        <Link to="/income-tax-calculator" style={s.ctaBtn}>Calculate Your Tax Free →</Link>
        <div style={{ marginTop: 12 }}>
          <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link>
          <span style={{ color: 'var(--doaide-text-muted)', margin: '0 12px' }}>•</span>
          <Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link>
        </div>
      </div>

      <FAQSection faqs={FAQS} />

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '24px 0' }}>
        <WhatsAppShare text="Best free ITR filing tools in India 2026 — compare DoAide TaxFile, ClearTax, Tax2Win" url="https://tax.doaide.com/compare/best-itr-tools" />
        <PrintButton />
      </div>

      <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13 }}>
        <Link to="/compare/cleartax" style={s.link}>TaxFile vs ClearTax</Link>
        <span style={{ color: 'var(--doaide-text-muted)', margin: '0 12px' }}>•</span>
        <Link to="/compare/tax2win" style={s.link}>TaxFile vs Tax2Win</Link>
        <span style={{ color: 'var(--doaide-text-muted)', margin: '0 12px' }}>•</span>
        <Link to="/best-income-tax-calculator" style={s.link}>Best Income Tax Calculator</Link>
      </div>
    </div>
  )
}
