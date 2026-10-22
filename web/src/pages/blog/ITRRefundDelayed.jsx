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
  { q: 'How long does an income tax refund take in 2026?', a: 'Most refunds for simple returns are credited within a few weeks of e-verification. Returns with mismatches, large refunds or pending demands can take several months.' },
  { q: 'Why has my ITR refund not come even though the return is processed?', a: 'The most common reasons are a bank account that is not pre-validated, a name mismatch between PAN and bank account, an inoperative PAN not linked to Aadhaar, or the refund being adjusted against an old demand.' },
  { q: 'Will I get interest on a delayed refund?', a: 'Yes. Under Section 244A you get simple interest of 0.5% per month on the refund, generally from 1 April of the assessment year if the return was filed on time, or from the filing date if it was filed late.' },
  { q: 'What is a refund reissue request?', a: 'If a refund failed because of bank details, you can raise a refund reissue request on the e-filing portal under Services, choosing a pre-validated bank account for the fresh credit.' },
  { q: 'What should I do if I get a Section 245 notice?', a: 'Section 245 lets the department adjust your refund against an outstanding demand. Respond on the portal within 30 days, agreeing or disagreeing with the demand, or the refund may be adjusted.' },
]

export default function ITRRefundDelayed() {
  return (
    <div style={s.page}>
      <SEOHead
        title="ITR Refund Delayed? 8 Reasons and How to Fix Each One (2026) | DoAide TaxFile"
        description="Income tax refund not received for AY 2026-27? The 8 most common reasons ITR refunds get delayed — e-verification, bank validation, inoperative PAN, AIS mismatch, Section 245 adjustment — and exactly how to fix each."
        keywords="ITR refund delayed, income tax refund not received, refund status AY 2026-27, refund reissue request, section 245 notice, refund failed bank account"
        canonical="https://tax.doaide.com/blog/itr-refund-delayed-reasons-how-to-fix"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'ITR Refund Delayed' }]} />

      <h1 style={s.title}>ITR Refund Delayed? 8 Reasons and How to Fix Each One</h1>
      <p style={s.meta}>For AY 2026-27 refunds · Updated October 2026 · 8 min read</p>

      <p style={s.p}>
        You filed your income tax return in July, your friends got their refunds in August, and yours still shows
        &quot;processing&quot; — or worse, &quot;refund failed&quot;. A delayed refund is almost always caused by one of a handful of
        fixable problems. This guide walks through the eight most common reasons, how to tell which one applies to you,
        and what to do about each.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Check where your refund stands</div>
        Our <Link to="/tax-refund-status" style={s.link}>Tax Refund Status guide</Link> shows where to check your status and what
        each status message means. Not sure how much you should get back? Estimate it with the{' '}
        <Link to="/refund-calculator" style={s.link}>Refund Calculator</Link>.
      </div>

      <h2 style={s.h2}>How Long Should a Refund Take?</h2>
      <p style={s.p}>
        The Centralised Processing Centre (CPC) processes most simple returns — salary income, TDS matching AIS — within a
        few weeks of e-verification, and the refund is credited a few days after the return is processed. If it has been
        more than four to six weeks since you e-verified, one of the problems below is likely.
      </p>

      <h2 style={s.h2}>The 8 Most Common Reasons</h2>

      <h3 style={s.h3}>1. The return was never e-verified</h3>
      <p style={s.p}>
        A return is not processed until it is verified. Check e-File → Income Tax Returns → View Filed Returns. If the status
        says &quot;Pending for e-verification&quot;, verify now with Aadhaar OTP or net banking. If more than 30 days have passed
        since filing, the verification date is treated as the filing date, so a late fee could apply.
      </p>

      <h3 style={s.h3}>2. Bank account not pre-validated</h3>
      <p style={s.p}>
        Refunds go only to a bank account that is pre-validated on the e-filing portal. Go to My Profile → Bank Account and
        check that your account shows &quot;Validated&quot; and is nominated for refund. If validation failed, correct the IFSC or
        account number and re-validate.
      </p>

      <h3 style={s.h3}>3. Name mismatch between PAN and bank account</h3>
      <p style={s.p}>
        A different spelling, missing middle name or initials can cause the bank to reject the credit, and your status
        shows &quot;Refund failed&quot;. Ask the bank to update the account name to match your PAN, re-validate the account, and then
        raise a <strong>refund reissue request</strong> under Services on the portal.
      </p>

      <h3 style={s.h3}>4. PAN inoperative because it is not linked to Aadhaar</h3>
      <p style={s.p}>
        If your PAN became inoperative for not being linked with Aadhaar, refunds are withheld, and no interest is paid for
        the period it stays inoperative. Link PAN and Aadhaar (a fee applies after the deadline) and the refund is released
        once the PAN is operative again.
      </p>

      <h3 style={s.h3}>5. Mismatch with AIS or Form 26AS</h3>
      <p style={s.p}>
        If the TDS or income you reported doesn&apos;t match your AIS or Form 26AS, CPC may propose an adjustment under Section
        143(1)(a) and wait for your response. Respond on the portal under Pending Actions → e-Proceedings within the time
        allowed. If you made a mistake, file a revised return. Our{' '}
        <Link to="/form-16-analyzer" style={s.link}>Form 16 Analyzer</Link> helps you reconcile Form 16 with what the employer
        reported.
      </p>

      <h3 style={s.h3}>6. Refund adjusted against an old demand (Section 245)</h3>
      <p style={s.p}>
        If the department shows an outstanding demand from an earlier year, it sends an intimation under Section 245 proposing
        to adjust your refund against it. Respond within 30 days under Pending Actions → Response to Outstanding Demand. If the
        demand is wrong (for example, TDS was not credited), disagree and upload proof.
      </p>

      <h3 style={s.h3}>7. Defective return notice (Section 139(9))</h3>
      <p style={s.p}>
        If your return has an inconsistency — such as claiming TDS without showing the matching income — CPC treats it as
        defective and the refund stops. You must respond within 15 days of the notice by filing a corrected return,
        otherwise the return can be treated as invalid.
      </p>

      <h3 style={s.h3}>8. Large refund under manual review</h3>
      <p style={s.p}>
        Unusually large refunds, especially from big deductions or losses, may be held for review. Keep proofs for every
        deduction you claimed. If you get a query, respond promptly with documents.
      </p>

      <h2 style={s.h2}>Status Messages Decoded</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Status</th>
            <th style={s.th}>What to do</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Pending for e-verification</td><td style={s.td}>E-verify immediately (reason 1)</td></tr>
          <tr><td style={s.td}>Successfully e-verified</td><td style={s.td}>Wait; processing has not started yet</td></tr>
          <tr><td style={s.td}>Processed with refund due</td><td style={s.td}>Check bank validation; credit usually follows within days</td></tr>
          <tr><td style={s.td}>Refund failed</td><td style={s.td}>Fix bank details or name, then raise a refund reissue request</td></tr>
          <tr><td style={s.td}>Refund adjusted</td><td style={s.td}>Check the Section 245 intimation and respond if you disagree</td></tr>
          <tr><td style={s.td}>Defective</td><td style={s.td}>File a corrected return within 15 days</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Do You Get Interest on a Late Refund?</h2>
      <p style={s.p}>
        Yes. Section 244A pays simple interest of 0.5% per month on the refund. If you filed on time, it usually runs from
        1 April of the assessment year to the date the refund is granted; if you filed late, it runs from the date of filing.
        Interest is not paid for delays you caused, and the interest itself is taxable as &quot;income from other sources&quot; in
        the year you receive it.
      </p>

      <h2 style={s.h2}>How to Get Your Refund Faster Next Year</h2>
      <ul style={s.ul}>
        <li>Pre-validate your bank account and keep PAN linked with Aadhaar before filing.</li>
        <li>Download AIS and Form 26AS and match every TDS entry before you file.</li>
        <li>File early — returns filed in June and early July are usually processed fastest.</li>
        <li>E-verify the same day with Aadhaar OTP.</li>
        <li>Better still, reduce the refund: submit investment proofs to your employer so less TDS is deducted. Plan it with the{' '}
          <Link to="/tds-calculator" style={s.link}>TDS Calculator</Link> and <Link to="/80c-planner" style={s.link}>80C Planner</Link>.</li>
      </ul>
      <p style={s.p}>
        Missed the filing deadline altogether? You can still claim a refund through a belated return — see{' '}
        <Link to="/blog/belated-itr-filing-after-due-date-2026" style={s.link}>how to file a belated ITR by 31 December 2026</Link>.
        For a full walkthrough of filing, read <Link to="/blog/how-to-file-itr-online-free" style={s.link}>how to file ITR online
        free</Link>.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Know your refund before you file</div>
        Use the free <Link to="/refund-calculator" style={s.link}>Refund Calculator</Link> to see how much you should get back —
        no login needed.
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
