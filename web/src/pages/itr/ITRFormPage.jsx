import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import Breadcrumb from '../../components/Breadcrumb'
import FAQSection from '../../components/FAQSection'
import ShareButtons from '../../components/ShareButtons'
import { getITRForm, getRelatedForms } from '../../lib/itrForms'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 24, marginTop: 40, marginBottom: 12, color: 'var(--doaide-text)' },
  p: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  badge: {
    display: 'inline-block', padding: '4px 12px', borderRadius: 16, fontSize: 13, fontWeight: 600,
    background: 'var(--doaide-gold-bg)', color: 'var(--doaide-gold)', marginBottom: 16,
  },
  twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 },
  col: { padding: 16, border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-lg)', background: 'var(--doaide-surface)' },
  colTitle: { fontSize: 15, fontWeight: 600, marginBottom: 10 },
  colList: { paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--doaide-text-secondary)' },
  relatedCard: {
    display: 'block', padding: 14, border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-md)',
    marginBottom: 8, textDecoration: 'none', color: 'inherit',
  },
}

export default function ITRFormPage({ slug }) {
  const form = getITRForm(slug)

  if (!form) {
    return (
      <div style={s.page}>
        <SEOHead title="ITR Form Not Found | DoAide TaxFile" description="This ITR form page does not exist." canonical="https://tax.doaide.com/itr-forms" />
        <h1 style={s.title}>Form not found</h1>
        <p style={s.p}>
          That ITR form doesn&apos;t exist. See all forms on the <Link to="/itr-forms" style={s.link}>ITR forms overview</Link>.
        </p>
      </div>
    )
  }

  const related = getRelatedForms(slug, 3)

  return (
    <div style={s.page}>
      <SEOHead
        title={`${form.name} — Who Can File, Eligibility, Documents & Due Date | DoAide TaxFile`}
        description={`${form.name} explained for FY 2025-26 (AY 2026-27): ${form.tagline.toLowerCase()}. Who can file, who cannot, documents needed and due dates.`}
        keywords={`${form.shortName}, ${form.shortName} eligibility, who can file ${form.shortName}, ${form.shortName} due date, ${form.shortName} documents, income tax return ${form.shortName}`}
        canonical={`https://tax.doaide.com/itr-forms/${form.slug}`}
        faqs={form.faqs}
      />
      <Breadcrumb items={[{ label: 'ITR Forms', path: '/itr-forms' }, { label: form.shortName }]} />

      <span style={s.badge}>FY 2025-26 · AY 2026-27</span>
      <h1 style={s.title}>{form.name}: Who Can File It?</h1>
      <p style={s.meta}>{form.tagline} · Updated October 2026</p>

      <p style={s.p}>
        <strong>{form.name}</strong> covers: {form.incomeSources}. Below is exactly who can use it, who cannot,
        what to keep ready, and when to file.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Check in 2 minutes</div>
        Not sure this is your form? The free <Link to="/itr-form-selector" style={s.link}>ITR Form Selector</Link> asks
        a few questions and names the right form — no login needed.
      </div>

      <div style={s.twoCol}>
        <div style={s.col}>
          <div style={{ ...s.colTitle, color: '#22c55e' }}>✓ Who can file {form.shortName}</div>
          <ul style={s.colList}>
            {form.whoCanFile.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div style={s.col}>
          <div style={{ ...s.colTitle, color: '#ef4444' }}>✗ Who cannot file {form.shortName}</div>
          <ul style={s.colList}>
            {form.whoCannotFile.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>

      <h2 style={s.h2}>Documents to Keep Ready</h2>
      <ul style={s.ul}>
        {form.documents.map((doc, i) => <li key={i}>{doc}</li>)}
      </ul>

      <h2 style={s.h2}>Due Date</h2>
      <p style={s.p}>
        {form.dueDate}. Missing it means late fees under Section 234F and losing most carry-forwards — see the{' '}
        <Link to="/blog/belated-itr-filing-after-due-date-2026" style={s.link}>belated return guide</Link> if you are
        already past the date, and the <Link to="/blog/itr-filing-deadlines-2027" style={s.link}>full deadline calendar</Link> for
        every category.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Worth knowing</div>
        {form.tip}
      </div>

      <h2 style={s.h2}>Before You File</h2>
      <p style={s.p}>
        Work out your tax with the <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link>, compare
        regimes with the <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime tool</Link>, and if you are
        salaried, decode your Form 16 with the <Link to="/form-16-analyzer" style={s.link}>Form 16 Analyzer</Link>. Then
        follow the step-by-step <Link to="/blog/how-to-file-itr-online-free" style={s.link}>guide to filing ITR online free</Link>.
      </p>

      <h2 style={s.h2}>Other ITR Forms</h2>
      {related.map((f) => (
        <Link key={f.slug} to={`/itr-forms/${f.slug}`} style={s.relatedCard}>
          <span style={{ color: 'var(--doaide-gold)', fontWeight: 600 }}>{f.name}</span>
          <span style={{ color: 'var(--doaide-text-secondary)', fontSize: 14 }}> — {f.tagline}</span>
        </Link>
      ))}
      <p style={{ ...s.p, marginTop: 12 }}>
        Or see the <Link to="/itr-forms" style={s.link}>complete ITR forms overview</Link>.
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
        <ShareButtons text={`${form.name} — who can file, documents and due dates for FY 2025-26\n\ntax.doaide.com/itr-forms/${form.slug}`} />
      </div>

      <FAQSection faqs={form.faqs} />
    </div>
  )
}
