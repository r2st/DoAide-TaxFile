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
  { q: 'What is the last date to file ITR for FY 2026-27?', a: 'The deadline for salaried individuals and non-audit cases is July 31, 2027. Businesses requiring audit must file by October 31, 2027. Transfer pricing cases have until November 30, 2027.' },
  { q: 'What happens if I file ITR after the deadline?', a: 'Late filing under Section 234F incurs a penalty of ₹5,000 (₹1,000 if total income is below ₹5 lakh). Additionally, interest under Section 234A applies at 1% per month on unpaid tax. You also lose the ability to carry forward certain losses.' },
  { q: 'Can I file a revised return?', a: 'Yes, you can file a revised return under Section 139(5) before December 31, 2027 (end of the assessment year). There is no limit on the number of revisions, but each must be filed before the deadline.' },
  { q: 'Is there a penalty for filing belated return?', a: 'Yes. Under Section 234F, the penalty is ₹5,000 for income above ₹5 lakh, and ₹1,000 for income below ₹5 lakh. Interest under Sections 234A, 234B, and 234C may also apply depending on unpaid tax and advance tax shortfall.' },
]

export default function ITRFilingDeadlines2027() {
  return (
    <div style={s.page}>
      <SEOHead
        title="ITR Filing Deadlines 2027 — Key Dates, Penalties & Extensions | DoAide TaxFile"
        description="Complete guide to ITR filing deadlines for FY 2026-27 (AY 2027-28). Due dates for all taxpayer categories, late filing penalties, interest charges, and how to avoid them."
        keywords="ITR filing deadline 2027, last date to file ITR, ITR due date FY 2026-27, late filing penalty, Section 234F"
        canonical="https://tax.doaide.com/blog/itr-filing-deadlines-2027"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'ITR Filing Deadlines 2027' }]} />

      <h1 style={s.title}>ITR Filing Deadlines 2027 — Key Dates, Penalties & What Happens If You Miss Them</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) · October 2026 · 8 min read</p>

      <p style={s.p}>
        Filing your income tax return on time is not just a legal obligation — it also affects your ability to carry forward
        losses, claim refunds promptly, and avoid penalties. This guide covers every deadline for FY 2026-27, the penalties
        for missing them, and practical tips to file on time.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Not sure which form to use?</div>
        Use our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> to find the right ITR form in under 2 minutes — no login required.
      </div>

      <h2 style={s.h2}>ITR Filing Due Dates for FY 2026-27</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Category</th>
            <th style={s.th}>Due Date</th>
            <th style={s.th}>ITR Form</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Salaried individuals</td><td style={s.td}><strong>July 31, 2027</strong></td><td style={s.td}>ITR-1 or ITR-2</td></tr>
          <tr><td style={s.td}>Individuals with capital gains</td><td style={s.td}><strong>July 31, 2027</strong></td><td style={s.td}>ITR-2</td></tr>
          <tr><td style={s.td}>Business (non-audit)</td><td style={s.td}><strong>July 31, 2027</strong></td><td style={s.td}>ITR-3 or ITR-4</td></tr>
          <tr><td style={s.td}>Businesses requiring audit</td><td style={s.td}><strong>October 31, 2027</strong></td><td style={s.td}>ITR-3</td></tr>
          <tr><td style={s.td}>Transfer pricing cases</td><td style={s.td}><strong>November 30, 2027</strong></td><td style={s.td}>ITR-3</td></tr>
          <tr><td style={s.td}>Revised return</td><td style={s.td}><strong>December 31, 2027</strong></td><td style={s.td}>Same as original</td></tr>
          <tr><td style={s.td}>Belated return</td><td style={s.td}><strong>December 31, 2027</strong></td><td style={s.td}>Same as original</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Penalties for Late Filing</h2>
      <h3 style={s.h3}>Section 234F — Late Filing Fee</h3>
      <ul style={s.ul}>
        <li><strong>Income above ₹5 lakh:</strong> ₹5,000 penalty</li>
        <li><strong>Income up to ₹5 lakh:</strong> ₹1,000 penalty</li>
        <li><strong>Income below basic exemption:</strong> No penalty, but late filing restrictions apply</li>
      </ul>

      <h3 style={s.h3}>Section 234A — Interest on Late Filing</h3>
      <p style={s.p}>
        If you have unpaid tax liability, interest at <strong>1% per month</strong> (or part of month) is charged on the
        outstanding tax amount from the due date until the date of filing. This is in addition to the late filing fee.
      </p>

      <h3 style={s.h3}>Section 234B — Interest on Advance Tax Default</h3>
      <p style={s.p}>
        If your total tax liability exceeds ₹10,000 and you did not pay advance tax (or paid less than 90%),
        interest at 1% per month is charged from April 1 of the assessment year until the date of filing.
      </p>

      <h2 style={s.h2}>What You Lose by Filing Late</h2>
      <ul style={s.ul}>
        <li><strong>Cannot carry forward losses</strong> — Business losses, capital losses, and speculation losses can only be carried forward if the return is filed on time</li>
        <li><strong>Delayed refunds</strong> — Late filing means your refund processing starts later, and interest on refund (Section 244A) may be reduced</li>
        <li><strong>No condonation for small defaults</strong> — Certain benefits and exemptions require timely filing</li>
        <li><strong>Higher scrutiny risk</strong> — Late filers may face more scrutiny from the Income Tax Department</li>
      </ul>

      <h2 style={s.h2}>Advance Tax Due Dates</h2>
      <p style={s.p}>
        If your tax liability after TDS exceeds ₹10,000, you must pay advance tax in four installments:
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Installment</th>
            <th style={s.th}>Due Date</th>
            <th style={s.th}>Cumulative %</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>1st</td><td style={s.td}>June 15, 2026</td><td style={s.td}>15%</td></tr>
          <tr><td style={s.td}>2nd</td><td style={s.td}>September 15, 2026</td><td style={s.td}>45%</td></tr>
          <tr><td style={s.td}>3rd</td><td style={s.td}>December 15, 2026</td><td style={s.td}>75%</td></tr>
          <tr><td style={s.td}>4th</td><td style={s.td}>March 15, 2027</td><td style={s.td}>100%</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Use our <Link to="/advance-tax-calculator" style={s.link}>Advance Tax Calculator</Link> to compute your installment amounts.
      </p>

      <h2 style={s.h2}>Checklist: File on Time</h2>
      <ul style={s.ul}>
        <li>Collect Form 16 from your employer (usually available by June)</li>
        <li>Gather Form 26AS / AIS from the income tax portal to verify TDS credits</li>
        <li>Calculate your tax liability using our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link></li>
        <li>Choose the right ITR form with our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link></li>
        <li>File on incometax.gov.in before July 31, 2027</li>
        <li>E-verify within 30 days of filing (Aadhaar OTP, net banking, or DSC)</li>
      </ul>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Start Planning Now</div>
        Use our free <Link to="/tax-saving-calculator" style={s.link}>Tax Saving Calculator</Link> to optimize your deductions
        and minimize your tax liability before the financial year ends on March 31, 2027.
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
