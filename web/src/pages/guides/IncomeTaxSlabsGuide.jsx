import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import WhatsAppShare from '../../components/WhatsAppShare'

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
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
}

const FAQS = [
  { q: 'Which tax regime is better for FY 2026-27?', a: 'It depends on your deductions. If your total deductions (80C, 80D, HRA, home loan) exceed ₹3-4 lakh, the old regime may save more. For incomes below ₹12.75 lakh, the new regime gives zero tax. Use our calculator to compare with your actual numbers.' },
  { q: 'Can I switch between old and new regime?', a: 'Salaried individuals can switch between regimes every financial year. However, those with business income can only switch once in their lifetime from the new regime back to the old regime.' },
  { q: 'What is the Section 87A rebate in FY 2026-27?', a: 'Under the new regime, if your taxable income is up to ₹12 lakh, you get a rebate of up to ₹60,000, making your tax zero. Under the old regime, the rebate is ₹12,500 for taxable income up to ₹5 lakh.' },
  { q: 'Is surcharge applicable on income tax?', a: 'Yes, surcharge applies on incomes above ₹50 lakh: 10% (₹50L-1Cr), 15% (₹1Cr-2Cr), 25% (₹2Cr-5Cr), and 37% (above ₹5Cr). Additionally, 4% health and education cess applies on tax + surcharge.' },
  { q: 'What is the standard deduction for FY 2026-27?', a: 'The standard deduction is ₹75,000 under the new regime and ₹50,000 under the old regime. It is automatically deducted from salary income — no investment or proof is needed.' },
]

