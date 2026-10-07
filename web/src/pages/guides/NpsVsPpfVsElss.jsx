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
  callout: { padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  tdMono: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  tipCard: { padding: 20, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 16, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  tipTitle: { fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 4, fontSize: 15 },
  tipSaving: { fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-gold)', fontWeight: 600 },
}

const FAQS = [
  {
    q: 'Can I invest in NPS, PPF, and ELSS simultaneously?',
    a: 'Yes. You can invest in all three at the same time. PPF and ELSS both qualify for Section 80C deduction up to Rs 1.5 lakh combined with other 80C instruments. NPS additionally provides an extra Rs 50,000 deduction under Section 80CCD(1B) over and above the 80C limit, making the total deduction potential Rs 2 lakh.',
  },
  {
    q: 'Which has the shortest lock-in period among NPS, PPF, and ELSS?',
    a: 'ELSS has the shortest lock-in period of just 3 years from the date of each SIP instalment or lump sum investment. PPF has a 15-year lock-in (with partial withdrawal allowed after 7 years), and NPS is locked until age 60 (with limited partial withdrawal allowed after 3 years for specific purposes).',
  },
  {
    q: 'Is PPF interest taxable in FY 2026-27?',
    a: 'No. PPF enjoys EEE (Exempt-Exempt-Exempt) status. The investment qualifies for 80C deduction, the interest earned is tax-free, and the maturity amount is completely tax-free. This makes PPF one of the most tax-efficient instruments available.',
  },
  {
    q: 'How is the NPS corpus taxed at withdrawal after age 60?',
    a: 'At retirement (age 60), 60% of the NPS corpus can be withdrawn tax-free as a lump sum. The remaining 40% must be used to purchase an annuity from an insurance company, and the annuity income is taxed as per your income tax slab in the year of receipt.',
  },
  {
    q: 'What is the LTCG tax rate on ELSS in FY 2026-27?',
    a: 'Long-term capital gains (LTCG) on ELSS mutual funds exceeding Rs 1.25 lakh in a financial year are taxed at 12.5% without indexation benefit. Gains up to Rs 1.25 lakh in a year are completely tax-free. Short-term capital gains (if redeemed before 1 year after lock-in) are taxed at 20%.',
  },
  {
    q: 'Can NPS be a better choice than PPF for someone in the 30% tax bracket?',
    a: 'For high-income earners in the 30% bracket under the old regime, NPS offers a significant advantage because of the additional Rs 50,000 deduction under Section 80CCD(1B). This provides an extra tax saving of Rs 15,600 (including cess). Combined with higher potential returns from equity allocation, NPS can outperform PPF for disciplined long-term investors willing to accept market risk.',
  },
]

export default function NpsVsPpfVsElss() {
  return (
    <div style={s.page}>
      <SEOHead
        title="NPS vs PPF vs ELSS: Which Tax Saving Investment is Best 2026?"
        description="Compare NPS, PPF, and ELSS mutual funds for tax saving. Returns, lock-in, liquidity, taxation compared for FY 2026-27."
        keywords="NPS vs PPF vs ELSS, best tax saving investment, 80C investments compared, NPS returns, PPF interest rate 2026, ELSS mutual funds"
        canonical="https://tax.doaide.com/guides/nps-vs-ppf-vs-elss"
        faqs={FAQS}
      />

      <Breadcrumb items={[
        { label: 'Guides', path: '/guides' },
        { label: 'NPS vs PPF vs ELSS' },
      ]} />

      <h1 style={s.title}>NPS vs PPF vs ELSS: Which Tax Saving Investment is Best in 2026?</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) &middot; 10 min read</p>

      {/* Introduction */}
      <p style={s.p}>
        When it comes to saving tax under Section 80C and building long-term wealth, three instruments dominate the conversation for Indian taxpayers: the National Pension System (NPS), Public Provident Fund (PPF), and Equity Linked Saving Scheme (ELSS) mutual funds. Each has distinct advantages in terms of returns, lock-in period, risk, and tax treatment.
      </p>
      <p style={s.p}>
        Choosing the right one depends on your age, income level, risk tolerance, and financial goals. This guide provides a detailed side-by-side comparison to help you decide where your tax-saving money should go in FY 2026-27.
      </p>

      {/* Quick Comparison Table */}
      <h2 style={s.h2}>Quick Comparison: NPS vs PPF vs ELSS</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Parameter</th>
              <th style={s.th}>PPF</th>
              <th style={s.th}>ELSS</th>
              <th style={s.th}>NPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={s.td}>Expected Returns</td>
              <td style={s.tdMono}>7.1% (fixed)</td>
              <td style={s.tdMono}>10-14% (market-linked)</td>
              <td style={s.tdMono}>8-12% (market-linked)</td>
            </tr>
            <tr>
              <td style={s.td}>Lock-in Period</td>
              <td style={s.td}>15 years</td>
              <td style={s.td}>3 years</td>
              <td style={s.td}>Till age 60</td>
            </tr>
            <tr>
              <td style={s.td}>Risk Level</td>
              <td style={s.td}>Zero (govt-backed)</td>
              <td style={s.td}>High (equity market)</td>
              <td style={s.td}>Moderate (mixed)</td>
            </tr>
            <tr>
              <td style={s.td}>Tax Benefit (80C)</td>
              <td style={s.tdMono}>Up to Rs 1.5L</td>
              <td style={s.tdMono}>Up to Rs 1.5L</td>
              <td style={s.tdMono}>Up to Rs 1.5L + Rs 50K extra</td>
            </tr>
            <tr>
              <td style={s.td}>Tax on Gains</td>
              <td style={s.td}>Fully exempt (EEE)</td>
              <td style={s.td}>LTCG &gt; Rs 1.25L at 12.5%</td>
              <td style={s.td}>60% lump sum tax-free; annuity taxed</td>
            </tr>
            <tr>
              <td style={s.td}>Minimum Investment</td>
              <td style={s.tdMono}>Rs 500/year</td>
              <td style={s.tdMono}>Rs 500 (SIP)</td>
              <td style={s.tdMono}>Rs 1,000/year</td>
            </tr>
            <tr>
              <td style={s.td}>Maximum Deduction</td>
              <td style={s.tdMono}>Rs 1.5L (80C)</td>
              <td style={s.tdMono}>Rs 1.5L (80C)</td>
              <td style={s.tdMono}>Rs 2L (80C + 80CCD1B)</td>
            </tr>
            <tr>
              <td style={s.td}>Liquidity</td>
              <td style={s.td}>Partial after 7 years</td>
              <td style={s.td}>Full after 3 years</td>
              <td style={s.td}>Very limited before 60</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PPF Section */}
      <h2 style={s.h2}>PPF: The Safe, Tax-Free Foundation</h2>
      <p style={s.p}>
        The Public Provident Fund is the bedrock of conservative tax planning in India. Backed by the Government of India, PPF offers guaranteed returns with zero risk to your principal. The current PPF interest rate stands at <strong>7.1% per annum</strong>, compounded annually, and is reviewed every quarter by the Ministry of Finance.
      </p>
      <h3 style={s.h3}>Key Features of PPF</h3>
      <ol style={s.ol}>
        <li style={s.li}><strong>Lock-in period:</strong> 15 years from the date of account opening. Partial withdrawals are permitted from the 7th financial year onwards, limited to 50% of the balance at the end of the 4th year or the preceding year, whichever is lower.</li>
        <li style={s.li}><strong>Tax treatment (EEE):</strong> PPF enjoys the coveted Exempt-Exempt-Exempt status. Your investment is deductible under 80C, interest earned is not taxable, and the maturity proceeds are completely tax-free. No other instrument matches this triple benefit at zero risk.</li>
        <li style={s.li}><strong>Investment limits:</strong> Minimum Rs 500 per year, maximum Rs 1.5 lakh per year. Contributions beyond Rs 1.5 lakh are not allowed and will not earn interest.</li>
        <li style={s.li}><strong>Loan facility:</strong> You can take a loan against your PPF balance from the 3rd to the 6th financial year, up to 25% of the balance at the end of the 2nd preceding year.</li>
        <li style={s.li}><strong>Extension:</strong> After maturity (15 years), you can extend in blocks of 5 years with or without fresh contributions.</li>
      </ol>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>Best suited for</div>
        <p style={{ margin: 0 }}>Risk-averse investors, senior citizens, or anyone who wants a guaranteed, tax-free return as the foundation of their portfolio. Ideal for building a retirement corpus without any market exposure.</p>
      </div>

      {/* ELSS Section */}
      <h2 style={s.h2}>ELSS: High Growth with the Shortest Lock-in</h2>
      <p style={s.p}>
        Equity Linked Saving Schemes are diversified equity mutual funds that qualify for Section 80C deduction. They offer the shortest lock-in period among all 80C instruments at just <strong>3 years</strong>, making them the most liquid tax-saving option.
      </p>
      <h3 style={s.h3}>Key Features of ELSS</h3>
      <ol style={s.ol}>
        <li style={s.li}><strong>Returns:</strong> Being equity-oriented funds, ELSS has historically delivered 12-14% annualised returns over 10+ year periods. However, returns are market-linked and not guaranteed. In any given 3-year window, returns can range from negative to 20%+.</li>
        <li style={s.li}><strong>Lock-in period:</strong> 3 years from the date of each investment. If you invest via SIP, each instalment has its own 3-year lock-in. After the lock-in, units can be redeemed or held indefinitely.</li>
        <li style={s.li}><strong>Taxation of gains (FY 2026-27):</strong> Long-term capital gains (LTCG) up to Rs 1.25 lakh per financial year are exempt. Gains exceeding Rs 1.25 lakh are taxed at 12.5% without indexation benefit. There is no TDS on redemption; you self-report in your ITR.</li>
        <li style={s.li}><strong>SIP option:</strong> ELSS funds can be invested via Systematic Investment Plans starting from as low as Rs 500/month. SIPs help average out market volatility and build discipline.</li>
        <li style={s.li}><strong>No upper limit on investment:</strong> While the 80C deduction is capped at Rs 1.5 lakh, you can invest more than this in ELSS. The excess will not get a tax deduction but will still grow as a regular equity mutual fund.</li>
      </ol>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>Best suited for</div>
        <p style={{ margin: 0 }}>Young investors (25-40 years) with a long investment horizon who can tolerate short-term market fluctuations for higher long-term returns. Also ideal for those who value liquidity and want access to their money after just 3 years.</p>
      </div>

      {/* NPS Section */}
      <h2 style={s.h2}>NPS: Extra Tax Benefit with Retirement Focus</h2>
      <p style={s.p}>
        The National Pension System is a government-sponsored retirement savings scheme that offers a unique advantage: an <strong>additional Rs 50,000 deduction under Section 80CCD(1B)</strong>, over and above the Rs 1.5 lakh limit of Section 80C. This makes the total deduction potential Rs 2 lakh for NPS investors.
      </p>
      <h3 style={s.h3}>Key Features of NPS</h3>
      <ol style={s.ol}>
        <li style={s.li}><strong>Asset allocation:</strong> NPS Tier 1 allows equity exposure up to 75% (under Active Choice) across Equity (E), Corporate Bonds (C), Government Securities (G), and Alternative Assets (A). Auto Choice automatically reduces equity allocation as you approach retirement age.</li>
        <li style={s.li}><strong>Extra tax deduction:</strong> Beyond the Rs 1.5 lakh under 80C (via 80CCD(1)), you get an additional Rs 50,000 under 80CCD(1B). For someone in the 30% bracket, this means an extra tax saving of Rs 15,600 (including 4% cess).</li>
        <li style={s.li}><strong>Employer contribution:</strong> If your employer contributes to NPS, that amount (up to 10% of basic + DA for private sector, 14% for central government) is deductible under 80CCD(2) with no upper cap linked to the Rs 1.5 lakh 80C limit. This is a separate deduction entirely.</li>
        <li style={s.li}><strong>Lock-in:</strong> The NPS Tier 1 account is locked until you turn 60. Premature exit is allowed after 3 years but requires 80% of the corpus to be used for annuity purchase. Partial withdrawals (up to 25% of own contributions) are allowed after 3 years for specific reasons like higher education, medical treatment, or home purchase, limited to 3 withdrawals during the account lifetime.</li>
        <li style={s.li}><strong>Withdrawal at 60:</strong> At retirement, 60% of the corpus can be withdrawn tax-free as a lump sum. The remaining 40% must be used to purchase an annuity, and the annuity income is taxed as per your applicable slab rate.</li>
        <li style={s.li}><strong>Returns:</strong> NPS Tier 1 equity schemes have delivered 10-12% annualised returns over the last 10 years. The blended return depends on your asset allocation choice between E, C, G, and A classes.</li>
      </ol>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>Best suited for</div>
        <p style={{ margin: 0 }}>Salaried individuals in the 30% tax bracket who have already exhausted their Rs 1.5 lakh 80C limit and want additional tax savings. Also ideal for those who want a disciplined retirement corpus with moderate equity exposure and are comfortable with the long lock-in.</p>
      </div>

      {/* Tax Treatment Comparison */}
      <h2 style={s.h2}>Tax Treatment at Every Stage</h2>
      <p style={s.p}>
        Understanding how each instrument is taxed at investment, during the holding period, and at withdrawal is critical for comparing real after-tax returns.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Stage</th>
              <th style={s.th}>PPF</th>
              <th style={s.th}>ELSS</th>
              <th style={s.th}>NPS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...s.td, fontWeight: 600 }}>At Investment</td>
              <td style={s.td}>Exempt (80C, up to Rs 1.5L)</td>
              <td style={s.td}>Exempt (80C, up to Rs 1.5L)</td>
              <td style={s.td}>Exempt (80C Rs 1.5L + 80CCD1B Rs 50K)</td>
            </tr>
            <tr>
              <td style={{ ...s.td, fontWeight: 600 }}>During Holding</td>
              <td style={s.td}>Interest is tax-free</td>
              <td style={s.td}>Dividends taxed per slab</td>
              <td style={s.td}>Gains accumulate tax-free</td>
            </tr>
            <tr>
              <td style={{ ...s.td, fontWeight: 600 }}>At Withdrawal</td>
              <td style={s.td}>Fully exempt (EEE)</td>
              <td style={s.td}>LTCG &gt; Rs 1.25L at 12.5%</td>
              <td style={s.td}>60% lump sum exempt; 40% annuity taxed per slab</td>
            </tr>
            <tr>
              <td style={{ ...s.td, fontWeight: 600 }}>Tax Status</td>
              <td style={s.td}>EEE</td>
              <td style={s.td}>EET (partially)</td>
              <td style={s.td}>EET (partially)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Who Should Choose What */}
      <h2 style={s.h2}>Who Should Choose What?</h2>

      <h3 style={s.h3}>Based on Age</h3>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>Age 25-35: Prioritise ELSS + NPS</div>
        <p style={{ margin: 0 }}>With 25-35 years until retirement, you can maximise equity exposure. Start with Rs 1.5 lakh in ELSS via SIP for wealth creation, then add Rs 50,000 in NPS for the extra 80CCD(1B) deduction. PPF can wait.</p>
      </div>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>Age 35-50: Balanced Mix of All Three</div>
        <p style={{ margin: 0 }}>Allocate Rs 50,000-75,000 to ELSS, Rs 50,000 to NPS (for the extra deduction), and the remaining 80C room to PPF for stability. This balances growth, safety, and tax efficiency.</p>
      </div>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>Age 50+: Prioritise PPF + NPS (Conservative)</div>
        <p style={{ margin: 0 }}>Shift towards PPF for guaranteed returns and NPS with a higher allocation to G (government bonds) and C (corporate bonds). Reduce ELSS exposure as you approach retirement to avoid sequence-of-returns risk.</p>
      </div>

      <h3 style={s.h3}>Based on Risk Appetite</h3>
      <ol style={s.ol}>
        <li style={s.li}><strong>Conservative:</strong> PPF should form the core (70%+). Add NPS with Auto Choice for gradual equity reduction. Avoid heavy ELSS allocation.</li>
        <li style={s.li}><strong>Moderate:</strong> Split between ELSS (50%), NPS (30%), and PPF (20%). This gives equity growth with some downside protection.</li>
        <li style={s.li}><strong>Aggressive:</strong> Maximise ELSS (Rs 1.5 lakh in 80C) and add Rs 50,000 NPS with maximum equity (75% E class). Skip PPF if you can handle volatility.</li>
      </ol>

      <h3 style={s.h3}>Based on Income Level</h3>
      <ol style={s.ol}>
        <li style={s.li}><strong>Income under Rs 7.5 lakh:</strong> If you have chosen the new tax regime, none of these 80C deductions apply (only employer NPS under 80CCD(2) works). If under the old regime, start with ELSS SIP for growth.</li>
        <li style={s.li}><strong>Income Rs 7.5-15 lakh:</strong> Use the old regime if your total deductions exceed Rs 3.75 lakh. Invest Rs 1.5 lakh in ELSS/PPF under 80C and Rs 50,000 in NPS under 80CCD(1B).</li>
        <li style={s.li}><strong>Income above Rs 15 lakh:</strong> The extra Rs 50,000 NPS deduction saves Rs 15,600 at the highest slab. Always claim it if you are on the old regime. Maximise all three.</li>
      </ol>

      {/* Callout */}
      <div style={s.callout}>
        <div style={s.calloutTitle}>Calculate Your Exact Savings</div>
        <p style={{ margin: 0 }}>
          Use our free calculators to see how each instrument grows your money:
          <br />
          <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link> &middot;{' '}
          <Link to="/ppf-calculator" style={s.link}>PPF Calculator</Link> &middot;{' '}
          <Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD Comparison</Link> &middot;{' '}
          <Link to="/80c-planner" style={s.link}>80C Planner</Link>
        </p>
      </div>

      {/* The Optimal Strategy */}
      <h2 style={s.h2}>The Optimal Strategy: Use All Three Together</h2>
      <p style={s.p}>
        For most salaried taxpayers under the old regime, the smartest approach is not choosing one instrument but combining all three strategically. Here is a model allocation for someone investing Rs 2 lakh per year in tax-saving instruments:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Instrument</th>
              <th style={s.th}>Amount</th>
              <th style={s.th}>Section</th>
              <th style={s.th}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={s.td}>ELSS (SIP)</td>
              <td style={s.tdMono}>Rs 75,000</td>
              <td style={s.td}>80C</td>
              <td style={s.td}>Wealth creation, liquidity after 3 years</td>
            </tr>
            <tr>
              <td style={s.td}>PPF</td>
              <td style={s.tdMono}>Rs 75,000</td>
              <td style={s.td}>80C</td>
              <td style={s.td}>Guaranteed returns, EEE safety net</td>
            </tr>
            <tr>
              <td style={s.td}>NPS</td>
              <td style={s.tdMono}>Rs 50,000</td>
              <td style={s.td}>80CCD(1B)</td>
              <td style={s.td}>Extra deduction, retirement corpus</td>
            </tr>
            <tr>
              <td style={{ ...s.td, fontWeight: 600 }}>Total</td>
              <td style={{ ...s.tdMono, fontWeight: 600 }}>Rs 2,00,000</td>
              <td style={s.td}></td>
              <td style={s.td}>Max tax saving of Rs 62,400 at 30% slab</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        This approach gives you the best of all worlds: high-growth equity exposure through ELSS, guaranteed tax-free returns through PPF, the extra Rs 50,000 deduction through NPS, and a diversified portfolio across asset classes and risk levels.
      </p>

      {/* New Regime Note */}
      <div style={s.callout}>
        <div style={s.calloutTitle}>New Tax Regime (Section 115BAC) Note</div>
        <p style={{ margin: 0 }}>
          Under the new tax regime (default from FY 2023-24), Sections 80C and 80CCD(1B) deductions are <strong>not available</strong>. Only employer NPS contribution under Section 80CCD(2) remains claimable. If you have chosen the new regime, investing in these instruments is still valid for wealth creation but will not provide tax deductions. Use our{' '}
          <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link> to decide which regime suits you.
        </p>
      </div>

      {/* FAQs */}
      <h2 style={s.h2}>Frequently Asked Questions</h2>
      <FAQSection faqs={FAQS} />

      {/* Share and Print */}
      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <WhatsAppShare />
        <PrintButton />
      </div>
    </div>
  )
}
