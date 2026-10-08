import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import ShareButtons from '../../components/ShareButtons'

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
  example: {
    padding: 20, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    marginBottom: 24, fontSize: 14, lineHeight: 1.8, fontFamily: 'var(--doaide-font-mono)',
    color: 'var(--doaide-text-secondary)', overflowX: 'auto',
  },
  exampleTitle: { fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 12, fontFamily: 'var(--doaide-font-display)', fontSize: 16 },
  ul: { paddingLeft: 24, marginBottom: 16, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', fontSize: 15 },
  warning: {
    padding: 16, background: 'var(--doaide-warning-bg, rgba(255,193,7,0.08))', border: '1px solid var(--doaide-warning-border, rgba(255,193,7,0.3))',
    borderRadius: 'var(--doaide-radius-md)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
}

const FAQS = [
  { q: 'What is the LTCG tax rate on equity mutual funds in 2026?', a: 'Long-term capital gains (LTCG) on equity mutual funds held for more than 12 months are taxed at 12.5% on gains exceeding ₹1.25 lakh per financial year. Short-term gains (STCG) on equity MFs held for less than 12 months are taxed at 20%.' },
  { q: 'How are debt mutual fund gains taxed?', a: 'From FY 2025-26 onwards, gains on debt mutual funds are taxed at your income tax slab rate regardless of holding period. There is no LTCG benefit for debt funds — all gains are treated as short-term capital gains and added to your taxable income.' },
  { q: 'What is the ₹1.25 lakh LTCG exemption?', a: 'For equity mutual funds, the first ₹1.25 lakh of long-term capital gains in a financial year is tax-free. Only gains above this threshold are taxed at 12.5%. This exemption applies to the combined LTCG from all equity investments (stocks + equity MFs).' },
  { q: 'Is indexation available for mutual fund gains?', a: 'No, indexation benefit has been removed for all asset classes from FY 2025-26 onwards, including debt mutual funds and gold funds. All capital gains are now calculated on actual cost without inflation adjustment.' },
  { q: 'How is SIP taxed when I redeem?', a: 'Each SIP installment is treated as a separate purchase. When you redeem, FIFO (First In, First Out) applies — the earliest units are sold first. Each installment has its own holding period. So in a 2-year SIP, your first installment is LTCG but the last few could be STCG.' },
  { q: 'What is the TDS on mutual fund redemption?', a: 'There is no TDS on mutual fund redemption for resident individuals. You are responsible for calculating and paying capital gains tax when filing your ITR. NRIs have TDS deducted at source on MF redemption.' },
]

export default function CapitalGainsMutualFunds() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Capital Gains Tax on Mutual Funds India 2026 — Complete Guide | DoAide TaxFile"
        description="Complete guide to capital gains tax on mutual funds in India for FY 2026-27. LTCG and STCG rates for equity, debt, hybrid, and gold funds with worked examples."
        keywords="capital gains tax mutual funds India 2026, LTCG on mutual funds, STCG on equity mutual funds, mutual fund taxation, SIP capital gains tax"
        canonical="https://tax.doaide.com/guides/capital-gains-mutual-funds"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Capital Gains on Mutual Funds' }]} />

      <h1 style={s.title}>Capital Gains Tax on Mutual Funds India — FY 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) • 15 min read</p>

      <p style={s.p}>
        Mutual fund taxation in India depends on two factors: the <strong>type of fund</strong> (equity, debt, hybrid, or gold)
        and the <strong>holding period</strong>. The rules changed significantly from FY 2025-26 with the removal of indexation
        and new tax rates. This guide covers the current rules with detailed examples for each fund type.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Calculate Your Capital Gains Tax</div>
        Use our free <Link to="/capital-gains-calculator" style={s.link}>Capital Gains Calculator</Link> to compute STCG/LTCG
        tax on any asset. Compare strategies with the <Link to="/tax-loss-harvesting" style={s.link}>Tax Loss Harvesting</Link> tool.
      </div>

      <h2 style={s.h2}>Mutual Fund Tax Rates at a Glance (FY 2026-27)</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Fund Type</th>
              <th style={s.th}>LTCG Threshold</th>
              <th style={s.th}>LTCG Rate</th>
              <th style={s.th}>STCG Rate</th>
              <th style={s.th}>Exemption</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Equity MF (65%+ equity)</td><td style={s.td}>12 months</td><td style={s.tdMono}>12.5%</td><td style={s.tdMono}>20%</td><td style={s.td}>₹1.25L/year</td></tr>
            <tr><td style={s.td}>Debt MF</td><td style={s.td}>No LTCG</td><td style={s.td}>Slab rate</td><td style={s.td}>Slab rate</td><td style={s.td}>None</td></tr>
            <tr><td style={s.td}>Hybrid MF (35-65% equity)</td><td style={s.td}>24 months</td><td style={s.tdMono}>12.5%</td><td style={s.td}>Slab rate</td><td style={s.td}>₹1.25L/year</td></tr>
            <tr><td style={s.td}>Gold / Silver / Commodity MF</td><td style={s.td}>24 months</td><td style={s.tdMono}>12.5%</td><td style={s.td}>Slab rate</td><td style={s.td}>None</td></tr>
            <tr><td style={s.td}>International / FoF (equity)</td><td style={s.td}>24 months</td><td style={s.tdMono}>12.5%</td><td style={s.td}>Slab rate</td><td style={s.td}>₹1.25L/year</td></tr>
            <tr><td style={s.td}>ELSS</td><td style={s.td}>36 months (lock-in)</td><td style={s.tdMono}>12.5%</td><td style={s.td}>N/A (locked)</td><td style={s.td}>₹1.25L/year</td></tr>
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>Example 1: LTCG on Equity Mutual Fund</h2>
      <div style={s.example}>
        <div style={s.exampleTitle}>Sneha invested ₹5 lakh in an equity MF</div>
        Purchase: ₹5,00,000 (Jan 2024)<br />
        Redemption: ₹7,50,000 (Mar 2026)<br />
        Holding period: 26 months (LTCG)<br /><br />
        Gain = ₹7,50,000 − ₹5,00,000 = ₹2,50,000<br />
        Exempt: ₹1,25,000 (Section 112A)<br />
        Taxable LTCG = ₹2,50,000 − ₹1,25,000 = ₹1,25,000<br />
        Tax = ₹1,25,000 × 12.5% = ₹15,625<br />
        Cess = ₹15,625 × 4% = ₹625<br /><br />
        <strong>Total Tax = ₹16,250</strong><br />
        Effective tax rate on total gains = 6.5%
      </div>

      <h2 style={s.h2}>Example 2: STCG on Equity Mutual Fund</h2>
      <div style={s.example}>
        <div style={s.exampleTitle}>Vikram sold equity MF units within 8 months</div>
        Purchase: ₹3,00,000<br />
        Sale: ₹3,60,000<br />
        Holding period: 8 months (STCG)<br /><br />
        Gain = ₹60,000<br />
        STCG tax = ₹60,000 × 20% = ₹12,000<br />
        Cess = ₹12,000 × 4% = ₹480<br /><br />
        <strong>Total Tax = ₹12,480</strong>
      </div>

      <h2 style={s.h2}>Example 3: Debt Mutual Fund (No LTCG Benefit)</h2>
      <div style={s.example}>
        <div style={s.exampleTitle}>Meera redeemed a debt fund after 3 years</div>
        Purchase: ₹10,00,000<br />
        Redemption: ₹12,50,000<br />
        Holding period: 3 years<br /><br />
        Gain = ₹2,50,000<br />
        Tax = Added to taxable income (at slab rate)<br /><br />
        If Meera is in the 30% bracket:<br />
        Tax = ₹2,50,000 × 31.2% (incl. cess) = ₹78,000<br /><br />
        <strong>No LTCG benefit or indexation for debt funds since FY 2023-24</strong>
      </div>

      <h2 style={s.h2}>How SIP Redemption is Taxed (FIFO Method)</h2>
      <p style={s.p}>
        This is where most investors get confused. Each SIP installment is a separate purchase with its own acquisition
        date. When you redeem, units are sold in FIFO order — the earliest units are sold first.
      </p>

      <div style={s.example}>
        <div style={s.exampleTitle}>Ajay did SIP of ₹10,000/month for 18 months, then redeemed all</div>
        Total invested: ₹1,80,000 (18 installments)<br />
        Redemption value: ₹2,20,000<br />
        Total gain: ₹40,000<br /><br />
        First 6 installments (months 1-6): Held &gt; 12 months → LTCG<br />
        Last 12 installments (months 7-18): Held &lt; 12 months → STCG<br /><br />
        LTCG portion ≈ ₹13,333 → taxed at 12.5% (if total LTCG &gt; ₹1.25L)<br />
        STCG portion ≈ ₹26,667 → taxed at 20%<br /><br />
        <strong>Tip: Wait until all SIP units complete 12 months to avoid STCG</strong>
      </div>

      <h2 style={s.h2}>Tax-Saving Strategies for Mutual Fund Investors</h2>

      <h3 style={s.h3}>1. Harvest the ₹1.25 Lakh LTCG Exemption Annually</h3>
      <p style={s.p}>
        Every year, you can sell equity mutual fund units with up to ₹1.25 lakh in long-term gains completely tax-free.
        Reinvest the proceeds immediately to reset your cost base. Over 10+ years, this can save lakhs in taxes.
      </p>

      <h3 style={s.h3}>2. Use Tax Loss Harvesting</h3>
      <p style={s.p}>
        If some of your mutual fund investments are in loss, sell them to book the loss and set it off against gains.
        Short-term losses offset short-term and long-term gains. Long-term losses only offset long-term gains.
        Use our <Link to="/tax-loss-harvesting" style={s.link}>Tax Loss Harvesting Calculator</Link> to plan this.
      </p>

      <h3 style={s.h3}>3. Choose Growth Over Dividend for Tax Efficiency</h3>
      <p style={s.p}>
        Dividends from mutual funds are taxed at your slab rate (up to 31.2%). Growth option defers tax until redemption
        and may qualify for the lower LTCG rate. For equity funds, growth is almost always more tax-efficient.
      </p>

      <h3 style={s.h3}>4. ELSS for Double Benefit</h3>
      <p style={s.p}>
        ELSS funds give you Section 80C deduction on investment AND LTCG treatment on redemption. You save tax twice —
        on the investment (up to ₹46,800 at 30% slab) and on gains (only 12.5% above ₹1.25L vs slab rate).
      </p>

      <div style={s.warning}>
        <strong>Important Change:</strong> No indexation benefit is available from FY 2025-26 onwards. All capital gains
        are calculated on actual purchase cost. The old long-term rates with indexation no longer apply to any asset class.
      </div>

      <h2 style={s.h2}>Grandfathering Rule for Pre-2018 Investments</h2>
      <p style={s.p}>
        For equity investments made before Jan 31, 2018, the cost of acquisition is the higher of actual cost or the
        fair market value (FMV) on Jan 31, 2018. This ensures that gains accrued before LTCG was introduced (Budget 2018)
        are not taxed. This only applies to listed equity and equity mutual funds.
      </p>

      <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <ShareButtons text="Capital Gains Tax on Mutual Funds India 2026 — Complete guide with examples\n\ntax.doaide.com/guides/capital-gains-mutual-funds" />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
