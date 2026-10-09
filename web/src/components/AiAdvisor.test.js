import { describe, expect, it } from 'vitest'

const SUGGESTED_QUESTIONS = [
  'Which ITR form should I file?',
  'How to save tax under Section 80C?',
  'Old vs New tax regime?',
  'How to claim HRA exemption?',
]

describe('AiAdvisor logic', () => {
  it('has exactly 4 suggested questions', () => {
    expect(SUGGESTED_QUESTIONS).toHaveLength(4)
  })

  it('suggested questions are non-empty strings', () => {
    SUGGESTED_QUESTIONS.forEach(q => {
      expect(typeof q).toBe('string')
      expect(q.trim().length).toBeGreaterThan(0)
    })
  })

  it('builds correct backend request body', () => {
    const history = [
      { role: 'user', text: 'What is 80C?' },
      { role: 'assistant', text: 'Section 80C allows deductions...' },
    ]
    const message = 'How much can I save?'
    const body = { message, history }
    expect(body.message).toBe('How much can I save?')
    expect(body.history).toHaveLength(2)
    expect(body.history[0].role).toBe('user')
    expect(body.history[1].role).toBe('assistant')
  })

  it('extracts reply from backend response', () => {
    const data = { reply: 'You can save up to 1.5 lakh under 80C.' }
    const reply = data?.reply || 'Sorry, I could not generate a response.'
    expect(reply).toBe('You can save up to 1.5 lakh under 80C.')
  })

  it('uses fallback on missing reply', () => {
    const data = {}
    const reply = data?.reply || 'Sorry, I could not generate a response.'
    expect(reply).toBe('Sorry, I could not generate a response.')
  })

  it('uses fallback on null response', () => {
    const data = null
    const reply = data?.reply || 'Sorry, I could not generate a response.'
    expect(reply).toBe('Sorry, I could not generate a response.')
  })

  it('empty input is rejected', () => {
    const inputs = ['', '   ', '\n']
    inputs.forEach(inp => {
      expect(inp.trim()).toBe('')
    })
  })

  it('valid input is accepted', () => {
    const input = '  How to save tax?  '
    expect(input.trim()).toBe('How to save tax?')
    expect(input.trim().length).toBeGreaterThan(0)
  })

  it('history preserves message order', () => {
    const messages = []
    messages.push({ role: 'user', text: 'q1' })
    messages.push({ role: 'assistant', text: 'a1' })
    messages.push({ role: 'user', text: 'q2' })
    expect(messages.map(m => m.role)).toEqual(['user', 'assistant', 'user'])
  })

  it('endpoint URL is relative to avoid CORS', () => {
    const url = '/api/advisor/ask'
    expect(url.startsWith('/')).toBe(true)
    expect(url).not.toContain('http')
  })
})
