import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import LabSelection from './pages/LabSelection'
import LabDetail from './pages/LabDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-signup" element={<AdminSignup />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/labs" element={<LabSelection />} />
      <Route path="/lab/:labId" element={<LabDetail />} />
    </Routes>
  )
}

export default App
