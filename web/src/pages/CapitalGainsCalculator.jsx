import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { formatINR } from '../lib/taxEngine'
import { ASSET_TYPES, computeCapitalGains } from '../lib/capitalGains'
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
  badge: {
    display: 'inline-block', padding: '4px 12px', borderRadius: 12, fontSize: 13, fontWeight: 600,
    marginBottom: 16, background: 'var(--doaide-gold-bg)', color: 'var(--doaide-gold)',
  },
  rule: { fontSize: 13, color: 'var(--doaide-text-secondary)', marginBottom: 12, lineHeight: 1.6 },
  box: {
    marginTop: 16, padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    fontSize: 13, lineHeight: 1.7,
  },
  warn: {
    marginTop: 12, padding: '12px 16px', borderLeft: '3px solid var(--doaide-warning)',
    background: 'var(--doaide-bg-alt)', fontSize: 14, lineHeight: 1.6,
  },
  error: { marginTop: 16, color: 'var(--doaide-error)', fontSize: 14 },
  tableWrap: { overflowX: 'auto', marginTop: 8 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 500 },
  td: { padding: '6px 8px', borderBottom: '1px solid var(--doaide-border)' },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 22, margin: '40px 0 16px' },
  link: { color: 'var(--doaide-gold)', textDecoration: 'none' },
  note: { fontSize: 13, color: 'var(--doaide-text-muted)', marginTop: 16, lineHeight: 1.6 },
}

const ASSET_OPTIONS = Object.entries(ASSET_TYPES).map(([value, a]) => ({ value, label: a.label }))

const SLAB_OPTIONS = [
  { value: '0', label: '0%' }, { value: '0.05', label: '5%' }, { value: '0.1', label: '10%' },
  { value: '0.15', label: '15%' }, { value: '0.2', label: '20%' }, { value: '0.25', label: '25%' }, { value: '0.3', label: '30%' },
]

export const FAQS = [
  { q: 'What is the tax on shares and equity mutual funds in FY 2026-27?', a: 'Held for more than 12 months: long-term gains above ₹1.25 lakh a year are taxed at 12.5% (Section 112A). Held for 12 months or less: short-term gains are taxed at 20% (Section 111A). Both rates apply to STT-paid listed equity and equity-oriented funds, plus 4% cess.' },
  { q: 'Is indexation still available on property?', a: 'Long-term gains on property are taxed at 12.5% without indexation. For land or buildings bought before 23 July 2024, resident individuals and HUFs can instead choose 20% with indexation — whichever is lower. This calculator works out both and picks the lower tax.' },
  { q: 'What are the holding periods for long-term capital gains?', a: 'More than 12 months for listed shares, equity funds, listed bonds and listed ETFs; more than 24 months for property, physical gold, unlisted shares and other assets. Debt fund units bought on or after 1 April 2023 are always short-term.' },
  { q: 'How is crypto taxed in India?', a: 'Gains on crypto and other virtual digital assets are taxed at a flat 30% plus cess under Section 115BBH, regardless of how long you held them. Only the cost of acquisition is deductible, losses cannot be set off against any income, and 1% TDS applies on transfers above the threshold.' },
  { q: 'How are debt mutual funds taxed now?', a: 'Units bought on or after 1 April 2023 are taxed at your slab rate however long you hold them. Units bought before that date are long-term after 24 months and taxed at 12.5% without indexation.' },
  { q: 'How can I save tax on long-term capital gains from property?', a: 'Reinvest in another residential house under Section 54 (or 54F for gains from other assets), or invest up to ₹50 lakh in specified 54EC bonds within six months of the sale. Equity investors can book up to ₹1.25 lakh of long-term gains every year tax-free.' },
  { q: 'Can I set off capital losses?', a: 'Short-term capital losses can be set off against both short- and long-term gains; long-term losses only against long-term gains. Unused losses can be carried forward for 8 years if you file your return on time. Crypto losses cannot be set off at all.' },
]

const today = new Date().toISOString().slice(0, 10)

