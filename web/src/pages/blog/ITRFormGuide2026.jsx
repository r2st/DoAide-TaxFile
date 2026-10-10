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
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: { padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: 'var(--doaide-text-secondary)' },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
}

const FAQS = [
  { q: 'Which ITR form should a salaried person file?', a: 'Most salaried individuals with income from salary, one house property, and other sources (interest, dividends) should file ITR-1 (Sahaj). If your salary exceeds ₹50 lakh, or you have capital gains or multiple house properties, file ITR-2.' },
  { q: 'Can I file ITR-1 if I have capital gains from mutual funds?', a: 'No. If you have any capital gains — from equity, mutual funds, property, or other assets — you must file ITR-2 or ITR-3 (if you also have business income). ITR-1 does not support capital gains.' },
  { q: 'Which ITR form for freelancers and consultants?', a: 'Freelancers and consultants should file ITR-3 if they maintain books of accounts, or ITR-4 (Sugam) if they opt for presumptive taxation under Section 44ADA (for professionals with gross receipts up to ₹75 lakh).' },
  { q: 'What happens if I file the wrong ITR form?', a: 'Filing the wrong ITR form can lead to your return being treated as defective under Section 139(9). You will receive a notice from the Income Tax Department to file a revised return with the correct form within 15 days.' },
  { q: 'Is ITR-1 available for NRIs?', a: 'No. Non-Resident Indians (NRIs) cannot file ITR-1 or ITR-4. NRIs must file ITR-2 (no business income) or ITR-3 (with business/professional income).' },
]

const BLOG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'ITR Filing 2026-27: Which ITR Form Should You Choose?',
  description: 'Complete guide to choosing the right ITR form for FY 2026-27. ITR-1, ITR-2, ITR-3, ITR-4 — eligibility criteria, income limits, and a quick decision flowchart.',
  author: { '@type': 'Organization', name: 'DoAide TaxFile', url: 'https://tax.doaide.com' },
  publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
  datePublished: '2026-10-10',
  dateModified: '2026-10-10',
  url: 'https://tax.doaide.com/blog/itr-form-guide-2026-27',
  mainEntityOfPage: 'https://tax.doaide.com/blog/itr-form-guide-2026-27',
  image: 'https://tax.doaide.com/og-image.png',
}

