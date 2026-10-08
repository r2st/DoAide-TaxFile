import { describe, it, expect } from 'vitest'

const BLOG_ARTICLES = [
  { slug: 'income-tax-slabs-2026-27', file: 'IncomeTaxSlabs2026' },
  { slug: 'how-to-file-itr-online-free', file: 'HowToFileITR' },
  { slug: 'section-80c-deductions-complete-guide', file: 'Section80CDeductions' },
  { slug: 'nps-vs-ppf-vs-elss-comparison', file: 'NpsVsPpfVsElss' },
  { slug: 'how-to-save-income-tax-legally-india-2026', file: 'SaveIncomeTaxLegally2026' },
  { slug: 'section-80c-investment-options-compared', file: 'Section80CInvestmentOptions' },
  { slug: 'new-vs-old-tax-regime-calculator', file: 'NewVsOldRegimeCalculatorBlog' },
]

describe('Blog articles data', () => {
  it('has 7 blog articles', () => {
    expect(BLOG_ARTICLES.length).toBe(7)
  })

  it('all slugs are unique', () => {
    const slugs = BLOG_ARTICLES.map(a => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all slugs are kebab-case', () => {
    for (const a of BLOG_ARTICLES) {
      expect(a.slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('all file names are non-empty', () => {
    for (const a of BLOG_ARTICLES) {
      expect(a.file).toBeTruthy()
    }
  })
})
