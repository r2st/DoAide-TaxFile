import { Link, Outlet, useLocation } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import Breadcrumb from '../../components/Breadcrumb'

const ARTICLES = [
  {
    slug: 'income-tax-slabs-2026-27',
    title: 'Income Tax Slabs 2026-27 — Old vs New Regime Complete Guide',
    description: 'Complete guide to income tax slabs for FY 2026-27. Compare old and new regime rates, exemptions, rebates, and find which regime saves you more tax.',
  },
  {
    slug: 'how-to-file-itr-online-free',
    title: 'How to File ITR Online Free — Step-by-Step Guide 2026',
    description: 'Step-by-step guide to filing income tax return online for free. Choose the right ITR form, gather documents, file on the e-filing portal, and verify your return.',
  },
  {
    slug: 'section-80c-deductions-complete-guide',
    title: 'Section 80C Deductions Guide — Complete List of Tax Saving Options',
    description: 'Complete list of Section 80C deductions for FY 2026-27. PPF, ELSS, NPS, LIC, SSY, and 15+ options to save up to ₹46,800 in tax under the old regime.',
  },
  {
    slug: 'nps-vs-ppf-vs-elss-comparison',
    title: 'NPS vs PPF vs ELSS — Complete Comparison Guide 2026',
    description: 'Detailed comparison of NPS, PPF, and ELSS for tax saving and wealth creation. Compare returns, tax benefits, lock-in, risk, and suitability for your goals.',
  },
]

export { ARTICLES }

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  backLink: { color: 'var(--doaide-text-muted)', fontSize: 13, textDecoration: 'none', display: 'inline-block', marginBottom: 24 },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  subtitle: { color: 'var(--doaide-text-muted)', fontSize: 14, marginBottom: 40 },
  card: { display: 'block', padding: 20, borderRadius: 'var(--doaide-radius-lg)', border: '1px solid var(--doaide-border)', marginBottom: 16, textDecoration: 'none', transition: 'border-color var(--doaide-transition)' },
  cardTitle: { fontFamily: 'var(--doaide-font-display)', fontSize: 18, color: 'var(--doaide-text)', marginBottom: 6 },
  cardDesc: { fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.6 },
  readMore: { fontSize: 13, color: 'var(--doaide-gold)', fontWeight: 500, marginTop: 8, display: 'inline-block' },
}

export default function BlogLayout() {
  const { pathname } = useLocation()
  const isIndex = pathname === '/blog' || pathname === '/blog/'

  return (
    <div style={s.page}>
      <SEOHead
        title="DoAide TaxFile Blog — Tax Guides and Resources"
        description="Expert guides on income tax, ITR filing, Section 80C deductions, NPS, PPF, ELSS, and tax-saving strategies for Indian taxpayers."
      />
      <Link to="/" style={s.backLink}>← Back to TaxFile</Link>
      {isIndex && (
        <>
          <h1 style={s.title}>TaxFile Blog</h1>
          <p style={s.subtitle}>Guides and resources for income tax planning in India</p>
        </>
      )}
      <Outlet />
    </div>
  )
}

export function BlogIndex() {
  return (
    <div>
      {ARTICLES.map(a => (
        <Link key={a.slug} to={`/blog/${a.slug}`} style={s.card}>
          <div style={s.cardTitle}>{a.title}</div>
          <div style={s.cardDesc}>{a.description}</div>
          <span style={s.readMore}>Read more →</span>
        </Link>
      ))}
    </div>
  )
}
