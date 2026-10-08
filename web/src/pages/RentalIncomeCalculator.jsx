import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'

const formatINR = n => '₹' + Math.round(n).toLocaleString('en-IN')

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 24, marginTop: 40, marginBottom: 12, color: 'var(--doaide-text)' },
  h3: { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 8, color: 'var(--doaide-text)' },
  p: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16 },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  form: { display: 'grid', gap: 20, marginBottom: 32 },
  group: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 500, color: 'var(--doaide-text-secondary)' },
  labelHint: { fontSize: 12, color: 'var(--doaide-text-muted)', fontWeight: 400 },
  input: {
    padding: '12px 16px', background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', color: 'var(--doaide-text)', fontSize: 16,
    fontFamily: 'var(--doaide-font-mono)', outline: 'none', width: '100%', boxSizing: 'border-box',
  },
  btn: {
    padding: '14px 28px', background: 'var(--doaide-gold)', color: '#000', fontWeight: 700,
    fontSize: 16, borderRadius: 'var(--doaide-radius-md)', border: 'none', cursor: 'pointer',
    width: '100%',
  },
  result: {
    padding: 24, background: 'var(--doaide-surface)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, boxShadow: 'var(--doaide-shadow-gold)',
  },
  row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--doaide-border)', fontSize: 14 },
  rowLabel: { color: 'var(--doaide-text-secondary)' },
  rowValue: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 500 },
  total: { display: 'flex', justifyContent: 'space-between', padding: '14px 0 0', fontSize: 18, fontWeight: 600 },
  totalValue: { fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-gold)' },
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  tdMono: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
}

const FAQS = [
  { q: 'How is rental income taxed in India?', a: 'Rental income is taxed under "Income from House Property". You get a flat 30% standard deduction on net annual value (rent minus municipal taxes). Home loan interest is also deductible. The remaining amount is added to your total income and taxed at your slab rate.' },
  { q: 'What is the 30% standard deduction on rental income?', a: 'Under Section 24(a), you automatically get a 30% deduction on the Net Annual Value (rent received minus municipal taxes paid). This deduction covers maintenance, repairs, insurance, and other expenses — you don\'t need to show actual expenses.' },
  { q: 'Can I deduct home loan interest from rental income?', a: 'Yes. Under Section 24(b), interest paid on a home loan for the let-out property is fully deductible against rental income. There is no cap on interest deduction for let-out property (unlike ₹2L cap for self-occupied). This applies in both old and new regimes.' },
  { q: 'What if rental income is less than home loan interest?', a: 'If your rental income (after 30% standard deduction) is less than the home loan interest, you have a loss from house property. Under the old regime, you can set off up to ₹2 lakh of this loss against your other income. The remaining loss can be carried forward for 8 years.' },
  { q: 'Is rental income taxable under the new regime?', a: 'Yes, rental income is taxable under the new regime. You get the 30% standard deduction and can deduct home loan interest on let-out property. However, you cannot set off house property loss against other income under the new regime in most cases.' },
  { q: 'Do I need to pay tax if I rent out to family?', a: 'If the rent received is below the fair market rent, the Income Tax Department may consider the deemed rental value (Annual Letable Value) instead of actual rent. If you let out at below fair market value, the difference may be taxable.' },
]

