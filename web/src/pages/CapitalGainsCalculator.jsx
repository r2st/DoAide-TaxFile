import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ShareButtons from '../components/ShareButtons'
import PrintButton from '../components/PrintButton'
import FAQSection from '../components/FAQSection'
import { calculateCapitalGains, formatINR, formatPct } from '../lib/taxEngine'

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
  gainType: {
    display: 'inline-block', padding: '4px 12px', borderRadius: 12, fontSize: 13, fontWeight: 600,
    marginBottom: 16,
  },
}

const ASSET_OPTIONS = [
  { value: 'equity', label: 'Listed Equity / Equity Mutual Funds' },
  { value: 'debt', label: 'Debt Mutual Funds / Bonds' },
  { value: 'real_estate', label: 'Real Estate / Property' },
  { value: 'gold', label: 'Gold / Gold ETF / SGB' },
  { value: 'crypto', label: 'Crypto / Virtual Digital Assets' },
]

const FAQS = [
  { q: 'What is the LTCG tax rate on equity?', a: 'For FY 2026-27, LTCG on listed equity and equity mutual funds is taxed at 12.5% on gains exceeding ₹1.25 lakh. Short-term gains (holding < 12 months) are taxed at 20%.' },
  { q: 'Is indexation available for capital gains?', a: 'From FY 2025-26 onwards, indexation benefit has been removed for all asset classes. Long-term capital gains are now taxed at a flat rate of 12.5% without indexation.' },
  { q: 'What is the holding period for LTCG?', a: 'Equity: 12 months. Debt, real estate, gold: 24 months. Crypto: 12 months. Gains on assets held for less than the threshold period are classified as STCG.' },
  { q: 'How is crypto taxed in India?', a: 'Crypto (VDA) gains are taxed at 12.5% (LTCG, held > 12 months) or 20% (STCG). No deductions are allowed except the cost of acquisition. TDS of 1% applies on transfers above ₹50,000.' },
]

