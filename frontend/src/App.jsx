import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './landingPage';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';
import { AuthProvider } from './authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResetPasswordPage from './ResetPasswordPage';
import ForgotPasswordPage from './ForgotPasswordPage';

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="995536188022-t1bci6di33lak0lfulniv7me90mj172t.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;