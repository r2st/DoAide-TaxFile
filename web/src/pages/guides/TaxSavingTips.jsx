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
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  tipCard: {
    padding: 20, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 16, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  tipTitle: { fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 4, fontSize: 15 },
  tipSaving: { fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-gold)', fontWeight: 600 },
  tipRegime: { fontSize: 12, color: 'var(--doaide-text-muted)', marginTop: 4 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  tdMono: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
}

const FAQS = [
  { q: 'How much tax can a salaried employee save in India?', a: 'A salaried employee in the 30% tax bracket can save up to ₹2 lakh or more in taxes per year by fully utilizing deductions under Section 80C (₹1.5L), 80CCD(1B) (₹50K), 80D (up to ₹75K), HRA exemption, and home loan interest under Section 24(b). The exact savings depend on your income level, deductions claimed, and whether you choose the old or new tax regime.' },
  { q: 'Which tax regime is better for salaried employees in 2026-27?', a: 'The new regime is better for most employees with income up to ₹15 lakh or those without significant deductions. If your total deductions (80C, 80D, HRA, home loan interest) exceed ₹3.75-4.5 lakh, the old regime may save more tax. Use a tax calculator to compare both regimes with your actual numbers before deciding.' },
  { q: 'Can I claim 80C and 80D deductions in the new regime?', a: 'No. Section 80C and 80D deductions are not available under the new tax regime. The new regime only allows standard deduction of ₹75,000, employer NPS contribution under 80CCD(2), and interest on let-out property. All other deductions like 80C, 80D, HRA, and home loan interest are exclusive to the old regime.' },
  { q: 'What is the best tax-saving investment under Section 80C?', a: 'ELSS mutual funds are generally the best 80C investment because they have the shortest lock-in period (3 years) and offer equity market returns. EPF is excellent for risk-averse investors with employer matching. PPF offers guaranteed returns with a 15-year lock-in. The best choice depends on your risk tolerance, liquidity needs, and existing investments.' },
  { q: 'Is NPS worth it for tax saving?', a: 'Yes, NPS offers an additional ₹50,000 deduction under 80CCD(1B) over and above the ₹1.5 lakh limit of 80C. Moreover, employer NPS contribution under 80CCD(2) is deductible even under the new regime, making it the most valuable deduction for new regime taxpayers. The downside is limited liquidity until retirement.' },
  { q: 'When should I start tax planning for FY 2026-27?', a: 'Start in April at the beginning of the financial year. This gives you 12 months to spread investments through SIPs, restructure salary components with your employer, and avoid the last-minute rush in March. Starting early also means your investments get the full year to grow.' },
]

export default function TaxSavingTips() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Top 15 Tax Saving Tips for Salaried Employees 2026-27 | DoAide TaxFile"
        description="15 actionable tax saving tips for salaried employees in India. Save up to ₹2 lakh in taxes with these strategies for FY 2026-27."
        keywords="tax saving tips salaried employees, how to save tax India 2026, tax saving strategies, reduce income tax legally, tax planning tips"
        canonical="https://tax.doaide.com/guides/tax-saving-tips"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Tax Saving Tips' }]} />

      <h1 style={s.title}>Top 15 Tax Saving Tips for Salaried Employees 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 • 10 min read</p>

      <p style={s.p}>
        Paying more income tax than necessary? Most salaried employees in India miss out on legitimate tax-saving
        opportunities simply because they don't plan early or don't know all the options available. This guide covers
        15 actionable tips that can help you save up to ₹2 lakh in taxes for FY 2026-27 — across both old and new regimes.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Before You Start</div>
        The first and most important decision is choosing the right tax regime. The new regime offers lower rates and
        zero tax up to ₹12.75 lakh, while the old regime allows deductions that can reduce tax significantly at higher
        incomes. Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compare both regimes with your actual numbers.
      </div>

      {/* Tip 1 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>1. Choose the Right Tax Regime</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          This is the single most impactful tax decision you make each year. The new regime offers lower slab rates and
          zero tax up to ₹12.75 lakh, but drops most deductions. The old regime has higher rates but allows deductions
          under 80C, 80D, HRA, and home loan interest. If your total deductions exceed ₹3.75-4.5 lakh, the old regime
          usually wins. Run both scenarios through a calculator before deciding.
        </p>
        <div style={s.tipSaving}>Potential saving: ₹25,000 - ₹1,00,000+ depending on income</div>
        <div style={s.tipRegime}>Works in: Both Regimes</div>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <Link to="/income-tax-calculator" style={s.link}>Compare regimes with our calculator →</Link>
        </p>
      </div>

      {/* Tip 2 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>2. Max Out Section 80C — ₹1.5 Lakh Deduction</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          Section 80C offers a deduction of up to ₹1,50,000 on investments in EPF, PPF, ELSS mutual funds, Sukanya
          Samriddhi Yojana (SSY), NSC, tax-saving FDs, life insurance premiums, and tuition fees. Your EPF contribution
          already counts toward this limit. ELSS funds have the shortest lock-in (3 years) and offer equity market returns,
          making them the most popular choice for young earners.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: up to ₹46,800 (including cess)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <Link to="/80c-planner" style={s.link}>Plan your 80C investments →</Link>
        </p>
      </div>

      {/* Tip 3 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>3. NPS Extra ₹50,000 Under Section 80CCD(1B)</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          Over and above the ₹1.5 lakh limit of 80C, you can claim an additional ₹50,000 deduction by investing in
          the National Pension System (NPS) under Section 80CCD(1B). This is one of the easiest ways to get an extra
          deduction beyond the 80C cap. NPS also builds a retirement corpus with equity exposure up to 75%.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: up to ₹15,600 (including cess)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <Link to="/nps-calculator" style={s.link}>Calculate your NPS tax benefit →</Link>
        </p>
      </div>

      {/* Tip 4 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>4. Employer NPS Contribution — Section 80CCD(2)</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          This is the single best deduction available in the new regime. If your employer contributes to NPS on your
          behalf (up to 14% of basic salary for central government employees, 10% for others), this amount is deductible
          under Section 80CCD(2) — even in the new tax regime. Ask your HR department to restructure your CTC to include
          employer NPS contribution. This deduction has no upper cap other than the percentage of basic salary.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: ₹15,600 - ₹1,56,000+ (depends on basic salary)</div>
        <div style={s.tipRegime}>Works in: Both Regimes</div>
      </div>

      {/* Tip 5 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>5. Health Insurance Premium — Section 80D</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          You can claim up to ₹25,000 for health insurance premiums for self, spouse, and children. An additional
          ₹25,000 is available for parents' health insurance. If parents are senior citizens (60+), the additional
          limit increases to ₹50,000, bringing the total deduction to ₹75,000. Preventive health check-ups up to
          ₹5,000 are also covered within this limit.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: up to ₹23,400 (including cess)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <Link to="/80d-calculator" style={s.link}>Calculate your 80D deduction →</Link>
        </p>
      </div>

      {/* Tip 6 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>6. HRA Exemption — Restructure Your Salary</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          If you live in a rented accommodation, the HRA exemption can save you significant tax. The exemption is the
          minimum of: actual HRA received, 50% of basic salary (metro cities) or 40% (non-metro), or rent paid minus
          10% of basic salary. If your salary doesn't include HRA, ask your employer to restructure it. Even if you pay
          rent to parents, you can claim HRA (ensure rent receipts and your parents declare the rental income).
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: ₹15,000 - ₹1,00,000+ (depends on rent and salary)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <Link to="/hra-calculator" style={s.link}>Calculate your HRA exemption →</Link>
        </p>
      </div>

      {/* Tip 7 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>7. Home Loan Interest — Section 24(b)</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          If you have a home loan for a self-occupied property, you can claim a deduction of up to ₹2,00,000 per year
          on the interest paid under Section 24(b). For a let-out property, there is no upper limit on interest
          deduction. Additionally, principal repayment qualifies under Section 80C (within the ₹1.5 lakh limit). This
          makes home loans one of the most tax-efficient forms of debt.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: up to ₹62,400 (including cess)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <Link to="/home-loan-calculator" style={s.link}>Calculate your home loan tax benefit →</Link>
        </p>
      </div>

      {/* Tip 8 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>8. Salary Restructuring — Tax-Free Allowances</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          Work with your employer to restructure your salary to include tax-efficient components. Food coupons (Sodexo/meal
          cards) up to ₹50 per meal are tax-free. Leave Travel Allowance (LTA) covers domestic travel for you and your
          family (exempt twice in a block of 4 years). Conveyance allowance, uniform allowance, and telephone/internet
          reimbursement can further reduce your taxable income. The key is to convert taxable special allowance into
          these specific exempt components.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: ₹10,000 - ₹50,000 (depends on restructuring)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
      </div>

      {/* Tip 9 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>9. Standard Deduction — Available in Both Regimes</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          Every salaried employee and pensioner automatically gets a standard deduction — ₹75,000 under the new regime
          and ₹50,000 under the old regime for FY 2026-27. No documentation or proof is required. This is a flat
          deduction from your gross salary before computing taxable income. It replaced the transport allowance and
          medical reimbursement that existed earlier.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: ₹15,600 (old) to ₹23,400 (new) including cess</div>
        <div style={s.tipRegime}>Works in: Both Regimes</div>
      </div>

      {/* Tip 10 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>10. Tax Harvest Equity Gains — ₹1.25 Lakh LTCG Tax-Free</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          Long-term capital gains (LTCG) on equity and equity mutual funds up to ₹1.25 lakh per year are completely
          tax-free. If your equity investments have unrealized gains, you can sell and immediately rebuy to book gains
          up to ₹1.25 lakh each year without paying any tax. This resets your purchase price higher, reducing future
          tax liability. Plan this systematically — sell in January-March to use the exemption before the financial year ends.
        </p>
        <div style={s.tipSaving}>Tax saving at 12.5% LTCG rate: up to ₹15,625 per year</div>
        <div style={s.tipRegime}>Works in: Both Regimes</div>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <Link to="/tax-loss-harvesting" style={s.link}>Learn about tax-loss harvesting →</Link>
        </p>
      </div>

      {/* Tip 11 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>11. Education Loan Interest — Section 80E</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          If you have taken an education loan for higher studies (for yourself, spouse, or children), the entire
          interest paid is deductible under Section 80E — there is no upper limit on this deduction. The deduction
          is available for 8 years from the year you start repaying the loan, or until the interest is fully paid,
          whichever is earlier. This applies to loans from financial institutions and approved charitable institutions only.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: depends on interest paid (no upper limit)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
      </div>

      {/* Tip 12 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>12. Donations — Section 80G</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          Donations to specified funds and charitable institutions qualify for deduction under Section 80G. Some donations
          get 100% deduction (PM National Relief Fund, National Defence Fund), while others get 50% deduction. Cash
          donations above ₹2,000 are not eligible — use bank transfer, cheque, or UPI. Keep the donation receipt with
          the institution's PAN and 80G registration number for claiming the deduction.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: varies (50% or 100% of donation amount)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
      </div>

      {/* Tip 13 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>13. Electric Vehicle Loan Interest — Section 80EEB</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          If you have taken a loan to purchase an electric vehicle, the interest paid is deductible up to ₹1,50,000
          under Section 80EEB. The loan must have been sanctioned between 1st April 2019 and 31st March 2023 from a
          financial institution. While new loans may not qualify, existing loans sanctioned within the eligible window
          continue to get the deduction for the full loan tenure. Check applicability for your specific loan.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: up to ₹46,800 (including cess)</div>
        <div style={s.tipRegime}>Works in: Old Regime (if still applicable)</div>
      </div>

      {/* Tip 14 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>14. Professional Tax — Deductible Under Section 16</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          Professional tax levied by your state government (typically ₹2,400 - ₹2,500 per year, deducted by your
          employer) is fully deductible under Section 16 of the Income Tax Act. This is usually already reflected in
          your Form 16, but verify that it has been correctly claimed. While the amount is small, every rupee of
          deduction counts when you are in the higher tax brackets.
        </p>
        <div style={s.tipSaving}>Tax saving at 30% slab: up to ₹780 (including cess)</div>
        <div style={s.tipRegime}>Works in: Old Regime</div>
      </div>

      {/* Tip 15 */}
      <div style={s.tipCard}>
        <div style={s.tipTitle}>15. Time Your Investments — Start SIPs in April, Not March</div>
        <p style={{ ...s.p, marginBottom: 8 }}>
          Most people rush to make tax-saving investments in March, missing out on 11 months of potential returns.
          Start your ELSS SIPs in April to spread your ₹1.5 lakh 80C investment over the year. This gives you rupee
          cost averaging, a full year of compounding, and avoids investing a lump sum at a potentially high market point.
          Set up automatic SIPs so tax planning becomes effortless. The same principle applies to NPS contributions,
          PPF deposits, and health insurance premium payments.
        </p>
        <div style={s.tipSaving}>Extra returns: ₹5,000 - ₹15,000 per year (from 11 months of extra compounding)</div>
        <div style={s.tipRegime}>Works in: Both Regimes</div>
      </div>

      <h2 style={s.h2}>Summary: Which Tips Work in Which Regime?</h2>
      <p style={s.p}>
        Here is a quick reference table showing which tax-saving tips are applicable under the new regime, old regime, or both.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Tip</th>
              <th style={s.th}>New Regime</th>
              <th style={s.th}>Old Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={s.td}>1. Choose the right tax regime</td>
              <td style={s.tdMono}>Yes</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>2. Section 80C (₹1.5L)</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>3. NPS 80CCD(1B) (₹50K)</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>4. Employer NPS 80CCD(2)</td>
              <td style={s.tdMono}>Yes</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>5. Health insurance 80D</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>6. HRA exemption</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>7. Home loan interest 24(b)</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>8. Salary restructuring</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>9. Standard deduction</td>
              <td style={s.tdMono}>₹75,000</td>
              <td style={s.tdMono}>₹50,000</td>
            </tr>
            <tr>
              <td style={s.td}>10. Tax harvest equity gains</td>
              <td style={s.tdMono}>Yes</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>11. Education loan 80E</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>12. Donations 80G</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>13. EV loan interest 80EEB</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>14. Professional tax</td>
              <td style={s.tdMono}>No</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
            <tr>
              <td style={s.td}>15. Time investments correctly</td>
              <td style={s.tdMono}>Yes</td>
              <td style={s.tdMono}>Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Not sure which tips apply to you?</div>
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compare both
        regimes with your actual numbers. Enter your salary, deductions, and investments to see exactly how much
        tax you can save under each regime.
      </div>

      <h2 style={s.h2}>Frequently Asked Questions</h2>
      <FAQSection faqs={FAQS} />

      <div style={{ display: 'flex', gap: 12, marginTop: 32, marginBottom: 48 }}>
        <ShareButtons />
        <PrintButton />
      </div>
    </div>
  )
}
