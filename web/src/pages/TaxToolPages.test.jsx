// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HRACalculator from './HRACalculator'
import OldVsNewRegimeComparison from './OldVsNewRegimeComparison'
import CapitalGainsCalculator from './CapitalGainsCalculator'

afterEach(cleanup)

const renderPage = (Page) => render(<MemoryRouter><Page /></MemoryRouter>)

// InputField labels are not linked to inputs, so find the input next to a label.
function inputFor(labelText) {
  const label = screen.getByText(labelText, { selector: 'label' })
  return label.parentElement.querySelector('input, select')
}

describe('HRACalculator page', () => {
  it('shows the exemption and landlord PAN note as the user types', () => {
    renderPage(HRACalculator)
    expect(screen.queryByTestId('hra-exemption')).toBeNull()
    fireEvent.change(inputFor('Basic salary (monthly)'), { target: { value: '50000' } })
    fireEvent.change(inputFor('HRA received (monthly)'), { target: { value: '25000' } })
    fireEvent.change(inputFor('Rent paid (monthly)'), { target: { value: '20000' } })
    fireEvent.change(inputFor('City you live in'), { target: { value: 'metro' } })
    expect(screen.getByTestId('hra-exemption').textContent).toBe('₹1,80,000')
    expect(screen.getByText(/landlord.s PAN to claim/)).toBeTruthy()
    expect(document.title).toMatch(/HRA Exemption Calculator/)
  })

  it('renders the FAQ section', () => {
    renderPage(HRACalculator)
    expect(screen.getByText('Is HRA exemption available in the new tax regime?')).toBeTruthy()
  })
})

describe('OldVsNewRegimeComparison page', () => {
  it('recommends the new regime with break-even advice for a plain salary', () => {
    renderPage(OldVsNewRegimeComparison)
    fireEvent.change(inputFor('Gross annual salary'), { target: { value: '1500000' } })
    expect(screen.getByTestId('regime-verdict').textContent).toMatch(/new regime saves you/)
    expect(screen.getByTestId('break-even').textContent).toMatch(/old regime would win only if/)
    expect(screen.getByTestId('regime-new')).toBeTruthy()
    expect(screen.getByTestId('regime-old')).toBeTruthy()
  })

  it('recommends the old regime when deductions are large', () => {
    renderPage(OldVsNewRegimeComparison)
    fireEvent.change(inputFor('Gross annual salary'), { target: { value: '2000000' } })
    fireEvent.change(inputFor('HRA exemption'), { target: { value: '300000' } })
    fireEvent.change(inputFor('Section 80C (max ₹1.5L)'), { target: { value: '150000' } })
    fireEvent.change(inputFor('Section 80D'), { target: { value: '50000' } })
    fireEvent.change(inputFor('Home loan interest 24(b)'), { target: { value: '200000' } })
    fireEvent.change(inputFor('NPS 80CCD(1B)'), { target: { value: '50000' } })
    expect(screen.getByTestId('regime-verdict').textContent).toMatch(/old regime saves you/)
  })
})

describe('CapitalGainsCalculator page', () => {
  it('computes equity LTCG with the 112A exemption', () => {
    renderPage(CapitalGainsCalculator)
    fireEvent.change(inputFor('Purchase date'), { target: { value: '2023-01-01' } })
    fireEvent.change(inputFor('Sale date'), { target: { value: '2026-06-01' } })
    fireEvent.change(inputFor('Purchase price (total)'), { target: { value: '500000' } })
    fireEvent.change(inputFor('Sale price (total)'), { target: { value: '750000' } })
    expect(screen.getByTestId('gain-type').textContent).toMatch(/Long-term gain/)
    expect(screen.getByTestId('total-tax').textContent).toBe('₹16,250')
  })

  it('shows the indexation comparison for old property', () => {
    renderPage(CapitalGainsCalculator)
    fireEvent.change(inputFor('Asset'), { target: { value: 'property' } })
    fireEvent.change(inputFor('Purchase date'), { target: { value: '2002-06-01' } })
    fireEvent.change(inputFor('Sale date'), { target: { value: '2025-12-01' } })
    fireEvent.change(inputFor('Purchase price (total)'), { target: { value: '1000000' } })
    fireEvent.change(inputFor('Sale price (total)'), { target: { value: '6000000' } })
    expect(screen.getByTestId('indexation').textContent).toMatch(/20% with indexation/)
    expect(screen.getByTestId('total-tax').textContent).toBe('₹5,03,162')
  })

  it('reports an error when the sale is before the purchase', () => {
    renderPage(CapitalGainsCalculator)
    fireEvent.change(inputFor('Purchase date'), { target: { value: '2026-01-01' } })
    fireEvent.change(inputFor('Sale date'), { target: { value: '2025-01-01' } })
    fireEvent.change(inputFor('Sale price (total)'), { target: { value: '100' } })
    expect(screen.getByRole('alert').textContent).toMatch(/before purchase/)
  })
})
