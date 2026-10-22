// @vitest-environment node
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { appShellHead, canonicalUrl, finalizeHead, pageName } from './seoHead.mjs'
import { cacheControl, contentType, resolveRequest } from './static-server.mjs'

const ROOT = new URL('..', import.meta.url).pathname

const HEAD = `<!DOCTYPE html><html><head>
<meta name="robots" content="index, follow">
<meta property="og:url" content="https://tax.doaide.com/">
<link rel="canonical" href="https://tax.doaide.com/">
<script type="application/ld+json" data-home-only>{"@type":"FAQPage"}</script>
<title>HRA Exemption Calculator FY 2026-27 — Free | DoAide TaxFile</title>
</head><body><div id="root"></div></body></html>`

const ldTypes = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')]
  .map(el => JSON.parse(el.textContent)['@type'])

describe('finalizeHead', () => {
  it('points canonical and og:url at the route itself', () => {
    const { document } = new JSDOM(HEAD).window
    finalizeHead(document, '/hra-calculator')
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe('https://tax.doaide.com/hra-calculator')
    expect(document.querySelector('meta[property="og:url"]').getAttribute('content')).toBe('https://tax.doaide.com/hra-calculator')
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
  })

  it('adds a BreadcrumbList with the section for nested pages', () => {
    const { document } = new JSDOM(HEAD).window
    finalizeHead(document, '/blog/itr-filing-deadlines-2027')
    const crumbs = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map(el => JSON.parse(el.textContent)).find(d => d['@type'] === 'BreadcrumbList')
    expect(crumbs.itemListElement.map(i => i.name)).toEqual(['Home', 'Blog', 'HRA Exemption Calculator FY 2026-27'])
    expect(crumbs.itemListElement.at(-1).item).toBe('https://tax.doaide.com/blog/itr-filing-deadlines-2027')
  })

  it('does not add a second BreadcrumbList when the page has one', () => {
    const { document } = new JSDOM(HEAD.replace('</head>', '<script type="application/ld+json">[{"@type":"BreadcrumbList"}]</script></head>')).window
    finalizeHead(document, '/hra-calculator')
    expect(ldTypes(document).filter(t => t === 'BreadcrumbList')).toHaveLength(0)
  })

  it('keeps the homepage canonical with a trailing slash and no breadcrumb', () => {
    const { document } = new JSDOM(HEAD).window
    finalizeHead(document, '/')
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe('https://tax.doaide.com/')
    expect(ldTypes(document)).not.toContain('BreadcrumbList')
  })
})

describe('appShellHead', () => {
  it('strips canonical and homepage-only data and sets noindex', () => {
    const { document } = new JSDOM(HEAD).window
    appShellHead(document)
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.querySelector('script[data-home-only]')).toBeNull()
    expect(document.querySelector('meta[name="robots"]').getAttribute('content')).toBe('noindex, follow')
  })
})

describe('helpers', () => {
  it('builds canonical URLs without trailing slashes', () => {
    expect(canonicalUrl('/hra-calculator/')).toBe('https://tax.doaide.com/hra-calculator')
    expect(pageName('Capital Gains Tax Calculator FY 2026-27 — LTCG | DoAide TaxFile')).toBe('Capital Gains Tax Calculator FY 2026-27')
  })
})

describe('static server resolution', () => {
  let root
  beforeAll(async () => {
    root = await mkdtemp(join(tmpdir(), 'tf-dist-'))
    await mkdir(join(root, 'hra-calculator'))
    await mkdir(join(root, 'assets'))
    await writeFile(join(root, 'index.html'), 'home')
    await writeFile(join(root, 'app-shell.html'), 'shell')
    await writeFile(join(root, 'hra-calculator', 'index.html'), 'hra')
    await writeFile(join(root, 'assets', 'app.js'), 'js')
  })

  it('serves prerendered route directories', async () => {
    expect((await resolveRequest(root, '/hra-calculator')).file).toBe(join(root, 'hra-calculator', 'index.html'))
    expect((await resolveRequest(root, '/hra-calculator/')).file).toBe(join(root, 'hra-calculator', 'index.html'))
    expect((await resolveRequest(root, '/')).file).toBe(join(root, 'index.html'))
  })

  it('falls back to the SPA shell for unknown routes and 404s missing assets', async () => {
    expect(await resolveRequest(root, '/embed/income-tax-calculator')).toEqual({ status: 200, file: join(root, 'app-shell.html') })
    expect(await resolveRequest(root, '/assets/missing.js')).toEqual({ status: 404, file: null })
  })

  it('refuses path traversal', async () => {
    expect((await resolveRequest(root, '/../../etc/passwd')).file).not.toMatch(/passwd/)
  })

  it('sets types and caching', () => {
    expect(contentType('/x/sitemap.xml')).toMatch(/application\/xml/)
    expect(cacheControl('/assets/app.js')).toMatch(/immutable/)
    expect(cacheControl('/hra-calculator')).toBe('no-cache')
  })
})

describe('routes.json', () => {
  it('lists every indexable route in App.jsx exactly once', async () => {
    const routes = JSON.parse(await readFile(join(ROOT, 'src/seo/routes.json'), 'utf8'))
    const app = await readFile(join(ROOT, 'src/App.jsx'), 'utf8')
    const appPaths = [...app.matchAll(/path="([^"]+)"/g)].map(m => (m[1].startsWith('/') ? m[1] : `/blog/${m[1]}`))
    const indexable = appPaths.filter(p => !p.startsWith('/embed/') && !p.startsWith('/tools/'))
    expect(new Set(routes).size).toBe(routes.length)
    expect([...new Set([...indexable, '/blog'])].sort()).toEqual([...routes].sort())
  })
})
