import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import IncomeTaxCalculator from './pages/IncomeTaxCalculator'
import ITRFormSelector from './pages/ITRFormSelector'
import HRACalculator from './pages/HRACalculator'
import Section80CPlanner from './pages/Section80CPlanner'
import CapitalGainsCalculator from './pages/CapitalGainsCalculator'
import TDSCalculator from './pages/TDSCalculator'
import AdvanceTaxCalculator from './pages/AdvanceTaxCalculator'
import RentReceiptGenerator from './pages/RentReceiptGenerator'
import Form16Analyzer from './pages/Form16Analyzer'
import TaxRefundStatus from './pages/TaxRefundStatus'
import StandardDeductionCalculator from './pages/StandardDeductionCalculator'
import NPSCalculator from './pages/NPSCalculator'
import HomeLoanCalculator from './pages/HomeLoanCalculator'
import SeniorCitizenCalculator from './pages/SeniorCitizenCalculator'
import TakeHomeSalaryCalculator from './pages/TakeHomeSalaryCalculator'
import GratuityCalculator from './pages/GratuityCalculator'
import PPFCalculator from './pages/PPFCalculator'
import SIPCalculator from './pages/SIPCalculator'
import FDCalculator from './pages/FDCalculator'
import MutualFundCalculator from './pages/MutualFundCalculator'
import EMICalculator from './pages/EMICalculator'
import CompoundInterestCalculator from './pages/CompoundInterestCalculator'
import Section80DCalculator from './pages/Section80DCalculator'
import SalaryTaxOptimizer from './pages/SalaryTaxOptimizer'
import SSYCalculator from './pages/SSYCalculator'
import EPFCalculator from './pages/EPFCalculator'
import ELSSComparison from './pages/ELSSComparison'
import TaxLossHarvesting from './pages/TaxLossHarvesting'
import Form16Decoder from './pages/Form16Decoder'
import RefundCalculator from './pages/RefundCalculator'
import ProfessionalTaxCalculator from './pages/ProfessionalTaxCalculator'
import GuidesPage from './pages/GuidesPage'
import IncomeTaxSlabsGuide from './pages/guides/IncomeTaxSlabsGuide'
import Section80CGuide from './pages/guides/Section80CGuide'
import HowToFileITRGuide from './pages/guides/HowToFileITRGuide'
import BestTaxSavingGuide from './pages/guides/BestTaxSavingGuide'

export default function App() {
  return (
    <Layout>
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
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/income-tax-slabs-2026-27" element={<IncomeTaxSlabsGuide />} />
        <Route path="/guides/section-80c-deductions" element={<Section80CGuide />} />
        <Route path="/guides/how-to-file-itr-online" element={<HowToFileITRGuide />} />
        <Route path="/guides/best-tax-saving-salaried" element={<BestTaxSavingGuide />} />
      </Routes>
    </Layout>
  )
}
