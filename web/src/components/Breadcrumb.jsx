import { Link } from 'react-router-dom'

const s = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    fontSize: 13,
    flexWrap: 'wrap',
  },
  link: {
    color: 'var(--doaide-text-muted)',
    textDecoration: 'none',
    transition: 'color var(--doaide-transition)',
  },
  sep: {
    color: 'var(--doaide-text-muted)',
    fontSize: 11,
  },
  current: {
    color: 'var(--doaide-text-secondary)',
    fontWeight: 500,
  },
}

export default function Breadcrumb({ items }) {
  return (
    <nav style={s.nav} aria-label="Breadcrumb" className="no-print">
      <Link to="/" style={s.link}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--doaide-gold)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--doaide-text-muted)' }}
      >
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={s.sep}>›</span>
          {i === items.length - 1 ? (
            <span style={s.current}>{item.label}</span>
          ) : (
            <Link to={item.path} style={s.link}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--doaide-gold)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--doaide-text-muted)' }}
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
