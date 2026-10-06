import SEOHead from '../components/SEOHead'
import FAQSection from '../components/FAQSection'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  card: {
    background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', padding: 24, marginBottom: 24,
  },
  cardTitle: { fontSize: 18, fontWeight: 600, marginBottom: 12 },
  step: { display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--doaide-border)' },
  stepNum: {
    width: 32, height: 32, borderRadius: '50%', background: 'var(--doaide-gold-bg)',
    color: 'var(--doaide-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 600, fontSize: 14, flexShrink: 0,
  },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 15, fontWeight: 600, marginBottom: 4 },
  stepDesc: { fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.6 },
  link: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 24px',
    background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    borderRadius: 'var(--doaide-radius-md)', fontSize: 15, fontWeight: 600,
    textDecoration: 'none', marginTop: 16,
  },
  timeline: { marginTop: 32 },
  timelineItem: {
    display: 'flex', gap: 16, padding: '12px 0',
    borderBottom: '1px solid var(--doaide-border)', fontSize: 14,
  },
  timelineLabel: { minWidth: 120, fontWeight: 500, color: 'var(--doaide-gold)' },
  timelineDesc: { color: 'var(--doaide-text-secondary)', lineHeight: 1.6 },
  statusTable: { width: '100%', borderCollapse: 'collapse', fontSize: 14, marginTop: 16 },
  th: {
    textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--doaide-border)',
    color: 'var(--doaide-text-secondary)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
  },
  td: { padding: '10px 12px', borderBottom: '1px solid var(--doaide-border)', color: 'var(--doaide-text)' },
}

const STEPS = [
  { title: 'Visit Income Tax Portal', desc: 'Go to the official Income Tax e-Filing portal (incometax.gov.in).' },
  { title: 'Log in with PAN', desc: 'Log in using your PAN number as the user ID and your password.' },
  { title: 'Navigate to e-File → Income Tax Returns → View Filed Returns', desc: 'Select the assessment year (AY 2027-28 for FY 2026-27) to view your filed ITR.' },
  { title: 'Check Refund Status', desc: 'Click on the ITR acknowledgment number to view the refund status. It will show if the refund has been processed, issued, or is pending.' },
  { title: 'Alternative: NSDL/TIN Website', desc: 'Visit tin.tin.nsdl.com/oltas/refundstatuslogin.html — enter PAN, select the assessment year, and enter the captcha to check status.' },
]

const STATUSES = [
  { status: 'Refund Paid', meaning: 'Refund has been credited to your bank account', action: 'Check your bank statement' },
  { status: 'Refund Determined', meaning: 'Refund amount has been determined by the CPC', action: 'Wait for bank credit (usually 4-5 days)' },
  { status: 'ITR Processed', meaning: 'Your ITR has been processed, refund calculation done', action: 'Check for any demand notice' },
  { status: 'Refund Unpaid', meaning: 'Refund could not be credited due to incorrect bank details', action: 'Update bank details on the portal and raise a refund reissue request' },
  { status: 'Refund Adjusted', meaning: 'Refund adjusted against outstanding tax demand', action: 'Check intimation under Section 245' },
  { status: 'Not Determined', meaning: 'Return filed but not yet processed', action: 'Wait — processing takes 15-45 days after e-verification' },
]

