import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import Breadcrumb from '../../components/Breadcrumb'
import FAQSection from '../../components/FAQSection'
import { ITR_FORMS } from '../../lib/itrForms'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  p: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16 },
  card: {
    display: 'block', padding: 20, border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-lg)',
    marginBottom: 12, textDecoration: 'none', color: 'inherit', background: 'var(--doaide-surface)',
  },
  cardTitle: { fontSize: 18, fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.6 },
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14, display: 'block', overflowX: 'auto' },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)', whiteSpace: 'nowrap' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
}

const FAQS = [
  { q: 'Which ITR form should a salaried person use?', a: 'ITR-1 (Sahaj) if total income is up to ₹50 lakh with one house property and no significant capital gains. Capital gains, two properties, foreign assets or income above ₹50 lakh move you to ITR-2.' },
  { q: 'What happens if I file the wrong ITR form?', a: 'The return can be treated as defective under Section 139(9). You get a notice with 15 days to correct it; if ignored, the return is treated as not filed — with late fees and loss of carry-forwards.' },
  { q: 'Which ITR form do freelancers use?', a: 'ITR-4 if opting for presumptive taxation under 44ADA with receipts up to the limit, otherwise ITR-3 with books of account and actual expenses.' },
  { q: 'Can the ITR form change from year to year?', a: 'Yes. The form depends on that year\'s income sources. Selling shares one year may require ITR-2; back to only salary next year means ITR-1 again.' },
]

export default function ITRFormsIndex() {
  return (
    <div style={s.page}>
      <SEOHead
        title="ITR Forms Explained — ITR-1 to ITR-7: Which Form Applies to You? | DoAide TaxFile"
        description="Every ITR form explained for FY 2025-26 (AY 2026-27): who can file ITR-1, ITR-2, ITR-3, ITR-4, ITR-5, ITR-6 and ITR-7, who cannot, due dates and documents needed."
        keywords="ITR forms, ITR 1 vs ITR 2, which ITR form to file, ITR form types, ITR-3 eligibility, ITR-4 presumptive, income tax return forms India"
        canonical="https://tax.doaide.com/itr-forms"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: 'ITR Forms' }]} />

      <h1 style={s.title}>ITR Forms Explained: ITR-1 to ITR-7</h1>
      <p style={s.meta}>For FY 2025-26 (AY 2026-27) · Updated October 2026</p>

      <p style={s.p}>
        The Income Tax Department prescribes seven return forms, and the right one depends on who you are
        (individual, firm, company, trust) and where your income comes from. Filing the wrong form makes the
        return defective, so start here: a one-line summary of each form, with a detailed page for every one.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Not sure which form?</div>
        Answer a few questions in the free <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> and
        it names your form in under two minutes.
      </div>

      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Form</th>
            <th style={s.th}>Who it is for</th>
            <th style={s.th}>Due date</th>
          </tr>
        </thead>
        <tbody>
          {ITR_FORMS.map((f) => (
            <tr key={f.slug}>
              <td style={s.td}><Link to={`/itr-forms/${f.slug}`} style={s.link}>{f.name}</Link></td>
              <td style={s.td}>{f.tagline}</td>
              <td style={s.td}>{f.dueDate.split(';')[0].split('(')[0].trim()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {ITR_FORMS.map((f) => (
        <Link key={f.slug} to={`/itr-forms/${f.slug}`} style={s.card}>
          <div style={s.cardTitle}>{f.name}</div>
          <div style={s.cardDesc}>{f.tagline}. {f.incomeSources}.</div>
        </Link>
      ))}

      <p style={{ ...s.p, marginTop: 24 }}>
        Once you know your form, follow the step-by-step{' '}
        <Link to="/blog/how-to-file-itr-online-free" style={s.link}>guide to filing ITR online free</Link>, check your
        numbers with the <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>, and keep every
        date from the <Link to="/blog/itr-filing-deadlines-2027" style={s.link}>deadline calendar</Link>.
      </p>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
