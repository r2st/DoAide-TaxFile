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
}

const FAQS = [
  { q: 'Which tax regime should I choose for FY 2026-27?', a: 'If your total deductions (80C, 80D, HRA, home loan) exceed ₹3-4 lakh, the old regime likely saves more. For incomes below ₹12.75 lakh with minimal deductions, the new regime gives zero tax. Use our Income Tax Calculator to compare with your actual numbers.' },
  { q: 'Is the standard deduction available in both regimes?', a: 'Yes, standard deduction of ₹75,000 is available in the new regime and ₹50,000 in the old regime. It is deducted from salary income automatically — no proof or investment needed.' },
  { q: 'What is the Section 87A rebate for FY 2026-27?', a: 'Under the new regime, taxable income up to ₹12 lakh gets a rebate of up to ₹60,000, making tax zero. Under the old regime, income up to ₹5 lakh gets a rebate of up to ₹12,500. The rebate applies after calculating tax but before adding cess.' },
  { q: 'Can salaried employees switch between old and new regime every year?', a: 'Yes, salaried individuals can switch between old and new regime every financial year by informing their employer. Those with business income can switch from new to old only once in their lifetime.' },
  { q: 'Is surcharge applicable on income above ₹50 lakh?', a: 'Yes, surcharge applies on total income: 10% (₹50L-1Cr), 15% (₹1Cr-2Cr), 25% (₹2Cr-5Cr), 37% (above ₹5Cr under old regime, capped at 25% under new regime). Plus 4% health and education cess on tax + surcharge.' },
]

