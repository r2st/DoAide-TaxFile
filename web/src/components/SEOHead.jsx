import { useEffect } from 'react'

export default function SEOHead({ title, description, keywords, canonical }) {
  useEffect(() => {
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
    if (description) setMeta('description', description)
    if (keywords) setMeta('keywords', keywords)

    let link = document.querySelector('link[rel="canonical"]')
    if (canonical) {
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
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'DoAide TaxFile',
      description: description || 'Free income tax tools for India',
      url: canonical || 'https://tax.doaide.com',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    })
  }, [title, description, keywords, canonical])

  return null
}
