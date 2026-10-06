# DoAide TaxFile

Free Income Tax Return Filing Assistant for India — FY 2026-27 (AY 2027-28).

**Subdomain:** tax.doaide.com

## Free Tools (No Login Required)

1. **Income Tax Calculator** — Old vs New regime side-by-side comparison
2. **ITR Form Selector** — Find the right ITR form (ITR-1 through ITR-4)
3. **HRA Exemption Calculator** — Section 10(13A) exemption calculation
4. **Section 80C Planner** — Track ₹1.5L limit with investment comparison
5. **Capital Gains Calculator** — STCG/LTCG on equity, debt, real estate, gold, crypto
6. **TDS Calculator** — TDS rates and thresholds for all income types
7. **Advance Tax Calculator** — Quarterly installment schedule with due dates
8. **Tax Saving Recommendations** — Personalized deduction suggestions

## Stack

- **Backend:** FastAPI + SQLAlchemy + PostgreSQL (port 3065)
- **Frontend:** React + Vite (port 3066)
- **Theme:** DoAide dark theme with gold accents

## Setup

### Backend
```bash
cd api
pip install -r requirements.txt
uvicorn app.main:app --port 3065
```

### Frontend
```bash
cd web
npm install
npm run dev
```

### Tests
```bash
cd api && pytest tests/ -v
cd web && npm test
```

## SEO Routes

| Route | Tool |
|-------|------|
| `/income-tax-calculator` | Income Tax Calculator |
| `/itr-form-selector` | ITR Form Selector |
| `/hra-calculator` | HRA Exemption Calculator |
| `/80c-planner` | Section 80C Planner |
| `/capital-gains-calculator` | Capital Gains Calculator |
| `/tds-calculator` | TDS Calculator |
| `/advance-tax-calculator` | Advance Tax Calculator |
