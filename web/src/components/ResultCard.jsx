const s = {
  card: {
    background: 'var(--doaide-surface)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)',
    padding: 24,
    marginTop: 24,
  },
  goldBorder: {
    borderColor: 'var(--doaide-gold-dim)',
    boxShadow: 'var(--doaide-shadow-gold)',
  },
  title: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 22,
    marginBottom: 16,
    color: 'var(--doaide-text)',
  },
}

export default function ResultCard({ title, gold, children, style }) {
  return (
    <div style={{ ...s.card, ...(gold ? s.goldBorder : {}), ...style }}>
      {title && <h3 style={s.title}>{title}</h3>}
      {children}
    </div>
  )
}