export default function ITRFormGuide2026() {
  return (
    <div style={s.page}>
      <SEOHead
        title="ITR Filing 2026-27: Which ITR Form Should You Choose? | DoAide TaxFile"
        description="Complete guide to choosing the right ITR form for FY 2026-27 (AY 2027-28). Compare ITR-1, ITR-2, ITR-3, ITR-4 eligibility, income types, and find which form fits your profile."
        keywords="ITR form 2026-27, which ITR form to file, ITR-1 vs ITR-2, ITR form selector, income tax return form India"
        canonical="https://tax.doaide.com/blog/itr-form-guide-2026-27"
        jsonLd={BLOG_JSON_LD}
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'ITR Form Guide 2026-27' }]} />

      <h1 style={s.title}>ITR Filing 2026-27: Which ITR Form Should You Choose?</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) · October 2026 · 12 min read</p>

      <p style={s.p}>
        Filing your income tax return starts with one critical decision — choosing the correct ITR form. The Income Tax Department
        prescribes seven forms (ITR-1 through ITR-7), each designed for specific taxpayer categories and income types. Filing the
        wrong form leads to a defective return notice under Section 139(9), delays in processing, and potential penalties.
        This guide walks you through every form, eligibility criteria, and a simple decision framework so you file correctly
        the first time.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Quick Selector Tool</div>
        Not sure which form you need? Use our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> — answer 5 questions and get your form instantly.
      </div>

      <h2 style={s.h2}>ITR Forms at a Glance — FY 2026-27</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Form</th>
            <th style={s.th}>Who Should File</th>
            <th style={s.th}>Income Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}><strong>ITR-1 (Sahaj)</strong></td><td style={s.td}>Salaried individuals, one house property, other sources</td><td style={s.td}>Up to ₹50 lakh</td></tr>
          <tr><td style={s.td}><strong>ITR-2</strong></td><td style={s.td}>Individuals/HUF without business income but with capital gains, multiple properties, foreign assets</td><td style={s.td}>No limit</td></tr>
          <tr><td style={s.td}><strong>ITR-3</strong></td><td style={s.td}>Individuals/HUF with business or professional income</td><td style={s.td}>No limit</td></tr>
          <tr><td style={s.td}><strong>ITR-4 (Sugam)</strong></td><td style={s.td}>Presumptive income (44AD/44ADA/44AE)</td><td style={s.td}>Up to ₹50 lakh</td></tr>
          <tr><td style={s.td}><strong>ITR-5</strong></td><td style={s.td}>Partnerships, LLPs, AOPs, BOIs</td><td style={s.td}>No limit</td></tr>
          <tr><td style={s.td}><strong>ITR-6</strong></td><td style={s.td}>Companies (except Section 11 exemption)</td><td style={s.td}>No limit</td></tr>
          <tr><td style={s.td}><strong>ITR-7</strong></td><td style={s.td}>Trusts, political parties, institutions</td><td style={s.td}>No limit</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>ITR-1 (Sahaj) — The Most Common Form</h2>
      <p style={s.p}>
        ITR-1 is the simplest form and covers the majority of salaried taxpayers. You can file ITR-1 if all of these conditions are met:
      </p>
      <ul style={s.ul}>
        <li><strong>Total income</strong> does not exceed ₹50 lakh</li>
        <li>Income is from <strong>salary/pension</strong>, <strong>one house property</strong>, and <strong>other sources</strong> (interest, family pension, etc.)</li>
        <li>Agricultural income does not exceed ₹5,000</li>
        <li>You are a <strong>Resident Individual</strong> (not HUF, not NRI)</li>
        <li>You do NOT have capital gains, foreign assets, directorship in a company, or unlisted equity investments</li>
      </ul>
      <p style={s.p}>
        If you earn salary plus bank interest plus one rental income, and the total is under ₹50 lakh — ITR-1 is your form.
        Use our <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> to verify your total tax liability before filing.
      </p>

      <h2 style={s.h2}>ITR-2 — For Capital Gains and Multiple Properties</h2>
      <p style={s.p}>
        The moment you have capital gains from selling shares, mutual funds, or property, you move to ITR-2. This form is also
        required for:
      </p>
      <ul style={s.ul}>
        <li>Income from <strong>more than one house property</strong></li>
        <li><strong>Capital gains</strong> from equity, mutual funds, real estate, gold, or crypto</li>
        <li><strong>Foreign income</strong> or foreign assets (RNOR/NRI individuals)</li>
        <li>Income exceeding ₹50 lakh (even if from salary alone)</li>
        <li><strong>Directorship</strong> in a company or holding unlisted equity shares</li>
        <li>Agricultural income exceeding ₹5,000</li>
      </ul>
      <p style={s.p}>
        Sold mutual funds or redeemed ELSS this year? Calculate your tax with our <Link to="/capital-gains-calculator" style={s.link}>Capital Gains Calculator</Link> and
        file ITR-2.
      </p>

      <h2 style={s.h2}>ITR-3 — Business and Professional Income</h2>
      <p style={s.p}>
        ITR-3 is for individuals and HUFs who earn income from a business or profession and do NOT opt for presumptive taxation. This includes:
      </p>
      <ul style={s.ul}>
        <li>Self-employed professionals (doctors, lawyers, CAs, architects, consultants) maintaining books of accounts</li>
        <li>Freelancers with gross receipts above ₹75 lakh</li>
        <li>Business owners (sole proprietors) not opting for Section 44AD</li>
        <li>Partners in a firm who also have personal business income</li>
        <li>Anyone with both business income AND capital gains</li>
      </ul>
      <p style={s.p}>
        ITR-3 requires a full profit &amp; loss account and balance sheet. If your gross receipts are under the
        presumptive threshold, consider ITR-4 for a simpler filing experience.
      </p>

      <h2 style={s.h2}>ITR-4 (Sugam) — Presumptive Taxation</h2>
      <p style={s.p}>
        ITR-4 is the go-to form for small businesses and professionals opting for presumptive taxation under Sections 44AD, 44ADA, or 44AE.
        Eligibility requirements:
      </p>
      <ul style={s.ul}>
        <li><strong>Section 44AD</strong> — Businesses with turnover up to ₹3 crore (if digital receipts exceed 95%: ₹3 crore; otherwise ₹2 crore). Presumptive profit: 6% of digital turnover + 8% of cash turnover</li>
        <li><strong>Section 44ADA</strong> — Professionals with gross receipts up to ₹75 lakh. Presumptive profit: 50% of gross receipts</li>
        <li><strong>Section 44AE</strong> — Goods carriage owners with up to 10 vehicles</li>
        <li>Total income must not exceed ₹50 lakh</li>
        <li>No capital gains, no foreign assets, no more than one house property</li>
      </ul>
      <p style={s.p}>
        Read our <Link to="/blog/tax-planning-freelancers-india" style={s.link}>Freelancer Tax Planning Guide</Link> for
        detailed strategies on using presumptive taxation effectively.
      </p>

      <h2 style={s.h2}>Decision Flowchart — Find Your ITR Form in 4 Steps</h2>
      <div style={{ ...s.callout, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)' }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 2 }}>
          <strong>Step 1:</strong> Do you have business or professional income?<br />
          → Yes, with presumptive taxation → <strong>ITR-4</strong><br />
          → Yes, with full accounts → <strong>ITR-3</strong><br />
          → No → Continue to Step 2<br /><br />
          <strong>Step 2:</strong> Do you have capital gains, foreign assets, or multiple properties?<br />
          → Yes → <strong>ITR-2</strong><br />
          → No → Continue to Step 3<br /><br />
          <strong>Step 3:</strong> Is your total income above ₹50 lakh?<br />
          → Yes → <strong>ITR-2</strong><br />
          → No → Continue to Step 4<br /><br />
          <strong>Step 4:</strong> Are you a Resident Individual with salary + one property + other sources?<br />
          → Yes → <strong>ITR-1</strong><br />
          → No (HUF or NRI) → <strong>ITR-2</strong>
        </p>
      </div>
      <p style={s.p}>
        Skip the flowchart — our <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> asks you 5 simple questions and tells you the exact form to file.
      </p>

      <h2 style={s.h2}>Common Mistakes to Avoid</h2>
      <ul style={s.ul}>
        <li><strong>Filing ITR-1 with capital gains:</strong> Even ₹1 of LTCG from mutual fund redemption disqualifies ITR-1. Switch to ITR-2.</li>
        <li><strong>Ignoring unlisted shares:</strong> Holding ESOPs or startup equity? You need ITR-2, not ITR-1.</li>
        <li><strong>Freelancers filing ITR-1:</strong> If you receive professional income (even alongside salary), ITR-1 is not valid. Use ITR-3 or ITR-4.</li>
        <li><strong>Foreign income/assets omission:</strong> Holding US stocks, a foreign bank account, or RSUs from a foreign company? ITR-2 is mandatory, and Schedule FA (Foreign Assets) must be filled.</li>
        <li><strong>Wrong presumptive thresholds:</strong> The 44AD turnover limit depends on the share of digital receipts — verify before choosing ITR-4.</li>
      </ul>

      <h2 style={s.h2}>Documents Needed Before Filing</h2>
      <ul style={s.ul}>
        <li>Form 16 from employer (for salaried individuals)</li>
        <li>Form 26AS / AIS (Annual Information Statement) — download from the e-filing portal</li>
        <li>Bank statements (for interest income, TDS verification)</li>
        <li>Capital gains statements from brokers and mutual fund houses</li>
        <li>Rent receipts (if claiming HRA exemption under old regime)</li>
        <li>Investment proofs: PPF passbook, ELSS statements, LIC receipts, NPS contribution</li>
        <li>Home loan certificate (for Section 24 and 80EEA deductions)</li>
        <li>Health insurance premium receipts (Section 80D)</li>
      </ul>

      <h2 style={s.h2}>ITR Filing Deadlines for FY 2026-27</h2>
      <table style={s.table}>
        <thead><tr><th style={s.th}>Category</th><th style={s.th}>Deadline</th></tr></thead>
        <tbody>
          <tr><td style={s.td}>Salaried / Non-audit cases</td><td style={s.td}>July 31, 2027</td></tr>
          <tr><td style={s.td}>Businesses requiring audit</td><td style={s.td}>October 31, 2027</td></tr>
          <tr><td style={s.td}>Transfer pricing cases</td><td style={s.td}>November 30, 2027</td></tr>
          <tr><td style={s.td}>Belated / Revised return</td><td style={s.td}>December 31, 2027</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Late filing attracts a penalty of ₹5,000 (₹1,000 if income is below ₹5 lakh) under Section 234F,
        plus interest under Section 234A. Read our <Link to="/blog/itr-filing-deadlines-2027" style={s.link}>complete deadlines guide</Link>.
      </p>

      <FAQSection faqs={FAQS} />

      <div style={s.callout}>
        <div style={s.calloutTitle}>Free Tax Tools</div>
        <ul style={{ ...s.ul, marginBottom: 0 }}>
          <li><Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> — find your form in 30 seconds</li>
          <li><Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — compare old vs new regime</li>
          <li><Link to="/capital-gains-calculator" style={s.link}>Capital Gains Calculator</Link> — equity, mutual funds, property, crypto</li>
          <li><Link to="/hra-calculator" style={s.link}>HRA Calculator</Link> — calculate your HRA exemption</li>
          <li><Link to="/80c-planner" style={s.link}>Section 80C Planner</Link> — optimize tax-saving investments</li>
        </ul>
      </div>
    </div>
  )
}
