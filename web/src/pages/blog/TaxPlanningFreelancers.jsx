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
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14, display: 'block', overflowX: 'auto' },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)', whiteSpace: 'nowrap' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: { padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
}

const FAQS = [
  { q: 'Which ITR form should freelancers file?', a: 'If your gross receipts are below ₹50 lakh and you opt for presumptive taxation (Section 44ADA), file ITR-4 (Sugam). Otherwise, file ITR-3 with full books of accounts.' },
  { q: 'What is presumptive taxation under Section 44ADA?', a: 'Section 44ADA allows professionals (doctors, lawyers, architects, engineers, etc.) with gross receipts up to ₹50 lakh to declare 50% of receipts as income without maintaining detailed books. If receipts are via digital modes, the threshold is ₹75 lakh.' },
  { q: 'Do freelancers need to pay advance tax?', a: 'Yes, if your total tax liability after TDS exceeds ₹10,000. Freelancers under presumptive taxation (44ADA) can pay entire advance tax by March 15 in a single installment instead of quarterly.' },
  { q: 'Can freelancers claim 80C and other deductions?', a: 'Yes, under the old tax regime, freelancers can claim all deductions — 80C, 80D, NPS, home loan interest, etc. Under the new regime, only the standard deduction of ₹75,000 is available (not applicable to business income).' },
  { q: 'How is TDS handled for freelancers?', a: 'Clients deduct TDS at 10% under Section 194J for professional fees above ₹30,000. If you don\'t have a PAN, TDS is 20%. You can claim this TDS as credit when filing your return.' },
]

