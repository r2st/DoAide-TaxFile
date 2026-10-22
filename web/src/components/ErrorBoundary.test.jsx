// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

function Bomb({ explode }) {
  if (explode) throw new Error('boom')
  return <div>safe content</div>
}

afterEach(cleanup)

describe('ErrorBoundary', () => {
  it('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <Bomb explode={false} />
      </ErrorBoundary>,
    )
    expect(screen.getByText('safe content')).toBeTruthy()
  })

  it('shows fallback UI with recovery actions when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Bomb explode={true} />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('alert')).toBeTruthy()
    expect(screen.getByText('Something went wrong')).toBeTruthy()
    expect(screen.getByText('Try Again')).toBeTruthy()
    expect(screen.getByText('Reload App')).toBeTruthy()
    spy.mockRestore()
  })

  it('recovers when Try Again is clicked and the error is gone', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    let explode = true
    function Flaky() {
      return <Bomb explode={explode} />
    }
    render(
      <ErrorBoundary>
        <Flaky />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('alert')).toBeTruthy()
    explode = false
    fireEvent.click(screen.getByText('Try Again'))
    expect(screen.getByText('safe content')).toBeTruthy()
    spy.mockRestore()
  })
})
