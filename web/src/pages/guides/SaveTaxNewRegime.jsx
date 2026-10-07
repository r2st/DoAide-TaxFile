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
  { q: 'Can I save tax under the new regime?', a: 'Yes, but options are limited. Under the new regime, you get a standard deduction of ₹75,000, employer NPS contribution under 80CCD(2), and interest on let-out property. No 80C, 80D, HRA, or other deductions are available. The key benefit is zero tax up to ₹12.75 lakh income.' },
  { q: 'Is the new regime better for everyone?', a: 'The new regime is better for most people with income up to ₹15 lakh or those who don\'t have significant deductions. If your total deductions (80C, 80D, HRA, home loan interest) exceed ₹3.75-4.5 lakh, the old regime may save more tax. Use our calculator to compare.' },
  { q: 'What is the standard deduction in new regime 2026-27?', a: 'The standard deduction under the new tax regime for FY 2026-27 is ₹75,000. This is automatically available to all salaried employees and pensioners. No documentation or proof is needed.' },
  { q: 'Can I claim NPS deduction under new regime?', a: 'You cannot claim the self-contribution deduction of ₹50,000 under 80CCD(1B) in the new regime. However, employer NPS contribution under 80CCD(2) — up to 14% of basic salary for government employees and 10% for others — is allowed even in the new regime.' },
  { q: 'How much tax is zero under the new regime?', a: 'Under the new regime for FY 2026-27, income up to ₹12,75,000 (₹12 lakh taxable income + ₹75,000 standard deduction) is effectively tax-free thanks to the Section 87A rebate. This makes the new regime very attractive for most salaried employees.' },
  { q: 'Can I switch between old and new regime every year?', a: 'Yes, salaried employees can switch between old and new regime every financial year. You choose at the time of filing your ITR. Business/professional income earners who opted out of the new regime can switch back only once.' },
]

