import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { path: '/income-tax-calculator', label: 'Tax Calculator' },
  { path: '/take-home-salary-calculator', label: 'Salary' },
  { path: '/sip-calculator', label: 'SIP' },
  { path: '/emi-calculator', label: 'EMI' },
  { path: '/hra-calculator', label: 'HRA' },
  { path: '/80c-planner', label: '80C' },
  { path: '/80d-calculator', label: '80D' },
  { path: '/ppf-calculator', label: 'PPF' },
  { path: '/fd-calculator', label: 'FD' },
  { path: '/gst-calculator', label: 'GST' },
  { path: '/mutual-fund-calculator', label: 'Mutual Fund' },
  { path: '/retirement-calculator', label: 'Retirement' },
  { path: '/epf-calculator', label: 'EPF' },
  { path: '/guides', label: 'Guides' },
  { path: '/compare/cleartax', label: 'Compare' },
]

const s = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: 'rgba(10, 10, 11, 0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--doaide-border)',
  },
  headerInner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    color: 'var(--doaide-text)',
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 22,
    fontWeight: 400,
  },
  logoGold: {
    color: 'var(--doaide-gold)',
  },
  nav: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navLink: {
    padding: '6px 12px',
    borderRadius: 'var(--doaide-radius-sm)',
    fontSize: 13,
    color: 'var(--doaide-text-secondary)',
    textDecoration: 'none',
    transition: 'all var(--doaide-transition)',
    whiteSpace: 'nowrap',
  },
  navLinkActive: {
    color: 'var(--doaide-gold)',
    background: 'var(--doaide-gold-bg)',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--doaide-text)',
    cursor: 'pointer',
    padding: 8,
    fontSize: 20,
  },
  mobileNav: {
    position: 'fixed',
    top: 56,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--doaide-bg)',
    zIndex: 49,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    overflowY: 'auto',
  },
  mobileNavLink: {
    padding: '12px 16px',
    borderRadius: 'var(--doaide-radius-md)',
    fontSize: 16,
    color: 'var(--doaide-text-secondary)',
    textDecoration: 'none',
    display: 'block',
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '32px 16px',
    minHeight: 'calc(100vh - 56px - 80px)',
  },
  footer: {
    borderTop: '1px solid var(--doaide-border)',
    padding: '24px 16px',
    textAlign: 'center',
    color: 'var(--doaide-text-muted)',
    fontSize: 13,
  },
}

export default function Layout({ children }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header style={s.header} className="no-print">
        <div style={s.headerInner}>
          <Link to="/" style={s.logo}>
            DoAide <span style={s.logoGold}>TaxFile</span>
          </Link>
          <nav style={s.nav} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <Link
                key={l.path}
                to={l.path}
                style={{ ...s.navLink, ...(location.pathname === l.path ? s.navLinkActive : {}) }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            style={s.hamburger}
            className="mobile-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav style={s.mobileNav} className="no-print">
          <Link to="/" style={s.mobileNavLink} onClick={() => setMobileOpen(false)}>Home</Link>
          {NAV_LINKS.map(l => (
            <Link
              key={l.path}
              to={l.path}
              style={{
                ...s.mobileNavLink,
                ...(location.pathname === l.path ? { color: 'var(--doaide-gold)', background: 'var(--doaide-gold-bg)' } : {}),
              }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}

      <main style={s.main}>{children}</main>

      <section style={{ borderTop: '1px solid var(--doaide-border)', background: 'var(--doaide-bg, #f8f9fa)', padding: '2rem 1rem' }} aria-label="More free tools from DoAide" className="no-print">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--doaide-text-muted)', margin: '0 0 1rem' }}>More free tools from DoAide</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '📄', name: 'Docs', url: 'https://docs.doaide.com', desc: 'Free document generators' },
              { icon: '📝', name: 'Resume', url: 'https://resume.doaide.com', desc: 'AI resume builder' },
              { icon: '📊', name: '409A', url: 'https://409a.doaide.com', desc: 'Startup valuations' },
              { icon: '🏷️', name: 'GST Bot', url: 'https://gst.doaide.com', desc: 'GST filing & compliance' },
              { icon: '🛡️', name: 'InsureKit', url: 'https://insure.doaide.com', desc: 'Insurance calculators' },
              { icon: '📈', name: 'Pulse', url: 'https://pulse.doaide.com', desc: 'Newsletter growth tools' },
              { icon: '🧾', name: 'Invoicer', url: 'https://invoicer.doaide.com', desc: 'GST invoices' },
              { icon: '📝', name: 'Contracts', url: 'https://contracts.doaide.com', desc: 'Business contracts' },
              { icon: '🏠', name: 'HomeNex', url: 'https://homenex.aiknol.com', desc: 'AI CRM for real estate' },
            ].map(t => (
              <a key={t.url} href={t.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem', background: 'var(--doaide-card-bg, #fff)', border: '1px solid var(--doaide-border)', borderRadius: '0.5rem', textDecoration: 'none', color: 'var(--doaide-text)' }}>
                <span style={{ fontSize: '1.25rem', lineHeight: 1, flexShrink: 0 }}>{t.icon}</span>
                <span>
                  <strong style={{ display: 'block', fontSize: '0.85rem' }}>{t.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--doaide-text-muted)' }}>{t.desc}</span>
                </span>
              </a>
            ))}
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--doaide-gold)', textDecoration: 'none' }}>View all 40+ tools &rarr;</a>
          </p>
        </div>
      </section>

      <footer style={s.footer}>
        <p>DoAide TaxFile — Free tax & financial tools for India</p>
        <p style={{ marginTop: 4 }}>FY 2026-27 (AY 2027-28) • All calculations are indicative</p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
