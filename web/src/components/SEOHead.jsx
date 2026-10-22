import { useEffect } from 'react'

export const SITE_URL = 'https://tax.doaide.com'
const CONTENT_SECTION = /^\/(guides|blog|compare)(\/|$)/

export function canonicalFor(pathname) {
  const clean = (pathname || '/').replace(/\/+$/, '')
  return clean ? SITE_URL + clean : SITE_URL + '/'
}

// Calculator/tool pages get WebApplication markup; guides, blog and comparisons don't.
export function isToolPath(pathname) {
  return pathname !== '/' && !CONTENT_SECTION.test(pathname) && pathname !== '/best-income-tax-calculator'
}

export default function SEOHead({ title, description, keywords, canonical: canonicalProp, jsonLd, faqs, breadcrumbs }) {
  useEffect(() => {
    const pathname = window.location.pathname
    const canonical = canonicalProp || canonicalFor(pathname)
    document.title = title
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    const setOG = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', prop)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    if (description) {
      setMeta('description', description)
      setOG('og:description', description)
    }
    if (keywords) setMeta('keywords', keywords)
    setOG('og:title', title)
    setOG('og:type', 'website')
    setOG('og:site_name', 'DoAide TaxFile')
    setOG('og:image', 'https://tax.doaide.com/og-image.png')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    if (description) setMeta('twitter:description', description)
    setMeta('twitter:image', 'https://tax.doaide.com/og-image.png')
    if (canonical) {
      setOG('og:url', canonical)
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }

    let ld = document.getElementById('jsonld-taxfile')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = 'jsonld-taxfile'
      document.head.appendChild(ld)
    }
    const schemas = [
      jsonLd || {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: description || 'Free income tax tools for India',
        url: canonical || 'https://tax.doaide.com',
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
      },
    ]
    if (!jsonLd && isToolPath(pathname)) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: title.split(/ [—|] /)[0],
        description: description || title,
        url: canonical,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
      })
    }
    if (faqs && faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })
    }
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
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
      })
    }
    ld.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
  }, [title, description, keywords, canonicalProp, jsonLd, faqs, breadcrumbs])

  return null
}
