import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

const TOOLS = [
  { path: '/income-tax-calculator', icon: '🧮', title: 'Income Tax Calculator', desc: 'Compare old vs new regime side-by-side. Find which saves you more money.' },
  { path: '/itr-form-selector', icon: '📋', title: 'ITR Form Selector', desc: 'Answer a few questions to find the right ITR form for your income.' },
  { path: '/hra-calculator', icon: '🏠', title: 'HRA Exemption Calculator', desc: 'Calculate your HRA tax exemption under Section 10(13A).' },
  { path: '/80c-planner', icon: '📊', title: '80C Investment Planner', desc: 'Plan your ₹1.5L Section 80C investments for maximum tax savings.' },
  { path: '/capital-gains-calculator', icon: '📈', title: 'Capital Gains Calculator', desc: 'STCG and LTCG tax on equity, debt, real estate, gold, and crypto.' },
  { path: '/tds-calculator', icon: '🏦', title: 'TDS Calculator', desc: 'Calculate TDS rates and amounts for salary, rent, professional fees.' },
  { path: '/advance-tax-calculator', icon: '📅', title: 'Advance Tax Calculator', desc: 'Quarterly advance tax installments with due dates and interest.' },
  { path: '/income-tax-calculator', icon: '💡', title: 'Tax Saving Tips', desc: 'Get personalized recommendations to reduce your tax liability.', hash: '#recommendations' },
]

const s = {
  hero: {
    textAlign: 'center',
    padding: '48px 16px 40px',
  },
  heroTitle: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 42,
    lineHeight: 1.2,
    color: 'var(--doaide-text)',
    marginBottom: 12,
  },
  heroSub: {
    fontSize: 18,
    color: 'var(--doaide-text-secondary)',
    marginBottom: 8,
  },
  fy: {
    display: 'inline-block',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--doaide-gold)',
    background: 'var(--doaide-gold-bg)',
    padding: '4px 14px',
    borderRadius: 20,
    marginBottom: 24,
  },
  badges: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
    marginTop: 16,
  },
  badge: {
    fontSize: 13,
    color: 'var(--doaide-text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--doaide-success)',
    flexShrink: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
    marginTop: 40,
  },
  card: {
    background: 'var(--doaide-surface)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)',
    padding: 24,
    textDecoration: 'none',
    color: 'var(--doaide-text)',
    transition: 'all var(--doaide-transition)',
    display: 'block',
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: 'var(--doaide-text-secondary)',
    lineHeight: 1.5,
  },
  seo: {
    marginTop: 64,
    padding: '32px 0',
    borderTop: '1px solid var(--doaide-border)',
  },
  seoTitle: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 24,
    marginBottom: 16,
  },
  seoText: {
    fontSize: 14,
    color: 'var(--doaide-text-secondary)',
    lineHeight: 1.8,
    maxWidth: 800,
  },
}

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="DoAide TaxFile - Free Income Tax Calculator India FY 2026-27"
        description="Free income tax calculator, ITR form selector, HRA exemption calculator, 80C planner, capital gains calculator for India FY 2026-27. No login required."
        keywords="income tax calculator India 2026, ITR form selector, HRA exemption calculator, 80C investment planner, capital gains calculator India"
        canonical="https://tax.doaide.com"
      />

      <section style={s.hero}>
        <span style={s.fy}>FY 2026-27 (AY 2027-28)</span>
        <h1 style={s.heroTitle}>
          Free Income Tax Tools<br />
          <span style={{ color: 'var(--doaide-gold)' }}>for India</span>
        </h1>
        <p style={s.heroSub}>
          Calculate your taxes, find the right ITR form, and save more — all for free.
        </p>
        <div style={s.badges}>
          <span style={s.badge}><span style={s.badgeDot} /> 100% Free</span>
          <span style={s.badge}><span style={s.badgeDot} /> No Login Required</span>
          <span style={s.badge}><span style={s.badgeDot} /> Instant Results</span>
        </div>
      </section>

      <section style={s.grid}>
        {TOOLS.map(tool => (
          <Link key={tool.path + (tool.hash || '')} to={tool.path + (tool.hash || '')} style={s.card}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--doaide-gold-dim)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--doaide-border)'; e.currentTarget.style.transform = 'none' }}
          >
            <div style={s.cardIcon}>{tool.icon}</div>
            <div style={s.cardTitle}>{tool.title}</div>
            <div style={s.cardDesc}>{tool.desc}</div>
          </Link>
        ))}
      </section>

      <section style={s.seo}>
        <h2 style={s.seoTitle}>About Income Tax in India</h2>
        <div style={s.seoText}>
          <p>
            Income tax in India is governed by the Income Tax Act, 1961. For FY 2026-27 (Assessment Year 2027-28),
            taxpayers can choose between the Old Tax Regime with deductions and exemptions, or the New Tax Regime
            with lower slab rates but fewer deductions.
          </p>
          <p style={{ marginTop: 12 }}>
            The new regime offers slab rates from 0% to 30% with a standard deduction of ₹75,000 and a Section 87A
            rebate of up to ₹60,000 for income up to ₹12 lakh. The old regime retains deductions under Sections 80C
            (₹1.5 lakh), 80D (health insurance), HRA exemption, and home loan interest under Section 24(b).
          </p>
          <p style={{ marginTop: 12 }}>
            Use our free tools above to calculate your exact tax liability, find the right ITR form, and discover
            ways to save more on your taxes. All calculations are for FY 2026-27 as per the latest Finance Act.
          </p>
        </div>
      </section>
    </>
  )
}
