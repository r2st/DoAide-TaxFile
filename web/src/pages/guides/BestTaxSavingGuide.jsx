import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import ShareButtons from '../../components/ShareButtons'

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
  tdMono: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  tipCard: {
    padding: 20, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 16, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  tipTitle: { fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 4, fontSize: 15 },
  tipSaving: { fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-gold)', fontWeight: 600 },
}

const FAQS = [
  { q: 'How can a salaried person save maximum tax?', a: 'Under the old regime: Maximize 80C (₹1.5L — EPF + PPF/ELSS), claim HRA (if renting), add NPS ₹50K (80CCD 1B), health insurance ₹25K-50K (80D), and home loan interest ₹2L (Section 24b). Total potential deductions: ₹5-6L. Under the new regime: You get zero tax up to ₹12.75L income with just the ₹75K standard deduction.' },
  { q: 'Should I choose old or new regime as a salaried employee?', a: 'If your total deductions exceed ₹3.75 lakh (at ₹10-15L income) or ₹4.5 lakh (at ₹15L+ income), old regime may be better. Otherwise, the new regime with its lower rates and higher rebate limit almost always wins. Use our calculator to compare with your actual numbers.' },
  { q: 'How can I reduce tax without investing?', a: 'Restructure your salary: increase HRA and LTA allowances, opt for food coupons (₹2,200/month tax-free), claim children education allowance (₹100/month per child), and telephone/internet reimbursement. Also claim standard deduction (automatic) and professional tax (Section 16).' },
  { q: 'Is NPS a good tax-saving option?', a: 'NPS offers an extra ₹50K deduction under 80CCD(1B) above the ₹1.5L 80C limit. If your employer also contributes (up to 14% of basic), that is deductible under 80CCD(2) with no limit. However, 40% of corpus must be annuitized, which is restrictive. Good for disciplined long-term retirement saving.' },
  { q: 'What tax benefits do I get on a home loan?', a: 'Under the old regime: interest up to ₹2L under Section 24(b) + principal up to ₹1.5L under 80C + additional ₹1.5L for first-time buyers under 80EEA (if applicable). Under the new regime, only interest on let-out property is deductible (against rental income). Use our Home Loan Calculator to see the full benefit.' },
]

