import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateHRADetailed, HRA_METRO_CITIES, formatINR } from '../lib/taxEngine'
import { trackCalculation } from '../lib/analytics'

const s = {
  page: { maxWidth: 760, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32 },
  form: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 },
  row: {
    display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0',
    borderBottom: '1px solid var(--doaide-border)', fontSize: 14,
  },
  rowLabel: { color: 'var(--doaide-text-secondary)' },
  rowValue: { fontFamily: 'var(--doaide-font-mono)', fontWeight: 500, whiteSpace: 'nowrap' },
  binding: { color: 'var(--doaide-gold)', fontWeight: 600 },
  highlight: { color: 'var(--doaide-gold)', fontSize: 18, fontWeight: 600 },
  formula: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, fontFamily: 'var(--doaide-font-mono)', color: 'var(--doaide-text-secondary)', lineHeight: 1.8,
    overflowX: 'auto',
  },
  tip: {
    marginTop: 12, padding: '12px 16px', borderLeft: '3px solid var(--doaide-gold)',
    background: 'var(--doaide-bg-alt)', fontSize: 14, lineHeight: 1.6,
  },
  note: { fontSize: 13, color: 'var(--doaide-text-muted)', marginTop: 16, lineHeight: 1.6 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 22, margin: '40px 0 16px' },
  example: {
    padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16,
    fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)',
  },
  exampleTitle: { fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 },
  link: { color: 'var(--doaide-gold)', textDecoration: 'none' },
}

const SLAB_OPTIONS = [
  { value: '0', label: 'Not sure / 0%' },
  { value: '0.05', label: '5%' },
  { value: '0.2', label: '20%' },
  { value: '0.3', label: '30%' },
]

export const FAQS = [
  { q: 'How is HRA exemption calculated?', a: 'HRA exemption is the lowest of three amounts: (1) actual HRA received, (2) 50% of salary (basic + DA) if you live in Delhi, Mumbai, Kolkata or Chennai, or 40% elsewhere, and (3) rent paid minus 10% of salary. The balance HRA is taxable.' },
  { q: 'Is HRA exemption available in the new tax regime?', a: 'No. HRA exemption can be claimed only under the old tax regime. If you opt for the new regime, the full HRA is taxable — compare both regimes before deciding.' },
  { q: 'Which cities count as metro for HRA?', a: 'For the 50% limit, the metro cities are Delhi, Mumbai, Kolkata and Chennai. Bengaluru, Hyderabad, Pune and other cities use the 40% limit unless the rules are amended — check the notified rules for the year you are filing.' },
  { q: 'When do I need my landlord’s PAN?', a: 'If the rent you pay is more than ₹1,00,000 in a year, your employer needs your landlord’s PAN to allow the HRA exemption. If the landlord has no PAN, a declaration from the landlord is required.' },
  { q: 'Can I claim HRA if I pay rent to my parents?', a: 'Yes, if you genuinely pay rent to a parent who owns the house, keep rent receipts or bank transfers, and the parent reports the rent as income. You cannot claim HRA for rent paid to your spouse.' },
  { q: 'Can I claim HRA and home loan interest together?', a: 'Yes, if you live in a rented house and own a house elsewhere (for example in another city, or one that is let out or under construction). Both benefits apply only under the old regime.' },
  { q: 'What if I did not submit rent receipts to my employer?', a: 'You can still claim the HRA exemption while filing your ITR under the old regime, as long as you have proof of rent paid. The tax deducted extra by your employer is then refunded.' },
]

