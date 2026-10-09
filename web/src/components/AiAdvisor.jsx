import { useState, useRef, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`
const SYSTEM_PROMPT = 'You are an expert Indian income tax advisor. Help with ITR filing (ITR-1 to ITR-7), tax planning, deductions under 80C/80D/80E/80G, HRA exemption, capital gains tax, TDS, advance tax, and tax-saving investments. Explain in simple language for Indian taxpayers.'

const SUGGESTED_QUESTIONS = [
  'Which ITR form should I file?',
  'How to save tax under Section 80C?',
  'Old vs New tax regime?',
  'How to claim HRA exemption?',
]

export default function AiAdvisor() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = async (text) => {
    const userMsg = text.trim()
    if (!userMsg) return

    const updated = [...messages, { role: 'user', text: userMsg }]
    setMessages(updated)
    setInput('')
    setLoading(true)

    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Understood. I am ready to help with Indian income tax queries.' }] },
      ...updated.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
    ]

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      })
      const data = await res.json()
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Network error. Please check your connection and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Tax AI Advisor"
        data-testid="ai-advisor-button"
        style={{
          position: 'fixed',
          bottom: 88,
          right: 24,
          zIndex: 9997,
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(102,126,234,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {open && (
        <div
          data-testid="ai-advisor-panel"
          style={{
            position: 'fixed',
            bottom: 88,
            right: 24,
            zIndex: 9999,
            width: 380,
            maxWidth: 'calc(100vw - 32px)',
            height: 520,
            maxHeight: 'calc(100vh - 120px)',
            background: '#1A1A1D',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #333',
          }}
        >
          <div style={{
            padding: '14px 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Tax AI Advisor</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              data-testid="ai-advisor-close"
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 20,
                padding: 4,
                lineHeight: 1,
              }}
            >
              &times;
            </button>
          </div>

          <div ref={scrollRef} style={{
            flex: 1,
            overflowY: 'auto',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            {messages.length === 0 && (
              <div>
                <p style={{ color: '#aaa', fontSize: 13, margin: '0 0 12px', lineHeight: 1.5 }}>
                  Ask me anything about Indian income tax, ITR filing, deductions, or tax-saving investments.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {SUGGESTED_QUESTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      data-testid="suggested-question"
                      style={{
                        background: '#252528',
                        border: '1px solid #333',
                        borderRadius: 8,
                        padding: '10px 12px',
                        color: '#ccc',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: 13,
                        transition: 'border-color 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#667eea')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = '#333')}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                data-testid={msg.role === 'user' ? 'user-message' : 'assistant-message'}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? '#667eea' : '#252528',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  maxWidth: '85%',
                  fontSize: 13,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div data-testid="loading-indicator" style={{
                alignSelf: 'flex-start',
                background: '#252528',
                color: '#aaa',
                padding: '10px 14px',
                borderRadius: '14px 14px 14px 4px',
                fontSize: 13,
              }}>
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{
            padding: '12px 16px',
            borderTop: '1px solid #333',
            display: 'flex',
            gap: 8,
          }}>
            <input
              data-testid="ai-advisor-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a tax question..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #333',
                background: '#252528',
                color: '#fff',
                fontSize: 14,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              data-testid="ai-advisor-send"
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: 'none',
                background: loading || !input.trim() ? '#555' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: loading || !input.trim() ? '#999' : '#fff',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
