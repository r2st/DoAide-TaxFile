import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('Route error:', error, info)
  }

  handleRetry = () => {
    this.setState({ error: null })
  }

  render() {
    if (!this.state.error) return this.props.children
    const btn = {
      minHeight: 48,
      padding: '12px 24px',
      borderRadius: 'var(--doaide-radius-lg)',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
    }
    return (
      <div role="alert" style={{ textAlign: 'center', padding: '48px 24px', margin: '40px 0', background: 'var(--doaide-surface)', border: '1px solid var(--doaide-border)', borderRadius: 'var(--doaide-radius-lg)' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
        <h2 style={{ fontFamily: 'var(--doaide-font-display)', fontSize: 20, marginBottom: 8, color: 'var(--doaide-text)' }}>Something went wrong</h2>
        <p style={{ fontSize: 14, color: 'var(--doaide-text-muted)', maxWidth: 420, margin: '0 auto 20px' }}>
          This page hit an unexpected error. Try again, or reload the app.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={this.handleRetry} style={{ ...btn, background: 'var(--doaide-gold)', color: '#1a1a1a', border: 'none' }}>
            Try Again
          </button>
          <button onClick={() => window.location.reload()} style={{ ...btn, background: 'transparent', color: 'var(--doaide-text-secondary)', border: '1px solid var(--doaide-border)' }}>
            Reload App
          </button>
        </div>
      </div>
    )
  }
}