export default function SaveTaxNewRegime() {
  return (
    <div style={s.page}>
      <SEOHead
        title="How to Save Tax Under New Tax Regime 2026-27 | DoAide TaxFile"
        description="Complete guide to saving tax under the new tax regime FY 2026-27. Standard deduction, NPS employer contribution, salary structuring, and investment strategies that work without deductions."
        keywords="save tax new regime, new tax regime deductions 2026-27, how to save tax new regime India, new regime tax saving tips, standard deduction new regime"
        canonical="https://tax.doaide.com/guides/save-tax-new-regime"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Save Tax New Regime' }]} />

      <h1 style={s.title}>How to Save Tax Under New Tax Regime 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 • 8 min read</p>

      <p style={s.p}>
        The new tax regime is the default option since FY 2023-24, and for good reason — it offers lower tax rates and
        zero tax on income up to ₹12.75 lakh. But what if your income is higher? While you can't claim most deductions
        under the new regime, there are still legitimate ways to reduce your tax burden. This guide covers every strategy available.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Key Fact</div>
        Under the new regime, income up to <strong>₹12,75,000</strong> is tax-free (₹12L taxable + ₹75K standard deduction).
        Compare with our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>.
      </div>

      <h2 style={s.h2}>New Regime Tax Slabs FY 2026-27</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Income Slab</th>
              <th style={s.th}>Tax Rate</th>
            </tr>
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
      </div>
      <p style={s.p}>
        Section 87A rebate: Tax liability up to ₹60,000 is fully rebated (effectively zero tax on ₹12L taxable income).
        Read the <Link to="/guides/income-tax-slabs-2026-27" style={s.link}>complete tax slabs guide</Link> for detailed examples.
      </p>

      <h2 style={s.h2}>Deductions Still Available Under New Regime</h2>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>1. Standard Deduction — ₹75,000</div>
        <div>Automatically available to all salaried employees and pensioners. No investment or documentation needed. Reduces your taxable income from gross salary by ₹75,000.</div>
        <div style={{ marginTop: 4 }}><span style={s.tipSaving}>Tax saved: up to ₹23,400 (at 30% + cess)</span></div>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>2. Employer NPS Contribution — 80CCD(2)</div>
        <div>If your employer contributes to NPS, up to 14% of basic salary (government) or 10% (private) is deductible even under the new regime. This is one of the most powerful deductions available. Ask your HR to include employer NPS contribution in your CTC.</div>
        <div style={{ marginTop: 4 }}><span style={s.tipSaving}>Tax saved: varies by salary (₹15K-₹1L+ possible)</span></div>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>3. Interest on Let-out Property</div>
        <div>If you have a rented-out property with a home loan, the interest paid can be claimed against rental income under the new regime. The full interest amount is deductible (no ₹2L cap on let-out property). This can reduce or eliminate your rental income tax.</div>
        <div style={{ marginTop: 4 }}><span style={s.tipSaving}>Tax saved: depends on interest and rental income</span></div>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>4. Employer Contribution to EPF/Superannuation</div>
        <div>Employer's contributions to EPF, NPS, and superannuation fund (combined up to ₹7.5 lakh per year) are not taxable under either regime. This is part of your CTC, not a choice you make.</div>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>5. Agniveer Corpus Fund — 80CCH</div>
        <div>For Agniveers, contributions to the Agniveer Corpus Fund are deductible under the new regime.</div>
      </div>

      <h2 style={s.h2}>Smart Strategies for New Regime Taxpayers</h2>

      <h3 style={s.h3}>Maximize Employer NPS Contribution</h3>
      <p style={s.p}>
        This is the single biggest tax-saving move under the new regime. If your basic salary is ₹8,00,000 and your
        employer contributes 10% to NPS, that's ₹80,000 deduction under 80CCD(2). At 30% tax slab, you save ₹24,960.
        Talk to your HR about restructuring your CTC to include employer NPS.
      </p>

      <h3 style={s.h3}>Invest for Post-Tax Returns (Not Deductions)</h3>
      <p style={s.p}>
        Since most deductions don't apply, focus on investments with the best post-tax returns. Consider equity mutual funds
        (LTCG up to ₹1.25L is tax-free annually), PPF (interest is fully tax-free), and NPS (even without deduction, the
        returns compound tax-free until withdrawal). Use our <Link to="/sip-calculator" style={s.link}>SIP Calculator</Link> and{' '}
        <Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link> to plan.
      </p>

      <h3 style={s.h3}>Tax Harvest Your Equity Gains</h3>
      <p style={s.p}>
        Regardless of tax regime, you can book equity LTCG up to ₹1.25 lakh per year tax-free. For a portfolio of ₹10L+,
        this strategy alone can save ₹15,000+ per year. Use our{' '}
        <Link to="/tax-loss-harvesting" style={s.link}>Tax Loss Harvesting Calculator</Link>.
      </p>

      <h3 style={s.h3}>Use Tax-Free Allowances</h3>
      <p style={s.p}>
        Some allowances are tax-free under both regimes: transport allowance for disabled employees, conveyance allowance
        for expenditure on commuting, and reimbursement of expenses for official duties. Ensure your salary structure
        includes these where applicable.
      </p>

      <h2 style={s.h2}>When to Consider Switching to Old Regime</h2>
      <p style={s.p}>
        The new regime isn't always better. If your total available deductions exceed the break-even point, the old regime
        saves more. Here's a quick check:
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Gross Income</th>
              <th style={s.th}>Break-even Deductions</th>
              <th style={s.th}>Typical Sources</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>₹10-12L</td><td style={s.tdMono}>₹3.5-3.75L</td><td style={s.td}>80C + HRA + 80D</td></tr>
            <tr><td style={s.td}>₹12-15L</td><td style={s.tdMono}>₹3.75-4.25L</td><td style={s.td}>80C + HRA + 80D + NPS</td></tr>
            <tr><td style={s.td}>₹15-20L</td><td style={s.tdMono}>₹4.25-4.75L</td><td style={s.td}>80C + HRA + 80D + Home Loan + NPS</td></tr>
            <tr><td style={s.td}>₹20L+</td><td style={s.tdMono}>₹5L+</td><td style={s.td}>All major deductions fully used</td></tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> with your actual numbers —
        it compares both regimes side by side and recommends the better one.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Pro Tip</div>
        Even under the new regime, investments like EPF, PPF, and ELSS remain excellent choices for wealth building.
        The tax deduction is gone, but the returns are still attractive and (in the case of PPF) completely tax-free.
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <WhatsAppShare text="How to Save Tax Under New Tax Regime 2026-27 — Complete Guide\n\ntax.doaide.com/guides/save-tax-new-regime" />
        <PrintButton />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
