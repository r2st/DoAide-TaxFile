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
  { q: 'Is entire CTC taxable?', a: 'No. CTC includes employer contributions to EPF, gratuity, and insurance which are not part of your taxable salary. Only the gross salary (CTC minus employer contributions) forms the starting point for tax calculation, and further exemptions and deductions reduce it.' },
  { q: 'How is HRA exemption calculated?', a: 'HRA exemption under Section 10(13A) is the minimum of: (a) actual HRA received, (b) 50% of basic salary if you live in a metro city (40% for non-metro), or (c) rent paid minus 10% of basic salary. This exemption is available only under the old regime.' },
  { q: 'What is the standard deduction on salary for FY 2026-27?', a: 'The standard deduction is a flat deduction from salary income without any investment or proof. It is Rs 75,000 under the new tax regime and Rs 50,000 under the old regime for FY 2026-27.' },
  { q: 'Can I claim both HRA and home loan deduction?', a: 'Yes, you can claim both if you live in a rented house in one city and have a home loan for a property in another city. If the home loan property and rented property are in the same city, the tax department may question it, but there is no legal bar.' },
  { q: 'How does TDS on salary work?', a: 'Your employer estimates your total annual tax liability based on your salary, declared investments, and chosen regime. This estimated tax is divided equally across 12 months and deducted from each salary payment. The details are reflected in Form 16 issued after the financial year ends.' },
  { q: 'Do I need to file ITR if my employer already deducts TDS?', a: 'Yes. Filing ITR is mandatory if your gross total income exceeds the basic exemption limit, regardless of TDS. Filing also lets you claim refunds if excess TDS was deducted, carry forward losses, and serves as proof of income for loans and visa applications.' },
]

