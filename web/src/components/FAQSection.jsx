import { useState } from 'react'

const s = {
  section: {
    marginTop: 48,
    borderTop: '1px solid var(--doaide-border)',
    paddingTop: 32,
  },
  heading: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 24,
    marginBottom: 16,
  },
  item: {
    borderBottom: '1px solid var(--doaide-border)',
  },
  question: {
    width: '100%',
    background: 'none',
    border: 'none',
    padding: '16px 0',
    color: 'var(--doaide-text)',
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  answer: {
    padding: '0 0 16px',
    color: 'var(--doaide-text-secondary)',
    fontSize: 14,
    lineHeight: 1.7,
  },
  arrow: {
    transition: 'transform var(--doaide-transition)',
    color: 'var(--doaide-text-muted)',
    fontSize: 18,
    flexShrink: 0,
    marginLeft: 12,
  },
}

export default function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null)

  return (
    <section style={s.section}>
      <h2 style={s.heading}>Frequently Asked Questions</h2>
      {faqs.map((faq, i) => (
        <div key={i} style={s.item}>
          <button style={s.question} onClick={() => setOpen(open === i ? null : i)}>
            <span>{faq.q}</span>
            <span style={{ ...s.arrow, transform: open === i ? 'rotate(180deg)' : 'none' }}>▾</span>
          </button>
          {open === i && <div style={s.answer}>{faq.a}</div>}
        </div>
      ))}
    </section>
  )
}
