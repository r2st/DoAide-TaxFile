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
  ['SSY Calculator', true, false],
  ['FD Calculator', true, false],
  ['Mutual Fund Calculator', true, false],
  ['Salary Tax Optimizer', true, false],
  ['Form 16 Analyzer (AI)', true, false],
  ['Tax Loss Harvesting', true, false],
  ['Section 80D Calculator', true, false],
  ['Advance Tax Calculator', true, true],
  ['Rent Receipt Generator', true, true],
  ['Gratuity Calculator', true, false],
  ['Stamp Duty Calculator', true, false],
  ['Rental Income Calculator', true, false],
  ['ELSS vs PPF vs FD Comparison', true, false],
  ['Tax Saving Guides', true, true],
  ['ITR Filing', false, true],
  ['CA Assistance', false, true],
  ['100% Free (No Hidden Charges)', true, false],
  ['No Login Required', true, false],
  ['Dark Mode', true, false],
  ['Instant Results (No Waiting)', true, true],
  ['Mobile Friendly', true, true],
]

const FAQS = [
  { q: 'Is DoAide TaxFile better than ClearTax?', a: 'For tax calculations and planning, DoAide TaxFile offers 25+ specialized calculators completely free with no login required. ClearTax is better if you need ITR filing services or CA assistance. For pure calculation and tax planning tools, DoAide TaxFile provides more features at zero cost.' },
  { q: 'Is DoAide TaxFile really free?', a: 'Yes, DoAide TaxFile is 100% free with no hidden charges, no premium tiers, and no login required. All 25+ calculators and guides are available instantly. ClearTax offers some free tools but charges for ITR filing and advanced features.' },
  { q: 'Does ClearTax have more calculators than DoAide TaxFile?', a: 'No. DoAide TaxFile offers 25+ calculators including specialized tools like Salary Tax Optimizer, Tax Loss Harvesting Calculator, Form 16 AI Analyzer, and ELSS vs PPF vs FD comparison that ClearTax does not offer as standalone tools.' },
  { q: 'Can I file my ITR on DoAide TaxFile?', a: 'DoAide TaxFile focuses on tax calculation and planning tools. For ITR filing, you can use the income tax portal (incometax.gov.in) directly. Our Form 16 Analyzer and ITR Form Selector help you prepare everything you need before filing.' },
  { q: 'Which is more accurate — DoAide TaxFile or ClearTax?', a: 'Both use the same tax rules published by the Income Tax Department. DoAide TaxFile is updated for FY 2026-27 (AY 2027-28) and includes the latest slabs, rebate limits, and surcharge rules. Our open calculations let you verify every step.' },
  { q: 'Do I need to create an account on DoAide TaxFile?', a: 'No. Unlike ClearTax which requires sign-up for most features, DoAide TaxFile works instantly with no registration, no phone number, and no email required. Just open and calculate.' },
]