export default function RentalIncomeCalculator() {
  const [annualRent, setAnnualRent] = useState('')
  const [municipalTax, setMunicipalTax] = useState('')
  const [loanInterest, setLoanInterest] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const rent = parseFloat(annualRent) || 0
    if (rent <= 0) return

    const mTax = parseFloat(municipalTax) || 0
    const interest = parseFloat(loanInterest) || 0

    const grossAnnualValue = rent
    const netAnnualValue = grossAnnualValue - mTax
    const standardDeduction = Math.round(netAnnualValue * 0.3)
    const incomeAfterStdDed = netAnnualValue - standardDeduction
    const taxableRentalIncome = incomeAfterStdDed - interest

    // Tax at different slabs (approximate, for illustration)
    const taxAt5 = Math.max(0, Math.round(taxableRentalIncome * 0.05))
    const taxAt20 = Math.max(0, Math.round(taxableRentalIncome * 0.20))
    const taxAt30 = Math.max(0, Math.round(taxableRentalIncome * 0.30))

    setResult({
      grossAnnualValue,
      municipalTaxes: mTax,
      netAnnualValue,
      standardDeduction,
      incomeAfterStdDed,
      homeLoanInterest: interest,
      taxableRentalIncome,
      taxAt5,
      taxAt20,
      taxAt30,
      isLoss: taxableRentalIncome < 0,
    })
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="Rental Income Tax Calculator India 2026 | DoAide TaxFile"
        description="Calculate tax on rental income with 30% standard deduction, municipal taxes, and home loan interest. See net taxable rental income for FY 2026-27."
        keywords="rental income calculator, rental income tax India, house property income tax, 30% standard deduction rental, home loan interest rental income"
        canonical="https://tax.doaide.com/calculators/rental-income"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Calculators', path: '/' }, { label: 'Rental Income Tax' }]} />

      <h1 style={s.title}>Rental Income Tax Calculator India 2026</h1>
      <p style={s.meta}>Calculate net taxable income from house property • FY 2026-27</p>

      <p style={s.p}>
        If you earn rental income from a let-out property, it is taxed under "Income from House Property."
        You get a flat 30% standard deduction on net annual value, plus you can deduct municipal taxes and
        home loan interest. Use this calculator to find your net taxable rental income.
      </p>

      <div style={s.form}>
        <div style={s.group}>
          <label style={s.label}>Annual Rent Received (₹) <span style={s.labelHint}>— Total rent for the year</span></label>
          <input
            style={s.input}
            type="number"
            placeholder="e.g. 600000"
            value={annualRent}
            onChange={e => setAnnualRent(e.target.value)}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={s.group}>
            <label style={s.label}>Municipal Taxes Paid (₹) <span style={s.labelHint}>— Property tax per year</span></label>
            <input
              style={s.input}
              type="number"
              placeholder="e.g. 15000"
              value={municipalTax}
              onChange={e => setMunicipalTax(e.target.value)}
            />
          </div>
          <div style={s.group}>
            <label style={s.label}>Home Loan Interest (₹) <span style={s.labelHint}>— Annual interest on this property</span></label>
            <input
              style={s.input}
              type="number"
              placeholder="e.g. 300000"
              value={loanInterest}
              onChange={e => setLoanInterest(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && calculate()}
            />
          </div>
        </div>
        <button style={s.btn} onClick={calculate}>Calculate Rental Income Tax</button>
      </div>

      {result && (
        <div style={s.result}>
          <div style={s.row}>
            <span style={s.rowLabel}>Gross Annual Value (Rent Received)</span>
            <span style={s.rowValue}>{formatINR(result.grossAnnualValue)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Less: Municipal Taxes</span>
            <span style={s.rowValue}>- {formatINR(result.municipalTaxes)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Net Annual Value</span>
            <span style={s.rowValue}>{formatINR(result.netAnnualValue)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Less: Standard Deduction (30%)</span>
            <span style={s.rowValue}>- {formatINR(result.standardDeduction)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Income After Standard Deduction</span>
            <span style={s.rowValue}>{formatINR(result.incomeAfterStdDed)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Less: Home Loan Interest (Sec 24b)</span>
            <span style={s.rowValue}>- {formatINR(result.homeLoanInterest)}</span>
          </div>
          <div style={s.total}>
            <span>{result.isLoss ? 'Loss from House Property' : 'Taxable Rental Income'}</span>
            <span style={{ ...s.totalValue, color: result.isLoss ? '#ef4444' : 'var(--doaide-gold)' }}>
              {result.isLoss ? '(' + formatINR(Math.abs(result.taxableRentalIncome)) + ')' : formatINR(result.taxableRentalIncome)}
            </span>
          </div>

          {!result.isLoss && result.taxableRentalIncome > 0 && (
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--doaide-border)' }}>
              <div style={{ fontSize: 13, color: 'var(--doaide-text-muted)', marginBottom: 8 }}>Estimated tax on this rental income:</div>
              <div style={s.row}>
                <span style={s.rowLabel}>At 5% slab</span>
                <span style={s.rowValue}>{formatINR(result.taxAt5)}</span>
              </div>
              <div style={s.row}>
                <span style={s.rowLabel}>At 20% slab</span>
                <span style={s.rowValue}>{formatINR(result.taxAt20)}</span>
              </div>
              <div style={s.row}>
                <span style={s.rowLabel}>At 30% slab</span>
                <span style={s.rowValue}>{formatINR(result.taxAt30)}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--doaide-text-muted)', marginTop: 8 }}>
                Actual tax depends on your total income. Use our{' '}
                <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> with your full income for exact computation.
              </div>
            </div>
          )}

          {result.isLoss && (
            <div style={{ marginTop: 16, fontSize: 14, color: 'var(--doaide-text-secondary)', lineHeight: 1.7 }}>
              You have a <strong>loss from house property</strong>. Under the old regime, up to ₹2,00,000 of this loss can be set off
              against your other income (salary, business, etc.), reducing your overall tax. Any excess loss can be carried forward for 8 years.
            </div>
          )}
        </div>
      )}

      <div style={s.callout}>
        <div style={s.calloutTitle}>How Rental Income Tax Works</div>
        <strong>Step 1:</strong> Start with annual rent received (Gross Annual Value)<br />
        <strong>Step 2:</strong> Subtract municipal taxes paid → Net Annual Value<br />
        <strong>Step 3:</strong> Flat 30% standard deduction (Section 24a) — covers all expenses<br />
        <strong>Step 4:</strong> Subtract home loan interest (Section 24b) — no cap for let-out property<br />
        <strong>Result:</strong> Taxable rental income (or loss) added to total income
      </div>

      <h2 style={s.h2}>Key Rules for Rental Income</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Rule</th>
              <th style={s.th}>Old Regime</th>
              <th style={s.th}>New Regime</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>30% Standard Deduction</td><td style={s.td}>Yes</td><td style={s.td}>Yes</td></tr>
            <tr><td style={s.td}>Municipal Tax Deduction</td><td style={s.td}>Yes</td><td style={s.td}>Yes</td></tr>
            <tr><td style={s.td}>Home Loan Interest (Let-out)</td><td style={s.td}>Full amount</td><td style={s.td}>Full amount</td></tr>
            <tr><td style={s.td}>Loss Set-off vs Other Income</td><td style={s.td}>Up to ₹2L</td><td style={s.td}>Limited</td></tr>
            <tr><td style={s.td}>Carry Forward of Loss</td><td style={s.td}>8 years</td><td style={s.td}>8 years</td></tr>
            <tr><td style={s.td}>Interest on Self-occupied</td><td style={s.tdMono}>₹2L cap</td><td style={s.td}>Not deductible</td></tr>
          </tbody>
        </table>
      </div>

      <p style={s.p}>
        Related tools: <Link to="/home-loan-calculator" style={s.link}>Home Loan Calculator</Link> •{' '}
        <Link to="/emi-calculator" style={s.link}>EMI Calculator</Link> •{' '}
        <Link to="/income-tax-calculator" style={s.link}>Income Tax Calculator</Link> •{' '}
        <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link>
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <ShareButtons text={`Rental Income Tax Calculator — Calculate your net taxable rental income\n\ntax.doaide.com/calculators/rental-income`} />
        <PrintButton />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
