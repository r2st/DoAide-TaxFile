import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import FAQSection from '../components/FAQSection'

const HOME_FAQS = [
  { q: 'What income tax regime should I choose for FY 2026-27?', a: 'It depends on your deductions. The new regime has lower rates but fewer deductions (only ₹75,000 standard deduction). The old regime allows 80C (₹1.5L), 80D, HRA, home loan interest, and more. Use our Income Tax Calculator to compare both with your actual numbers.' },
  { q: 'What are the income tax slab rates for FY 2026-27?', a: 'New regime: 0% up to ₹4L, 5% (₹4-8L), 10% (₹8-12L), 15% (₹12-16L), 20% (₹16-20L), 25% (₹20-24L), 30% (above ₹24L). Old regime: 0% up to ₹2.5L, 5% (₹2.5-5L), 20% (₹5-10L), 30% (above ₹10L). Senior citizens have higher exemption limits.' },
  { q: 'When is the deadline to file ITR for FY 2026-27?', a: 'For most individuals: July 31, 2027. For businesses requiring audit: October 31, 2027. Late filing attracts a penalty of ₹5,000 (₹1,000 if income is below ₹5 lakh) and interest on unpaid tax.' },
  { q: 'How much can I save with Section 80C?', a: 'Section 80C allows a deduction of up to ₹1,50,000 through PPF, ELSS, NSC, tax-saver FD, LIC, EPF, home loan principal, and tuition fees. At the highest slab (30% + cess), you can save up to ₹46,800 in tax.' },
  { q: 'Is this calculator free to use?', a: 'Yes, all tools on DoAide TaxFile are 100% free. No login, no signup, no hidden charges. Use as many calculators as you need.' },
]

const TOOLS = [
  { path: '/income-tax-calculator', icon: '🧮', title: 'Income Tax Calculator', desc: 'Compare old vs new regime side-by-side. Find which saves you more money.' },
  { path: '/itr-form-selector', icon: '📋', title: 'ITR Form Selector', desc: 'Answer a few questions to find the right ITR form for your income.' },
  { path: '/hra-calculator', icon: '🏠', title: 'HRA Exemption Calculator', desc: 'Calculate your HRA tax exemption under Section 10(13A).' },
  { path: '/80c-planner', icon: '📊', title: '80C Investment Planner', desc: 'Plan your ₹1.5L Section 80C investments for maximum tax savings.' },
  { path: '/capital-gains-calculator', icon: '📈', title: 'Capital Gains Calculator', desc: 'STCG and LTCG tax on equity, debt, real estate, gold, and crypto.' },
  { path: '/tds-calculator', icon: '🏦', title: 'TDS Calculator', desc: 'Calculate TDS rates and amounts for salary, rent, professional fees.' },
  { path: '/advance-tax-calculator', icon: '📅', title: 'Advance Tax Calculator', desc: 'Quarterly advance tax installments with due dates and interest.' },
  { path: '/rent-receipt-generator', icon: '🧾', title: 'Rent Receipt Generator', desc: 'Generate rent receipts for HRA claims. Print or save as PDF.' },
  { path: '/form-16-analyzer', icon: '📄', title: 'Form 16 Analyzer', desc: 'Enter Form 16 data to verify tax, compare regimes, check refund.' },
  { path: '/tax-refund-status', icon: '🔍', title: 'Tax Refund Status', desc: 'Step-by-step guide to check your income tax refund status online.' },
  { path: '/standard-deduction-calculator', icon: '📝', title: 'Deduction Calculator', desc: 'Track all deduction sections — 80C, 80D, 80E, 80G, 24(b) and more.' },
  { path: '/nps-calculator', icon: '🏛️', title: 'NPS Tax Benefit Calculator', desc: 'Calculate NPS deductions under 80CCD(1), 80CCD(1B), and 80CCD(2).' },
  { path: '/home-loan-calculator', icon: '🏡', title: 'Home Loan Tax Benefit', desc: 'Section 24(b), 80C principal, and 80EEA deductions on home loans.' },
  { path: '/senior-citizen-calculator', icon: '👴', title: 'Senior Citizen Calculator', desc: 'Special tax slabs, 80TTB, higher 80D limits for seniors (60+/80+).' },
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
        keywords="income tax calculator India 2026, ITR form selector, HRA exemption calculator, 80C investment planner, capital gains calculator India, rent receipt generator, NPS calculator, home loan tax benefit"
        canonical="https://tax.doaide.com"
        faqs={HOME_FAQS}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'DoAide TaxFile',
          url: 'https://tax.doaide.com',
          description: 'Free income tax tools for India — calculators, ITR form selector, rent receipt generator, and more for FY 2026-27.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://tax.doaide.com/?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
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

      <FAQSection faqs={HOME_FAQS} />

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
