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
  { q: 'Does my EPF contribution count towards the Section 80C limit?', a: 'Yes, your employee contribution to EPF (Employees Provident Fund) is part of the ₹1.5 lakh Section 80C limit. The employer contribution to EPF is not deductible under 80C but is exempt up to ₹7.5 lakh per year under Section 10. If your EPF contribution is already ₹1 lakh/year, you only need ₹50,000 more in other 80C instruments to max out the limit.' },
  { q: 'Which is better for tax saving — ELSS or PPF?', a: 'ELSS offers higher potential returns (12-15% historical CAGR) with the shortest lock-in (3 years), but carries market risk. PPF offers guaranteed 7.1% returns with zero risk but a 15-year lock-in. For young investors with a long horizon, ELSS is usually better for wealth creation. For conservative investors or those near retirement, PPF provides safety. An ideal strategy is to invest in both — use our ELSS vs PPF vs FD comparison tool.' },
  { q: 'Can I claim 80C deduction under the new tax regime?', a: 'No. Section 80C deductions are not available under the new tax regime. If you choose the new regime, you lose deductions for PPF, ELSS, LIC, NSC, tuition fees, home loan principal, and all other 80C items. The only NPS benefit available in the new regime is employer contribution under Section 80CCD(2). Compare both regimes with our Income Tax Calculator to see which saves more.' },
  { q: 'What happens if my 80C investments exceed ₹1.5 lakh?', a: 'The deduction is capped at ₹1.5 lakh regardless of how much you invest. Any excess investment does not get additional tax benefit. However, the investment itself (PPF, ELSS, etc.) continues to grow and earn returns — you just cannot claim tax deduction beyond ₹1.5 lakh. Plan your investments to hit exactly ₹1.5 lakh for optimal tax benefit without locking excess capital.' },
  { q: 'Can I claim tuition fees for coaching classes under 80C?', a: 'No, tuition fees paid to coaching classes, private tuition, or any institution not classified as a school, college, or university are not eligible under Section 80C. Only full-time tuition fees paid to any school, college, or university in India for up to 2 children qualify. Fees for admission, development, capitation, or donation are also not eligible — only the tuition fee component.' },
  { q: 'Is home loan principal repayment eligible under 80C?', a: 'Yes, the principal repayment of a home loan is eligible for deduction under Section 80C up to ₹1.5 lakh. This is part of the overall 80C limit (not additional). The interest component is claimed separately under Section 24(b) up to ₹2 lakh for self-occupied property. Stamp duty and registration charges paid during the year of purchase also qualify under 80C.' },
]