export default function TaxOnSalary() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Income Tax on Salary: Complete Breakdown with Examples FY 2026-27 | DoAide TaxFile"
        description="Understand how income tax is calculated on salary in India. CTC vs gross vs net salary, allowances, deductions, TDS, and worked examples for FY 2026-27."
        keywords="income tax on salary, salary tax calculation India, CTC breakdown tax, TDS on salary, salary components taxable"
        canonical="https://tax.doaide.com/guides/tax-on-salary"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Income Tax on Salary' }]} />

      <h1 style={s.title}>Income Tax on Salary: Complete Breakdown with Examples FY 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) &bull; 10 min read</p>

      {/* --- Introduction --- */}
      <p style={s.p}>
        If you earn a salary in India, understanding how your income is taxed can save you lakhs over a career. Salary taxation
        is not just about applying slab rates to your CTC. Your Cost to Company passes through several layers &mdash; employer
        contributions are removed, exemptions are applied, deductions are claimed &mdash; before arriving at the taxable income
        figure on which tax is actually calculated. This guide walks through every layer with real numbers so you know exactly
        where your money goes.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Tools</div>
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compute tax under both regimes,
        or the <Link to="/take-home-salary-calculator" style={s.link}>Take-Home Salary Calculator</Link> to see your monthly in-hand from CTC.
      </div>

      {/* --- CTC vs Gross vs Net --- */}
      <h2 style={s.h2}>CTC vs Gross Salary vs Net Salary</h2>
      <p style={s.p}>
        These three terms represent different stages of your compensation. Confusing them is the most common reason people
        miscalculate their tax liability.
      </p>

      <h3 style={s.h3}>Cost to Company (CTC)</h3>
      <p style={s.p}>
        CTC is the total amount your employer spends on you in a year. It includes your salary, employer&apos;s EPF contribution
        (12% of basic), employer&apos;s NPS contribution (if any), gratuity provision, group insurance premiums, and any other
        benefits. You never receive the full CTC in your bank account.
      </p>

      <h3 style={s.h3}>Gross Salary</h3>
      <p style={s.p}>
        Gross salary is CTC minus the employer&apos;s contributions (employer EPF, gratuity, insurance). This is the amount
        credited to you before tax deductions. Gross salary typically includes basic pay, dearness allowance (DA), house rent
        allowance (HRA), special allowance, leave travel allowance (LTA), and other components.
      </p>

      <h3 style={s.h3}>Net Salary (Take-Home)</h3>
      <p style={s.p}>
        Net salary is what lands in your bank account each month. It is gross salary minus employee EPF contribution, professional
        tax, and income tax (TDS). The flow is:
      </p>
      <ol style={s.ol}>
        <li style={s.li}><strong>CTC</strong> &rarr; deduct employer EPF, gratuity, insurance &rarr; <strong>Gross Salary</strong></li>
        <li style={s.li}><strong>Gross Salary</strong> &rarr; deduct exemptions (HRA, LTA) and standard deduction &rarr; <strong>Taxable Income</strong></li>
        <li style={s.li}><strong>Taxable Income</strong> &rarr; deduct Chapter VI-A (80C, 80D etc.) &rarr; <strong>Net Taxable Income</strong></li>
        <li style={s.li}><strong>Net Taxable Income</strong> &rarr; apply slab rates &rarr; <strong>Tax Payable</strong></li>
      </ol>

      {/* --- Taxable Salary Components --- */}
      <h2 style={s.h2}>Fully Taxable Salary Components</h2>
      <p style={s.p}>
        Several components of your salary are fully taxable with no exemption available under either regime:
      </p>
      <ul style={s.ol}>
        <li style={s.li}><strong>Basic Salary</strong> &mdash; the fixed component that forms the foundation of your pay structure. Fully taxable in both regimes.</li>
        <li style={s.li}><strong>Dearness Allowance (DA)</strong> &mdash; paid to offset inflation, usually a percentage of basic. Fully taxable.</li>
        <li style={s.li}><strong>Special Allowance</strong> &mdash; a balancing figure that companies use to make up the gap between basic, HRA, and other fixed components. Fully taxable with no exemption.</li>
        <li style={s.li}><strong>Bonus / Performance Pay</strong> &mdash; fully taxable as part of salary income in the year it is received.</li>
      </ul>

      {/* --- Partially Exempt Allowances --- */}
      <h2 style={s.h2}>Partially Exempt Allowances</h2>
      <p style={s.p}>
        These components offer tax relief under the old regime (and in some cases the new regime) if conditions are met:
      </p>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>HRA &mdash; Section 10(13A)</div>
        If you live in rented accommodation, the minimum of three amounts is exempt: (a) actual HRA received, (b) rent paid minus
        10% of basic salary, (c) 50% of basic for metros / 40% for non-metros. Available only under the old regime.
        Try our <Link to="/hra-calculator" style={s.link}>HRA Calculator</Link> to compute your exact exemption.
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>LTA &mdash; Section 10(5)</div>
        Leave Travel Allowance is exempt for actual travel expenses incurred on domestic travel, claimed twice in a block of four
        years (current block: 2026-2029). Only travel fare is exempt, not hotel or food expenses. Available only under the old regime.
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>Food Coupons / Meal Vouchers</div>
        Meal vouchers up to Rs 50 per meal (approximately Rs 26,400 per year for 22 working days per month) are tax-free under
        both regimes as a perquisite exemption.
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>Children Education Allowance</div>
        An exemption of Rs 100 per month per child (maximum 2 children) is available &mdash; Rs 2,400 per year. A hostel expenditure
        allowance of Rs 300 per month per child is also exempt. These are minor but worth claiming under the old regime.
      </div>

      {/* --- Standard Deduction --- */}
      <h2 style={s.h2}>Standard Deduction</h2>
      <p style={s.p}>
        The standard deduction is a flat reduction from your gross salary income. No investment or proof is required &mdash; every
        salaried taxpayer gets it automatically.
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Regime</th><th style={s.th}>Standard Deduction</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>New Regime (default)</td><td style={s.tdMono}>Rs 75,000</td></tr>
          <tr><td style={s.td}>Old Regime</td><td style={s.tdMono}>Rs 50,000</td></tr>
        </tbody>
      </table>

      {/* --- Professional Tax --- */}
      <h2 style={s.h2}>Professional Tax &mdash; Section 16</h2>
      <p style={s.p}>
        Professional tax is a state-level tax deducted by your employer. The maximum amount is Rs 2,500 per year in most states
        (Maharashtra, Karnataka, West Bengal, Andhra Pradesh, etc.). It is allowed as a deduction under Section 16(iii) in both
        the old and new regimes. The exact amount varies by state &mdash; some states like Rajasthan and Delhi do not levy professional tax.
      </p>

      {/* --- Worked Example 1 --- */}
      <h2 style={s.h2}>Worked Example: CTC Rs 15 Lakh</h2>
      <p style={s.p}>
        Let us calculate tax for a salaried employee with CTC of Rs 15,00,000 in FY 2026-27. Assume the employee lives in
        Bangalore and pays rent of Rs 20,000/month.
      </p>

      <h3 style={s.h3}>Salary Breakdown</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Component</th><th style={s.th}>Annual Amount</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Basic Salary (40% of CTC)</td><td style={s.tdMono}>Rs 6,00,000</td></tr>
          <tr><td style={s.td}>HRA (50% of Basic)</td><td style={s.tdMono}>Rs 3,00,000</td></tr>
          <tr><td style={s.td}>Special Allowance</td><td style={s.tdMono}>Rs 3,27,600</td></tr>
          <tr><td style={s.td}>LTA</td><td style={s.tdMono}>Rs 30,000</td></tr>
          <tr><td style={s.td}>Employer EPF (12% of Basic)</td><td style={s.tdMono}>Rs 72,000</td></tr>
          <tr><td style={s.td}>Gratuity (4.81% of Basic)</td><td style={s.tdMono}>Rs 28,846</td></tr>
          <tr><td style={s.td}>Insurance</td><td style={s.tdMono}>Rs 41,554</td></tr>
          <tr><td style={s.td}><strong>Total CTC</strong></td><td style={s.tdMono}><strong>Rs 15,00,000</strong></td></tr>
        </tbody>
      </table>

      <p style={s.p}>
        Gross Salary = CTC - Employer EPF - Gratuity - Insurance = Rs 15,00,000 - Rs 72,000 - Rs 28,846 - Rs 41,554 = <strong>Rs 13,57,600</strong>
      </p>

      <h3 style={s.h3}>Tax Under New Regime</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Step</th><th style={s.th}>Amount</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Gross Salary</td><td style={s.tdMono}>Rs 13,57,600</td></tr>
          <tr><td style={s.td}>Less: Standard Deduction</td><td style={s.tdMono}>Rs 75,000</td></tr>
          <tr><td style={s.td}>Less: Professional Tax</td><td style={s.tdMono}>Rs 2,500</td></tr>
          <tr><td style={s.td}><strong>Taxable Income</strong></td><td style={s.tdMono}><strong>Rs 12,80,100</strong></td></tr>
          <tr><td style={s.td}>Tax on Rs 4,00,000</td><td style={s.tdMono}>Nil</td></tr>
          <tr><td style={s.td}>Tax on Rs 4,00,001 - Rs 8,00,000 @ 5%</td><td style={s.tdMono}>Rs 20,000</td></tr>
          <tr><td style={s.td}>Tax on Rs 8,00,001 - Rs 12,00,000 @ 10%</td><td style={s.tdMono}>Rs 40,000</td></tr>
          <tr><td style={s.td}>Tax on Rs 12,00,001 - Rs 12,80,100 @ 15%</td><td style={s.tdMono}>Rs 12,015</td></tr>
          <tr><td style={s.td}><strong>Total Tax</strong></td><td style={s.tdMono}><strong>Rs 72,015</strong></td></tr>
          <tr><td style={s.td}>Add: Cess @ 4%</td><td style={s.tdMono}>Rs 2,881</td></tr>
          <tr><td style={s.td}><strong>Tax Payable</strong></td><td style={s.tdMono}><strong>Rs 74,896</strong></td></tr>
        </tbody>
      </table>

      <h3 style={s.h3}>Tax Under Old Regime</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Step</th><th style={s.th}>Amount</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Gross Salary</td><td style={s.tdMono}>Rs 13,57,600</td></tr>
          <tr><td style={s.td}>Less: HRA Exemption (min of Rs 3L, Rs 1.8L, Rs 2.4L)</td><td style={s.tdMono}>Rs 1,80,000</td></tr>
          <tr><td style={s.td}>Less: Standard Deduction</td><td style={s.tdMono}>Rs 50,000</td></tr>
          <tr><td style={s.td}>Less: Professional Tax</td><td style={s.tdMono}>Rs 2,500</td></tr>
          <tr><td style={s.td}>Gross Total Income</td><td style={s.tdMono}>Rs 11,25,100</td></tr>
          <tr><td style={s.td}>Less: 80C (Employee EPF + others, max Rs 1.5L)</td><td style={s.tdMono}>Rs 1,50,000</td></tr>
          <tr><td style={s.td}><strong>Taxable Income</strong></td><td style={s.tdMono}><strong>Rs 9,75,100</strong></td></tr>
          <tr><td style={s.td}>Tax on Rs 2,50,000</td><td style={s.tdMono}>Nil</td></tr>
          <tr><td style={s.td}>Tax on Rs 2,50,001 - Rs 5,00,000 @ 5%</td><td style={s.tdMono}>Rs 12,500</td></tr>
          <tr><td style={s.td}>Tax on Rs 5,00,001 - Rs 9,75,100 @ 20%</td><td style={s.tdMono}>Rs 95,020</td></tr>
          <tr><td style={s.td}><strong>Total Tax</strong></td><td style={s.tdMono}><strong>Rs 1,07,520</strong></td></tr>
          <tr><td style={s.td}>Add: Cess @ 4%</td><td style={s.tdMono}>Rs 4,301</td></tr>
          <tr><td style={s.td}><strong>Tax Payable</strong></td><td style={s.tdMono}><strong>Rs 1,11,821</strong></td></tr>
        </tbody>
      </table>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Result</div>
        For CTC Rs 15 lakh with rent of Rs 20,000/month, the <strong>new regime saves Rs 36,925</strong> compared to the old regime.
        The old regime would need deductions exceeding Rs 4 lakh to break even. Use the <Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> to
        find the best regime for your specific structure.
      </div>

      {/* --- Worked Example 2 --- */}
      <h2 style={s.h2}>Worked Example: CTC Rs 25 Lakh with HRA &amp; Home Loan</h2>
      <p style={s.p}>
        Now consider a senior professional with CTC Rs 25,00,000, living in Mumbai, paying rent of Rs 40,000/month, with a
        home loan (interest Rs 2,00,000/year) on a property in their hometown, and Rs 1,50,000 in 80C investments.
      </p>

      <h3 style={s.h3}>Salary Breakdown</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Component</th><th style={s.th}>Annual Amount</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Basic Salary (40% of CTC)</td><td style={s.tdMono}>Rs 10,00,000</td></tr>
          <tr><td style={s.td}>HRA (50% of Basic)</td><td style={s.tdMono}>Rs 5,00,000</td></tr>
          <tr><td style={s.td}>Special Allowance</td><td style={s.tdMono}>Rs 6,46,000</td></tr>
          <tr><td style={s.td}>LTA</td><td style={s.tdMono}>Rs 40,000</td></tr>
          <tr><td style={s.td}>Employer EPF (12% of Basic)</td><td style={s.tdMono}>Rs 1,20,000</td></tr>
          <tr><td style={s.td}>Gratuity (4.81% of Basic)</td><td style={s.tdMono}>Rs 48,100</td></tr>
          <tr><td style={s.td}>Insurance</td><td style={s.tdMono}>Rs 45,900</td></tr>
          <tr><td style={s.td}><strong>Total CTC</strong></td><td style={s.tdMono}><strong>Rs 25,00,000</strong></td></tr>
        </tbody>
      </table>

      <p style={s.p}>
        Gross Salary = Rs 25,00,000 - Rs 1,20,000 - Rs 48,100 - Rs 45,900 = <strong>Rs 22,86,000</strong>
      </p>

      <h3 style={s.h3}>Tax Under New Regime</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Step</th><th style={s.th}>Amount</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Gross Salary</td><td style={s.tdMono}>Rs 22,86,000</td></tr>
          <tr><td style={s.td}>Less: Standard Deduction</td><td style={s.tdMono}>Rs 75,000</td></tr>
          <tr><td style={s.td}>Less: Professional Tax</td><td style={s.tdMono}>Rs 2,500</td></tr>
          <tr><td style={s.td}><strong>Taxable Income</strong></td><td style={s.tdMono}><strong>Rs 22,08,500</strong></td></tr>
          <tr><td style={s.td}>Tax: 0% on Rs 4L + 5% on Rs 4L + 10% on Rs 4L + 15% on Rs 4L + 20% on Rs 4L + 25% on Rs 2,08,500</td><td style={s.tdMono}>&mdash;</td></tr>
          <tr><td style={s.td}><strong>Total Tax</strong></td><td style={s.tdMono}><strong>Rs 2,52,125</strong></td></tr>
          <tr><td style={s.td}>Add: Cess @ 4%</td><td style={s.tdMono}>Rs 10,085</td></tr>
          <tr><td style={s.td}><strong>Tax Payable</strong></td><td style={s.tdMono}><strong>Rs 2,62,210</strong></td></tr>
        </tbody>
      </table>

      <h3 style={s.h3}>Tax Under Old Regime</h3>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Step</th><th style={s.th}>Amount</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Gross Salary</td><td style={s.tdMono}>Rs 22,86,000</td></tr>
          <tr><td style={s.td}>Less: HRA Exemption (min of Rs 5L, Rs 3.8L, Rs 5L)</td><td style={s.tdMono}>Rs 3,80,000</td></tr>
          <tr><td style={s.td}>Less: Standard Deduction</td><td style={s.tdMono}>Rs 50,000</td></tr>
          <tr><td style={s.td}>Less: Professional Tax</td><td style={s.tdMono}>Rs 2,500</td></tr>
          <tr><td style={s.td}>Gross Total Income</td><td style={s.tdMono}>Rs 18,53,500</td></tr>
          <tr><td style={s.td}>Less: 80C (EPF + investments)</td><td style={s.tdMono}>Rs 1,50,000</td></tr>
          <tr><td style={s.td}>Less: Home Loan Interest (Sec 24b, max Rs 2L)</td><td style={s.tdMono}>Rs 2,00,000</td></tr>
          <tr><td style={s.td}><strong>Taxable Income</strong></td><td style={s.tdMono}><strong>Rs 15,03,500</strong></td></tr>
          <tr><td style={s.td}>Tax on Rs 2,50,000</td><td style={s.tdMono}>Nil</td></tr>
          <tr><td style={s.td}>Tax on Rs 2,50,001 - Rs 5,00,000 @ 5%</td><td style={s.tdMono}>Rs 12,500</td></tr>
          <tr><td style={s.td}>Tax on Rs 5,00,001 - Rs 10,00,000 @ 20%</td><td style={s.tdMono}>Rs 1,00,000</td></tr>
          <tr><td style={s.td}>Tax on Rs 10,00,001 - Rs 15,03,500 @ 30%</td><td style={s.tdMono}>Rs 1,51,050</td></tr>
          <tr><td style={s.td}><strong>Total Tax</strong></td><td style={s.tdMono}><strong>Rs 2,63,550</strong></td></tr>
          <tr><td style={s.td}>Add: Cess @ 4%</td><td style={s.tdMono}>Rs 10,542</td></tr>
          <tr><td style={s.td}><strong>Tax Payable</strong></td><td style={s.tdMono}><strong>Rs 2,74,092</strong></td></tr>
        </tbody>
      </table>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Result</div>
        Even with HRA of Rs 3.8 lakh, home loan interest of Rs 2 lakh, and Rs 1.5 lakh in 80C, the <strong>new regime still saves
        Rs 11,882</strong> at CTC Rs 25 lakh. The old regime becomes better only when total deductions cross roughly Rs 5.75 lakh.
        Add 80D health insurance (Rs 25,000) and NPS 80CCD(1B) (Rs 50,000) to potentially tip the balance.
      </div>

      {/* --- Salary Components Tax Treatment Table --- */}
      <h2 style={s.h2}>Salary Components and Tax Treatment</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Component</th>
            <th style={s.th}>Old Regime</th>
            <th style={s.th}>New Regime</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Basic Salary</td><td style={s.td}>Fully Taxable</td><td style={s.td}>Fully Taxable</td></tr>
          <tr><td style={s.td}>Dearness Allowance</td><td style={s.td}>Fully Taxable</td><td style={s.td}>Fully Taxable</td></tr>
          <tr><td style={s.td}>Special Allowance</td><td style={s.td}>Fully Taxable</td><td style={s.td}>Fully Taxable</td></tr>
          <tr><td style={s.td}>HRA</td><td style={s.td}>Exempt (Sec 10(13A))</td><td style={s.td}>Fully Taxable</td></tr>
          <tr><td style={s.td}>LTA</td><td style={s.td}>Exempt (Sec 10(5))</td><td style={s.td}>Fully Taxable</td></tr>
          <tr><td style={s.td}>Standard Deduction</td><td style={s.td}>Rs 50,000</td><td style={s.td}>Rs 75,000</td></tr>
          <tr><td style={s.td}>Professional Tax</td><td style={s.td}>Deductible</td><td style={s.td}>Deductible</td></tr>
          <tr><td style={s.td}>Employer EPF</td><td style={s.td}>Exempt (up to limit)</td><td style={s.td}>Exempt (up to limit)</td></tr>
          <tr><td style={s.td}>Employee EPF</td><td style={s.td}>80C Deduction</td><td style={s.td}>No Deduction</td></tr>
          <tr><td style={s.td}>Food Coupons</td><td style={s.td}>Exempt (Rs 50/meal)</td><td style={s.td}>Exempt (Rs 50/meal)</td></tr>
          <tr><td style={s.td}>Gratuity (employer)</td><td style={s.td}>Not part of salary</td><td style={s.td}>Not part of salary</td></tr>
          <tr><td style={s.td}>Bonus / Performance Pay</td><td style={s.td}>Fully Taxable</td><td style={s.td}>Fully Taxable</td></tr>
          <tr><td style={s.td}>Children Education Allowance</td><td style={s.td}>Exempt (Rs 100/month/child)</td><td style={s.td}>Fully Taxable</td></tr>
        </tbody>
      </table>

      {/* --- TDS and Form 16 --- */}
      <h2 style={s.h2}>TDS by Employer and Form 16</h2>
      <p style={s.p}>
        Your employer is legally required to deduct Tax Deducted at Source (TDS) from your salary every month under Section 192
        of the Income Tax Act. At the start of the financial year (or when you join), you submit an investment declaration to your
        employer stating which deductions you plan to claim. Your employer uses this to estimate your annual tax and divides it
        equally across 12 monthly salary payments.
      </p>

      <h3 style={s.h3}>How Form 16 Works</h3>
      <p style={s.p}>
        After the financial year ends, your employer issues Form 16 &mdash; a TDS certificate that summarizes your salary,
        deductions claimed, and tax deducted. Form 16 has two parts:
      </p>
      <ul style={s.ol}>
        <li style={s.li}><strong>Part A</strong> &mdash; generated from TRACES, it shows quarter-wise TDS deducted and deposited with the government. Cross-check this with your Form 26AS / AIS.</li>
        <li style={s.li}><strong>Part B</strong> &mdash; prepared by your employer, it contains the detailed salary breakdown, exemptions, deductions, and taxable income computation.</li>
      </ul>
      <p style={s.p}>
        Even if your employer deducts the correct TDS, filing your Income Tax Return (ITR) is mandatory if your gross total income
        exceeds the basic exemption limit (Rs 3 lakh under old regime, Rs 4 lakh under new regime). Use our{' '}
        <Link to="/form-16-analyzer" style={s.link}>Form 16 Analyzer</Link> to upload your Form 16 and auto-fill your return.
      </p>

      <h3 style={s.h3}>When to File ITR</h3>
      <p style={s.p}>
        The due date for filing ITR for salaried individuals is July 31 of the assessment year (i.e., July 31, 2027 for FY 2026-27).
        Filing on time avoids a late fee of Rs 5,000 (Rs 1,000 if income is below Rs 5 lakh) and enables you to carry forward
        losses from capital gains or other heads.
      </p>

      {/* --- Tax Saving Tips --- */}
      <h2 style={s.h2}>Tips to Reduce Tax on Salary</h2>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>Restructure Your Salary</div>
        Ask your employer to increase the HRA and basic pay components. A higher basic means higher HRA exemption (old regime)
        and higher EPF contribution (80C deduction). <span style={s.tipSaving}>Potential saving: Rs 20,000 - Rs 60,000</span>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>Maximize NPS under 80CCD(1B)</div>
        Under the old regime, an additional Rs 50,000 deduction is available for NPS contributions over and above the 80C limit.
        Under the new regime, employer NPS contribution up to 14% of basic is exempt. <span style={s.tipSaving}>Potential saving: Rs 15,600 (old) / Rs varies (new)</span>
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>Claim All Eligible Exemptions</div>
        Do not leave money on the table. Submit rent receipts for HRA, travel bills for LTA, and medical bills for reimbursements
        before the employer&apos;s proof submission deadline (usually January-February). <span style={s.tipSaving}>Potential saving: Rs 30,000 - Rs 1,00,000</span>
      </div>

      {/* --- Related Tools --- */}
      <h2 style={s.h2}>Related Calculators</h2>
      <p style={s.p}>Use these tools to apply what you have learned to your specific numbers:</p>
      <ul style={s.ol}>
        <li style={s.li}><Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> &mdash; compare tax under old and new regime</li>
        <li style={s.li}><Link to="/take-home-salary-calculator" style={s.link}>Take-Home Salary Calculator</Link> &mdash; enter CTC, get monthly in-hand</li>
        <li style={s.li}><Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> &mdash; find the best salary structure for minimum tax</li>
        <li style={s.li}><Link to="/hra-calculator" style={s.link}>HRA Calculator</Link> &mdash; compute your exact HRA exemption</li>
        <li style={s.li}><Link to="/form-16-analyzer" style={s.link}>Form 16 Analyzer</Link> &mdash; upload Form 16 to auto-fill your ITR</li>
      </ul>

      {/* --- FAQs --- */}
      <FAQSection faqs={FAQS} />

      {/* --- Share & Print --- */}
      <div style={{ display: 'flex', gap: 12, marginTop: 32, marginBottom: 48 }}>
        <WhatsAppShare title="Income Tax on Salary: Complete Breakdown with Examples FY 2026-27" />
        <PrintButton />
      </div>
    </div>
  )
}
