import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ManifestsPage from './pages/ManifestsPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/manifests" element={<ManifestsPage />} />
      <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
      <Route path="registration-success" element={<RegistrationSuccessPage  />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }/>
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  )
}

export default App