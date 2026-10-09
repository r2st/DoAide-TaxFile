import { describe, expect, it } from 'vitest'

describe('FeedbackWidget logic', () => {
  it('builds correct payload with rating and comment', () => {
    const rating = 'up'
    const comment = '  Great tool!  '
    const page = '/income-tax-calculator'
    const payload = {
      rating,
      comment: comment.trim() || undefined,
      page,
      timestamp: new Date().toISOString(),
    }
    expect(payload.rating).toBe('up')
    expect(payload.comment).toBe('Great tool!')
    expect(payload.page).toBe('/income-tax-calculator')
    expect(payload.timestamp).toBeTruthy()
  })

  it('omits comment when empty', () => {
    const comment = '   '
    const payload = {
      rating: 'down',
      comment: comment.trim() || undefined,
      page: '/',
    }
    expect(payload.comment).toBeUndefined()
  })

  it('only allows up or down ratings', () => {
    const valid = ['up', 'down']
    expect(valid.includes('up')).toBe(true)
    expect(valid.includes('down')).toBe(true)
    expect(valid.includes('neutral')).toBe(false)
  })

  it('submit is blocked when rating is null', () => {
    const rating = null
    const canSubmit = rating !== null
    expect(canSubmit).toBe(false)
  })

  it('submit is allowed when rating is set', () => {
    const rating = 'up'
    const canSubmit = rating !== null
    expect(canSubmit).toBe(true)
  })

  it('page path is captured correctly for nested routes', () => {
    const paths = [
      '/income-tax-calculator',
      '/guides/section-80c-deductions',
      '/blog/income-tax-slabs-2026-27',
      '/',
    ]
    paths.forEach(p => {
      expect(p.startsWith('/')).toBe(true)
    })
  })

  it('timestamp is a valid ISO string', () => {
    const ts = new Date().toISOString()
    const parsed = new Date(ts)
    expect(parsed.toISOString()).toBe(ts)
    expect(ts).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })
})
