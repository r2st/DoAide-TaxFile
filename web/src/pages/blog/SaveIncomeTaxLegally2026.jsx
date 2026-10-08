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
  { q: 'Is it legal to save tax in India?', a: 'Yes, absolutely. The Income Tax Act itself provides numerous deductions and exemptions (Sections 80C, 80D, 80G, 24(b), etc.) specifically designed to encourage savings and investment. Tax planning — arranging your finances to legally minimise tax — is completely legal. Tax evasion (hiding income or misreporting) is illegal, but tax avoidance through legitimate deductions is your right.' },
  { q: 'What is the maximum tax I can save under Section 80C?', a: 'The maximum deduction under Section 80C is ₹1,50,000 per financial year. At the highest slab rate of 30% plus 4% cess, this translates to a tax saving of up to ₹46,800. Investments qualifying include PPF, ELSS, NPS (Tier I), NSC, tax-saver FD, LIC premiums, tuition fees, and home loan principal repayment.' },
  { q: 'Can I save tax under the new regime?', a: 'The new regime offers very limited deduction options. You get a standard deduction of ₹75,000, employer NPS contribution under 80CCD(2), and the Section 87A rebate making income up to ₹12.75 lakh effectively tax-free. Most deductions like 80C, 80D, HRA, and home loan interest are not available. If your total deductions under the old regime are below ₹3.75 lakh, the new regime usually works out better due to lower slab rates.' },
  { q: 'What is the best tax saving investment for 2026?', a: 'It depends on your risk appetite and goals. For high returns with short lock-in, ELSS mutual funds (3-year lock-in, 12-15% historical returns) are hard to beat. For guaranteed returns with safety, PPF (7.1%, 15-year lock-in) is ideal. NPS gives an additional ₹50,000 deduction under 80CCD(1B) beyond the 80C limit. For health insurance, 80D provides up to ₹1 lakh deduction for families with senior citizen parents.' },
  { q: 'Is NPS better than PPF for tax saving?', a: 'Both serve different purposes. PPF offers guaranteed 7.1% returns, EEE tax status (exempt at every stage), and a 15-year lock-in. NPS offers market-linked returns (8-12% historically), an extra ₹50,000 deduction under 80CCD(1B), but partial taxability on withdrawal (60% lump sum is exempt, 40% annuity is taxed as income). For pure tax saving with safety, PPF is simpler. For retirement planning with an extra deduction, NPS adds value.' },
  { q: 'How much tax can a person earning ₹15 lakh save?', a: 'Under the old regime with full deductions: 80C (₹1.5L) + 80D (₹25K-₹1L) + NPS 80CCD(1B) (₹50K) + HRA (varies, say ₹2L) + home loan interest (₹2L) can reduce taxable income from ₹15L to around ₹8.75L, saving approximately ₹1.5-2 lakh in tax. Under the new regime, tax on ₹15L is about ₹1.17L (after ₹75K standard deduction). Compare both with our calculator to find which saves more for your specific situation.' },
]

