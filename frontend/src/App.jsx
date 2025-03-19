import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './landingPage';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';
import { AuthProvider } from './authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResetPasswordPage from './ResetPasswordPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import { RecoveryContext, RecoveryProvider } from './RecoveryContext';
import OTPInput from './OTPInput';
import Homepage from './Homepage';

// Create the PasswordRecoveryFlow component
function PasswordRecoveryFlow() {
  const { page } = useContext(RecoveryContext);

  return (
    <>
      {page === "forgotPassword" && <ForgotPasswordPage />}
      {page === "otp" && <OTPInput />}
      {page === "resetPassword" && <ResetPasswordPage />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="995536188022-t1bci6di33lak0lfulniv7me90mj172t.apps.googleusercontent.com">
        <RecoveryProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/homepage" element={<Homepage />} />
            
            {/* Password Recovery Flow */}
            <Route path="/forgot-password" element={<PasswordRecoveryFlow />} />
            <Route path="/otp" element={<Navigate to="/forgot-password" />} />
            <Route path="/reset-password" element={<Navigate to="/forgot-password" />} />
          </Routes>
        </RecoveryProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
