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
  { q: 'Is ₹12 lakh income tax-free in the new regime for FY 2026-27?', a: 'Yes. Taxable income up to ₹12 lakh gets a rebate of up to ₹60,000, which cancels the tax completely. Salaried people also get a ₹75,000 standard deduction, so a salary up to ₹12.75 lakh is tax-free.' },
  { q: 'What is marginal relief at ₹12 lakh?', a: 'If taxable income is slightly above ₹12 lakh, marginal relief caps your tax (before cess) at the amount by which your income exceeds ₹12 lakh, so earning ₹1 more never costs you more than ₹1 in tax.' },
  { q: 'Up to what income does marginal relief apply?', a: 'In the new regime it helps until taxable income reaches about ₹12.71 lakh. Above that the normal slab tax is lower than the excess income, so no relief is needed.' },
  { q: 'Does the ₹12 lakh rebate apply to capital gains?', a: 'No. The rebate applies only to tax on income taxed at slab rates. Tax on income at special rates, such as equity capital gains under Sections 111A and 112A, is not covered.' },
  { q: 'Is marginal relief available in the old regime?', a: 'The old regime rebate works differently: income up to ₹5 lakh gets a rebate of up to ₹12,500, and there is no marginal relief for income just above ₹5 lakh.' },
]

export default function MarginalRelief12Lakh() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Income Just Above ₹12 Lakh? How Marginal Relief Works in the New Tax Regime 2026-27 | DoAide TaxFile"
        description="How the ₹60,000 rebate and marginal relief work for income just above ₹12 lakh in the new tax regime for FY 2026-27 — slab-by-slab calculation, worked examples for ₹12.1L to ₹13.5L salary, and what is not covered."
        keywords="marginal relief 12 lakh, income tax 12 lakh new regime, 87A rebate 2026-27, 12.75 lakh salary tax, tax on 13 lakh salary, new regime slabs FY 2026-27"
        canonical="https://tax.doaide.com/blog/marginal-relief-income-above-12-lakh-new-regime"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'Blog', path: '/blog' }, { label: 'Marginal Relief Above ₹12 Lakh' }]} />

      <h1 style={s.title}>Income Just Above ₹12 Lakh? How Marginal Relief Works in the New Tax Regime</h1>
      <p style={s.meta}>For FY 2026-27 · Updated October 2026 · 7 min read</p>

      <p style={s.p}>
        Under the new tax regime, taxable income up to ₹12 lakh pays zero income tax. A natural worry follows: what happens
        if your income is ₹12.2 lakh? Does crossing the line by ₹20,000 suddenly cost you ₹60,000 in tax? It doesn&apos;t —
        thanks to <strong>marginal relief</strong>. This guide explains how the rebate and marginal relief work together, with
        worked examples you can check against your own salary.
      </p>
      <p style={s.p}>
        For the full slab structure under both regimes, see our{' '}
        <Link to="/blog/income-tax-slabs-2026-27" style={s.link}>income tax slabs 2026-27 guide</Link>.
      </p>

      <h2 style={s.h2}>New Regime Slabs for FY 2026-27</h2>
      <p style={s.p}>Budget 2026 kept the new regime slabs unchanged from the previous year:</p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Taxable income</th>
            <th style={s.th}>Rate</th>
            <th style={s.th}>Tax on the full slab</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Up to ₹4 lakh</td><td style={s.td}>Nil</td><td style={s.td}>₹0</td></tr>
          <tr><td style={s.td}>₹4–8 lakh</td><td style={s.td}>5%</td><td style={s.td}>₹20,000</td></tr>
          <tr><td style={s.td}>₹8–12 lakh</td><td style={s.td}>10%</td><td style={s.td}>₹40,000</td></tr>
          <tr><td style={s.td}>₹12–16 lakh</td><td style={s.td}>15%</td><td style={s.td}>₹60,000</td></tr>
          <tr><td style={s.td}>₹16–20 lakh</td><td style={s.td}>20%</td><td style={s.td}>₹80,000</td></tr>
          <tr><td style={s.td}>₹20–24 lakh</td><td style={s.td}>25%</td><td style={s.td}>₹1,00,000</td></tr>
          <tr><td style={s.td}>Above ₹24 lakh</td><td style={s.td}>30%</td><td style={s.td}>—</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        At exactly ₹12 lakh, slab tax is ₹20,000 + ₹40,000 = ₹60,000. The rebate (up to ₹60,000 for resident individuals
        with taxable income up to ₹12 lakh) wipes it out entirely, so you pay nothing — not even cess.
      </p>

      <h2 style={s.h2}>The Cliff Problem</h2>
      <p style={s.p}>
        The rebate has an eligibility ceiling, not a taper. At ₹12,00,001 of taxable income you are no longer eligible, and
        slab tax would be about ₹60,000. Without any relief, earning one extra rupee would cost ₹60,000 in tax — clearly
        unfair, and the law recognises it.
      </p>

      <h2 style={s.h2}>How Marginal Relief Fixes It</h2>
      <p style={s.p}>
        Marginal relief says: if your taxable income exceeds ₹12 lakh, your tax (before the 4% health and education cess)
        cannot be more than the amount by which your income exceeds ₹12 lakh. In formula terms:
      </p>
      <div style={s.callout}>
        <div style={s.calloutTitle}>Tax payable before cess</div>
        The lower of (a) normal slab tax, and (b) taxable income minus ₹12,00,000.
      </div>
      <p style={s.p}>
        Slab tax just above ₹12 lakh is ₹60,000 plus 15% of the excess. Marginal relief stops mattering once 15% of the
        excess plus ₹60,000 is less than the excess itself — at roughly <strong>₹70,588 above ₹12 lakh</strong>, i.e. a
        taxable income of about ₹12.71 lakh. For salaried people with the ₹75,000 standard deduction, that is a gross
        salary of roughly ₹13.46 lakh.
      </p>

      <h2 style={s.h2}>Worked Examples for Salaried Employees</h2>
      <p style={s.p}>
        Each example assumes salary income only, the ₹75,000 standard deduction and no other deductions (the new regime
        allows few). Cess is 4% of tax after relief.
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Gross salary</th>
            <th style={s.th}>Taxable income</th>
            <th style={s.th}>Slab tax</th>
            <th style={s.th}>After relief</th>
            <th style={s.th}>Total with cess</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>₹12,75,000</td><td style={s.td}>₹12,00,000</td><td style={s.td}>₹60,000</td><td style={s.td}>₹0 (rebate)</td><td style={s.td}>₹0</td></tr>
          <tr><td style={s.td}>₹12,85,000</td><td style={s.td}>₹12,10,000</td><td style={s.td}>₹61,500</td><td style={s.td}>₹10,000</td><td style={s.td}>₹10,400</td></tr>
          <tr><td style={s.td}>₹13,00,000</td><td style={s.td}>₹12,25,000</td><td style={s.td}>₹63,750</td><td style={s.td}>₹25,000</td><td style={s.td}>₹26,000</td></tr>
          <tr><td style={s.td}>₹13,25,000</td><td style={s.td}>₹12,50,000</td><td style={s.td}>₹67,500</td><td style={s.td}>₹50,000</td><td style={s.td}>₹52,000</td></tr>
          <tr><td style={s.td}>₹13,50,000</td><td style={s.td}>₹12,75,000</td><td style={s.td}>₹71,250</td><td style={s.td}>₹71,250 (no relief)</td><td style={s.td}>₹74,100</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        Take the ₹13 lakh salary. Taxable income is ₹12.25 lakh. Slab tax is ₹20,000 + ₹40,000 + 15% of ₹25,000 =
        ₹63,750. The excess over ₹12 lakh is only ₹25,000, so marginal relief caps tax at ₹25,000, and with cess you pay
        ₹26,000. Check your exact figure with the <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>,
        which applies marginal relief automatically.
      </p>

      <h2 style={s.h2}>What the Rebate and Relief Do Not Cover</h2>
      <ul style={s.ul}>
        <li>
          <strong>Special-rate income.</strong> Short-term equity gains (Section 111A) and long-term equity gains (Section 112A)
          are taxed at their own rates and are not covered by the rebate, even if your total income is under ₹12 lakh. Use the{' '}
          <Link to="/capital-gains-calculator" style={s.link}>Capital Gains Calculator</Link> for these.
        </li>
        <li><strong>Non-residents.</strong> The rebate is available only to resident individuals.</li>
        <li><strong>The old regime.</strong> Its rebate stops at ₹5 lakh of taxable income, with no marginal relief.</li>
      </ul>

      <h2 style={s.h2}>Can You Bring Income Back Under ₹12 Lakh?</h2>
      <p style={s.p}>
        If your taxable income is just over the line, a few legitimate moves still work in the new regime:
      </p>
      <ul style={s.ul}>
        <li>
          <strong>Employer NPS contribution (Section 80CCD(2)).</strong> Up to 14% of basic salary contributed by your employer is
          deductible in the new regime. Restructuring your salary to include it can pull taxable income below ₹12 lakh. Model
          it with the <Link to="/nps-calculator" style={s.link}>NPS Calculator</Link>.
        </li>
        <li>
          <strong>Check the old regime.</strong> If you have large HRA, home loan interest and 80C claims, the old regime might
          still win. Compare with the <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Calculator</Link>.
        </li>
        <li>
          <strong>Use your salary structure.</strong> Our <Link to="/salary-tax-optimizer" style={s.link}>Salary Tax Optimizer</Link>{' '}
          shows how components like employer NPS change your take-home pay.
        </li>
      </ul>

      <h2 style={s.h2}>Key Takeaways</h2>
      <ul style={s.ul}>
        <li>Taxable income up to ₹12 lakh (salary up to ₹12.75 lakh) pays zero tax in the new regime.</li>
        <li>Just above ₹12 lakh, your tax before cess never exceeds the income above ₹12 lakh.</li>
        <li>Marginal relief stops at about ₹12.71 lakh of taxable income (≈ ₹13.46 lakh salary).</li>
        <li>Special-rate capital gains are taxed separately and don&apos;t get the rebate.</li>
      </ul>

      <div style={s.callout}>
        <div style={s.calloutTitle}>See your exact tax in seconds</div>
        Enter your salary in the free <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> — rebate,
        marginal relief and cess are applied automatically. No login needed.
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
