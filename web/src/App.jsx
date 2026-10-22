import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import InstallPrompt from './components/InstallPrompt'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
const IncomeTaxCalculator = lazy(() => import('./pages/IncomeTaxCalculator'))
const ITRFormSelector = lazy(() => import('./pages/ITRFormSelector'))
const HRACalculator = lazy(() => import('./pages/HRACalculator'))
const Section80CPlanner = lazy(() => import('./pages/Section80CPlanner'))
const CapitalGainsCalculator = lazy(() => import('./pages/CapitalGainsCalculator'))
const TDSCalculator = lazy(() => import('./pages/TDSCalculator'))
const AdvanceTaxCalculator = lazy(() => import('./pages/AdvanceTaxCalculator'))
const RentReceiptGenerator = lazy(() => import('./pages/RentReceiptGenerator'))
const Form16Analyzer = lazy(() => import('./pages/Form16Analyzer'))
const TaxRefundStatus = lazy(() => import('./pages/TaxRefundStatus'))
const StandardDeductionCalculator = lazy(() => import('./pages/StandardDeductionCalculator'))
const NPSCalculator = lazy(() => import('./pages/NPSCalculator'))
const HomeLoanCalculator = lazy(() => import('./pages/HomeLoanCalculator'))
const SeniorCitizenCalculator = lazy(() => import('./pages/SeniorCitizenCalculator'))
const TakeHomeSalaryCalculator = lazy(() => import('./pages/TakeHomeSalaryCalculator'))
const GratuityCalculator = lazy(() => import('./pages/GratuityCalculator'))
const PPFCalculator = lazy(() => import('./pages/PPFCalculator'))
const SIPCalculator = lazy(() => import('./pages/SIPCalculator'))
const FDCalculator = lazy(() => import('./pages/FDCalculator'))
const MutualFundCalculator = lazy(() => import('./pages/MutualFundCalculator'))
const EMICalculator = lazy(() => import('./pages/EMICalculator'))
const CompoundInterestCalculator = lazy(() => import('./pages/CompoundInterestCalculator'))
const Section80DCalculator = lazy(() => import('./pages/Section80DCalculator'))
const SalaryTaxOptimizer = lazy(() => import('./pages/SalaryTaxOptimizer'))
const SSYCalculator = lazy(() => import('./pages/SSYCalculator'))
const EPFCalculator = lazy(() => import('./pages/EPFCalculator'))
const ELSSComparison = lazy(() => import('./pages/ELSSComparison'))
const TaxLossHarvesting = lazy(() => import('./pages/TaxLossHarvesting'))
const Form16Decoder = lazy(() => import('./pages/Form16Decoder'))
const RefundCalculator = lazy(() => import('./pages/RefundCalculator'))
const ProfessionalTaxCalculator = lazy(() => import('./pages/ProfessionalTaxCalculator'))
const GuidesPage = lazy(() => import('./pages/GuidesPage'))
const IncomeTaxSlabsGuide = lazy(() => import('./pages/guides/IncomeTaxSlabsGuide'))
const Section80CGuide = lazy(() => import('./pages/guides/Section80CGuide'))
const HowToFileITRGuide = lazy(() => import('./pages/guides/HowToFileITRGuide'))
const BestTaxSavingGuide = lazy(() => import('./pages/guides/BestTaxSavingGuide'))
const SaveTaxNewRegime = lazy(() => import('./pages/guides/SaveTaxNewRegime'))
const NpsVsPpfVsElss = lazy(() => import('./pages/guides/NpsVsPpfVsElss'))
const AdvanceTaxGuide = lazy(() => import('./pages/guides/AdvanceTaxGuide'))
const TaxOnSalary = lazy(() => import('./pages/guides/TaxOnSalary'))
const OldVsNewRegime = lazy(() => import('./pages/guides/OldVsNewRegime'))
const TaxSavingTips = lazy(() => import('./pages/guides/TaxSavingTips'))
const HomeLoanTaxBenefits = lazy(() => import('./pages/guides/HomeLoanTaxBenefits'))
const HRAExemptionGuide = lazy(() => import('./pages/guides/HRAExemptionGuide'))
const CapitalGainsMutualFunds = lazy(() => import('./pages/guides/CapitalGainsMutualFunds'))
const Section80CComplete = lazy(() => import('./pages/guides/Section80CComplete'))
const VsClearTax = lazy(() => import('./pages/compare/VsClearTax'))
const VsTax2Win = lazy(() => import('./pages/compare/VsTax2Win'))
const BestIncomeTaxCalculator = lazy(() => import('./pages/compare/BestIncomeTaxCalculator'))
const BestItrTools = lazy(() => import('./pages/compare/BestItrTools'))
const StampDutyCalculator = lazy(() => import('./pages/StampDutyCalculator'))
const RentalIncomeCalculator = lazy(() => import('./pages/RentalIncomeCalculator'))
const GSTCalculator = lazy(() => import('./pages/GSTCalculator'))
const LumpsumCalculator = lazy(() => import('./pages/LumpsumCalculator'))
const RDCalculator = lazy(() => import('./pages/RDCalculator'))
const SWPCalculator = lazy(() => import('./pages/SWPCalculator'))
const CAGRCalculator = lazy(() => import('./pages/CAGRCalculator'))
const InflationCalculator = lazy(() => import('./pages/InflationCalculator'))
const RetirementCalculator = lazy(() => import('./pages/RetirementCalculator'))
const TaxSavingCalculator = lazy(() => import('./pages/TaxSavingCalculator'))
const OldVsNewRegimeComparison = lazy(() => import('./pages/OldVsNewRegimeComparison'))
const Section80GCalculator = lazy(() => import('./pages/Section80GCalculator'))
const EmbedIncomeTaxCalculator = lazy(() => import('./pages/EmbedIncomeTaxCalculator'))
const RegimeComparisonTool = lazy(() => import('./pages/tools/RegimeComparisonTool'))
const HRACalculatorTool = lazy(() => import('./pages/tools/HRACalculatorTool'))
const BlogLayout = lazy(() => import('./pages/blog/BlogLayout'))
const BlogIndex = lazy(() => import('./pages/blog/BlogLayout').then((m) => ({ default: m.BlogIndex })))
const IncomeTaxSlabs2026 = lazy(() => import('./pages/blog/IncomeTaxSlabs2026'))
const HowToFileITR = lazy(() => import('./pages/blog/HowToFileITR'))
const Section80CDeductions = lazy(() => import('./pages/blog/Section80CDeductions'))
const NpsVsPpfVsElssBlog = lazy(() => import('./pages/blog/NpsVsPpfVsElss'))
const SaveIncomeTaxLegally2026 = lazy(() => import('./pages/blog/SaveIncomeTaxLegally2026'))
const Section80CInvestmentOptions = lazy(() => import('./pages/blog/Section80CInvestmentOptions'))
const NewVsOldRegimeCalculatorBlog = lazy(() => import('./pages/blog/NewVsOldRegimeCalculatorBlog'))
const FirstTimeITRGuide = lazy(() => import('./pages/blog/FirstTimeITRGuide'))
const ITRFilingDeadlines2027 = lazy(() => import('./pages/blog/ITRFilingDeadlines2027'))
const TaxPlanningFreelancers = lazy(() => import('./pages/blog/TaxPlanningFreelancers'))
const ITRFormGuide2026 = lazy(() => import('./pages/blog/ITRFormGuide2026'))
const Section80CInvestments2026 = lazy(() => import('./pages/blog/Section80CInvestments2026'))
const NewVsOldRegime2026 = lazy(() => import('./pages/blog/NewVsOldRegime2026'))
const BelatedITRFiling2026 = lazy(() => import('./pages/blog/BelatedITRFiling2026'))
const MarginalRelief12Lakh = lazy(() => import('./pages/blog/MarginalRelief12Lakh'))
const ITRRefundDelayed = lazy(() => import('./pages/blog/ITRRefundDelayed'))
import ToolTracker from './components/ToolTracker'
import ReferralBanner from './components/ReferralBanner'
import FeedbackWidget from './components/FeedbackWidget'
import AiAdvisor from './components/AiAdvisor'

