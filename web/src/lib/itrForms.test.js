import { describe, it, expect } from 'vitest'
import { ITR_FORMS, getITRForm, getRelatedForms } from './itrForms'

describe('ITR_FORMS data', () => {
  it('covers ITR-1 through ITR-7', () => {
    expect(ITR_FORMS).toHaveLength(7)
    const slugs = ITR_FORMS.map((f) => f.slug)
    for (let i = 1; i <= 7; i++) expect(slugs).toContain(`itr-${i}`)
  })

  it('every form has the fields the page renders', () => {
    for (const f of ITR_FORMS) {
      expect(f.name).toBeTruthy()
      expect(f.tagline.length).toBeGreaterThan(20)
      expect(f.whoCanFile.length).toBeGreaterThanOrEqual(2)
      expect(f.whoCannotFile.length).toBeGreaterThanOrEqual(1)
      expect(f.documents.length).toBeGreaterThanOrEqual(3)
      expect(f.dueDate).toBeTruthy()
      expect(f.tip.length).toBeGreaterThan(40)
      expect(f.faqs.length).toBeGreaterThanOrEqual(2)
      for (const faq of f.faqs) {
        expect(faq.q.length).toBeGreaterThan(10)
        expect(faq.a.length).toBeGreaterThan(30)
      }
    }
  })

  it('slugs are unique', () => {
    const slugs = ITR_FORMS.map((f) => f.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('getITRForm returns the right form and undefined for unknown', () => {
    expect(getITRForm('itr-3').name).toBe('ITR-3')
    expect(getITRForm('itr-99')).toBeUndefined()
  })

  it('getRelatedForms excludes the current form', () => {
    const related = getRelatedForms('itr-1', 3)
    expect(related).toHaveLength(3)
    expect(related.every((f) => f.slug !== 'itr-1')).toBe(true)
  })
})
