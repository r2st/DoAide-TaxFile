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
  { q: 'What is the last date to file a belated ITR for FY 2025-26?', a: 'A belated return for FY 2025-26 (AY 2026-27) can be filed up to December 31, 2026, or before the assessment is completed, whichever is earlier.' },
  { q: 'What is the penalty for filing ITR after the due date?', a: 'A late fee of ₹5,000 under Section 234F, reduced to ₹1,000 if total income is up to ₹5 lakh. Interest under Section 234A at 1% per month also applies on any unpaid tax. If total income is below the basic exemption limit, no late fee applies.' },
  { q: 'Can I choose the old tax regime in a belated return?', a: 'Generally no. The option to move out of the default new regime has to be exercised in a return filed by the original due date, so a belated return is normally computed under the new regime.' },
  { q: 'Can I get a refund if I file a belated return?', a: 'Yes. Refunds are allowed in a belated return, though interest on the refund is reduced because it is calculated only from the date of filing.' },
  { q: 'What if I miss the December 31 deadline too?', a: 'You may file an updated return (ITR-U) within 48 months from the end of the assessment year by paying additional tax of 25% to 70% of the tax and interest due. ITR-U cannot be used to claim a refund or reduce tax.' },
]

export default function BelatedITRFiling2026() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Missed the ITR Deadline? How to File a Belated Return by 31 December 2026 | DoAide TaxFile"
        description="Missed the ITR due date for FY 2025-26? How to file a belated return under Section 139(4) by December 31, 2026 — late fee, interest, regime rules, losses, refunds and ITR-U if you miss that too."
        keywords="belated ITR, belated return last date 2026, ITR after due date, Section 139(4), late filing fee 234F, file ITR after deadline, ITR-U"
        canonical="https://tax.doaide.com/blog/belated-itr-filing-after-due-date-2026"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Belated ITR Filing 2026' }]} />

      <h1 style={s.title}>Missed the ITR Deadline? How to File a Belated Return by 31 December 2026</h1>
      <p style={s.meta}>For FY 2025-26 (AY 2026-27) · Updated October 2026 · 8 min read</p>

      <p style={s.p}>
        Every year, lakhs of taxpayers miss the July deadline — Form 16 arrived late, AIS figures did not match,
        or it simply slipped. If you have not yet filed your income tax return for FY 2025-26, you have not run out
        of time. You can still file a <strong>belated return</strong> until <strong>31 December 2026</strong>. It costs a
        late fee and comes with a few restrictions, but it keeps you compliant, lets you claim a refund and avoids
        a much costlier route later.
      </p>
      <p style={s.p}>
        This guide explains what a belated return is, what it costs, what you give up by filing late, and exactly how to
        file one on the income tax portal.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Work out what you owe first</div>
        Use our free <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to see your tax for FY
        2025-26, and the <Link to="/refund-calculator" style={s.link}>Refund Calculator</Link> to check whether TDS has
        already covered it.
      </div>

      <h2 style={s.h2}>What Is a Belated Return?</h2>
      <p style={s.p}>
        A belated return is an ITR filed after the original due date but within the time allowed by Section 139(4) of the
        Income-tax Act, 1961. For FY 2025-26 that window closes on <strong>31 December 2026</strong>, or earlier if the
        Assessing Officer completes your assessment before then. You file it with the same ITR form you would have used
        on time — you just select &quot;139(4) — Belated&quot; as the filing section.
      </p>
      <p style={s.p}>
        Not sure which form applies? The <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> tells you in
        under two minutes, and our <Link to="/blog/itr-form-guide-2026-27" style={s.link}>ITR form guide</Link> explains each
        form in detail.
      </p>

      <h2 style={s.h2}>What Filing Late Costs You</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Consequence</th>
            <th style={s.th}>What it means</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Late fee (Sec 234F)</td><td style={s.td}>₹5,000; ₹1,000 if total income is up to ₹5 lakh; nil if income is below the basic exemption limit</td></tr>
          <tr><td style={s.td}>Interest (Sec 234A)</td><td style={s.td}>1% per month on unpaid tax from the due date until you file</td></tr>
          <tr><td style={s.td}>Advance tax interest (234B/234C)</td><td style={s.td}>Applies if you had to pay advance tax and didn&apos;t</td></tr>
          <tr><td style={s.td}>Losses</td><td style={s.td}>Business and capital losses cannot be carried forward (house property loss can)</td></tr>
          <tr><td style={s.td}>Tax regime</td><td style={s.td}>Usually locked into the new regime (see below)</td></tr>
          <tr><td style={s.td}>Refund interest</td><td style={s.td}>Reduced, as it runs only from the date you file</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        For a salaried person whose TDS covers the full tax, the real cost is usually just the ₹1,000 or ₹5,000 fee. For
        someone with unpaid tax on interest, capital gains or freelance income, the monthly interest adds up, so file as
        early as you can rather than waiting for December.
      </p>

      <h2 style={s.h2}>The Regime Trap: Why a Belated Return Usually Means the New Regime</h2>
      <p style={s.p}>
        The new tax regime is the default. If you want the old regime — for example, to claim HRA, Section 80C or home loan
        interest — the option has to be exercised in a return filed by the original due date (or, for business income,
        through Form 10-IEA filed on time). A belated return therefore normally has to be computed under the new regime.
      </p>
      <p style={s.p}>
        For most people with income up to about ₹12.75 lakh this costs nothing, because the new regime already gives zero
        tax on that salary. But if you had large deductions, the difference can be significant. Compare both with the{' '}
        <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Calculator</Link> so you know the actual impact, and
        read our <Link to="/blog/new-vs-old-regime-comparison-2026" style={s.link}>regime comparison guide</Link>.
      </p>

      <h2 style={s.h2}>How to File a Belated Return: Step by Step</h2>
      <h3 style={s.h3}>1. Gather your documents</h3>
      <ul style={s.ul}>
        <li>Form 16 from your employer and Form 16A for other TDS</li>
        <li>Annual Information Statement (AIS) and Form 26AS from the portal</li>
        <li>Bank interest certificates and capital gains statements</li>
        <li>Rent receipts or investment proofs if relevant (they matter only under the old regime)</li>
      </ul>
      <p style={s.p}>
        Our <Link to="/form-16-analyzer" style={s.link}>Form 16 Analyzer</Link> helps you read Form 16 and spot figures that
        don&apos;t match your AIS.
      </p>

      <h3 style={s.h3}>2. Pay any tax due</h3>
      <p style={s.p}>
        Calculate the tax, 234A/234B/234C interest and the 234F late fee, then pay through <strong>e-Pay Tax</strong> on the
        portal using Challan 280 as self-assessment tax. Keep the challan reference; you will enter it in the return.
      </p>

      <h3 style={s.h3}>3. File the return</h3>
      <ul style={s.ul}>
        <li>Log in at incometax.gov.in → e-File → Income Tax Returns → File Income Tax Return</li>
        <li>Select Assessment Year 2026-27 and the mode (online)</li>
        <li>Choose your status and ITR form</li>
        <li>Select <strong>139(4) — Belated</strong> as the filing section</li>
        <li>Check the pre-filled data against AIS, add missing income, and enter the challan details</li>
        <li>Preview, validate and submit</li>
      </ul>

      <h3 style={s.h3}>4. E-verify within 30 days</h3>
      <p style={s.p}>
        A return is not complete until it is verified. Use Aadhaar OTP, net banking or a pre-validated bank account. If you
        miss the 30-day window, the date of verification is treated as the date of filing, which can push you past the
        deadline.
      </p>

      <h2 style={s.h2}>What If You Miss 31 December Too?</h2>
      <p style={s.p}>
        After the belated deadline, the only voluntary option is an <strong>updated return (ITR-U)</strong>. It can be filed up
        to 48 months from the end of the assessment year, but you pay an additional tax of 25% to 70% of the tax and interest
        due, depending on how late you are. ITR-U cannot be used to claim a refund, declare a loss or reduce tax. If you
        have a refund due, the belated return before 31 December is your last chance to claim it without asking the
        department to condone the delay.
      </p>

      <h2 style={s.h2}>Belated vs Revised vs Updated Return</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Return</th>
            <th style={s.th}>When to use</th>
            <th style={s.th}>Section</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Belated</td><td style={s.td}>You didn&apos;t file by the due date</td><td style={s.td}>139(4)</td></tr>
          <tr><td style={s.td}>Revised</td><td style={s.td}>You filed but made a mistake</td><td style={s.td}>139(5)</td></tr>
          <tr><td style={s.td}>Updated (ITR-U)</td><td style={s.td}>Missed both windows, or need to report extra income later</td><td style={s.td}>139(8A)</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        A belated return can itself be revised later if you spot an error. Check the current revision deadline on the
        e-filing portal, as the Finance Act 2026 changed the time allowed for revisions.
      </p>

      <h2 style={s.h2}>Avoid This Next Year</h2>
      <p style={s.p}>
        The due date for FY 2026-27 returns is 31 July 2027 for most individuals. See every date in our{' '}
        <Link to="/blog/itr-filing-deadlines-2027" style={s.link}>ITR deadlines guide</Link>, decide your regime early with the{' '}
        <Link to="/tools/regime-comparison" style={s.link}>regime comparison tool</Link>, and pay advance tax on time with the{' '}
        <Link to="/advance-tax-calculator" style={s.link}>Advance Tax Calculator</Link>. First-time filers can follow our{' '}
        <Link to="/blog/first-time-itr-filing-guide" style={s.link}>beginner&apos;s guide</Link>.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>File before 31 December 2026</div>
        Every month you wait adds 1% interest on unpaid tax. Calculate your tax now with the free{' '}
        <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — no login needed.
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
