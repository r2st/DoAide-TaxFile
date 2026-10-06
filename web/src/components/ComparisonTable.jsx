import { formatINR } from '../lib/taxEngine'

const s = {
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginTop: 24,
  },
  column: {
    background: 'var(--doaide-surface)',
    border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-lg)',
    padding: 20,
  },
  winner: {
    borderColor: 'var(--doaide-gold-dim)',
    boxShadow: 'var(--doaide-shadow-gold)',
  },
  heading: {
    fontFamily: 'var(--doaide-font-display)',
    fontSize: 20,
    marginBottom: 4,
  },
  badge: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: 12,
    marginBottom: 16,
  },
  winnerBadge: {
    background: 'var(--doaide-gold-bg)',
    color: 'var(--doaide-gold)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid var(--doaide-border)',
    fontSize: 14,
  },
  rowLabel: {
    color: 'var(--doaide-text-secondary)',
  },
  rowValue: {
    fontFamily: 'var(--doaide-font-mono)',
    fontWeight: 500,
    color: 'var(--doaide-text)',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0 0',
    fontSize: 18,
    fontWeight: 600,
  },
  totalValue: {
    fontFamily: 'var(--doaide-font-mono)',
    color: 'var(--doaide-gold)',
  },
  savingsBanner: {
    gridColumn: '1 / -1',
    background: 'var(--doaide-gold-bg)',
    border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)',
    padding: '16px 20px',
    textAlign: 'center',
    fontSize: 16,
    color: 'var(--doaide-gold)',
    fontWeight: 600,
  },
}

function RegimeColumn({ data, isWinner, label }) {
  const rows = [
    ['Gross Income', data.grossIncome],
    ['Standard Deduction', data.standardDeduction],
  ]
  if (data.regime === 'old') {
    if (data.hraExemption > 0) rows.push(['HRA Exemption', data.hraExemption])
    if (data.section80C > 0) rows.push(['Section 80C', data.section80C])
    if (data.section80D > 0) rows.push(['Section 80D', data.section80D])
    if (data.homeLoanInterest > 0) rows.push(['Home Loan Interest', data.homeLoanInterest])
    if (data.nps80CCD1B > 0) rows.push(['NPS 80CCD(1B)', data.nps80CCD1B])
    if (data.otherDeductions > 0) rows.push(['Other Deductions', data.otherDeductions])
  }
  rows.push(
    ['Total Deductions', data.deductionsTotal],
    ['Taxable Income', data.taxableIncome],
    ['Tax on Income', data.taxOnIncome],
  )
  if (data.rebate87A > 0) rows.push(['Section 87A Rebate', data.rebate87A])
  rows.push(['Tax After Rebate', data.taxAfterRebate])
  if (data.surcharge > 0) rows.push(['Surcharge', data.surcharge])
  rows.push(['Health & Edu. Cess (4%)', data.cess])

  return (
    <div style={{ ...s.column, ...(isWinner ? s.winner : {}) }}>
      <h3 style={s.heading}>{label}</h3>
      {isWinner && <span style={{ ...s.badge, ...s.winnerBadge }}>RECOMMENDED</span>}
      {!isWinner && <span style={{ ...s.badge, color: 'var(--doaide-text-muted)' }}>—</span>}
      {rows.map(([lbl, val], i) => (
        <div key={i} style={s.row}>
          <span style={s.rowLabel}>{lbl}</span>
          <span style={s.rowValue}>{formatINR(val)}</span>
        </div>
      ))}
      <div style={s.total}>
        <span>Total Tax</span>
        <span style={s.totalValue}>{formatINR(data.totalTax)}</span>
      </div>
    </div>
  )
}

export default function ComparisonTable({ newRegime, oldRegime, recommended, savings }) {
  return (
    <div>
      <div style={s.wrapper}>
        <RegimeColumn data={newRegime} isWinner={recommended === 'new'} label="New Regime" />
        <RegimeColumn data={oldRegime} isWinner={recommended === 'old'} label="Old Regime" />
        {savings > 0 && (
          <div style={s.savingsBanner}>
            You save {formatINR(savings)} with the {recommended === 'new' ? 'New' : 'Old'} Regime
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
