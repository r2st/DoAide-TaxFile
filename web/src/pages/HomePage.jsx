import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import FAQSection from '../components/FAQSection'
import RecentTools from '../components/RecentTools'
import TrendingTools from '../components/TrendingTools'

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * end))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function DeadlineCountdown() {
  const deadline = new Date('2027-07-31T23:59:59+05:30')
  const [diff, setDiff] = useState(() => Math.max(0, deadline - Date.now()))

  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, deadline - Date.now())), 1000)
    return () => clearInterval(id)
  }, [])

  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)

  const unit = (val, label) => (
    <div style={{ textAlign: 'center', minWidth: 56 }}>
      <div style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 28, fontWeight: 700, color: 'var(--doaide-gold)' }}>{val}</div>
      <div style={{ fontSize: 10, color: 'var(--doaide-text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
    </div>
  )

  return (
    <div style={{ marginTop: 32, padding: '20px 24px', background: 'var(--doaide-surface)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)', textAlign: 'center' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--doaide-gold)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>ITR Filing Deadline — FY 2026-27</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        {unit(days, 'Days')}
        {unit(hours, 'Hours')}
        {unit(mins, 'Mins')}
        {unit(secs, 'Secs')}
      </div>
      <div style={{ marginTop: 12 }}>
        <Link to="/income-tax-calculator" style={{ color: 'var(--doaide-gold)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Calculate Your Tax Now →</Link>
      </div>
    </div>
  )
}

const TESTIMONIALS = [
  { name: "Kavita Sharma", role: "Chartered Accountant, Mumbai", stars: 5, quote: "TaxFile's old-vs-new regime comparison saved my clients lakhs. The calculations are instant and always match the latest slabs." },
  { name: "Arjun Reddy", role: "Freelance Developer, Hyderabad", stars: 5, quote: "Finally a tax calculator that handles freelancer income correctly. The 44ADA presumptive calculation is spot-on." },
  { name: "Meera Iyer", role: "HR Manager, Bengaluru", stars: 5, quote: "I share the salary calculator link with every new joiner. It breaks down CTC to take-home perfectly — no more Excel sheets." },
  { name: "Vikram Singh", role: "Small Business Owner, Chandigarh", stars: 4, quote: "The SIP and EMI calculators helped me plan my investments alongside tax savings. All free, no sign-up — incredible." },
]

const HOME_FAQS = [
  { q: 'What income tax regime should I choose for FY 2026-27?', a: 'It depends on your deductions. The new regime has lower rates but fewer deductions (only ₹75,000 standard deduction). The old regime allows 80C (₹1.5L), 80D, HRA, home loan interest, and more. Use our Income Tax Calculator to compare both with your actual numbers.' },
  { q: 'What are the income tax slab rates for FY 2026-27?', a: 'New regime: 0% up to ₹4L, 5% (₹4-8L), 10% (₹8-12L), 15% (₹12-16L), 20% (₹16-20L), 25% (₹20-24L), 30% (above ₹24L). Old regime: 0% up to ₹2.5L, 5% (₹2.5-5L), 20% (₹5-10L), 30% (above ₹10L). Senior citizens have higher exemption limits.' },
  { q: 'How do I file ITR online for FY 2026-27?', a: 'Step 1: Use our Income Tax Calculator to find your exact tax liability. Step 2: Compare old vs new regime to pick the one that saves more. Step 3: Use our ITR Form Selector to find the right form. Step 4: File on incometax.gov.in with your pre-calculated figures. The deadline is July 31, 2027.' },
  { q: 'When is the deadline to file ITR for FY 2026-27?', a: 'For most individuals: July 31, 2027. For businesses requiring audit: October 31, 2027. Late filing attracts a penalty of ₹5,000 (₹1,000 if income is below ₹5 lakh) and interest on unpaid tax under Section 234A.' },
  { q: 'How much can I save with Section 80C?', a: 'Section 80C allows a deduction of up to ₹1,50,000 through PPF, ELSS, NSC, tax-saver FD, LIC, EPF, home loan principal, and tuition fees. At the highest slab (30% + cess), you can save up to ₹46,800 in tax.' },
  { q: 'Is DoAide TaxFile better than ClearTax?', a: 'For tax calculations and planning, DoAide TaxFile offers 30+ specialized calculators completely free — no login, no signup, no hidden charges. ClearTax is better for ITR filing services and CA assistance. For pure calculation and tax planning, TaxFile provides more tools at zero cost.' },
  { q: 'Is this calculator free to use?', a: 'Yes, all 30+ tools on DoAide TaxFile are 100% free forever. No login, no signup, no hidden charges, no premium tiers. Use as many calculators as you need, as many times as you want.' },
]

const POPULAR_TOOLS = [
  { path: '/income-tax-calculator', icon: '🧮', title: 'Income Tax Calculator' },
  { path: '/take-home-salary-calculator', icon: '💰', title: 'Take-Home Salary' },
  { path: '/sip-calculator', icon: '📈', title: 'SIP Calculator' },
  { path: '/emi-calculator', icon: '🏠', title: 'EMI Calculator' },
  { path: '/hra-calculator', icon: '🏠', title: 'HRA Calculator' },
  { path: '/ppf-calculator', icon: '🔒', title: 'PPF Calculator' },
]

const CATEGORIES = [
  {
    name: 'Income Tax',
    tools: [
      { path: '/income-tax-calculator', icon: '🧮', title: 'Income Tax Calculator', desc: 'Compare old vs new regime side-by-side. Find which saves you more.' },
      { path: '/old-vs-new-regime', icon: '⚖️', title: 'Old vs New Regime', desc: 'Detailed side-by-side comparison with slab breakdown and recommendation.' },
      { path: '/tools/regime-comparison', icon: '📊', title: 'Enhanced Regime Comparison', desc: 'Full salary + HRA + deductions comparison with visual bar chart.' },
      { path: '/itr-form-selector', icon: '📋', title: 'ITR Form Selector', desc: 'Answer a few questions to find the right ITR form for your income.' },
      { path: '/advance-tax-calculator', icon: '📅', title: 'Advance Tax Calculator', desc: 'Quarterly advance tax installments with due dates and interest.' },
      { path: '/tds-calculator', icon: '🏦', title: 'TDS Calculator', desc: 'Calculate TDS rates and amounts for salary, rent, professional fees.' },
      { path: '/capital-gains-calculator', icon: '📈', title: 'Capital Gains Calculator', desc: 'STCG and LTCG tax on equity, debt, real estate, gold, and crypto.' },
      { path: '/senior-citizen-calculator', icon: '👴', title: 'Senior Citizen Calculator', desc: 'Special tax slabs, 80TTB, higher 80D limits for seniors (60+/80+).' },
      { path: '/form-16-analyzer', icon: '📄', title: 'Form 16 Analyzer', desc: 'Enter Form 16 data to verify tax, compare regimes, check refund.' },
      { path: '/form-16-decoder', icon: '🔓', title: 'Form 16 Decoder', desc: 'Paste your Form 16 text and get a plain-English breakdown.' },
      { path: '/refund-calculator', icon: '💸', title: 'Refund Calculator', desc: 'Estimate your income tax refund amount and timeline.' },
      { path: '/tax-refund-status', icon: '🔍', title: 'Tax Refund Status', desc: 'Step-by-step guide to check your income tax refund status online.' },
      { path: '/tax-loss-harvesting', icon: '📉', title: 'Tax Loss Harvesting', desc: 'Offset capital gains with losses. Calculate your LTCG/STCG savings.' },
    ],
  },
  {
    name: 'Salary & Employment',
    tools: [
      { path: '/take-home-salary-calculator', icon: '💰', title: 'Take-Home Salary Calculator', desc: 'CTC to in-hand salary with PF, gratuity, professional tax breakup.' },
      { path: '/salary-tax-optimizer', icon: '⚡', title: 'Salary Tax Optimizer', desc: 'Find the optimal CTC structure to maximize your in-hand salary.' },
      { path: '/gratuity-calculator', icon: '🎁', title: 'Gratuity Calculator', desc: 'Calculate gratuity amount and Section 10(10) tax exemption.' },
      { path: '/hra-calculator', icon: '🏠', title: 'HRA Exemption Calculator', desc: 'Calculate your HRA tax exemption under Section 10(13A).' },
      { path: '/tools/hra-calculator', icon: '🏠', title: 'HRA Calculator (Step-by-Step)', desc: 'Detailed HRA exemption with all 3 limits, minimum badge, and tax impact.' },
      { path: '/epf-calculator', icon: '🏛️', title: 'EPF Calculator', desc: 'Employee + employer PF contribution split with retirement corpus.' },
      { path: '/professional-tax-calculator', icon: '🗺️', title: 'Professional Tax', desc: 'State-wise professional tax rates for all Indian states.' },
    ],
  },
  {
    name: 'Tax Deductions',
    tools: [
      { path: '/80c-planner', icon: '📊', title: '80C Investment Planner', desc: 'Plan your ₹1.5L Section 80C investments for maximum tax savings.' },
      { path: '/80d-calculator', icon: '🏥', title: '80D Health Insurance', desc: 'Calculate health insurance deduction for self, family, and parents.' },
      { path: '/standard-deduction-calculator', icon: '📝', title: 'Deduction Calculator', desc: 'Track all deduction sections — 80C, 80D, 80E, 80G, 24(b) and more.' },
      { path: '/80g-calculator', icon: '🎁', title: '80G Donation Calculator', desc: 'Calculate tax benefit for charitable donations under Section 80G.' },
      { path: '/nps-calculator', icon: '🏛️', title: 'NPS Tax Benefit Calculator', desc: 'NPS deductions under 80CCD(1), 80CCD(1B), and 80CCD(2).' },
      { path: '/home-loan-calculator', icon: '🏡', title: 'Home Loan Tax Benefit', desc: 'Section 24(b), 80C principal, and 80EEA deductions on home loans.' },
      { path: '/tax-saving-calculator', icon: '🎯', title: 'Tax Saving Calculator', desc: 'Find optimal 80C/80D/NPS deductions to minimize your tax.' },
    ],
  },
  {
    name: 'Investment Calculators',
    tools: [
      { path: '/sip-calculator', icon: '📈', title: 'SIP Calculator', desc: 'Calculate SIP returns with step-up option and projected wealth.' },
      { path: '/mutual-fund-calculator', icon: '📊', title: 'Mutual Fund Calculator', desc: 'Lumpsum and SIP returns with CAGR and absolute return.' },
      { path: '/ppf-calculator', icon: '🔒', title: 'PPF Calculator', desc: 'Year-by-year PPF returns at 7.1% with 15-year lock-in.' },
      { path: '/fd-calculator', icon: '🏦', title: 'FD Calculator', desc: 'Fixed deposit interest with compounding frequencies and TDS impact.' },
      { path: '/compound-interest-calculator', icon: '📐', title: 'Compound Interest Calculator', desc: 'Compare compound vs simple interest with different frequencies.' },
      { path: '/ssy-calculator', icon: '👧', title: 'Sukanya Samriddhi Calculator', desc: 'SSY returns at 8.2% with 21-year maturity for girl child savings.' },
      { path: '/elss-vs-ppf-vs-fd', icon: '⚖️', title: 'ELSS vs PPF vs FD', desc: 'Compare after-tax returns across ELSS, PPF, and FD instruments.' },
      { path: '/lumpsum-calculator', icon: '💎', title: 'Lumpsum Calculator', desc: 'Calculate one-time investment returns with compound growth.' },
      { path: '/rd-calculator', icon: '🔄', title: 'RD Calculator', desc: 'Recurring deposit maturity amount with quarterly compounding.' },
      { path: '/swp-calculator', icon: '💵', title: 'SWP Calculator', desc: 'Plan systematic withdrawals from your mutual fund corpus.' },
      { path: '/cagr-calculator', icon: '📊', title: 'CAGR Calculator', desc: 'Calculate compound annual growth rate of any investment.' },
      { path: '/inflation-calculator', icon: '📉', title: 'Inflation Calculator', desc: 'See how inflation erodes your purchasing power over time.' },
      { path: '/retirement-calculator', icon: '🏖️', title: 'Retirement Calculator', desc: 'Plan your retirement corpus and monthly SIP needed.' },
    ],
  },
  {
    name: 'Tools',
    tools: [
      { path: '/emi-calculator', icon: '🏠', title: 'EMI Calculator', desc: 'Home, car, and personal loan EMI with amortization schedule.' },
      { path: '/gst-calculator', icon: '🧾', title: 'GST Calculator', desc: 'Calculate GST with CGST, SGST, IGST breakup for all slab rates.' },
      { path: '/rent-receipt-generator', icon: '📝', title: 'Rent Receipt Generator', desc: 'Generate rent receipts for HRA claims. Print or save as PDF.' },
      { path: '/income-tax-calculator', icon: '💡', title: 'Tax Saving Tips', desc: 'Get personalized recommendations to reduce your tax liability.', hash: '#recommendations' },
    ],
  },
]

const s = {
  hero: {
    textAlign: 'center',
    padding: '48px 16px 40px',
  },
  heroTitle: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 'clamp(28px, 7vw, 42px)',
    lineHeight: 1.2,
    color: 'var(--doaide-text)',
    marginBottom: 12,
  },
  heroSub: {
    fontSize: 'clamp(15px, 3vw, 18px)',
    color: 'var(--doaide-text-secondary)',
    marginBottom: 16,
  },
  heroCta: {
    display: 'inline-block',
    padding: '14px 32px',
    background: 'var(--doaide-gold)',
    color: 'var(--doaide-text-on-gold)',
    fontWeight: 700,
    fontSize: 16,
    borderRadius: 'var(--doaide-radius-md)',
    textDecoration: 'none',
    marginBottom: 8,
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity var(--doaide-transition)',
  },
  heroCtaSecondary: {
    display: 'inline-block',
    padding: '14px 24px',
    background: 'transparent',
    color: 'var(--doaide-gold)',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 'var(--doaide-radius-md)',
    textDecoration: 'none',
    border: '1px solid var(--doaide-gold-dim)',
    marginLeft: 12,
    transition: 'all var(--doaide-transition)',
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
  socialProof: {
    display: 'flex',
    justifyContent: 'center',
    gap: 32,
    marginTop: 24,
    flexWrap: 'wrap',
  },
  socialStat: {
    textAlign: 'center',
  },
  socialNumber: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--doaide-gold)',
  },
  socialLabel: {
    fontSize: 12,
    color: 'var(--doaide-text-muted)',
    marginTop: 2,
  },
  popularSection: {
    marginTop: 32,
    padding: '20px 24px',
    background: 'var(--doaide-gold-bg)',
    border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)',
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--doaide-gold)',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  popularGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  popularChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 18px',
    background: 'var(--doaide-surface)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 20,
    textDecoration: 'none',
    color: 'var(--doaide-text)',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all var(--doaide-transition)',
    minHeight: 44,
  },
  categorySection: {
    marginTop: 40,
  },
  categoryTitle: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 20,
    marginBottom: 16,
    color: 'var(--doaide-text)',
    paddingBottom: 8,
    borderBottom: '2px solid var(--doaide-border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
    gap: 16,
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
  cardCta: {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--doaide-gold)',
    marginTop: 8,
    display: 'block',
  },
  guidesSection: {
    marginTop: 48,
    padding: '28px 24px',
    background: 'var(--doaide-surface)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)',
  },
  guidesTitle: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 20,
    marginBottom: 16,
    color: 'var(--doaide-text)',
  },
  guideLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid var(--doaide-border)',
    textDecoration: 'none',
    color: 'var(--doaide-text)',
    fontSize: 14,
    transition: 'color var(--doaide-transition)',
    minHeight: 44,
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
        title="DoAide TaxFile — File ITR in Minutes | 30+ Free Tax Calculators India FY 2026-27"
        description="File ITR in minutes with 30+ free tax calculators for India FY 2026-27. Income tax calculator, old vs new regime comparison, HRA, 80C planner, SIP, EMI — no login, no signup, 100% free. Better than ClearTax for tax planning."
        keywords="income tax calculator India 2026, ITR filing calculator, file ITR online free, old vs new tax regime 2026-27, ClearTax alternative, SIP calculator, EMI calculator, take home salary calculator, HRA exemption calculator, 80C planner, 80D calculator, capital gains calculator India, NPS calculator, PPF calculator, FD calculator"
        canonical="https://tax.doaide.com"
        faqs={HOME_FAQS}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'DoAide TaxFile',
          url: 'https://tax.doaide.com',
          description: 'Free income tax tools and financial calculators for India — tax calculators, SIP, EMI, FD, mutual fund calculators, and more for FY 2026-27.',
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
          File ITR in Minutes with<br />
          <span style={{ color: 'var(--doaide-gold)' }}>30+ Free Tax Tools</span>
        </h1>
        <p style={s.heroSub}>
          Calculate taxes, plan investments, optimize salary — all for free.
        </p>
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/income-tax-calculator" style={s.heroCta}>Calculate Your Tax Now</Link>
          <Link to="/old-vs-new-regime" style={s.heroCtaSecondary}>Compare Old vs New Regime</Link>
        </div>
        <div style={s.badges}>
          <span style={s.badge}><span style={s.badgeDot} /> 100% Free</span>
          <span style={s.badge}><span style={s.badgeDot} /> No Login Required</span>
          <span style={s.badge}><span style={s.badgeDot} /> Instant Results</span>
          <span style={s.badge}><span style={s.badgeDot} /> 30+ Calculators</span>
        </div>
        <div style={s.socialProof}>
          <div style={s.socialStat}>
            <div style={s.socialNumber}><AnimatedCounter end={50000} suffix="+" /></div>
            <div style={s.socialLabel}>Calculations Done</div>
          </div>
          <div style={s.socialStat}>
            <div style={s.socialNumber}><AnimatedCounter end={10000} suffix="+" duration={1800} /></div>
            <div style={s.socialLabel}>Taxpayers This Month</div>
          </div>
          <div style={s.socialStat}>
            <div style={s.socialNumber}><AnimatedCounter end={30} suffix="+" duration={1200} /></div>
            <div style={s.socialLabel}>Free Tools</div>
          </div>
        </div>
      </section>

      <DeadlineCountdown />

      <RecentTools />

      <section style={s.popularSection}>
        <div style={s.popularTitle}>Popular Tools</div>
        <div style={s.popularGrid}>
          {POPULAR_TOOLS.map(tool => (
            <Link key={tool.path} to={tool.path} style={s.popularChip}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--doaide-gold)'; e.currentTarget.style.color = 'var(--doaide-gold)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--doaide-border)'; e.currentTarget.style.color = 'var(--doaide-text)' }}
            >
              <span>{tool.icon}</span>
              <span>{tool.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {CATEGORIES.map(cat => (
        <section key={cat.name} style={s.categorySection}>
          <h2 style={s.categoryTitle}>{cat.name}</h2>
          <div style={s.grid}>
            {cat.tools.map(tool => (
              <Link key={tool.path + (tool.hash || '')} to={tool.path + (tool.hash || '')} style={s.card}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--doaide-gold-dim)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--doaide-border)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={s.cardIcon}>{tool.icon}</div>
                <div style={s.cardTitle}>{tool.title}</div>
                <div style={s.cardDesc}>{tool.desc}</div>
                <span style={s.cardCta}>Use Now →</span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 20, marginBottom: 16, color: 'var(--doaide-text)' }}>Trusted by Professionals</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={{ background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-lg)', padding: 24 }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ color: i < t.stars ? 'var(--doaide-gold)' : 'var(--doaide-text-muted)', fontSize: 14 }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--doaide-text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--doaide-text)' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--doaide-text-muted)' }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 48, padding: '32px 24px', background: 'var(--doaide-surface)', border: '1px solid var(--doaide-gold-dim)', borderRadius: 'var(--doaide-radius-lg)' }}>
        <h2 style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 22, marginBottom: 8, color: 'var(--doaide-text)', textAlign: 'center' }}>Why 10,000+ Taxpayers Choose TaxFile</h2>
        <p style={{ textAlign: 'center', color: 'var(--doaide-text-muted)', fontSize: 14, marginBottom: 24 }}>The free alternative to ClearTax for tax calculations and planning</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: 16 }}>
          {[
            { icon: '0', label: '₹0 Forever', desc: 'All 30+ tools are 100% free. No hidden charges, no premium tiers, no upsells.' },
            { icon: '0', label: 'Zero Login Required', desc: 'No signup, no phone number, no email. Just open and calculate instantly.' },
            { icon: '30', label: '30+ Calculators', desc: 'More specialized tools than ClearTax — salary optimizer, tax loss harvesting, Form 16 AI analyzer.' },
            { icon: '5', label: '< 5 Second Results', desc: 'Instant calculations with detailed breakdowns. No loading, no waiting, no ads.' },
          ].map(item => (
            <div key={item.label} style={{ padding: 20, background: 'var(--doaide-bg)', border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-lg)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 32, fontWeight: 700, color: 'var(--doaide-gold)', marginBottom: 8 }}>{item.icon === '0' ? item.icon : item.icon + '+'}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link to="/compare/cleartax" style={{ color: 'var(--doaide-gold)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>See full TaxFile vs ClearTax comparison →</Link>
        </div>
      </section>

      <section style={s.guidesSection}>
        <h2 style={s.guidesTitle}>Tax Guides & Articles</h2>
        <Link to="/guides/income-tax-slabs-2026-27" style={s.guideLink}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--doaide-gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--doaide-text)'}
        >Income Tax Slabs FY 2026-27: Old vs New Regime Complete Guide</Link>
        <Link to="/guides/section-80c-deductions" style={s.guideLink}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--doaide-gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--doaide-text)'}
        >Section 80C Deductions: Complete List of Tax Saving Investments 2026</Link>
        <Link to="/guides/how-to-file-itr-online" style={s.guideLink}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--doaide-gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--doaide-text)'}
        >How to File ITR Online: Step by Step Guide 2026</Link>
        <Link to="/guides/best-tax-saving-salaried" style={{ ...s.guideLink, borderBottom: 'none' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--doaide-gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--doaide-text)'}
        >Best Tax Saving Options for Salaried Employees 2026</Link>
        <div style={{ textAlign: 'right', marginTop: 12 }}>
          <Link to="/guides" style={{ color: 'var(--doaide-gold)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>View All Guides →</Link>
        </div>
      </section>

      <TrendingTools />

      <FAQSection faqs={HOME_FAQS} />

      <section style={s.seo}>
        <h2 style={s.seoTitle}>About Income Tax & Financial Planning in India</h2>
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
            Beyond tax filing, smart financial planning includes investing through SIPs for long-term wealth creation,
            using PPF for guaranteed returns with tax benefits, and understanding EMI structures for home and vehicle loans.
            Tools like our Take-Home Salary Calculator and Salary Tax Optimizer help you understand and maximize your earnings.
          </p>
          <p style={{ marginTop: 12 }}>
            Use our free tools above to calculate your exact tax liability, plan investments, optimize your salary structure,
            and discover ways to grow your wealth. All calculations are for FY 2026-27 as per the latest Finance Act.
          </p>
        </div>
      </section>
    </>
  )
}
