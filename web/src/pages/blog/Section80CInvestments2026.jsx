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
  { q: 'What is the maximum deduction under Section 80C?', a: 'The maximum deduction under Section 80C is ₹1.5 lakh per financial year. This includes all eligible investments and expenses combined — PPF, ELSS, LIC premiums, EPF, tuition fees, NSC, etc.' },
  { q: 'Is Section 80C available under the new tax regime?', a: 'No. Section 80C deductions are not available under the new tax regime (default since FY 2023-24). If you want to claim 80C deductions, you must opt for the old regime while filing your ITR.' },
  { q: 'Which 80C investment gives the best returns?', a: 'ELSS mutual funds historically deliver the highest returns (10-14% CAGR) with the shortest lock-in (3 years). However, returns are market-linked and not guaranteed. PPF (7.1%) and SSY (8.2%) offer guaranteed, tax-free returns with longer lock-in periods.' },
  { q: 'Can I invest in 80C instruments after March 31?', a: 'No. Investments must be made within the financial year (April 1 to March 31) to claim the deduction for that year. Investments made after March 31 count towards the next financial year\'s deduction.' },
  { q: 'Does EPF count under Section 80C?', a: 'Yes, the employee\'s contribution to EPF (12% of basic salary) is automatically eligible under Section 80C. However, the employer\'s contribution is not counted towards the ₹1.5 lakh limit.' },
]

const BLOG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Section 80C Deductions 2026: Complete List of Tax-Saving Investments',
  description: 'Complete list of all Section 80C tax-saving investments for FY 2026-27. Compare ELSS, PPF, NPS, SSY, NSC, FD, LIC — returns, lock-in, risk, and tax treatment.',
  author: { '@type': 'Organization', name: 'DoAide TaxFile', url: 'https://tax.doaide.com' },
  publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
  datePublished: '2026-10-10',
  dateModified: '2026-10-10',
  url: 'https://tax.doaide.com/blog/section-80c-investments-2026',
  mainEntityOfPage: 'https://tax.doaide.com/blog/section-80c-investments-2026',
  image: 'https://tax.doaide.com/og-image.png',
}

