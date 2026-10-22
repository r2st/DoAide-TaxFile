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
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14, display: 'block', overflowX: 'auto' },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)', whiteSpace: 'nowrap' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: { padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
}

const FAQS = [
  { q: 'How can a salaried person pay zero tax in FY 2026-27?', a: 'Under the new regime, salary up to ₹12.75 lakh is effectively tax-free: ₹12 lakh taxable income gets a full rebate under Section 87A, and the ₹75,000 standard deduction covers the rest. No investments are needed for this.' },
  { q: 'Which regime is better for salaried employees in 2026?', a: 'For most salaries up to ₹12.75 lakh, the new regime wins automatically. Above that, the old regime wins only if your combined deductions (80C, 80D, HRA, home loan interest, NPS) are large — typically ₹4 lakh or more. Compare both with your real numbers before deciding.' },
  { q: 'Can I claim HRA and home loan interest together?', a: 'Yes, if you genuinely pay rent in one city (where you work) and own a home elsewhere, or your own home is let out. Both claims need documentation — rent receipts and the loan interest certificate.' },
  { q: 'Is NPS worth it just for the tax benefit?', a: 'The extra ₹50,000 deduction under 80CCD(1B) saves up to ₹15,600 at the 30% slab, and employer NPS under 80CCD(2) is deductible even in the new regime. The trade-off is the lock-in till 60 and partial annuitization at exit.' },
  { q: 'When should I submit investment proofs to my employer?', a: 'Most employers collect proofs between December and February. Missing the window means higher TDS from January-March — you can still claim the deductions in your ITR and take the excess back as a refund.' },
]

