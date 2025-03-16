
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './landingPage';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';
import { AuthProvider } from './authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResetPasswordPage from './ResetPasswordPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import { RecoveryContext, RecoveryProvider } from './RecoveryContext';
import OTPInput from './OTPInput';

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

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
//import PregnancyForm from './pages/PregnancyForm';
//import ChildHealth from './pages/ChildHealth';
//import SymptomRecorder from './pages/SymptomRecorder';
//import DonationCenter from './pages/DonationCenter';
//import EmergencyAlert from './pages/EmergencyAlert';

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Homepage />} />
      {/*<Route path="/pregnancy-form" element={<PregnancyForm />} />
      <Route path="/child-health" element={<ChildHealth />} />
      <Route path="/symptom-recorder" element={<SymptomRecorder />} />
      <Route path="/donation-center" element={<DonationCenter />} />
      <Route path="/emergency-alert" element={<EmergencyAlert />} />*/}
    </Routes>

  );
};

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="995536188022-t1bci6di33lak0lfulniv7me90mj172t.apps.googleusercontent.com">
        <RecoveryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              
              {/* Replace these three routes with the single PasswordRecoveryFlow component */}
              <Route path="/forgot-password" element={<PasswordRecoveryFlow />} />
              
              {/* Keep these routes as fallbacks if someone tries to access the URLs directly */}
              <Route path="/otp" element={<Navigate to="/forgot-password" />} />
              <Route path="/reset-password" element={<Navigate to="/forgot-password" />} />
            </Routes>
          </BrowserRouter>
        </RecoveryProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
