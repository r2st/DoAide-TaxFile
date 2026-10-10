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
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: { padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
}

const FAQS = [
  { q: 'Which tax regime saves more for ₹10 LPA salary?', a: 'At ₹10 LPA with minimal deductions, the new regime saves more — you pay zero tax (taxable income below ₹12.75L after standard deduction). Under the old regime, you would pay tax unless you have deductions exceeding ₹4.5 lakh.' },
  { q: 'Can I switch between old and new regime every year?', a: 'Yes, salaried individuals can switch between old and new regime every financial year by choosing at the time of filing. Those with business income can switch from new to old only once in their lifetime.' },
  { q: 'Is HRA exemption available in the new regime?', a: 'No. HRA exemption under Section 10(13A) is not available in the new regime. If you pay high rent in a metro city and receive HRA, the old regime is likely better for you.' },
  { q: 'What is the break-even deduction amount?', a: 'For incomes between ₹15-20 LPA, the break-even is approximately ₹3.75-4.25 lakh in deductions. If your total deductions (80C + 80D + HRA + home loan + NPS) exceed this, the old regime saves more. Use our calculator for exact numbers.' },
  { q: 'Is NPS deduction available in the new regime?', a: 'Employer NPS contribution under Section 80CCD(2) — up to 14% of basic salary — is available in both regimes. However, the employee\'s own NPS contribution under 80CCD(1B) of ₹50,000 is only available in the old regime.' },
]

const BLOG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'New Tax Regime vs Old Tax Regime 2026: Which Saves More?',
  description: 'Detailed comparison of new and old tax regimes for FY 2026-27. Slab rates, deductions, worked examples at ₹8L to ₹30L income, and a decision framework to pick the right regime.',
  author: { '@type': 'Organization', name: 'DoAide TaxFile', url: 'https://tax.doaide.com' },
  publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
  datePublished: '2026-10-10',
  dateModified: '2026-10-10',
  url: 'https://tax.doaide.com/blog/new-vs-old-regime-comparison-2026',
  mainEntityOfPage: 'https://tax.doaide.com/blog/new-vs-old-regime-comparison-2026',
  image: 'https://tax.doaide.com/og-image.png',
}

