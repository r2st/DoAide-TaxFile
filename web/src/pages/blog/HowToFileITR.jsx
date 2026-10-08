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
  { q: 'What is the penalty for filing ITR late?', a: 'If you file after July 31, 2027 (for FY 2026-27), a late filing fee of ₹5,000 applies under Section 234F. If total income is below ₹5 lakh, the fee is reduced to ₹1,000. Additionally, you lose the ability to carry forward losses (except house property loss) and may face interest under Section 234A on unpaid tax.' },
  { q: 'Can I file a revised return if I made a mistake?', a: 'Yes, you can file a revised return under Section 139(5) before December 31, 2027 for FY 2026-27. There is no limit on the number of revisions. The revised return replaces the original, so include all details — not just the corrections. File via the e-filing portal by selecting "Revised" under Section 139(5).' },
  { q: 'Which ITR form should a salaried person use?', a: 'Most salaried individuals should use ITR-1 (Sahaj) if total income is below ₹50 lakh and income sources are salary, one house property, other sources (interest), and agricultural income up to ₹5,000. If you have capital gains, multiple house properties, or foreign assets, use ITR-2. Use our ITR Form Selector tool to find the right form.' },
  { q: 'How do I e-verify my ITR?', a: 'The easiest method is Aadhaar OTP — log into the e-filing portal, go to e-Verify, select Aadhaar OTP, and enter the OTP sent to your Aadhaar-linked mobile. Other options include net banking, bank account EVC, Demat account EVC, or ATM. You must verify within 30 days of filing, otherwise the return is treated as not filed.' },
  { q: 'How long does it take to get an ITR refund?', a: 'Refunds are typically processed within 20-45 days of e-verification. Refunds are credited directly to the bank account linked on the e-filing portal. You can track your refund status on the NSDL website or through the e-filing portal under "View Filed Returns." Ensure your bank account is pre-validated and linked to PAN.' },
  { q: 'Can I file ITR without Form 16?', a: 'Yes. Form 16 is a TDS certificate from your employer, but it is not mandatory for filing. You can use your salary slips, Form 26AS (which shows all TDS deducted), and Annual Information Statement (AIS) to fill income details. Self-employed individuals and those without salaried income file without Form 16.' },
]