export default function CapitalGainsCalculator() {
  const [form, setForm] = useState({
    assetType: 'equity_mf', buyDate: '', sellDate: today, buyPrice: '', sellPrice: '',
    transferExpenses: '', improvementCost: '', slabRate: '0.3', ltcgExemptionUsed: '',
  })
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))
  const asset = ASSET_TYPES[form.assetType]

  const { result, error } = useMemo(() => {
    if (!form.buyDate || !form.sellDate || !(Number(form.sellPrice) > 0)) return { result: null, error: null }
    try {
      return {
        result: computeCapitalGains({
          assetType: form.assetType,
          buyDate: form.buyDate,
          sellDate: form.sellDate,
          buyPrice: Number(form.buyPrice) || 0,
          sellPrice: Number(form.sellPrice) || 0,
          transferExpenses: Number(form.transferExpenses) || 0,
          improvementCost: Number(form.improvementCost) || 0,
          slabRate: Number(form.slabRate) || 0,
          ltcgExemptionUsed: Number(form.ltcgExemptionUsed) || 0,
        }),
        error: null,
      }
    } catch (e) {
      return { result: null, error: e.message }
    }
  }, [form])

  useEffect(() => { if (result) trackCalculation('capital-gains') }, [result])

  const shareText = result
    ? `${result.assetLabel}: ${formatINR(result.gain)} ${result.gainType} gain, tax ${formatINR(result.totalTax)}. Calculate yours free:`
    : 'Free capital gains tax calculator for FY 2026-27:'

  return (
    <div style={s.page}>
      <SEOHead
        title="Capital Gains Tax Calculator FY 2026-27 — LTCG & STCG | DoAide TaxFile"
        description="Free capital gains calculator for FY 2026-27: shares, mutual funds, property (with indexation option), gold, bonds and crypto. Exact holding period, 112A exemption and tax."
        keywords="capital gains tax calculator India 2026-27, LTCG calculator, STCG calculator, property capital gains indexation, 112A exemption, crypto tax 30%, debt mutual fund tax"
        canonical="https://tax.doaide.com/capital-gains-calculator"
        faqs={FAQS}
        breadcrumbs={[{ name: 'Capital Gains Calculator', url: 'https://tax.doaide.com/capital-gains-calculator' }]}
      />

      <h1 style={s.title}>Capital Gains Tax Calculator</h1>
      <p style={s.subtitle}>FY 2026-27 — shares, mutual funds, property, gold, bonds and crypto, using the actual buy and sell dates</p>

      <div style={s.form}>
        <InputField label="Asset" type="select" value={form.assetType} onChange={set('assetType')} options={ASSET_OPTIONS} />
        <InputField label="Purchase date" type="date" value={form.buyDate} onChange={set('buyDate')} max={today} />
        <InputField label="Sale date" type="date" value={form.sellDate} onChange={set('sellDate')} />
        <InputField label="Purchase price (total)" value={form.buyPrice} onChange={set('buyPrice')} currency />
        <InputField label="Sale price (total)" value={form.sellPrice} onChange={set('sellPrice')} currency />
        <InputField label="Transfer expenses" value={form.transferExpenses} onChange={set('transferExpenses')} currency hint="Brokerage, legal fees (not STT)" />
        {form.assetType === 'property' && (
          <InputField label="Cost of improvement" value={form.improvementCost} onChange={set('improvementCost')} currency />
        )}
        {asset.equityExemption && (
          <InputField label="LTCG exemption already used this year" value={form.ltcgExemptionUsed} onChange={set('ltcgExemptionUsed')} currency hint="Of the ₹1.25 lakh annual limit" />
        )}
        {!asset.flatVDA && (
          <InputField label="Your income tax slab" type="select" value={form.slabRate} onChange={set('slabRate')} options={SLAB_OPTIONS} hint="Used where gains are taxed at slab rate" />
        )}
      </div>
      <p style={s.rule}>{asset.sections}</p>

      {error && <div style={s.error} role="alert">{error}</div>}

      {result && (
        <ResultCard gold style={{ marginTop: 24 }}>
          <span style={s.badge} data-testid="gain-type">
            {result.gainType === 'VDA' ? 'Virtual digital asset' : result.gainType === 'LTCG' ? 'Long-term gain' : 'Short-term gain'} — held {result.monthsHeld} months
          </span>
          <div style={s.row}><span style={s.rowLabel}>Sale value</span><span style={s.rowValue}>{formatINR(result.saleValue)}</span></div>
          <div style={s.row}><span style={s.rowLabel}>Cost of acquisition</span><span style={s.rowValue}>{formatINR(result.costOfAcquisition)}</span></div>
          {result.improvementCost > 0 && <div style={s.row}><span style={s.rowLabel}>Cost of improvement</span><span style={s.rowValue}>{formatINR(result.improvementCost)}</span></div>}
          {result.transferExpenses > 0 && <div style={s.row}><span style={s.rowLabel}>Transfer expenses</span><span style={s.rowValue}>{formatINR(result.transferExpenses)}</span></div>}
          <div style={s.row}>
            <span style={s.rowLabel}>Capital {result.gain >= 0 ? 'gain' : 'loss'}</span>
            <span style={{ ...s.rowValue, color: result.gain >= 0 ? 'var(--doaide-success)' : 'var(--doaide-error)' }}>{formatINR(result.gain)}</span>
          </div>
          {result.exemption > 0 && <div style={s.row}><span style={s.rowLabel}>Exempt under Section 112A</span><span style={s.rowValue}>-{formatINR(result.exemption)}</span></div>}
          {result.gain > 0 && (
            <>
              <div style={s.row}><span style={s.rowLabel}>Taxable gain</span><span style={s.rowValue}>{formatINR(result.taxableGain)}</span></div>
              <div style={s.row}><span style={s.rowLabel}>Rate</span><span style={s.rowValue}>{result.rateLabel}</span></div>
              <div style={s.row}><span style={s.rowLabel}>Tax</span><span style={s.rowValue}>{formatINR(result.tax)}</span></div>
              <div style={s.row}><span style={s.rowLabel}>Cess (4%)</span><span style={s.rowValue}>{formatINR(result.cess)}</span></div>
              <div style={{ ...s.row, borderBottom: 'none', fontSize: 16 }}>
                <span style={{ fontWeight: 600 }}>Total tax</span>
                <span style={{ ...s.rowValue, fontWeight: 600, color: 'var(--doaide-gold)' }} data-testid="total-tax">{formatINR(result.totalTax)}</span>
              </div>
            </>
          )}

          {result.indexation && (
            <div style={s.box} data-testid="indexation">
              <strong>Grandfathered option for property bought before 23 Jul 2024</strong>
              <div style={s.tableWrap}>
                <table style={s.table}>
                  <thead><tr><th style={s.th}></th><th style={s.th}>12.5% without indexation</th><th style={s.th}>20% with indexation</th></tr></thead>
                  <tbody>
                    <tr><td style={s.td}>Cost</td><td style={s.td}>{formatINR(result.costOfAcquisition + result.improvementCost)}</td><td style={s.td}>{formatINR(result.indexation.indexedCost + result.indexation.indexedImprovement)} (CII {result.indexation.buyCII} → {result.indexation.sellCII})</td></tr>
                    <tr><td style={s.td}>Gain</td><td style={s.td}>{formatINR(result.gain)}</td><td style={s.td}>{formatINR(result.indexation.indexedGain)}</td></tr>
                    <tr><td style={s.td}>Tax (before cess)</td><td style={s.td}>{formatINR(result.indexation.taxWithoutIndexation)}</td><td style={s.td}>{formatINR(result.indexation.taxWithIndexation)}</td></tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 8 }}>Lower tax: <strong>{result.indexation.chosen === 'with' ? '20% with indexation' : '12.5% without indexation'}</strong>.</div>
            </div>
          )}

          {result.lossNote && <div style={s.warn}>{result.lossNote}</div>}
          {result.warnings.map(w => <div style={s.warn} key={w}>{w}</div>)}
          {result.gainType === 'LTCG' && form.assetType === 'property' && result.gain > 0 && (
            <div style={s.box}>Save this tax by buying another house (Section 54) or investing up to ₹50 lakh in 54EC bonds within 6 months of the sale.</div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <ShareButtons text={shareText} url="https://tax.doaide.com/capital-gains-calculator" />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <h2 style={s.h2}>Capital gains tax rates for FY 2026-27</h2>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead><tr><th style={s.th}>Asset</th><th style={s.th}>Long-term after</th><th style={s.th}>STCG</th><th style={s.th}>LTCG</th></tr></thead>
          <tbody>
            <tr><td style={s.td}>Listed shares, equity funds</td><td style={s.td}>12 months</td><td style={s.td}>20%</td><td style={s.td}>12.5% above ₹1.25L</td></tr>
            <tr><td style={s.td}>Listed bonds, gold ETFs</td><td style={s.td}>12 months</td><td style={s.td}>Slab</td><td style={s.td}>12.5%</td></tr>
            <tr><td style={s.td}>Property</td><td style={s.td}>24 months</td><td style={s.td}>Slab</td><td style={s.td}>12.5% (or 20% indexed if bought before 23 Jul 2024)</td></tr>
            <tr><td style={s.td}>Physical gold, unlisted shares</td><td style={s.td}>24 months</td><td style={s.td}>Slab</td><td style={s.td}>12.5%</td></tr>
            <tr><td style={s.td}>Debt funds bought from 1 Apr 2023</td><td style={s.td}>Never</td><td style={s.td}>Slab</td><td style={s.td}>—</td></tr>
            <tr><td style={s.td}>Crypto / VDA</td><td style={s.td}>Not applicable</td><td style={s.td}>30%</td><td style={s.td}>30%</td></tr>
          </tbody>
        </table>
      </div>

      <p style={s.note}>
        Rates exclude surcharge (capped at 15% on equity gains under 111A/112A) and 4% cess is added. For property bought before
        1 April 2001, enter its fair market value on that date as the purchase price. Want to cut equity tax?
        Try the <Link to="/tax-loss-harvesting" style={s.link}>tax-loss harvesting calculator</Link> or read the
        {' '}<Link to="/guides/capital-gains-mutual-funds" style={s.link}>mutual fund capital gains guide</Link>.
      </p>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
