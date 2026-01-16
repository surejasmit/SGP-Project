import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import AdminDashboard from './pages/AdminDashboard'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import LabSelection from './pages/LabSelection'
import LabDetail from './pages/LabDetail'
import TestPage from './TestPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-signup" element={<AdminSignup />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/labs" element={<LabSelection />} />
      <Route path="/lab/:labId" element={<LabDetail />} />
    </Routes>
  )
}

export default App