export default function HowToFileITR() {
  return (
    <div style={s.page}>
      <SEOHead
        title="How to File ITR Online Free — Step-by-Step Guide 2026 | DoAide TaxFile"
        description="Complete step-by-step guide to filing income tax return online for free. Choose the right ITR form, gather documents, file on the e-filing portal, and verify your return — no CA needed."
        keywords="how to file ITR online, ITR filing free, income tax return online, e-filing ITR, ITR form selection, file ITR without CA"
        canonical="https://tax.doaide.com/blog/how-to-file-itr-online-free"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'How to File ITR Online Free' }]} />

      <h1 style={s.title}>How to File ITR Online Free — Step-by-Step Guide 2026</h1>
      <p style={s.meta}>Updated for AY 2027-28 · October 2026 · 18 min read</p>

      <p style={s.p}>
        Filing your Income Tax Return (ITR) is mandatory for most earning individuals in India. The good news: the
        income tax e-filing portal lets you file for free, without needing a CA. Whether you are a salaried employee,
        freelancer, or have investment income, this guide walks you through the entire process — from choosing the right
        ITR form to e-verifying your return.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Before You Start</div>
        Use our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> to find the right form for your
        income type, and the <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to estimate
        your tax liability before filing.
      </div>

      <h2 style={s.h2}>Who Must File Income Tax Return?</h2>
      <p style={s.p}>
        You must file an ITR if any of the following conditions apply to you during FY 2026-27. Even if no tax is due,
        filing is mandatory when your gross total income exceeds the basic exemption limit.
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Category</th>
            <th style={s.th}>Filing Mandatory When</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Individual (below 60)</td><td style={s.td}>Gross income exceeds ₹2.5 lakh (old) or ₹4 lakh (new regime)</td></tr>
          <tr><td style={s.td}>Senior Citizen (60-79)</td><td style={s.td}>Gross income exceeds ₹3 lakh (old regime)</td></tr>
          <tr><td style={s.td}>Super Senior (80+)</td><td style={s.td}>Gross income exceeds ₹5 lakh (old regime)</td></tr>
          <tr><td style={s.td}>TDS/TCS exceeds ₹25,000</td><td style={s.td}>Even if below exemption limit</td></tr>
          <tr><td style={s.td}>Deposits exceed ₹50 lakh</td><td style={s.td}>Aggregate bank deposits in a year</td></tr>
          <tr><td style={s.td}>Foreign travel &gt; ₹2 lakh</td><td style={s.td}>Spending on foreign travel in a year</td></tr>
          <tr><td style={s.td}>Electricity bill &gt; ₹1 lakh</td><td style={s.td}>Annual electricity expenditure</td></tr>
          <tr><td style={s.td}>Business/profession income</td><td style={s.td}>Regardless of profit or loss</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Even if not mandatory, filing an ITR is recommended for claiming refunds, applying for loans, obtaining a visa,
        and maintaining a financial record. Use our <Link to="/refund-calculator" style={s.link}>Refund Calculator</Link> to
        check if you are owed a refund.
      </p>

      <h2 style={s.h2}>Documents You Need Before Filing</h2>
      <p style={s.p}>
        Gather these documents before starting. Having everything ready makes the process smooth and prevents errors.
      </p>
      <ul style={s.ul}>
        <li><strong>PAN Card:</strong> Your Permanent Account Number — the primary identifier for tax filing</li>
        <li><strong>Aadhaar Card:</strong> Required for e-verification and must be linked to PAN</li>
        <li><strong>Form 16:</strong> TDS certificate from your employer showing salary details and tax deducted</li>
        <li><strong>Form 16A/16B/16C:</strong> TDS certificates for non-salary income (interest, rent, etc.)</li>
        <li><strong>Form 26AS:</strong> Tax credit statement showing all TDS/TCS credited to your PAN</li>
        <li><strong>Annual Information Statement (AIS):</strong> Comprehensive statement of all financial transactions reported to the IT department</li>
        <li><strong>Bank statements:</strong> For all accounts — savings interest, FD interest, dividend income</li>
        <li><strong>Investment proofs:</strong> PPF passbook, ELSS statements, insurance premium receipts, NPS contribution — for 80C/80D claims. Plan deductions with our <Link to="/80c-planner" style={s.link}>80C Planner</Link></li>
        <li><strong>Home loan statement:</strong> Interest certificate from bank for Section 24 deduction. Use our <Link to="/home-loan-calculator" style={s.link}>Home Loan Calculator</Link></li>
        <li><strong>Rent receipts:</strong> If claiming HRA exemption — generate with our <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link></li>
        <li><strong>Capital gains statements:</strong> From brokers for equity/mutual fund transactions. Compute with our <Link to="/capital-gains-calculator" style={s.link}>Capital Gains Calculator</Link></li>
        <li><strong>Bank account details:</strong> IFSC and account number for refund credit</li>
      </ul>

      <h2 style={s.h2}>Step 1: Choose the Right ITR Form</h2>
      <p style={s.p}>
        Using the wrong ITR form is one of the most common reasons for a defective return notice. Choose carefully based on
        your income sources and category.
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Form</th>
            <th style={s.th}>Who Should Use</th>
            <th style={s.th}>Key Conditions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>ITR-1 (Sahaj)</td><td style={s.td}>Salaried individuals</td><td style={s.td}>Income ≤ ₹50L, salary + 1 house property + other sources + agriculture ≤ ₹5K</td></tr>
          <tr><td style={s.td}>ITR-2</td><td style={s.td}>Individuals/HUF without business income</td><td style={s.td}>Capital gains, foreign income/assets, multiple house properties, income &gt; ₹50L</td></tr>
          <tr><td style={s.td}>ITR-3</td><td style={s.td}>Individuals/HUF with business/profession</td><td style={s.td}>Business income, partnership firm income, freelance income</td></tr>
          <tr><td style={s.td}>ITR-4 (Sugam)</td><td style={s.td}>Presumptive taxation</td><td style={s.td}>Business under 44AD/44ADA/44AE, income ≤ ₹50L (business) or ₹75L (profession)</td></tr>
        </tbody>
      </table>
      <div style={s.callout}>
        <div style={s.calloutTitle}>Not Sure Which Form?</div>
        Our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> asks a few questions about your income and recommends the correct form instantly.
      </div>

      <h2 style={s.h2}>Step 2: Register on the e-Filing Portal</h2>
      <p style={s.p}>
        All ITR filing is done online through the Income Tax e-Filing Portal.
      </p>
      <ol style={s.ol}>
        <li>Visit the official e-filing portal (incometax.gov.in)</li>
        <li>Click "Register" if you are a first-time user — use your PAN as the User ID</li>
        <li>Enter your name, date of birth, and contact details as per PAN records</li>
        <li>Verify via OTP sent to mobile and email registered with Aadhaar</li>
        <li>Set a strong password — you will need this every year</li>
        <li>If already registered, click "Login" and enter your PAN and password</li>
      </ol>
      <p style={s.p}>
        If you have forgotten your password, reset using Aadhaar OTP or the registered mobile/email OTP option.
      </p>

      <h2 style={s.h2}>Step 3: Download and Review Form 26AS and AIS</h2>
      <p style={s.p}>
        Before filling your ITR, cross-check your tax credits and financial transactions from these two sources.
      </p>
      <h3 style={s.h3}>Form 26AS — Tax Credit Statement</h3>
      <p style={s.p}>
        Form 26AS shows all TDS deducted by employers, banks, and other deductors against your PAN. It also shows advance
        tax and self-assessment tax paid by you. Access it from the e-filing portal under "e-File" → "Income Tax Returns"
        → "View Form 26AS."
      </p>
      <h3 style={s.h3}>Annual Information Statement (AIS)</h3>
      <p style={s.p}>
        AIS is a more comprehensive document that includes details of salary, interest, dividends, securities transactions,
        mutual fund purchases/sales, foreign remittances, and more. It consolidates all third-party information reported to the
        IT department. Download from the e-filing portal → "Services" → "Annual Information Statement." If any transaction is
        incorrect, you can submit feedback directly on the portal.
      </p>
      <p style={s.p}>
        Match your Form 16 and bank statements against 26AS and AIS. Discrepancies should be resolved before filing to avoid
        notices. Common issues include TDS not reflecting (ask the deductor to file a correction) or transactions you do not
        recognize (submit feedback on AIS).
      </p>

      <h2 style={s.h2}>Step 4: Fill Income Details</h2>
      <p style={s.p}>
        On the e-filing portal, go to "e-File" → "Income Tax Returns" → "File Income Tax Return." Select the assessment
        year (AY 2027-28 for FY 2026-27), filing status, and ITR form. You can choose the online (recommended) or offline
        (JSON utility) method.
      </p>

      <h3 style={s.h3}>Income from Salary</h3>
      <p style={s.p}>
        Enter details from Form 16 — gross salary, allowances (HRA, LTA, DA), perquisites, and deductions (professional
        tax, standard deduction). The portal pre-fills much of this if you proceed with the pre-filled data. Calculate your
        take-home and tax with our <Link to="/take-home-salary-calculator" style={s.link}>Take-Home Salary Calculator</Link>.
      </p>

      <h3 style={s.h3}>Income from House Property</h3>
      <p style={s.p}>
        If you have a self-occupied property, enter the home loan interest under Section 24 (up to ₹2L deduction). For
        let-out property, report rental income after 30% standard deduction. If you receive rent, compute the tax impact
        with our <Link to="/hra-calculator" style={s.link}>HRA Calculator</Link> (for HRA exemption if applicable).
      </p>

      <h3 style={s.h3}>Capital Gains</h3>
      <p style={s.p}>
        Report gains from sale of equity shares, mutual funds, property, gold, and other assets. Short-term and long-term
        gains have different tax rates. Equity STCG is 20%, LTCG above ₹1.25 lakh is 12.5%. Property LTCG is 12.5% (without
        indexation from FY 2024-25). Use our <Link to="/capital-gains-calculator" style={s.link}>Capital Gains Calculator</Link> to
        compute the exact tax.
      </p>

      <h3 style={s.h3}>Income from Other Sources</h3>
      <p style={s.p}>
        Include savings account interest, FD interest, dividend income, gifts received above ₹50,000, and any other income
        not covered above. Savings interest up to ₹10,000 is deductible under Section 80TTA (₹50,000 for senior citizens
        under 80TTB).
      </p>

      <h2 style={s.h2}>Step 5: Claim Deductions</h2>
      <p style={s.p}>
        Deductions reduce your taxable income. They are primarily available under the old regime — the new regime allows
        only standard deduction and employer NPS. Check which regime suits you with our{' '}
        <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link>.
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Section</th>
            <th style={s.th}>Deduction</th>
            <th style={s.th}>Max Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>80C</td><td style={s.td}>PPF, ELSS, LIC, EPF, NSC, SSY, tuition fees, home loan principal</td><td style={s.td}>₹1,50,000</td></tr>
          <tr><td style={s.td}>80CCD(1B)</td><td style={s.td}>Additional NPS contribution</td><td style={s.td}>₹50,000</td></tr>
          <tr><td style={s.td}>80D</td><td style={s.td}>Health insurance premium</td><td style={s.td}>₹25,000 self + ₹25,000 parents (₹50K if senior)</td></tr>
          <tr><td style={s.td}>80E</td><td style={s.td}>Education loan interest</td><td style={s.td}>No limit (up to 8 years)</td></tr>
          <tr><td style={s.td}>80G</td><td style={s.td}>Donations to approved funds</td><td style={s.td}>50% or 100% of donation</td></tr>
          <tr><td style={s.td}>80TTA</td><td style={s.td}>Savings account interest</td><td style={s.td}>₹10,000</td></tr>
          <tr><td style={s.td}>24(b)</td><td style={s.td}>Home loan interest (self-occupied)</td><td style={s.td}>₹2,00,000</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Plan your 80C investments with our <Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> and check NPS
        benefits with the <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link>. Read our{' '}
        <Link to="/blog/section-80c-deductions-complete-guide" style={s.link}>complete 80C deductions guide</Link> for
        all eligible investments.
      </p>

      <h2 style={s.h2}>Step 6: Compute Tax and Pay</h2>
      <p style={s.p}>
        After entering all income and deductions, the portal computes your total tax liability. If you owe additional tax
        (after TDS), you need to pay self-assessment tax before filing.
      </p>
      <ol style={s.ol}>
        <li>The portal shows "Tax Payable" or "Refund" after computing all schedules</li>
        <li>If tax is payable, pay via the "e-Pay Tax" option on the portal (net banking, UPI, or NEFT/RTGS)</li>
        <li>Select challan 280 — "Income Tax (Other than Companies)" → "Self-Assessment Tax (300)"</li>
        <li>Enter the assessment year (2027-28) and amount payable</li>
        <li>After payment, enter the challan details (BSR code, date, serial) in your ITR form</li>
      </ol>
      <p style={s.p}>
        If you had advance tax obligations (income above ₹10,000 tax after TDS), check if you paid the correct
        installments with our <Link to="/advance-tax-calculator" style={s.link}>Advance Tax Calculator</Link>. Interest
        under 234B and 234C applies for shortfall in advance tax.
      </p>

      <h2 style={s.h2}>Step 7: Verify Your Return</h2>
      <p style={s.p}>
        Filing is not complete until you verify the return. An unverified ITR is treated as not filed. You must verify
        within 30 days of filing.
      </p>
      <h3 style={s.h3}>e-Verification Methods (Instant)</h3>
      <ol style={s.ol}>
        <li><strong>Aadhaar OTP (recommended):</strong> OTP sent to mobile linked with Aadhaar — fastest method</li>
        <li><strong>Net banking:</strong> Log in through your bank → redirected to e-filing portal → auto-verified</li>
        <li><strong>Bank account EVC:</strong> Generate EVC through pre-validated bank account</li>
        <li><strong>Demat account EVC:</strong> Generate through pre-validated demat account</li>
        <li><strong>Digital Signature Certificate (DSC):</strong> For individuals who have a registered DSC</li>
      </ol>
      <h3 style={s.h3}>Physical Verification (Legacy)</h3>
      <p style={s.p}>
        If you cannot e-verify, print the signed ITR-V acknowledgment and send it by ordinary post to the Centralized
        Processing Centre (CPC), Bengaluru 560500 within 30 days. However, e-verification is strongly recommended as it
        is faster and error-free.
      </p>

      <h2 style={s.h2}>Common Mistakes to Avoid</h2>
      <ul style={s.ul}>
        <li><strong>Not verifying within 30 days:</strong> The return is treated as not filed — file a revised or belated return and verify immediately</li>
        <li><strong>Wrong ITR form:</strong> Leads to a defective return notice under Section 139(9) — use our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link></li>
        <li><strong>Forgetting to report all income:</strong> Cross-check AIS for interest, dividends, capital gains, and other transactions. Unreported income may trigger a notice</li>
        <li><strong>Mismatching Form 16 and 26AS:</strong> Ensure TDS amounts match. If they do not, ask your employer or deductor to file a correction return</li>
        <li><strong>Not claiming all deductions:</strong> Many people forget NPS 80CCD(1B) (₹50K extra), health insurance 80D, or education loan 80E</li>
        <li><strong>Filing under the wrong regime:</strong> If you do not specifically opt for old regime, the default is new regime. Compare both with our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link></li>
        <li><strong>Wrong bank account for refund:</strong> Pre-validate your bank account on the portal and ensure IFSC and account number are correct</li>
        <li><strong>Last-minute filing:</strong> Portal faces heavy traffic near the deadline. File at least 2-3 weeks before July 31</li>
      </ul>

      <h2 style={s.h2}>ITR Filing Deadlines for FY 2026-27</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Category</th>
            <th style={s.th}>Due Date</th>
            <th style={s.th}>Penalty if Late</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Salaried / no audit</td><td style={s.td}>July 31, 2027</td><td style={s.td}>₹5,000 (₹1,000 if income &lt; ₹5L)</td></tr>
          <tr><td style={s.td}>Business (audit required)</td><td style={s.td}>October 31, 2027</td><td style={s.td}>₹5,000</td></tr>
          <tr><td style={s.td}>Transfer pricing cases</td><td style={s.td}>November 30, 2027</td><td style={s.td}>₹5,000</td></tr>
          <tr><td style={s.td}>Revised / belated return</td><td style={s.td}>December 31, 2027</td><td style={s.td}>Cannot carry forward losses</td></tr>
          <tr><td style={s.td}>Updated return (ITR-U)</td><td style={s.td}>March 31, 2029</td><td style={s.td}>25-50% additional tax</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Filing ITR with DoAide TaxFile</h2>
      <p style={s.p}>
        DoAide TaxFile provides a suite of free tools that simplify every step of the filing process. While we do not
        file the return for you (you still file on the official portal), our tools help you prepare accurately and avoid
        mistakes.
      </p>
      <ul style={s.ul}>
        <li><strong>Calculate your tax first:</strong> Our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> compares old and new regime with your exact salary and deductions</li>
        <li><strong>Choose the right form:</strong> The <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> recommends the correct ITR form based on your income sources</li>
        <li><strong>Plan deductions:</strong> Use the <Link to="/80c-planner" style={s.link}>80C Planner</Link> and <Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> to maximize savings</li>
        <li><strong>Compute capital gains:</strong> The <Link to="/capital-gains-calculator" style={s.link}>Capital Gains Calculator</Link> handles equity, mutual funds, and property</li>
        <li><strong>Check refund:</strong> Our <Link to="/refund-calculator" style={s.link}>Refund Calculator</Link> estimates how much you will get back</li>
        <li><strong>Analyze Form 16:</strong> Upload your Form 16 to the <Link to="/form-16-analyzer" style={s.link}>Form 16 Analyzer</Link> for a detailed breakdown</li>
      </ul>

      <p style={s.p}>
        Once your ITR is filed and verified, track your refund status using the e-filing portal. Most refunds are processed
        within 20-45 days. Read our <Link to="/blog/income-tax-slabs-2026-27" style={s.link}>Income Tax Slabs 2026-27 guide</Link> for
        the latest slab rates, or explore <Link to="/blog/nps-vs-ppf-vs-elss-comparison" style={s.link}>NPS vs PPF vs ELSS</Link> for
        smart tax-saving investment strategies.
      </p>

      <FAQSection faqs={FAQS} />

      <div style={s.callout}>
        <div style={s.calloutTitle}>Free Tax Tools</div>
        <ul style={{ ...s.ul, marginBottom: 0 }}>
          <li><Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — compare both regimes instantly</li>
          <li><Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> — find the right form</li>
          <li><Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> — optimize deductions</li>
          <li><Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link> — restructure CTC for savings</li>
          <li><Link to="/form-16-analyzer" style={s.link}>Form 16 Analyzer</Link> — decode your Form 16</li>
          <li><Link to="/refund-calculator" style={s.link}>Refund Calculator</Link> — estimate your refund</li>
        </ul>
      </div>
    </div>
  )
}