function RouteLoader() {
  return (
    <div data-route-loading role="status" aria-label="Loading page"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 0' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--doaide-border)', borderTopColor: 'var(--doaide-gold)', animation: 'doaide-spin 0.8s linear infinite' }} />
      <style>{'@keyframes doaide-spin { to { transform: rotate(360deg) } }'}</style>
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/embed/')) {
    return (
      <Suspense fallback={null}>
        <Routes>
          <Route path="/embed/income-tax-calculator" element={<EmbedIncomeTaxCalculator />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <>
    <Layout>
      <ToolTracker />
      <ErrorBoundary>
      <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />
        <Route path="/itr-form-selector" element={<ITRFormSelector />} />
        <Route path="/hra-calculator" element={<HRACalculator />} />
        <Route path="/80c-planner" element={<Section80CPlanner />} />
        <Route path="/capital-gains-calculator" element={<CapitalGainsCalculator />} />
        <Route path="/tds-calculator" element={<TDSCalculator />} />
        <Route path="/advance-tax-calculator" element={<AdvanceTaxCalculator />} />
        <Route path="/rent-receipt-generator" element={<RentReceiptGenerator />} />
        <Route path="/form-16-analyzer" element={<Form16Analyzer />} />
        <Route path="/tax-refund-status" element={<TaxRefundStatus />} />
        <Route path="/standard-deduction-calculator" element={<StandardDeductionCalculator />} />
        <Route path="/nps-calculator" element={<NPSCalculator />} />
        <Route path="/home-loan-calculator" element={<HomeLoanCalculator />} />
        <Route path="/senior-citizen-calculator" element={<SeniorCitizenCalculator />} />
        <Route path="/take-home-salary-calculator" element={<TakeHomeSalaryCalculator />} />
        <Route path="/gratuity-calculator" element={<GratuityCalculator />} />
        <Route path="/ppf-calculator" element={<PPFCalculator />} />
        <Route path="/sip-calculator" element={<SIPCalculator />} />
        <Route path="/fd-calculator" element={<FDCalculator />} />
        <Route path="/mutual-fund-calculator" element={<MutualFundCalculator />} />
        <Route path="/emi-calculator" element={<EMICalculator />} />
        <Route path="/compound-interest-calculator" element={<CompoundInterestCalculator />} />
        <Route path="/80d-calculator" element={<Section80DCalculator />} />
        <Route path="/salary-tax-optimizer" element={<SalaryTaxOptimizer />} />
        <Route path="/ssy-calculator" element={<SSYCalculator />} />
        <Route path="/epf-calculator" element={<EPFCalculator />} />
        <Route path="/elss-vs-ppf-vs-fd" element={<ELSSComparison />} />
        <Route path="/tax-loss-harvesting" element={<TaxLossHarvesting />} />
        <Route path="/form-16-decoder" element={<Form16Decoder />} />
        <Route path="/refund-calculator" element={<RefundCalculator />} />
        <Route path="/professional-tax-calculator" element={<ProfessionalTaxCalculator />} />
        <Route path="/calculators/stamp-duty" element={<StampDutyCalculator />} />
        <Route path="/calculators/rental-income" element={<RentalIncomeCalculator />} />
        <Route path="/gst-calculator" element={<GSTCalculator />} />
        <Route path="/lumpsum-calculator" element={<LumpsumCalculator />} />
        <Route path="/rd-calculator" element={<RDCalculator />} />
        <Route path="/swp-calculator" element={<SWPCalculator />} />
        <Route path="/cagr-calculator" element={<CAGRCalculator />} />
        <Route path="/inflation-calculator" element={<InflationCalculator />} />
        <Route path="/retirement-calculator" element={<RetirementCalculator />} />
        <Route path="/tax-saving-calculator" element={<TaxSavingCalculator />} />
        <Route path="/old-vs-new-regime" element={<OldVsNewRegimeComparison />} />
        <Route path="/80g-calculator" element={<Section80GCalculator />} />
        <Route path="/tools/regime-comparison" element={<RegimeComparisonTool />} />
        <Route path="/tools/hra-calculator" element={<HRACalculatorTool />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/income-tax-slabs-2026-27" element={<IncomeTaxSlabsGuide />} />
        <Route path="/guides/section-80c-deductions" element={<Section80CGuide />} />
        <Route path="/guides/how-to-file-itr-online" element={<HowToFileITRGuide />} />
        <Route path="/guides/best-tax-saving-salaried" element={<BestTaxSavingGuide />} />
        <Route path="/guides/save-tax-new-regime" element={<SaveTaxNewRegime />} />
        <Route path="/guides/nps-vs-ppf-vs-elss" element={<NpsVsPpfVsElss />} />
        <Route path="/guides/advance-tax" element={<AdvanceTaxGuide />} />
        <Route path="/guides/tax-on-salary" element={<TaxOnSalary />} />
        <Route path="/guides/old-vs-new-regime" element={<OldVsNewRegime />} />
        <Route path="/guides/tax-saving-tips" element={<TaxSavingTips />} />
        <Route path="/guides/home-loan-tax" element={<HomeLoanTaxBenefits />} />
        <Route path="/guides/hra-exemption-calculation" element={<HRAExemptionGuide />} />
        <Route path="/guides/capital-gains-mutual-funds" element={<CapitalGainsMutualFunds />} />
        <Route path="/guides/section-80c-complete-list" element={<Section80CComplete />} />
        <Route path="/compare/cleartax" element={<VsClearTax />} />
        <Route path="/compare/tax2win" element={<VsTax2Win />} />
        <Route path="/best-income-tax-calculator" element={<BestIncomeTaxCalculator />} />
        <Route path="/compare/best-itr-tools" element={<BestItrTools />} />
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogIndex />} />
          <Route path="income-tax-slabs-2026-27" element={<IncomeTaxSlabs2026 />} />
          <Route path="how-to-file-itr-online-free" element={<HowToFileITR />} />
          <Route path="section-80c-deductions-complete-guide" element={<Section80CDeductions />} />
          <Route path="nps-vs-ppf-vs-elss-comparison" element={<NpsVsPpfVsElssBlog />} />
          <Route path="how-to-save-income-tax-legally-india-2026" element={<SaveIncomeTaxLegally2026 />} />
          <Route path="section-80c-investment-options-compared" element={<Section80CInvestmentOptions />} />
          <Route path="new-vs-old-tax-regime-calculator" element={<NewVsOldRegimeCalculatorBlog />} />
          <Route path="first-time-itr-filing-guide" element={<FirstTimeITRGuide />} />
          <Route path="itr-filing-deadlines-2027" element={<ITRFilingDeadlines2027 />} />
          <Route path="tax-planning-freelancers-india" element={<TaxPlanningFreelancers />} />
          <Route path="itr-form-guide-2026-27" element={<ITRFormGuide2026 />} />
          <Route path="section-80c-investments-2026" element={<Section80CInvestments2026 />} />
          <Route path="new-vs-old-regime-comparison-2026" element={<NewVsOldRegime2026 />} />
          <Route path="belated-itr-filing-after-due-date-2026" element={<BelatedITRFiling2026 />} />
          <Route path="marginal-relief-income-above-12-lakh-new-regime" element={<MarginalRelief12Lakh />} />
          <Route path="itr-refund-delayed-reasons-how-to-fix" element={<ITRRefundDelayed />} />
        </Route>
      </Routes>
      </Suspense>
      </ErrorBoundary>
    </Layout>
    <InstallPrompt />
    <ReferralBanner />
    <FeedbackWidget />
    <AiAdvisor />
    </>
  )
}
