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

const faqs = [
  {
    question: 'Which tax regime is the default for FY 2026-27?',
    answer: 'The new tax regime is the default regime from FY 2023-24 onwards. If you want to opt for the old regime, you need to explicitly select it while filing your return. Salaried employees can inform their employer at the start of the year so TDS is deducted accordingly.',
  },
  {
    question: 'Can I switch between old and new regime every year?',
    answer: 'Salaried individuals with no business income can switch between old and new regime every financial year. However, individuals with business or professional income can switch back to the old regime only once — after that the new regime becomes permanent.',
  },
  {
    question: 'Is Section 80C available in the new tax regime?',
    answer: 'No. Section 80C deductions (PPF, ELSS, life insurance premium, tuition fees, etc.) are not available in the new tax regime. Only a limited set of deductions — standard deduction of Rs 75,000, employer NPS contribution under 80CCD(2), and interest on let-out property — are available.',
  },
  {
    question: 'What is the rebate under Section 87A in both regimes?',
    answer: 'Under the old regime, a full tax rebate is available if your total taxable income does not exceed Rs 5 lakh. Under the new regime, the rebate limit has been increased to Rs 12 lakh (effective from FY 2025-26 budget), making income up to Rs 12 lakh effectively tax-free in the new regime.',
  },
  {
    question: 'At what income level does the old regime become better?',
    answer: 'The old regime generally becomes beneficial when your total eligible deductions exceed Rs 3.75 lakh to Rs 4.5 lakh, depending on your income level. For incomes above Rs 20 lakh with deductions exceeding Rs 5 lakh (including HRA, home loan interest, 80C, 80D, and NPS), the old regime can save significant tax.',
  },
  {
    question: 'Does the new regime offer any benefit for home loan borrowers?',
    answer: 'The new regime allows deduction of interest on let-out (rented) property, but does not allow the Rs 2 lakh deduction on self-occupied property interest under Section 24(b). If your home loan interest is a major deduction, the old regime may be more beneficial. Run the numbers using our Income Tax Calculator to check.',
  },
]

