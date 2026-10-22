// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BelatedITRFiling2026 from './BelatedITRFiling2026'
import MarginalRelief12Lakh from './MarginalRelief12Lakh'
import ITRRefundDelayed from './ITRRefundDelayed'
import { calculateNewRegime } from '../../lib/taxEngine'

const POSTS = [
  [BelatedITRFiling2026, /How to File a Belated Return by 31 December 2026/, '/income-tax-calculator'],
  [MarginalRelief12Lakh, /How Marginal Relief Works/, '/income-tax-calculator'],
  [ITRRefundDelayed, /ITR Refund Delayed/, '/tax-refund-status'],
]

afterEach(cleanup)

describe.each(POSTS)('%o', (Post, heading, toolPath) => {
  it('renders its heading and links to a tool', () => {
    const { container } = render(<MemoryRouter><Post /></MemoryRouter>)
    expect(container.querySelector('h1').textContent).toMatch(heading)
    expect(container.querySelector(`a[href="${toolPath}"]`)).not.toBeNull()
  })
})

describe('marginal relief worked examples', () => {
  // The article's table quotes these totals; keep them in step with the engine.
  it.each([
    [1275000, 0],
    [1285000, 10400],
    [1300000, 26000],
    [1325000, 52000],
    [1350000, 74100],
  ])('salary %i pays %i', (salary, total) => {
    expect(calculateNewRegime(salary).totalTax).toBe(total)
  })
})
