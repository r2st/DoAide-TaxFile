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
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  tdMono: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
}

const FAQS = [
  { q: 'What is the maximum deduction under Section 80C?', a: 'The maximum deduction under Section 80C is ₹1,50,000 per financial year. This is a combined limit for all 80C instruments — PPF, ELSS, EPF, LIC, NSC, SCSS, SSY, tax-saver FD, home loan principal, and tuition fees. NPS gets an additional ₹50,000 under 80CCD(1B).' },
  { q: 'Is Section 80C available under the new tax regime?', a: 'No, Section 80C deductions are not available under the new tax regime. The new regime only allows a standard deduction of ₹75,000. If you want to claim 80C, you must opt for the old tax regime.' },
  { q: 'How much tax can I save with 80C?', a: 'At the highest tax slab (30% + 4% cess), investing ₹1.5 lakh under 80C saves ₹46,800 in tax. At 20% slab, the saving is ₹31,200. The actual saving depends on your marginal tax rate.' },
  { q: 'Can I invest more than ₹1.5 lakh in 80C instruments?', a: 'You can invest any amount, but the tax deduction is capped at ₹1,50,000. For example, you can invest ₹2 lakh in PPF, but only ₹1.5 lakh will be eligible for deduction. The excess earns returns but provides no additional tax benefit.' },
  { q: 'Which 80C investment is best for me?', a: 'For aggressive investors: ELSS (3-year lock-in, market-linked ~12% returns). For conservative investors: PPF (15-year, guaranteed 7.1%, tax-free). For senior citizens: SCSS (5-year, 8.2%). For parents of girls under 10: SSY (21-year, 8.2%, tax-free). Diversify across 2-3 instruments.' },
]