export default function OldVsNewRegime() {
  return (
    <>
      <SEOHead
        title="Old vs New Tax Regime 2026-27: Which is Better for You? | DoAide TaxFile"
        description="Detailed comparison of old and new tax regimes for FY 2026-27. Tax slabs, deductions, break-even analysis, and worked examples at ₹10L, ₹15L, ₹20L, ₹30L income."
        keywords="old vs new tax regime 2026-27, which tax regime is better, new regime vs old regime comparison, tax regime calculator India"
        canonical="https://tax.doaide.com/guides/old-vs-new-regime"
      />
      <div style={s.page}>
        <Breadcrumb items={[
          { label: 'Guides', path: '/guides' },
          { label: 'Old vs New Tax Regime' },
        ]} />

        <h1 style={s.title}>Old vs New Tax Regime 2026-27: Which is Better for You?</h1>
        <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) &middot; 12 min read</p>

        <p style={s.p}>
          "Should I choose the old regime or the new regime?" — this is the single most common question taxpayers ask every year. The answer is not the same for everyone. It depends on your income level, the deductions you actually claim, and whether you have investments like PPF, ELSS, home loans, or health insurance premiums. This guide walks you through a systematic comparison so you can make an informed choice with confidence.
        </p>
        <p style={s.p}>
          The new tax regime, which became the default from FY 2023-24, offers lower slab rates but strips away most deductions and exemptions. The old regime retains higher rates but lets you claim the full suite of deductions under Sections 80C, 80D, 24(b), HRA, and more. The right choice depends entirely on how much you can actually deduct.
        </p>

        {/* --- Slab comparison --- */}
        <h2 style={s.h2}>Side-by-Side: Tax Slab Comparison for FY 2026-27</h2>
        <p style={s.p}>
          The table below compares the income tax slabs under both regimes. The new regime has more granular slabs with lower rates, while the old regime has fewer slabs with higher rates but allows deductions to reduce taxable income.
        </p>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Income Slab</th>
              <th style={s.th}>Old Regime Rate</th>
              <th style={s.th}>New Regime Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Up to Rs 2.5 lakh</td><td style={s.tdMono}>Nil</td><td style={s.tdMono}>Nil</td></tr>
            <tr><td style={s.td}>Rs 2.5L - Rs 3L</td><td style={s.tdMono}>5%</td><td style={s.tdMono}>Nil</td></tr>
            <tr><td style={s.td}>Rs 3L - Rs 4L</td><td style={s.tdMono}>5%</td><td style={s.tdMono}>Nil</td></tr>
            <tr><td style={s.td}>Rs 4L - Rs 5L</td><td style={s.tdMono}>5%</td><td style={s.tdMono}>5%</td></tr>
            <tr><td style={s.td}>Rs 5L - Rs 8L</td><td style={s.tdMono}>20%</td><td style={s.tdMono}>5%</td></tr>
            <tr><td style={s.td}>Rs 8L - Rs 10L</td><td style={s.tdMono}>20%</td><td style={s.tdMono}>10%</td></tr>
            <tr><td style={s.td}>Rs 10L - Rs 12L</td><td style={s.tdMono}>30%</td><td style={s.tdMono}>10%</td></tr>
            <tr><td style={s.td}>Rs 12L - Rs 16L</td><td style={s.tdMono}>30%</td><td style={s.tdMono}>15%</td></tr>
            <tr><td style={s.td}>Rs 16L - Rs 20L</td><td style={s.tdMono}>30%</td><td style={s.tdMono}>20%</td></tr>
            <tr><td style={s.td}>Rs 20L - Rs 24L</td><td style={s.tdMono}>30%</td><td style={s.tdMono}>25%</td></tr>
            <tr><td style={s.td}>Above Rs 24 lakh</td><td style={s.tdMono}>30%</td><td style={s.tdMono}>30%</td></tr>
          </tbody>
        </table>

        <div style={s.callout}>
          <div style={s.calloutTitle}>Key Difference in Basic Exemption</div>
          The old regime exempts income up to Rs 2.5 lakh (Rs 3 lakh for senior citizens aged 60-80). The new regime exempts income up to Rs 4 lakh for all age groups, with no separate senior citizen category.
        </div>

        {/* --- Key differences --- */}
        <h2 style={s.h2}>Key Differences Between Old and New Regime</h2>

        <h3 style={s.h3}>Standard Deduction</h3>
        <p style={s.p}>
          The old regime provides a standard deduction of Rs 50,000 for salaried individuals and pensioners. The new regime has increased this to Rs 75,000 from FY 2024-25 onwards. This is one of the few deductions available in the new regime and is automatically applied — no investment or proof required.
        </p>

        <h3 style={s.h3}>Section 87A Rebate</h3>
        <p style={s.p}>
          Under the old regime, taxpayers with total taxable income up to Rs 5 lakh get a full rebate — effectively zero tax. The new regime has dramatically expanded this: income up to Rs 12 lakh is eligible for a full rebate under Section 87A (after the standard deduction of Rs 75,000, this means gross salary up to Rs 12.75 lakh is tax-free). This is a major advantage for middle-income earners who do not have significant deductions to claim.
        </p>

        <h3 style={s.h3}>Surcharge Rates</h3>
        <p style={s.p}>
          For incomes above Rs 50 lakh, surcharge applies in both regimes. However, the new regime caps the maximum surcharge at 25% (on income above Rs 2 crore), while the old regime can go up to 37%. This makes a meaningful difference for very high-income taxpayers.
        </p>

        {/* --- Deductions lost --- */}
        <h2 style={s.h2}>Deductions You Lose in the New Regime</h2>
        <p style={s.p}>
          The new regime removes access to over 70 exemptions and deductions. Here are the most impactful ones that salaried individuals commonly claim:
        </p>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Deduction</th>
              <th style={s.th}>Section</th>
              <th style={s.th}>Typical Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>PPF, ELSS, Life Insurance, EPF</td><td style={s.td}>80C</td><td style={s.tdMono}>Up to Rs 1.5L</td></tr>
            <tr><td style={s.td}>Health Insurance Premium</td><td style={s.td}>80D</td><td style={s.tdMono}>Rs 25K - Rs 1L</td></tr>
            <tr><td style={s.td}>House Rent Allowance</td><td style={s.td}>10(13A)</td><td style={s.tdMono}>Rs 1L - Rs 3L</td></tr>
            <tr><td style={s.td}>NPS Self Contribution</td><td style={s.td}>80CCD(1B)</td><td style={s.tdMono}>Rs 50,000</td></tr>
            <tr><td style={s.td}>Home Loan Interest (Self-occupied)</td><td style={s.td}>24(b)</td><td style={s.tdMono}>Up to Rs 2L</td></tr>
            <tr><td style={s.td}>Education Loan Interest</td><td style={s.td}>80E</td><td style={s.tdMono}>Full amount</td></tr>
            <tr><td style={s.td}>Donations to Charity</td><td style={s.td}>80G</td><td style={s.tdMono}>Varies</td></tr>
            <tr><td style={s.td}>Savings Account Interest</td><td style={s.td}>80TTA</td><td style={s.tdMono}>Up to Rs 10,000</td></tr>
            <tr><td style={s.td}>Leave Travel Allowance</td><td style={s.td}>10(5)</td><td style={s.tdMono}>Varies</td></tr>
          </tbody>
        </table>

        {/* --- Deductions still available --- */}
        <h2 style={s.h2}>Deductions Still Available in the New Regime</h2>
        <p style={s.p}>
          While the new regime removes most deductions, a handful remain available. These are important to factor in when making your comparison:
        </p>
        <ol style={s.ol}>
          <li style={s.li}><strong>Standard Deduction:</strong> Rs 75,000 for salaried individuals and pensioners (higher than the Rs 50,000 in the old regime).</li>
          <li style={s.li}><strong>Employer NPS Contribution (80CCD(2)):</strong> Your employer's contribution to NPS (up to 14% of basic salary for central government employees, 10% for others) is deductible in both regimes.</li>
          <li style={s.li}><strong>Interest on Let-out Property:</strong> If you have a rented-out property, the interest paid on that home loan is deductible against rental income in both regimes. Only the self-occupied property interest deduction under Section 24(b) is disallowed.</li>
          <li style={s.li}><strong>Agniveer Corpus Fund (80CCH):</strong> Contributions to the Agniveer Corpus Fund are deductible in both regimes.</li>
          <li style={s.li}><strong>Voluntary Retirement Exemption (10(10C)):</strong> Compensation received on voluntary retirement up to Rs 5 lakh is exempt in both regimes.</li>
        </ol>

        {/* --- Break-even analysis --- */}
        <h2 style={s.h2}>Break-Even Analysis: How Much Deduction Do You Need?</h2>
        <p style={s.p}>
          The core question is: how much in total deductions do you need to claim before the old regime starts saving you more tax than the new regime? The break-even point varies by income level. Below is an approximate analysis for key income levels.
        </p>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Gross Income</th>
              <th style={s.th}>New Regime Tax</th>
              <th style={s.th}>Break-Even Deductions (Old Regime)</th>
              <th style={s.th}>Verdict</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Rs 10 lakh</td><td style={s.tdMono}>Nil (87A rebate)</td><td style={s.td}>Not possible</td><td style={s.td}>New regime wins</td></tr>
            <tr><td style={s.td}>Rs 12 lakh</td><td style={s.tdMono}>Nil (87A rebate)</td><td style={s.td}>Not possible</td><td style={s.td}>New regime wins</td></tr>
            <tr><td style={s.td}>Rs 15 lakh</td><td style={s.tdMono}>Rs 1,12,500</td><td style={s.td}>~Rs 3.75 lakh</td><td style={s.td}>Depends on deductions</td></tr>
            <tr><td style={s.td}>Rs 20 lakh</td><td style={s.tdMono}>Rs 2,73,000</td><td style={s.td}>~Rs 4.50 lakh</td><td style={s.td}>Depends on deductions</td></tr>
            <tr><td style={s.td}>Rs 25 lakh</td><td style={s.tdMono}>Rs 4,48,500</td><td style={s.td}>~Rs 5.25 lakh</td><td style={s.td}>Depends on deductions</td></tr>
            <tr><td style={s.td}>Rs 30 lakh</td><td style={s.tdMono}>Rs 5,98,500</td><td style={s.td}>~Rs 5.75 lakh</td><td style={s.td}>Old regime often wins</td></tr>
          </tbody>
        </table>
        <p style={s.p}>
          Note: Break-even deductions are the total deductions (80C + 80D + HRA + 24(b) + others) beyond the standard deduction that you need to claim in the old regime to make it cheaper than the new regime. The figures above include the 4% health and education cess.
        </p>

        {/* --- Worked example at 10L --- */}
        <h2 style={s.h2}>Worked Example: Income of Rs 10 Lakh</h2>
        <p style={s.p}>
          Let us take a salaried individual earning Rs 10 lakh gross salary with Rs 1.5 lakh in Section 80C investments and Rs 25,000 in health insurance (80D).
        </p>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>New Regime Calculation</div>
          Gross Salary: Rs 10,00,000<br />
          Less: Standard Deduction: Rs 75,000<br />
          Taxable Income: Rs 9,25,000<br />
          Since taxable income is below Rs 12 lakh, Section 87A rebate applies.<br />
          <strong>Tax Payable: <span style={s.tipSaving}>Nil</span></strong>
        </div>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>Old Regime Calculation</div>
          Gross Salary: Rs 10,00,000<br />
          Less: Standard Deduction: Rs 50,000<br />
          Less: 80C: Rs 1,50,000<br />
          Less: 80D: Rs 25,000<br />
          Taxable Income: Rs 7,75,000<br />
          Tax on Rs 7,75,000: Rs 12,500 (5% on Rs 2.5L-5L) + Rs 55,000 (20% on Rs 5L-7.75L) = Rs 67,500<br />
          Add: Cess 4%: Rs 2,700<br />
          <strong>Tax Payable: <span style={s.tipSaving}>Rs 70,200</span></strong>
        </div>
        <p style={s.p}>
          At Rs 10 lakh income, the new regime is the clear winner — zero tax versus Rs 70,200 in the old regime even with Rs 1.75 lakh in deductions. The Section 87A rebate in the new regime makes income up to Rs 12 lakh effectively tax-free.
        </p>

        {/* --- Worked example at 15L --- */}
        <h2 style={s.h2}>Worked Example: Income of Rs 15 Lakh</h2>
        <p style={s.p}>
          At Rs 15 lakh, the comparison becomes interesting. We will look at two scenarios: a basic deduction profile and a high deduction profile.
        </p>

        <h3 style={s.h3}>Scenario A: Basic Deductions Only (80C + 80D)</h3>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>New Regime</div>
          Taxable Income: Rs 15,00,000 - Rs 75,000 = Rs 14,25,000<br />
          Tax: Rs 0 (up to 4L) + Rs 20,000 (4L-8L at 5%) + Rs 40,000 (8L-12L at 10%) + Rs 33,750 (12L-14.25L at 15%) = Rs 93,750<br />
          Add: Cess 4%: Rs 3,750<br />
          <strong>Tax Payable: <span style={s.tipSaving}>Rs 97,500</span></strong>
        </div>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>Old Regime (80C Rs 1.5L + 80D Rs 25K)</div>
          Taxable Income: Rs 15,00,000 - Rs 50,000 - Rs 1,50,000 - Rs 25,000 = Rs 12,75,000<br />
          Tax: Rs 12,500 (2.5L-5L at 5%) + Rs 1,00,000 (5L-10L at 20%) + Rs 82,500 (10L-12.75L at 30%) = Rs 1,95,000<br />
          Add: Cess 4%: Rs 7,800<br />
          <strong>Tax Payable: <span style={s.tipSaving}>Rs 2,02,800</span></strong>
        </div>
        <p style={s.p}>
          With only basic deductions, the new regime saves Rs 1,05,300. The old regime needs significantly more deductions to compete.
        </p>

        <h3 style={s.h3}>Scenario B: High Deductions (80C + 80D + HRA + 24(b) + NPS)</h3>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>Old Regime (Total Deductions: Rs 5.25L)</div>
          80C: Rs 1,50,000 + 80D: Rs 50,000 + HRA: Rs 1,80,000 + 24(b): Rs 1,00,000 + 80CCD(1B): Rs 50,000 - Standard Deduction: Rs 50,000 (included separately)<br />
          Taxable Income: Rs 15,00,000 - Rs 50,000 - Rs 5,30,000 = Rs 9,20,000<br />
          Tax: Rs 12,500 + Rs 84,000 (5L-9.2L at 20%) = Rs 96,500<br />
          Add: Cess 4%: Rs 3,860<br />
          <strong>Tax Payable: <span style={s.tipSaving}>Rs 1,00,360</span></strong>
        </div>
        <p style={s.p}>
          With high deductions totalling Rs 5.25 lakh beyond the standard deduction, the old regime tax comes down to approximately Rs 1,00,360 — now nearly equal to the new regime's Rs 97,500. At this income level, you need roughly Rs 3.75 lakh or more in deductions (beyond standard deduction) for the old regime to break even.
        </p>

        {/* --- Worked example at 20L --- */}
        <h2 style={s.h2}>Worked Example: Income of Rs 20 Lakh</h2>
        <p style={s.p}>
          At Rs 20 lakh, the break-even point is approximately Rs 4.5 lakh in deductions beyond the standard deduction. Let us see the numbers.
        </p>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>New Regime</div>
          Taxable Income: Rs 20,00,000 - Rs 75,000 = Rs 19,25,000<br />
          Tax: Rs 0 (up to 4L) + Rs 20,000 (4-8L at 5%) + Rs 40,000 (8-12L at 10%) + Rs 60,000 (12-16L at 15%) + Rs 65,000 (16-19.25L at 20%) = Rs 1,85,000<br />
          Add: Cess 4%: Rs 7,400<br />
          <strong>Tax Payable: <span style={s.tipSaving}>Rs 1,92,400</span></strong>
        </div>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>Old Regime (Deductions: Rs 4.5L beyond standard deduction)</div>
          80C: Rs 1,50,000 + 80D: Rs 50,000 + HRA: Rs 1,50,000 + 24(b): Rs 50,000 + NPS: Rs 50,000 = Rs 4,50,000<br />
          Taxable Income: Rs 20,00,000 - Rs 50,000 - Rs 4,50,000 = Rs 15,00,000<br />
          Tax: Rs 12,500 + Rs 1,00,000 + Rs 1,50,000 (10L-15L at 30%) = Rs 2,62,500<br />
          Add: Cess 4%: Rs 10,500<br />
          <strong>Tax Payable: <span style={s.tipSaving}>Rs 2,73,000</span></strong>
        </div>
        <p style={s.p}>
          Even with Rs 4.5 lakh in deductions, the old regime tax of Rs 2,73,000 is still higher than the new regime's Rs 1,92,400. You would need deductions exceeding Rs 5.5-6 lakh at this income level (including substantial HRA, full 80C, home loan interest of Rs 2 lakh, and health insurance) for the old regime to truly win. For most people at Rs 20 lakh, the new regime remains more attractive unless they have a home loan and live in a metro city with high rent.
        </p>

        {/* --- Decision framework --- */}
        <h2 style={s.h2}>Decision Framework: Questions to Ask Yourself</h2>
        <p style={s.p}>
          Rather than guessing, work through these questions systematically to determine which regime suits your situation:
        </p>
        <ol style={s.ol}>
          <li style={s.li}><strong>Is your gross income below Rs 12.75 lakh?</strong> If yes, the new regime makes your income tax-free (Rs 12L taxable + Rs 75K standard deduction). Choose the new regime without hesitation.</li>
          <li style={s.li}><strong>Do you have a home loan on a self-occupied property?</strong> The interest deduction under Section 24(b) of up to Rs 2 lakh is only available in the old regime. This is one of the biggest deductions and can tilt the scales.</li>
          <li style={s.li}><strong>Do you pay rent in a metro city?</strong> HRA exemption can be Rs 1.5-3 lakh per year for metro employees. This deduction is lost in the new regime.</li>
          <li style={s.li}><strong>Do you max out 80C, 80D, and NPS?</strong> If you claim Rs 1.5L (80C) + Rs 50K (80D) + Rs 50K (NPS 80CCD(1B)), that is Rs 2.5 lakh right there. Add HRA or home loan interest and you may cross the break-even.</li>
          <li style={s.li}><strong>Is your income above Rs 20 lakh?</strong> At higher incomes, the gap between regimes narrows because the 30% slab kicks in earlier in the old regime. You need larger deductions to beat the new regime.</li>
          <li style={s.li}><strong>Are you comfortable locking money in tax-saving instruments?</strong> If you prefer liquidity and do not want to invest Rs 1.5 lakh in PPF/ELSS every year just for tax saving, the new regime lets you skip that entirely.</li>
        </ol>

        {/* --- Calculator callout --- */}
        <div style={s.callout}>
          <div style={s.calloutTitle}>Compare With Your Actual Numbers</div>
          The examples above use assumed deductions. Your situation is unique — your HRA, home loan interest, insurance premiums, and investments are different. Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to enter your exact numbers and see a side-by-side comparison of tax under both regimes. It takes less than 2 minutes.
        </div>

        {/* --- Practical tips --- */}
        <h2 style={s.h2}>Practical Tips for Choosing Your Regime</h2>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>Tip 1: Calculate, Don't Assume</div>
          Many people assume the new regime is always better because of lower rates. At higher income levels with substantial deductions, this assumption can cost you Rs 50,000 or more in unnecessary tax. Always run the numbers for your specific case.
        </div>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>Tip 2: Consider Future Changes</div>
          If you are early in your career without a home loan or significant insurance needs, the new regime is almost certainly better now. But plan ahead — if you are about to take a home loan or move to a metro city, your deduction profile could change significantly next year.
        </div>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>Tip 3: NPS Employer Contribution Works in Both Regimes</div>
          If your employer offers NPS as part of your salary structure, the employer's contribution under Section 80CCD(2) is deductible in both regimes. Maximize this — it is free tax saving regardless of which regime you choose.
        </div>
        <div style={s.tipCard}>
          <div style={s.tipTitle}>Tip 4: Inform Your Employer Early</div>
          If you choose the old regime, inform your employer at the start of the financial year. This ensures correct TDS deduction throughout the year and avoids a large tax outflow at filing time.
        </div>

        {/* --- Related guides --- */}
        <h2 style={s.h2}>Related Guides</h2>
        <p style={s.p}>
          Continue your tax planning with these guides:
        </p>
        <ol style={s.ol}>
          <li style={s.li}>
            <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — Enter your salary, deductions, and see tax under both regimes side by side.
          </li>
          <li style={s.li}>
            <Link to="/guides/save-tax-new-regime" style={s.link}>How to Save Tax Under the New Regime</Link> — The deductions and strategies that still work in the new regime.
          </li>
          <li style={s.li}>
            <Link to="/guides/income-tax-slabs-2026-27" style={s.link}>Income Tax Slabs 2026-27</Link> — Complete slab details for both regimes with examples.
          </li>
        </ol>

        {/* --- FAQs --- */}
        <FAQSection faqs={faqs} />

        <div style={{ display: 'flex', gap: 12, marginTop: 32, marginBottom: 48 }}>
          <WhatsAppShare />
          <PrintButton />
        </div>
      </div>
    </>
  )
}
