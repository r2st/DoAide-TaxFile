import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import ShareButtons from '../../components/ShareButtons'
import PrintButton from '../../components/PrintButton'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 24, marginTop: 40, marginBottom: 12, color: 'var(--doaide-text)' },
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
}

const FEATURES = [
  ['Income Tax Calculator', true, true],
  ['Old vs New Regime Comparison', true, true],
  ['HRA Calculator', true, true],
  ['Capital Gains Calculator', true, true],
  ['NPS Calculator', true, false],
  ['PPF Calculator', true, false],
  ['SIP Calculator', true, false],
  ['EPF Calculator', true, false],
  ['EMI Calculator', true, false],
  ['Compound Interest Calculator', true, false],
  ['Mutual Fund Calculator', true, false],
  ['SSY Calculator', true, false],
  ['FD Calculator', true, false],
  ['Salary Tax Optimizer', true, false],
  ['Form 16 AI Analyzer', true, false],
  ['Tax Loss Harvesting', true, false],
  ['Gratuity Calculator', true, true],
  ['ELSS vs PPF vs FD Comparison', true, false],
  ['Stamp Duty Calculator', true, false],
  ['Rental Income Calculator', true, false],
  ['Rent Receipt Generator', true, true],
  ['Tax Saving Guides', true, true],
  ['ITR Filing', false, true],
  ['Expert CA Help', false, true],
  ['100% Free', true, false],
  ['No Login Required', true, false],
  ['Dark Mode', true, false],
]

const FAQS = [
  { q: 'Is DoAide TaxFile better than Tax2Win?', a: 'For tax calculation and planning, DoAide TaxFile offers significantly more tools — 25+ specialized calculators compared to Tax2Win\'s basic set. DoAide TaxFile is completely free with no sign-up. Tax2Win is better if you want ITR filing with CA assistance.' },
  { q: 'Is Tax2Win free?', a: 'Tax2Win offers limited free tools. Their ITR filing service starts at ₹499 and CA-assisted plans cost ₹1,499+. DoAide TaxFile offers all 25+ calculators completely free with no paid tiers.' },
  { q: 'Can Tax2Win do what DoAide TaxFile does?', a: 'Tax2Win lacks many specialized calculators that DoAide TaxFile offers — like Salary Tax Optimizer, Tax Loss Harvesting, SIP Calculator, EMI Calculator, PPF Calculator, Form 16 AI Analyzer, and more. For pure tax calculation and financial planning tools, DoAide TaxFile is more comprehensive.' },
  { q: 'Which is more accurate for tax calculations?', a: 'Both platforms follow the same Income Tax Act rules. DoAide TaxFile is updated for FY 2026-27 and provides transparent step-by-step breakdowns so you can verify every calculation yourself.' },
  { q: 'Should I use Tax2Win or DoAide TaxFile for ITR filing?', a: 'DoAide TaxFile is for tax planning and calculations. For ITR filing, you can use incometax.gov.in (free) or Tax2Win/ClearTax if you prefer guided filing. Use DoAide TaxFile first to plan and optimize, then file on the portal.' },
]

