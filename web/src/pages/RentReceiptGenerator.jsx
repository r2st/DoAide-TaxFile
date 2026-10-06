import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import WhatsAppShare from '../components/WhatsAppShare'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { generateRentReceipt, formatINR } from '../lib/taxEngine'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 },
  btn: {
    marginTop: 24, padding: '12px 32px', background: 'var(--doaide-gold)', color: 'var(--doaide-text-on-gold)',
    border: 'none', borderRadius: 'var(--doaide-radius-md)', fontSize: 16, fontWeight: 600, cursor: 'pointer',
  },
  receipt: {
    border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-md)',
    padding: 24, marginBottom: 16, background: 'var(--doaide-surface)', pageBreakInside: 'avoid',
  },
  receiptTitle: { fontSize: 18, fontWeight: 600, marginBottom: 12, textAlign: 'center' },
  receiptRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14 },
  receiptLabel: { color: 'var(--doaide-text-secondary)' },
  receiptValue: { fontWeight: 500 },
  receiptBody: { fontSize: 14, lineHeight: 1.8, marginTop: 12, color: 'var(--doaide-text-secondary)' },
  signature: { marginTop: 24, textAlign: 'right', fontSize: 14, color: 'var(--doaide-text-muted)' },
  summary: {
    background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-md)', padding: 16, marginBottom: 24, textAlign: 'center',
  },
}

const FAQS = [
  { q: 'Why do I need rent receipts for HRA exemption?', a: 'If you pay rent exceeding ₹1,00,000 per year, you need to submit rent receipts to your employer to claim HRA exemption. Rent receipts serve as proof of rent payment and are required during ITR filing or employer verification.' },
  { q: 'What details must a rent receipt contain?', a: 'A valid rent receipt must include: tenant name, landlord name, rental address, rent amount, period of tenancy, and landlord signature. If annual rent exceeds ₹1,00,000, the landlord PAN is mandatory.' },
  { q: 'Is landlord PAN mandatory on rent receipts?', a: 'Yes, landlord PAN is mandatory if the total rent paid during the financial year exceeds ₹1,00,000. Without the landlord PAN, the employer may not accept the receipts for HRA exemption.' },
  { q: 'Can I claim HRA without rent receipts?', a: 'For rent up to ₹1,00,000 per year, a self-declaration may suffice. However, for higher amounts, rent receipts are essential. It is always advisable to maintain proper rent receipts for your records.' },
  { q: 'Do revenue stamps need to be affixed on rent receipts?', a: 'Revenue stamps are required on cash payments of ₹5,000 or more per receipt. For bank transfers (UPI, NEFT, cheque), no revenue stamp is needed. The stamp should be cancelled by the landlord.' },
]

const MONTHS = [
  { value: 0, label: 'April' }, { value: 1, label: 'May' }, { value: 2, label: 'June' },
  { value: 3, label: 'July' }, { value: 4, label: 'August' }, { value: 5, label: 'September' },
  { value: 6, label: 'October' }, { value: 7, label: 'November' }, { value: 8, label: 'December' },
  { value: 9, label: 'January' }, { value: 10, label: 'February' }, { value: 11, label: 'March' },
]

