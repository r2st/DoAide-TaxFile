import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import WhatsAppShare from '../../components/WhatsAppShare'

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
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  warning: {
    padding: 20, background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.25)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  warningTitle: { fontWeight: 600, color: '#ff3b30', marginBottom: 8 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
}

const FAQS = [
  { q: 'What is the last date to file ITR for FY 2026-27?', a: 'The due date for filing ITR for FY 2026-27 (AY 2027-28) is July 31, 2027 for individuals and HUFs not subject to audit. For businesses requiring audit, the due date is October 31, 2027. A belated return can be filed until December 31, 2027 with a penalty.' },
  { q: 'Which ITR form should I use?', a: 'ITR-1 (Sahaj): Salaried individuals with income up to ₹50L from salary, one house property, and other sources. ITR-2: Income from capital gains, multiple properties, or foreign assets. ITR-3: Business or professional income. ITR-4 (Sugam): Presumptive taxation under 44AD/44ADA.' },
  { q: 'What happens if I miss the ITR filing deadline?', a: 'You can file a belated return by December 31 of the assessment year, but with a late fee of ₹5,000 (₹1,000 if income is under ₹5 lakh). You also lose the ability to carry forward losses (except house property loss) and may face interest under sections 234A, 234B, and 234C.' },
  { q: 'How do I e-verify my ITR?', a: 'You can e-verify using: (1) Aadhaar OTP — most common and instant, (2) Net banking — login through your bank, (3) Bank account EVC — generate EVC from pre-validated bank account, (4) Demat account EVC, or (5) DSC — Digital Signature Certificate. You must e-verify within 30 days of filing.' },
  { q: 'Can I revise my ITR after filing?', a: 'Yes, you can file a revised return under Section 139(5) before December 31 of the assessment year. This is useful if you made errors in the original return. There is no limit on the number of revisions, but each revision must reference the original filing acknowledgment number.' },
]