export default function Section80CDeductions() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80C Deductions Complete Guide — All Tax Saving Options 2026-27 | DoAide TaxFile"
        description="Complete list of Section 80C deductions for FY 2026-27. PPF, ELSS, NPS, LIC, SSY, EPF, NSC, and 14+ options to save up to ₹46,800 in tax under the old regime."
        keywords="section 80C deductions, 80C tax saving, 80C investment options, PPF, ELSS, LIC, NPS, tax saving investments India"
        canonical="https://tax.doaide.com/blog/section-80c-deductions-complete-guide"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Section 80C Deductions Guide' }]} />

      <h1 style={s.title}>Section 80C Deductions Complete Guide — All Tax Saving Options 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 · October 2026 · 20 min read</p>

      <p style={s.p}>
        Section 80C of the Income Tax Act is the most widely used tax-saving provision in India. It allows you to claim
        deductions of up to ₹1,50,000 per financial year on specified investments and expenses. At the highest tax bracket
        (30% + 4% cess), this translates to a maximum tax saving of ₹46,800 per year. This guide covers every eligible
        investment under 80C with returns, lock-in periods, risk levels, and how to choose the right mix.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Planner</div>
        Use our <Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> to track your current 80C utilization
        and find the best investments to fill the remaining gap. Already know your deductions? Compare regimes with our{' '}
        <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>.
      </div>

      <h2 style={s.h2}>Section 80C at a Glance</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Parameter</th>
            <th style={s.th}>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Maximum Deduction</td><td style={s.td}>₹1,50,000 per financial year</td></tr>
          <tr><td style={s.td}>Available In</td><td style={s.td}>Old Tax Regime only</td></tr>
          <tr><td style={s.td}>Max Tax Savings (30% slab)</td><td style={s.td}>₹46,800 (including 4% cess)</td></tr>
          <tr><td style={s.td}>Max Tax Savings (20% slab)</td><td style={s.td}>₹31,200 (including 4% cess)</td></tr>
          <tr><td style={s.td}>Eligible Assessee</td><td style={s.td}>Individual and HUF</td></tr>
          <tr><td style={s.td}>Includes Sections</td><td style={s.td}>80C + 80CCC + 80CCD(1) combined limit</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Complete List of Section 80C Investments</h2>

      <h3 style={s.h3}>1. Public Provident Fund (PPF)</h3>
      <p style={s.p}>
        PPF is a government-backed savings scheme with guaranteed returns of 7.1% per annum (reviewed quarterly).
        It has a 15-year lock-in period with partial withdrawal allowed from the 7th year. The biggest advantage:
        PPF enjoys EEE (Exempt-Exempt-Exempt) status — the investment, interest earned, and maturity amount are all
        tax-free. Maximum investment is ₹1.5 lakh per year, and the minimum is ₹500.
      </p>
      <p style={s.p}>
        PPF is ideal for conservative investors seeking guaranteed, tax-free returns. Calculate your PPF maturity
        with our <Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link>.
      </p>

      <h3 style={s.h3}>2. Employee Provident Fund (EPF)</h3>
      <p style={s.p}>
        If you are a salaried employee, your 12% EPF contribution (employee share) automatically counts towards
        Section 80C. The employer matches this contribution but that does not count under 80C (it is exempt under
        Section 10 up to ₹7.5 lakh). EPF earns 8.25% interest (FY 2023-24 rate). Interest on contributions
        above ₹2.5 lakh per year is taxable.
      </p>
      <p style={s.p}>
        Many salaried employees already exhaust ₹50,000-₹1,00,000 of their 80C limit through EPF alone. Check your
        EPF balance and growth with our <Link to="/epf-calculator" style={s.link}>EPF Calculator</Link>.
      </p>

      <h3 style={s.h3}>3. ELSS Mutual Funds</h3>
      <p style={s.p}>
        Equity Linked Savings Scheme (ELSS) is a type of equity mutual fund that qualifies for 80C deduction. It has
        the shortest lock-in period among all 80C options — just 3 years. ELSS funds have historically delivered 12-15%
        CAGR returns, making them the best option for long-term wealth creation among tax-saving instruments. However,
        returns are market-linked and not guaranteed.
      </p>
      <p style={s.p}>
        On redemption, LTCG above ₹1.25 lakh is taxed at 12.5%. You can invest via SIP (each SIP installment has its own
        3-year lock-in). Compare ELSS with other options on our{' '}
        <Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD</Link> page.
      </p>

      <h3 style={s.h3}>4. National Savings Certificate (NSC)</h3>
      <p style={s.p}>
        NSC is a post office savings instrument with a 5-year lock-in and a guaranteed interest rate of 7.7% per annum
        (compounded annually). The interest earned each year is deemed reinvested and qualifies for 80C deduction, except
        in the final year when it is taxable. NSC has no upper investment limit, but 80C deduction is capped at ₹1.5 lakh.
      </p>

      <h3 style={s.h3}>5. Life Insurance Premium (LIC)</h3>
      <p style={s.p}>
        Premium paid towards life insurance policies (for self, spouse, and children) qualifies under 80C. However,
        for policies issued after April 1, 2012, the annual premium must not exceed 10% of the sum assured for the
        deduction to apply. If the premium exceeds this limit, the deduction is limited to 10% of the sum assured.
        Pure term insurance plans (low premium, high cover) are recommended for insurance, while investments should be
        made separately in PPF, ELSS, or NPS.
      </p>

      <h3 style={s.h3}>6. Sukanya Samriddhi Yojana (SSY)</h3>
      <p style={s.p}>
        SSY is a government scheme for the girl child, offering 8.2% interest (among the highest in government schemes).
        It can be opened for a girl child below 10 years of age, with a maximum investment of ₹1.5 lakh per year. Like
        PPF, it enjoys EEE status. The account matures when the girl turns 21, with partial withdrawal allowed after she
        turns 18 for education or marriage.
      </p>
      <p style={s.p}>
        Calculate your SSY maturity with our <Link to="/ssy-calculator" style={s.link}>SSY Calculator</Link>.
      </p>

      <h3 style={s.h3}>7. National Pension System (NPS)</h3>
      <p style={s.p}>
        NPS contributions qualify under 80C via Section 80CCD(1) — but this is part of the overall ₹1.5 lakh limit.
        The real benefit of NPS is the additional ₹50,000 deduction under Section 80CCD(1B), which is over and above
        the 80C limit. Employer NPS contributions under 80CCD(2) are also tax-free (up to 14% of basic salary for
        government, 10% for private sector).
      </p>
      <p style={s.p}>
        NPS offers market-linked returns (9-12% in equity allocation) and is locked until age 60. At maturity, 60%
        can be withdrawn as a lump sum (40% of which is tax-free from FY 2024-25), and 40% must be used to buy an
        annuity. Explore returns with our <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link>. See our
        detailed <Link to="/blog/nps-vs-ppf-vs-elss-comparison" style={s.link}>NPS vs PPF vs ELSS comparison</Link>.
      </p>

      <h3 style={s.h3}>8. Tax Saving Fixed Deposits</h3>
      <p style={s.p}>
        Banks offer tax-saving fixed deposits with a 5-year lock-in period. Interest rates are typically 6.5-7.5%
        depending on the bank and your age (senior citizens get 0.25-0.5% extra). Unlike PPF, the interest earned
        on tax-saving FDs is fully taxable. No premature withdrawal or loan facility is available.
      </p>
      <p style={s.p}>
        Compare FD returns with our <Link to="/fd-calculator" style={s.link}>FD Calculator</Link>.
      </p>

      <h3 style={s.h3}>9. Home Loan Principal Repayment</h3>
      <p style={s.p}>
        The principal component of your home loan EMI qualifies for deduction under Section 80C. This is part of the
        overall ₹1.5 lakh limit. The interest component is claimed separately under Section 24(b) — up to ₹2 lakh for
        self-occupied property. Together, a home loan can give you deductions of ₹3.5 lakh+ under the old regime.
      </p>
      <p style={s.p}>
        Calculate your home loan tax benefits with our <Link to="/home-loan-calculator" style={s.link}>Home Loan Calculator</Link>.
      </p>

      <h3 style={s.h3}>10. Tuition Fees</h3>
      <p style={s.p}>
        Tuition fees paid for full-time education of up to 2 children at any school, college, or university in India
        qualify under 80C. Only the tuition fee component is eligible — development fees, transport charges, hostel fees,
        donation, and capitation fees are not covered. This applies to any educational institution in India, including
        nursery and pre-school.
      </p>

      <h3 style={s.h3}>11. Stamp Duty and Registration Charges</h3>
      <p style={s.p}>
        Stamp duty and registration charges paid for purchase of a house property qualify under Section 80C in the year
        of payment. This is a one-time benefit available only in the year of purchase.
      </p>
      <p style={s.p}>
        Estimate stamp duty for your state with our <Link to="/calculators/stamp-duty" style={s.link}>Stamp Duty Calculator</Link>.
      </p>

      <h3 style={s.h3}>12. Senior Citizens Savings Scheme (SCSS)</h3>
      <p style={s.p}>
        SCSS offers 8.2% interest with a 5-year tenure, available to individuals above 60 years (or 55+ for those who
        have taken VRS). Maximum investment is ₹30 lakh. Interest is paid quarterly and is taxable. SCSS is the best
        option for senior citizens looking for safe, regular income with a tax-saving benefit.
      </p>

      <h3 style={s.h3}>13. Unit Linked Insurance Plans (ULIPs)</h3>
      <p style={s.p}>
        ULIPs combine insurance and investment, with a 5-year lock-in period. They invest in equity, debt, or balanced
        funds. While they offer 80C benefits, ULIPs have typically higher charges (premium allocation, fund management,
        mortality charges) compared to separate term insurance + mutual fund investments. Maturity proceeds are tax-free
        if annual premium is below ₹2.5 lakh.
      </p>

      <h3 style={s.h3}>14. Post Office Time Deposit (5-Year)</h3>
      <p style={s.p}>
        Only the 5-year post office time deposit qualifies for 80C deduction. It earns 7.5% interest (compounded
        quarterly, paid annually). Interest is taxable. 1-year, 2-year, and 3-year time deposits do not qualify
        for 80C deduction.
      </p>

      <h2 style={s.h2}>Section 80C Comparison Table</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Investment</th>
              <th style={s.th}>Returns</th>
              <th style={s.th}>Lock-in</th>
              <th style={s.th}>Risk</th>
              <th style={s.th}>Tax on Returns</th>
              <th style={s.th}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>PPF</td><td style={s.td}>7.1%</td><td style={s.td}>15 years</td><td style={s.td}>Zero</td><td style={s.td}>Tax-free (EEE)</td><td style={s.td}>Safe long-term</td></tr>
            <tr><td style={s.td}>EPF</td><td style={s.td}>8.25%</td><td style={s.td}>Retirement</td><td style={s.td}>Zero</td><td style={s.td}>Tax-free*</td><td style={s.td}>Salaried employees</td></tr>
            <tr><td style={s.td}>ELSS</td><td style={s.td}>12-15%</td><td style={s.td}>3 years</td><td style={s.td}>High</td><td style={s.td}>12.5% LTCG &gt;₹1.25L</td><td style={s.td}>Wealth creation</td></tr>
            <tr><td style={s.td}>NPS (80CCD)</td><td style={s.td}>9-12%</td><td style={s.td}>Age 60</td><td style={s.td}>Medium</td><td style={s.td}>Partial taxable</td><td style={s.td}>Retirement + extra ₹50K</td></tr>
            <tr><td style={s.td}>NSC</td><td style={s.td}>7.7%</td><td style={s.td}>5 years</td><td style={s.td}>Zero</td><td style={s.td}>Taxable</td><td style={s.td}>Medium-term safe</td></tr>
            <tr><td style={s.td}>SSY</td><td style={s.td}>8.2%</td><td style={s.td}>21 years</td><td style={s.td}>Zero</td><td style={s.td}>Tax-free (EEE)</td><td style={s.td}>Girl child planning</td></tr>
            <tr><td style={s.td}>Tax-saving FD</td><td style={s.td}>6.5-7.5%</td><td style={s.td}>5 years</td><td style={s.td}>Zero</td><td style={s.td}>Taxable</td><td style={s.td}>Conservative short-term</td></tr>
            <tr><td style={s.td}>SCSS</td><td style={s.td}>8.2%</td><td style={s.td}>5 years</td><td style={s.td}>Zero</td><td style={s.td}>Taxable</td><td style={s.td}>Senior citizens</td></tr>
            <tr><td style={s.td}>LIC Premium</td><td style={s.td}>4-6%</td><td style={s.td}>Policy term</td><td style={s.td}>Zero</td><td style={s.td}>Tax-free*</td><td style={s.td}>Insurance + savings</td></tr>
            <tr><td style={s.td}>Home Loan Principal</td><td style={s.td}>N/A</td><td style={s.td}>Loan term</td><td style={s.td}>Zero</td><td style={s.td}>N/A</td><td style={s.td}>Home buyers</td></tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        *EPF interest above ₹2.5L/year contribution is taxable. LIC maturity is tax-free if premium ≤ 10% of sum assured.
      </p>

      <h2 style={s.h2}>Beyond 80C — Additional Deductions</h2>
      <p style={s.p}>
        Once you have maxed out the ₹1.5 lakh 80C limit, consider these additional deductions to reduce taxable income further:
      </p>
      <ul style={s.ul}>
        <li><strong>80CCD(1B) — NPS:</strong> Additional ₹50,000 deduction for NPS contributions, over and above 80C limit. This alone saves ₹15,600 at the 30% slab. Use our <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link></li>
        <li><strong>80D — Health Insurance:</strong> ₹25,000 for self and family + ₹25,000 for parents (₹50,000 if parents are senior citizens). Preventive health check-up of ₹5,000 is included</li>
        <li><strong>80E — Education Loan:</strong> Interest on education loan — no upper limit, available for up to 8 years from start of repayment</li>
        <li><strong>80G — Donations:</strong> 50% or 100% deduction for donations to approved funds and institutions. Compute with our <Link to="/80g-calculator" style={s.link}>80G Calculator</Link></li>
        <li><strong>80TTA/80TTB — Savings Interest:</strong> ₹10,000 for savings account interest (₹50,000 for senior citizens under 80TTB)</li>
        <li><strong>Section 24(b) — Home Loan Interest:</strong> Up to ₹2 lakh deduction on self-occupied property loan interest</li>
      </ul>
      <p style={s.p}>
        With all deductions combined (80C + 80CCD(1B) + 80D + 24b), you can claim ₹5 lakh+ in deductions. Use our{' '}
        <Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> to see the impact on your take-home.
      </p>

      <h2 style={s.h2}>How to Plan Your 80C Investments</h2>
      <h3 style={s.h3}>Young Professionals (22-30)</h3>
      <p style={s.p}>
        Prioritize ELSS (₹50,000-₹1,00,000 via SIP) for wealth creation and tax saving. Let EPF contribution cover the
        rest. Start a PPF account with ₹500/year to begin the 15-year clock. Consider NPS 80CCD(1B) for the extra ₹50K
        deduction if you are in the 30% slab. Avoid tax-saving FDs and LIC endowment plans — the returns are inferior.
      </p>

      <h3 style={s.h3}>Mid-Career (30-45)</h3>
      <p style={s.p}>
        Balance between ELSS and PPF. If your EPF contribution covers ₹80,000-₹1,00,000, invest the remaining ₹50,000-₹70,000
        in ELSS. Increase PPF to ₹50,000-₹1,00,000 as you approach 40. Add NPS for the extra ₹50K deduction. If you have
        children, tuition fees will also absorb part of the 80C limit. Use our{' '}
        <Link to="/80c-planner" style={s.link}>80C Planner</Link> to allocate optimally.
      </p>

      <h3 style={s.h3}>Near Retirement (50-60)</h3>
      <p style={s.p}>
        Shift towards PPF (if maturity is still away) and SCSS (if 60+). Reduce ELSS allocation to 20-30%.
        NPS will be maturing — plan the annuity purchase. Home loan principal repayment may still be ongoing.
        Focus on tax efficiency of maturity proceeds.
      </p>

      <h2 style={s.h2}>80C Deductions in Old vs New Regime</h2>
      <p style={s.p}>
        Section 80C deductions are available <strong>only under the old tax regime</strong>. If you opt for the new regime
        (default since FY 2023-24), you cannot claim any 80C deductions. The new regime compensates with lower slab rates
        and a higher standard deduction of ₹75,000.
      </p>
      <p style={s.p}>
        The breakeven point depends on your total deductions. Generally, if your 80C + 80D + HRA + home loan deductions
        exceed ₹3-4 lakh, the old regime saves more tax. Below that, the new regime is likely better. Always compare both
        using our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> or{' '}
        <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link>.
      </p>

      <h2 style={s.h2}>Common 80C Mistakes to Avoid</h2>
      <ul style={s.ul}>
        <li><strong>Over-investing in LIC endowment plans:</strong> Returns are typically 4-6%, far below ELSS or PPF. Buy a term insurance plan for coverage and invest the rest elsewhere</li>
        <li><strong>Ignoring EPF contribution:</strong> Your EPF contribution already counts towards 80C. Many people double-invest by not tracking this</li>
        <li><strong>Last-minute investing in March:</strong> This leads to poor choices (tax-saving FDs instead of ELSS SIPs). Start an ELSS SIP in April so each installment gets a full 3-year lock-in</li>
        <li><strong>Not tracking the ₹1.5 lakh limit:</strong> EPF + PPF + LIC premium + tuition fees — all share the same limit. Use our <Link to="/80c-planner" style={s.link}>80C Planner</Link> to track utilization</li>
        <li><strong>Choosing based on lock-in alone:</strong> While ELSS has the shortest lock-in (3 years), the best choice depends on your risk profile, time horizon, and existing portfolio</li>
        <li><strong>Forgetting NPS 80CCD(1B):</strong> The additional ₹50,000 NPS deduction is over and above 80C and saves ₹15,600 at the 30% slab — many people miss this</li>
      </ul>

      <p style={s.p}>
        Read our related guides: <Link to="/blog/income-tax-slabs-2026-27" style={s.link}>Income Tax Slabs 2026-27</Link> for
        the latest rates, <Link to="/blog/how-to-file-itr-online-free" style={s.link}>How to File ITR Online</Link> for
        filing your return, and <Link to="/blog/nps-vs-ppf-vs-elss-comparison" style={s.link}>NPS vs PPF vs ELSS</Link> for
        an in-depth investment comparison.
      </p>

      <FAQSection faqs={FAQS} />

      <div style={s.callout}>
        <div style={s.calloutTitle}>Free Tax Tools</div>
        <ul style={{ ...s.ul, marginBottom: 0 }}>
          <li><Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> — track and optimize your 80C investments</li>
          <li><Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — compare old vs new regime</li>
          <li><Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link> — project PPF maturity value</li>
          <li><Link to="/nps-calculator" style={s.link}>NPS Calculator</Link> — estimate NPS corpus at retirement</li>
          <li><Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD</Link> — side-by-side comparison</li>
          <li><Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> — restructure CTC for max savings</li>
        </ul>
      </div>
    </div>
  )
}
