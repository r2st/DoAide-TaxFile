import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateGST, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 700, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
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
  toggle: { display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--doaide-border)', marginTop: 8 },
  toggleBtn: { flex: 1, padding: '10px 16px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, background: 'var(--doaide-card-bg)', color: 'var(--doaide-text-secondary)' },
  toggleActive: { flex: 1, padding: '10px 16px', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)' },
  section: { marginTop: 24, padding: 16, background: 'var(--doaide-card-bg)', borderRadius: 'var(--doaide-radius-md)', border: '1px solid var(--doaide-border)' },
  sectionTitle: { fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--doaide-text-primary)' },
}

const GST_RATES = [
  { label: '5%', value: '5' },
  { label: '12%', value: '12' },
  { label: '18%', value: '18' },
  { label: '28%', value: '28' },
]

const FAQS = [
  { q: 'What is GST?', a: 'GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services in India. It replaced multiple taxes like VAT, excise duty, and service tax from July 1, 2017.' },
  { q: 'What are the different GST rates in India?', a: 'India has four main GST slabs: 5% (essential items), 12% (standard goods), 18% (most services and goods), and 28% (luxury and sin goods). Some items like fresh food are exempt (0%).' },
  { q: 'What is CGST, SGST, and IGST?', a: 'CGST (Central GST) and SGST (State GST) are charged on intra-state transactions, each being half the total GST rate. IGST (Integrated GST) is charged on inter-state transactions and equals the full GST rate.' },
  { q: 'How do I calculate GST from an inclusive price?', a: 'To extract GST from an inclusive price: GST Amount = Price × GST Rate / (100 + GST Rate). For example, if price is ₹1,180 at 18% GST: GST = 1180 × 18/118 = ₹180, Base = ₹1,000.' },
]

export default function GSTCalculator() {
  const [form, setForm] = useState({ amount: '', gstRate: '18' })
  const [isInclusive, setIsInclusive] = useState(false)
  const [supplyType, setSupplyType] = useState('intra')
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateGST(Number(form.amount) || 0, Number(form.gstRate) || 18, isInclusive)
    setResult(r)
  }

  const shareText = result ? `GST Calculation\nBase: ${formatINR(result.baseAmount)}\nGST (${result.gstRate}%): ${formatINR(result.gstAmount)}\nTotal: ${formatINR(result.totalAmount)}\n\ntax.doaide.com/gst-calculator` : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="GST Calculator Online - Calculate CGST SGST IGST | DoAide TaxFile"
        description="Free GST calculator to compute GST amount with CGST, SGST, IGST breakup. Calculate GST inclusive and exclusive prices for all GST slabs — 5%, 12%, 18%, 28%."
        keywords="GST calculator, GST calculator online, CGST SGST calculator, IGST calculator, GST tax calculator India"
        canonical="https://tax.doaide.com/gst-calculator"
        faqs={FAQS}
      />

      <h1 style={s.title}>GST Calculator</h1>
      <p style={s.subtitle}>Calculate CGST, SGST & IGST on goods and services</p>

      <div style={s.toggle}>
        <button style={!isInclusive ? s.toggleActive : s.toggleBtn} onClick={() => setIsInclusive(false)}>GST Exclusive (Add GST)</button>
        <button style={isInclusive ? s.toggleActive : s.toggleBtn} onClick={() => setIsInclusive(true)}>GST Inclusive (Extract GST)</button>
      </div>

      <div style={{ ...s.form, marginTop: 16 }}>
        <InputField label={isInclusive ? 'Amount (GST Inclusive)' : 'Amount (Before GST)'} value={form.amount} onChange={set('amount')} currency />
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block', color: 'var(--doaide-text-secondary)' }}>GST Rate</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {GST_RATES.map(r => (
              <button key={r.value} onClick={() => setForm(f => ({ ...f, gstRate: r.value }))}
                style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: form.gstRate === r.value ? '2px solid var(--doaide-gold)' : '1px solid var(--doaide-border)', background: form.gstRate === r.value ? 'var(--doaide-gold-alpha, rgba(200,170,80,0.1))' : 'var(--doaide-card-bg)', cursor: 'pointer', fontWeight: form.gstRate === r.value ? 600 : 400, fontSize: 14, color: 'var(--doaide-text-primary)' }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...s.toggle, marginTop: 16 }}>
        <button style={supplyType === 'intra' ? s.toggleActive : s.toggleBtn} onClick={() => setSupplyType('intra')}>Intra-State (CGST + SGST)</button>
        <button style={supplyType === 'inter' ? s.toggleActive : s.toggleBtn} onClick={() => setSupplyType('inter')}>Inter-State (IGST)</button>
      </div>

      <button style={s.btn} onClick={calculate}>Calculate GST</button>

      {result && (
        <ResultCard title="GST Breakup" gold>
          <div style={s.row}><span style={s.rowLabel}>Base Amount</span><span style={s.rowValue}>{formatINR(result.baseAmount)}</span></div>
          {supplyType === 'intra' ? (
            <>
              <div style={s.row}><span style={s.rowLabel}>CGST ({result.gstRate / 2}%)</span><span style={s.rowValue}>{formatINR(result.cgst)}</span></div>
              <div style={s.row}><span style={s.rowLabel}>SGST ({result.gstRate / 2}%)</span><span style={s.rowValue}>{formatINR(result.sgst)}</span></div>
            </>
          ) : (
            <div style={s.row}><span style={s.rowLabel}>IGST ({result.gstRate}%)</span><span style={s.rowValue}>{formatINR(result.igst)}</span></div>
          )}
          <div style={s.row}><span style={s.rowLabel}>Total GST</span><span style={{ ...s.rowValue, color: 'var(--doaide-success)' }}>{formatINR(result.gstAmount)}</span></div>
          <div style={{ ...s.row, borderBottom: 'none', paddingTop: 12 }}>
            <span style={s.highlight}>Total Amount</span>
            <span style={s.highlight}>{formatINR(result.totalAmount)}</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <WhatsAppShare text={shareText} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