export default function HRACalculator() {
  const [form, setForm] = useState({
    basicMonthly: '', daMonthly: '', hraMonthly: '', rentMonthly: '', cityType: 'non_metro', months: '12', slabRate: '0.3',
  })
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const result = useMemo(() => {
    const basic = Number(form.basicMonthly) || 0
    const hra = Number(form.hraMonthly) || 0
    if (basic <= 0 || hra <= 0) return null
    return calculateHRADetailed({
      basicMonthly: basic,
      daMonthly: Number(form.daMonthly) || 0,
      hraMonthly: hra,
      rentMonthly: Number(form.rentMonthly) || 0,
      isMetro: form.cityType === 'metro',
      months: Math.min(Math.max(Number(form.months) || 12, 1), 12),
      slabRate: Number(form.slabRate) || 0,
    })
  }, [form])

  useEffect(() => { if (result) trackCalculation('hra') }, [result])

  const shareText = result
    ? `My HRA exemption: ${formatINR(result.exemption)} a year (old regime). Calculate yours free:`
    : 'Free HRA exemption calculator for FY 2026-27:'

  return (
    <div style={s.page}>
      <SEOHead
        title="HRA Exemption Calculator FY 2026-27 — Free, Monthly | DoAide TaxFile"
        description="Free HRA exemption calculator for FY 2026-27. Enter monthly basic, DA, HRA and rent to see exempt and taxable HRA, the binding limit, tax saved and optimal rent."
        keywords="HRA exemption calculator 2026-27, HRA calculation, Section 10(13A) calculator, house rent allowance exemption, HRA tax benefit, metro non-metro HRA"
        canonical="https://tax.doaide.com/hra-calculator"
        faqs={FAQS}
        breadcrumbs={[{ name: 'HRA Exemption Calculator', url: 'https://tax.doaide.com/hra-calculator' }]}
      />

      <h1 style={s.title}>HRA Exemption Calculator</h1>
      <p style={s.subtitle}>FY 2026-27 (old regime) — enter your monthly salary figures to see how much HRA is tax-free</p>

      <div style={s.form}>
        <InputField label="Basic salary (monthly)" value={form.basicMonthly} onChange={set('basicMonthly')} currency />
        <InputField label="Dearness allowance (monthly)" value={form.daMonthly} onChange={set('daMonthly')} currency hint="Only DA that counts for retirement benefits" />
        <InputField label="HRA received (monthly)" value={form.hraMonthly} onChange={set('hraMonthly')} currency />
        <InputField label="Rent paid (monthly)" value={form.rentMonthly} onChange={set('rentMonthly')} currency />
        <InputField label="City you live in" type="select" value={form.cityType} onChange={set('cityType')}
          options={[{ value: 'metro', label: `Metro (${HRA_METRO_CITIES.join(', ')})` }, { value: 'non_metro', label: 'Any other city' }]} />
        <InputField label="Months on rent this year" value={form.months} onChange={set('months')} hint="1–12" />
        <InputField label="Your tax slab (old regime)" type="select" value={form.slabRate} onChange={set('slabRate')} options={SLAB_OPTIONS} />
      </div>

      {result && (
        <ResultCard title="HRA Exemption Breakdown" gold style={{ marginTop: 24 }}>
          {[
            ['actualHRA', 'Actual HRA received', result.actualHRA],
            ['percentOfSalary', `${form.cityType === 'metro' ? '50%' : '40%'} of salary (basic + DA)`, result.percentOfSalary],
            ['rentMinus10Pct', 'Rent paid − 10% of salary', result.rentMinus10Pct],
          ].map(([key, label, value]) => (
            <div style={s.row} key={key}>
              <span style={key === result.binding ? s.binding : s.rowLabel}>{label}{key === result.binding ? ' ← lowest' : ''}</span>
              <span style={s.rowValue}>{formatINR(value)}</span>
            </div>
          ))}
          <div style={{ ...s.row, paddingTop: 16 }}>
            <span style={s.highlight}>Exempt HRA (per year)</span>
            <span style={s.highlight} data-testid="hra-exemption">{formatINR(result.exemption)}</span>
          </div>
          <div style={s.row}><span style={s.rowLabel}>Exempt HRA (per month)</span><span style={s.rowValue}>{formatINR(result.monthlyExemption)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Taxable HRA (per year)</span><span style={s.rowValue}>{formatINR(result.taxableHRA)}</span></div>
          {result.taxSaved > 0 && (
            <div style={s.row}><span style={s.rowLabel}>Approx. tax saved (incl. 4% cess)</span><span style={s.rowValue}>{formatINR(result.taxSaved)}</span></div>
          )}

          <div style={s.formula}>
            Exemption = min({formatINR(result.actualHRA)}, {formatINR(result.percentOfSalary)}, {formatINR(result.rentMinus10Pct)}) = {formatINR(result.exemption)}
          </div>

          {result.binding === 'rentMinus10Pct' && result.annualRent < result.optimalRentAnnual && (
            <div style={s.tip}>
              Your exemption is capped by rent. Exemption keeps rising with rent up to about {formatINR(result.optimalRentAnnual)} a year
              ({formatINR(Math.round(result.optimalRentAnnual / result.months))}/month); beyond that, extra rent gives no extra exemption.
            </div>
          )}
          {result.landlordPANRequired && (
            <div style={s.tip}>Rent is above ₹1,00,000 a year — give your employer your landlord&rsquo;s PAN to claim this exemption.</div>
          )}
          <div style={s.tip}>
            HRA exemption applies only under the old regime. <Link to="/old-vs-new-regime" style={s.link}>Compare old vs new regime</Link> with this amount to see which is better for you.
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <ShareButtons text={shareText} url="https://tax.doaide.com/hra-calculator" />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <p style={s.note}>
        Salary for HRA means basic pay plus DA that forms part of retirement benefits (plus commission at a fixed % of turnover, if any).
        Results are estimates based on the rules for FY 2026-27; check your Form 16 and the notified rules before filing.
      </p>

      <h2 style={s.h2}>Worked examples</h2>
      <div style={s.example}>
        <div style={s.exampleTitle}>Mumbai: ₹50,000 basic, ₹25,000 HRA, ₹20,000 rent per month</div>
        Annual: basic ₹6,00,000 | HRA ₹3,00,000 | rent ₹2,40,000<br />
        min(₹3,00,000, 50% × ₹6L = ₹3,00,000, ₹2.4L − ₹60K = ₹1,80,000) = <strong>₹1,80,000 exempt</strong>
      </div>
      <div style={s.example}>
        <div style={s.exampleTitle}>Bengaluru: ₹80,000 basic, ₹33,333 HRA, ₹25,000 rent per month</div>
        Annual: basic ₹9,60,000 | HRA ₹4,00,000 | rent ₹3,00,000<br />
        min(₹4,00,000, 40% × ₹9.6L = ₹3,84,000, ₹3L − ₹96K = ₹2,04,000) = <strong>₹2,04,000 exempt</strong>
      </div>
      <p style={{ fontSize: 14, color: 'var(--doaide-text-secondary)' }}>
        More scenarios in our <Link to="/guides/hra-exemption-calculation" style={s.link}>HRA exemption guide</Link>. Need receipts?
        Use the free <Link to="/rent-receipt-generator" style={s.link}>rent receipt generator</Link>.
      </p>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
