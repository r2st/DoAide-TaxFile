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
  {
    slug: 'how-to-save-income-tax-legally-india-2026',
    title: 'How to Save Income Tax Legally in India 2026 — Complete Guide',
    description: 'Complete guide to saving income tax legally in India for FY 2026-27. Section 80C, 80D, HRA, NPS, home loan benefits and more — with exact amounts and strategies.',
  },
  {
    slug: 'section-80c-investment-options-compared',
    title: 'Section 80C Investment Options Compared — Which is Best for You?',
    description: 'Side-by-side comparison of all Section 80C investment options — ELSS, PPF, NSC, FD, SSY, NPS, LIC. Returns, lock-in, risk, and which suits your profile.',
  },
  {
    slug: 'new-vs-old-tax-regime-calculator',
    title: 'New vs Old Tax Regime Calculator — Which Saves More Tax in 2026?',
    description: 'Detailed comparison of new and old income tax regimes for FY 2026-27. Slab rates, deductions, worked examples at every income level, and a decision framework.',
  },
  {
    slug: 'first-time-itr-filing-guide',
    title: 'First Time Filing ITR? Complete Beginner\'s Guide 2026',
    description: 'Step-by-step guide for first-time income tax return filers. Documents needed, choosing ITR form, old vs new regime, filing on the portal, and e-verification.',
  },
  {
    slug: 'itr-filing-deadlines-2027',
    title: 'ITR Filing Deadlines 2027 — Key Dates, Penalties & Extensions',
    description: 'All ITR filing deadlines for FY 2026-27 (AY 2027-28). Due dates for every category, advance tax schedule, late filing penalties, and tips to file on time.',
  },
  {
    slug: 'tax-planning-freelancers-india',
    title: 'Tax Planning for Freelancers & Gig Workers — Complete Guide 2026',
    description: 'Freelancer tax guide: presumptive taxation (44ADA), ITR forms, advance tax, deductible expenses, TDS rates, and smart tax-saving strategies for FY 2026-27.',
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