export default function CapitalGainsCalculator() {
  const [form, setForm] = useState({ assetType: 'equity', purchasePrice: '', salePrice: '', holdingMonths: '' })
  const [result, setResult] = useState(null)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const calculate = () => {
    const r = calculateCapitalGains(
      form.assetType,
      Number(form.purchasePrice) || 0,
      Number(form.salePrice) || 0,
      Number(form.holdingMonths) || 0,
    )
    setResult(r)
  }

  const shareText = result
    ? `Capital Gains: ${formatINR(result.gain)} (${result.gainType})\nTax: ${result.taxedAtSlab ? 'At slab rate' : formatINR(result.totalTax)}\n\ntax.doaide.com`
    : ''

  return (
    <div style={s.page}>
      <SEOHead
        title="Capital Gains Tax Calculator 2026 — STCG & LTCG Free | DoAide TaxFile"
        description="Free capital gains tax calculator for India FY 2026-27. Calculate STCG and LTCG on equity, mutual funds, real estate, gold, and crypto. Instant results, no login."
        keywords="capital gains calculator India 2026, LTCG calculator, STCG tax calculator, equity capital gains, crypto tax India, mutual fund capital gains"
        canonical="https://tax.doaide.com/capital-gains-calculator"
        faqs={FAQS}
        breadcrumbs={[{ name: 'Capital Gains Calculator', url: 'https://tax.doaide.com/capital-gains-calculator' }]}
      />

      <h1 style={s.title}>Capital Gains Calculator</h1>
      <p style={s.subtitle}>FY 2026-27 — STCG and LTCG tax on all asset types</p>

      <div style={s.form}>
        <InputField label="Asset Type" type="select" value={form.assetType} onChange={set('assetType')} options={ASSET_OPTIONS} />
        <InputField label="Purchase Price" value={form.purchasePrice} onChange={set('purchasePrice')} currency />
        <InputField label="Sale Price" value={form.salePrice} onChange={set('salePrice')} currency />
        <InputField label="Holding Period (Months)" type="number" value={form.holdingMonths} onChange={set('holdingMonths')} />
      </div>

      <button style={s.btn} onClick={calculate}>Calculate Capital Gains</button>

      {result && (
        <ResultCard gold>
          <span style={{
            ...s.gainType,
            background: result.gainType === 'LTCG' ? 'var(--doaide-gold-bg)' : 'rgba(251,191,36,0.1)',
            color: result.gainType === 'LTCG' ? 'var(--doaide-gold)' : 'var(--doaide-warning)',
          }}>
            {result.gainType} — {result.holdingMonths} months held
          </span>

          <div style={s.row}>
            <span style={s.rowLabel}>Purchase Price</span>
            <span style={s.rowValue}>{formatINR(result.purchasePrice)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Sale Price</span>
            <span style={s.rowValue}>{formatINR(result.salePrice)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>{result.gainType === 'LTCG' ? 'Long-Term' : 'Short-Term'} Gain</span>
            <span style={{ ...s.rowValue, color: result.gain >= 0 ? 'var(--doaide-success)' : 'var(--doaide-error)' }}>
              {formatINR(result.gain)}
            </span>
          </div>
          {result.exemption > 0 && (
            <div style={s.row}>
              <span style={s.rowLabel}>Exemption (Section 112A)</span>
              <span style={s.rowValue}>{formatINR(result.exemption)}</span>
            </div>
          )}
          <div style={s.row}>
            <span style={s.rowLabel}>Taxable Gain</span>
            <span style={s.rowValue}>{formatINR(result.taxableGain)}</span>
          </div>
          <div style={s.row}>
            <span style={s.rowLabel}>Tax Rate</span>
            <span style={s.rowValue}>{result.taxedAtSlab ? 'Slab rate' : formatPct(result.rate)}</span>
          </div>
          {!result.taxedAtSlab && (
            <>
              <div style={s.row}>
                <span style={s.rowLabel}>Tax</span>
                <span style={s.rowValue}>{formatINR(result.tax)}</span>
              </div>
              <div style={s.row}>
                <span style={s.rowLabel}>Cess (4%)</span>
                <span style={s.rowValue}>{formatINR(result.cess)}</span>
              </div>
              <div style={{ ...s.row, borderBottom: 'none', fontSize: 16 }}>
                <span style={{ fontWeight: 600 }}>Total Tax</span>
                <span style={{ fontFamily: 'var(--doaide-font-mono)', fontWeight: 600, color: 'var(--doaide-gold)' }}>
                  {formatINR(result.totalTax)}
                </span>
              </div>
            </>
          )}
          {result.taxedAtSlab && (
            <div style={{ padding: '12px 0', color: 'var(--doaide-text-secondary)', fontSize: 14 }}>
              Debt fund gains are taxed at your income tax slab rate. Use the Income Tax Calculator to compute your exact liability.
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <ShareButtons text={shareText} />
            <PrintButton />
          </div>
        </ResultCard>
      )}

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 22, marginBottom: 16 }}>Worked Examples</h2>

        <div style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 }}>Equity MF — LTCG with exemption</div>
          Buy: ₹5,00,000 | Sell: ₹7,50,000 | Held: 26 months<br/>
          Gain: ₹2.5L | Exempt: ₹1.25L | Taxable: ₹1.25L<br/>
          Tax: ₹1.25L × 12.5% + 4% cess = <strong>₹16,250</strong>
        </div>

        <div style={{ padding: 16, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)', marginBottom: 16, fontSize: 13, fontFamily: 'var(--doaide-font-mono)', lineHeight: 1.7, color: 'var(--doaide-text-secondary)' }}>
          <div style={{ fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 8, fontFamily: 'var(--doaide-font-display)', fontSize: 15 }}>Crypto — STCG</div>
          Buy: ₹1,00,000 | Sell: ₹1,80,000 | Held: 6 months<br/>
          Gain: ₹80,000 | STCG rate: 20%<br/>
          Tax: ₹80K × 20% + 4% cess = <strong>₹16,640</strong>
        </div>

        <p style={{ fontSize: 14, color: 'var(--doaide-text-secondary)' }}>
          Read our detailed <a href="/guides/capital-gains-mutual-funds" style={{ color: 'var(--doaide-gold)', textDecoration: 'none' }}>Capital Gains on Mutual Funds Guide</a> for SIP taxation, debt fund rules, and tax-saving strategies.
        </p>
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
