import { Link } from 'react-router-dom'
import SEOHead from '../../components/SEOHead'
import FAQSection from '../../components/FAQSection'
import Breadcrumb from '../../components/Breadcrumb'
import WhatsAppShare from '../../components/WhatsAppShare'

const s = {
  page: { maxWidth: 800, margin: '0 auto' },
  title: { fontFamily: 'var(--doaide-font-display)', fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: 'var(--doaide-text-muted)', fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: 'var(--doaide-font-display)', fontSize: 24, marginTop: 40, marginBottom: 12, color: 'var(--doaide-text)' },
  h3: { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 8, color: 'var(--doaide-text)' },
  p: { fontSize: 15, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', marginBottom: 16 },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 8px', borderBottom: '2px solid var(--doaide-border)', color: 'var(--doaide-text-secondary)', fontWeight: 600, background: 'var(--doaide-surface)' },
  td: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)' },
  tdMono: { padding: '10px 8px', borderBottom: '1px solid var(--doaide-border)', fontFamily: 'var(--doaide-font-mono)' },
  link: { color: 'var(--doaide-gold)', fontWeight: 500, textDecoration: 'none' },
  callout: {
    padding: 20, background: 'var(--doaide-gold-bg)', border: '1px solid var(--doaide-gold-dim)',
    borderRadius: 'var(--doaide-radius-lg)', marginBottom: 24, fontSize: 14, lineHeight: 1.7,
    color: 'var(--doaide-text-secondary)',
  },
  calloutTitle: { fontWeight: 600, color: 'var(--doaide-gold)', marginBottom: 8 },
  example: {
    padding: 20, background: 'var(--doaide-bg-alt)', borderRadius: 'var(--doaide-radius-md)',
    marginBottom: 24, fontSize: 14, lineHeight: 1.8, fontFamily: 'var(--doaide-font-mono)',
    color: 'var(--doaide-text-secondary)', overflowX: 'auto',
  },
  exampleTitle: { fontWeight: 600, color: 'var(--doaide-text)', marginBottom: 12, fontFamily: 'var(--doaide-font-display)', fontSize: 16 },
  ul: { paddingLeft: 24, marginBottom: 16, lineHeight: 1.8, color: 'var(--doaide-text-secondary)', fontSize: 15 },
}

const FAQS = [
  { q: 'What is HRA exemption under Section 10(13A)?', a: 'HRA exemption is a tax benefit for salaried individuals who receive HRA as part of their salary and live in rented accommodation. The exemption is the minimum of: (1) Actual HRA received, (2) 50% of salary for metros or 40% for non-metros, (3) Rent paid minus 10% of salary. Salary here means Basic + DA.' },
  { q: 'Can I claim HRA if I live in my own house?', a: 'No, you cannot claim HRA exemption if you live in your own house. However, if you own a house in City A but work and rent in City B, you can claim both HRA exemption on rent paid in City B and home loan interest deduction on the house in City A.' },
  { q: 'What documents are needed to claim HRA?', a: 'You need rent receipts (monthly or consolidated), rental agreement, and landlord PAN (mandatory if annual rent exceeds ₹1,00,000). You can generate rent receipts using our free Rent Receipt Generator tool.' },
  { q: 'Can I claim HRA in the new tax regime?', a: 'No, HRA exemption under Section 10(13A) is not available under the new tax regime. If HRA exemption saves you more tax than the new regime, consider staying with the old regime. Use our Income Tax Calculator to compare both regimes.' },
  { q: 'Is HRA exemption available if I pay rent to my parents?', a: 'Yes, you can pay rent to your parents and claim HRA exemption, provided: (1) your parents own the house, (2) you have a proper rental agreement, (3) you provide rent receipts, (4) your parents declare the rental income in their ITR. This is a legitimate tax-saving strategy.' },
  { q: 'What happens if I don\'t receive HRA from my employer?', a: 'If your employer does not provide HRA, you can still claim a deduction under Section 80GG for rent paid, up to ₹5,000 per month. Conditions: you must be salaried or self-employed, and neither you nor your spouse should own a house in the city where you work.' },
]

