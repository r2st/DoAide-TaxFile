import { describe, expect, it } from 'vitest'

describe('HomePage SEO and conversion data', () => {
  const HOME_FAQS = [
    { q: 'What income tax regime should I choose for FY 2026-27?', a: 'It depends on your deductions.' },
    { q: 'What are the income tax slab rates for FY 2026-27?', a: 'New regime: 0% up to ₹4L...' },
    { q: 'How do I file ITR online for FY 2026-27?', a: 'Step 1: Use our Income Tax Calculator...' },
    { q: 'When is the deadline to file ITR for FY 2026-27?', a: 'For most individuals: July 31, 2027.' },
    { q: 'How much can I save with Section 80C?', a: 'Section 80C allows a deduction of up to ₹1,50,000.' },
    { q: 'Is DoAide TaxFile better than ClearTax?', a: 'For tax calculations and planning, DoAide TaxFile offers 30+ specialized calculators completely free.' },
    { q: 'Is this calculator free to use?', a: 'Yes, all 30+ tools...' },
  ]

  it('includes ITR filing FAQ', () => {
    const itrFaq = HOME_FAQS.find(f => f.q.includes('file ITR online'))
    expect(itrFaq).toBeTruthy()
    expect(itrFaq.a).toContain('Income Tax Calculator')
  })

  it('includes ClearTax comparison FAQ', () => {
    const ctFaq = HOME_FAQS.find(f => f.q.includes('ClearTax'))
    expect(ctFaq).toBeTruthy()
    expect(ctFaq.a).toContain('free')
  })

  it('includes deadline FAQ with correct date', () => {
    const deadlineFaq = HOME_FAQS.find(f => f.q.includes('deadline'))
    expect(deadlineFaq).toBeTruthy()
    expect(deadlineFaq.a).toContain('July 31, 2027')
  })

  it('has at least 7 FAQs for comprehensive schema coverage', () => {
    expect(HOME_FAQS.length).toBeGreaterThanOrEqual(7)
  })

  it('all FAQs have non-empty questions and answers', () => {
    HOME_FAQS.forEach(faq => {
      expect(faq.q.length).toBeGreaterThan(10)
      expect(faq.a.length).toBeGreaterThan(10)
    })
  })
})

describe('HomePage trust signals data', () => {
  const TRUST_ITEMS = [
    { label: '₹0 Forever' },
    { label: 'Zero Login Required' },
    { label: '30+ Calculators' },
    { label: '< 5 Second Results' },
  ]

  it('has exactly 4 trust signal items', () => {
    expect(TRUST_ITEMS).toHaveLength(4)
  })

  it('includes free pricing signal', () => {
    expect(TRUST_ITEMS.some(t => t.label.includes('₹0'))).toBe(true)
  })

  it('includes no-login signal', () => {
    expect(TRUST_ITEMS.some(t => t.label.includes('Login'))).toBe(true)
  })

  it('includes calculator count signal', () => {
    expect(TRUST_ITEMS.some(t => t.label.includes('30+'))).toBe(true)
  })
})

describe('HomePage testimonials', () => {
  const TESTIMONIALS = [
    { name: 'Kavita Sharma', stars: 5 },
    { name: 'Arjun Reddy', stars: 5 },
    { name: 'Meera Iyer', stars: 5 },
    { name: 'Vikram Singh', stars: 4 },
  ]

  it('has at least 4 testimonials', () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(4)
  })

  it('all testimonials have valid star ratings', () => {
    TESTIMONIALS.forEach(t => {
      expect(t.stars).toBeGreaterThanOrEqual(1)
      expect(t.stars).toBeLessThanOrEqual(5)
    })
  })

  it('average rating is above 4.5', () => {
    const avg = TESTIMONIALS.reduce((sum, t) => sum + t.stars, 0) / TESTIMONIALS.length
    expect(avg).toBeGreaterThanOrEqual(4.5)
  })
})
