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
      </Routes>
    </Layout>
  )
}
