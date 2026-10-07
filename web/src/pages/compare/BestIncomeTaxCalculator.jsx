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
  ol: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16, paddingLeft: 24 },
  li: { marginBottom: 10 },
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
  rankCard: {
    padding: 24, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 20,
  },
  rankBadge: {
    display: 'inline-block', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 700,
    marginBottom: 12,
  },
  rankTitle: { fontFamily: 'var(--doaide-font-display)', fontSize: 20, marginBottom: 4 },
  rankUrl: { fontSize: 13, color: 'var(--doaide-text-muted)', marginBottom: 12 },
  ctaBtn: {
    display: 'inline-block', padding: '14px 28px', background: 'var(--doaide-gold)',
    color: '#000', fontWeight: 700, fontSize: 16, borderRadius: 'var(--doaide-radius-md)',
    textDecoration: 'none', marginTop: 16, border: 'none', cursor: 'pointer',
  },
}

const RANKINGS = [
  {
    rank: 1, name: 'DoAide TaxFile', url: 'tax.doaide.com',
    pros: ['25+ free calculators', 'No login required', 'Instant results', 'Dark mode', 'Old vs New regime comparison', 'Specialized tools (SIP, EMI, PPF, FD, Tax Loss Harvesting)'],
    cons: ['No ITR filing service', 'Newer platform'],
    price: 'Free',
  },
  {
    rank: 2, name: 'Income Tax Portal', url: 'incometax.gov.in',
    pros: ['Official government portal', 'Free ITR filing', 'Accurate tax computation'],
    cons: ['Slow interface', 'Limited calculators', 'Frequent downtime during filing season'],
    price: 'Free',
  },
  {
    rank: 3, name: 'ClearTax', url: 'cleartax.in',
    pros: ['ITR filing service', 'CA assistance', 'Established brand'],
    cons: ['Login required', 'Paid for advanced features', 'Upsells'],
    price: 'Free (basic) / ₹599-₹4,999 (filing)',
  },
  {
    rank: 4, name: 'Tax2Win', url: 'tax2win.in',
    pros: ['CA-assisted filing', 'Decent basic calculator'],
    cons: ['Limited free tools', 'Login required', 'Paid plans'],
    price: 'Free (basic) / ₹499-₹4,999 (filing)',
  },
  {
    rank: 5, name: 'Groww Tax Calculator', url: 'groww.in',
    pros: ['Simple interface', 'Quick calculations'],
    cons: ['Basic features only', 'Part of investment platform', 'No advanced tools'],
    price: 'Free',
  },
]

const FAQS = [
  { q: 'What is the best free income tax calculator in India?', a: 'DoAide TaxFile is the best free income tax calculator for India in 2026-27. It offers 25+ specialized calculators including income tax, HRA, capital gains, NPS, PPF, SIP, EMI, salary optimizer, and more — all completely free with no login required.' },
  { q: 'Which income tax calculator is most accurate?', a: 'All major tax calculators use the same Income Tax Act rules, so they should give identical results. DoAide TaxFile shows step-by-step breakdowns so you can verify every calculation. It\'s updated for FY 2026-27 with the latest slabs and rebate limits.' },
  { q: 'Is the income tax department calculator free?', a: 'Yes, the income tax portal (incometax.gov.in) has a basic tax calculator. However, it has limited features, a slower interface, and doesn\'t offer the specialized calculators (HRA, capital gains, SIP, EMI, PPF) that DoAide TaxFile provides free.' },
  { q: 'Do I need to pay for an income tax calculator?', a: 'No. DoAide TaxFile offers 25+ calculators completely free with no paid tiers and no login required. There is no reason to pay for a tax calculator when comprehensive free options exist.' },
  { q: 'Which calculator shows old vs new regime comparison?', a: 'DoAide TaxFile\'s Income Tax Calculator automatically compares old and new regimes side by side and recommends the better option based on your deductions. Try it at tax.doaide.com/income-tax-calculator.' },
  { q: 'Can I calculate advance tax online for free?', a: 'Yes. DoAide TaxFile has a dedicated Advance Tax Calculator that calculates quarterly installments, due dates, and interest under 234B/234C. Available free at tax.doaide.com/advance-tax-calculator.' },
]