export default function HRAExemptionGuide() {
  return (
    <div style={s.page}>
      <SEOHead
        title="HRA Exemption Calculation with Examples 2026 — Complete Guide | DoAide TaxFile"
        description="Learn how to calculate HRA exemption under Section 10(13A) with step-by-step worked examples for metro and non-metro cities. Updated for FY 2026-27."
        keywords="HRA exemption calculation, HRA calculation with examples, Section 10(13A), HRA tax exemption 2026, house rent allowance calculation"
        canonical="https://tax.doaide.com/guides/hra-exemption-calculation"
        faqs={FAQS}
      />

      <Breadcrumb items={[{ label: 'Guides', path: '/guides' }, { label: 'HRA Exemption Calculation' }]} />

      <h1 style={s.title}>HRA Exemption Calculation with Examples — FY 2026-27</h1>
      <p style={s.meta}>Updated for FY 2026-27 (AY 2027-28) • 12 min read</p>

      <p style={s.p}>
        House Rent Allowance (HRA) is one of the most significant tax-saving components available to salaried employees
        under the old tax regime. If you receive HRA from your employer and pay rent, you can claim a tax exemption under
        Section 10(13A) of the Income Tax Act. This guide explains the formula with worked examples for different salary
        levels and cities.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Calculate Your HRA Instantly</div>
        Use our free <Link to="/hra-calculator" style={s.link}>HRA Exemption Calculator</Link> to find your exact exemption.
        Need rent receipts? Use the <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link>.
      </div>

      <h2 style={s.h2}>HRA Exemption Formula</h2>
      <p style={s.p}>
        The HRA exemption is the <strong>minimum</strong> of the following three amounts:
      </p>
      <ul style={s.ul}>
        <li><strong>Actual HRA received</strong> from your employer during the year</li>
        <li><strong>50% of (Basic + DA)</strong> if you live in a metro city (Delhi, Mumbai, Kolkata, Chennai), or <strong>40% of (Basic + DA)</strong> for non-metro cities</li>
        <li><strong>Rent paid minus 10% of (Basic + DA)</strong></li>
      </ul>
      <p style={s.p}>
        The remaining HRA (Actual HRA − Exemption) becomes part of your taxable salary.
      </p>

      <h2 style={s.h2}>Example 1: Salaried Employee in Mumbai (Metro)</h2>
      <div style={s.example}>
        <div style={s.exampleTitle}>Rahul works in Mumbai</div>
        Basic Salary: ₹6,00,000/year<br />
        DA: ₹0<br />
        HRA Received: ₹3,00,000/year<br />
        Rent Paid: ₹2,40,000/year (₹20,000/month)<br /><br />
        Step 1: Actual HRA = ₹3,00,000<br />
        Step 2: 50% of (Basic + DA) = 50% × ₹6,00,000 = ₹3,00,000<br />
        Step 3: Rent − 10% of salary = ₹2,40,000 − ₹60,000 = ₹1,80,000<br /><br />
        <strong>HRA Exemption = min(₹3,00,000, ₹3,00,000, ₹1,80,000) = ₹1,80,000</strong><br />
        Taxable HRA = ₹3,00,000 − ₹1,80,000 = ₹1,20,000
      </div>

      <h2 style={s.h2}>Example 2: Employee in Bangalore (Non-Metro)</h2>
      <div style={s.example}>
        <div style={s.exampleTitle}>Priya works in Bangalore</div>
        Basic Salary: ₹8,00,000/year<br />
        DA: ₹1,00,000/year<br />
        HRA Received: ₹4,00,000/year<br />
        Rent Paid: ₹3,60,000/year (₹30,000/month)<br /><br />
        Salary for HRA = Basic + DA = ₹9,00,000<br /><br />
        Step 1: Actual HRA = ₹4,00,000<br />
        Step 2: 40% of ₹9,00,000 = ₹3,60,000 (non-metro)<br />
        Step 3: Rent − 10% of salary = ₹3,60,000 − ₹90,000 = ₹2,70,000<br /><br />
        <strong>HRA Exemption = min(₹4,00,000, ₹3,60,000, ₹2,70,000) = ₹2,70,000</strong><br />
        Taxable HRA = ₹4,00,000 − ₹2,70,000 = ₹1,30,000
      </div>

      <h2 style={s.h2}>Example 3: High Salary in Delhi (Metro)</h2>
      <div style={s.example}>
        <div style={s.exampleTitle}>Amit works in Delhi with CTC ₹25 LPA</div>
        Basic Salary: ₹12,50,000/year<br />
        DA: ₹0<br />
        HRA Received: ₹6,25,000/year<br />
        Rent Paid: ₹6,00,000/year (₹50,000/month)<br /><br />
        Step 1: Actual HRA = ₹6,25,000<br />
        Step 2: 50% of ₹12,50,000 = ₹6,25,000 (metro)<br />
        Step 3: Rent − 10% of salary = ₹6,00,000 − ₹1,25,000 = ₹4,75,000<br /><br />
        <strong>HRA Exemption = min(₹6,25,000, ₹6,25,000, ₹4,75,000) = ₹4,75,000</strong><br />
        Tax saving at 30% slab: ₹4,75,000 × 31.2% = ₹1,48,200/year
      </div>

      <h2 style={s.h2}>Metro vs Non-Metro Cities</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>City Type</th>
              <th style={s.th}>Cities</th>
              <th style={s.th}>% of Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Metro</td><td style={s.td}>Delhi, Mumbai, Kolkata, Chennai</td><td style={s.tdMono}>50%</td></tr>
            <tr><td style={s.td}>Non-Metro</td><td style={s.td}>Bangalore, Hyderabad, Pune, Ahmedabad, Jaipur, and all others</td><td style={s.tdMono}>40%</td></tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        Note: Despite being major IT hubs, Bangalore, Hyderabad, Pune, and Gurgaon are classified as non-metro for HRA purposes.
        Only the four cities listed above qualify as metro.
      </p>

      <h2 style={s.h2}>Tax-Saving Strategy: Pay Rent to Parents</h2>
      <p style={s.p}>
        If you live with your parents and they own the house, you can pay rent to them and claim HRA exemption. This is a
        completely legal tax-saving strategy. Your parents will need to declare the rental income, but if they are in a lower
        tax bracket or are senior citizens, the overall family tax outgo reduces.
      </p>
      <ul style={s.ul}>
        <li>Execute a proper rental agreement</li>
        <li>Pay rent via bank transfer for audit trail</li>
        <li>Provide landlord PAN if annual rent exceeds ₹1 lakh</li>
        <li>Generate rent receipts using our <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link></li>
      </ul>

      <h2 style={s.h2}>HRA vs New Tax Regime</h2>
      <p style={s.p}>
        HRA exemption is only available under the old tax regime. The new regime offers lower slab rates but removes
        HRA, 80C, and most other deductions. If your HRA exemption + 80C + 80D exceeds ₹3-4 lakh, the old regime
        with HRA often saves more tax.
      </p>
      <p style={s.p}>
        <Link to="/income-tax-calculator" style={s.link}>→ Compare both regimes with your actual salary</Link>
      </p>

      <h2 style={s.h2}>Documents Required for HRA Claim</h2>
      <ul style={s.ul}>
        <li>Rent receipts (monthly or annual consolidated)</li>
        <li>Rental agreement with landlord</li>
        <li>Landlord PAN (mandatory if annual rent &gt; ₹1,00,000)</li>
        <li>Bank statements showing rent payments</li>
      </ul>

      <h2 style={s.h2}>Section 80GG: No HRA? Still Claim Rent Deduction</h2>
      <p style={s.p}>
        If your employer does not provide HRA (common for self-employed or contract workers), you can claim rent
        deduction under Section 80GG. The deduction is the minimum of:
      </p>
      <ul style={s.ul}>
        <li>₹5,000 per month (₹60,000/year)</li>
        <li>25% of total income</li>
        <li>Rent paid minus 10% of total income</li>
      </ul>
      <p style={s.p}>
        This is much more limited than HRA exemption, but still useful for freelancers and consultants.
      </p>

      <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <WhatsAppShare text="HRA Exemption Calculation with Examples — Complete guide for FY 2026-27\n\ntax.doaide.com/guides/hra-exemption-calculation" />
      </div>

      <FAQSection faqs={FAQS} />
    </div>
  )
}
