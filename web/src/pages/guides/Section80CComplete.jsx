import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import ShareButtons from '../../components/ShareButtons'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 24, marginTop: 40, marginBottom: 12, color: 'var(--doaide-text)' },
  h3: { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 8, color: 'var(--doaide-text)' },
  p: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  tdMono: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  example: {
    padding: 20, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    marginBottom: 24, fontSize: 14, lineHeight: 1.8, fontFamily: 'var(--doaide-font-mono)',
    color: 'var(--doaide-text-secondary)', overflowX: 'auto',
  },
  exampleTitle: { fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 12, fontFamily: 'var(--doaide-font-display)', fontSize: 16 },
  ul: { paddingLeft: 24, marginBottom: 16, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', fontSize: 15 },
  ol: { paddingLeft: 24, marginBottom: 16, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', fontSize: 15 },
  badge: { display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, marginLeft: 8 },
}

const FAQS = [
  { q: 'What is the complete list of Section 80C deductions?', a: 'Section 80C covers: PPF, ELSS, NSC, 5-year tax-saver FD, SCSS (Senior Citizens Savings Scheme), SSY (Sukanya Samriddhi Yojana), EPF/VPF, LIC premiums, ULIP, home loan principal repayment, tuition fees (max 2 children), stamp duty & registration charges, infrastructure bonds, and post office time deposits (5 years). The total limit is ₹1,50,000.' },
  { q: 'What is the difference between 80C, 80CCC, and 80CCD?', a: '80C covers investments (PPF, ELSS, etc.), 80CCC covers pension fund contributions (LIC pension plans), and 80CCD covers NPS contributions. The combined limit of 80C + 80CCC + 80CCD(1) is ₹1.5 lakh. 80CCD(1B) gives an additional ₹50,000 for NPS, and 80CCD(2) allows employer NPS contribution (up to 14% of basic for govt, 10% for others) with no upper limit.' },
  { q: 'Can I claim 80C deduction for stamp duty on property purchase?', a: 'Yes, stamp duty and registration charges paid for purchase of a residential property qualify under Section 80C, up to the ₹1.5 lakh limit. This is a one-time deduction available in the year of purchase, along with your other 80C investments.' },
  { q: 'Do life insurance premiums qualify under 80C?', a: 'Yes, life insurance premiums qualify under 80C, but the premium must not exceed 10% of the sum assured (for policies issued after April 1, 2012). For policies issued before that, the limit is 20% of sum assured. If the premium exceeds this threshold, no deduction is allowed for that policy.' },
  { q: 'Can both husband and wife claim 80C deductions?', a: 'Yes, each individual has their own ₹1.5 lakh limit under 80C. A couple can claim up to ₹3 lakh combined. Each person claims deduction on investments in their own name — PPF/ELSS in each person\'s name, tuition fees paid by either parent, etc.' },
  { q: 'What if my EPF already exhausts the 80C limit?', a: 'If your EPF contribution (12% of basic) already exceeds ₹1.5 lakh, you have fully utilized 80C automatically. No additional investment in PPF/ELSS will give you extra 80C benefit. However, NPS under 80CCD(1B) is separate — you still get an additional ₹50,000 deduction.' },
]

export default function Section80CComplete() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80C Deductions Complete List 2026 — Every Investment Explained | DoAide TaxFile"
        description="Complete list of all Section 80C deductions for FY 2026-27 with limits, eligibility, lock-in periods, and tax-saving examples. PPF, ELSS, EPF, NPS, SSY, SCSS, and more."
        keywords="section 80C deductions complete list 2026, 80C tax saving investments, all 80C deductions, 80C deduction limit, 80C investments list India"
        canonical="https://tax.doaide.com/guides/section-80c-complete-list"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: '80C Complete List 2026' }]} />

      <h1 style={s.title}>Section 80C Deductions — Complete List for FY 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) • 18 min read</p>

      <p style={s.p}>
        Section 80C is the most widely used tax-saving section in the Income Tax Act. It allows a maximum deduction
        of ₹1,50,000 per financial year on specified investments and expenses. This guide lists <strong>every single
        eligible instrument</strong> under Sections 80C, 80CCC, and 80CCD — including many that taxpayers often miss.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Track Your 80C Investments</div>
        Use our <Link to="/80c-planner" style={s.link}>80C Investment Planner</Link> to see how much of your ₹1.5L
        limit you have used and what remains. Compare instruments with <Link to="/elss-vs-ppf-vs-fd" style={s.link}>ELSS vs PPF vs FD</Link>.
      </div>

      <h2 style={s.h2}>Complete Master List — All 80C Eligible Instruments</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>#</th>
              <th style={s.th}>Instrument</th>
              <th style={s.th}>Returns</th>
              <th style={s.th}>Lock-in</th>
              <th style={s.th}>Risk</th>
              <th style={s.th}>Individual Limit</th>
              <th style={s.th}>Tax on Returns</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>1</td><td style={s.td}>EPF (Employee Provident Fund)</td><td style={s.tdMono}>8.25%</td><td style={s.td}>Till retirement</td><td style={s.td}>Nil</td><td style={s.td}>12% of basic</td><td style={s.td}>Tax-free*</td></tr>
            <tr><td style={s.td}>2</td><td style={s.td}>VPF (Voluntary Provident Fund)</td><td style={s.tdMono}>8.25%</td><td style={s.td}>Till retirement</td><td style={s.td}>Nil</td><td style={s.td}>No limit</td><td style={s.td}>Tax-free*</td></tr>
            <tr><td style={s.td}>3</td><td style={s.td}>PPF</td><td style={s.tdMono}>7.1%</td><td style={s.td}>15 years</td><td style={s.td}>Nil</td><td style={s.tdMono}>₹1.5L/yr</td><td style={s.td}>Tax-free (EEE)</td></tr>
            <tr><td style={s.td}>4</td><td style={s.td}>ELSS Mutual Funds</td><td style={s.tdMono}>~12%</td><td style={s.td}>3 years</td><td style={s.td}>High</td><td style={s.td}>No limit</td><td style={s.td}>12.5% LTCG above ₹1.25L</td></tr>
            <tr><td style={s.td}>5</td><td style={s.td}>NSC (National Savings Certificate)</td><td style={s.tdMono}>7.7%</td><td style={s.td}>5 years</td><td style={s.td}>Nil</td><td style={s.td}>No limit</td><td style={s.td}>Interest at slab</td></tr>
            <tr><td style={s.td}>6</td><td style={s.td}>Tax-Saver FD (5 year)</td><td style={s.tdMono}>6.5-7.5%</td><td style={s.td}>5 years</td><td style={s.td}>Nil</td><td style={s.td}>No limit</td><td style={s.td}>Interest at slab</td></tr>
            <tr><td style={s.td}>7</td><td style={s.td}>SCSS (Senior Citizens Savings Scheme)</td><td style={s.tdMono}>8.2%</td><td style={s.td}>5 years</td><td style={s.td}>Nil</td><td style={s.tdMono}>₹30L</td><td style={s.td}>Interest at slab</td></tr>
            <tr><td style={s.td}>8</td><td style={s.td}>SSY (Sukanya Samriddhi Yojana)</td><td style={s.tdMono}>8.2%</td><td style={s.td}>21 years</td><td style={s.td}>Nil</td><td style={s.tdMono}>₹2.5L/yr</td><td style={s.td}>Tax-free (EEE)</td></tr>
            <tr><td style={s.td}>9</td><td style={s.td}>Life Insurance Premium (LIC etc.)</td><td style={s.tdMono}>~5-6%</td><td style={s.td}>Policy term</td><td style={s.td}>Nil</td><td style={s.td}>10% of SA</td><td style={s.td}>Conditional*</td></tr>
            <tr><td style={s.td}>10</td><td style={s.td}>ULIP</td><td style={s.tdMono}>~8-12%</td><td style={s.td}>5 years</td><td style={s.td}>High</td><td style={s.td}>No limit</td><td style={s.td}>Conditional*</td></tr>
            <tr><td style={s.td}>11</td><td style={s.td}>Home Loan Principal Repayment</td><td style={s.tdMono}>N/A</td><td style={s.td}>Loan tenure</td><td style={s.td}>N/A</td><td style={s.tdMono}>₹1.5L</td><td style={s.td}>N/A</td></tr>
            <tr><td style={s.td}>12</td><td style={s.td}>Stamp Duty &amp; Registration</td><td style={s.tdMono}>N/A</td><td style={s.td}>One-time</td><td style={s.td}>N/A</td><td style={s.td}>Actual</td><td style={s.td}>N/A</td></tr>
            <tr><td style={s.td}>13</td><td style={s.td}>Tuition Fees (2 children)</td><td style={s.tdMono}>N/A</td><td style={s.td}>N/A</td><td style={s.td}>N/A</td><td style={s.td}>Actual</td><td style={s.td}>N/A</td></tr>
            <tr><td style={s.td}>14</td><td style={s.td}>Post Office 5-Year TD</td><td style={s.tdMono}>7.5%</td><td style={s.td}>5 years</td><td style={s.td}>Nil</td><td style={s.td}>No limit</td><td style={s.td}>Interest at slab</td></tr>
          </tbody>
        </table>
      </div>

      <p style={s.p}>
        <em>*EPF/VPF interest on contributions above ₹2.5L/year is taxable. LIC/ULIP maturity is tax-free if premium ≤ 10% of sum assured.</em>
      </p>

      <h2 style={s.h2}>Beyond 80C: Additional Deduction Sections</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Section</th>
              <th style={s.th}>Deduction For</th>
              <th style={s.th}>Limit</th>
              <th style={s.th}>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>80CCD(1B)</td><td style={s.td}>NPS self-contribution</td><td style={s.tdMono}>₹50,000</td><td style={s.td}>Over and above 80C limit</td></tr>
            <tr><td style={s.td}>80CCD(2)</td><td style={s.td}>NPS employer contribution</td><td style={s.td}>14% (govt) / 10% (pvt) of basic</td><td style={s.td}>No upper cap; available in new regime too</td></tr>
            <tr><td style={s.td}>80D</td><td style={s.td}>Health insurance</td><td style={s.tdMono}>₹25K-₹1L</td><td style={s.td}>Self + family + parents</td></tr>
            <tr><td style={s.td}>80E</td><td style={s.td}>Education loan interest</td><td style={s.td}>No limit</td><td style={s.td}>For 8 years from start of repayment</td></tr>
            <tr><td style={s.td}>80G</td><td style={s.td}>Donations</td><td style={s.td}>50-100%</td><td style={s.td}>To specified funds/institutions</td></tr>
            <tr><td style={s.td}>80EEA</td><td style={s.td}>Home loan interest (first buyer)</td><td style={s.tdMono}>₹1.5L</td><td style={s.td}>Property value ≤ ₹45L</td></tr>
            <tr><td style={s.td}>80TTA</td><td style={s.td}>Savings account interest</td><td style={s.tdMono}>₹10,000</td><td style={s.td}>Non-senior citizens</td></tr>
            <tr><td style={s.td}>80TTB</td><td style={s.td}>Bank interest (seniors)</td><td style={s.tdMono}>₹50,000</td><td style={s.td}>Senior citizens only</td></tr>
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>Worked Example: Maximizing Tax Savings</h2>
      <div style={s.example}>
        <div style={s.exampleTitle}>Ravi, 32, CTC ₹15 LPA, 30% tax bracket</div>
        Basic: ₹6,00,000 | EPF: ₹72,000/yr (auto-deducted)<br /><br />
        <strong>Section 80C (₹1.5L limit):</strong><br />
        EPF employee contribution: ₹72,000<br />
        PPF: ₹28,000<br />
        ELSS (SIP ₹4,166/mo): ₹50,000<br />
        80C total = ₹1,50,000 ✓<br /><br />
        <strong>Section 80CCD(1B):</strong><br />
        NPS self-contribution: ₹50,000<br /><br />
        <strong>Section 80D:</strong><br />
        Self + family health insurance: ₹25,000<br />
        Parents (senior) health insurance: ₹50,000<br />
        80D total = ₹75,000<br /><br />
        <strong>Total deductions = ₹1,50,000 + ₹50,000 + ₹75,000 = ₹2,75,000</strong><br />
        <strong>Tax saving at 31.2% = ₹85,800/year</strong>
      </div>

      <h2 style={s.h2}>Commonly Missed 80C Deductions</h2>
      <ol style={s.ol}>
        <li><strong>Stamp duty &amp; registration charges</strong> — Paid only once when buying property, but many forget to claim it</li>
        <li><strong>Tuition fees</strong> — School/college fees for up to 2 children (not coaching or donation)</li>
        <li><strong>Home loan principal</strong> — Often overlooked when EPF doesn't fully cover 80C</li>
        <li><strong>VPF</strong> — Voluntary PF gets the same 8.25% rate as EPF, with 80C benefit</li>
        <li><strong>Infrastructure bonds</strong> — Some issue notifications qualifying under 80C</li>
      </ol>

      <h2 style={s.h2}>80C in Old Regime vs New Regime</h2>
      <p style={s.p}>
        Section 80C deductions are <strong>not available</strong> under the new tax regime (default from FY 2024-25).
        The new regime offers lower slab rates but removes most deductions. Whether old or new regime is better depends
        on your total deductions.
      </p>
      <p style={s.p}>
        <strong>Rule of thumb:</strong> If your total deductions (80C + 80D + HRA + home loan interest + NPS) exceed ₹3.75 lakh,
        the old regime likely saves you more. Below that, the new regime wins.
      </p>
      <p style={s.p}>
        <Link to="/income-tax-calculator" style={s.link}>→ Compare old vs new regime with your actual numbers</Link>
      </p>

      <h2 style={s.h2}>Last-Minute 80C Investments (March Rush)</h2>
      <p style={s.p}>
        If it's near March 31 and you haven't invested:
      </p>
      <ol style={s.ol}>
        <li><strong>ELSS via SIP or lumpsum</strong> — Instant, online, lowest lock-in (3 years)</li>
        <li><strong>PPF deposit</strong> — Online via net banking, deposit before March 31</li>
        <li><strong>Tax-saver FD</strong> — Available at any bank, instant processing</li>
        <li><strong>NPS (80CCD 1B)</strong> — Additional ₹50K, can be done online</li>
      </ol>

      <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <ShareButtons text="Section 80C Complete List 2026 — Every tax-saving deduction with limits and examples\n\ntax.doaide.com/guides/section-80c-complete-list" />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