export default function Section80CInvestments2026() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80C Deductions 2026: Complete List of Tax-Saving Investments | DoAide TaxFile"
        description="Complete list of all Section 80C tax-saving investments for FY 2026-27. Compare ELSS, PPF, NPS, SSY, NSC, tax-saver FD, LIC — returns, lock-in, risk, and which suits your profile."
        keywords="Section 80C deductions 2026, 80C tax saving investments, ELSS vs PPF, tax saving options India, 80C investments list 2026-27"
        canonical="https://tax.doaide.com/blog/section-80c-investments-2026"
        jsonLd={BLOG_JSON_LD}
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Section 80C Investments 2026' }]} />

      <h1 style={s.title}>Section 80C Deductions 2026: Complete List of Tax-Saving Investments</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) · October 2026 · 14 min read</p>

      <p style={s.p}>
        Section 80C of the Income Tax Act remains the most widely used tax-saving provision in India. It allows individuals
        and HUFs to claim deductions of up to ₹1.5 lakh per year on specified investments and expenses. For someone in the
        30% tax bracket (old regime), this translates to a maximum tax saving of ₹46,800 (including cess).
        This guide covers every eligible investment, compares returns and risk, and helps you build the optimal 80C portfolio
        for FY 2026-27.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Important: Old Regime Only</div>
        Section 80C deductions are available only under the old tax regime. Under the new regime (default), these deductions
        cannot be claimed. Use our <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link> to check
        which regime saves more with your deductions.
      </div>

      <h2 style={s.h2}>Complete Section 80C Investment Comparison</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Investment</th>
            <th style={s.th}>Returns</th>
            <th style={s.th}>Lock-in</th>
            <th style={s.th}>Risk</th>
            <th style={s.th}>Tax on Returns</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}><strong>ELSS</strong></td><td style={s.td}>10-14% (market)</td><td style={s.td}>3 years</td><td style={s.td}>High</td><td style={s.td}>LTCG &gt; ₹1.25L at 12.5%</td></tr>
          <tr><td style={s.td}><strong>PPF</strong></td><td style={s.td}>7.1% (govt)</td><td style={s.td}>15 years</td><td style={s.td}>Zero</td><td style={s.td}>Fully exempt (EEE)</td></tr>
          <tr><td style={s.td}><strong>EPF</strong></td><td style={s.td}>8.25% (govt)</td><td style={s.td}>Till retirement</td><td style={s.td}>Zero</td><td style={s.td}>Exempt (if &gt; 5 yrs)</td></tr>
          <tr><td style={s.td}><strong>SSY</strong></td><td style={s.td}>8.2% (govt)</td><td style={s.td}>21 years</td><td style={s.td}>Zero</td><td style={s.td}>Fully exempt (EEE)</td></tr>
          <tr><td style={s.td}><strong>NPS (80CCD)</strong></td><td style={s.td}>8-10% (market)</td><td style={s.td}>Till 60</td><td style={s.td}>Moderate</td><td style={s.td}>40% lump sum exempt</td></tr>
          <tr><td style={s.td}><strong>NSC</strong></td><td style={s.td}>7.7% (govt)</td><td style={s.td}>5 years</td><td style={s.td}>Zero</td><td style={s.td}>Interest taxable yearly</td></tr>
          <tr><td style={s.td}><strong>Tax-saver FD</strong></td><td style={s.td}>6.5-7.5%</td><td style={s.td}>5 years</td><td style={s.td}>Zero</td><td style={s.td}>Interest fully taxable</td></tr>
          <tr><td style={s.td}><strong>LIC / ULIP</strong></td><td style={s.td}>4-6%</td><td style={s.td}>5 years</td><td style={s.td}>Low</td><td style={s.td}>Exempt (if premium &lt; 10% of sum assured)</td></tr>
          <tr><td style={s.td}><strong>Tuition Fees</strong></td><td style={s.td}>N/A</td><td style={s.td}>N/A</td><td style={s.td}>N/A</td><td style={s.td}>N/A (expense)</td></tr>
          <tr><td style={s.td}><strong>Home Loan Principal</strong></td><td style={s.td}>N/A</td><td style={s.td}>N/A</td><td style={s.td}>N/A</td><td style={s.td}>N/A (repayment)</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Use our <Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> to build your optimal portfolio and see
        the exact tax savings.
      </p>

      <h2 style={s.h2}>Top Picks by Investor Profile</h2>

      <h3 style={s.h3}>1. Young Professionals (25-35 years)</h3>
      <p style={s.p}>
        With a long investment horizon, prioritize growth. EPF already contributes to your 80C limit (12% of basic salary),
        so allocate the remaining to ELSS for higher returns.
      </p>
      <ul style={s.ul}>
        <li><strong>EPF:</strong> ₹40,000-60,000 (automatic from salary)</li>
        <li><strong>ELSS SIP:</strong> ₹60,000-80,000 (₹5,000-7,000/month via SIP)</li>
        <li><strong>PPF:</strong> ₹20,000-30,000 (for stability and EEE benefit)</li>
        <li><strong>Remaining:</strong> LIC term plan premium or tuition fees</li>
      </ul>
      <p style={s.p}>
        Start ELSS SIPs early — even ₹5,000/month for 3 years builds a corpus of ₹2 lakh+ while saving ₹18,700 in tax yearly.
        Use our <Link to="/sip-calculator" style={s.link}>SIP Calculator</Link> to project your ELSS growth.
      </p>

      <h3 style={s.h3}>2. Mid-Career (35-50 years)</h3>
      <p style={s.p}>
        Balance growth with security. If you have children, tuition fees and SSY count towards 80C.
      </p>
      <ul style={s.ul}>
        <li><strong>EPF:</strong> ₹50,000-80,000 (higher basic salary = higher contribution)</li>
        <li><strong>PPF:</strong> ₹50,000 (guaranteed, tax-free returns)</li>
        <li><strong>SSY:</strong> ₹20,000-50,000 (if you have daughters under 10)</li>
        <li><strong>ELSS:</strong> ₹20,000-30,000 (reduce equity allocation gradually)</li>
        <li><strong>Tuition fees:</strong> Up to ₹1.5 lakh (for up to 2 children, full-time education)</li>
      </ul>

      <h3 style={s.h3}>3. Near Retirement (50+ years)</h3>
      <p style={s.p}>
        Prioritize safety and liquidity. Avoid instruments with long lock-in periods.
      </p>
      <ul style={s.ul}>
        <li><strong>EPF / VPF:</strong> ₹50,000+ (guaranteed 8.25%, builds retirement corpus)</li>
        <li><strong>PPF:</strong> ₹50,000 (if account is still active — extends in 5-year blocks)</li>
        <li><strong>NSC:</strong> ₹30,000-50,000 (5-year lock-in, guaranteed returns)</li>
        <li><strong>Tax-saver FD:</strong> ₹20,000-50,000 (5-year lock-in, simple and safe)</li>
      </ul>

      <h2 style={s.h2}>Deep Dive: ELSS — The Best 80C Investment?</h2>
      <p style={s.p}>
        ELSS (Equity Linked Savings Scheme) is the only 80C instrument that invests in equities. It offers the shortest
        lock-in (3 years) among all 80C options and has historically delivered 10-14% CAGR over 10+ year periods.
      </p>
      <ul style={s.ul}>
        <li><strong>SIP advantage:</strong> Monthly SIPs average out market volatility (rupee cost averaging)</li>
        <li><strong>Each SIP unit has its own 3-year lock-in</strong> — January SIP unlocks in January of year 4</li>
        <li><strong>Tax on gains:</strong> LTCG above ₹1.25 lakh taxed at 12.5%, STCG at 20%</li>
        <li><strong>Top ELSS categories:</strong> Large-cap ELSS for stability, mid-cap ELSS for growth</li>
      </ul>
      <p style={s.p}>
        Compare ELSS with PPF and FD side-by-side using our <Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD Comparison</Link> tool.
      </p>

      <h2 style={s.h2}>Deep Dive: PPF — The Safe Haven</h2>
      <p style={s.p}>
        PPF is the gold standard for risk-free, tax-free returns. With EEE (Exempt-Exempt-Exempt) status, it offers triple
        tax benefit — deduction on investment, tax-free interest, and tax-free maturity.
      </p>
      <ul style={s.ul}>
        <li><strong>Current rate:</strong> 7.1% per annum (compounded annually, reviewed quarterly by government)</li>
        <li><strong>Lock-in:</strong> 15 years, extendable in blocks of 5 years with or without contributions</li>
        <li><strong>Partial withdrawal:</strong> From year 7 onwards (up to 50% of balance at end of year 4)</li>
        <li><strong>Loan facility:</strong> From year 3 to year 6 (up to 25% of balance at end of year 2)</li>
        <li><strong>Max contribution:</strong> ₹1.5 lakh per year</li>
      </ul>
      <p style={s.p}>
        Project your PPF maturity amount with our <Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link>.
      </p>

      <h2 style={s.h2}>Expenses That Also Qualify Under 80C</h2>
      <p style={s.p}>
        Beyond investments, certain expenses are also eligible for 80C deduction:
      </p>
      <ul style={s.ul}>
        <li><strong>Children's tuition fees:</strong> Full-time education fees for up to 2 children (school/college/university in India). Development fees, donation, transport are excluded.</li>
        <li><strong>Home loan principal repayment:</strong> EMI principal portion qualifies. Registration charges and stamp duty for a new property also qualify in the year of purchase.</li>
        <li><strong>Life insurance premium:</strong> Premium paid for self, spouse, or children. Premium must not exceed 10% of sum assured for policies after April 2012.</li>
      </ul>

      <h2 style={s.h2}>Beyond 80C — Additional Deductions</h2>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Section</th><th style={s.th}>Deduction</th><th style={s.th}>Limit</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>80CCD(1B)</td><td style={s.td}>NPS (additional, over 80C)</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>80D</td><td style={s.td}>Health insurance premium</td><td style={s.td}>₹25,000-₹1,00,000</td></tr>
          <tr><td style={s.td}>24(b)</td><td style={s.td}>Home loan interest</td><td style={s.td}>₹2,00,000</td></tr>
          <tr><td style={s.td}>80E</td><td style={s.td}>Education loan interest</td><td style={s.td}>No limit (up to 8 years)</td></tr>
          <tr><td style={s.td}>80G</td><td style={s.td}>Donations</td><td style={s.td}>50% or 100%</td></tr>
          <tr><td style={s.td}>80TTA</td><td style={s.td}>Savings account interest</td><td style={s.td}>₹10,000</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Explore NPS benefits with our <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link> and health insurance
        deductions with the <Link to="/80d-calculator" style={s.link}>Section 80D Calculator</Link>.
      </p>

      <h2 style={s.h2}>Tax Savings at Different Income Levels</h2>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Taxable Income</th><th style={s.th}>Tax Bracket</th><th style={s.th}>Saving from ₹1.5L 80C</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>₹5L-₹10L</td><td style={s.td}>20%</td><td style={s.td}>₹31,200</td></tr>
          <tr><td style={s.td}>₹10L-₹50L</td><td style={s.td}>30%</td><td style={s.td}>₹46,800</td></tr>
          <tr><td style={s.td}>₹50L-₹1Cr</td><td style={s.td}>30% + 10% surcharge</td><td style={s.td}>₹51,480</td></tr>
        </tbody>
      </table>

      <FAQSection faqs={FAQS} />

      <div style={s.callout}>
        <div style={s.calloutTitle}>Plan Your 80C Investments</div>
        <ul style={{ ...s.ul, marginBottom: 0 }}>
          <li><Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> — build your optimal 80C portfolio</li>
          <li><Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link> — project PPF maturity value</li>
          <li><Link to="/sip-calculator" style={s.link}>SIP Calculator</Link> — plan ELSS SIP investments</li>
          <li><Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD</Link> — side-by-side comparison</li>
          <li><Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — see your total tax savings</li>
        </ul>
      </div>
    </div>
  )
}
