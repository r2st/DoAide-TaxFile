import { useCallback, useMemo, useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  section: { marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--doaide-border)' },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 12 },
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
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  addBtn: {
    marginTop: 12, padding: '8px 16px', background: 'none', border: '1px dashed var(--doaide-border)',
    borderRadius: 'var(--doaide-radius-md)', color: 'var(--doaide-text-secondary)', cursor: 'pointer', width: '100%',
  },
  removeBtn: {
    background: 'none', border: 'none', color: 'var(--doaide-text-muted)',
    cursor: 'pointer', fontSize: 13, padding: '2px 8px',
  },
  entryHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8,
  },
  infoBox: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
  },
  actions: { display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' },
}

const DEDUCTION_TYPES = [
  { value: '100_no_limit', label: '100% without limit', pct: 1.0, limited: false },
  { value: '50_no_limit', label: '50% without limit', pct: 0.5, limited: false },
  { value: '100_with_limit', label: '100% with qualifying limit', pct: 1.0, limited: true },
  { value: '50_with_limit', label: '50% with qualifying limit', pct: 0.5, limited: true },
]

const COMMON_INSTITUTIONS = [
  { name: 'PM National Relief Fund', type: '100_no_limit' },
  { name: 'PM CARES Fund', type: '100_no_limit' },
  { name: 'National Defence Fund', type: '100_no_limit' },
  { name: 'National Children\'s Fund', type: '100_no_limit' },
  { name: 'Swachh Bharat Kosh', type: '100_no_limit' },
  { name: 'Clean Ganga Fund', type: '100_no_limit' },
  { name: 'India Olympic Association', type: '100_no_limit' },
  { name: 'Government/local authority (approved)', type: '50_no_limit' },
  { name: 'Approved charitable trust (Section 12AA)', type: '50_with_limit' },
  { name: 'Approved NGO/institution', type: '50_with_limit' },
]

const FAQS = [
  { q: 'What is Section 80G deduction?', a: 'Section 80G allows tax deductions for donations made to approved charitable institutions and funds. The deduction can be 100% or 50% of the donated amount, with or without a qualifying limit, depending on the recipient organization. This deduction is available only under the old tax regime.' },
  { q: 'What is the qualifying limit under 80G?', a: 'For donations "with qualifying limit", the deduction is restricted to 10% of your Adjusted Gross Total Income (AGTI). For example, if your gross income is ₹10 lakh, the maximum qualifying donation amount is ₹1 lakh, and at 50% deduction rate, you can claim ₹50,000.' },
  { q: 'Is Section 80G available under the new regime?', a: 'No, Section 80G deduction is NOT available under the new tax regime. If you make significant charitable donations, you should compare whether the old regime (with 80G and other deductions) saves more tax than the new regime.' },
  { q: 'What proof is needed for 80G deduction?', a: 'You need a receipt from the donee institution with their name, PAN, registration number (12AA/12AB), and 80G approval details. For donations above ₹2,000, only non-cash (cheque/online) payments are eligible. Cash donations above ₹2,000 are not deductible.' },
  { q: 'Can I claim 80G for donations to temples and religious trusts?', a: 'Yes, if the temple or religious trust has 80G approval and is registered under Section 12AA/12AB. The deduction is typically 50% with qualifying limit. Donations to non-approved religious institutions are not eligible.' },
]

