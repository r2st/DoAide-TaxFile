import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import ShareButtons from '../../components/ShareButtons'
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
  { q: 'Can I claim home loan tax benefits under the new tax regime?', a: 'Under the new tax regime, you can only claim Section 24(b) interest deduction on let-out (rented) property. Self-occupied property interest deduction, Section 80C principal repayment, and Section 80EEA are not available under the new regime. If your home loan deductions are substantial, the old regime may save you more tax.' },
  { q: 'What is the maximum home loan interest deduction for a self-occupied property?', a: 'Under Section 24(b), the maximum interest deduction for a self-occupied property is ₹2,00,000 per financial year under the old tax regime. This applies only if construction or purchase is completed within 5 years from the end of the financial year in which the loan was taken. Otherwise, the limit is ₹30,000.' },
  { q: 'Can both husband and wife claim home loan tax benefits?', a: 'Yes, if both are co-borrowers and co-owners of the property. Each can independently claim up to ₹2L interest deduction under Section 24(b) and up to ₹1.5L principal repayment under Section 80C, effectively doubling the total benefit to ₹7L. The loan repayment should be from their respective accounts for cleaner documentation.' },
  { q: 'Is stamp duty eligible for tax deduction?', a: 'Yes. Stamp duty and registration charges paid for property purchase are eligible for deduction under Section 80C, subject to the overall ₹1.5L limit. This can be claimed only in the financial year in which these charges are actually paid, and only under the old tax regime.' },
  { q: 'How do I claim interest paid during the pre-construction period?', a: 'Interest paid from the date of borrowing until March 31 of the year preceding the year in which construction is completed is called pre-construction interest. It can be claimed in 5 equal annual installments starting from the year of completion, in addition to the regular interest of that year. The total deduction (regular + pre-construction installment) is still capped at ₹2L for self-occupied property.' },
  { q: 'Can I claim home loan benefits for a second property?', a: 'Yes. You can treat up to two properties as self-occupied (with the combined interest cap of ₹2L). Any additional property is deemed let-out, and you must offer notional rent as income. However, the full interest on the deemed let-out property is deductible against the rental income, with no ₹2L cap. The net loss from house property that can be set off against other income is capped at ₹2L per year under the old regime.' },
]

