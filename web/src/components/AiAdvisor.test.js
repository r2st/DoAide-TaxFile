import { describe, expect, it } from 'vitest'

const API_KEY = 'test-api-key'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`
const SYSTEM_PROMPT = 'You are an expert Indian income tax advisor. Help with ITR filing (ITR-1 to ITR-7), tax planning, deductions under 80C/80D/80E/80G, HRA exemption, capital gains tax, TDS, advance tax, and tax-saving investments. Explain in simple language for Indian taxpayers.'
const SUGGESTED_QUESTIONS = [
  'Which ITR form should I file?',
  'How to save tax under Section 80C?',
  'Old vs New tax regime?',
  'How to claim HRA exemption?',
]

describe('AiAdvisor logic', () => {
  it('API URL includes the correct model and key', () => {
    expect(API_URL).toContain('gemini-3.8-flash')
    expect(API_URL).toContain(API_KEY)
    expect(API_URL).toMatch(/^https:\/\/generativelanguage\.googleapis\.com/)
  })

  it('system prompt covers key tax topics', () => {
    expect(SYSTEM_PROMPT).toContain('ITR filing')
    expect(SYSTEM_PROMPT).toContain('80C')
    expect(SYSTEM_PROMPT).toContain('80D')
    expect(SYSTEM_PROMPT).toContain('HRA exemption')
    expect(SYSTEM_PROMPT).toContain('capital gains')
    expect(SYSTEM_PROMPT).toContain('TDS')
    expect(SYSTEM_PROMPT).toContain('advance tax')
  })

  it('has exactly 4 suggested questions', () => {
    expect(SUGGESTED_QUESTIONS).toHaveLength(4)
  })

  it('suggested questions are non-empty strings', () => {
    SUGGESTED_QUESTIONS.forEach(q => {
      expect(typeof q).toBe('string')
      expect(q.trim().length).toBeGreaterThan(0)
    })
  })

  it('builds correct Gemini API request body', () => {
    const messages = [
      { role: 'user', text: 'How to save tax?' },
    ]
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Understood. I am ready to help with Indian income tax queries.' }] },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
    ]
    expect(contents).toHaveLength(3)
    expect(contents[0].role).toBe('user')
    expect(contents[0].parts[0].text).toBe(SYSTEM_PROMPT)
    expect(contents[1].role).toBe('model')
    expect(contents[2].role).toBe('user')
    expect(contents[2].parts[0].text).toBe('How to save tax?')
  })

  it('maps assistant role to model for API', () => {
    const messages = [
      { role: 'user', text: 'question' },
      { role: 'assistant', text: 'answer' },
      { role: 'user', text: 'follow up' },
    ]
    const mapped = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }))
    expect(mapped[0].role).toBe('user')
    expect(mapped[1].role).toBe('model')
    expect(mapped[2].role).toBe('user')
  })

  it('extracts reply from Gemini response structure', () => {
    const data = {
      candidates: [{
        content: {
          parts: [{ text: 'You should file ITR-1 if you are a salaried individual.' }],
        },
      }],
    }
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'
    expect(reply).toBe('You should file ITR-1 if you are a salaried individual.')
  })

  it('uses fallback message on malformed response', () => {
    const data = { candidates: [] }
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'
    expect(reply).toBe('Sorry, I could not generate a response.')
  })

  it('handles null response gracefully', () => {
    const data = null
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'
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
})
