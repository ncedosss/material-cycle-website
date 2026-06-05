import { Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ServicesRequested from './pages/ServicesRequestedPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import RegistrationSuccessPage from "./pages/RegistrationSuccessPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ServiceRequestDetailPage from "./pages/ServiceRequestDetailPage";
import CreateServiceRequestPage from "./pages/CreateServiceRequestPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/services" element={<ServicesRequested />} />
      <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
      <Route path="registration-success" element={<RegistrationSuccessPage  />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }/>
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/services/:id" element={<ServiceRequestDetailPage />} />
      <Route path="/services/new" element={<CreateServiceRequestPage />} />
    </Routes>
  )
}

export default App