export default function IncomeTaxSlabs2026() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Income Tax Slabs 2026-27 — Old vs New Regime Complete Guide | DoAide TaxFile"
        description="Complete guide to income tax slabs for FY 2026-27 (AY 2027-28). Compare old and new regime rates, exemptions, rebates, surcharge, and find which regime saves you more tax."
        keywords="income tax slabs 2026-27, new regime tax slabs, old regime slabs, income tax rates India 2026"
        canonical="https://tax.doaide.com/blog/income-tax-slabs-2026-27"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Income Tax Slabs 2026-27' }]} />

      <h1 style={s.title}>Income Tax Slabs 2026-27 — Old vs New Regime Complete Guide</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) · October 2026 · 15 min read</p>

      <p style={s.p}>
        India offers two income tax regimes — the New Tax Regime (default since FY 2023-24) and the Old Tax Regime.
        The new regime has lower rates but fewer deductions, while the old regime allows all deductions (80C, 80D, HRA, etc.)
        but has higher slab rates. Choosing correctly can save you ₹50,000+ in tax. This guide covers both regimes
        with complete slab tables, worked examples, and a decision framework.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Calculator</div>
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compare both regimes with your actual salary, deductions, and HRA — see exactly which regime saves more.
      </div>

      <h2 style={s.h2}>New Regime Tax Slabs FY 2026-27 (Default)</h2>
      <p style={s.p}>
        The new regime is the default option. It offers lower tax rates with a standard deduction of ₹75,000.
        Most deductions (80C, 80D, HRA, LTA) are not available. Key benefit: taxable income up to ₹12 lakh
        pays zero tax thanks to Section 87A rebate.
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

      <h3 style={s.h3}>New Regime — Allowed Deductions</h3>
      <ul style={s.ul}>
        <li>Standard deduction: ₹75,000</li>
        <li>Employer NPS contribution: Section 80CCD(2) — up to 14% of basic salary</li>
        <li>Family pension deduction: ₹25,000 or 1/3 of pension, whichever is lower</li>
        <li>Gratuity and leave encashment exemptions</li>
        <li>Transport allowance for disabled persons</li>
      </ul>

      <h2 style={s.h2}>Old Regime Tax Slabs FY 2026-27</h2>
      <p style={s.p}>
        The old regime allows all deductions but has higher slab rates and only ₹50,000 standard deduction.
        Choose this if your total deductions exceed ₹3-4 lakh.
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

      <h3 style={s.h3}>Old Regime — Key Deductions Available</h3>
      <ul style={s.ul}>
        <li>Section 80C: Up to ₹1.5 lakh (PPF, ELSS, LIC, EPF, NSC, SSY, tuition fees)</li>
        <li>Section 80D: Health insurance — ₹25,000 self + ₹25,000 parents (₹50,000 if senior)</li>
        <li>Section 80CCD(1B): Additional NPS — ₹50,000 over and above 80C limit</li>
        <li>HRA exemption: Based on rent paid, salary, and city (metro vs non-metro)</li>
        <li>Section 24: Home loan interest — up to ₹2,00,000 for self-occupied property</li>
        <li>Section 80E: Education loan interest — no upper limit</li>
        <li>Section 80G: Donations to approved funds — 50% or 100% deduction</li>
        <li>Section 80TTA: Savings account interest — up to ₹10,000</li>
        <li>LTA: Leave travel allowance exemption — twice in a block of 4 years</li>
      </ul>
      <p style={s.p}>
        Plan your 80C investments with our <Link to="/80c-planner" style={s.link}>Section 80C Planner</Link>.
      </p>

      <h2 style={s.h2}>Old vs New Regime — When to Choose What</h2>

      <h3 style={s.h3}>Choose New Regime When:</h3>
      <ul style={s.ul}>
        <li>Your salary is below ₹12.75 lakh (zero tax under new regime)</li>
        <li>You have minimal deductions — no HRA, no home loan, low 80C investment</li>
        <li>You prefer simplicity — no need to invest in tax-saving instruments</li>
        <li>You are a freelancer or consultant with limited deduction options</li>
      </ul>

      <h3 style={s.h3}>Choose Old Regime When:</h3>
      <ul style={s.ul}>
        <li>Your total deductions exceed ₹3-4 lakh (HRA + 80C + 80D + home loan)</li>
        <li>You pay rent in a metro city and claim HRA exemption</li>
        <li>You have a home loan with interest above ₹1.5 lakh/year</li>
        <li>You invest in NPS (additional ₹50,000 under 80CCD(1B))</li>
        <li>You have high health insurance premiums (parents are senior citizens)</li>
      </ul>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Example Comparison — ₹15 LPA Salary</div>
        <p style={{ margin: 0 }}>
          <strong>New regime:</strong> Taxable = ₹15L − ₹75K (std deduction) = ₹14.25L → Tax = ₹1,12,500 + cess = ₹1,17,000<br />
          <strong>Old regime (₹4L deductions):</strong> Taxable = ₹15L − ₹50K − ₹4L = ₹10.5L → Tax = ₹1,12,500 + cess = ₹1,17,000<br />
          <strong>Old regime (₹5.5L deductions):</strong> Taxable = ₹15L − ₹50K − ₹5.5L = ₹9L → Tax = ₹82,500 + cess = ₹85,800<br />
          At ₹5.5L+ deductions, old regime saves ₹31,200. Use our <Link to="/income-tax-calculator" style={s.link}>calculator</Link> for your exact numbers.
        </p>
      </div>

      <h2 style={s.h2}>Section 87A Rebate Details</h2>
      <p style={s.p}>
        The Section 87A rebate makes tax effectively zero for lower incomes:
      </p>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Regime</th><th style={s.th}>Taxable Income Limit</th><th style={s.th}>Max Rebate</th><th style={s.th}>Effective Zero-Tax Income</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>New</td><td style={s.td}>₹12,00,000</td><td style={s.td}>₹60,000</td><td style={s.td}>₹12,75,000 (with ₹75K std deduction)</td></tr>
          <tr><td style={s.td}>Old</td><td style={s.td}>₹5,00,000</td><td style={s.td}>₹12,500</td><td style={s.td}>₹5,50,000 (with ₹50K std deduction)</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Note: If taxable income exceeds the limit by even ₹1, the entire rebate is lost. Careful planning to keep
        taxable income within the limit can save significant tax.
      </p>

      <h2 style={s.h2}>Surcharge and Cess</h2>
      <p style={s.p}>
        Income tax has additional components beyond the slab rates:
      </p>
      <ul style={s.ul}>
        <li><strong>Health and Education Cess:</strong> 4% on tax + surcharge (applies to all taxpayers)</li>
        <li><strong>Surcharge rates:</strong> 10% (₹50L-1Cr), 15% (₹1Cr-2Cr), 25% (₹2Cr-5Cr), 37% (above ₹5Cr old regime) / 25% cap (new regime)</li>
        <li><strong>Marginal relief:</strong> Surcharge cannot exceed the income above the threshold (prevents surcharge from exceeding the additional income)</li>
      </ul>

      <h2 style={s.h2}>Tax Slabs for Senior Citizens</h2>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Category</th><th style={s.th}>Age</th><th style={s.th}>Basic Exemption (Old Regime)</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>Individual (below 60)</td><td style={s.td}>&lt;60</td><td style={s.td}>₹2,50,000</td></tr>
          <tr><td style={s.td}>Senior Citizen</td><td style={s.td}>60-79</td><td style={s.td}>₹3,00,000</td></tr>
          <tr><td style={s.td}>Super Senior Citizen</td><td style={s.td}>80+</td><td style={s.td}>₹5,00,000</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Note: In the new regime, the basic exemption is ₹4,00,000 for all age groups. Senior citizen benefit
        of higher exemption is only under the old regime. Use our <Link to="/senior-citizen-calculator" style={s.link}>Senior Citizen Calculator</Link>.
      </p>

      <h2 style={s.h2}>Tax-Saving Strategies for FY 2026-27</h2>
      <ul style={s.ul}>
        <li><strong>Max out 80C (₹1.5 lakh):</strong> EPF contribution + PPF + ELSS SIP. Use our <Link to="/80c-planner" style={s.link}>80C Planner</Link></li>
        <li><strong>Health insurance (80D):</strong> Get policies for self (₹25K) and parents (₹50K if senior) = ₹75K deduction</li>
        <li><strong>NPS (80CCD(1B)):</strong> Additional ₹50K deduction beyond 80C limit. Explore with our <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link></li>
        <li><strong>Home loan interest (Sec 24):</strong> Up to ₹2L deduction on self-occupied property interest</li>
        <li><strong>HRA planning:</strong> If you pay rent and receive HRA, calculate exemption with our <Link to="/hra-calculator" style={s.link}>HRA Calculator</Link></li>
        <li><strong>Salary restructuring:</strong> Optimize CTC components — increase NPS, meal vouchers, LTA. Use our <Link to="/salary-tax-optimizer" style={s.link}>Salary Optimizer</Link></li>
      </ul>

      <h2 style={s.h2}>Important Due Dates</h2>
      <ul style={s.ul}>
        <li><strong>July 31, 2027:</strong> ITR filing deadline for salaried/non-audit cases (FY 2026-27)</li>
        <li><strong>October 31, 2027:</strong> ITR deadline for businesses requiring audit</li>
        <li><strong>December 31, 2027:</strong> Belated/revised return deadline</li>
        <li><strong>Advance tax:</strong> 15% by June 15, 45% by Sep 15, 75% by Dec 15, 100% by Mar 15</li>
      </ul>
      <p style={s.p}>
        File your return step-by-step with our <Link to="/blog/how-to-file-itr-online-free" style={s.link}>ITR Filing Guide</Link>.
      </p>

      <FAQSection faqs={FAQS} />

      <div style={s.callout}>
        <div style={s.calloutTitle}>Free Tax Tools</div>
        <ul style={{ ...s.ul, marginBottom: 0 }}>
          <li><Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — compare both regimes instantly</li>
          <li><Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> — optimize your tax-saving investments</li>
          <li><Link to="/hra-calculator" style={s.link}>HRA Calculator</Link> — calculate HRA exemption</li>
          <li><Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link> — side-by-side analysis</li>
          <li><Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> — restructure CTC for max savings</li>
        </ul>
      </div>
    </div>
  )
}
