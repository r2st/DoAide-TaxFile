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
}

const FAQS = [
  { q: 'Who is liable to pay advance tax?', a: 'Any taxpayer whose estimated tax liability for the financial year exceeds Rs 10,000 after deducting TDS/TCS is required to pay advance tax. This applies to salaried individuals, freelancers, professionals, and businesses. Senior citizens aged 60 or above who do not have income from business or profession are exempt from paying advance tax.' },
  { q: 'What happens if I miss an advance tax installment?', a: 'If you miss an installment or pay less than the prescribed percentage, interest under Section 234C is charged at 1% per month on the shortfall amount for three months (one quarter). If you fail to pay at least 90% of total tax as advance tax by the end of the financial year, interest under Section 234B is also charged at 1% per month from April until the date you file your return or pay the remaining tax.' },
  { q: 'Can I pay advance tax in a lump sum instead of installments?', a: 'Yes, you can pay your entire advance tax liability in a single installment at any point during the financial year. However, interest under Section 234C may still apply for the quarters where the cumulative payment was below the prescribed percentage (15%, 45%, 75%, 100%). To avoid any interest, you should ensure cumulative payments meet or exceed the threshold by each due date.' },
  { q: 'Is advance tax applicable under the presumptive taxation scheme?', a: 'Taxpayers opting for presumptive taxation under Section 44AD (businesses with turnover up to Rs 2 crore) or Section 44ADA (professionals with gross receipts up to Rs 75 lakh) are required to pay their entire advance tax liability in a single installment on or before March 15 of the financial year. They are not required to follow the quarterly installment schedule.' },
  { q: 'How do I pay advance tax online?', a: 'Visit the Income Tax e-Filing portal (incometax.gov.in), navigate to e-Pay Tax, select Challan No./ITNS 280, choose the correct assessment year and type of payment (Advance Tax code 100), select your bank, make the payment, and save the challan receipt with the BSR code and challan serial number for your records. You will need these details when filing your ITR.' },
  { q: 'Can I claim a refund if I overpay advance tax?', a: 'Yes, if your total advance tax payments plus TDS exceed your actual tax liability for the year, you can claim a refund when filing your income tax return. The Income Tax Department processes refunds after verifying your return, and you will receive interest under Section 244A at 0.5% per month on the refund amount from the date of payment of tax or from April 1 of the assessment year, whichever is later.' },
]

