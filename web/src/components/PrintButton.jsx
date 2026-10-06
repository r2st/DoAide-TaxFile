const s = {
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 20px',
    background: 'var(--doaide-surface)',
    color: 'var(--doaide-text)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all var(--doaide-transition)',
  },
}

export default function PrintButton() {
  return (
    <button style={s.btn} onClick={() => window.print()} className="no-print">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
      Print
    </button>
  )
}