export default function Section80GCalculator() {
  const [grossIncome, setGrossIncome] = useState('')
  const [donations, setDonations] = useState([
    { name: '', amount: '', type: '50_with_limit' },
  ])

  const addDonation = useCallback(() => {
    setDonations(prev => [...prev, { name: '', amount: '', type: '50_with_limit' }])
  }, [])

  const removeDonation = useCallback((i) => {
    setDonations(prev => prev.length > 1 ? prev.filter((_, j) => j !== i) : prev)
  }, [])

  const updateDonation = useCallback((i, field, value) => {
    setDonations(prev => prev.map((d, j) => j === i ? { ...d, [field]: value } : d))
  }, [])

  const prefillDonation = useCallback((i, inst) => {
    setDonations(prev => prev.map((d, j) => j === i ? { ...d, name: inst.name, type: inst.type } : d))
  }, [])

  const result = useMemo(() => {
    const income = Number(grossIncome) || 0
    if (income <= 0) return null

    const qualifyingLimit = Math.round(income * 0.10)
    let totalDonation = 0
    let totalDeduction = 0
    const breakdown = []

    for (const d of donations) {
      const amt = Number(d.amount) || 0
      if (amt <= 0) continue
      const typeInfo = DEDUCTION_TYPES.find(t => t.value === d.type)
      if (!typeInfo) continue

      totalDonation += amt
      let qualifyingAmount = amt
      if (typeInfo.limited) {
        qualifyingAmount = amt
      }
      const deduction = Math.round(qualifyingAmount * typeInfo.pct)
      breakdown.push({ name: d.name || 'Unnamed', amount: amt, type: typeInfo.label, deduction, pct: typeInfo.pct, limited: typeInfo.limited })
    }

    let limitedTotal = 0
    let unlimitedDeduction = 0
    const finalBreakdown = breakdown.map(b => {
      if (!b.limited) {
        unlimitedDeduction += b.deduction
        return { ...b, finalDeduction: b.deduction, cappedBy: null }
      }
      limitedTotal += b.deduction
      return b
    })

    const limitedCap = qualifyingLimit
    const limitedScale = limitedTotal > 0 && limitedTotal > limitedCap ? limitedCap / limitedTotal : 1

    let totalFinalDeduction = unlimitedDeduction
    const processed = finalBreakdown.map(b => {
      if (!b.limited) return b
      const final = Math.round(b.deduction * limitedScale)
      totalFinalDeduction += final
      return { ...b, finalDeduction: final, cappedBy: limitedScale < 1 ? '10% of AGTI' : null }
    })

    const taxSaving30 = Math.round(totalFinalDeduction * 0.312)
    const taxSaving20 = Math.round(totalFinalDeduction * 0.208)

    return {
      grossIncome: income,
      qualifyingLimit,
      totalDonation,
      totalDeduction: totalFinalDeduction,
      breakdown: processed,
      taxSaving30,
      taxSaving20,
    }
  }, [grossIncome, donations])

  const shareText = result ? `Section 80G Deduction: ${formatINR(result.totalDeduction)} on donations of ${formatINR(result.totalDonation)}\nTax Saving: ${formatINR(result.taxSaving30)} (30% slab)\n\ntax.doaide.com/80g-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80G Calculator - Donation Tax Benefit | DoAide TaxFile"
        description="Calculate Section 80G tax deduction for charitable donations. Add multiple donations, see qualifying limits, and calculate tax savings. Free, instant results."
        keywords="80G calculator, Section 80G deduction, donation tax benefit, charitable donation tax, 80G tax saving"
        canonical="https://tax.doaide.com/80g-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Section 80G Calculator</h1>
      <p style={s.subtitle}>Donation Tax Benefit — Calculate your deduction for charitable donations (Old Regime only)</p>

      <InputField label="Gross Total Income (Annual)" value={grossIncome} onChange={setGrossIncome} currency />

      <div style={s.section}>
        <div style={s.sectionTitle}>Your Donations</div>

        {donations.map((d, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 12 }}>
            <div style={s.entryHeader}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--doaide-text-secondary)' }}>Donation #{i + 1}</span>
              {donations.length > 1 && <button style={s.removeBtn} onClick={() => removeDonation(i)}>Remove</button>}
            </div>
            <div style={s.form}>
              <InputField label="Institution Name" type="text" value={d.name} onChange={(v) => updateDonation(i, 'name', v)} placeholder="e.g. PM CARES Fund" />
              <InputField label="Donation Amount" value={d.amount} onChange={(v) => updateDonation(i, 'amount', v)} currency />
              <InputField
                label="Deduction Category"
                type="select"
                value={d.type}
                onChange={(v) => updateDonation(i, 'type', v)}
                options={DEDUCTION_TYPES.map(t => ({ value: t.value, label: t.label }))}
              />
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {COMMON_INSTITUTIONS.slice(0, 5).map(inst => (
                <button
                  key={inst.name}
                  onClick={() => prefillDonation(i, inst)}
                  style={{ fontSize: 11, padding: '3px 8px', background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)', borderRadius: 4, color: 'var(--doaide-text-secondary)', cursor: 'pointer' }}
                >
                  {inst.name}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button style={s.addBtn} onClick={addDonation}>+ Add Another Donation</button>
      </div>

      {result && (
        <>
          <ResultCard title="Section 80G Deduction Summary" gold>
            <div style={s.row}><span style={s.rowLabel}>Gross Total Income</span><span style={s.rowValue}>{formatINR(result.grossIncome)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Qualifying Limit (10% of AGTI)</span><span style={s.rowValue}>{formatINR(result.qualifyingLimit)}</span></div>
            <div style={s.row}><span style={s.rowLabel}>Total Donations</span><span style={s.rowValue}>{formatINR(result.totalDonation)}</span></div>
            <div style={{ ...s.row, fontWeight: 600, fontSize: 16, borderBottom: 'none' }}>
              <span>Total Deduction</span>
              <span style={s.highlight}>{formatINR(result.totalDeduction)}</span>
            </div>

            {result.breakdown.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8, textTransform: 'uppercase' }}>Donation-wise Breakdown</div>
                {result.breakdown.map((b, i) => (
                  <div key={i} style={{ ...s.row, flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span style={s.rowLabel}>{b.name} ({b.type})</span>
                      <span style={s.rowValue}>{formatINR(b.finalDeduction)}</span>
                    </div>
                    {b.cappedBy && (
                      <span style={{ fontSize: 11, color: 'var(--doaide-text-muted)' }}>Capped by {b.cappedBy}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={s.section}>
              <div style={s.sectionTitle}>Estimated Tax Savings</div>
              <div style={s.row}><span style={s.rowLabel}>At 30% slab (+ cess)</span><span style={{ ...s.rowValue, color: 'var(--doaide-gold)' }}>{formatINR(result.taxSaving30)}</span></div>
              <div style={s.row}><span style={s.rowLabel}>At 20% slab (+ cess)</span><span style={s.rowValue}>{formatINR(result.taxSaving20)}</span></div>
            </div>

            <div style={s.infoBox}>
              <strong>Important Notes:</strong>
              <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 2 }}>
                <li>Section 80G is available only under the <strong>Old Tax Regime</strong></li>
                <li>Cash donations above ₹2,000 are not eligible for deduction</li>
                <li>Donations must be to approved institutions with 80G certification</li>
                <li>Keep donation receipts with institution PAN and 80G registration number</li>
              </ul>
            </div>
          </ResultCard>

          <div style={s.actions}>
            <WhatsAppShare text={shareText} />
            <PrintButton />
          </div>
        </>
      )}

      <ResultCard title="Common 80G-Eligible Institutions" style={{ marginTop: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)' }}>Institution</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)' }}>Deduction</th>
            </tr>
          </thead>
          <tbody>
            {COMMON_INSTITUTIONS.map((inst, i) => (
              <tr key={i}>
                <td style={{ padding: '8px', borderBottom: '1px solid var(--doaide-border)' }}>{inst.name}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' }}>
                  {DEDUCTION_TYPES.find(t => t.value === inst.type)?.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ResultCard>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