export default function SaveIncomeTaxLegally2026() {
  return (
    <div style={s.page}>
      <SEOHead
        title="How to Save Income Tax Legally in India 2026 — Complete Guide | DoAide TaxFile"
        description="Complete guide to saving income tax legally in India for FY 2026-27. Section 80C, 80D, HRA, NPS, home loan benefits and 10+ strategies with exact amounts and calculation."
        keywords="how to save income tax legally India 2026, tax saving tips India, income tax saving strategies, save tax FY 2026-27"
        canonical="https://tax.doaide.com/blog/how-to-save-income-tax-legally-india-2026"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'How to Save Income Tax Legally in India 2026' }]} />

      <h1 style={s.title}>How to Save Income Tax Legally in India 2026 — Complete Guide</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) · October 2026 · 14 min read</p>

      <p style={s.p}>
        Every rupee you save in tax is a rupee you can invest. The Indian Income Tax Act offers dozens of deductions
        and exemptions designed to reduce your tax burden — but most taxpayers claim only a fraction of what they are
        entitled to. This guide covers every major tax-saving avenue for FY 2026-27, with exact limits, real examples,
        and links to our free calculators so you can plan your own savings down to the last rupee.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Start</div>
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to see your tax under both
        regimes with all deductions applied — then come back to optimize further.
      </div>

      <h2 style={s.h2}>1. Section 80C — The Foundation of Tax Saving (₹1.5 Lakh)</h2>
      <p style={s.p}>
        Section 80C is the most widely used deduction. It allows up to ₹1,50,000 in deductions across a wide range
        of investments and expenses. At the 30% slab, this alone saves ₹46,800 in tax.
      </p>
      <ul style={s.ul}>
        <li><strong>PPF (Public Provident Fund)</strong> — 7.1% guaranteed, 15-year lock-in, fully tax-free (EEE)</li>
        <li><strong>ELSS Mutual Funds</strong> — 12-15% historical returns, 3-year lock-in, LTCG taxed above ₹1.25L</li>
        <li><strong>NPS Tier-I</strong> — market-linked, retirement focus, extra ₹50K under 80CCD(1B)</li>
        <li><strong>NSC (National Savings Certificate)</strong> — 7.7%, 5-year lock-in, interest taxable</li>
        <li><strong>Tax-Saver FD</strong> — 6.5-7%, 5-year lock-in, interest taxable</li>
        <li><strong>SSY (Sukanya Samriddhi Yojana)</strong> — 8.2%, for girl child, fully tax-free</li>
        <li><strong>EPF (Employee Provident Fund)</strong> — employee contribution counts towards 80C</li>
        <li><strong>Life Insurance Premium</strong> — LIC and other policies (annual premium ≤10% of sum assured)</li>
        <li><strong>Home Loan Principal</strong> — repayment of housing loan principal</li>
        <li><strong>Tuition Fees</strong> — school/college fees for up to 2 children</li>
      </ul>
      <p style={s.p}>
        <Link to="/80c-planner" style={s.link}>Plan your ₹1.5L Section 80C allocation →</Link>
      </p>

      <h2 style={s.h2}>2. Section 80D — Health Insurance (₹25K to ₹1L)</h2>
      <p style={s.p}>
        Health insurance premiums paid for self, spouse, children, and parents qualify for deduction under Section 80D.
        This is in addition to the 80C limit.
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>For Whom</th><th style={s.th}>Below 60</th><th style={s.th}>Senior (60+)</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Self & Family</td><td style={s.td}>₹25,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>Parents</td><td style={s.td}>₹25,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>Preventive Health Checkup</td><td style={s.td} colSpan={2}>₹5,000 (within above limits)</td></tr>
          <tr><td style={{...s.td, fontWeight: 600}}>Maximum Total</td><td style={s.td}>₹50,000</td><td style={s.td}>₹1,00,000</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        <Link to="/80d-calculator" style={s.link}>Calculate your 80D deduction →</Link>
      </p>

      <h2 style={s.h2}>3. HRA Exemption for Salaried Employees</h2>
      <p style={s.p}>
        If you receive House Rent Allowance (HRA) as part of your salary and pay rent, you can claim HRA exemption
        under Section 10(13A). The exemption is the minimum of: (a) actual HRA received, (b) 50% of salary for
        metro cities (40% for non-metro), or (c) rent paid minus 10% of salary.
      </p>
      <p style={s.p}>
        For a salary of ₹12 lakh in Bangalore with ₹20,000/month rent, HRA exemption can be ₹1.5-2 lakh, saving
        ₹45,000-60,000 in tax at the 30% bracket.
      </p>
      <p style={s.p}>
        <Link to="/hra-calculator" style={s.link}>Calculate your exact HRA exemption →</Link>
      </p>

      <h2 style={s.h2}>4. NPS — Extra ₹50,000 Deduction Under 80CCD(1B)</h2>
      <p style={s.p}>
        The National Pension System offers an additional deduction of ₹50,000 under Section 80CCD(1B), over and above
        the ₹1.5 lakh 80C limit. This effectively gives you a ₹2 lakh total deduction ceiling. At the 30% bracket,
        the extra ₹50K saves ₹15,600 in tax.
      </p>
      <p style={s.p}>
        Employer NPS contributions under 80CCD(2) are also exempt — up to 14% of basic salary for central government
        employees and 10% for others. This deduction is available even in the new regime.
      </p>
      <p style={s.p}>
        <Link to="/nps-calculator" style={s.link}>Calculate NPS tax benefit →</Link>
      </p>

      <h2 style={s.h2}>5. Home Loan Tax Benefits (Up to ₹3.5L Deduction)</h2>
      <p style={s.p}>
        Home loans offer dual tax benefits: interest paid on the loan is deductible under Section 24(b) up to ₹2 lakh
        for a self-occupied property, and principal repayment qualifies under Section 80C up to ₹1.5 lakh (shared with
        other 80C investments).
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Section</th><th style={s.th}>Component</th><th style={s.th}>Limit</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>24(b)</td><td style={s.td}>Interest (self-occupied)</td><td style={s.td}>₹2,00,000</td></tr>
          <tr><td style={s.td}>24(b)</td><td style={s.td}>Interest (let-out)</td><td style={s.td}>No limit</td></tr>
          <tr><td style={s.td}>80C</td><td style={s.td}>Principal repayment</td><td style={s.td}>₹1,50,000</td></tr>
          <tr><td style={s.td}>80EEA</td><td style={s.td}>Additional interest (first home, loan before Mar 2022)</td><td style={s.td}>₹1,50,000</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        <Link to="/home-loan-calculator" style={s.link}>Calculate your home loan tax benefit →</Link>
      </p>

      <h2 style={s.h2}>6. Complete Tax Savings Checklist</h2>
      <p style={s.p}>
        Here is a summary of all major deductions available under the old regime:
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Section</th><th style={s.th}>Deduction</th><th style={s.th}>Limit</th><th style={s.th}>Max Tax Saved*</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>80C</td><td style={s.td}>PPF, ELSS, LIC, EPF, etc.</td><td style={s.td}>₹1,50,000</td><td style={s.td}>₹46,800</td></tr>
          <tr><td style={s.td}>80CCD(1B)</td><td style={s.td}>NPS additional</td><td style={s.td}>₹50,000</td><td style={s.td}>₹15,600</td></tr>
          <tr><td style={s.td}>80D</td><td style={s.td}>Health insurance</td><td style={s.td}>₹1,00,000</td><td style={s.td}>₹31,200</td></tr>
          <tr><td style={s.td}>24(b)</td><td style={s.td}>Home loan interest</td><td style={s.td}>₹2,00,000</td><td style={s.td}>₹62,400</td></tr>
          <tr><td style={s.td}>10(13A)</td><td style={s.td}>HRA exemption</td><td style={s.td}>Varies</td><td style={s.td}>Varies</td></tr>
          <tr><td style={s.td}>80E</td><td style={s.td}>Education loan interest</td><td style={s.td}>No limit</td><td style={s.td}>Varies</td></tr>
          <tr><td style={s.td}>80G</td><td style={s.td}>Donations</td><td style={s.td}>50-100%</td><td style={s.td}>Varies</td></tr>
          <tr><td style={s.td}>80TTA</td><td style={s.td}>Savings interest</td><td style={s.td}>₹10,000</td><td style={s.td}>₹3,120</td></tr>
        </tbody>
      </table>
      <p style={s.p}>*At 30% slab + 4% cess</p>

      <h2 style={s.h2}>7. Old Regime vs New Regime — Which to Choose?</h2>
      <p style={s.p}>
        The new regime (default since FY 2023-24) offers lower slab rates but almost no deductions. The old regime
        has higher rates but allows all the deductions listed above. The breakeven point is roughly ₹3.75 lakh in
        total deductions — if your deductions exceed this, the old regime usually saves more.
      </p>
      <div style={s.callout}>
        <div style={s.calloutTitle}>Compare Your Regimes</div>
        Use our <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link> tool to enter your
        exact salary, deductions, and HRA — see exactly which regime saves more for your situation.
      </div>

      <h2 style={s.h2}>8. Tax Saving for Freelancers and Professionals</h2>
      <p style={s.p}>
        Freelancers and professionals (doctors, lawyers, consultants, etc.) with gross receipts up to ₹75 lakh can
        opt for presumptive taxation under Section 44ADA. Under this scheme, only 50% of gross receipts is treated
        as taxable income — the remaining 50% is deemed as expenses, with no need to maintain detailed books.
      </p>
      <p style={s.p}>
        For example, a freelancer earning ₹20 lakh under 44ADA pays tax on only ₹10 lakh. Combined with 80C
        (₹1.5L) and NPS (₹50K) deductions, the taxable income drops to ₹8 lakh — resulting in significantly lower
        tax compared to the slab-rate calculation on ₹20 lakh.
      </p>

      <h2 style={s.h2}>9. Common Mistakes to Avoid</h2>
      <ol style={s.ol}>
        <li><strong>Investing only to save tax</strong> — Choose instruments based on your financial goals, not just tax savings. A 3-year ELSS lock-in beats a 5-year FD if you need liquidity.</li>
        <li><strong>Forgetting to submit proofs</strong> — Many salaried employees miss the investment proof submission deadline and end up paying higher TDS. Submit proofs to your employer on time.</li>
        <li><strong>Double-counting EPF</strong> — Your EPF contribution already counts towards 80C. If EPF is ₹1 lakh, you only need ₹50,000 more in other instruments to max out 80C.</li>
        <li><strong>Ignoring the new regime</strong> — If you have few deductions, the new regime may be better. Always compare both before choosing.</li>
        <li><strong>Not claiming HRA with rent receipts</strong> — If you pay rent but do not submit receipts, you lose a major exemption. Generate receipts with our <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link>.</li>
        <li><strong>Missing the advance tax deadlines</strong> — If your tax liability exceeds ₹10,000, pay advance tax in quarterly installments to avoid interest under Sections 234B and 234C.</li>
      </ol>

      <h2 style={s.h2}>Summary</h2>
      <p style={s.p}>
        A salaried individual earning ₹15-20 lakh can save ₹1.5-2.5 lakh in tax every year by fully utilising
        available deductions. Start with 80C (₹1.5L), add 80D health insurance (₹25-50K), claim HRA if applicable,
        contribute ₹50K to NPS for the extra deduction, and maximise home loan benefits if you have one. Use our
        free calculators to plan every deduction and choose the right regime.
      </p>

      <FAQSection faqs={FAQS} />

      <div style={{ marginTop: 40, padding: 20, background: 'var(--doaide-surface)', borderRadius: 'var(--doaide-radius-lg)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--doaide-gold)' }}>Related Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { to: '/income-tax-calculator', label: 'Income Tax Calculator' },
            { to: '/80c-planner', label: '80C Planner' },
            { to: '/80d-calculator', label: '80D Calculator' },
            { to: '/hra-calculator', label: 'HRA Calculator' },
            { to: '/nps-calculator', label: 'NPS Calculator' },
            { to: '/old-vs-new-regime', label: 'Old vs New Regime' },
            { to: '/home-loan-calculator', label: 'Home Loan Tax Benefit' },
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
