import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 24, marginTop: 40, marginBottom: 12, color: 'var(--doaide-text)' },
  h3: { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 8, color: 'var(--doaide-text)' },
  p: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: { padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
  ol: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
}

const FAQS = [
  { q: 'Is the new tax regime mandatory for FY 2026-27?', a: 'No, the new regime is the default but not mandatory. You can opt out and choose the old regime when filing your ITR. Salaried individuals can also inform their employer at the start of the year to deduct TDS under the old regime. You must make this choice each financial year (salaried) or once in a lifetime (business income).' },
  { q: 'Can I switch from the new regime to the old regime every year?', a: 'Yes, salaried employees can switch between the new and old regime every financial year. Simply inform your employer which regime you prefer for TDS purposes, and select the chosen regime while filing your ITR. Individuals with business or professional income (ITR-3/ITR-4) can switch from new to old only once — after that, the old regime is permanent for them.' },
  { q: 'What deductions are allowed in the new regime?', a: 'The new regime allows very few deductions: standard deduction of ₹75,000 (salaried/pensioners), employer NPS contribution under Section 80CCD(2), Agniveer Fund under 80CCH, family pension deduction (₹15,000), and transport allowance for disabled employees. All other deductions — 80C, 80D, HRA, 80E, 80G, home loan interest under 24(b) — are not available.' },
  { q: 'At what income level is the old regime better than the new?', a: 'The breakeven depends on your total deductions. As a rule of thumb, if your eligible deductions (80C + 80D + HRA + home loan interest + NPS + other) exceed approximately ₹3.75 lakh, the old regime usually saves more tax. For incomes below ₹12.75 lakh, the new regime often wins because of the Section 87A rebate making tax zero. Use our calculator for your exact numbers.' },
  { q: 'What is the Section 87A rebate in the new regime?', a: 'Under the new regime, if your total taxable income (after standard deduction) is up to ₹12,00,000, you get a rebate of up to ₹60,000 under Section 87A. This effectively makes income up to ₹12,75,000 (₹12L + ₹75K standard deduction) completely tax-free. Under the old regime, the 87A rebate is ₹12,500 for taxable income up to ₹5,00,000.' },
  { q: 'How does surcharge work in both regimes?', a: 'Surcharge applies on total income above ₹50 lakh: 10% (₹50L-₹1Cr), 15% (₹1Cr-₹2Cr), 25% (₹2Cr-₹5Cr). Under the old regime, income above ₹5 Cr attracts 37% surcharge. Under the new regime, surcharge is capped at 25% regardless of income. The 4% health and education cess is then applied on tax + surcharge.' },
]