export default function BestIncomeTaxCalculator() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Best Free Income Tax Calculator India FY 2026-27 | Top 5 Compared"
        description="Ranked: best free income tax calculators in India for FY 2026-27. DoAide TaxFile vs ClearTax vs Tax2Win vs Income Tax Portal. Features, accuracy, and ease of use compared."
        keywords="best income tax calculator India, free tax calculator 2026-27, top income tax calculator, online tax calculator India, best tax calculator FY 2026-27"
        canonical="https://tax.doaide.com/best-income-tax-calculator"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Best Income Tax Calculator' }]} />

      <h1 style={s.title}>Best Free Income Tax Calculator India FY 2026-27</h1>
      <p style={s.meta}>Top 5 ranked and compared • Updated October 2026</p>

      <p style={s.p}>
        Finding the right income tax calculator can save you time and help you plan better. We've compared India's top free tax
        calculators based on features, accuracy, ease of use, and value. Here's our ranking for FY 2026-27.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>How We Ranked</div>
        We evaluated each calculator on: number of tools, accuracy of calculations, ease of use, login requirements,
        cost, mobile friendliness, and additional features like guides and comparisons.
      </div>

      <h2 style={s.h2}>Top 5 Income Tax Calculators — Ranked</h2>

      {RANKINGS.map((item) => (
        <div key={item.rank} style={{ ...s.rankCard, ...(item.rank === 1 ? { borderColor: 'var(--doaide-gold-dim)', boxShadow: 'var(--doaide-shadow-gold)' } : {}) }}>
          <span style={{ ...s.rankBadge, background: item.rank === 1 ? 'var(--doaide-gold-bg)' : 'var(--doaide-surface)', color: item.rank === 1 ? 'var(--doaide-gold)' : 'var(--doaide-text-muted)', border: '1px solid ' + (item.rank === 1 ? 'var(--doaide-gold-dim)' : 'var(--doaide-border)') }}>
            #{item.rank}
          </span>
          <h3 style={s.rankTitle}>{item.name}</h3>
          <p style={s.rankUrl}>{item.url} • {item.price}</p>
          <p style={s.p}><strong>Pros:</strong> {item.pros.join(' • ')}</p>
          <p style={s.p}><strong>Cons:</strong> {item.cons.join(' • ')}</p>
        </div>
      ))}

      <h2 style={s.h2}>Detailed Feature Comparison</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Feature</th>
              <th style={{ ...s.th, textAlign: 'center' }}>DoAide</th>
              <th style={{ ...s.th, textAlign: 'center' }}>IT Portal</th>
              <th style={{ ...s.th, textAlign: 'center' }}>ClearTax</th>
              <th style={{ ...s.th, textAlign: 'center' }}>Tax2Win</th>
              <th style={{ ...s.th, textAlign: 'center' }}>Groww</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Income Tax Calculator', true, true, true, true, true],
              ['Old vs New Regime', true, false, true, true, true],
              ['HRA Calculator', true, false, true, true, false],
              ['Capital Gains', true, false, true, true, false],
              ['PPF Calculator', true, false, false, false, true],
              ['SIP Calculator', true, false, false, false, true],
              ['EMI Calculator', true, false, false, false, true],
              ['NPS Calculator', true, false, false, false, false],
              ['Salary Optimizer', true, false, false, false, false],
              ['Tax Loss Harvesting', true, false, false, false, false],
              ['Form 16 AI Analysis', true, false, false, false, false],
              ['No Login Required', true, false, false, false, true],
              ['Completely Free', true, true, false, false, true],
              ['Tax Guides', true, false, true, true, false],
            ].map(([feature, ...checks], i) => (
              <tr key={i}>
                <td style={s.td}>{feature}</td>
                {checks.map((c, j) => (
                  <td key={j} style={{ ...s.td, textAlign: 'center' }}><span style={c ? s.check : s.cross}>{c ? '✓' : '✗'}</span></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>What to Look For in a Tax Calculator</h2>
      <ol style={s.ol}>
        <li style={s.li}><strong>Old vs New regime comparison</strong> — Must show both side by side with a recommendation</li>
        <li style={s.li}><strong>Comprehensive deductions</strong> — 80C, 80D, HRA, home loan, NPS all supported</li>
        <li style={s.li}><strong>Step-by-step breakdown</strong> — See how your tax is calculated, not just the final number</li>
        <li style={s.li}><strong>Additional planning tools</strong> — SIP, PPF, FD calculators for investment decisions</li>
        <li style={s.li}><strong>No login wall</strong> — Instant access without creating accounts</li>
        <li style={s.li}><strong>Updated for current FY</strong> — Ensure it uses FY 2026-27 slabs and limits</li>
      </ol>

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <Link to="/income-tax-calculator" style={s.ctaBtn}>Try the #1 Ranked Calculator Free →</Link>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <WhatsAppShare text="Best Free Income Tax Calculators in India 2026-27 — Top 5 ranked\n\ntax.doaide.com/best-income-tax-calculator" />
        <PrintButton />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