export default function TaxSavingTipsSalaried2026() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Tax Saving Tips for Salaried Employees India 2026 — 12 Ways to Pay Less | DoAide TaxFile"
        description="12 practical tax saving tips for salaried employees in India for FY 2026-27: regime choice, 80C, 80D, HRA, NPS, salary restructuring, home loan benefits and the proofs calendar."
        keywords="tax saving tips for salaried employees, how to save tax on salary India 2026, salaried tax saving, 80C tips, HRA exemption, NPS tax benefit, salary tax planning FY 2026-27"
        canonical="https://tax.doaide.com/blog/tax-saving-tips-salaried-employees-2026"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Tax Saving Tips for Salaried 2026' }]} />

      <h1 style={s.title}>Tax Saving Tips for Salaried Employees India 2026</h1>
      <p style={s.meta}>For FY 2026-27 (AY 2027-28) · Updated October 2026 · 10 min read</p>

      <p style={s.p}>
        Salaried tax planning in 2026 starts with one decision that outweighs every other tip on this page:
        <strong> which regime you file under</strong>. Get that right first, then stack the deductions that still
        apply to you. Here are twelve tips in the order they actually matter.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Start with your number</div>
        Run your salary through the free <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> and
        the <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link> — every tip below assumes you
        know which regime wins for you.
      </div>

      <h2 style={s.h2}>1. Check if you even need to save tax (up to ₹12.75 lakh = zero)</h2>
      <p style={s.p}>
        Under the new regime, the Section 87A rebate makes taxable income up to ₹12 lakh tax-free, and the ₹75,000
        standard deduction lifts that to ₹12.75 lakh of gross salary. If you earn less, stop buying tax-saving
        products you don&apos;t want — your tax is already zero. Earning slightly above ₹12 lakh? Marginal relief
        softens the cliff; see our <Link to="/blog/marginal-relief-income-above-12-lakh-new-regime" style={s.link}>marginal relief guide</Link>.
      </p>

      <h2 style={s.h2}>2. Pick the regime with arithmetic, not habit</h2>
      <p style={s.p}>
        The old regime is now the opt-in choice. It wins only when your deductions are heavy: as a rule of thumb,
        HRA + 80C + 80D + home loan interest + NPS should together cross roughly ₹4 lakh before the old regime beats
        the new slabs at mid-to-high salaries. The <Link to="/tools/regime-comparison" style={s.link}>regime comparison tool</Link> does
        this with your exact numbers — and remember, salaried employees can switch regimes every year.
      </p>

      <h2 style={s.h2}>3. Max Section 80C — but with investments you would want anyway</h2>
      <p style={s.p}>
        (Old regime.) The ₹1.5 lakh 80C bucket fills faster than you think: EPF alone often covers half for
        mid-level salaries. Fill the rest with ELSS (3-year lock-in, equity returns) or PPF (guaranteed, 15-year),
        and count children&apos;s tuition fees and home-loan principal before buying anything new. Plan the mix with
        the <Link to="/80c-planner" style={s.link}>80C Planner</Link>.
      </p>

      <h2 style={s.h2}>4. Use the full 80D health insurance stack</h2>
      <p style={s.p}>
        (Old regime.) ₹25,000 for your family&apos;s health cover, another ₹25,000 for parents — ₹50,000 if they are
        60+ — and ₹5,000 of preventive check-ups inside those limits. A 30%-slab taxpayer insuring senior-citizen
        parents saves up to ₹23,400 a year, for insurance the family should have anyway. Compute yours with the
        combined <Link to="/80c-80d-calculator" style={s.link}>80C + 80D Calculator</Link>.
      </p>

      <h2 style={s.h2}>5. Add the extra ₹50,000 NPS deduction</h2>
      <p style={s.p}>
        (Old regime.) Section 80CCD(1B) gives ₹50,000 of deduction over and above 80C — up to ₹15,600 saved at the
        top slab. See the <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link> for the retirement math, not
        just the tax math.
      </p>

      <h2 style={s.h2}>6. Ask for employer NPS — it works in BOTH regimes</h2>
      <p style={s.p}>
        Employer contributions to NPS under Section 80CCD(2) — up to 14% of basic in the new regime — are deductible
        even where 80C and 80D are not. If your company offers an NPS option in the flexi-basket, it is one of the
        few levers left for new-regime filers. This single restructuring often beats every old-regime tip combined.
      </p>

      <h2 style={s.h2}>7. Claim HRA properly</h2>
      <p style={s.p}>
        (Old regime.) HRA exemption is the least of: actual HRA received, rent paid minus 10% of basic+DA, and
        50%/40% of basic+DA (metro/non-metro). Pay rent to parents only with real bank transfers and a rent
        agreement — they must declare it as income. Compute the exact exemption with the{' '}
        <Link to="/hra-calculator" style={s.link}>HRA Calculator</Link> and generate{' '}
        <Link to="/rent-receipt-generator" style={s.link}>rent receipts</Link> for proofs season.
      </p>

      <h2 style={s.h2}>8. Don&apos;t waste home loan benefits</h2>
      <p style={s.p}>
        (Old regime.) Interest up to ₹2 lakh under Section 24(b) for a self-occupied home, principal inside 80C, and
        both doubled on a joint loan with a co-owning spouse. Rent out the property and the full interest sets off
        against rental income (loss capped at ₹2 lakh against salary). Details in the{' '}
        <Link to="/home-loan-calculator" style={s.link}>Home Loan Tax Calculator</Link>.
      </p>

      <h2 style={s.h2}>9. Restructure the CTC itself</h2>
      <p style={s.p}>
        Some components are tax-light in either regime: employer NPS (above), telephone/internet reimbursements
        against bills, and gratuity/leave encashment exemptions at exit. Old-regime filers add meal cards, LTA
        (twice in a 4-year block, actual travel fare) and fuel/driver perks where offered. Run your structure
        through the <Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> before your next
        appraisal cycle — fixing the structure in April beats scrambling for proofs in January.
      </p>

      <h2 style={s.h2}>10. Harvest capital gains and losses before March 31</h2>
      <p style={s.p}>
        Equity LTCG up to ₹1.25 lakh a year is tax-free — redeem and reinvest to use the exemption annually.
        Sitting on losers? Booking losses offsets gains and carries forward eight years (if you file on time).
        The <Link to="/tax-loss-harvesting" style={s.link}>Tax Loss Harvesting tool</Link> shows the saving.
      </p>

      <h2 style={s.h2}>11. Mind the proofs calendar</h2>
      <ul style={s.ul}>
        <li><strong>April:</strong> declare your regime and planned investments to the employer; fix CTC structure</li>
        <li><strong>December–February:</strong> submit investment proofs, rent receipts, loan certificates</li>
        <li><strong>Before March 31:</strong> complete 80C/80D/NPS payments and harvest gains/losses</li>
        <li><strong>June–July:</strong> match Form 16 against AIS, then file — the <Link to="/form-16-analyzer" style={s.link}>Form 16 Analyzer</Link> spots mismatches</li>
      </ul>

      <h2 style={s.h2}>12. File on time — the cheapest tax tip of all</h2>
      <p style={s.p}>
        Missing the due date costs a ₹1,000-₹5,000 late fee, 1% monthly interest on unpaid tax, usually locks you
        into the new regime, and forfeits loss carry-forwards. Dates are in the{' '}
        <Link to="/blog/itr-filing-deadlines-2027" style={s.link}>deadline calendar</Link>; if you&apos;ve already
        missed it, the <Link to="/blog/belated-itr-filing-after-due-date-2026" style={s.link}>belated return guide</Link> limits
        the damage.
      </p>

      <h2 style={s.h2}>How Much Can You Actually Save? (Old Regime, 30% Slab)</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Deduction</th>
            <th style={s.th}>Amount</th>
            <th style={s.th}>Tax saved (31.2%)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Section 80C</td><td style={s.td}>₹1,50,000</td><td style={s.td}>₹46,800</td></tr>
          <tr><td style={s.td}>NPS 80CCD(1B)</td><td style={s.td}>₹50,000</td><td style={s.td}>₹15,600</td></tr>
          <tr><td style={s.td}>80D (family + senior parents)</td><td style={s.td}>₹75,000</td><td style={s.td}>₹23,400</td></tr>
          <tr><td style={s.td}>Home loan interest 24(b)</td><td style={s.td}>₹2,00,000</td><td style={s.td}>₹62,400</td></tr>
          <tr><td style={s.td}><strong>Total</strong></td><td style={s.td}><strong>₹4,75,000</strong></td><td style={s.td}><strong>₹1,48,200</strong></td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        That ₹4.75 lakh of deductions is also roughly the point where the old regime starts beating the new one at
        higher salaries — which is why tip #2 comes before everything else.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Put numbers on it today</div>
        Ten minutes with the <Link to="/80c-80d-calculator" style={s.link}>80C + 80D Calculator</Link> and the{' '}
        <Link to="/old-vs-new-regime" style={s.link}>regime comparison</Link> tells you exactly what this year&apos;s
        plan should be — free, no login.
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
