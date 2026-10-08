import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'

const formatINR = n => '₹' + n.toLocaleString('en-IN')

const STATES = {
  'Andhra Pradesh': { male: 5, female: 5, joint: 5, reg: 0.5 },
  'Arunachal Pradesh': { male: 6, female: 6, joint: 6, reg: 1 },
  'Assam': { male: 8.25, female: 8.25, joint: 8.25, reg: 1 },
  'Bihar': { male: 6.3, female: 6.3, joint: 6.3, reg: 1 },
  'Chhattisgarh': { male: 5, female: 4, joint: 4.5, reg: 1 },
  'Delhi': { male: 6, female: 4, joint: 5, reg: 1 },
  'Goa': { male: 3.5, female: 3.5, joint: 3.5, reg: 1 },
  'Gujarat': { male: 4.9, female: 4.9, joint: 4.9, reg: 1 },
  'Haryana': { male: 7, female: 5, joint: 6, reg: 1 },
  'Himachal Pradesh': { male: 6, female: 4, joint: 5, reg: 1 },
  'Jharkhand': { male: 4, female: 4, joint: 4, reg: 1 },
  'Karnataka': { male: 5, female: 5, joint: 5, reg: 1 },
  'Kerala': { male: 8, female: 8, joint: 8, reg: 2 },
  'Madhya Pradesh': { male: 7.5, female: 7.5, joint: 7.5, reg: 1 },
  'Maharashtra': { male: 5, female: 5, joint: 5, reg: 1 },
  'Manipur': { male: 7, female: 7, joint: 7, reg: 1 },
  'Meghalaya': { male: 9.9, female: 9.9, joint: 9.9, reg: 1 },
  'Mizoram': { male: 5, female: 5, joint: 5, reg: 1 },
  'Nagaland': { male: 8.25, female: 8.25, joint: 8.25, reg: 1 },
  'Odisha': { male: 5, female: 4, joint: 4.5, reg: 1 },
  'Punjab': { male: 7, female: 5, joint: 6, reg: 1 },
  'Rajasthan': { male: 6, female: 5, joint: 5.5, reg: 1 },
  'Sikkim': { male: 5, female: 5, joint: 5, reg: 1 },
  'Tamil Nadu': { male: 7, female: 7, joint: 7, reg: 1 },
  'Telangana': { male: 4, female: 4, joint: 4, reg: 0.5 },
  'Tripura': { male: 5, female: 5, joint: 5, reg: 1 },
  'Uttar Pradesh': { male: 7, female: 6, joint: 7, reg: 1 },
  'Uttarakhand': { male: 5, female: 3.75, joint: 5, reg: 1 },
  'West Bengal': { male: 7, female: 7, joint: 7, reg: 1 },
  'Chandigarh': { male: 6, female: 4, joint: 5, reg: 1 },
  'Jammu & Kashmir': { male: 5, female: 3, joint: 4, reg: 1 },
  'Ladakh': { male: 5, female: 3, joint: 4, reg: 1 },
  'Puducherry': { male: 5, female: 5, joint: 5, reg: 1 },
}

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 24, marginTop: 40, marginBottom: 12, color: 'var(--doaide-text)' },
  p: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16 },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  form: { display: 'grid', gap: 20, marginBottom: 32 },
  group: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 500, color: 'var(--doaide-text-secondary)' },
  input: {
    padding: '12px 16px', background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', color: 'var(--doaide-text)', fontSize: 16,
    fontFamily: 'var(--doaide-font-mono)', outline: 'none', width: '100%', boxSizing: 'border-box',
  },
  select: {
    padding: '12px 16px', background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', color: 'var(--doaide-text)', fontSize: 14,
    outline: 'none', width: '100%', boxSizing: 'border-box', cursor: 'pointer',
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
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 13 },
  th: { textAlign: 'left', padding: '8px 6px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '8px 6px', borderBottom: '1px solid var(--doaide-border)', fontSize: 13 },
  tdMono: { padding: '8px 6px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)', fontSize: 13 },
}

const FAQS = [
  { q: 'What is stamp duty?', a: 'Stamp duty is a tax levied by state governments on property transactions. It is charged as a percentage of the property value and must be paid during registration to make the sale deed legally valid.' },
  { q: 'Is stamp duty the same across India?', a: 'No. Stamp duty rates vary by state, property type, ownership gender, and sometimes property value. Rates typically range from 3% to 10% depending on the state.' },
  { q: 'Do women get lower stamp duty rates?', a: 'Yes, in many states like Delhi (4% vs 6%), Haryana (5% vs 7%), Rajasthan (5% vs 6%), and others, women buyers pay lower stamp duty. Registering property in a woman\'s name can save significant amounts.' },
  { q: 'Can I claim stamp duty as tax deduction?', a: 'Yes, stamp duty and registration charges paid for a residential property are deductible under Section 80C of the Income Tax Act (old regime), subject to the overall ₹1.5 lakh limit. This deduction is available only in the financial year of payment.' },
  { q: 'What is the difference between stamp duty and registration charges?', a: 'Stamp duty is a state tax on the transaction. Registration charges are a separate fee for registering the property with the sub-registrar\'s office, typically 1% of the property value (sometimes capped). Both must be paid.' },
  { q: 'Is stamp duty applicable on resale property?', a: 'Yes, stamp duty is applicable on every property transaction — new or resale. It is calculated on the higher of the agreement value or the circle rate (government-assessed minimum value).' },
]

