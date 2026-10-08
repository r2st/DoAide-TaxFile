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
  { q: 'Can I invest in NPS, PPF, and ELSS simultaneously?', a: 'Yes, you can invest in all three at the same time. In fact, combining them is often the best strategy. PPF and ELSS contributions fall under the Section 80C limit of ₹1.5 lakh, while NPS offers an additional ₹50,000 deduction under 80CCD(1B) over and above 80C. A balanced allocation across all three gives you safety (PPF), growth (ELSS), and retirement planning (NPS) with maximum tax benefit of up to ₹2 lakh.' },
  { q: 'Which has the best returns — NPS, PPF, or ELSS?', a: 'Historically, ELSS has delivered the highest returns at 12-15% CAGR, followed by NPS equity allocation at 9-12%, and PPF at 7.1% (guaranteed). However, ELSS and NPS returns are market-linked and not guaranteed — they can be negative in bad years. PPF returns are government-guaranteed but lower. For a 20-year horizon, ELSS is likely to outperform, but PPF provides certainty.' },
  { q: 'Is the NPS lock-in until age 60 worth it?', a: 'It depends on your goals. If you are investing specifically for retirement, the lock-in is a feature, not a bug — it prevents premature withdrawal and forces long-term compounding. The additional ₹50,000 deduction under 80CCD(1B) saves ₹15,600 in tax at the 30% slab, which compensates for the illiquidity. However, if you need flexibility, ELSS (3-year lock-in) or PPF (partial withdrawal from year 7) are better.' },
  { q: 'Can I withdraw PPF before 15 years?', a: 'Partial withdrawal is allowed from the 7th financial year — you can withdraw up to 50% of the balance at the end of the 4th year or the preceding year, whichever is lower. Loans against PPF are available from the 3rd to 6th year at 1% above PPF interest rate. Premature closure is allowed only after 5 years for medical treatment, higher education, or change in residency status, with a 1% interest rate penalty.' },
  { q: 'Is ELSS risky for tax saving?', a: 'ELSS carries equity market risk — your returns can be negative in a given year. However, with a 3-year lock-in and the ability to invest via SIP (spreading purchase over 12 months), the risk is significantly reduced. Over any 5-year period historically, ELSS funds have delivered positive returns. The key is to invest consistently via SIP, not as a lump sum in March. If you cannot tolerate any capital loss, choose PPF.' },
  { q: 'What happens to NPS if I change jobs?', a: 'NPS is fully portable across employers and locations. Your Permanent Retirement Account Number (PRAN) stays the same throughout your career. If your new employer also offers NPS, the contributions continue into the same account. If not, you can continue contributing as an individual subscriber. The accumulated corpus and investment choices remain unchanged.' },
]

