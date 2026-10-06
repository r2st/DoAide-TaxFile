import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateTDS, formatINR, formatPct } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 700, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 },
  btn: {
    marginTop: 24, padding: '12px 32px', background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    border: 'none', borderRadius: 'var(--doaide-radius-md)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
  },
  row: {
    display: 'flex', justifyContent: 'space-between', padding: '10px 0',
    borderBottom: '1px solid var(--doaide-border)', fontSize: 14,
  },
  rowLabel: { color: 'var(--doaide-text-secondary)' },
  rowValue: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 500 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14, marginTop: 32 },
  th: {
    textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--doaide-border)',
    color: 'var(--doaide-text-secondary)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
  },
  td: { padding: '10px 12px', borderBottom: '1px solid var(--doaide-border)', color: 'var(--doaide-text)' },
}

const INCOME_OPTIONS = [
  { value: 'salary', label: 'Salary' },
  { value: 'interest_bank', label: 'Bank Interest (Savings)' },
  { value: 'interest_fd', label: 'FD Interest' },
  { value: 'rent_individual', label: 'Rent (paid by individual)' },
  { value: 'rent_company', label: 'Rent (paid by company)' },
  { value: 'professional_fees', label: 'Professional Fees' },
  { value: 'commission', label: 'Commission / Brokerage' },
  { value: 'contractor_individual', label: 'Contractor (individual)' },
  { value: 'contractor_company', label: 'Contractor (company/firm)' },
  { value: 'lottery', label: 'Lottery / Game Winnings' },
]

const TDS_REFERENCE = [
  { type: 'Salary', section: '192', rate: 'Slab rate', threshold: '—' },
  { type: 'Bank Interest', section: '194A', rate: '10%', threshold: '₹40,000' },
  { type: 'Rent (Individual)', section: '194-IB', rate: '5%', threshold: '₹6,00,000/yr' },
  { type: 'Rent (Company)', section: '194-I', rate: '10%', threshold: '₹2,40,000/yr' },
  { type: 'Professional Fees', section: '194J', rate: '10%', threshold: '₹30,000' },
  { type: 'Commission', section: '194H', rate: '5%', threshold: '₹15,000' },
  { type: 'Contractor (Ind.)', section: '194C', rate: '1%', threshold: '₹30,000' },
  { type: 'Contractor (Co.)', section: '194C', rate: '2%', threshold: '₹30,000' },
  { type: 'Lottery', section: '194B', rate: '30%', threshold: '₹10,000' },
]

const FAQS = [
  { q: 'What is TDS?', a: 'TDS (Tax Deducted at Source) is a system where the payer deducts tax at a prescribed rate before making payment. The deducted amount is deposited with the government on behalf of the payee.' },
  { q: 'What happens if PAN is not provided?', a: 'If the payee does not provide their PAN to the deductor, TDS is deducted at 20% instead of the prescribed rate, whichever is higher.' },
  { q: 'How do I claim TDS credit?', a: 'TDS deducted appears in your Form 26AS and AIS (Annual Information Statement). You can claim credit for this TDS while filing your ITR. The tax already deducted reduces your final tax liability.' },
  { q: 'When is TDS not applicable?', a: 'TDS is not deducted if the payment is below the threshold limit for that category. You can also submit Form 15G/15H (for senior citizens) if your total income is below the taxable limit.' },
]

export default function TDSCalculator() {
  const [form, setForm] = useState({ incomeType: 'professional_fees', amount: '', hasPAN: true })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateTDS(form.incomeType, Number(form.amount) || 0, form.hasPAN)
    setResult(r)
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="TDS Calculator - Tax Deducted at Source Rates | DoAide TaxFile"
        description="Calculate TDS on salary, rent, professional fees, interest, and more. Current TDS rates and thresholds for FY 2026-27."
        keywords="TDS calculator, TDS rates, TDS on salary, TDS on rent, TDS on professional fees"
        canonical="https://tax.doaide.com/tds-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>TDS Calculator</h1>
      <p style={s.subtitle}>Calculate Tax Deducted at Source for any income type</p>

      <div style={s.form}>
        <InputField label="Income Type" type="select" value={form.incomeType} onChange={set('incomeType')} options={INCOME_OPTIONS} />
        <InputField label="Amount" value={form.amount} onChange={set('amount')} currency />
        <InputField label="PAN available with deductor" type="checkbox" value={form.hasPAN} onChange={set('hasPAN')} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate TDS</button>

      {result && (
        <ResultCard gold>
          <div style={s.row}>
            <span style={s.rowLabel}>Income Type</span>
            <span style={s.rowValue}>{INCOME_OPTIONS.find(o => o.value === result.incomeType)?.label}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Amount</span>
            <span style={s.rowValue}>{formatINR(result.amount)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Section</span>
            <span style={s.rowValue}>{result.section}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>TDS Rate</span>
            <span style={s.rowValue}>{result.rate != null ? formatPct(result.rate) : 'Slab rate'}</span>
          </div>
          {result.threshold != null && (
            <div style={s.row}>
              <span style={s.rowLabel}>Threshold</span>
              <span style={s.rowValue}>{formatINR(result.threshold)}</span>
            </div>
          )}
          <div style={{ ...s.row, borderBottom: 'none', fontSize: 16 }}>
            <span style={{ fontWeight: 600 }}>TDS Amount</span>
            <span style={{ fontFamily: 'var(--doaide-font-mono)', fontWeight: 600, color: 'var(--doaide-gold)' }}>
              {result.tds != null ? formatINR(result.tds) : '—'}
            </span>
          </div>
          {result.note && (
            <div style={{ padding: '8px 0', color: 'var(--doaide-text-secondary)', fontSize: 13 }}>{result.note}</div>
          )}
          {!form.hasPAN && result.tds > 0 && (
            <div style={{ padding: '8px 12px', background: 'rgba(248,113,113,0.1)', borderRadius: 'var(--doaide-radius-sm)', color: 'var(--doaide-error)', fontSize: 13, marginTop: 8 }}>
              Higher TDS rate of 20% applied as PAN is not available.
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <WhatsAppShare text={`TDS on ${INCOME_OPTIONS.find(o => o.value === result.incomeType)?.label}\nAmount: ${formatINR(result.amount)}\nTDS: ${result.tds != null ? formatINR(result.tds) : 'At slab rate'}\nSection: ${result.section}\n\ntax.doaide.com/tds-calculator`} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <div style={{ overflowX: 'auto' }}>
        <h3 style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 20, marginTop: 40, marginBottom: 8 }}>TDS Rate Reference</h3>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Income Type</th>
              <th style={s.th}>Section</th>
              <th style={s.th}>Rate</th>
              <th style={s.th}>Threshold</th>
            </tr>
          </thead>
          <tbody>
            {TDS_REFERENCE.map((r, i) => (
              <tr key={i}>
                <td style={s.td}>{r.type}</td>
                <td style={{ ...s.td, fontFamily: 'var(--doaide-font-mono)' }}>{r.section}</td>
                <td style={{ ...s.td, fontFamily: 'var(--doaide-font-mono)' }}>{r.rate}</td>
                <td style={{ ...s.td, fontFamily: 'var(--doaide-font-mono)' }}>{r.threshold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