export default function HowToFileITRGuide() {
  return (
    <div style={s.page}>
      <SEOHead
        title="How to File ITR Online: Step by Step Guide 2026 | DoAide TaxFile"
        description="Complete step-by-step guide to filing income tax return (ITR) online on incometax.gov.in for FY 2026-27. Covers ITR form selection, documents needed, and e-verification."
        keywords="how to file ITR online, file income tax return 2026, ITR filing guide, incometax.gov.in filing, step by step ITR filing"
        canonical="https://tax.doaide.com/guides/how-to-file-itr-online"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'How to File ITR Online' }]} />

      <h1 style={s.title}>How to File ITR Online: Step by Step Guide 2026</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) • 12 min read</p>

      <p style={s.p}>
        Filing your income tax return (ITR) online is mandatory for most taxpayers in India. The Income Tax Department's portal
        at incometax.gov.in lets you file, e-verify, and track your return entirely online. This guide walks you through every
        step — from gathering documents to receiving your refund.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Before You Start</div>
        Use our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> to find the right form for your income type.
        Check your tax liability with the <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>.
      </div>

      <h2 style={s.h2}>Documents You Need</h2>
      <p style={s.p}>Gather these before you begin filing:</p>
      <ol style={s.ol}>
        <li style={s.li}><strong>PAN Card</strong> — Your Permanent Account Number (linked to Aadhaar)</li>
        <li style={s.li}><strong>Aadhaar Card</strong> — For e-verification via OTP</li>
        <li style={s.li}><strong>Form 16</strong> — Issued by your employer showing salary and TDS details. Use our <Link to="/form-16-decoder" style={s.link}>Form 16 Decoder</Link> to understand it.</li>
        <li style={s.li}><strong>Form 16A</strong> — TDS certificate for non-salary income (bank interest, rent, etc.)</li>
        <li style={s.li}><strong>Form 26AS / AIS</strong> — Annual Information Statement showing all TDS, advance tax, and financial transactions. Download from incometax.gov.in.</li>
        <li style={s.li}><strong>Bank statements</strong> — For interest income from savings and FDs</li>
        <li style={s.li}><strong>Investment proofs</strong> — 80C (PPF, ELSS, LIC), 80D (health insurance), home loan certificates</li>
        <li style={s.li}><strong>Capital gains statements</strong> — From your broker or mutual fund house</li>
        <li style={s.li}><strong>Rent receipts</strong> — If claiming HRA exemption. Generate using our <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link>.</li>
        <li style={s.li}><strong>Bank account details</strong> — Pre-validated bank account for refund credit</li>
      </ol>

      <h2 style={s.h2}>Step 1: Choose the Right ITR Form</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Form</th>
              <th style={s.th}>Who Should File</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}><strong>ITR-1 (Sahaj)</strong></td><td style={s.td}>Salaried individuals, income ≤ ₹50L, one house property, other sources (interest, etc.), agricultural income ≤ ₹5,000</td></tr>
            <tr><td style={s.td}><strong>ITR-2</strong></td><td style={s.td}>Capital gains, multiple house properties, foreign income/assets, income &gt; ₹50L, director in a company</td></tr>
            <tr><td style={s.td}><strong>ITR-3</strong></td><td style={s.td}>Business or professional income (not presumptive), partnership firms (partner)</td></tr>
            <tr><td style={s.td}><strong>ITR-4 (Sugam)</strong></td><td style={s.td}>Presumptive income under sections 44AD, 44ADA, 44AE with total income ≤ ₹50L</td></tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        Most salaried individuals with only salary, bank interest, and one house property should use <strong>ITR-1</strong>.
        If you have capital gains from stocks or mutual funds, you need <strong>ITR-2</strong>.
      </p>

      <h2 style={s.h2}>Step 2: Register / Login on incometax.gov.in</h2>
      <ol style={s.ol}>
        <li style={s.li}>Go to <strong>incometax.gov.in</strong> and click "Login"</li>
        <li style={s.li}>Enter your PAN as the User ID</li>
        <li style={s.li}>If first time, click "Register" — you will need PAN, Aadhaar, mobile number, and email</li>
        <li style={s.li}>After login, navigate to <strong>e-File → Income Tax Returns → File Income Tax Return</strong></li>
      </ol>

      <h2 style={s.h2}>Step 3: Select Assessment Year and Filing Mode</h2>
      <ol style={s.ol}>
        <li style={s.li}>Select <strong>Assessment Year 2027-28</strong> (for income earned in FY 2026-27)</li>
        <li style={s.li}>Select filing mode: <strong>Online</strong> (recommended for ITR-1, ITR-4) or <strong>Offline</strong> (download JSON utility for ITR-2, ITR-3)</li>
        <li style={s.li}>Select the applicable ITR form</li>
        <li style={s.li}>Choose reason for filing: filing within due date, belated, or revised</li>
      </ol>

      <h2 style={s.h2}>Step 4: Fill in Income Details</h2>
      <h3 style={s.h3}>Salary Income</h3>
      <p style={s.p}>
        Most details will be pre-filled from Form 16 and Form 26AS. Verify: gross salary, allowances exempt under Section 10
        (HRA, LTA), standard deduction (₹75,000 new regime / ₹50,000 old regime), professional tax deducted, and net taxable salary.
      </p>

      <h3 style={s.h3}>House Property Income</h3>
      <p style={s.p}>
        For self-occupied property: report zero or negative income (home loan interest deduction up to ₹2L under Section 24b, old regime only).
        For let-out property: report annual rental income minus municipal taxes and 30% standard deduction.
      </p>

      <h3 style={s.h3}>Other Sources</h3>
      <p style={s.p}>
        Include bank interest (savings + FD), dividend income, interest from IT refund, and any other income.
        Savings bank interest up to ₹10,000 is deductible under Section 80TTA (old regime).
      </p>

      <h3 style={s.h3}>Capital Gains</h3>
      <p style={s.p}>
        Report gains from equity shares (STCG 20%, LTCG 12.5% above ₹1.25L), debt mutual funds (taxed at slab),
        property (20% with indexation for old acquisitions), and other assets. Use our <Link to="/capital-gains-calculator" style={s.link}>Capital Gains Calculator</Link>.
      </p>

      <h2 style={s.h2}>Step 5: Claim Deductions (Old Regime Only)</h2>
      <p style={s.p}>Under the old regime, claim deductions in this order of priority:</p>
      <ol style={s.ol}>
        <li style={s.li}><strong>Section 80C</strong> — Up to ₹1.5L (PPF, ELSS, EPF, LIC, tuition fees). See our <Link to="/guides/section-80c-deductions" style={s.link}>complete 80C guide</Link>.</li>
        <li style={s.li}><strong>Section 80CCD(1B)</strong> — Additional ₹50K for NPS contribution</li>
        <li style={s.li}><strong>Section 80D</strong> — Health insurance: ₹25K self + ₹25K parents (₹50K if senior parents). Use our <Link to="/80d-calculator" style={s.link}>80D Calculator</Link>.</li>
        <li style={s.li}><strong>Section 24(b)</strong> — Home loan interest up to ₹2L</li>
        <li style={s.li}><strong>Section 80TTA</strong> — Savings bank interest up to ₹10K</li>
        <li style={s.li}><strong>Section 80E</strong> — Education loan interest (no limit, 8 years)</li>
        <li style={s.li}><strong>Section 80G</strong> — Donations to eligible charities</li>
      </ol>

      <h2 style={s.h2}>Step 6: Choose Tax Regime</h2>
      <p style={s.p}>
        Select the new regime (default) or old regime. The portal will compute tax under both and show you which saves more.
        If choosing the old regime, ensure all deductions are entered correctly. Salaried individuals can switch regimes every year.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Compare Regimes</div>
        Not sure which is better? Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to compare both regimes with your actual deductions.
      </div>

      <h2 style={s.h2}>Step 7: Verify TDS and Taxes Paid</h2>
      <p style={s.p}>
        Cross-check TDS deducted (from Form 26AS) against what appears in your return. Verify advance tax and self-assessment
        tax challan numbers and dates. Any mismatch here will delay processing. The portal pre-fills most TDS data, but always verify.
      </p>

      <h2 style={s.h2}>Step 8: Submit and E-Verify</h2>
      <ol style={s.ol}>
        <li style={s.li}>Review the tax computation summary — check total income, deductions, tax payable/refund</li>
        <li style={s.li}>If tax is due, pay via <strong>e-Pay Tax</strong> on the portal before submitting</li>
        <li style={s.li}>Click <strong>Submit</strong> — you will receive an ITR Acknowledgment (ITR-V)</li>
        <li style={s.li}><strong>E-verify within 30 days</strong> using one of: Aadhaar OTP (recommended), net banking, bank account EVC, or DSC</li>
      </ol>

      <div style={s.warning}>
        <div style={s.warningTitle}>Do Not Skip E-Verification</div>
        Your return is not considered filed until it is e-verified. If not verified within 30 days, it is treated as if never filed.
        Aadhaar OTP is the fastest method — takes under 2 minutes.
      </div>

      <h2 style={s.h2}>Step 9: Track Your Return</h2>
      <p style={s.p}>
        After e-verification, CPC Bangalore processes your return. Track status at: <strong>incometax.gov.in → e-File →
        Income Tax Returns → View Filed Returns</strong>. Status will show "Processed" once complete. If a refund is due,
        it is typically credited within 4-6 months of filing. Use our <Link to="/refund-calculator" style={s.link}>Refund Calculator</Link> to estimate the amount.
      </p>

      <h2 style={s.h2}>Common Mistakes to Avoid</h2>
      <ol style={s.ol}>
        <li style={s.li}><strong>Not reporting all income</strong> — Include bank interest, FD interest, and dividend income. AIS shows everything the department knows.</li>
        <li style={s.li}><strong>Wrong ITR form</strong> — Filing ITR-1 when you have capital gains leads to defective return notice.</li>
        <li style={s.li}><strong>TDS mismatch</strong> — Always verify Form 26AS before filing. Contact deductor if TDS is missing.</li>
        <li style={s.li}><strong>Not pre-validating bank account</strong> — Refund fails if bank account is not pre-validated and linked to PAN.</li>
        <li style={s.li}><strong>Missing the deadline</strong> — Late filing attracts ₹5,000 penalty and you lose the ability to carry forward losses.</li>
      </ol>

      <div style={{ marginTop: 32 }}>
        <WhatsAppShare text="How to File ITR Online — Complete step-by-step guide for FY 2026-27\n\ntax.doaide.com/guides/how-to-file-itr-online" />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
