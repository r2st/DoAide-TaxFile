import { useState } from 'react'

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState('')
  const [toast, setToast] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (rating === null) return
    setSubmitting(true)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment: comment.trim() || undefined,
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch {
      // silently ignore network errors
    }
    setSubmitting(false)
    setOpen(false)
    setRating(null)
    setComment('')
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9998,
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: 'none',
          background: '#D4AF37',
          color: '#1A1A1D',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
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
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>

      {open && (
        <div
          data-testid="feedback-modal"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
          }}
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div
            style={{
              background: '#1A1A1D',
              borderRadius: 12,
              padding: 28,
              width: '90%',
              maxWidth: 380,
              color: '#fff',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: 18, color: '#D4AF37' }}>
              How's your experience?
            </h3>

            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <button
                data-testid="thumbs-up"
                onClick={() => setRating('up')}
                aria-label="Thumbs up"
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontSize: 28,
                  border: rating === 'up' ? '2px solid #D4AF37' : '2px solid #333',
                  borderRadius: 8,
                  background: rating === 'up' ? 'rgba(212,175,55,0.15)' : '#252528',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                👍
              </button>
              <button
                data-testid="thumbs-down"
                onClick={() => setRating('down')}
                aria-label="Thumbs down"
                style={{
                  flex: 1,
                  padding: '12px 0',
                  fontSize: 28,
                  border: rating === 'down' ? '2px solid #D4AF37' : '2px solid #333',
                  borderRadius: 8,
                  background: rating === 'down' ? 'rgba(212,175,55,0.15)' : '#252528',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                👎
              </button>
            </div>

            <textarea
              data-testid="feedback-comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Any comments? (optional)"
              rows={3}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #333',
                background: '#252528',
                color: '#fff',
                resize: 'vertical',
                fontFamily: 'inherit',
                fontSize: 14,
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 8,
                  border: '1px solid #333',
                  background: 'transparent',
                  color: '#aaa',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                Cancel
              </button>
              <button
                data-testid="feedback-submit"
                onClick={submit}
                disabled={rating === null || submitting}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 8,
                  border: 'none',
                  background: rating === null ? '#555' : '#D4AF37',
                  color: rating === null ? '#999' : '#1A1A1D',
                  cursor: rating === null ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                  transition: 'all 0.15s',
                }}
              >
                {submitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          data-testid="feedback-toast"
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            zIndex: 10000,
            background: '#D4AF37',
            color: '#1A1A1D',
            padding: '10px 20px',
            borderRadius: 8,
            fontWeight: 600,
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          Thanks!
        </div>
      )}
    </>
  )
}