export default function IncomeTaxSlabsGuide() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Income Tax Slabs FY 2026-27: Old vs New Regime Complete Guide | DoAide TaxFile"
        description="Complete guide to income tax slabs for FY 2026-27 (AY 2027-28). Compare old and new regime rates, exemptions, rebates, and find which regime saves you more tax."
        keywords="income tax slabs 2026-27, new regime tax slabs, old regime tax slabs, income tax rates India, AY 2027-28 tax slabs"
        canonical="https://tax.doaide.com/guides/income-tax-slabs-2026-27"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Income Tax Slabs FY 2026-27' }]} />

      <h1 style={s.title}>Income Tax Slabs FY 2026-27: Old vs New Regime Complete Guide</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) • 8 min read</p>

      <p style={s.p}>
        The Indian income tax system offers two tax regimes for individual taxpayers — the New Tax Regime (default since FY 2023-24)
        and the Old Tax Regime. Each has its own slab rates, deductions, and exemptions. Choosing the right regime can save you
        tens of thousands of rupees in tax. This guide breaks down both regimes with complete slab tables, worked examples,
        and a decision framework to help you choose.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Tool</div>
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compare both regimes with your actual numbers instantly.
      </div>

      <h2 style={s.h2}>New Regime Tax Slabs (Default)</h2>
      <p style={s.p}>
        The new regime is the default option since FY 2023-24. It offers lower tax rates but allows only a standard deduction
        of ₹75,000. Most other deductions (80C, 80D, HRA) are not available. A key benefit: if your taxable income is up to ₹12 lakh,
        you pay zero tax thanks to the Section 87A rebate of up to ₹60,000.
      </p>

      <table style={s.table}>
        <thead><tr><th style={s.th}>Income Range</th><th style={s.th}>Tax Rate</th></tr></thead>
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

      <h2 style={s.h2}>Old Regime Tax Slabs</h2>
      <p style={s.p}>
        The old regime has higher base tax rates but allows a wide range of deductions and exemptions — 80C (₹1.5L), 80D (health insurance),
        HRA exemption, home loan interest (₹2L under Section 24b), NPS (₹50K extra under 80CCD 1B), and more. If your total deductions
        are substantial, the old regime can result in lower tax than the new regime.
      </p>

      <table style={s.table}>
        <thead><tr><th style={s.th}>Income Range</th><th style={s.th}>Tax Rate</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>Up to ₹2,50,000</td><td style={s.td}>Nil</td></tr>
          <tr><td style={s.td}>₹2,50,001 – ₹5,00,000</td><td style={s.td}>5%</td></tr>
          <tr><td style={s.td}>₹5,00,001 – ₹10,00,000</td><td style={s.td}>20%</td></tr>
          <tr><td style={s.td}>Above ₹10,00,000</td><td style={s.td}>30%</td></tr>
        </tbody>
      </table>

      <p style={s.p}>
        Senior citizens (60-79 years) get a higher basic exemption of ₹3,00,000, and super senior citizens (80+) get ₹5,00,000
        under the old regime. These higher limits do not apply under the new regime.
      </p>

      <h2 style={s.h2}>Worked Examples</h2>

      <h3 style={s.h3}>Example 1: ₹8 Lakh Income</h3>
      <p style={s.p}>
        <strong>New Regime:</strong> Taxable = ₹8L - ₹75K (standard deduction) = ₹7,25,000. Tax = ₹4L×0% + ₹3.25L×5% = ₹16,250.
        Since taxable income is under ₹12L, rebate of ₹16,250 applies. <strong>Total tax: ₹0.</strong><br />
        <strong>Old Regime (no deductions):</strong> Taxable = ₹8L - ₹50K = ₹7,50,000. Tax = ₹2.5L×0% + ₹2.5L×5% + ₹2.5L×20% = ₹62,500 + 4% cess = ₹65,000.
        With ₹1.5L 80C deductions: taxable = ₹6L, tax = ₹32,500 + cess = ₹33,800. <strong>New regime wins for most people at this income.</strong>
      </p>

      <h3 style={s.h3}>Example 2: ₹12 Lakh Income</h3>
      <p style={s.p}>
        <strong>New Regime:</strong> Taxable = ₹12L - ₹75K = ₹11,25,000. Tax = ₹4L×0% + ₹4L×5% + ₹3.25L×10% = ₹52,500.
        Still under ₹12L taxable, so rebate of ₹52,500 applies. <strong>Total tax: ₹0.</strong><br />
        <strong>Old Regime (₹2.5L deductions):</strong> Taxable = ₹12L - ₹50K - ₹2.5L = ₹9L. Tax = ₹1,12,500 + cess = ₹1,17,000.
        <strong>New regime clearly wins at ₹12L.</strong>
      </p>

      <h3 style={s.h3}>Example 3: ₹20 Lakh Income</h3>
      <p style={s.p}>
        <strong>New Regime:</strong> Taxable = ₹19,25,000. Tax = ₹20K + ₹40K + ₹60K + ₹65K = ₹1,85,000 + surcharge 0 + cess = ₹1,92,400.<br />
        <strong>Old Regime (₹4.5L deductions including HRA, 80C, 80D, NPS):</strong> Taxable = ₹15L. Tax = ₹2,62,500 + cess = ₹2,73,000.
        Even with heavy deductions, <strong>new regime saves ~₹80K at ₹20L income.</strong>
      </p>

      <h3 style={s.h3}>Example 4: ₹50 Lakh Income</h3>
      <p style={s.p}>
        <strong>New Regime:</strong> Taxable = ₹49,25,000. Tax = ₹20K + ₹40K + ₹60K + ₹80K + ₹1L + ₹7,57,500 = ₹10,57,500 + cess = ₹10,99,800.<br />
        <strong>Old Regime (₹5L+ deductions):</strong> Taxable = ₹44.5L. Tax = ₹11,10,000 + cess = ₹11,54,400.
        At ₹50L, <strong>new regime saves ~₹55K</strong> even compared to heavy old-regime deductions.
      </p>

      <h2 style={s.h2}>When to Choose the Old Regime</h2>
      <p style={s.p}>
        The old regime may still be better if you have a combination of: large HRA exemption (living in a metro with high rent),
        home loan interest deduction (₹2L under Section 24b), full 80C exhaustion (₹1.5L), health insurance for parents (80D up to ₹50K for senior parents),
        and NPS contribution (₹50K under 80CCD 1B). In general, if your total deductions exceed ₹3.75 lakh at lower incomes
        or ₹4.5 lakh at higher incomes, it is worth comparing both.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Optimize Your Salary</div>
        Use our <Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> to find the best CTC structure,
        or the <Link to="/take-home-salary-calculator" style={s.link}>Take-Home Salary Calculator</Link> to see your exact in-hand salary.
      </div>

      <h2 style={s.h2}>Surcharge and Cess</h2>
      <p style={s.p}>
        A health and education cess of 4% applies on the total tax (including surcharge). Surcharge rates for FY 2026-27 are:
        10% for income above ₹50 lakh, 15% above ₹1 crore, 25% above ₹2 crore, and 37% above ₹5 crore. Under the new regime,
        the maximum surcharge rate is 25% for incomes above ₹2 crore.
      </p>

      <h2 style={s.h2}>Key Changes in FY 2026-27</h2>
      <p style={s.p}>
        The new regime standard deduction was increased to ₹75,000 (from ₹50,000). The Section 87A rebate limit was raised to
        ₹12 lakh taxable income with a rebate of up to ₹60,000. The slab structure was revised with wider bands and a new 25% slab.
        These changes make the new regime significantly more beneficial for most taxpayers.
      </p>

      <div style={{ marginTop: 32 }}>
        <WhatsAppShare text="Income Tax Slabs FY 2026-27 — Complete guide comparing old vs new regime with worked examples\n\ntax.doaide.com/guides/income-tax-slabs-2026-27" />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
