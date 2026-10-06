import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { path: '/income-tax-calculator', label: 'Tax Calculator' },
  { path: '/itr-form-selector', label: 'ITR Selector' },
  { path: '/hra-calculator', label: 'HRA' },
  { path: '/80c-planner', label: '80C Planner' },
  { path: '/capital-gains-calculator', label: 'Capital Gains' },
  { path: '/tds-calculator', label: 'TDS' },
  { path: '/advance-tax-calculator', label: 'Advance Tax' },
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

      <footer style={s.footer}>
        <p>DoAide TaxFile — Free income tax tools for India</p>
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