export default function VsTax2Win() {
  return (
    <div style={s.page}>
      <SEOHead
        title="DoAide TaxFile vs Tax2Win: Free Tax Tools Compared 2026"
        description="Compare DoAide TaxFile and Tax2Win side by side. 25+ free calculators vs Tax2Win. Features, pricing, and tools compared for FY 2026-27."
        keywords="DoAide TaxFile vs Tax2Win, Tax2Win alternative, free tax calculator India, tax2win comparison, best free tax tools"
        canonical="https://tax.doaide.com/compare/tax2win"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Compare', path: '/compare/tax2win' }, { label: 'vs Tax2Win' }]} />

      <h1 style={s.title}>DoAide TaxFile vs Tax2Win: Free Tax Tools Compared</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) • Last reviewed October 2026</p>

      <p style={s.p}>
        Tax2Win is a popular ITR filing platform in India. But when it comes to tax calculation and planning tools,
        how does it compare to DoAide TaxFile's 25+ free calculators? Here's an honest, feature-by-feature comparison.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Verdict</div>
        DoAide TaxFile offers <strong>3x more calculators than Tax2Win</strong>, all free with no login.
        Tax2Win's strength is CA-assisted ITR filing, which DoAide TaxFile doesn't offer.
      </div>

      <h2 style={s.h2}>Feature Comparison</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Feature</th>
              <th style={{ ...s.th, textAlign: 'center' }}>DoAide TaxFile</th>
              <th style={{ ...s.th, textAlign: 'center' }}>Tax2Win</th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map(([feature, doaide, tax2win], i) => (
              <tr key={i}>
                <td style={s.td}>{feature}</td>
                <td style={{ ...s.td, textAlign: 'center' }}><span style={doaide ? s.check : s.cross}>{doaide ? '✓' : '✗'}</span></td>
                <td style={{ ...s.td, textAlign: 'center' }}><span style={tax2win ? s.check : s.cross}>{tax2win ? '✓' : '✗'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>Pricing Comparison</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Service</th>
              <th style={s.th}>DoAide TaxFile</th>
              <th style={s.th}>Tax2Win</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Tax Calculators</td><td style={s.td}>Free</td><td style={s.td}>Free (limited)</td></tr>
            <tr><td style={s.td}>All Advanced Tools</td><td style={s.td}>Free</td><td style={s.td}>Paid</td></tr>
            <tr><td style={s.td}>Self ITR Filing</td><td style={s.td}>N/A</td><td style={s.td}>₹499 – ₹999</td></tr>
            <tr><td style={s.td}>CA-Assisted Filing</td><td style={s.td}>N/A</td><td style={s.td}>₹1,499 – ₹4,999</td></tr>
            <tr><td style={s.td}>Login Required</td><td style={s.td}>No</td><td style={s.td}>Yes</td></tr>
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>Ease of Use</h2>
      <p style={s.p}>
        DoAide TaxFile is built for speed — no login, no sign-up, no onboarding wizard. Open any calculator and get results
        in seconds. The clean dark-mode interface keeps you focused on your numbers.
      </p>
      <p style={s.p}>
        Tax2Win requires registration and follows a guided workflow optimized for their ITR filing service. The free calculators
        are basic and often lead to upsells for paid plans.
      </p>

      <h2 style={s.h2}>Who Should Use DoAide TaxFile?</h2>
      <p style={s.p}>
        Anyone who wants instant, free access to comprehensive tax calculators and financial planning tools. Whether you're
        comparing tax regimes, planning 80C investments, calculating SIP returns, or optimizing your salary structure — DoAide
        TaxFile has you covered with 25+ specialized tools.
      </p>

      <h2 style={s.h2}>Who Should Use Tax2Win?</h2>
      <p style={s.p}>
        If you want a CA to handle your ITR filing and don't mind paying ₹1,499+, Tax2Win provides a convenient
        end-to-end service. Good for complex returns (multiple income sources, foreign income, business income) where
        professional help is worthwhile.
      </p>

      <div style={s.verdict}>
        <div style={s.verdictTitle}>Our Recommendation</div>
        <p style={s.p}>
          Use <strong>DoAide TaxFile for all your calculations and planning</strong> (free, instant, no login), then file
          your ITR on <strong>incometax.gov.in</strong> yourself (also free). If your return is complex and you want CA help,
          Tax2Win is a reasonable option for the filing step only.
        </p>
        <Link to="/income-tax-calculator" style={s.ctaBtn}>Try DoAide TaxFile Free →</Link>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <ShareButtons text="DoAide TaxFile vs Tax2Win — 25+ free tax calculators compared\n\ntax.doaide.com/compare/tax2win" />
        <PrintButton />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
