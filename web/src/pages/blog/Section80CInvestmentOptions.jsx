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
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14, overflowX: 'auto', display: 'block' },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)', whiteSpace: 'nowrap' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)', whiteSpace: 'nowrap' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: { padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
  ol: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
}

const FAQS = [
  { q: 'Can I invest in multiple Section 80C options at the same time?', a: 'Yes, you can spread your ₹1.5 lakh limit across as many 80C instruments as you want. For example, ₹50,000 in ELSS + ₹50,000 in PPF + ₹36,000 in LIC + EPF contribution — the total deduction is capped at ₹1,50,000 regardless of how many instruments you use.' },
  { q: 'Does my EPF contribution count towards the 80C limit?', a: 'Yes, your employee contribution to EPF (Employees Provident Fund) is part of the ₹1.5 lakh Section 80C limit. If your annual EPF contribution is ₹1 lakh, you only need to invest ₹50,000 more in other 80C instruments to maximise the deduction. The employer contribution is separate and does not count under 80C.' },
  { q: 'Which 80C option gives the highest returns?', a: 'Historically, ELSS mutual funds have delivered the highest returns at 12-15% CAGR over 10+ years, with the shortest lock-in of just 3 years. However, returns are market-linked and not guaranteed. For guaranteed returns, SSY (8.2%) and PPF (7.1%) are the best options. The right choice depends on your risk tolerance and investment horizon.' },
  { q: 'Is ELSS risky for tax saving?', a: 'ELSS invests primarily in equity markets, so it carries market risk. However, the mandatory 3-year lock-in works in your favour — historically, the probability of negative returns over a 3-year rolling period in diversified equity funds is very low (under 5%). For investors with at least a 5-year horizon, ELSS has been the best-performing 80C option. Start with SIP to reduce timing risk.' },
  { q: 'Can NPS contribution be claimed under 80C?', a: 'Yes, NPS Tier-I contributions up to ₹1.5 lakh can be claimed under Section 80CCD(1), which is part of the overall 80C limit. Additionally, you get an exclusive extra deduction of ₹50,000 under Section 80CCD(1B) — this is over and above the ₹1.5 lakh 80C ceiling. So NPS effectively gives you a ₹2 lakh total deduction capacity.' },
  { q: 'What if I already have ₹1 lakh in EPF contributions?', a: 'If your annual EPF contribution is ₹1 lakh, you only need ₹50,000 more in other 80C instruments to max out the limit. Consider splitting this ₹50,000 between ELSS (for growth, 3-year lock-in) and PPF (for safety, tax-free returns). You can still invest the extra ₹50,000 in NPS under 80CCD(1B) for an additional deduction beyond 80C.' },
]

const INVESTMENTS = [
  { name: 'ELSS', returns: '12–15%', lockIn: '3 years', risk: 'High', taxOnReturns: 'LTCG > ₹1.25L @ 12.5%', bestFor: 'Young investors, wealth creation' },
  { name: 'PPF', returns: '7.1%', lockIn: '15 years', risk: 'None', taxOnReturns: 'Exempt (EEE)', bestFor: 'Conservative, long-term' },
  { name: 'NSC', returns: '7.7%', lockIn: '5 years', risk: 'None', taxOnReturns: 'Interest taxable', bestFor: 'Short-term, safe' },
  { name: 'Tax-Saver FD', returns: '6.5–7%', lockIn: '5 years', risk: 'None', taxOnReturns: 'Interest taxable', bestFor: 'Risk-averse, bank-based' },
  { name: 'SSY', returns: '8.2%', lockIn: '21 years', risk: 'None', taxOnReturns: 'Exempt (EEE)', bestFor: 'Parents of girl child' },
  { name: 'NPS Tier-I', returns: '8–12%', lockIn: 'Retirement', risk: 'Market', taxOnReturns: '60% exempt, 40% annuity taxable', bestFor: 'Retirement + extra ₹50K deduction' },
  { name: 'ULIP', returns: '4–8%', lockIn: '5 years', risk: 'Medium', taxOnReturns: 'Exempt if premium < ₹2.5L', bestFor: 'Insurance + investment combo' },
  { name: 'LIC / Endowment', returns: '4–6%', lockIn: 'Policy term', risk: 'None', taxOnReturns: 'Exempt if premium ≤ 10% SA', bestFor: 'Pure life insurance cover' },
  { name: 'EPF', returns: '8.15%', lockIn: 'Retirement', risk: 'None', taxOnReturns: 'Exempt (< ₹2.5L/yr)', bestFor: 'Salaried employees (auto)' },
]

