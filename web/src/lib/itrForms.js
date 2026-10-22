// ITR form reference data for FY 2025-26 (AY 2026-27) — one entry per form,
// rendered as /itr-forms/<slug> landing pages.

export const ITR_FORMS = [
  {
    slug: 'itr-1',
    name: 'ITR-1 (Sahaj)',
    shortName: 'ITR-1',
    tagline: 'For salaried individuals with income up to ₹50 lakh',
    whoCanFile: [
      'Resident individuals (not HUF) with total income up to ₹50 lakh',
      'Income from salary or pension',
      'Income from one house property',
      'Income from other sources — bank/FD interest, dividends, family pension',
      'Agricultural income up to ₹5,000',
      'Long-term capital gains under Section 112A up to ₹1.25 lakh (no loss to carry forward)',
    ],
    whoCannotFile: [
      'Total income above ₹50 lakh',
      'More than one house property',
      'Capital gains beyond the small 112A window (e.g. property sale, STCG on shares)',
      'Business or professional income',
      'Director in a company, or holder of unlisted equity shares',
      'Foreign assets, foreign income, or non-resident / RNOR status',
      'TDS deducted under Section 194N (cash withdrawals), or ESOP tax deferred',
    ],
    incomeSources: 'Salary/pension, one house property, other sources (interest, dividends), small 112A LTCG',
    documents: ['Form 16 from employer', 'Form 26AS and AIS', 'Bank interest certificates', 'PAN and Aadhaar (linked)', 'Bank account details for refund'],
    dueDate: 'July 31 (unless extended) — belated/revised until December 31',
    tip: 'Nearly 50% of all ITRs filed in India are ITR-1. If your only income is salary plus bank interest, this is almost certainly your form — and the portal pre-fills most of it.',
    faqs: [
      { q: 'Can I file ITR-1 if I have two employers in one year?', a: 'Yes. Multiple Form 16s from job changes are fine — combine the salary income. What disqualifies you is a second house property or capital gains, not a second employer.' },
      { q: 'Can I file ITR-1 with capital gains?', a: 'Only LTCG under Section 112A (listed equity/equity mutual funds) up to ₹1.25 lakh, with no losses to carry forward. Any other capital gain — property, STCG, larger LTCG — pushes you to ITR-2.' },
      { q: 'Can NRIs file ITR-1?', a: 'No. ITR-1 is only for ordinarily resident individuals. NRIs and RNORs with salary income use ITR-2.' },
    ],
  },
  {
    slug: 'itr-2',
    name: 'ITR-2',
    shortName: 'ITR-2',
    tagline: 'For individuals and HUFs with capital gains or multiple properties, no business income',
    whoCanFile: [
      'Individuals and HUFs without business or professional income',
      'Salary/pension income of any amount (no ₹50 lakh cap)',
      'More than one house property',
      'Capital gains from shares, mutual funds, or property',
      'Foreign income or foreign assets, non-residents and RNORs',
      'Directors of companies and holders of unlisted equity shares',
      'Agricultural income above ₹5,000',
    ],
    whoCannotFile: [
      'Income from business or profession (use ITR-3)',
      'Presumptive business income (use ITR-4 if eligible)',
    ],
    incomeSources: 'Salary, multiple house properties, all capital gains, foreign income, other sources',
    documents: ['Form 16, Form 26AS, AIS', 'Capital gains statements from brokers/AMCs (with ISIN, dates, costs)', 'Property sale deed and purchase documents if property sold', 'Foreign asset details (Schedule FA) if applicable', 'Unlisted share details if held'],
    dueDate: 'July 31 (unless extended) — belated/revised until December 31',
    tip: 'Sold shares or mutual funds during the year? Even one redemption with STCG, or LTCG above ₹1.25 lakh, moves you from ITR-1 to ITR-2. Download the capital gains statement from your broker — most portals now import it directly.',
    faqs: [
      { q: 'Do I need ITR-2 just because I sold mutual funds?', a: 'If the sale produced only 112A LTCG up to ₹1.25 lakh you can stay on ITR-1. Any STCG, LTCG above the limit, or losses to carry forward means ITR-2.' },
      { q: 'I am a salaried employee with ESOPs/RSUs of a foreign company. Which form?', a: 'ITR-2. Foreign shares are foreign assets, so you must report them in Schedule FA — even if you sold nothing during the year.' },
      { q: 'Can I report F&O trading in ITR-2?', a: 'No. F&O trading is treated as business income, which requires ITR-3.' },
    ],
  },
  {
    slug: 'itr-3',
    name: 'ITR-3',
    shortName: 'ITR-3',
    tagline: 'For individuals and HUFs with business or professional income',
    whoCanFile: [
      'Individuals and HUFs with income from business or profession (proprietorship)',
      'Freelancers and consultants not opting for presumptive taxation',
      'F&O and intraday traders (business income)',
      'Partners earning remuneration/interest from a partnership firm',
      'Everything ITR-2 covers — salary, capital gains, multiple properties — plus business income',
    ],
    whoCannotFile: [
      'No business or professional income at all (use ITR-1/ITR-2)',
      'Companies and LLPs (they file ITR-6/ITR-5)',
    ],
    incomeSources: 'Business/profession, salary, house property, capital gains, other sources — the most comprehensive individual form',
    documents: ['Books of account / P&L and balance sheet (or audit report if applicable)', 'GST returns if registered', 'Form 26AS, AIS, TDS certificates', 'Capital gains statements', 'Bank statements for business receipts'],
    dueDate: 'July 31; October 31 if accounts require audit (unless extended)',
    tip: 'F&O traders: losses can only be carried forward if you file ITR-3 on time. Filing ITR-2 to avoid the hassle forfeits the set-off — a loss carried forward saves real tax next year.',
    faqs: [
      { q: 'I have salary and some freelance income. ITR-3 or ITR-4?', a: 'Either can work. If the freelance income qualifies for presumptive taxation (44ADA) and total income is under ₹50 lakh, ITR-4 is simpler. If you want to claim actual expenses or income is higher, use ITR-3.' },
      { q: 'Is tax audit mandatory for ITR-3?', a: 'Only if turnover exceeds the Section 44AB limits (₹1 crore for business, ₹10 crore with ≥95% digital transactions, ₹50 lakh for professionals) or specific presumptive opt-out rules trigger it.' },
      { q: 'Do intraday equity trades go in ITR-3?', a: 'Yes — intraday trading is speculative business income, and F&O is non-speculative business income. Both require ITR-3.' },
    ],
  },
  {
    slug: 'itr-4',
    name: 'ITR-4 (Sugam)',
    shortName: 'ITR-4',
    tagline: 'For presumptive income — small businesses and professionals up to ₹50 lakh total income',
    whoCanFile: [
      'Resident individuals, HUFs and firms (other than LLP) with total income up to ₹50 lakh',
      'Business income under Section 44AD (turnover up to ₹2 crore; ₹3 crore if ≥95% digital)',
      'Professional income under Section 44ADA (gross receipts up to ₹50 lakh; ₹75 lakh if ≥95% digital)',
      'Goods carriage income under Section 44AE',
      'Plus salary, one house property, and other sources — same limits as ITR-1',
    ],
    whoCannotFile: [
      'Total income above ₹50 lakh',
      'Capital gains (other than the small 112A window), more than one house property',
      'Director in a company, unlisted shares, foreign assets, non-resident status',
      'Claiming actual business expenses instead of presumptive rates',
    ],
    incomeSources: 'Presumptive business/professional income (44AD/44ADA/44AE), salary, one house property, other sources',
    documents: ['Gross turnover/receipts figures (bank statements, GST returns)', 'Form 26AS and AIS', 'Bank account details', 'No books of account needed under presumptive scheme'],
    dueDate: 'July 31 (unless extended) — belated/revised until December 31',
    tip: 'Under 44ADA, professionals declare 50% of gross receipts as income — no expense proofs needed. A freelancer billing ₹30 lakh pays tax on ₹15 lakh. If your real expenses are below 50%, presumptive taxation is usually the better deal.',
    faqs: [
      { q: 'Which professions qualify for 44ADA?', a: 'Specified professions: legal, medical, engineering, architecture, accountancy, technical consultancy, interior decoration, and notified professions including many IT/software consultants.' },
      { q: 'Can I switch between ITR-4 and ITR-3 every year?', a: 'For 44AD business income, opting out of presumptive taxation after using it bars you from re-entering for 5 years (and may trigger audit). 44ADA professionals have more flexibility year to year.' },
      { q: 'I have F&O losses and presumptive professional income. Can I use ITR-4?', a: 'No. F&O is non-presumptive business income, so the combination requires ITR-3.' },
    ],
  },
  {
    slug: 'itr-5',
    name: 'ITR-5',
    shortName: 'ITR-5',
    tagline: 'For firms, LLPs, AOPs, BOIs and co-operative societies',
    whoCanFile: [
      'Partnership firms and LLPs',
      'Association of Persons (AOPs) and Body of Individuals (BOIs)',
      'Co-operative societies and local authorities',
      'Business trusts, investment funds, estates of deceased/insolvent persons',
    ],
    whoCannotFile: [
      'Individuals and HUFs (use ITR-1 to ITR-4)',
      'Companies (use ITR-6)',
      'Trusts/institutions claiming exemption under Sections 11/12 (use ITR-7)',
    ],
    incomeSources: 'Business/profession, house property, capital gains, other sources — at the entity level',
    documents: ['Partnership deed / LLP agreement', 'Audited financials if audit applies', 'GST returns', 'TDS details, Form 26AS', 'Partner/member details with PAN'],
    dueDate: 'July 31; October 31 if audit applies; November 30 if transfer pricing applies',
    tip: 'Partners of a firm file their own ITR-3 for remuneration and interest received from the firm; the firm itself files ITR-5. Mixing the two up is a common first-year LLP mistake.',
    faqs: [
      { q: 'Does an LLP with no transactions still need to file ITR-5?', a: 'Yes. Every LLP must file an income tax return annually (plus MCA Form 8 and Form 11), even with nil income.' },
      { q: 'Is audit mandatory for LLPs?', a: 'Tax audit applies above the 44AB turnover limits. Separately, LLP Act audit applies if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh.' },
    ],
  },
  {
    slug: 'itr-6',
    name: 'ITR-6',
    shortName: 'ITR-6',
    tagline: 'For companies (other than those claiming Section 11 exemption)',
    whoCanFile: [
      'All companies registered under the Companies Act — private limited, public limited, OPC',
      'Foreign companies with income taxable in India',
    ],
    whoCannotFile: [
      'Companies claiming exemption under Section 11 (charitable/religious — use ITR-7)',
      'LLPs and firms (use ITR-5)',
    ],
    incomeSources: 'Business/profession, capital gains, house property, other sources — at company level',
    documents: ['Audited financial statements (audit is mandatory for companies)', 'Tax audit report (3CA/3CD)', 'GST returns', 'TDS returns and Form 26AS', 'Details for MAT computation (Form 29B) where applicable'],
    dueDate: 'October 31; November 30 if transfer pricing applies',
    tip: 'ITR-6 can only be filed electronically with a digital signature (DSC) of the authorized signatory. Renew the DSC before filing season — expired DSCs are the most common last-day blocker.',
    faqs: [
      { q: 'Does a dormant private limited company still file ITR-6?', a: 'Yes. Every company must file ITR-6 annually regardless of income or activity, along with MCA annual filings.' },
      { q: 'What is the corporate tax rate for FY 2025-26?', a: 'Domestic companies: 22% (plus surcharge and cess) under Section 115BAA without exemptions, or 15% for new manufacturing companies under 115BAB (subject to conditions). Small companies with turnover up to ₹400 crore: 25% under the normal regime.' },
    ],
  },
  {
    slug: 'itr-7',
    name: 'ITR-7',
    shortName: 'ITR-7',
    tagline: 'For trusts, charitable institutions, political parties and research bodies',
    whoCanFile: [
      'Charitable or religious trusts claiming exemption under Sections 11/12 (filing under 139(4A))',
      'Political parties (139(4B))',
      'Scientific research associations, news agencies, universities and institutions under 139(4C)',
      'Colleges, universities and khadi/village industry boards under 139(4D)',
    ],
    whoCannotFile: [
      'Regular companies (ITR-6), firms/LLPs (ITR-5), individuals (ITR-1 to ITR-4)',
    ],
    incomeSources: 'Voluntary contributions, income from property held under trust, incidental business income',
    documents: ['12A/12AB registration certificate', '80G approval if donations claimed', 'Audit report in Form 10B/10BB', 'Books of account of the trust', 'Details of donors and application of income'],
    dueDate: 'October 31 (audit cases); July 31 otherwise',
    tip: 'Trusts must apply at least 85% of income toward their objectives (or formally accumulate it) to keep the exemption. Missing the Form 10B audit deadline can cost the entire exemption for the year.',
    faqs: [
      { q: 'Does a small society with no 12A registration file ITR-7?', a: 'No. Without 12A/12AB registration there is no Section 11 exemption to claim — it files ITR-5 as an AOP and pays tax at normal rates.' },
      { q: 'Is audit mandatory for trusts filing ITR-7?', a: 'If total income before exemption exceeds the basic exemption limit, audit in Form 10B/10BB is mandatory and must be filed before the ITR.' },
    ],
  },
]

export function getITRForm(slug) {
  return ITR_FORMS.find((f) => f.slug === slug)
}

export function getRelatedForms(slug, limit = 3) {
  return ITR_FORMS.filter((f) => f.slug !== slug).slice(0, limit)
}
