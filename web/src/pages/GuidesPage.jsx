import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import Breadcrumb from '../components/Breadcrumb'

const GUIDES = [
  {
    path: '/guides/income-tax-slabs-2026-27',
    title: 'Income Tax Slabs FY 2026-27: Old vs New Regime Complete Guide',
    desc: 'Complete comparison of old and new regime tax slabs with worked examples at different income levels.',
    time: '8 min read',
  },
  {
    path: '/guides/old-vs-new-regime',
    title: 'Old vs New Tax Regime 2026-27: Which is Better for You?',
    desc: 'Detailed comparison with break-even analysis and worked examples at ₹10L, ₹15L, ₹20L, ₹30L income.',
    time: '10 min read',
  },
  {
    path: '/guides/section-80c-deductions',
    title: 'Section 80C Deductions: Complete List of Tax Saving Investments 2026',
    desc: 'Every 80C instrument compared — PPF, ELSS, NSC, FD, SCSS, SSY, EPF, LIC, and more.',
    time: '10 min read',
  },
  {
    path: '/guides/save-tax-new-regime',
    title: 'How to Save Tax Under New Tax Regime 2026-27',
    desc: 'Strategies that work without deductions — employer NPS, standard deduction, tax harvesting, and more.',
    time: '8 min read',
  },
  {
    path: '/guides/tax-saving-tips',
    title: 'Top 15 Tax Saving Tips for Salaried Employees 2026',
    desc: 'Actionable tips to save up to ₹2 lakh in taxes — for both old and new regime.',
    time: '12 min read',
  },
  {
    path: '/guides/nps-vs-ppf-vs-elss',
    title: 'NPS vs PPF vs ELSS: Which Tax Saving Investment is Best?',
    desc: 'Compare returns, lock-in, risk, and taxation of India\'s top three 80C investments.',
    time: '10 min read',
  },
  {
    path: '/guides/tax-on-salary',
    title: 'Income Tax on Salary: Complete Breakdown with Examples',
    desc: 'CTC vs gross vs net salary, allowances, deductions, TDS, and worked examples at ₹15L and ₹25L.',
    time: '10 min read',
  },
  {
    path: '/guides/home-loan-tax',
    title: 'Home Loan Tax Benefits: Section 24, 80C, 80EEA',
    desc: 'Complete guide to interest deduction, principal under 80C, joint loan benefits, and old vs new regime.',
    time: '10 min read',
  },
  {
    path: '/guides/advance-tax',
    title: 'Advance Tax: Due Dates, Calculation & Payment Guide',
    desc: 'Quarterly installments, Section 234B/234C interest, payment process, and worked examples.',
    time: '8 min read',
  },
  {
    path: '/guides/how-to-file-itr-online',
    title: 'How to File ITR Online: Step by Step Guide 2026',
    desc: 'Complete walkthrough of filing your income tax return on incometax.gov.in with screenshots.',
    time: '12 min read',
  },
  {
    path: '/guides/best-tax-saving-salaried',
    title: 'Best Tax Saving Options for Salaried Employees 2026',
    desc: 'Salary restructuring, 80C investments, NPS, health insurance — maximize your take-home.',
    time: '10 min read',
  },
  {
    path: '/guides/hra-exemption-calculation',
    title: 'HRA Exemption Calculation with Examples 2026',
    desc: 'Step-by-step HRA exemption formula with worked examples for metro and non-metro cities. Section 10(13A) and Section 80GG.',
    time: '12 min read',
  },
  {
    path: '/guides/capital-gains-mutual-funds',
    title: 'Capital Gains Tax on Mutual Funds India 2026',
    desc: 'LTCG and STCG rates for equity, debt, hybrid, and gold funds. SIP taxation, tax-loss harvesting, and ₹1.25L exemption.',
    time: '15 min read',
  },
  {
    path: '/guides/section-80c-complete-list',
    title: 'Section 80C Deductions — Complete List 2026',
    desc: 'Every 80C, 80CCC, 80CCD instrument with limits, lock-in, returns. Plus 80D, 80E, 80G, 80EEA and beyond-80C deductions.',
    time: '18 min read',
  },
]

const s = {
  page: { maxWidth: 900, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 40 },
  grid: { display: 'grid', gap: 20 },
  card: {
    background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)', padding: 28, textDecoration: 'none',
    color: 'var(--doaide-text)', display: 'block', transition: 'all var(--doaide-transition)',
  },
  cardTitle: { fontFamily: 'var(--doaide-font-display)', fontSize: 22, marginBottom: 8, lineHeight: 1.3 },
  cardDesc: { fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.6, marginBottom: 12 },
  cardMeta: { fontSize: 12, color: 'var(--doaide-text-muted)' },
  readLink: { color: 'var(--doaide-gold)', fontWeight: 600, fontSize: 14 },
}

export default function GuidesPage() {
  return (
    <div style={s.page}>
      <SEOHead
        title="Tax Guides & Articles - Income Tax Help India | DoAide TaxFile"
        description="Free income tax guides for India FY 2026-27. Tax slabs, old vs new regime, 80C investments, NPS vs PPF vs ELSS, salary tax breakdown, home loan benefits, advance tax, and tax saving tips."
        keywords="income tax guide India, tax slabs 2026-27, Section 80C guide, how to file ITR, tax saving tips, old vs new regime, NPS PPF ELSS comparison, home loan tax benefits"
        canonical="https://tax.doaide.com/guides"
      />

      <Breadcrumb items={[{ label: 'Guides' }]} />

      <h1 style={s.title}>Tax Guides</h1>
      <p style={s.subtitle}>In-depth articles on income tax, deductions, and tax-saving strategies for FY 2026-27</p>

      <div style={s.grid}>
        {GUIDES.map(guide => (
          <Link key={guide.path} to={guide.path} style={s.card}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--doaide-gold-dim)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--doaide-border)'; e.currentTarget.style.transform = 'none' }}
          >
            <h2 style={s.cardTitle}>{guide.title}</h2>
            <p style={s.cardDesc}>{guide.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={s.cardMeta}>{guide.time}</span>
              <span style={s.readLink}>Read Guide →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