export default function StampDutyCalculator() {
  const [state, setState] = useState('Maharashtra')
  const [propertyType, setPropertyType] = useState('residential')
  const [ownership, setOwnership] = useState('male')
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const v = parseFloat(value)
    if (!v || v <= 0) return
    const rates = STATES[state]
    if (!rates) return

    let dutyRate = rates[ownership] || rates.male
    // Commercial properties may have slightly higher rates in some states
    if (propertyType === 'commercial') dutyRate = Math.min(dutyRate + 1, 10)
    if (propertyType === 'agricultural') dutyRate = Math.max(dutyRate - 1, 2)

    const stampDuty = Math.round(v * dutyRate / 100)
    const regRate = rates.reg || 1
    const registration = Math.round(v * regRate / 100)
    const total = stampDuty + registration

    setResult({ stampDuty, registration, total, dutyRate, regRate, propertyValue: v })
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="Stamp Duty Calculator India 2026 — State-wise Rates | DoAide TaxFile"
        description="Calculate stamp duty and registration charges for property purchase in India. State-wise rates for male, female, and joint ownership."
        keywords="stamp duty calculator India, stamp duty rates 2026, registration charges calculator, property stamp duty, state wise stamp duty"
        canonical="https://tax.doaide.com/calculators/stamp-duty"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Calculators', path: '/' }, { label: 'Stamp Duty' }]} />

      <h1 style={s.title}>Stamp Duty Calculator India 2026</h1>
      <p style={s.meta}>State-wise stamp duty & registration charges • Updated October 2026</p>

      <p style={s.p}>
        Calculate stamp duty and registration charges for your property purchase. Rates vary by state, property type,
        and ownership gender. Women buyers get lower rates in many states.
      </p>

      <div style={s.form}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={s.group}>
            <label style={s.label}>State / UT</label>
            <select style={s.select} value={state} onChange={e => setState(e.target.value)}>
              {Object.keys(STATES).map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
          <div style={s.group}>
            <label style={s.label}>Property Type</label>
            <select style={s.select} value={propertyType} onChange={e => setPropertyType(e.target.value)}>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="agricultural">Agricultural</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={s.group}>
            <label style={s.label}>Ownership</label>
            <select style={s.select} value={ownership} onChange={e => setOwnership(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="joint">Joint (Male + Female)</option>
            </select>
          </div>
          <div style={s.group}>
            <label style={s.label}>Property Value (₹)</label>
            <input
              style={s.input}
              type="number"
              placeholder="e.g. 5000000"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && calculate()}
            />
          </div>
        </div>

        <button style={s.btn} onClick={calculate}>Calculate Stamp Duty</button>
      </div>

      {result && (
        <div style={s.result}>
          <div style={s.row}>
            <span style={s.rowLabel}>Property Value</span>
            <span style={s.rowValue}>{formatINR(result.propertyValue)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Stamp Duty ({result.dutyRate}%)</span>
            <span style={s.rowValue}>{formatINR(result.stampDuty)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Registration Charges ({result.regRate}%)</span>
            <span style={s.rowValue}>{formatINR(result.registration)}</span>
          </div>
          <div style={s.total}>
            <span>Total Payable</span>
            <span style={s.totalValue}>{formatINR(result.total)}</span>
          </div>
        </div>
      )}

      <div style={s.callout}>
        <div style={s.calloutTitle}>Tax Saving Tip</div>
        Stamp duty and registration charges are deductible under <strong>Section 80C</strong> (old regime) in the year of purchase,
        subject to the ₹1.5 lakh limit. Registering in a woman's name can reduce stamp duty significantly in states like
        Delhi, Haryana, Rajasthan, and UP.
      </div>

      <h2 style={s.h2}>State-wise Stamp Duty Rates 2026</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>State</th>
              <th style={{ ...s.th, textAlign: 'right' }}>Male</th>
              <th style={{ ...s.th, textAlign: 'right' }}>Female</th>
              <th style={{ ...s.th, textAlign: 'right' }}>Joint</th>
              <th style={{ ...s.th, textAlign: 'right' }}>Reg.</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(STATES).map(([name, r]) => (
              <tr key={name}>
                <td style={s.td}>{name}</td>
                <td style={{ ...s.tdMono, textAlign: 'right' }}>{r.male}%</td>
                <td style={{ ...s.tdMono, textAlign: 'right' }}>{r.female}%</td>
                <td style={{ ...s.tdMono, textAlign: 'right' }}>{r.joint}%</td>
                <td style={{ ...s.tdMono, textAlign: 'right' }}>{r.reg}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ ...s.p, fontSize: 13, fontStyle: 'italic' }}>
        Note: Rates are indicative and may vary based on municipal area, property value thresholds, and local surcharges.
        Always verify with your local sub-registrar before transaction.
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <ShareButtons text={`Stamp Duty Calculator — Check state-wise rates for property purchase\n\ntax.doaide.com/calculators/stamp-duty`} />
        <PrintButton />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