export default function Section80CGuide() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80C Deductions: Complete List of Tax Saving Investments 2026 | DoAide TaxFile"
        description="Complete guide to Section 80C tax-saving investments — PPF, ELSS, NSC, FD, SCSS, SSY, EPF, LIC compared with returns, lock-in, and risk for FY 2026-27."
        keywords="Section 80C deductions, tax saving investments India 2026, 80C investment options, PPF ELSS comparison, best 80C investments"
        canonical="https://tax.doaide.com/guides/section-80c-deductions"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Section 80C Deductions' }]} />

      <h1 style={s.title}>Section 80C Deductions: Complete List of Tax Saving Investments 2026</h1>
      <p style={s.meta}>Updated for FY 2026-27 • 10 min read</p>

      <p style={s.p}>
        Section 80C of the Income Tax Act allows individuals and HUFs to claim a deduction of up to ₹1,50,000 per financial year
        by investing in specified instruments. This is the most popular tax-saving section, and choosing the right mix of 80C investments
        can maximize both your returns and tax savings. Here is a complete guide to every eligible instrument.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Plan Your 80C Investments</div>
        Use our <Link to="/80c-planner" style={s.link}>80C Investment Planner</Link> to track how much you have invested and how much room remains.
        Compare <Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD</Link> after-tax returns.
      </div>

      <h2 style={s.h2}>All Section 80C Instruments Compared</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Instrument</th>
              <th style={s.th}>Returns</th>
              <th style={s.th}>Lock-in</th>
              <th style={s.th}>Risk</th>
              <th style={s.th}>Max Limit</th>
              <th style={s.th}>Tax on Returns</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>PPF</td><td style={s.tdMono}>7.1%</td><td style={s.td}>15 years</td><td style={s.td}>Nil</td><td style={s.tdMono}>₹1.5L/yr</td><td style={s.td}>Tax-free (EEE)</td></tr>
            <tr><td style={s.td}>ELSS</td><td style={s.tdMono}>~12%</td><td style={s.td}>3 years</td><td style={s.td}>High</td><td style={s.td}>No limit</td><td style={s.td}>LTCG 12.5% above ₹1.25L</td></tr>
            <tr><td style={s.td}>NSC</td><td style={s.tdMono}>7.7%</td><td style={s.td}>5 years</td><td style={s.td}>Nil</td><td style={s.td}>No limit</td><td style={s.td}>Interest taxable at slab</td></tr>
            <tr><td style={s.td}>Tax Saver FD</td><td style={s.tdMono}>6.5-7.5%</td><td style={s.td}>5 years</td><td style={s.td}>Nil</td><td style={s.td}>No limit</td><td style={s.td}>Interest taxable at slab</td></tr>
            <tr><td style={s.td}>SCSS</td><td style={s.tdMono}>8.2%</td><td style={s.td}>5 years</td><td style={s.td}>Nil</td><td style={s.tdMono}>₹30L</td><td style={s.td}>Interest taxable at slab</td></tr>
            <tr><td style={s.td}>SSY</td><td style={s.tdMono}>8.2%</td><td style={s.td}>21 years</td><td style={s.td}>Nil</td><td style={s.tdMono}>₹2.5L/yr</td><td style={s.td}>Tax-free (EEE)</td></tr>
            <tr><td style={s.td}>EPF</td><td style={s.tdMono}>8.25%</td><td style={s.td}>Till retirement</td><td style={s.td}>Nil</td><td style={s.td}>12% of basic</td><td style={s.td}>Tax-free (if 5+ years)</td></tr>
            <tr><td style={s.td}>LIC Premium</td><td style={s.tdMono}>~5-6%</td><td style={s.td}>Varies</td><td style={s.td}>Nil</td><td style={s.td}>Varies</td><td style={s.td}>Maturity tax-free (conditions)</td></tr>
            <tr><td style={s.td}>Home Loan Principal</td><td style={s.tdMono}>N/A</td><td style={s.td}>Loan tenure</td><td style={s.td}>N/A</td><td style={s.td}>₹1.5L</td><td style={s.td}>N/A</td></tr>
            <tr><td style={s.td}>Tuition Fees</td><td style={s.tdMono}>N/A</td><td style={s.td}>N/A</td><td style={s.td}>N/A</td><td style={s.td}>2 children</td><td style={s.td}>N/A</td></tr>
            <tr><td style={s.td}>NPS (80CCD 1B)</td><td style={s.tdMono}>~9-12%</td><td style={s.td}>Till 60</td><td style={s.td}>Medium</td><td style={s.tdMono}>₹50K extra</td><td style={s.td}>60% tax-free at maturity</td></tr>
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>PPF — Public Provident Fund</h2>
      <p style={s.p}>
        PPF is a government-backed scheme offering guaranteed 7.1% returns with complete tax exemption (EEE status).
        The 15-year lock-in makes it ideal for long-term goals like retirement or a child's education. Partial withdrawal
        is allowed from the 7th year. PPF can be extended in 5-year blocks after maturity. It is the safest 80C option
        and should form the core of any conservative investor's portfolio.
      </p>
      <p style={s.p}>
        <Link to="/ppf-calculator" style={s.link}>→ Calculate PPF returns with year-by-year breakdown</Link>
      </p>

      <h2 style={s.h2}>ELSS — Equity Linked Savings Scheme</h2>
      <p style={s.p}>
        ELSS mutual funds offer the shortest lock-in (3 years) among all 80C options. Being equity-linked, they have historically
        delivered 12-15% CAGR over long periods. The trade-off is market risk — returns are not guaranteed. ELSS is best for
        investors with a 5+ year horizon who can tolerate short-term volatility. LTCG above ₹1.25 lakh is taxed at 12.5%.
      </p>

      <h2 style={s.h2}>SSY — Sukanya Samriddhi Yojana</h2>
      <p style={s.p}>
        Available only for parents of a girl child under 10, SSY offers one of the highest rates (8.2%) among government schemes
        with EEE tax status. Deposits are required for 15 years, and the account matures at 21 years from opening.
        Partial withdrawal (50%) is allowed after the girl turns 18 for education or marriage.
      </p>
      <p style={s.p}>
        <Link to="/ssy-calculator" style={s.link}>→ Calculate SSY returns</Link>
      </p>

      <h2 style={s.h2}>EPF — Employee Provident Fund</h2>
      <p style={s.p}>
        If you are salaried, your EPF contribution (12% of basic) automatically qualifies under 80C. The employer contributes
        an equal amount, split between EPF (3.67%) and pension (8.33%). The current rate is 8.25%. EPF provides retirement
        security with tax-free returns if the account is active for 5+ continuous years.
      </p>
      <p style={s.p}>
        <Link to="/epf-calculator" style={s.link}>→ Calculate EPF retirement corpus</Link>
      </p>

      <h2 style={s.h2}>NPS — Additional ₹50,000 Deduction</h2>
      <p style={s.p}>
        The National Pension System offers an additional ₹50,000 deduction under Section 80CCD(1B), over and above the ₹1.5L
        under 80C. This means a total deduction of ₹2 lakh is possible. NPS invests in a mix of equity, corporate bonds,
        and government securities. At maturity (age 60), 60% of the corpus is tax-free, and 40% must be used to buy an annuity.
      </p>
      <p style={s.p}>
        <Link to="/nps-calculator" style={s.link}>→ Calculate NPS tax benefit</Link>
      </p>

      <h2 style={s.h2}>Recommended 80C Strategy by Income Level</h2>
      <h3 style={s.h3}>Income ₹5-10 Lakh</h3>
      <p style={s.p}>Focus on EPF (automatic) + PPF for safety. If EPF covers most of 80C, top up PPF for the remainder. ELSS if you have a longer horizon.</p>

      <h3 style={s.h3}>Income ₹10-20 Lakh</h3>
      <p style={s.p}>Split: EPF (automatic) + ELSS (₹50K-1L for growth) + PPF (remainder for safety). Add NPS ₹50K for extra deduction. Check if new regime is still better despite these deductions.</p>

      <h3 style={s.h3}>Income ₹20 Lakh+</h3>
      <p style={s.p}>At this level, the new regime is usually better despite losing 80C. Still maximize EPF and VPF for the guaranteed 8.25% return. Consider NPS for the employer contribution benefit (80CCD 2, up to 14% of basic).</p>

      <div style={{ marginTop: 32 }}>
        <WhatsAppShare text="Section 80C Deductions — Complete guide to tax-saving investments for FY 2026-27\n\ntax.doaide.com/guides/section-80c-deductions" />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
