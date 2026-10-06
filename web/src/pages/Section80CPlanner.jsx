import { useState, useMemo } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import FAQSection from '../components/FAQSection'
import { plan80C, INVESTMENT_OPTIONS, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 },
  progress: { marginTop: 24 },
  progressBar: {
    height: 12, borderRadius: 6, background: 'var(--doaide-bg-alt)',
    overflow: 'hidden', marginTop: 8,
  },
  progressFill: {
    height: '100%', borderRadius: 6, transition: 'width 0.3s ease',
    background: 'linear-gradient(90deg, var(--doaide-gold-dim), var(--doaide-gold))',
  },
  progressLabel: {
    display: 'flex', justifyContent: 'space-between', fontSize: 13,
    color: 'var(--doaide-text-secondary)', marginTop: 6,
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14, marginTop: 24 },
  th: {
    textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--doaide-border)',
    color: 'var(--doaide-text-secondary)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
  },
  td: {
    padding: '10px 12px', borderBottom: '1px solid var(--doaide-border)',
    color: 'var(--doaide-text)',
  },
  highlight: { color: 'var(--doaide-gold)', fontWeight: 600 },
}

const FAQS = [
  { q: 'What investments qualify under Section 80C?', a: 'Section 80C allows deductions up to ₹1.5 lakh for investments in PPF, ELSS, NSC, tax-saver FDs (5 years), SCSS, Sukanya Samriddhi, life insurance premium, EPF, home loan principal repayment, and tuition fees for up to 2 children.' },
  { q: 'What is Section 80CCD(1B)?', a: 'Section 80CCD(1B) provides an additional deduction of up to ₹50,000 for NPS (National Pension System) contributions, over and above the ₹1.5 lakh limit of Section 80C.' },
  { q: 'Can I claim 80C in the new tax regime?', a: 'No. Most deductions including Section 80C, 80D, and HRA are not available under the new tax regime. Only the standard deduction of ₹75,000 is available under the new regime.' },
  { q: 'Which 80C investment gives the best returns?', a: 'ELSS mutual funds historically offer the highest returns (~12% CAGR) with the shortest lock-in of 3 years. However, they carry market risk. For risk-averse investors, PPF (7.1%, 15 years) or SCSS (8.2%, 5 years) are good options.' },
]

export default function Section80CPlanner() {
  const [inv, setInv] = useState({
    ppf: '', elss: '', nsc: '', taxSaverFD: '', lic: '',
    tuitionFees: '', homeLoanPrincipal: '', scss: '', sukanya: '', other: '', nps80CCD1B: '',
  })
  const set = (k) => (v) => setInv(f => ({ ...f, [k]: v }))

  const result = useMemo(() => {
    const mapped = {}
    for (const [k, v] of Object.entries(inv)) mapped[k] = Number(v) || 0
    return plan80C(mapped)
  }, [inv])

  const pct = Math.min((result.totalInvested / 150000) * 100, 100)

  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80C Investment Planner - Tax Saving Calculator | DoAide TaxFile"
        description="Plan your Section 80C investments for maximum tax savings. Track your ₹1.5 lakh limit with PPF, ELSS, NSC, FD, and more."
        keywords="80C investment planner, 80C tax saving, PPF ELSS tax saving, Section 80C limit"
        canonical="https://tax.doaide.com/80c-planner"
      />

      <h1 style={s.title}>Section 80C Investment Planner</h1>
      <p style={s.subtitle}>Track your ₹1,50,000 limit and plan optimal investments</p>

      <div style={s.form}>
        <InputField label="PPF" value={inv.ppf} onChange={set('ppf')} currency hint="7.1% p.a., 15yr lock-in" />
        <InputField label="ELSS Mutual Funds" value={inv.elss} onChange={set('elss')} currency hint="~12% p.a., 3yr lock-in" />
        <InputField label="NSC" value={inv.nsc} onChange={set('nsc')} currency hint="7.7% p.a., 5yr lock-in" />
        <InputField label="Tax Saver FD" value={inv.taxSaverFD} onChange={set('taxSaverFD')} currency hint="6.5-7.5%, 5yr lock-in" />
        <InputField label="LIC Premium" value={inv.lic} onChange={set('lic')} currency />
        <InputField label="Tuition Fees" value={inv.tuitionFees} onChange={set('tuitionFees')} currency hint="Max 2 children" />
        <InputField label="Home Loan Principal" value={inv.homeLoanPrincipal} onChange={set('homeLoanPrincipal')} currency />
        <InputField label="SCSS" value={inv.scss} onChange={set('scss')} currency hint="8.2% p.a., 5yr lock-in" />
        <InputField label="Sukanya Samriddhi" value={inv.sukanya} onChange={set('sukanya')} currency hint="8.2% p.a." />
        <InputField label="Other 80C" value={inv.other} onChange={set('other')} currency />
        <InputField label="NPS (80CCD 1B)" value={inv.nps80CCD1B} onChange={set('nps80CCD1B')} currency hint="Separate ₹50,000 limit" />
      </div>

      <div style={s.progress}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Section 80C Utilization</span>
          <span style={{ fontFamily: 'var(--doaide-font-mono)', fontSize: 14, color: 'var(--doaide-gold)' }}>
            {formatINR(Math.min(result.totalInvested, 150000))} / {formatINR(150000)}
          </span>
        </div>
        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${pct}%` }} />
        </div>
        <div style={s.progressLabel}>
          <span>{pct.toFixed(0)}% utilized</span>
          <span>Remaining: {formatINR(result.remaining80C)}</span>
        </div>
      </div>

      {result.nps80CCD1B > 0 && (
        <ResultCard style={{ marginTop: 16 }}>
          <div style={{ fontSize: 14 }}>
            <span style={{ color: 'var(--doaide-text-secondary)' }}>NPS 80CCD(1B): </span>
            <span style={{ fontFamily: 'var(--doaide-font-mono)', fontWeight: 500 }}>{formatINR(result.nps80CCD1B)}</span>
            <span style={{ color: 'var(--doaide-text-muted)', marginLeft: 8 }}>/ {formatINR(50000)}</span>
          </div>
          <div style={{ fontSize: 14, marginTop: 8 }}>
            <span style={{ color: 'var(--doaide-text-secondary)' }}>Total Deduction (80C + NPS): </span>
            <span style={s.highlight}>{formatINR(result.totalDeduction)}</span>
          </div>
        </ResultCard>
      )}

      <ResultCard title="Investment Options Comparison" style={{ marginTop: 24, overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Investment</th>
              <th style={s.th}>Returns</th>
              <th style={s.th}>Lock-in</th>
              <th style={s.th}>Risk</th>
              <th style={s.th}>Max Annual</th>
            </tr>
          </thead>
          <tbody>
            {INVESTMENT_OPTIONS.map(opt => (
              <tr key={opt.name}>
                <td style={{ ...s.td, fontWeight: 500 }}>{opt.name}</td>
                <td style={{ ...s.td, fontFamily: 'var(--doaide-font-mono)' }}>{opt.returns}</td>
                <td style={s.td}>{opt.lockIn}</td>
                <td style={s.td}>{opt.risk}</td>
                <td style={{ ...s.td, fontFamily: 'var(--doaide-font-mono)' }}>{opt.maxAnnual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ResultCard>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