const FAQS = [
  { q: 'How long does it take to get an income tax refund?', a: 'Typically, refunds are processed within 20-45 days after e-verification of your ITR. However, it can take longer in some cases. The refund is credited directly to the bank account linked with your PAN.' },
  { q: 'How do I check my refund status online?', a: 'You can check on the Income Tax e-Filing portal (incometax.gov.in) under e-File → Income Tax Returns → View Filed Returns. Alternatively, use the NSDL TIN website with your PAN and assessment year.' },
  { q: 'What if my refund status shows "Refund Unpaid"?', a: 'This usually happens when the bank account details are incorrect or the account has been closed. Log in to the e-filing portal, go to Service Request → Refund Reissue, and provide correct bank details pre-validated on the portal.' },
  { q: 'Is interest paid on delayed refunds?', a: 'Yes, the Income Tax Department pays interest at 0.5% per month (6% per annum) on delayed refunds under Section 244A. The interest is calculated from April 1 of the assessment year or the date of filing (whichever is later) to the date of refund.' },
  { q: 'Can I track my refund through SMS or email?', a: 'The Income Tax Department sends email and SMS notifications at each stage — when the return is processed, when the refund is issued, and when it is credited. Make sure your email and mobile number are updated on the portal.' },
  { q: 'What should I do if my refund is less than expected?', a: 'Compare the intimation under Section 143(1) with your filed return. Common reasons include: TDS mismatch (check Form 26AS vs claimed TDS), incorrect deductions, or adjustment against previous year demand. You can file a rectification under Section 154.' },
]

export default function TaxRefundStatus() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Income Tax Refund Status - How to Check Online | DoAide TaxFile"
        description="Check your income tax refund status online. Step-by-step guide to track ITR refund on the Income Tax portal and NSDL website for FY 2026-27."
        keywords="income tax refund status, ITR refund check, tax refund tracker, refund status India"
        canonical="https://tax.doaide.com/tax-refund-status"
        faqs={FAQS}
      />

      <h1 style={s.title}>Tax Refund Status</h1>
      <p style={s.subtitle}>How to check your income tax refund status for FY 2026-27 (AY 2027-28)</p>

      <div style={s.card}>
        <h2 style={s.cardTitle}>How to Check Your Refund Status</h2>
        {STEPS.map((step, i) => (
          <div key={i} style={{ ...s.step, ...(i === STEPS.length - 1 ? { borderBottom: 'none' } : {}) }}>
            <span style={s.stepNum}>{i + 1}</span>
            <div style={s.stepContent}>
              <div style={s.stepTitle}>{step.title}</div>
              <div style={s.stepDesc}>{step.desc}</div>
            </div>
          </div>
        ))}
        <a href="https://eportal.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={s.link}>
          Go to Income Tax Portal →
        </a>
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Refund Status Meanings</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={s.statusTable}>
            <thead>
              <tr>
                <th style={s.th}>Status</th>
                <th style={s.th}>What it Means</th>
                <th style={s.th}>What to Do</th>
              </tr>
            </thead>
            <tbody>
              {STATUSES.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...s.td, fontWeight: 600, whiteSpace: 'nowrap' }}>{r.status}</td>
                  <td style={s.td}>{r.meaning}</td>
                  <td style={s.td}>{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Refund Processing Timeline</h2>
        <div style={s.timelineItem}>
          <span style={s.timelineLabel}>Filing Date</span>
          <span style={s.timelineDesc}>ITR filed and acknowledged by the portal</span>
        </div>
        <div style={s.timelineItem}>
          <span style={s.timelineLabel}>E-Verification</span>
          <span style={s.timelineDesc}>Must be done within 30 days of filing (Aadhaar OTP, net banking, or DSC)</span>
        </div>
        <div style={s.timelineItem}>
          <span style={s.timelineLabel}>Processing</span>
          <span style={s.timelineDesc}>CPC Bengaluru processes the return — typically 15-45 days after e-verification</span>
        </div>
        <div style={s.timelineItem}>
          <span style={s.timelineLabel}>Intimation 143(1)</span>
          <span style={s.timelineDesc}>You receive an intimation comparing your filed return with the department&apos;s assessment</span>
        </div>
        <div style={{ ...s.timelineItem, borderBottom: 'none' }}>
          <span style={s.timelineLabel}>Refund Credit</span>
          <span style={s.timelineDesc}>Refund credited to your pre-validated bank account via ECS/NEFT — 4-5 business days after processing</span>
        </div>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
