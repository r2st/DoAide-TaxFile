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
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: { padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
  ol: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
  step: { padding: '20px 20px 20px 24px', borderLeft: '3px solid var(--doaide-gold)', background: 'var(--doaide-surface)', borderRadius: '0 var(--doaide-radius-md) var(--doaide-radius-md) 0', marginBottom: 16 },
  stepNum: { fontSize: 13, fontWeight: 600, color: 'var(--doaide-gold)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  stepTitle: { fontSize: 17, fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 6 },
  stepDesc: { fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.7 },
}

const FAQS = [
  { q: 'Do I need to file ITR if my income is below ₹2.5 lakh?', a: 'You are not legally required to file if your total income is below the basic exemption limit (₹2.5L under old regime, ₹4L under new regime for FY 2026-27). However, filing is recommended for visa applications, loan eligibility, and claiming TDS refunds.' },
  { q: 'What documents do I need to file ITR for the first time?', a: 'PAN card, Aadhaar card, Form 16 from employer, bank statements showing interest income, investment proofs (PPF, ELSS, insurance), rent receipts (for HRA), and Form 26AS/AIS from the income tax portal showing TDS credits.' },
  { q: 'Can I file ITR without Form 16?', a: 'Yes. Form 16 is not mandatory for filing. You can use salary slips, bank statements, and Form 26AS to calculate your income and TDS. However, Form 16 makes the process much easier.' },
  { q: 'What is the penalty for not filing ITR?', a: 'Under Section 234F, late filing attracts a penalty of ₹5,000 (₹1,000 if income below ₹5 lakh). Interest under Section 234A at 1% per month also applies on any unpaid tax. If you deliberately don\'t file, prosecution under Section 276CC is possible for tax liability above ₹25,000.' },
  { q: 'How do I choose between old and new tax regime?', a: 'The new regime has lower rates but allows almost no deductions. If you have significant deductions (80C, 80D, HRA, home loan), the old regime may save more. Use our Income Tax Calculator to compare both with your actual numbers.' },
]

export default function FirstTimeITRGuide() {
  return (
    <div style={s.page}>
      <SEOHead
        title="First Time Filing ITR? Complete Beginner's Guide 2026 | DoAide TaxFile"
        description="Complete step-by-step guide for first-time income tax return filers in India. Documents needed, choosing ITR form, old vs new regime, filing on the portal, and e-verification — all explained simply."
        keywords="first time ITR filing, how to file ITR first time, beginner ITR guide, income tax return India, ITR filing guide"
        canonical="https://tax.doaide.com/blog/first-time-itr-filing-guide"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'First Time ITR Filing Guide' }]} />

      <h1 style={s.title}>First Time Filing ITR? Here's Everything You Need to Know</h1>
      <p style={s.meta}>Beginner-friendly guide for FY 2026-27 · October 2026 · 10 min read</p>

      <p style={s.p}>
        Filing your first income tax return can feel overwhelming — confusing forms, unfamiliar terms, and the fear of
        making mistakes. But it's actually straightforward once you understand the basics. This guide walks you through
        every step in plain English, with links to free tools that do the math for you.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Who Must File ITR?</div>
        You must file if your gross income exceeds ₹3 lakh (before deductions). Even if below this limit,
        filing is recommended for visa applications, getting a loan, or claiming a TDS refund.
      </div>

      <h2 style={s.h2}>Step-by-Step: File Your First ITR</h2>

      <div style={s.step}>
        <div style={s.stepNum}>Step 1</div>
        <div style={s.stepTitle}>Gather Your Documents</div>
        <div style={s.stepDesc}>
          <strong>Must-have:</strong> PAN card, Aadhaar card, Form 16 (from employer), bank account details
          (including IFSC code for refund). <br/>
          <strong>For deductions:</strong> Investment proofs (PPF passbook, ELSS statements, insurance receipts),
          rent receipts (for HRA), home loan interest certificate.
        </div>
      </div>

      <div style={s.step}>
        <div style={s.stepNum}>Step 2</div>
        <div style={s.stepTitle}>Calculate Your Total Income</div>
        <div style={s.stepDesc}>
          Add up all income sources: salary (from Form 16), bank interest, FD interest,
          rental income, capital gains, and any other income. Use our{' '}
          <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to see your exact tax liability.
        </div>
      </div>

      <div style={s.step}>
        <div style={s.stepNum}>Step 3</div>
        <div style={s.stepTitle}>Choose Old or New Tax Regime</div>
        <div style={s.stepDesc}>
          <strong>New regime (default):</strong> Lower rates, ₹75,000 standard deduction, minimal other deductions.
          Income up to ₹12.75L is effectively tax-free (after standard deduction + 87A rebate).<br/>
          <strong>Old regime:</strong> Higher rates but allows 80C (₹1.5L), 80D, HRA, home loan, NPS deductions.
          Better if you have significant investments and HRA.
        </div>
      </div>

      <div style={s.step}>
        <div style={s.stepNum}>Step 4</div>
        <div style={s.stepTitle}>Find Your ITR Form</div>
        <div style={s.stepDesc}>
          Most first-time filers with only salary income need <strong>ITR-1 (Sahaj)</strong>. If you have capital
          gains, foreign income, or income above ₹50L, you'll need ITR-2. Use our{' '}
          <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> to find the right form.
        </div>
      </div>

      <div style={s.step}>
        <div style={s.stepNum}>Step 5</div>
        <div style={s.stepTitle}>File on the Income Tax Portal</div>
        <div style={s.stepDesc}>
          Go to <strong>incometax.gov.in</strong> → Login with PAN and password → e-File → Income Tax Returns →
          File Income Tax Return → Select Assessment Year (AY 2027-28) → Choose ITR form → Fill in details →
          Validate → Submit.
        </div>
      </div>

      <div style={s.step}>
        <div style={s.stepNum}>Step 6</div>
        <div style={s.stepTitle}>E-Verify Your Return</div>
        <div style={s.stepDesc}>
          After filing, you must verify within 30 days. Easiest method: <strong>Aadhaar OTP</strong> (instant).
          Other options: net banking, bank account EVC, demat account, or physical ITR-V to CPC Bengaluru.
          Your return is not processed until verified.
        </div>
      </div>

      <h2 style={s.h2}>Common Terms Explained</h2>
      <ul style={s.ul}>
        <li><strong>PAN:</strong> Permanent Account Number — your unique tax ID. It's your username for the tax portal.</li>
        <li><strong>Assessment Year (AY):</strong> The year after the financial year, when your income is assessed. FY 2026-27 = AY 2027-28.</li>
        <li><strong>Form 16:</strong> Certificate from your employer showing salary paid and TDS deducted.</li>
        <li><strong>Form 26AS / AIS:</strong> Your tax credit statement — shows all TDS deducted by everyone (employer, bank, etc.). Download from incometax.gov.in.</li>
        <li><strong>TDS:</strong> Tax Deducted at Source — tax already deducted from your salary, FD interest, etc.</li>
        <li><strong>Section 87A Rebate:</strong> Under the new regime, if taxable income ≤ ₹12L, you get a rebate of up to ₹60,000 — making tax effectively zero.</li>
        <li><strong>Section 80C:</strong> Investments like PPF, ELSS, LIC, home loan principal — deduction up to ₹1.5L (old regime only).</li>
        <li><strong>HRA:</strong> House Rent Allowance — if you receive HRA as part of salary and pay rent, part of it is tax-exempt.</li>
      </ul>

      <h2 style={s.h2}>Mistakes First-Time Filers Make</h2>
      <ul style={s.ul}>
        <li><strong>Not reporting interest income:</strong> Bank savings interest (above ₹10,000) and FD interest are taxable. Include them.</li>
        <li><strong>Choosing the wrong ITR form:</strong> Using ITR-1 when you have capital gains leads to a defective return notice. Use our <Link to="/itr-form-selector" style={s.link}>form selector</Link>.</li>
        <li><strong>Not comparing regimes:</strong> Many people stick with the default new regime without checking if old regime is better. Always <Link to="/income-tax-calculator" style={s.link}>compare both</Link>.</li>
        <li><strong>Forgetting to e-verify:</strong> An unverified return is as good as not filed. Verify immediately after filing.</li>
        <li><strong>Not claiming TDS refund:</strong> If employer deducted more TDS than your actual liability, you get a refund — but only if you file.</li>
      </ul>

      <h2 style={s.h2}>When Filing Is Optional but Recommended</h2>
      <p style={s.p}>
        Even if your income is below the taxable limit, consider filing in these situations:
      </p>
      <ul style={s.ul}>
        <li><strong>Visa applications:</strong> Most countries require 2-3 years of ITR receipts</li>
        <li><strong>Loan applications:</strong> Banks ask for ITR as income proof</li>
        <li><strong>TDS refund:</strong> If your employer or bank deducted TDS and your actual tax is zero, you need to file to get the refund</li>
        <li><strong>Carry forward losses:</strong> Capital losses (shares, mutual funds) can be carried forward for 8 years only if you file on time</li>
      </ul>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Ready to File?</div>
        Start by calculating your tax with our{' '}
        <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>, then find the right
        form with the <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link>. Both are
        free and require no login.
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