export default function BestTaxSavingGuide() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Best Tax Saving Options for Salaried Employees 2026 | DoAide TaxFile"
        description="Complete guide to tax saving for salaried employees in India for FY 2026-27. Salary restructuring, 80C investments, NPS, home loans, and health insurance strategies."
        keywords="tax saving for salaried employees 2026, best tax saving options India, salary tax optimization, how to save income tax, tax saving investments salaried"
        canonical="https://tax.doaide.com/guides/best-tax-saving-salaried"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Best Tax Saving for Salaried' }]} />

      <h1 style={s.title}>Best Tax Saving Options for Salaried Employees 2026</h1>
      <p style={s.meta}>Updated for FY 2026-27 • 10 min read</p>

      <p style={s.p}>
        As a salaried employee in India, you have multiple avenues to reduce your tax burden legally — from restructuring
        your salary components to investing in tax-saving instruments. This guide covers every strategy, ordered by impact and ease
        of implementation. Whether you choose the new regime or the old regime, there are optimizations available.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Optimize Your Salary</div>
        Use our <Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> to find the best CTC structure,
        or calculate your <Link to="/take-home-salary-calculator" style={s.link}>Take-Home Salary</Link> instantly.
      </div>

      <h2 style={s.h2}>Strategy 1: Choose the Right Tax Regime</h2>
      <p style={s.p}>
        The single biggest decision is which tax regime to opt for. The new regime (default since FY 2023-24) offers lower rates
        and gives zero tax on income up to ₹12.75 lakh (after ₹75K standard deduction). The old regime has higher rates but allows
        deductions under 80C, 80D, HRA, home loan interest, and more.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Income Level</th>
              <th style={s.th}>Better Regime</th>
              <th style={s.th}>Break-even Deductions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Up to ₹12.75L</td><td style={s.td}>New (zero tax)</td><td style={s.td}>N/A</td></tr>
            <tr><td style={s.td}>₹12.75L – ₹15L</td><td style={s.td}>New (usually)</td><td style={s.tdMono}>₹3.75L+</td></tr>
            <tr><td style={s.td}>₹15L – ₹20L</td><td style={s.td}>Depends</td><td style={s.tdMono}>₹4L – ₹4.5L</td></tr>
            <tr><td style={s.td}>₹20L+</td><td style={s.td}>New (usually)</td><td style={s.tdMono}>₹5L+</td></tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        Read the <Link to="/guides/income-tax-slabs-2026-27" style={s.link}>complete tax slabs guide</Link> for detailed worked examples.
      </p>

      <h2 style={s.h2}>Strategy 2: Salary Restructuring (Both Regimes)</h2>
      <p style={s.p}>
        Your CTC (Cost to Company) can be structured to minimize tax. Talk to HR about adjusting these components:
      </p>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>HRA (House Rent Allowance)</div>
        <div>If you live in rented accommodation, ensure HRA is a significant part of your salary. The exemption is the minimum of:
        actual HRA, 50% of basic (metro) or 40% (non-metro), or rent paid minus 10% of basic. Old regime only.</div>
        <div style={{ marginTop: 4 }}><span style={s.tipSaving}>Saving: ₹50K – ₹2.5L+ depending on rent and city</span></div>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>EPF + VPF (Voluntary Provident Fund)</div>
        <div>Your 12% EPF contribution counts under 80C. You can opt for additional VPF contributions at the same 8.25% rate.
        EPF is one of the best risk-free investment options. Works under old regime for 80C; the returns benefit both regimes.</div>
        <div style={{ marginTop: 4 }}><span style={s.tipSaving}>Saving: Up to ₹46,800 (at 30% slab)</span></div>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>LTA (Leave Travel Allowance)</div>
        <div>You can claim LTA exemption for domestic travel expenses twice in a block of 4 years. Only the travel fare is exempt,
        not hotel or food expenses. Ensure this is part of your salary structure. Old regime only.</div>
        <div style={{ marginTop: 4 }}><span style={s.tipSaving}>Saving: ₹10K – ₹50K per trip</span></div>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>Food Coupons / Meal Vouchers</div>
        <div>Sodexo/meal vouchers up to ₹2,200 per month (₹26,400/year) are tax-free perquisites under the old regime. Some employers
        provide this as part of flexible benefits. Ask your HR.</div>
        <div style={{ marginTop: 4 }}><span style={s.tipSaving}>Saving: Up to ₹8,200 (at 30% slab)</span></div>
      </div>

      <h2 style={s.h2}>Strategy 3: Section 80C Investments (Old Regime)</h2>
      <p style={s.p}>
        The most impactful deduction for most salaried employees. You can claim up to ₹1,50,000 across all 80C instruments combined.
        Your EPF contribution already counts, so check how much room is left before investing separately.
      </p>
      <ol style={s.ol}>
        <li style={s.li}><strong>EPF</strong> — Already deducted from salary (12% of basic). First to exhaust.</li>
        <li style={s.li}><strong>ELSS</strong> — Best for growth (3-year lock-in, ~12% returns). <Link to="/elss-vs-ppf-vs-fd" style={s.link}>Compare ELSS vs PPF vs FD</Link>.</li>
        <li style={s.li}><strong>PPF</strong> — Best for safety (15-year, 7.1%, tax-free). <Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link>.</li>
        <li style={s.li}><strong>SSY</strong> — For parents of girls (8.2%, tax-free). <Link to="/ssy-calculator" style={s.link}>SSY Calculator</Link>.</li>
        <li style={s.li}><strong>Tuition fees</strong> — Up to 2 children's school/college fees count.</li>
        <li style={s.li}><strong>Home loan principal</strong> — EMI principal repayment.</li>
      </ol>
      <p style={s.p}>
        Read our <Link to="/guides/section-80c-deductions" style={s.link}>complete 80C guide</Link> for all eligible instruments compared.
      </p>

      <h2 style={s.h2}>Strategy 4: NPS — Additional ₹50K Deduction (Old Regime)</h2>
      <p style={s.p}>
        Beyond 80C, NPS offers ₹50,000 additional deduction under 80CCD(1B). If your employer contributes to NPS, that contribution
        (up to 14% of basic for government / 10% for private sector) is deductible under 80CCD(2) with no upper limit.
        At 30% tax slab, the ₹50K NPS deduction saves ₹15,600 in tax.
      </p>

      <h2 style={s.h2}>Strategy 5: Health Insurance — Section 80D</h2>
      <p style={s.p}>
        Premiums paid for health insurance are deductible: ₹25,000 for self/family, plus ₹25,000 for parents (₹50,000 if parents
        are senior citizens). This means up to ₹75,000 deduction if you insure both yourself and senior parents. Preventive health
        check-up (₹5,000) is included within this limit. Use our <Link to="/80d-calculator" style={s.link}>80D Calculator</Link>.
      </p>

      <h2 style={s.h2}>Strategy 6: Home Loan Tax Benefits</h2>
      <p style={s.p}>
        Under the old regime, home loan interest is deductible up to ₹2,00,000 under Section 24(b) for self-occupied property.
        The principal repayment counts under 80C (within the ₹1.5L limit). For let-out property, the full interest is deductible
        against rental income. Use our <Link to="/home-loan-calculator" style={s.link}>Home Loan Calculator</Link> to see the impact.
      </p>

      <h2 style={s.h2}>Strategy 7: Tax Harvesting on Investments</h2>
      <p style={s.p}>
        If you have equity investments, you can book LTCG up to ₹1.25 lakh per year tax-free. This means selling and re-buying
        shares/mutual funds each year to reset the cost base. For a ₹10L+ equity portfolio, this strategy alone can save
        ₹15,000+ per year in capital gains tax. Use our <Link to="/tax-loss-harvesting" style={s.link}>Tax Loss Harvesting Calculator</Link>.
      </p>

      <h2 style={s.h2}>Maximum Savings Cheat Sheet</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Deduction</th>
              <th style={s.th}>Section</th>
              <th style={s.th}>Max Amount</th>
              <th style={s.th}>Tax Saved (30%)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>80C Investments</td><td style={s.td}>80C</td><td style={s.tdMono}>₹1,50,000</td><td style={s.tdMono}>₹46,800</td></tr>
            <tr><td style={s.td}>NPS</td><td style={s.td}>80CCD(1B)</td><td style={s.tdMono}>₹50,000</td><td style={s.tdMono}>₹15,600</td></tr>
            <tr><td style={s.td}>Health Insurance</td><td style={s.td}>80D</td><td style={s.tdMono}>₹75,000</td><td style={s.tdMono}>₹23,400</td></tr>
            <tr><td style={s.td}>Home Loan Interest</td><td style={s.td}>24(b)</td><td style={s.tdMono}>₹2,00,000</td><td style={s.tdMono}>₹62,400</td></tr>
            <tr><td style={s.td}>HRA</td><td style={s.td}>10(13A)</td><td style={s.td}>Varies</td><td style={s.td}>Varies</td></tr>
            <tr><td style={s.td}>Standard Deduction</td><td style={s.td}>16(ia)</td><td style={s.tdMono}>₹50,000</td><td style={s.tdMono}>₹15,600</td></tr>
            <tr><td style={{ ...s.td, fontWeight: 600 }}>Total (excl. HRA)</td><td style={s.td}></td><td style={{ ...s.tdMono, fontWeight: 600 }}>₹5,25,000</td><td style={{ ...s.tdMono, fontWeight: 600 }}>₹1,63,800</td></tr>
          </tbody>
        </table>
      </div>

      <div style={s.callout}>
        <div style={s.calloutTitle}>New Regime Tip</div>
        Even under the new regime, maximize EPF (guaranteed 8.25% return) and NPS employer contribution (exempt under 80CCD 2).
        These are good investments regardless of tax benefit.
      </div>

      <div style={{ marginTop: 32 }}>
        <ShareButtons text="Best Tax Saving Options for Salaried Employees 2026 — Complete guide\n\ntax.doaide.com/guides/best-tax-saving-salaried" />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