export default function HomeLoanTaxBenefits() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Home Loan Tax Benefits: Section 24, 80C, 80EEA Guide 2026-27 | DoAide TaxFile"
        description="Complete guide to home loan tax benefits in India. Section 24(b) interest deduction, 80C principal, 80EEA, joint loan benefits, and old vs new regime comparison for FY 2026-27."
        keywords="home loan tax benefits, Section 24 home loan, 80C home loan, home loan interest deduction, home loan tax saving 2026-27"
        canonical="https://tax.doaide.com/guides/home-loan-tax"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Home Loan Tax Benefits' }]} />

      <h1 style={s.title}>Home Loan Tax Benefits: Section 24, 80C, 80EEA Guide 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 &bull; 12 min read</p>

      {/* Introduction */}
      <p style={s.p}>
        A home loan in India is not just a path to property ownership — it is one of the most powerful tax-saving tools available
        to individual taxpayers. The Income Tax Act provides deductions on three distinct components of a home loan: the interest
        you pay (Section 24), the principal you repay (Section 80C), and additional interest for first-time buyers (Section 80EEA).
        When used strategically, these deductions can reduce your taxable income by ₹5 lakh or more every year, saving over ₹1.5 lakh
        in taxes at the highest slab.
      </p>
      <p style={s.p}>
        This guide covers every home loan tax benefit available for FY 2026-27, explains how each section works under both the
        old and new tax regimes, and walks through a worked example so you can estimate your exact savings. Whether you are buying
        your first home, investing in a rental property, or taking a joint loan with your spouse, understanding these rules will
        help you claim the maximum deduction legally available to you.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Estimate</div>
        Use our <Link to="/home-loan-calculator" style={s.link}>Home Loan Tax Benefit Calculator</Link> to see how much you can save
        this year. Pair it with the <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compare old vs new regime.
      </div>

      {/* Section 24(b) */}
      <h2 style={s.h2}>Section 24(b) — Interest on Home Loan</h2>
      <p style={s.p}>
        Section 24(b) allows you to claim a deduction on the interest component of your home loan EMI. This is the largest
        single tax benefit available to homeowners and applies to both self-occupied and let-out properties, though the rules
        differ significantly between the two.
      </p>

      <h3 style={s.h3}>Self-Occupied Property (Old Regime)</h3>
      <p style={s.p}>
        If you live in the property, you can deduct up to <strong>₹2,00,000</strong> per year in home loan interest from your gross
        total income under the old regime. This applies only if the construction or acquisition is completed within 5 years from the end
        of the financial year in which the loan was taken. If the property is not completed within this period, the deduction limit
        drops to ₹30,000. You can declare up to two properties as self-occupied — the combined interest deduction across both
        is still capped at ₹2 lakh.
      </p>

      <h3 style={s.h3}>Let-Out (Rented) Property</h3>
      <p style={s.p}>
        If the property is rented out, there is <strong>no upper limit</strong> on the interest deduction. The entire interest paid
        during the year is deductible against rental income. Additionally, you get a 30% standard deduction on the annual rental
        value (after deducting municipal taxes), and the remaining interest can create a loss from house property. However, the
        maximum loss that can be set off against other income (salary, business, etc.) is capped at ₹2,00,000 per year.
        Any excess loss can be carried forward for up to 8 years and set off only against future house property income.
      </p>

      <h3 style={s.h3}>New Tax Regime</h3>
      <p style={s.p}>
        Under the new tax regime, Section 24(b) is available <strong>only for let-out property</strong>. Self-occupied property
        interest deduction is not allowed. If your property is rented, the interest is deductible against rental income, but there
        is no set-off of house property loss against other income. This makes the new regime significantly less attractive for
        homeowners with self-occupied properties and large home loans.
      </p>

      {/* Section 80C */}
      <h2 style={s.h2}>Section 80C — Principal Repayment</h2>
      <p style={s.p}>
        The principal portion of your home loan EMI qualifies for deduction under Section 80C, subject to the overall limit
        of <strong>₹1,50,000</strong> per year. This is a combined limit shared with other 80C instruments like PPF, ELSS, EPF,
        LIC premiums, and tax-saver FDs. So if your EPF contribution already uses ₹80,000 of the limit, only ₹70,000 of your
        home loan principal is additionally deductible.
      </p>
      <p style={s.p}>
        In addition to principal repayment, <strong>stamp duty and registration charges</strong> paid at the time of property
        purchase are also eligible under Section 80C — but only in the financial year in which they are actually paid. This is
        a one-time benefit that many buyers overlook. For a property costing ₹60-70 lakh, stamp duty alone can be ₹3-5 lakh,
        easily exhausting the entire 80C limit in the year of purchase.
      </p>
      <p style={s.p}>
        Section 80C is <strong>not available under the new tax regime</strong>. If you opt for the new regime, you lose the
        principal repayment deduction entirely.
      </p>

      {/* Section 80EEA */}
      <h2 style={s.h2}>Section 80EEA — Additional Interest for First-Time Buyers</h2>
      <p style={s.p}>
        Section 80EEA provided an additional deduction of up to <strong>₹1,50,000</strong> on home loan interest for first-time
        homebuyers, over and above the ₹2 lakh limit under Section 24(b). This benefit was available for loans sanctioned
        between 1 April 2019 and 31 March 2022, with the property's stamp duty value not exceeding ₹45 lakh.
      </p>
      <p style={s.p}>
        Since no new loans qualify after March 2022, this section is now <strong>grandfathered</strong>. If your loan was sanctioned
        before the deadline and you have been claiming 80EEA, you can continue to claim the deduction for the remaining tenure
        of the loan, provided the original conditions are still met — you did not own any other residential property on the
        loan sanction date, and the stamp duty value was within ₹45 lakh. No new borrowers can avail this benefit for
        FY 2026-27.
      </p>
      <p style={s.p}>
        Section 80EEA is available <strong>only under the old tax regime</strong>. Combined with Section 24(b), eligible
        borrowers could claim up to ₹3,50,000 in interest deduction annually — a significant saving at higher tax slabs.
      </p>

      {/* Joint Home Loan */}
      <h2 style={s.h2}>Joint Home Loan — Double the Benefits</h2>
      <p style={s.p}>
        Taking a joint home loan with your spouse (or any co-borrower who is also a co-owner) is one of the most effective
        tax planning strategies. Each co-borrower can independently claim the full set of deductions, effectively doubling the
        household benefit:
      </p>
      <ol style={s.ol}>
        <li style={s.li}><strong>Section 24(b):</strong> Each co-borrower claims up to ₹2,00,000 in interest — total ₹4,00,000 for the couple.</li>
        <li style={s.li}><strong>Section 80C:</strong> Each claims up to ₹1,50,000 in principal — total ₹3,00,000.</li>
        <li style={s.li}><strong>Section 80EEA:</strong> If both qualify individually, each claims up to ₹1,50,000 — total ₹3,00,000 (grandfathered loans only).</li>
      </ol>
      <p style={s.p}>
        The combined potential deduction for a couple under the old regime can reach up to ₹7 lakh per year (₹10 lakh if 80EEA
        applies). To claim separately, both must be co-owners of the property and co-borrowers on the loan. The proportion of
        ownership should ideally match the proportion of EMI payments. Maintaining separate bank accounts for EMI payments
        provides cleaner documentation in case of scrutiny.
      </p>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>Pro Tip: Maximize Joint Loan Savings</div>
        If one spouse earns significantly more than the other, ensure both are contributing to EMI payments from their own accounts.
        The higher-earning spouse benefits more from the deduction (saves at 30% slab vs 20% or nil), but both must be genuine
        co-borrowers and co-owners. A couple in the 30% bracket can save up to <span style={s.tipSaving}>₹2,18,400</span> per year
        in taxes from home loan deductions alone.
      </div>

      {/* Under Construction */}
      <h2 style={s.h2}>Under Construction Property — Pre-Construction Interest</h2>
      <p style={s.p}>
        If your property is under construction, you cannot claim interest deduction during the construction period. However,
        the interest paid from the date of borrowing until 31 March of the year immediately preceding the year of completion
        is accumulated as <strong>pre-construction interest</strong>.
      </p>
      <p style={s.p}>
        This pre-construction interest is deductible in <strong>5 equal annual installments</strong>, starting from the financial year in
        which construction is completed or the property is acquired. The installment is claimed in addition to the regular
        interest of that year. For self-occupied property, the combined deduction (regular interest + pre-construction installment)
        remains subject to the ₹2 lakh cap. For let-out property, there is no cap.
      </p>
      <p style={s.p}>
        For example, if you paid ₹4,50,000 in interest during a 3-year construction period, you can claim ₹90,000 per year
        for 5 years (₹4,50,000 / 5) in addition to the ongoing interest. Plan your possession date carefully — if construction
        is not completed within 5 years, the Section 24(b) limit for self-occupied property drops from ₹2 lakh to ₹30,000.
      </p>

      {/* Let-out vs Self-occupied */}
      <h2 style={s.h2}>Let-Out vs Self-Occupied: Tax Treatment Compared</h2>
      <p style={s.p}>
        The tax treatment differs significantly based on whether you live in the property or rent it out. If you own multiple
        properties, you can choose up to two as self-occupied (deemed to have nil rental value). Any additional property must
        be treated as let-out, and you must offer the annual rental value (actual rent received or fair market rent, whichever
        is higher) as income under "Income from House Property."
      </p>

      <h3 style={s.h3}>Let-Out Property Tax Computation</h3>
      <ol style={s.ol}>
        <li style={s.li}>Start with Gross Annual Value (actual rent received or expected rent, whichever is higher)</li>
        <li style={s.li}>Deduct municipal taxes actually paid during the year</li>
        <li style={s.li}>The result is Net Annual Value (NAV)</li>
        <li style={s.li}>Deduct 30% of NAV as standard deduction (flat — no receipts needed)</li>
        <li style={s.li}>Deduct the entire home loan interest paid during the year (no limit for let-out)</li>
        <li style={s.li}>The result is income (or loss) from house property</li>
      </ol>
      <p style={s.p}>
        If the interest exceeds the rental income after standard deduction, you have a loss from house property. Up to ₹2 lakh
        of this loss can be set off against salary, business, or other income in the same year (old regime only). Excess loss
        carries forward for 8 assessment years.
      </p>

      {/* Old vs New Regime Comparison */}
      <h2 style={s.h2}>Home Loan Benefits: Old Regime vs New Regime</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Benefit</th>
              <th style={s.th}>Old Regime</th>
              <th style={s.th}>New Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={s.td}>Sec 24(b) — Self-occupied interest</td>
              <td style={s.tdMono}>Up to ₹2,00,000</td>
              <td style={s.td}>Not available</td>
            </tr>
            <tr>
              <td style={s.td}>Sec 24(b) — Let-out interest</td>
              <td style={s.td}>No limit (against rental income)</td>
              <td style={s.td}>Deductible against rental income</td>
            </tr>
            <tr>
              <td style={s.td}>Sec 80C — Principal repayment</td>
              <td style={s.tdMono}>Up to ₹1,50,000</td>
              <td style={s.td}>Not available</td>
            </tr>
            <tr>
              <td style={s.td}>Sec 80C — Stamp duty &amp; registration</td>
              <td style={s.td}>Within ₹1.5L (year of payment)</td>
              <td style={s.td}>Not available</td>
            </tr>
            <tr>
              <td style={s.td}>Sec 80EEA — Additional interest</td>
              <td style={s.tdMono}>Up to ₹1,50,000 (grandfathered)</td>
              <td style={s.td}>Not available</td>
            </tr>
            <tr>
              <td style={s.td}>House property loss set-off</td>
              <td style={s.tdMono}>Up to ₹2,00,000</td>
              <td style={s.td}>Not allowed</td>
            </tr>
            <tr>
              <td style={s.td}>Standard deduction (salary)</td>
              <td style={s.tdMono}>₹50,000</td>
              <td style={s.tdMono}>₹75,000</td>
            </tr>
            <tr>
              <td style={s.td}>Max combined deduction (individual)</td>
              <td style={s.tdMono}>₹5,00,000+</td>
              <td style={s.td}>Limited to let-out only</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Worked Example */}
      <h2 style={s.h2}>Worked Example: ₹50 Lakh Loan at 8.5%</h2>
      <p style={s.p}>
        Let us take a concrete example. You have taken a home loan of ₹50,00,000 at 8.5% interest for a self-occupied property,
        with a 20-year tenure. In the early years of the loan, the annual interest payment is approximately ₹4,15,000 and the
        annual principal repayment is approximately ₹60,000.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Deduction</th>
              <th style={s.th}>Section</th>
              <th style={s.th}>Claimed</th>
              <th style={s.th}>Cap Applied</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={s.td}>Interest paid</td>
              <td style={s.td}>24(b)</td>
              <td style={s.tdMono}>₹4,15,000</td>
              <td style={s.tdMono}>₹2,00,000</td>
            </tr>
            <tr>
              <td style={s.td}>Principal repaid</td>
              <td style={s.td}>80C</td>
              <td style={s.tdMono}>₹60,000</td>
              <td style={s.tdMono}>₹60,000</td>
            </tr>
            <tr>
              <td style={{ ...s.td, fontWeight: 600 }}>Total deduction</td>
              <td style={s.td}></td>
              <td style={s.td}></td>
              <td style={{ ...s.tdMono, fontWeight: 600 }}>₹2,60,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={s.h3}>Tax Savings by Income Slab (Old Regime)</h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Tax Slab</th>
              <th style={s.th}>Tax Saved on ₹2,60,000</th>
              <th style={s.th}>Monthly Saving</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={s.td}>30% (income above ₹10L)</td>
              <td style={s.tdMono}>₹81,120 (incl. 4% cess)</td>
              <td style={s.tdMono}>₹6,760/mo</td>
            </tr>
            <tr>
              <td style={s.td}>20% (income ₹5L-10L)</td>
              <td style={s.tdMono}>₹54,080</td>
              <td style={s.tdMono}>₹4,507/mo</td>
            </tr>
            <tr>
              <td style={s.td}>5% (income ₹2.5L-5L)</td>
              <td style={s.tdMono}>₹13,520</td>
              <td style={s.tdMono}>₹1,127/mo</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={s.p}>
        For a couple taking a joint loan in the 30% bracket, the combined annual tax saving can reach <strong>₹1,62,240</strong> or
        about <strong>₹13,520 per month</strong>. This effectively reduces the real cost of your EMI by a significant margin. Use
        our <Link to="/emi-calculator" style={s.link}>EMI Calculator</Link> to see the exact EMI breakdown and plan your repayment.
      </p>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>Effective Interest Rate After Tax</div>
        At the 30% bracket, a ₹50L loan at 8.5% has an effective interest rate of approximately <span style={s.tipSaving}>5.95%</span> after
        accounting for the Section 24(b) deduction. This makes home loans one of the cheapest forms of borrowing when tax benefits
        are factored in. Compare this with your investment returns before deciding to prepay.
      </div>

      {/* Common Mistakes */}
      <h2 style={s.h2}>Common Mistakes to Avoid</h2>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>1. Claiming deduction before possession</div>
        You cannot claim interest deduction under Section 24(b) until the property construction is complete and you have possession.
        Interest during construction is accumulated and claimed later as pre-construction interest in 5 installments.
      </div>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>2. Forgetting stamp duty in year of purchase</div>
        Stamp duty and registration charges are deductible under 80C only in the year of payment. If you miss claiming it that year,
        you cannot carry it forward. This is often ₹3-5 lakh — plan your other 80C investments accordingly.
      </div>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>3. Not splitting EMI for joint loans</div>
        Both co-borrowers must pay their share of EMI from their own bank accounts. If only one person pays, the other cannot claim
        the deduction even if they are a co-owner. Set up standing instructions from both accounts.
      </div>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>4. Choosing new regime without calculating</div>
        Many salaried individuals default to the new regime without realizing they lose ₹3.5L+ in home loan deductions. Always
        compute tax under both regimes before filing. Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compare.
      </div>
      <div style={s.tipCard}>
        <div style={s.tipTitle}>5. Missing the 5-year completion deadline</div>
        If construction is not completed within 5 years from the end of the FY in which the loan was taken, the Section 24(b)
        limit for self-occupied property drops from ₹2,00,000 to just ₹30,000. Monitor your builder's timeline carefully.
      </div>

      {/* Related Calculators */}
      <h2 style={s.h2}>Related Calculators</h2>
      <p style={s.p}>
        Use these tools to plan your home loan and tax savings:
      </p>
      <p style={s.p}>
        <Link to="/home-loan-calculator" style={s.link}>Home Loan Tax Benefit Calculator</Link> — Estimate your total deduction under Sections 24, 80C, and 80EEA.<br />
        <Link to="/emi-calculator" style={s.link}>EMI Calculator</Link> — Compute your monthly EMI and see the interest vs principal split year by year.<br />
        <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — Compare your total tax under old and new regimes including all deductions.
      </p>

      <div style={{ marginTop: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <ShareButtons text="Home Loan Tax Benefits Guide FY 2026-27 — Section 24(b) interest, 80C principal, 80EEA, joint loan tips, old vs new regime comparison\n\ntax.doaide.com/guides/home-loan-tax" />
        <PrintButton />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
