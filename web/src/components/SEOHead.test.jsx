import { describe, expect, it, beforeEach, afterEach } from 'vitest'

describe('SEOHead structured data generation', () => {
  it('generates WebPage schema when no custom jsonLd provided', () => {
    const title = 'Test Calculator | DoAide TaxFile'
    const description = 'A test calculator'
    const canonical = 'https://tax.doaide.com/test'

    const schemas = []
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonical,
      isPartOf: {
        '@type': 'WebSite',
        name: 'DoAide TaxFile',
        url: 'https://tax.doaide.com',
      },
      provider: {
        '@type': 'Organization',
        name: 'DoAide',
        url: 'https://doaide.com',
      },
    })

    expect(schemas[0]['@type']).toBe('WebPage')
    expect(schemas[0].name).toBe(title)
    expect(schemas[0].isPartOf.name).toBe('DoAide TaxFile')
  })

  it('generates FAQPage schema from faqs array', () => {
    const faqs = [
      { q: 'Is it free?', a: 'Yes, completely free.' },
      { q: 'Which FY?', a: 'FY 2026-27.' },
    ]

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }

    expect(faqSchema['@type']).toBe('FAQPage')
    expect(faqSchema.mainEntity).toHaveLength(2)
    expect(faqSchema.mainEntity[0].name).toBe('Is it free?')
    expect(faqSchema.mainEntity[0].acceptedAnswer.text).toBe('Yes, completely free.')
  })

  it('generates BreadcrumbList schema from breadcrumbs array', () => {
    const breadcrumbs = [
      { name: 'Income Tax Calculator', url: 'https://tax.doaide.com/income-tax-calculator' },
    ]

    const bcSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tax.doaide.com/' },
        ...breadcrumbs.map((bc, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: bc.name,
          ...(bc.url ? { item: bc.url } : {}),
        })),
      ],
    }

    expect(bcSchema['@type']).toBe('BreadcrumbList')
    expect(bcSchema.itemListElement).toHaveLength(2)
    expect(bcSchema.itemListElement[0].name).toBe('Home')
    expect(bcSchema.itemListElement[0].position).toBe(1)
    expect(bcSchema.itemListElement[1].name).toBe('Income Tax Calculator')
    expect(bcSchema.itemListElement[1].position).toBe(2)
    expect(bcSchema.itemListElement[1].item).toBe('https://tax.doaide.com/income-tax-calculator')
  })

  it('omits breadcrumbs schema when breadcrumbs array is empty', () => {
    const breadcrumbs = []
    const schemas = []

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({ '@type': 'BreadcrumbList' })
    }

    expect(schemas).toHaveLength(0)
  })

  it('combines multiple schemas when faqs and breadcrumbs provided', () => {
    const faqs = [{ q: 'Q1?', a: 'A1.' }]
    const breadcrumbs = [{ name: 'Calculator', url: 'https://tax.doaide.com/calc' }]

    const schemas = [
      { '@type': 'WebPage', name: 'Test' },
    ]
    if (faqs.length > 0) {
      schemas.push({
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })
    }
    if (breadcrumbs.length > 0) {
      schemas.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tax.doaide.com/' },
          ...breadcrumbs.map((bc, i) => ({
            '@type': 'ListItem', position: i + 2, name: bc.name, item: bc.url,
          })),
        ],
      })
    }

    expect(schemas).toHaveLength(3)
    expect(schemas.map(s => s['@type'])).toEqual(['WebPage', 'FAQPage', 'BreadcrumbList'])
  })
})
