import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import FAQSection from '../components/FAQSection'
import Breadcrumb from '../components/Breadcrumb'
import { calculateSection80D, formatINR } from '../lib/taxEngine'
import { trackCalculation } from '../lib/analytics'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 32, marginBottom: 8 },
  subtitle: { color: 'var(--doaide-text-secondary)', fontSize: 15, marginBottom: 32, lineHeight: 1.6 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 },
  section: { marginTop: 32 },
  sectionTitle: { fontSize: 16, fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--doaide-border)' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, marginBottom: 8 },
  summaryCard: { padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', textAlign: 'center' },
  summaryLabel: { fontSize: 12, color: 'var(--doaide-text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  summaryValue: { fontFamily: 'var(--doaide-font-mono)', fontSize: 20, fontWeight: 600 },
  progressBar: { height: 6, background: 'var(--doaide-bg-alt)', borderRadius: 3, marginTop: 10, marginBottom: 4, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--doaide-gold)', borderRadius: 3, transition: 'width 0.3s ease' },
  progressNote: { fontSize: 12, color: 'var(--doaide-text-muted)', display: 'flex', justifyContent: 'space-between' },
  note: { padding: '12px 16px', background: 'var(--doaide-gold-bg)', borderRadius: 'var(--doaide-radius-md)', marginTop: 16, fontSize: 14, lineHeight: 1.6, color: 'var(--doaide-text-secondary)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
}

const SLABS = [
  { value: 0, label: '0% (income below taxable limit)' },
  { value: 0.052, label: '5% slab' },
  { value: 0.208, label: '20% slab' },
  { value: 0.312, label: '30% slab' },
]

const FAQS = [
  { q: 'What is the maximum deduction under Section 80C and 80D together?', a: 'Section 80C allows up to ₹1.5 lakh. Section 80D allows up to ₹25,000 for self/family health insurance (₹50,000 if senior citizen) plus ₹25,000 for parents (₹50,000 if parents are senior citizens). Together with the ₹50,000 NPS deduction under 80CCD(1B), the realistic maximum is ₹3-3.5 lakh — a tax saving of over ₹1 lakh at the 30% slab.' },
  { q: 'Do 80C and 80D deductions work in the new tax regime?', a: 'No. Both are old-regime deductions. The new regime offers lower slab rates instead. If your combined 80C/80D/HRA/home-loan deductions are large, the old regime often wins — compare both with our regime calculator.' },
  { q: 'What investments count under Section 80C?', a: 'PPF, ELSS mutual funds, EPF, life insurance premiums, NSC, 5-year tax-saver FD, Sukanya Samriddhi, home loan principal repayment, and children\'s tuition fees — capped at ₹1.5 lakh in total.' },
  { q: 'What counts under Section 80D?', a: 'Health insurance premiums for self, spouse and children (up to ₹25,000; ₹50,000 if you are 60+), a separate limit for parents\' premiums (₹25,000; ₹50,000 if they are 60+), and preventive health check-ups up to ₹5,000 within those limits.' },
  { q: 'Can I claim 80D for parents if they are not dependent on me?', a: 'Yes. Parents need not be financially dependent — you just have to pay the premium (by any mode other than cash).' },
  { q: 'Is a preventive health check-up paid in cash allowed?', a: 'Yes, preventive check-ups up to ₹5,000 are the one 80D item that can be paid in cash. Insurance premiums themselves must be paid by non-cash modes.' },
]

export default function Section80C80DCalculator() {
  const [form, setForm] = useState({
    c80: '', nps: '',
    dSelf: '', dParents: '', checkup: '',
    selfSenior: false, parentsSenior: false,
    slab: 0.312,
  })
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))

  const result = useMemo(() => {
    const c80 = Math.min(Number(form.c80) || 0, 150000)
    const c80Raw = Number(form.c80) || 0
    const nps = Math.min(Number(form.nps) || 0, 50000)
    const d = calculateSection80D(
      Number(form.dSelf) || 0, 0, 0,
      Number(form.dParents) || 0,
      form.selfSenior, form.parentsSenior,
      Number(form.checkup) || 0,
    )
    const totalDeduction = c80 + nps + d.totalDeduction
    const slab = Number(form.slab)
    const taxSaved = Math.round(totalDeduction * slab)
    const maxPossible = 150000 + 50000 + d.selfLimit + d.parentsLimit
    const unusedCapacity = Math.max(0, maxPossible - totalDeduction)
    const extraTaxPossible = Math.round(unusedCapacity * slab)
    return { c80, c80Raw, nps, d, totalDeduction, taxSaved, maxPossible, unusedCapacity, extraTaxPossible }
  }, [form])

  useEffect(() => { if (result && result.totalDeduction > 0) trackCalculation('section-80c-80d') }, [result])

  const hasInput = result.totalDeduction > 0

  return (
    <div style={s.page}>
      <SEOHead
        title="Section 80C & 80D Tax Saving Calculator — Deductions + Tax Saved | DoAide TaxFile"
        description="Calculate your combined Section 80C and 80D deductions and the exact tax saved at your slab. PPF, ELSS, LIC, health insurance for self and parents, NPS 80CCD(1B) — FY 2026-27."
        keywords="80C 80D calculator, section 80C calculator, section 80D calculator, tax saving calculator 80C, health insurance tax benefit calculator, 80C 80D deduction limit"
        canonical="https://tax.doaide.com/80c-80d-calculator"
        faqs={FAQS}
      />
      <Breadcrumb items={[{ label: '80C + 80D Calculator' }]} />

      <h1 style={s.title}>Section 80C + 80D Tax Saving Calculator</h1>
      <p style={s.subtitle}>
        Enter what you invest and the health insurance you pay — see your total old-regime deduction and the exact
        tax it saves at your slab. Results update as you type.
      </p>

      <div style={s.section}>
        <div style={s.sectionTitle}>Section 80C — Investments (limit ₹1,50,000)</div>
        <div style={s.grid}>
          <InputField label="Total 80C investments (PPF, ELSS, EPF, LIC, tuition, home loan principal)" value={form.c80} onChange={set('c80')} currency hint="Capped at ₹1,50,000" />
          <InputField label="NPS — Section 80CCD(1B)" value={form.nps} onChange={set('nps')} currency hint="Additional ₹50,000 over 80C" />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Section 80D — Health Insurance</div>
        <div style={s.grid}>
          <InputField label="Premium — self, spouse & children" value={form.dSelf} onChange={set('dSelf')} currency hint={`Limit ₹${form.selfSenior ? '50,000' : '25,000'}`} />
          <InputField label="Premium — parents" value={form.dParents} onChange={set('dParents')} currency hint={`Limit ₹${form.parentsSenior ? '50,000' : '25,000'}`} />
          <InputField label="Preventive health check-up" value={form.checkup} onChange={set('checkup')} currency hint="Max ₹5,000 (within limits)" />
          <InputField label="You are 60 or older" type="checkbox" value={form.selfSenior} onChange={set('selfSenior')} />
          <InputField label="Parents are 60 or older" type="checkbox" value={form.parentsSenior} onChange={set('parentsSenior')} />
        </div>
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Your Tax Slab (old regime)</div>
        <div style={s.grid}>
          <InputField label="Marginal slab (incl. cess)" type="select" value={form.slab} onChange={set('slab')} options={SLABS} />
        </div>
      </div>

      <ResultCard gold style={{ marginTop: 32 }}>
        <div style={s.summaryGrid}>
          <div style={s.summaryCard}>
            <div style={s.summaryLabel}>80C + NPS</div>
            <div style={{ ...s.summaryValue, color: 'var(--doaide-text)' }}>{formatINR(result.c80 + result.nps)}</div>
          </div>
          <div style={s.summaryCard}>
            <div style={s.summaryLabel}>80D Deduction</div>
            <div style={{ ...s.summaryValue, color: 'var(--doaide-text)' }}>{formatINR(result.d.totalDeduction)}</div>
          </div>
          <div style={s.summaryCard}>
            <div style={s.summaryLabel}>Total Deduction</div>
            <div style={{ ...s.summaryValue, color: 'var(--doaide-gold)' }}>{formatINR(result.totalDeduction)}</div>
          </div>
          <div style={s.summaryCard}>
            <div style={s.summaryLabel}>Tax Saved</div>
            <div style={{ ...s.summaryValue, color: 'var(--doaide-success)' }}>{formatINR(result.taxSaved)}</div>
          </div>
        </div>

        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${Math.min(100, Math.round((result.totalDeduction / result.maxPossible) * 100))}%` }} />
        </div>
        <div style={s.progressNote}>
          <span>Used {formatINR(result.totalDeduction)} of {formatINR(result.maxPossible)} possible</span>
          <span>{Math.min(100, Math.round((result.totalDeduction / result.maxPossible) * 100))}%</span>
        </div>

        {result.c80Raw > 150000 && (
          <div style={s.note}>
            You entered {formatINR(result.c80Raw)} under 80C, but only ₹1,50,000 counts. Consider routing the extra{' '}
            {formatINR(result.c80Raw - 150000)} to NPS (80CCD 1B) if that limit is free.
          </div>
        )}

        {hasInput && result.unusedCapacity > 0 && (
          <div style={s.note}>
            You still have <strong>{formatINR(result.unusedCapacity)}</strong> of unused 80C/80D/NPS capacity — worth
            up to <strong>{formatINR(result.extraTaxPossible)}</strong> more in tax savings at your slab. Plan it with
            the <Link to="/80c-planner" style={s.link}>80C Planner</Link> and{' '}
            <Link to="/80d-calculator" style={s.link}>80D Calculator</Link>.
          </div>
        )}

        <div style={s.note}>
          These deductions apply under the <strong>old regime</strong> only. Check whether they actually beat the new
          regime&apos;s lower rates with the <Link to="/old-vs-new-regime" style={s.link}>Old vs New Regime Comparison</Link>,
          or run the full <Link to="/tax-saving-calculator" style={s.link}>Tax Saving Optimizer</Link>.
        </div>
      </ResultCard>

      {hasInput && (
        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <ShareButtons text={`My 80C + 80D tax plan:\nTotal deduction: ${formatINR(result.totalDeduction)}\nTax saved: ${formatINR(result.taxSaved)}\n\nCalculate yours free: tax.doaide.com/80c-80d-calculator`} />
        </div>
      )}

      <FAQSection faqs={FAQS} />
    </div>
  )
}
