import { useState } from 'react'

const s = {
  wrapper: {
    marginTop: 24,
    marginBottom: 32,
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: 'var(--doaide-gold)',
    fontSize: 14,
    fontWeight: 500,
  },
  arrow: {
    transition: 'transform var(--doaide-transition)',
    fontSize: 12,
  },
  content: {
    marginTop: 12,
    padding: 20,
    background: 'var(--doaide-surface)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)',
  },
  stepList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  step: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'var(--doaide-gold-bg)',
    color: 'var(--doaide-gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 0,
  },
  stepText: {
    fontSize: 14,
    color: 'var(--doaide-text-secondary)',
    lineHeight: 1.6,
    paddingTop: 2,
  },
}

export default function HowItWorks({ steps }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={s.wrapper} className="no-print">
      <button style={s.toggle} onClick={() => setOpen(!open)}>
        <span style={{ ...s.arrow, transform: open ? 'rotate(90deg)' : 'none' }}>▶</span>
        How it works
      </button>
      {open && (
        <div style={s.content}>
          <ol style={s.stepList}>
            {steps.map((step, i) => (
              <li key={i} style={s.step}>
                <span style={s.stepNum}>{i + 1}</span>
                <span style={s.stepText}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