export default function VsClearTax() {
  return (
    <div style={s.page}>
      <SEOHead
        title="DoAide TaxFile vs ClearTax: Free Tax Calculator Comparison 2026"
        description="Compare DoAide TaxFile and ClearTax side by side. 25+ free calculators vs ClearTax. Features, pricing, ease of use compared for FY 2026-27."
        keywords="DoAide TaxFile vs ClearTax, ClearTax alternative, free tax calculator India, best tax calculator 2026, income tax calculator comparison"
        canonical="https://tax.doaide.com/compare/cleartax"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Compare', path: '/compare/cleartax' }, { label: 'vs ClearTax' }]} />

      <h1 style={s.title}>DoAide TaxFile vs ClearTax: Free Tax Calculator Comparison 2026</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) • Last reviewed October 2026</p>

      <p style={s.p}>
        Choosing the right tax tool can save you time and money. ClearTax is one of India's most well-known tax platforms,
        but is it the best option for tax calculations? DoAide TaxFile offers 25+ free calculators with no login required.
        Here's a detailed comparison to help you decide.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Verdict</div>
        For <strong>tax calculations and planning</strong>, DoAide TaxFile offers more specialized tools, completely free, with no sign-up.
        For <strong>ITR filing and CA services</strong>, ClearTax is the established choice.
      </div>

      <h2 style={s.h2}>Feature Comparison</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Feature</th>
              <th style={{ ...s.th, textAlign: 'center' }}>DoAide TaxFile</th>
              <th style={{ ...s.th, textAlign: 'center' }}>ClearTax</th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map(([feature, doaide, cleartax], i) => (
              <tr key={i}>
                <td style={s.td}>{feature}</td>
                <td style={{ ...s.td, textAlign: 'center' }}><span style={doaide ? s.check : s.cross}>{doaide ? '✓' : '✗'}</span></td>
                <td style={{ ...s.td, textAlign: 'center' }}><span style={cleartax ? s.check : s.cross}>{cleartax ? '✓' : '✗'}</span></td>
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
              <th style={s.th}>Plan</th>
              <th style={s.th}>DoAide TaxFile</th>
              <th style={s.th}>ClearTax</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Tax Calculators</td><td style={s.td}>Free</td><td style={s.td}>Free (basic)</td></tr>
            <tr><td style={s.td}>Advanced Tools</td><td style={s.td}>Free</td><td style={s.td}>Paid plans</td></tr>
            <tr><td style={s.td}>Tax Guides</td><td style={s.td}>Free</td><td style={s.td}>Free</td></tr>
            <tr><td style={s.td}>ITR Filing</td><td style={s.td}>N/A</td><td style={s.td}>₹599 – ₹4,999</td></tr>
            <tr><td style={s.td}>CA Assistance</td><td style={s.td}>N/A</td><td style={s.td}>₹1,499+</td></tr>
            <tr><td style={s.td}>Login Required</td><td style={s.td}>No</td><td style={s.td}>Yes (most features)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>Ease of Use</h2>
      <p style={s.p}>
        DoAide TaxFile is designed for instant results. Open any calculator, enter your numbers, and get results — no sign-up,
        no login, no waiting. The dark mode interface is clean and focused. Every calculator includes explanations, formulas, and
        links to related tools.
      </p>
      <p style={s.p}>
        ClearTax requires account creation for most features. Their interface is comprehensive but can feel overwhelming with
        upsells for paid services. The free tools are basic compared to DoAide TaxFile's specialized calculators.
      </p>

      <h2 style={s.h2}>Who Should Use DoAide TaxFile?</h2>
      <p style={s.p}>
        Choose DoAide TaxFile if you want quick, accurate tax calculations without creating accounts. It's ideal for salaried
        employees, freelancers, and investors who want to plan their taxes, compare regimes, optimize salary structure, or calculate
        returns on PPF, SIP, FD, and other investments. All 25+ tools are free forever.
      </p>

      <h2 style={s.h2}>Who Should Use ClearTax?</h2>
      <p style={s.p}>
        Choose ClearTax if you need help filing your ITR, want CA assistance, or need end-to-end tax filing services. ClearTax
        is a good choice for those who prefer a guided filing experience and don't mind paying for the convenience.
      </p>

      <div style={s.verdict}>
        <div style={s.verdictTitle}>Our Recommendation</div>
        <p style={s.p}>
          Use <strong>DoAide TaxFile for calculations and planning</strong> (it's free and has more tools), then file your ITR
          directly on <strong>incometax.gov.in</strong> (also free) or through ClearTax if you prefer guided filing.
          This combination gives you the best of both worlds at the lowest cost.
        </p>
        <Link to="/income-tax-calculator" style={s.ctaBtn}>Try DoAide TaxFile Free →</Link>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <WhatsAppShare text="DoAide TaxFile vs ClearTax — 25+ free tax calculators with no login required\n\ntax.doaide.com/compare/cleartax" />
        <PrintButton />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