export default function AdvanceTaxGuide() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Advance Tax: Due Dates, Calculation & Payment Guide FY 2026-27 | DoAide TaxFile"
        description="Complete guide to advance tax in India. Due dates, calculation method, payment process, interest under 234B and 234C, and who needs to pay advance tax."
        keywords="advance tax due dates 2026-27, advance tax calculation, how to pay advance tax, Section 234B 234C interest, advance tax installments"
        canonical="https://tax.doaide.com/guides/advance-tax"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'Advance Tax Guide' }]} />

      <h1 style={s.title}>Advance Tax: Due Dates, Calculation & Payment Guide FY 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) &bull; 10 min read</p>

      <p style={s.p}>
        Advance tax is the income tax you pay in installments during the financial year in which the income is earned, instead of
        paying it as a lump sum at the end of the year. The Indian Income Tax Act requires taxpayers to estimate their annual income
        and pay tax on it progressively through the year. Think of it as a pay-as-you-earn system for those whose tax is not fully
        covered by TDS. If your estimated tax liability for the year exceeds Rs 10,000 after subtracting TDS and TCS credits,
        you are required to pay advance tax.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Calculator</div>
        Use our <Link to="/advance-tax-calculator" style={s.link}>Advance Tax Calculator</Link> to estimate your quarterly installments
        and check if you need to pay advance tax this year.
      </div>

      {/* --- Who needs to pay --- */}
      <h2 style={s.h2}>Who Needs to Pay Advance Tax?</h2>
      <p style={s.p}>
        Advance tax applies to all categories of taxpayers — salaried individuals, self-employed professionals, freelancers,
        businesses (including partnerships and companies), and anyone earning income from capital gains, rental income, interest,
        or other sources where TDS does not fully cover the tax liability. The key rule is simple: if your total tax liability
        for the financial year, after deducting TDS and TCS already collected, exceeds Rs 10,000, you must pay advance tax.
      </p>
      <p style={s.p}>
        <strong>Salaried employees:</strong> If your employer deducts TDS on your entire salary and you have no other significant
        income sources, your advance tax liability is usually nil. However, if you earn rental income, capital gains from stock
        trading, freelance income on the side, or substantial interest income, the tax on that additional income may push your
        net liability above Rs 10,000 — in which case advance tax becomes mandatory.
      </p>
      <p style={s.p}>
        <strong>Exemption for senior citizens:</strong> Resident senior citizens (aged 60 years or above) who do not have any income
        from business or profession are completely exempt from paying advance tax. They can pay their entire tax liability at the
        time of filing their return without incurring any interest under Section 234B or 234C.
      </p>

      {/* --- Due dates --- */}
      <h2 style={s.h2}>Advance Tax Due Dates for FY 2026-27</h2>
      <p style={s.p}>
        Advance tax is payable in four quarterly installments. Each installment has a cumulative percentage — meaning by September 15
        you should have paid at least 45% of your total estimated tax for the year, not just 30% for that quarter. The due dates
        and cumulative percentages for FY 2026-27 are:
      </p>

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Installment</th>
            <th style={s.th}>Due Date</th>
            <th style={s.th}>Cumulative % of Tax</th>
            <th style={s.th}>Quarter Share</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>1st Installment</td><td style={s.tdMono}>15 June 2026</td><td style={s.tdMono}>15%</td><td style={s.td}>15% of estimated tax</td></tr>
          <tr><td style={s.td}>2nd Installment</td><td style={s.tdMono}>15 September 2026</td><td style={s.tdMono}>45%</td><td style={s.td}>30% of estimated tax</td></tr>
          <tr><td style={s.td}>3rd Installment</td><td style={s.tdMono}>15 December 2026</td><td style={s.tdMono}>75%</td><td style={s.td}>30% of estimated tax</td></tr>
          <tr><td style={s.td}>4th Installment</td><td style={s.tdMono}>15 March 2027</td><td style={s.tdMono}>100%</td><td style={s.td}>25% of estimated tax</td></tr>
        </tbody>
      </table>

      <p style={s.p}>
        If a due date falls on a Sunday or a public holiday, the payment can be made on the next working day without attracting
        interest. However, it is advisable to pay a day or two before the due date to account for bank processing delays.
      </p>

      {/* --- How to calculate --- */}
      <h2 style={s.h2}>How to Calculate Advance Tax</h2>
      <p style={s.p}>
        Calculating advance tax requires you to estimate your total income for the financial year and compute the tax on it.
        Follow these steps:
      </p>

      <ol style={s.ol}>
        <li style={s.li}><strong>Estimate your total income:</strong> Add up all sources — salary, business/profession income, rental income,
          capital gains, interest income, dividends, and any other income you expect to earn during the financial year.</li>
        <li style={s.li}><strong>Apply deductions and exemptions:</strong> Subtract applicable deductions such as Section 80C (up to Rs 1.5 lakh),
          Section 80D (health insurance), HRA exemption, home loan interest under Section 24b, NPS contribution under Section 80CCD(1B),
          and standard deduction. If you are opting for the new regime, most deductions are not available except the standard deduction of Rs 75,000.</li>
        <li style={s.li}><strong>Compute tax on taxable income:</strong> Apply the income tax slab rates for your chosen regime (old or new) to
          arrive at the gross tax. Add surcharge (if applicable for income above Rs 50 lakh) and 4% health and education cess.</li>
        <li style={s.li}><strong>Subtract TDS and TCS:</strong> Deduct the TDS already deducted or expected to be deducted by your employer, bank,
          or other deductors during the year. Also subtract any TCS (tax collected at source) credits.</li>
        <li style={s.li}><strong>Check the Rs 10,000 threshold:</strong> If the remaining tax (after subtracting TDS/TCS) exceeds Rs 10,000,
          you need to pay advance tax. If it is Rs 10,000 or less, no advance tax is required.</li>
        <li style={s.li}><strong>Split into installments:</strong> Divide the net tax payable according to the quarterly percentages — 15% by June 15,
          45% by September 15, 75% by December 15, and 100% by March 15.</li>
      </ol>

      <h3 style={s.h3}>Worked Example</h3>
      <p style={s.p}>
        Suppose Mr. Sharma is a salaried professional with the following estimated income for FY 2026-27:<br />
        Salary income: Rs 18,00,000 | Freelance income: Rs 4,00,000 | Fixed deposit interest: Rs 1,20,000<br />
        <strong>Total income: Rs 23,20,000</strong>
      </p>
      <p style={s.p}>
        Under the new regime with standard deduction of Rs 75,000, taxable income = Rs 22,45,000.<br />
        Tax computation: Rs 4L x 0% + Rs 4L x 5% + Rs 4L x 10% + Rs 4L x 15% + Rs 4L x 20% + Rs 2.45L x 25% = Rs 20,000 + Rs 40,000 + Rs 60,000 + Rs 80,000 + Rs 61,250 = Rs 2,61,250.<br />
        Add 4% cess = Rs 10,450. <strong>Total tax = Rs 2,71,700.</strong><br />
        TDS deducted by employer on salary: Rs 1,60,000 | TDS on FD interest: Rs 12,000. Total TDS = Rs 1,72,000.<br />
        <strong>Net advance tax payable = Rs 2,71,700 - Rs 1,72,000 = Rs 99,700</strong> (exceeds Rs 10,000, so advance tax is required).
      </p>

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Installment</th>
            <th style={s.th}>Due Date</th>
            <th style={s.th}>Cumulative Amount</th>
            <th style={s.th}>Amount to Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>1st</td><td style={s.tdMono}>15 Jun 2026</td><td style={s.tdMono}>Rs 14,955</td><td style={s.tdMono}>Rs 14,955</td></tr>
          <tr><td style={s.td}>2nd</td><td style={s.tdMono}>15 Sep 2026</td><td style={s.tdMono}>Rs 44,865</td><td style={s.tdMono}>Rs 29,910</td></tr>
          <tr><td style={s.td}>3rd</td><td style={s.tdMono}>15 Dec 2026</td><td style={s.tdMono}>Rs 74,775</td><td style={s.tdMono}>Rs 29,910</td></tr>
          <tr><td style={s.td}>4th</td><td style={s.tdMono}>15 Mar 2027</td><td style={s.tdMono}>Rs 99,700</td><td style={s.tdMono}>Rs 24,925</td></tr>
        </tbody>
      </table>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Estimate Your Tax First</div>
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compute your exact tax liability
        and then determine your advance tax installments.
      </div>

      {/* --- Payment process --- */}
      <h2 style={s.h2}>How to Pay Advance Tax Online</h2>
      <p style={s.p}>
        Advance tax can be paid entirely online through the Income Tax e-Filing portal. Here is the step-by-step process:
      </p>

      <ol style={s.ol}>
        <li style={s.li}><strong>Visit the e-Filing portal:</strong> Go to <strong>incometax.gov.in</strong> and log in with your PAN and password.
          Navigate to <strong>e-File &gt; e-Pay Tax</strong>.</li>
        <li style={s.li}><strong>Select the correct challan:</strong> Choose <strong>Challan No./ITNS 280</strong> which is used for income tax
          payments including advance tax, self-assessment tax, and tax on regular assessment.</li>
        <li style={s.li}><strong>Fill in the details:</strong> Select the applicable assessment year (AY 2027-28 for FY 2026-27), type of payment
          as <strong>Advance Tax (code 100)</strong>, and enter your PAN. Verify that your name and address auto-populate correctly.</li>
        <li style={s.li}><strong>Choose payment method:</strong> Select your bank for net banking, or pay via debit card, UPI, or NEFT/RTGS
          as available. Follow the bank's payment flow to complete the transaction.</li>
        <li style={s.li}><strong>Save the challan receipt:</strong> After successful payment, download and save the challan receipt (CIN - Challan
          Identification Number). Note down the <strong>BSR code</strong>, <strong>challan serial number</strong>, and <strong>date of deposit</strong> —
          you will need these details when filing your income tax return.</li>
        <li style={s.li}><strong>Verify in Form 26AS / AIS:</strong> The payment should reflect in your Form 26AS and Annual Information Statement
          (AIS) within a few days. Always cross-check before filing your ITR.</li>
      </ol>

      {/* --- Interest sections --- */}
      <h2 style={s.h2}>Interest on Late or Non-Payment</h2>
      <p style={s.p}>
        The Income Tax Act imposes interest under two sections for failure to pay advance tax on time. Understanding these provisions
        is important because the interest is mandatory — the Assessing Officer has no discretion to waive it.
      </p>

      <h3 style={s.h3}>Section 234B: Interest for Default in Payment of Advance Tax</h3>
      <p style={s.p}>
        Section 234B applies when a taxpayer either does not pay advance tax at all or pays less than 90% of the assessed tax
        liability during the financial year. The interest is calculated at <strong>1% per month</strong> (or part of a month) on the
        amount by which the advance tax paid falls short of the assessed tax. The interest runs from <strong>April 1 of the assessment year</strong>
        until the date of determination of total income (usually the date of filing the return or the date of assessment).
      </p>
      <p style={s.p}>
        <strong>Example:</strong> If your total tax liability is Rs 2,00,000 and you paid only Rs 1,50,000 as advance tax (which is 75%,
        less than the required 90% i.e. Rs 1,80,000), interest under 234B is charged on the shortfall. Shortfall = Rs 2,00,000 - Rs 1,50,000 = Rs 50,000.
        If you file your return on July 15 (4 months from April 1), interest = Rs 50,000 x 1% x 4 = <strong>Rs 2,000</strong>.
      </p>

      <h3 style={s.h3}>Section 234C: Interest for Deferment of Advance Tax Installments</h3>
      <p style={s.p}>
        Section 234C applies when individual installments are not paid on time or are paid in amounts less than the prescribed
        cumulative percentage. Interest is charged at <strong>1% per month for 3 months</strong> on the shortfall amount for each quarter.
      </p>

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Due Date</th>
            <th style={s.th}>Required Cumulative %</th>
            <th style={s.th}>Shortfall Calculation</th>
            <th style={s.th}>Interest Period</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>15 June</td><td style={s.tdMono}>15%</td><td style={s.td}>15% of tax minus amount paid</td><td style={s.tdMono}>3 months</td></tr>
          <tr><td style={s.td}>15 September</td><td style={s.tdMono}>45%</td><td style={s.td}>45% of tax minus amount paid</td><td style={s.tdMono}>3 months</td></tr>
          <tr><td style={s.td}>15 December</td><td style={s.tdMono}>75%</td><td style={s.td}>75% of tax minus amount paid</td><td style={s.tdMono}>3 months</td></tr>
          <tr><td style={s.td}>15 March</td><td style={s.tdMono}>100%</td><td style={s.td}>100% of tax minus amount paid</td><td style={s.tdMono}>1 month</td></tr>
        </tbody>
      </table>

      <p style={s.p}>
        <strong>Worked example for 234C:</strong> Assume total advance tax payable is Rs 1,00,000. You paid nothing by June 15 and
        then paid Rs 50,000 on September 10.<br />
        <strong>June 15 shortfall:</strong> 15% of Rs 1,00,000 = Rs 15,000 minus Rs 0 paid = Rs 15,000 shortfall.
        Interest = Rs 15,000 x 1% x 3 = Rs 450.<br />
        <strong>September 15 shortfall:</strong> 45% of Rs 1,00,000 = Rs 45,000 minus Rs 50,000 paid = no shortfall. Interest = Rs 0.<br />
        If you then pay the remaining Rs 50,000 by December 15, cumulative is Rs 1,00,000 which is 100% — no further 234C interest.
        However, interest for the June quarter (Rs 450) still applies.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Check Your TDS</div>
        Verify your TDS credits using our <Link to="/tds-calculator" style={s.link}>TDS Calculator</Link> before calculating your advance tax installments.
        Accurate TDS estimation prevents overpayment and unnecessary interest.
      </div>

      {/* --- Presumptive taxation --- */}
      <h2 style={s.h2}>Presumptive Taxation: Special Rules (Section 44AD / 44ADA)</h2>
      <p style={s.p}>
        Taxpayers who opt for the presumptive taxation scheme enjoy a simplified advance tax schedule. Under <strong>Section 44AD</strong>
        (applicable to eligible businesses with turnover up to Rs 2 crore) and <strong>Section 44ADA</strong> (applicable to specified
        professionals with gross receipts up to Rs 75 lakh), the entire advance tax liability can be paid in a single installment
        on or before <strong>March 15</strong> of the financial year. There is no requirement to follow the quarterly installment schedule
        of June, September, and December.
      </p>
      <p style={s.p}>
        Under Section 44AD, the presumptive income is deemed to be 8% of gross turnover (6% for digital receipts). Under Section 44ADA,
        it is 50% of gross receipts. If you declare income higher than these minimum thresholds, you can still benefit from the
        single-installment advance tax rule as long as you are opting into the presumptive scheme.
      </p>
      <p style={s.p}>
        <strong>Important:</strong> If you opt out of the presumptive scheme and your income exceeds the basic exemption limit, you are
        required to maintain books of account and follow the regular quarterly advance tax schedule.
      </p>

      {/* --- Common mistakes --- */}
      <h2 style={s.h2}>Common Mistakes to Avoid</h2>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>1. Ignoring Capital Gains</div>
        Many taxpayers forget to account for capital gains from mutual fund redemptions, stock sales, or property transactions
        when estimating advance tax. Capital gains are taxable in the quarter they arise, and you should pay advance tax on them
        in the next installment due after the gain is realised.
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>2. Selecting the Wrong Assessment Year</div>
        For FY 2026-27, the assessment year is AY 2027-28. Selecting the wrong assessment year on the challan is a common error
        that leads to the payment not reflecting against the correct year. Always double-check before submitting.
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>3. Not Revising Estimates</div>
        Your income estimate may change during the year — a bonus, a property sale, or a change in freelance projects. Revise
        your advance tax calculation each quarter and adjust subsequent installments to avoid either underpayment interest or
        unnecessary overpayment.
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>4. Confusing Advance Tax with Self-Assessment Tax</div>
        Advance tax (code 100) is paid during the financial year based on estimated income. Self-assessment tax (code 300) is
        paid after the year ends, when filing your ITR, for any remaining liability. Using the wrong payment code on the challan
        causes mismatches in your tax records.
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>5. Not Saving the Challan Receipt</div>
        Always download and save the challan receipt after every advance tax payment. You need the BSR code, challan serial number,
        and date of deposit when filing your ITR. If you lose these details, retrieving them later can be difficult and time-consuming.
      </div>

      <div style={s.tipCard}>
        <div style={s.tipTitle}>6. Paying After the Due Date and Assuming No Interest</div>
        Even if you pay the full amount one day late, Section 234C interest applies for the entire month. Always pay on or before the
        due date. Set calendar reminders for June 15, September 15, December 15, and March 15.
      </div>

      {/* --- Related tools --- */}
      <h2 style={s.h2}>Related Calculators</h2>
      <p style={s.p}>
        Use these tools to plan your advance tax payments more effectively:
      </p>
      <p style={s.p}>
        <Link to="/advance-tax-calculator" style={s.link}>Advance Tax Calculator</Link> — Estimate your quarterly installments based on your income and TDS.<br />
        <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — Compute your total tax liability under old and new regimes.<br />
        <Link to="/tds-calculator" style={s.link}>TDS Calculator</Link> — Check TDS rates and estimate TDS deductions on your income sources.
      </p>

      <div style={{ marginTop: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <ShareButtons text="Advance Tax Guide FY 2026-27 — Due dates, calculation method, payment process, interest under 234B & 234C\n\ntax.doaide.com/guides/advance-tax" />
        <PrintButton />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