export default function RentReceiptGenerator() {
  const [form, setForm] = useState({
    tenantName: '', landlordName: '', landlordPAN: '', address: '',
    rentAmount: '', fromMonth: 0, toMonth: 11,
  })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const generate = () => {
    if (!form.tenantName || !form.landlordName || !form.address || !form.rentAmount) return
    const r = generateRentReceipt({
      ...form,
      rentAmount: Number(form.rentAmount) || 0,
      fromMonth: Number(form.fromMonth),
      toMonth: Number(form.toMonth),
      year: 2026,
    })
    setResult(r)
  }

  return (
    <div style={s.page}>
      <SEOHead
        title="Rent Receipt Generator - Free PDF Download for HRA | DoAide TaxFile"
        description="Generate rent receipts for HRA exemption claims. Free downloadable rent receipts with landlord details for FY 2026-27 income tax filing."
        keywords="rent receipt generator, rent receipt for HRA, rent receipt PDF, HRA rent receipt download"
        canonical="https://tax.doaide.com/rent-receipt-generator"
        faqs={FAQS}
      />

      <h1 style={s.title}>Rent Receipt Generator</h1>
      <p style={s.subtitle}>Generate rent receipts for HRA exemption — Print or save as PDF</p>

      <div style={s.form}>
        <InputField label="Tenant Name (Your Name)" type="text" value={form.tenantName} onChange={set('tenantName')} placeholder="Your full name" />
        <InputField label="Landlord Name" type="text" value={form.landlordName} onChange={set('landlordName')} placeholder="Landlord full name" />
        <InputField label="Landlord PAN" type="text" value={form.landlordPAN} onChange={set('landlordPAN')} placeholder="ABCDE1234F" hint="Required if annual rent > ₹1,00,000" />
        <InputField label="Rental Address" type="text" value={form.address} onChange={set('address')} placeholder="Full address of rented property" />
        <InputField label="Monthly Rent" value={form.rentAmount} onChange={set('rentAmount')} currency />
        <InputField label="From Month" type="select" value={form.fromMonth} onChange={set('fromMonth')} options={MONTHS} />
        <InputField label="To Month" type="select" value={form.toMonth} onChange={set('toMonth')} options={MONTHS} />
      </div>

      <button style={s.btn} onClick={generate}>Generate Receipts</button>

      {result && (
        <>
          <div style={s.summary}>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--doaide-gold)' }}>
              {result.receipts.length} receipt(s) generated — Total Rent: {formatINR(result.totalRent)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--doaide-text-muted)', marginTop: 4 }}>
              Use your browser&apos;s Print → Save as PDF to download
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }} className="no-print">
            <WhatsAppShare text={`Rent Receipts Generated\n${result.receipts.length} months, Total: ${formatINR(result.totalRent)}\nLandlord: ${result.landlordName}\n\ntax.doaide.com/rent-receipt-generator`} />
            <PrintButton />
          </div>

          {result.receipts.map((r, i) => (
            <div key={i} style={s.receipt}>
              <div style={s.receiptTitle}>RENT RECEIPT</div>
              <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--doaide-text-muted)', marginBottom: 16 }}>
                For the month of {r.month} {r.year} — FY 2026-27
              </div>
              <div style={s.receiptBody}>
                Received a sum of <strong>{formatINR(r.amount)}</strong> (Rupees{' '}
                {numberToWords(r.amount)} only) from <strong>{r.tenantName}</strong> towards
                rent for the property located at <strong>{r.address}</strong> for the month of{' '}
                <strong>{r.month} {r.year}</strong>.
              </div>
              <div style={s.receiptRow}>
                <span style={s.receiptLabel}>Landlord Name</span>
                <span style={s.receiptValue}>{r.landlordName}</span>
              </div>
              {r.landlordPAN && (
                <div style={s.receiptRow}>
                  <span style={s.receiptLabel}>Landlord PAN</span>
                  <span style={s.receiptValue}>{r.landlordPAN}</span>
                </div>
              )}
              <div style={s.receiptRow}>
                <span style={s.receiptLabel}>Date</span>
                <span style={s.receiptValue}>{r.date}</span>
              </div>
              <div style={s.signature}>
                <div style={{ marginBottom: 32 }}>_________________________</div>
                <div>Signature of Landlord</div>
                <div style={{ fontSize: 12 }}>{r.landlordName}</div>
              </div>
            </div>
          ))}
        </>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}

function numberToWords(n) {
  if (n === 0) return 'zero'
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
  const num = Math.round(Math.abs(n))
  if (num < 20) return ones[num]
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '')
  if (num < 1000) return ones[Math.floor(num / 100)] + ' hundred' + (num % 100 ? ' and ' + numberToWords(num % 100) : '')
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '')
  if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' lakh' + (num % 100000 ? ' ' + numberToWords(num % 100000) : '')
  return numberToWords(Math.floor(num / 10000000)) + ' crore' + (num % 10000000 ? ' ' + numberToWords(num % 10000000) : '')
}