export default function TaxPlanningFreelancers() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Tax Planning for Freelancers in India 2026 — Complete Guide | DoAide TaxFile"
        description="Complete tax planning guide for freelancers and gig workers in India. ITR forms, presumptive taxation (44ADA), advance tax, TDS, deductions, and tax-saving strategies for FY 2026-27."
        keywords="freelancer tax India, tax planning freelancers, Section 44ADA, ITR for freelancers, gig worker tax, freelance income tax"
        canonical="https://tax.doaide.com/blog/tax-planning-freelancers-india"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Tax Planning for Freelancers' }]} />

      <h1 style={s.title}>Tax Planning for Freelancers & Gig Workers in India — Complete Guide 2026</h1>
      <p style={s.meta}>Updated for FY 2026-27 · October 2026 · 12 min read</p>

      <p style={s.p}>
        India's freelance and gig economy is booming — from software developers and designers to content creators, consultants,
        and delivery partners. But tax planning for freelancers is very different from salaried individuals. This guide covers
        everything you need to know: choosing the right ITR form, presumptive taxation, advance tax obligations, deductible
        expenses, and smart tax-saving strategies.
      </p>

      <h2 style={s.h2}>How Freelance Income Is Taxed</h2>
      <p style={s.p}>
        Freelance income is classified as "Income from Business or Profession" under the Income Tax Act.
        Unlike salaried income where your employer handles TDS and provides Form 16, freelancers must:
      </p>
      <ul style={s.ul}>
        <li>Track all income and expenses themselves</li>
        <li>Pay advance tax quarterly (or in a single installment under presumptive tax)</li>
        <li>File ITR-3 or ITR-4 instead of ITR-1</li>
        <li>Maintain books of accounts (unless using presumptive taxation)</li>
      </ul>

      <h2 style={s.h2}>Presumptive Taxation — The Simple Route</h2>
      <h3 style={s.h3}>Section 44ADA for Professionals</h3>
      <p style={s.p}>
        If you're a professional (as defined in Section 44AA) with gross receipts up to ₹50 lakh (₹75 lakh if 95%+ receipts
        are digital), you can declare 50% of gross receipts as taxable income. No need to maintain books of accounts or
        get an audit.
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Parameter</th>
            <th style={s.th}>Section 44ADA</th>
            <th style={s.th}>Regular (Non-Presumptive)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Eligible</td><td style={s.td}>Specified professionals</td><td style={s.td}>All freelancers</td></tr>
          <tr><td style={s.td}>Receipts limit</td><td style={s.td}>₹50L (₹75L digital)</td><td style={s.td}>No limit</td></tr>
          <tr><td style={s.td}>Deemed income</td><td style={s.td}>50% of receipts</td><td style={s.td}>Actual profit</td></tr>
          <tr><td style={s.td}>Books required</td><td style={s.td}>No</td><td style={s.td}>Yes</td></tr>
          <tr><td style={s.td}>Audit</td><td style={s.td}>Not required</td><td style={s.td}>Required if turnover exceeds limit</td></tr>
          <tr><td style={s.td}>ITR form</td><td style={s.td}>ITR-4</td><td style={s.td}>ITR-3</td></tr>
          <tr><td style={s.td}>Advance tax</td><td style={s.td}>Single payment by Mar 15</td><td style={s.td}>Quarterly installments</td></tr>
        </tbody>
      </table>

      <h3 style={s.h3}>Section 44AD for Business Freelancers</h3>
      <p style={s.p}>
        If you run a freelance business (not a profession), Section 44AD applies. Declare 6% of digital receipts or 8% of
        cash receipts as income, with a turnover limit of ₹2 crore (₹3 crore if 95%+ digital).
      </p>

      <h2 style={s.h2}>Deductible Business Expenses</h2>
      <p style={s.p}>
        If you're not using presumptive taxation, you can deduct legitimate business expenses to reduce taxable income:
      </p>
      <ul style={s.ul}>
        <li><strong>Equipment:</strong> Laptop, phone, software subscriptions (depreciation applies)</li>
        <li><strong>Internet and phone bills:</strong> Proportionate business use</li>
        <li><strong>Coworking space / office rent:</strong> Fully deductible</li>
        <li><strong>Professional development:</strong> Courses, certifications, books</li>
        <li><strong>Travel:</strong> Business-related travel expenses</li>
        <li><strong>Health insurance:</strong> Claimed under Section 80D (not as business expense)</li>
        <li><strong>Depreciation:</strong> On assets like computer, furniture, vehicle</li>
      </ul>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Important</div>
        Under presumptive taxation, expenses are already deemed included in the 50% deduction.
        You cannot claim additional expenses on top. If your actual expenses exceed 50% of receipts,
        consider filing ITR-3 with actual books instead.
      </div>

      <h2 style={s.h2}>Tax-Saving Strategies for Freelancers</h2>

      <h3 style={s.h3}>1. Maximize Section 80C (₹1.5L)</h3>
      <p style={s.p}>
        Invest in PPF, ELSS mutual funds, NPS, or tax-saver FDs. Use our{' '}
        <Link to="/80c-planner" style={s.link}>80C Investment Planner</Link> to optimize your allocation.
      </p>

      <h3 style={s.h3}>2. NPS for Additional ₹50,000 Deduction</h3>
      <p style={s.p}>
        Section 80CCD(1B) offers an additional ₹50,000 deduction over 80C. At the 30% slab, this saves ₹15,600.
        Check the <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link> for projected returns.
      </p>

      <h3 style={s.h3}>3. Health Insurance — Section 80D</h3>
      <p style={s.p}>
        Get comprehensive health insurance for yourself (₹25,000 deduction) and parents (₹25-50,000).
        Freelancers don't have employer-provided coverage, making this even more important. Use our{' '}
        <Link to="/80d-calculator" style={s.link}>80D Calculator</Link>.
      </p>

      <h3 style={s.h3}>4. Choose the Right Tax Regime</h3>
      <p style={s.p}>
        Freelancers with business income should carefully compare old and new regimes. The old regime allows all
        deductions and expense claims, while the new regime has lower rates but almost no deductions for business income.
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compare.
      </p>

      <h3 style={s.h3}>5. Pay Advance Tax on Time</h3>
      <p style={s.p}>
        Avoid interest under Section 234B and 234C by paying advance tax. Under presumptive taxation,
        pay the entire tax by March 15. Otherwise, follow quarterly installments.
        Use the <Link to="/advance-tax-calculator" style={s.link}>Advance Tax Calculator</Link>.
      </p>

      <h2 style={s.h2}>TDS on Freelance Income</h2>
      <p style={s.p}>
        Clients are required to deduct TDS on payments to freelancers. Common rates:
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Section</th>
            <th style={s.th}>Payment Type</th>
            <th style={s.th}>TDS Rate</th>
            <th style={s.th}>Threshold</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>194J</td><td style={s.td}>Professional fees</td><td style={s.td}>10%</td><td style={s.td}>₹30,000/year</td></tr>
          <tr><td style={s.td}>194C</td><td style={s.td}>Contractor (individual)</td><td style={s.td}>1%</td><td style={s.td}>₹30,000/txn or ₹1L/year</td></tr>
          <tr><td style={s.td}>194H</td><td style={s.td}>Commission</td><td style={s.td}>5%</td><td style={s.td}>₹15,000/year</td></tr>
          <tr><td style={s.td}>194-O</td><td style={s.td}>E-commerce operator</td><td style={s.td}>1%</td><td style={s.td}>₹5 lakh/year</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Verify your TDS credits in Form 26AS / AIS on the income tax portal. Use our{' '}
        <Link to="/tds-calculator" style={s.link}>TDS Calculator</Link> to estimate deductions.
      </p>

      <h2 style={s.h2}>Which ITR Form Should Freelancers File?</h2>
      <ul style={s.ul}>
        <li><strong>ITR-4 (Sugam):</strong> If using presumptive taxation (44AD/44ADA) with income up to ₹50 lakh</li>
        <li><strong>ITR-3:</strong> If maintaining actual books, or income exceeds presumptive limits, or if you have capital gains</li>
      </ul>
      <p style={s.p}>
        Use our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> to find the right form in 2 minutes.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Plan Your Freelance Taxes</div>
        Use the <Link to="/tax-saving-calculator" style={s.link}>Tax Saving Calculator</Link> to find all available deductions
        and optimize your tax liability. It's free, instant, and requires no login.
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
