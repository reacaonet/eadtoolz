import { Routes, Route } from 'react-router-dom'
import { Login } from './components/auth/Login'
import { Dashboard } from './components/dashboard/Dashboard'
import { Profile } from './components/profile/Profile'
import { Home } from './components/home/Home'
import { Layout } from './components/layout/Layout'
import { Pricing } from './components/pricing/Pricing'
import { PlanManagement } from './components/admin/plans/PlanManagement'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/admin/plans" element={<Layout><PlanManagement /></Layout>} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  )
}

export default App