export default function NewVsOldRegimeCalculatorBlog() {
  return (
    <div style={s.page}>
      <SEOHead
        title="New vs Old Tax Regime Calculator — Which Saves More Tax in 2026? | DoAide TaxFile"
        description="Detailed comparison of new and old income tax regimes for FY 2026-27. Slab rates, deductions allowed, worked examples at every income level, and a decision framework to choose the right regime."
        keywords="new vs old tax regime calculator 2026, income tax regime comparison, old regime vs new regime which is better"
        canonical="https://tax.doaide.com/blog/new-vs-old-tax-regime-calculator"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'New vs Old Tax Regime Calculator' }]} />

      <h1 style={s.title}>New vs Old Tax Regime Calculator — Which Saves More Tax in 2026?</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) · October 2026 · 15 min read</p>

      <p style={s.p}>
        The choice between the new and old income tax regime can mean a difference of ₹50,000 or more in your annual
        tax bill. The new regime (default since FY 2023-24) offers lower slab rates but strips away most deductions.
        The old regime has higher rates but allows full benefit of 80C, 80D, HRA, home loan interest, and more. This
        guide breaks down both regimes with complete slab tables, worked examples, and a decision framework.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Instant Comparison</div>
        Enter your salary and deductions in our <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison Tool</Link> to
        see exactly which regime saves more — with slab-wise breakdown and savings amount.
      </div>

      <h2 style={s.h2}>New Regime Tax Slabs — FY 2026-27</h2>
      <p style={s.p}>
        The new regime is the default option. Standard deduction is ₹75,000. Section 87A rebate makes income up to
        ₹12 lakh (taxable) completely tax-free.
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Income Slab</th><th style={s.th}>Tax Rate</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Up to ₹4,00,000</td><td style={s.td}>Nil</td></tr>
          <tr><td style={s.td}>₹4,00,001 – ₹8,00,000</td><td style={s.td}>5%</td></tr>
          <tr><td style={s.td}>₹8,00,001 – ₹12,00,000</td><td style={s.td}>10%</td></tr>
          <tr><td style={s.td}>₹12,00,001 – ₹16,00,000</td><td style={s.td}>15%</td></tr>
          <tr><td style={s.td}>₹16,00,001 – ₹20,00,000</td><td style={s.td}>20%</td></tr>
          <tr><td style={s.td}>₹20,00,001 – ₹24,00,000</td><td style={s.td}>25%</td></tr>
          <tr><td style={s.td}>Above ₹24,00,000</td><td style={s.td}>30%</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Old Regime Tax Slabs — FY 2026-27</h2>
      <p style={s.p}>
        The old regime has higher rates but allows deductions under 80C, 80D, HRA, 24(b), and more. Standard deduction
        is ₹50,000. Section 87A rebate is ₹12,500 for taxable income up to ₹5 lakh.
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Income Slab</th><th style={s.th}>Tax Rate (Below 60)</th><th style={s.th}>Senior (60-80)</th><th style={s.th}>Super Senior (80+)</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Up to ₹2,50,000</td><td style={s.td}>Nil</td><td style={s.td}>Nil (₹3L)</td><td style={s.td}>Nil (₹5L)</td></tr>
          <tr><td style={s.td}>₹2,50,001 – ₹5,00,000</td><td style={s.td}>5%</td><td style={s.td}>5%</td><td style={s.td}>Nil</td></tr>
          <tr><td style={s.td}>₹5,00,001 – ₹10,00,000</td><td style={s.td}>20%</td><td style={s.td}>20%</td><td style={s.td}>20%</td></tr>
          <tr><td style={s.td}>Above ₹10,00,000</td><td style={s.td}>30%</td><td style={s.td}>30%</td><td style={s.td}>30%</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Key Differences at a Glance</h2>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Feature</th><th style={s.th}>New Regime</th><th style={s.th}>Old Regime</th></tr>
        </thead>
        <tbody>
          <tr><td style={{...s.td, fontWeight: 500}}>Standard Deduction</td><td style={s.td}>₹75,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={{...s.td, fontWeight: 500}}>Section 80C</td><td style={s.td}>Not allowed</td><td style={s.td}>₹1,50,000</td></tr>
          <tr><td style={{...s.td, fontWeight: 500}}>Section 80D</td><td style={s.td}>Not allowed</td><td style={s.td}>₹25K–₹1L</td></tr>
          <tr><td style={{...s.td, fontWeight: 500}}>HRA Exemption</td><td style={s.td}>Not allowed</td><td style={s.td}>Available</td></tr>
          <tr><td style={{...s.td, fontWeight: 500}}>Home Loan Interest (24b)</td><td style={s.td}>Not allowed</td><td style={s.td}>₹2,00,000</td></tr>
          <tr><td style={{...s.td, fontWeight: 500}}>NPS 80CCD(1B)</td><td style={s.td}>Not allowed</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={{...s.td, fontWeight: 500}}>NPS 80CCD(2) (employer)</td><td style={s.td}>Available</td><td style={s.td}>Available</td></tr>
          <tr><td style={{...s.td, fontWeight: 500}}>87A Rebate</td><td style={s.td}>₹60K (up to ₹12L)</td><td style={s.td}>₹12.5K (up to ₹5L)</td></tr>
          <tr><td style={{...s.td, fontWeight: 500}}>Max Surcharge</td><td style={s.td}>25%</td><td style={s.td}>37%</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Worked Examples — Tax Under Both Regimes</h2>
      <p style={s.p}>
        These examples assume a salaried individual with typical deductions under the old regime. All figures include
        4% health and education cess.
      </p>

      <h3 style={s.h3}>Example 1: Gross Salary ₹8 Lakh</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Detail</th><th style={s.th}>New Regime</th><th style={s.th}>Old Regime</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Gross Salary</td><td style={s.td}>₹8,00,000</td><td style={s.td}>₹8,00,000</td></tr>
          <tr><td style={s.td}>Standard Deduction</td><td style={s.td}>₹75,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>80C Deduction</td><td style={s.td}>—</td><td style={s.td}>₹1,50,000</td></tr>
          <tr><td style={s.td}>Taxable Income</td><td style={s.td}>₹7,25,000</td><td style={s.td}>₹6,00,000</td></tr>
          <tr><td style={s.td}>Tax Before Rebate</td><td style={s.td}>₹36,250</td><td style={s.td}>₹32,500</td></tr>
          <tr><td style={s.td}>87A Rebate</td><td style={s.td}>₹36,250</td><td style={s.td}>—</td></tr>
          <tr><td style={{...s.td, fontWeight: 600}}>Total Tax</td><td style={{...s.td, fontWeight: 600, color: 'var(--doaide-gold)'}}>₹0</td><td style={{...s.td, fontWeight: 600}}>₹33,800</td></tr>
        </tbody>
      </table>
      <p style={s.p}>Winner: <strong>New Regime</strong> — saves ₹33,800</p>

      <h3 style={s.h3}>Example 2: Gross Salary ₹12 Lakh</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Detail</th><th style={s.th}>New Regime</th><th style={s.th}>Old Regime</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Gross Salary</td><td style={s.td}>₹12,00,000</td><td style={s.td}>₹12,00,000</td></tr>
          <tr><td style={s.td}>Standard Deduction</td><td style={s.td}>₹75,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>80C + 80D + HRA</td><td style={s.td}>—</td><td style={s.td}>₹3,00,000</td></tr>
          <tr><td style={s.td}>Taxable Income</td><td style={s.td}>₹11,25,000</td><td style={s.td}>₹8,50,000</td></tr>
          <tr><td style={s.td}>87A Rebate</td><td style={s.td}>₹52,500</td><td style={s.td}>—</td></tr>
          <tr><td style={{...s.td, fontWeight: 600}}>Total Tax</td><td style={{...s.td, fontWeight: 600, color: 'var(--doaide-gold)'}}>₹0</td><td style={{...s.td, fontWeight: 600}}>₹93,600</td></tr>
        </tbody>
      </table>
      <p style={s.p}>Winner: <strong>New Regime</strong> — saves ₹93,600 (rebate zeroes out tax)</p>

      <h3 style={s.h3}>Example 3: Gross Salary ₹20 Lakh</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Detail</th><th style={s.th}>New Regime</th><th style={s.th}>Old Regime</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Gross Salary</td><td style={s.td}>₹20,00,000</td><td style={s.td}>₹20,00,000</td></tr>
          <tr><td style={s.td}>Standard Deduction</td><td style={s.td}>₹75,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>80C+80D+HRA+NPS+24b</td><td style={s.td}>—</td><td style={s.td}>₹5,75,000</td></tr>
          <tr><td style={s.td}>Taxable Income</td><td style={s.td}>₹19,25,000</td><td style={s.td}>₹13,75,000</td></tr>
          <tr><td style={{...s.td, fontWeight: 600}}>Total Tax</td><td style={{...s.td, fontWeight: 600}}>₹3,32,800</td><td style={{...s.td, fontWeight: 600, color: 'var(--doaide-gold)'}}>₹2,34,000</td></tr>
        </tbody>
      </table>
      <p style={s.p}>Winner: <strong>Old Regime</strong> — saves ₹98,800 (heavy deductions tip the scale)</p>

      <h3 style={s.h3}>Example 4: Gross Salary ₹30 Lakh</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Detail</th><th style={s.th}>New Regime</th><th style={s.th}>Old Regime</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Gross Salary</td><td style={s.td}>₹30,00,000</td><td style={s.td}>₹30,00,000</td></tr>
          <tr><td style={s.td}>Standard Deduction</td><td style={s.td}>₹75,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>80C+80D+HRA+NPS+24b</td><td style={s.td}>—</td><td style={s.td}>₹6,25,000</td></tr>
          <tr><td style={s.td}>Taxable Income</td><td style={s.td}>₹29,25,000</td><td style={s.td}>₹23,25,000</td></tr>
          <tr><td style={{...s.td, fontWeight: 600}}>Total Tax</td><td style={{...s.td, fontWeight: 600}}>₹6,24,000</td><td style={{...s.td, fontWeight: 600, color: 'var(--doaide-gold)'}}>₹5,14,800</td></tr>
        </tbody>
      </table>
      <p style={s.p}>Winner: <strong>Old Regime</strong> — saves ₹1,09,200</p>

      <h2 style={s.h2}>When is the New Regime Better?</h2>
      <ul style={s.ul}>
        <li>Income below ₹12.75 lakh — 87A rebate makes it completely tax-free</li>
        <li>You have minimal or no deductions (no HRA, no home loan, limited 80C investments)</li>
        <li>Your total deductions are below ₹3.75 lakh</li>
        <li>You do not live in a rented property (no HRA benefit)</li>
        <li>Very high income (above ₹5 Cr) where surcharge cap of 25% vs 37% matters</li>
      </ul>

      <h2 style={s.h2}>When is the Old Regime Better?</h2>
      <ul style={s.ul}>
        <li>Your total deductions (80C + 80D + HRA + 24b + NPS + others) exceed ₹3.75 lakh</li>
        <li>You receive HRA and pay significant rent in a metro city</li>
        <li>You have an active home loan with interest exceeding ₹1.5 lakh/year</li>
        <li>You maximise 80C (₹1.5L) + 80D (₹25-50K) + NPS 80CCD(1B) (₹50K)</li>
        <li>You make donations eligible under 80G</li>
      </ul>

      <h2 style={s.h2}>Section 87A Rebate Explained</h2>
      <p style={s.p}>
        The Section 87A rebate is the single most powerful benefit in the new regime. If your total taxable income
        (after standard deduction) does not exceed ₹12,00,000, the rebate wipes out your entire tax liability — up to
        ₹60,000.
      </p>
      <p style={s.p}>
        This means a gross salary of ₹12,75,000 (₹12L + ₹75K standard deduction) results in zero tax under the new
        regime. Under the old regime, the same income with ₹1.5L in 80C deductions would still attract approximately
        ₹93,600 in tax.
      </p>

      <h2 style={s.h2}>How to Switch Between Regimes</h2>
      <ol style={s.ol}>
        <li><strong>Inform your employer</strong> at the start of the financial year which regime you prefer for TDS calculation. Submit Form 12BAA or a declaration.</li>
        <li><strong>You can change your mind at ITR filing time</strong> — regardless of what you told your employer, you select the final regime while filing your return. Excess TDS (if any) is refunded.</li>
        <li><strong>File ITR with the chosen regime</strong> — ITR-1 and ITR-2 both have the option to select old or new regime.</li>
        <li><strong>No penalty for switching</strong> — salaried employees can switch freely every year without any cost or penalty.</li>
      </ol>

      <h2 style={s.h2}>Decision Framework</h2>
      <p style={s.p}>
        Follow this simple decision tree:
      </p>
      <ol style={s.ol}>
        <li>Is your gross income below ₹12.75 lakh? → <strong>New regime</strong> (zero tax with 87A rebate)</li>
        <li>Calculate your total eligible deductions (80C + 80D + HRA + 24b + NPS + other)</li>
        <li>Are total deductions above ₹3.75 lakh? → <strong>Old regime likely better</strong></li>
        <li>Are total deductions below ₹3.75 lakh? → <strong>New regime likely better</strong></li>
        <li>Still unsure? → Use our <Link to="/old-vs-new-regime" style={s.link}>comparison calculator</Link> with your exact numbers</li>
      </ol>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Calculate Your Exact Savings</div>
        Our <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link> calculator shows the exact tax
        under both regimes with your actual salary and deductions — including slab-wise breakdown and a clear recommendation.
        Try it now.
      </div>

      <FAQSection faqs={FAQS} />

      <div style={{ marginTop: 40, padding: 20, background: 'var(--doaide-surface)', borderRadius: 'var(--doaide-radius-lg)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--doaide-gold)' }}>Related Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { to: '/old-vs-new-regime', label: 'Regime Comparison' },
            { to: '/income-tax-calculator', label: 'Income Tax Calculator' },
            { to: '/80c-planner', label: '80C Planner' },
            { to: '/hra-calculator', label: 'HRA Calculator' },
            { to: '/80d-calculator', label: '80D Calculator' },
            { to: '/nps-calculator', label: 'NPS Calculator' },
          ].map(t => (
            <Link key={t.to} to={t.to} style={{ padding: '8px 16px', background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 20, fontSize: 13, color: 'var(--doaide-gold)', textDecoration: 'none', fontWeight: 500 }}>
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