export default function NpsVsPpfVsElss() {
  return (
    <div style={s.page}>
      <SEOHead
        title="NPS vs PPF vs ELSS — Complete Comparison Guide 2026 | DoAide TaxFile"
        description="Detailed comparison of NPS, PPF, and ELSS for tax saving and wealth creation. Compare returns, tax benefits, lock-in, risk, and find which combination suits your goals."
        keywords="NPS vs PPF, NPS vs ELSS, PPF vs ELSS, best tax saving investment, NPS PPF ELSS comparison 2026, 80C investment comparison"
        canonical="https://tax.doaide.com/blog/nps-vs-ppf-vs-elss-comparison"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'NPS vs PPF vs ELSS' }]} />

      <h1 style={s.title}>NPS vs PPF vs ELSS — Complete Comparison Guide 2026</h1>
      <p style={s.meta}>Updated for FY 2026-27 · October 2026 · 16 min read</p>

      <p style={s.p}>
        NPS, PPF, and ELSS are the three most popular instruments that combine tax saving with wealth building. Each serves
        a different purpose — NPS for retirement, PPF for guaranteed safe returns, and ELSS for market-linked growth with
        the shortest lock-in. Choosing the right mix can mean the difference between a ₹40 lakh and a ₹70 lakh corpus
        over 20 years. This guide compares all three on returns, tax treatment, risk, liquidity, and suitability — with
        worked projections to help you decide.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Calculate Your Returns</div>
        Use our <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link>,{' '}
        <Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link>, and{' '}
        <Link to="/sip-calculator" style={s.link}>SIP Calculator</Link> (for ELSS) to project returns with your actual
        investment amounts and time horizon.
      </div>

      <h2 style={s.h2}>Quick Comparison Table</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Parameter</th>
              <th style={s.th}>NPS</th>
              <th style={s.th}>PPF</th>
              <th style={s.th}>ELSS</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Returns</td><td style={s.td}>9-12% (equity), 7-9% (debt)</td><td style={s.td}>7.1% (guaranteed)</td><td style={s.td}>12-15% (historical CAGR)</td></tr>
            <tr><td style={s.td}>Lock-in Period</td><td style={s.td}>Until age 60</td><td style={s.td}>15 years</td><td style={s.td}>3 years (shortest)</td></tr>
            <tr><td style={s.td}>Risk Level</td><td style={s.td}>Medium</td><td style={s.td}>Zero (sovereign)</td><td style={s.td}>High (equity market)</td></tr>
            <tr><td style={s.td}>Tax on Investment</td><td style={s.td}>80CCD(1) + 80CCD(1B) ₹50K extra</td><td style={s.td}>80C (₹1.5L limit)</td><td style={s.td}>80C (₹1.5L limit)</td></tr>
            <tr><td style={s.td}>Tax on Returns</td><td style={s.td}>60% lump sum (40% tax-free), 40% annuity taxable</td><td style={s.td}>Fully tax-free (EEE)</td><td style={s.td}>12.5% LTCG above ₹1.25L</td></tr>
            <tr><td style={s.td}>Min Investment</td><td style={s.td}>₹1,000/year</td><td style={s.td}>₹500/year</td><td style={s.td}>₹500/month (SIP)</td></tr>
            <tr><td style={s.td}>Max for 80C</td><td style={s.td}>10% of salary (80CCD(1))</td><td style={s.td}>₹1,50,000/year</td><td style={s.td}>No cap (but 80C limit ₹1.5L)</td></tr>
            <tr><td style={s.td}>Extra Tax Benefit</td><td style={s.td}>₹50,000 under 80CCD(1B)</td><td style={s.td}>None</td><td style={s.td}>None</td></tr>
            <tr><td style={s.td}>Partial Withdrawal</td><td style={s.td}>25% after 3 years (specific reasons)</td><td style={s.td}>From 7th year (up to 50%)</td><td style={s.td}>Fully redeemable after 3 years</td></tr>
            <tr><td style={s.td}>Best For</td><td style={s.td}>Retirement + extra ₹50K deduction</td><td style={s.td}>Safe, tax-free guaranteed returns</td><td style={s.td}>Wealth creation, short lock-in</td></tr>
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>National Pension System (NPS) — Deep Dive</h2>

      <h3 style={s.h3}>How NPS Works</h3>
      <p style={s.p}>
        NPS is a government-regulated pension scheme managed by the Pension Fund Regulatory and Development Authority
        (PFRDA). You open a Tier I account (mandatory, with withdrawal restrictions) and optionally a Tier II account
        (flexible, no tax benefit except for government employees). Your contributions are invested across equity (E),
        corporate bonds (C), and government securities (G) based on your chosen allocation.
      </p>
      <p style={s.p}>
        You can choose Active choice (set your own E/C/G allocation, max 75% equity reducing to 50% by age 60) or
        Auto choice (lifecycle fund that automatically reduces equity as you age). NPS is managed by seven pension fund
        managers — you can switch between them once per year.
      </p>

      <h3 style={s.h3}>NPS Tax Benefits</h3>
      <p style={s.p}>
        NPS offers the most generous tax benefits among all 80C instruments:
      </p>
      <ul style={s.ul}>
        <li><strong>80CCD(1):</strong> Your own contribution — up to 10% of salary (14% for government employees), within the overall 80C limit of ₹1.5 lakh</li>
        <li><strong>80CCD(1B):</strong> Additional ₹50,000 deduction over and above the 80C limit — this is the unique NPS advantage</li>
        <li><strong>80CCD(2):</strong> Employer contribution — up to 14% of basic salary for government, 10% for private sector, fully tax-free (available even in new regime!)</li>
      </ul>
      <p style={s.p}>
        At the 30% tax slab, the combined 80C (₹1.5L) + 80CCD(1B) (₹50K) saves ₹62,400 in tax per year. No other
        instrument offers this level of tax benefit. Explore with our <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link>.
      </p>

      <h3 style={s.h3}>NPS at Maturity</h3>
      <p style={s.p}>
        At age 60, you must use the accumulated corpus as follows:
      </p>
      <ul style={s.ul}>
        <li><strong>60% lump sum withdrawal:</strong> Entirely tax-free (changed from partial taxability from FY 2024-25)</li>
        <li><strong>40% annuity purchase:</strong> Must be used to buy an annuity from an IRDAI-registered insurer. The annuity income is taxable as salary in the year received</li>
      </ul>
      <p style={s.p}>
        The annuity requirement is the main drawback of NPS — the annuity rates in India are low (typically 5-7%),
        and the income is fully taxable. This makes NPS effectively an EET (Exempt-Exempt-Taxed) instrument for the
        annuity portion, unlike PPF which is fully tax-free.
      </p>

      <h3 style={s.h3}>NPS Returns</h3>
      <p style={s.p}>
        NPS returns depend on the asset allocation and market performance. Historical 10-year returns for the top
        NPS fund managers are approximately: Equity (E) — 10-14%, Corporate Bonds (C) — 8-10%, Government Securities
        (G) — 8-9%. A typical 50:30:20 (E:C:G) allocation has delivered around 10-11% CAGR over the past decade.
      </p>

      <h3 style={s.h3}>Who Should Choose NPS</h3>
      <ul style={s.ul}>
        <li>Those in the 30% tax bracket who want the extra ₹50,000 deduction under 80CCD(1B)</li>
        <li>People focused on retirement planning who want forced long-term savings</li>
        <li>Government employees who get 14% employer contribution under 80CCD(2)</li>
        <li>New regime taxpayers who can still claim employer NPS contribution as a deduction</li>
      </ul>

      <h2 style={s.h2}>Public Provident Fund (PPF) — Deep Dive</h2>

      <h3 style={s.h3}>How PPF Works</h3>
      <p style={s.p}>
        PPF is a government savings scheme with a 15-year maturity and a guaranteed interest rate of 7.1% per annum
        (reviewed quarterly by the government). The rate has been stable between 7-8% over the past decade. PPF carries
        sovereign guarantee — your principal and interest are completely safe regardless of market conditions. You can
        open a PPF account at any post office or bank with a minimum of ₹500 per year and a maximum of ₹1.5 lakh.
      </p>
      <p style={s.p}>
        Interest is calculated on the minimum balance between the 5th and last day of each month. To maximize interest,
        deposit your annual contribution before the 5th of April. The 15-year tenure can be extended in blocks of 5 years.
      </p>

      <h3 style={s.h3}>PPF Tax Benefits — The EEE Advantage</h3>
      <p style={s.p}>
        PPF enjoys the coveted EEE (Exempt-Exempt-Exempt) status:
      </p>
      <ul style={s.ul}>
        <li><strong>Exempt on investment:</strong> Contributions up to ₹1.5 lakh qualify under Section 80C</li>
        <li><strong>Exempt on interest:</strong> Interest earned is completely tax-free — not even reported in ITR</li>
        <li><strong>Exempt on maturity:</strong> The entire maturity amount is tax-free</li>
      </ul>
      <p style={s.p}>
        This makes PPF the most tax-efficient instrument in India. An effective post-tax return of 7.1% from PPF
        is equivalent to a pre-tax return of ~10.3% for someone in the 30% tax bracket. Calculate your PPF maturity
        with our <Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link>.
      </p>

      <h3 style={s.h3}>PPF Withdrawal and Loan</h3>
      <ul style={s.ul}>
        <li><strong>Partial withdrawal:</strong> From the 7th financial year — up to 50% of balance at end of 4th year</li>
        <li><strong>Loan facility:</strong> From 3rd to 6th year — up to 25% of balance at end of 2nd preceding year, at PPF rate + 1%</li>
        <li><strong>Premature closure:</strong> After 5 years for medical emergency, higher education, or NRI status — 1% interest penalty</li>
      </ul>

      <h3 style={s.h3}>Who Should Choose PPF</h3>
      <ul style={s.ul}>
        <li>Conservative investors who cannot tolerate any capital loss</li>
        <li>Individuals planning for a specific goal 15+ years away (children's education, retirement)</li>
        <li>Senior citizens or those nearing retirement who need guaranteed returns</li>
        <li>Anyone in a high tax bracket who values the EEE tax-free benefit</li>
      </ul>

      <h2 style={s.h2}>ELSS Mutual Funds — Deep Dive</h2>

      <h3 style={s.h3}>How ELSS Works</h3>
      <p style={s.p}>
        ELSS (Equity Linked Savings Scheme) is a category of equity mutual funds that invests at least 80% in equities.
        It has a mandatory 3-year lock-in period — the shortest among all Section 80C instruments. When you invest via
        SIP, each monthly installment has its own 3-year lock-in. After the lock-in, units can be redeemed freely.
      </p>
      <p style={s.p}>
        ELSS funds are managed by professional fund managers who invest across large-cap, mid-cap, and multi-cap stocks.
        They provide the dual benefit of tax saving and market-linked wealth creation. You can start with as little as
        ₹500 per month via SIP.
      </p>

      <h3 style={s.h3}>ELSS Tax Treatment</h3>
      <ul style={s.ul}>
        <li><strong>On investment:</strong> Qualifies for Section 80C deduction up to ₹1.5 lakh</li>
        <li><strong>On redemption (LTCG):</strong> Long-term capital gains above ₹1.25 lakh per year are taxed at 12.5%. Gains up to ₹1.25 lakh per year are tax-free</li>
        <li><strong>Dividends:</strong> Taxed at your slab rate (dividend distribution tax was abolished in 2020)</li>
      </ul>
      <p style={s.p}>
        While not fully tax-free like PPF, the higher returns from ELSS often more than compensate for the LTCG tax.
        A ₹1.5L annual ELSS investment at 13% CAGR grows to ~₹63 lakh in 20 years vs ~₹40 lakh in PPF at 7.1%.
        Compare options on our <Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD</Link> page, or model SIP
        returns with our <Link to="/sip-calculator" style={s.link}>SIP Calculator</Link>.
      </p>

      <h3 style={s.h3}>ELSS Returns — Historical Performance</h3>
      <p style={s.p}>
        Over the past 15-20 years, top ELSS funds have delivered 12-16% CAGR. However, returns are volatile — individual
        years can range from -20% to +40%. The key is to invest via SIP (rupee cost averaging) and stay invested beyond the
        lock-in period. The longer you hold, the more the volatility smooths out. Over any 7-year rolling period,
        large-cap ELSS funds have historically never delivered negative returns.
      </p>

      <h3 style={s.h3}>Who Should Choose ELSS</h3>
      <ul style={s.ul}>
        <li>Young investors (22-40) with a long investment horizon and high risk tolerance</li>
        <li>Those who want the shortest lock-in (3 years) among 80C options</li>
        <li>Investors targeting wealth creation alongside tax saving</li>
        <li>People already investing in mutual funds who want tax benefit on equity allocation</li>
      </ul>

      <h2 style={s.h2}>Head-to-Head Scenarios</h2>

      <h3 style={s.h3}>Scenario 1: Young Professional (25-35 years)</h3>
      <p style={s.p}>
        <strong>Recommended split:</strong> ELSS 60% + NPS 40% (for 80CCD(1B) extra deduction)
      </p>
      <p style={s.p}>
        At this age, you have 25-35 years until retirement. ELSS gives maximum growth with the shortest lock-in. NPS adds
        the extra ₹50K deduction while building a retirement corpus. Start a PPF account with the minimum ₹500/year to
        begin the 15-year clock — you can increase contributions later. Skip tax-saving FDs entirely — the returns are
        too low for your time horizon.
      </p>

      <h3 style={s.h3}>Scenario 2: Mid-Career Professional (35-45 years)</h3>
      <p style={s.p}>
        <strong>Recommended split:</strong> PPF 35% + ELSS 35% + NPS 30%
      </p>
      <p style={s.p}>
        Balance growth and safety. PPF provides guaranteed returns for medium-term goals (children's education in 10-15
        years). ELSS continues wealth creation. NPS locks in retirement savings with the extra ₹50K deduction. Your EPF
        contribution may already use ₹50K-₹1L of the 80C limit. Use our{' '}
        <Link to="/80c-planner" style={s.link}>80C Planner</Link> to track remaining allocation.
      </p>

      <h3 style={s.h3}>Scenario 3: Near Retirement (50-60 years)</h3>
      <p style={s.p}>
        <strong>Recommended split:</strong> PPF 50% + NPS 30% (reduce equity) + ELSS 20%
      </p>
      <p style={s.p}>
        Shift towards safety. PPF maturity may be approaching — extend in 5-year blocks or withdraw. Reduce NPS equity
        allocation (auto-choice lifecycle fund does this automatically). Keep a small ELSS allocation for inflation
        protection. Consider SCSS if above 60. Plan your <Link to="/salary-tax-optimizer" style={s.link}>salary restructuring</Link> to
        maximize NPS employer contribution under 80CCD(2).
      </p>

      <h3 style={s.h3}>Scenario 4: Maximum Tax Saving</h3>
      <p style={s.p}>
        <strong>Total deduction:</strong> ₹1.5L (80C via PPF/ELSS) + ₹50K (80CCD(1B) via NPS) = ₹2 lakh
      </p>
      <p style={s.p}>
        To maximize the absolute tax deduction, combine ELSS/PPF for the ₹1.5L 80C limit with NPS for the extra ₹50K
        80CCD(1B). At 30% tax + 4% cess, this saves ₹62,400 per year. Add 80D health insurance (₹50K-₹75K) and home
        loan interest (₹2L) for total deductions of ₹4.25-₹4.5 lakh, saving ₹1.3-1.4 lakh in tax. Compare your exact
        savings with our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>.
      </p>

      <h2 style={s.h2}>₹1 Lakh Invested Per Year — 20-Year Projection</h2>
      <p style={s.p}>
        How ₹1 lakh invested annually in each instrument grows over 20 years:
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Instrument</th>
            <th style={s.th}>Assumed Return</th>
            <th style={s.th}>Total Invested</th>
            <th style={s.th}>Corpus at 20 Years</th>
            <th style={s.th}>Wealth Created</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>NPS (equity-heavy)</td><td style={s.td}>10%</td><td style={s.td}>₹20,00,000</td><td style={s.td}>₹57,27,500</td><td style={s.td}>₹37,27,500</td></tr>
          <tr><td style={s.td}>PPF</td><td style={s.td}>7.1%</td><td style={s.td}>₹20,00,000</td><td style={s.td}>₹40,95,700</td><td style={s.td}>₹20,95,700</td></tr>
          <tr><td style={s.td}>ELSS</td><td style={s.td}>13%</td><td style={s.td}>₹20,00,000</td><td style={s.td}>₹76,68,900</td><td style={s.td}>₹56,68,900</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        ELSS creates nearly double the wealth of PPF — but remember, PPF is guaranteed while ELSS can have bad years.
        NPS falls in between on returns but offers the extra ₹50K tax deduction. After accounting for tax on NPS annuity
        and ELSS LTCG, the effective gap narrows slightly but ELSS still leads for long horizons. Calculate your specific
        projections with our <Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link> and{' '}
        <Link to="/sip-calculator" style={s.link}>SIP Calculator</Link>.
      </p>

      <h2 style={s.h2}>The Ideal Strategy: Combine All Three</h2>
      <p style={s.p}>
        Rather than choosing one instrument exclusively, the optimal approach is to combine all three based on your age,
        risk profile, and goals. Here is a suggested allocation framework:
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Age Group</th>
            <th style={s.th}>ELSS</th>
            <th style={s.th}>PPF</th>
            <th style={s.th}>NPS (80CCD(1B))</th>
            <th style={s.th}>80C Amount</th>
            <th style={s.th}>Extra NPS</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>22-30</td><td style={s.td}>60%</td><td style={s.td}>10%</td><td style={s.td}>30%</td><td style={s.td}>₹1,50,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>30-40</td><td style={s.td}>40%</td><td style={s.td}>30%</td><td style={s.td}>30%</td><td style={s.td}>₹1,50,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>40-50</td><td style={s.td}>25%</td><td style={s.td}>45%</td><td style={s.td}>30%</td><td style={s.td}>₹1,50,000</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>50-60</td><td style={s.td}>15%</td><td style={s.td}>55%</td><td style={s.td}>30%</td><td style={s.td}>₹1,50,000</td><td style={s.td}>₹50,000</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Note: These are indicative. Adjust based on your existing investments (EPF already takes a share of 80C),
        risk tolerance, and specific goals. Track your 80C utilization with our{' '}
        <Link to="/80c-planner" style={s.link}>80C Planner</Link>.
      </p>

      <h2 style={s.h2}>Impact of New Tax Regime</h2>
      <p style={s.p}>
        The new tax regime (default since FY 2023-24) does not allow Section 80C deductions. This means PPF and ELSS
        investments do not provide any tax benefit under the new regime. NPS, however, retains a partial advantage:
      </p>
      <ul style={s.ul}>
        <li><strong>80CCD(2) — Employer NPS contribution:</strong> Still deductible in new regime — up to 14% of basic salary (government) or 10% (private). This is a significant benefit</li>
        <li><strong>80CCD(1) and 80CCD(1B):</strong> Not available in new regime</li>
        <li><strong>PPF 80C deduction:</strong> Not available in new regime (but PPF returns remain tax-free regardless)</li>
        <li><strong>ELSS 80C deduction:</strong> Not available in new regime</li>
      </ul>
      <p style={s.p}>
        If you are in the new regime, the investment merits of PPF and ELSS remain (safe returns vs high growth) — you
        just do not get the upfront tax deduction. NPS is the most tax-advantaged under the new regime due to employer
        80CCD(2). Compare which regime works for you with our{' '}
        <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link> or{' '}
        <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>.
      </p>

      <p style={s.p}>
        Read our related guides for more detail:{' '}
        <Link to="/blog/section-80c-deductions-complete-guide" style={s.link}>Section 80C Complete Guide</Link> for all
        eligible deductions, <Link to="/blog/income-tax-slabs-2026-27" style={s.link}>Income Tax Slabs 2026-27</Link> for
        the latest rates, and <Link to="/blog/how-to-file-itr-online-free" style={s.link}>How to File ITR Online</Link> for
        step-by-step filing instructions.
      </p>

      <FAQSection faqs={FAQS} />

      <div style={s.callout}>
        <div style={s.calloutTitle}>Free Tax Tools</div>
        <ul style={{ ...s.ul, marginBottom: 0 }}>
          <li><Link to="/nps-calculator" style={s.link}>NPS Calculator</Link> — estimate your NPS corpus at retirement</li>
          <li><Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link> — project PPF maturity amount</li>
          <li><Link to="/sip-calculator" style={s.link}>SIP Calculator</Link> — model ELSS SIP returns</li>
          <li><Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD</Link> — side-by-side comparison</li>
          <li><Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> — track and optimize deductions</li>
          <li><Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — compare old vs new regime</li>
          <li><Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> — restructure CTC for max savings</li>
        </ul>
      </div>
    </div>
  )
}