export default function NewVsOldRegime2026() {
  return (
    <div style={s.page}>
      <SEOHead
        title="New Tax Regime vs Old Tax Regime 2026: Which Saves More? | DoAide TaxFile"
        description="Detailed comparison of new and old income tax regimes for FY 2026-27. Slab-by-slab rates, deduction eligibility, worked examples at every income level, and a clear decision framework."
        keywords="new vs old tax regime 2026, old regime vs new regime comparison, which tax regime is better, tax regime calculator 2026-27"
        canonical="https://tax.doaide.com/blog/new-vs-old-regime-comparison-2026"
        jsonLd={BLOG_JSON_LD}
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'New vs Old Regime 2026' }]} />

      <h1 style={s.title}>New Tax Regime vs Old Tax Regime 2026: Which Saves More?</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) · October 2026 · 15 min read</p>

      <p style={s.p}>
        Since FY 2023-24, the new tax regime has been the default option for all taxpayers. It offers lower slab rates and
        a higher standard deduction but strips away most deductions and exemptions. The old regime retains all deductions
        — 80C, 80D, HRA, home loan interest, NPS — but at steeper rates. The right choice depends entirely on how much
        you can claim in deductions. This guide puts real numbers behind both regimes at every income level, so you can make
        a confident choice for FY 2026-27.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Compare Instantly</div>
        Enter your salary and deductions in our <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison Tool</Link> — see the exact tax under both regimes side by side.
      </div>

      <h2 style={s.h2}>Slab Rates Side by Side — FY 2026-27</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Income Slab</th>
            <th style={s.th}>New Regime</th>
            <th style={s.th}>Old Regime</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Up to ₹2.5L</td><td style={s.td}>Nil</td><td style={s.td}>Nil</td></tr>
          <tr><td style={s.td}>₹2.5L – ₹4L</td><td style={s.td}>Nil</td><td style={s.td}>5%</td></tr>
          <tr><td style={s.td}>₹4L – ₹5L</td><td style={s.td}>5%</td><td style={s.td}>5%</td></tr>
          <tr><td style={s.td}>₹5L – ₹8L</td><td style={s.td}>5%</td><td style={s.td}>20%</td></tr>
          <tr><td style={s.td}>₹8L – ₹10L</td><td style={s.td}>10%</td><td style={s.td}>20%</td></tr>
          <tr><td style={s.td}>₹10L – ₹12L</td><td style={s.td}>10%</td><td style={s.td}>30%</td></tr>
          <tr><td style={s.td}>₹12L – ₹16L</td><td style={s.td}>15%</td><td style={s.td}>30%</td></tr>
          <tr><td style={s.td}>₹16L – ₹20L</td><td style={s.td}>20%</td><td style={s.td}>30%</td></tr>
          <tr><td style={s.td}>₹20L – ₹24L</td><td style={s.td}>25%</td><td style={s.td}>30%</td></tr>
          <tr><td style={s.td}>Above ₹24L</td><td style={s.td}>30%</td><td style={s.td}>30%</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Key Differences at a Glance</h2>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Feature</th><th style={s.th}>New Regime</th><th style={s.th}>Old Regime</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>Standard deduction</td><td style={s.td}>₹75,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>Section 80C (₹1.5L)</td><td style={s.td}>Not available</td><td style={s.td}>Available</td></tr>
          <tr><td style={s.td}>Section 80D (health)</td><td style={s.td}>Not available</td><td style={s.td}>Up to ₹1L</td></tr>
          <tr><td style={s.td}>HRA exemption</td><td style={s.td}>Not available</td><td style={s.td}>Available</td></tr>
          <tr><td style={s.td}>Home loan interest (Sec 24)</td><td style={s.td}>Not available</td><td style={s.td}>Up to ₹2L</td></tr>
          <tr><td style={s.td}>NPS 80CCD(1B)</td><td style={s.td}>Not available</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>NPS 80CCD(2) employer</td><td style={s.td}>Available (14%)</td><td style={s.td}>Available (14%)</td></tr>
          <tr><td style={s.td}>Section 87A rebate</td><td style={s.td}>Up to ₹60,000 (≤₹12L)</td><td style={s.td}>Up to ₹12,500 (≤₹5L)</td></tr>
          <tr><td style={s.td}>LTA, 80G, 80E, 80TTA</td><td style={s.td}>Not available</td><td style={s.td}>Available</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Worked Examples — Real Numbers at Every Level</h2>

      <h3 style={s.h3}>Example 1: ₹8 LPA — Entry-Level Salary</h3>
      <div style={{ ...s.callout, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)' }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.9 }}>
          <strong>New Regime:</strong> Gross ₹8L − ₹75K (std deduction) = ₹7.25L taxable<br />
          Tax = ₹4L×0% + ₹3.25L×5% = ₹16,250 → Rebate u/s 87A (≤₹12L) = <strong>₹0 tax</strong><br /><br />
          <strong>Old Regime:</strong> Gross ₹8L − ₹50K (std) − ₹1.5L (80C) = ₹6L taxable<br />
          Tax = ₹2.5L×0% + ₹2.5L×5% + ₹1L×20% = ₹32,500 → Rebate (≤₹5L): no → Tax = ₹32,500 + 4% cess = <strong>₹33,800</strong><br /><br />
          <strong>Winner: New regime saves ₹33,800</strong>
        </p>
      </div>

      <h3 style={s.h3}>Example 2: ₹12 LPA — Mid-Level Salary</h3>
      <div style={{ ...s.callout, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)' }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.9 }}>
          <strong>New Regime:</strong> ₹12L − ₹75K = ₹11.25L taxable<br />
          Tax = ₹4L×0% + ₹4L×5% + ₹3.25L×10% = ₹52,500 → Rebate (≤₹12L) = <strong>₹0 tax</strong><br /><br />
          <strong>Old Regime (₹3L deductions):</strong> ₹12L − ₹50K − ₹3L = ₹8.5L taxable<br />
          Tax = ₹2.5L×0% + ₹2.5L×5% + ₹3.5L×20% = ₹82,500 + cess = <strong>₹85,800</strong><br /><br />
          <strong>Winner: New regime saves ₹85,800</strong>
        </p>
      </div>

      <h3 style={s.h3}>Example 3: ₹18 LPA — Senior Professional</h3>
      <div style={{ ...s.callout, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)' }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.9 }}>
          <strong>New Regime:</strong> ₹18L − ₹75K = ₹17.25L taxable<br />
          Tax = ₹4L×0% + ₹4L×5% + ₹4L×10% + ₹4L×15% + ₹1.25L×20% = ₹1,45,000 + cess = <strong>₹1,50,800</strong><br /><br />
          <strong>Old Regime (₹4L deductions):</strong> ₹18L − ₹50K − ₹4L = ₹13.5L<br />
          Tax = ₹2.5L×0% + ₹2.5L×5% + ₹5L×20% + ₹3.5L×30% = ₹2,17,500 + cess = <strong>₹2,26,200</strong><br /><br />
          <strong>Old Regime (₹6.5L deductions):</strong> ₹18L − ₹50K − ₹6.5L = ₹11L<br />
          Tax = ₹2.5L×0% + ₹2.5L×5% + ₹5L×20% + ₹1L×30% = ₹1,42,500 + cess = <strong>₹1,48,200</strong><br /><br />
          <strong>Break-even at ~₹5.5L deductions. Above that, old regime wins.</strong>
        </p>
      </div>

      <h3 style={s.h3}>Example 4: ₹25 LPA — High Income</h3>
      <div style={{ ...s.callout, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)' }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.9 }}>
          <strong>New Regime:</strong> ₹25L − ₹75K = ₹24.25L taxable<br />
          Tax = ₹4L×0% + ₹4L×5% + ₹4L×10% + ₹4L×15% + ₹4L×20% + ₹4L×25% + ₹0.25L×30% = ₹3,07,500 + cess = <strong>₹3,19,800</strong><br /><br />
          <strong>Old Regime (₹5L deductions):</strong> ₹25L − ₹50K − ₹5L = ₹19.5L<br />
          Tax = ₹2.5L×0% + ₹2.5L×5% + ₹5L×20% + ₹9.5L×30% = ₹3,97,500 + cess = <strong>₹4,13,400</strong><br /><br />
          <strong>Old Regime (₹8L deductions):</strong> ₹25L − ₹50K − ₹8L = ₹16.5L<br />
          Tax = ₹2.5L×0% + ₹2.5L×5% + ₹5L×20% + ₹6.5L×30% = ₹3,07,500 + cess = <strong>₹3,19,800</strong><br /><br />
          <strong>Break-even at ~₹8L deductions (HRA + 80C + 80D + home loan + NPS).</strong>
        </p>
      </div>

      <p style={s.p}>
        Calculate with your exact numbers using our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>.
      </p>

      <h2 style={s.h2}>The Break-Even Table</h2>
      <p style={s.p}>
        The table below shows the approximate deduction amount at which the old regime starts saving more than the new regime.
        If your total deductions exceed the break-even, choose old; otherwise, stick with new.
      </p>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Gross Income</th><th style={s.th}>Break-Even Deductions</th><th style={s.th}>Likely Winner</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>₹8 LPA</td><td style={s.td}>Not achievable</td><td style={s.td}>New regime (zero tax)</td></tr>
          <tr><td style={s.td}>₹10 LPA</td><td style={s.td}>Not achievable</td><td style={s.td}>New regime (zero tax)</td></tr>
          <tr><td style={s.td}>₹12.75 LPA</td><td style={s.td}>Not achievable</td><td style={s.td}>New regime (zero tax)</td></tr>
          <tr><td style={s.td}>₹15 LPA</td><td style={s.td}>~₹4.25L</td><td style={s.td}>Old if HRA + 80C + 80D exceeds ₹4.25L</td></tr>
          <tr><td style={s.td}>₹20 LPA</td><td style={s.td}>~₹5.75L</td><td style={s.td}>Old if you have home loan + HRA</td></tr>
          <tr><td style={s.td}>₹25 LPA</td><td style={s.td}>~₹8L</td><td style={s.td}>Old with full deduction stack</td></tr>
          <tr><td style={s.td}>₹30 LPA</td><td style={s.td}>~₹8.5L</td><td style={s.td}>Old with full deduction stack</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>How to Maximize Old Regime Deductions</h2>
      <p style={s.p}>
        If you are considering the old regime, here is the full deduction stack that most salaried individuals can claim:
      </p>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Deduction</th><th style={s.th}>Maximum Amount</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>Standard deduction</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>Section 80C (EPF + PPF + ELSS + LIC)</td><td style={s.td}>₹1,50,000</td></tr>
          <tr><td style={s.td}>Section 80CCD(1B) — NPS</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>Section 80D — Health insurance</td><td style={s.td}>₹75,000 (self + senior parents)</td></tr>
          <tr><td style={s.td}>HRA exemption (metro, ₹25K rent/month)</td><td style={s.td}>~₹1,80,000 – ₹3,00,000</td></tr>
          <tr><td style={s.td}>Section 24 — Home loan interest</td><td style={s.td}>₹2,00,000</td></tr>
          <tr><td style={s.td}><strong>Total potential</strong></td><td style={s.td}><strong>₹7,00,000 – ₹8,25,000</strong></td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Plan your 80C portfolio with our <Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> and calculate
        HRA exemption with the <Link to="/hra-calculator" style={s.link}>HRA Calculator</Link>.
      </p>

      <h2 style={s.h2}>Who Should Definitely Choose New Regime?</h2>
      <ul style={s.ul}>
        <li><strong>Income below ₹12.75 LPA:</strong> Zero tax under new regime regardless of deductions</li>
        <li><strong>No HRA or home loan:</strong> Without the two biggest deductions, old regime rarely wins</li>
        <li><strong>Freelancers / consultants:</strong> Limited deduction options; new regime's lower rates help more</li>
        <li><strong>Starting career:</strong> Prefer simplicity and higher take-home; invest for growth, not tax saving</li>
        <li><strong>Gig workers:</strong> Irregular income with no employer benefits — new regime is simpler</li>
      </ul>

      <h2 style={s.h2}>Who Should Definitely Choose Old Regime?</h2>
      <ul style={s.ul}>
        <li><strong>Paying rent in metro + HRA:</strong> HRA alone can be ₹2-3 lakh deduction for metro residents</li>
        <li><strong>Active home loan:</strong> ₹2 lakh interest deduction (Sec 24) + ₹1.5 lakh principal (80C) = ₹3.5 lakh</li>
        <li><strong>Maxing 80C + 80D + NPS:</strong> ₹1.5L + ₹75K + ₹50K = ₹2.75 lakh in just three sections</li>
        <li><strong>Senior citizens (60+):</strong> Higher basic exemption (₹3L vs ₹2.5L) and 80TTB (₹50K) benefit</li>
        <li><strong>Children's tuition + housing:</strong> Tuition fees under 80C + home loan benefits stack up</li>
      </ul>

      <h2 style={s.h2}>How to Switch Regimes</h2>
      <ul style={s.ul}>
        <li><strong>Salaried:</strong> Inform employer for TDS calculation; final choice at ITR filing time. You can switch every year.</li>
        <li><strong>Business income:</strong> Once you opt out of new regime (back to old), you can return to new regime only once in your lifetime.</li>
        <li><strong>Filing deadline:</strong> The regime choice must be made by the original due date (July 31 for most). Belated returns filed after the deadline default to the new regime.</li>
      </ul>

      <FAQSection faqs={FAQS} />

      <div style={s.callout}>
        <div style={s.calloutTitle}>Free Tax Tools</div>
        <ul style={{ ...s.ul, marginBottom: 0 }}>
          <li><Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link> — instant side-by-side analysis</li>
          <li><Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — compare both regimes with your salary</li>
          <li><Link to="/hra-calculator" style={s.link}>HRA Calculator</Link> — calculate HRA exemption for old regime</li>
          <li><Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> — optimize your tax-saving investments</li>
          <li><Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> — restructure CTC for max savings</li>
        </ul>
      </div>
    </div>
  )
}