export default function Section80CInvestmentOptions() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80C Investment Options Compared — Which is Best for You? | DoAide TaxFile"
        description="Side-by-side comparison of all Section 80C investment options — ELSS, PPF, NSC, FD, SSY, NPS, LIC, EPF. Returns, lock-in period, risk, tax on returns, and which suits your profile."
        keywords="section 80C investment options compared, best 80C investment, ELSS vs PPF vs FD, 80C comparison 2026"
        canonical="https://tax.doaide.com/blog/section-80c-investment-options-compared"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Section 80C Investment Options Compared' }]} />

      <h1 style={s.title}>Section 80C Investment Options Compared — Which is Best for You?</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) · October 2026 · 12 min read</p>

      <p style={s.p}>
        Section 80C is the cornerstone of tax planning in India, offering a ₹1,50,000 deduction across 15+ investment
        options. But with so many choices — ELSS, PPF, NPS, FD, LIC, SSY — how do you decide which is right for you?
        This guide compares every option side-by-side on returns, lock-in, risk, and tax treatment to help you make the
        optimal allocation.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Plan Your 80C</div>
        Use our <Link to="/80c-planner" style={s.link}>80C Investment Planner</Link> to allocate your ₹1.5 lakh
        across instruments and see your projected returns and tax savings.
      </div>

      <h2 style={s.h2}>Complete Comparison Table</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{...s.table, display: 'table'}}>
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
            {INVESTMENTS.map(inv => (
              <tr key={inv.name}>
                <td style={{...s.td, fontWeight: 600}}>{inv.name}</td>
                <td style={s.td}>{inv.returns}</td>
                <td style={s.td}>{inv.lockIn}</td>
                <td style={s.td}>{inv.risk}</td>
                <td style={{...s.td, fontSize: 12, whiteSpace: 'normal'}}>{inv.taxOnReturns}</td>
                <td style={{...s.td, fontSize: 12, whiteSpace: 'normal'}}>{inv.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>Deep Dive: The Top 3 Options</h2>

      <h3 style={s.h3}>ELSS — Best for Wealth Creation</h3>
      <p style={s.p}>
        Equity Linked Savings Schemes are diversified equity mutual funds with a 3-year lock-in. They have
        historically delivered 12-15% CAGR, significantly beating inflation and other 80C instruments. The 3-year
        lock-in is the shortest among all 80C options.
      </p>
      <ul style={s.ul}>
        <li>Invest via SIP (₹12,500/month = ₹1.5L/year) to average out market volatility</li>
        <li>After 3 years, LTCG above ₹1.25 lakh is taxed at 12.5% — still better than FD post-tax returns</li>
        <li>No upper limit on investment (but deduction capped at ₹1.5L)</li>
        <li>Can redeem any time after 3-year lock-in per SIP unit</li>
      </ul>

      <h3 style={s.h3}>PPF — Best for Guaranteed, Tax-Free Returns</h3>
      <p style={s.p}>
        The Public Provident Fund offers 7.1% guaranteed returns with complete tax exemption at every stage — investment
        (80C deduction), interest earned, and maturity proceeds. The only downside is the 15-year lock-in (with partial
        withdrawal from year 7).
      </p>
      <ul style={s.ul}>
        <li>Interest rate revised quarterly by the government (currently 7.1%)</li>
        <li>Can extend in blocks of 5 years after 15-year maturity</li>
        <li>Loan facility available from year 3 to year 6</li>
        <li>Best for building a guaranteed, tax-free retirement corpus</li>
      </ul>
      <p style={s.p}>
        <Link to="/ppf-calculator" style={s.link}>Calculate your PPF maturity amount →</Link>
      </p>

      <h3 style={s.h3}>NPS — Best for Extra Deduction + Retirement</h3>
      <p style={s.p}>
        NPS stands out for two reasons: market-linked returns (8-12% from a mix of equity, bonds, and government
        securities) and the exclusive extra ₹50,000 deduction under 80CCD(1B) beyond the 80C ceiling.
      </p>
      <ul style={s.ul}>
        <li>₹1.5L under 80CCD(1) (within 80C limit) + ₹50K under 80CCD(1B) = ₹2L total deduction</li>
        <li>At retirement: 60% lump sum (tax-free) + 40% must buy annuity (taxable as income)</li>
        <li>Employer contribution under 80CCD(2) is available even in the new regime</li>
        <li>Choose your asset allocation between equity (E), corporate bonds (C), and government bonds (G)</li>
      </ul>
      <p style={s.p}>
        <Link to="/nps-calculator" style={s.link}>Calculate NPS tax benefit and corpus →</Link>
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Head-to-Head Comparison</div>
        See our detailed <Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD Comparison</Link> with
        after-tax returns, graphs, and personalised recommendations.
      </div>

      <h2 style={s.h2}>How to Choose — Decision Framework</h2>
      <p style={s.p}>
        Your ideal 80C allocation depends on three factors: age, risk appetite, and financial goals.
      </p>
      <ol style={s.ol}>
        <li><strong>Age 20-35, high risk tolerance:</strong> 60% ELSS + 20% NPS + 20% PPF. Maximise equity exposure for long-term wealth creation while building a PPF safety net.</li>
        <li><strong>Age 35-50, moderate risk:</strong> 40% ELSS + 30% PPF + 30% NPS. Balance growth with guaranteed returns. NPS adds retirement corpus and extra deduction.</li>
        <li><strong>Age 50+, low risk:</strong> 50% PPF + 30% NSC/FD + 20% NPS (conservative allocation). Prioritise capital safety and guaranteed income.</li>
        <li><strong>Parents of a girl child:</strong> SSY (8.2%, highest among safe options) should be a core allocation. Combine with PPF for diversification.</li>
      </ol>

      <h2 style={s.h2}>Sample Allocation: ₹1.5 Lakh Split</h2>
      <p style={s.p}>
        Here is how a 30-year-old salaried professional with ₹50,000 annual EPF contribution might allocate:
      </p>
      <table style={{...s.table, display: 'table'}}>
        <thead>
          <tr><th style={s.th}>Instrument</th><th style={s.th}>Amount</th><th style={s.th}>Rationale</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>EPF (auto)</td><td style={s.td}>₹50,000</td><td style={{...s.td, whiteSpace: 'normal'}}>Already deducted from salary</td></tr>
          <tr><td style={s.td}>ELSS SIP</td><td style={s.td}>₹60,000</td><td style={{...s.td, whiteSpace: 'normal'}}>₹5,000/month for equity growth</td></tr>
          <tr><td style={s.td}>PPF</td><td style={s.td}>₹40,000</td><td style={{...s.td, whiteSpace: 'normal'}}>Guaranteed, tax-free safety net</td></tr>
          <tr><td style={{...s.td, fontWeight: 600}}>Total 80C</td><td style={{...s.td, fontWeight: 600}}>₹1,50,000</td><td style={s.td}></td></tr>
          <tr><td style={s.td}>NPS (80CCD(1B))</td><td style={s.td}>₹50,000</td><td style={{...s.td, whiteSpace: 'normal'}}>Extra deduction beyond 80C</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Common Mistakes to Avoid</h2>
      <ol style={s.ol}>
        <li><strong>Not checking EPF first</strong> — Your employer PF deduction already uses part of the 80C limit. Check your payslip before investing elsewhere.</li>
        <li><strong>Putting everything in one instrument</strong> — Diversify across risk profiles. Do not put all ₹1.5L in ELSS or all in PPF.</li>
        <li><strong>Ignoring the NPS extra deduction</strong> — The ₹50K 80CCD(1B) deduction is free money in terms of tax savings. Do not leave it on the table.</li>
        <li><strong>Buying insurance for tax saving</strong> — ULIPs and endowment plans have poor returns compared to term insurance + ELSS. Separate your insurance and investment needs.</li>
        <li><strong>Last-minute March rush</strong> — Plan and invest throughout the year (monthly SIPs) instead of scrambling in March and making suboptimal choices.</li>
      </ol>

      <FAQSection faqs={FAQS} />

      <div style={{ marginTop: 40, padding: 20, background: 'var(--doaide-surface)', borderRadius: 'var(--doaide-radius-lg)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--doaide-gold)' }}>Related Tools</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { to: '/80c-planner', label: '80C Planner' },
            { to: '/elss-vs-ppf-vs-fd', label: 'ELSS vs PPF vs FD' },
            { to: '/ppf-calculator', label: 'PPF Calculator' },
            { to: '/sip-calculator', label: 'SIP Calculator' },
            { to: '/nps-calculator', label: 'NPS Calculator' },
            { to: '/fd-calculator', label: 'FD Calculator' },
            { to: '/income-tax-calculator', label: 'Income Tax Calculator' },
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
