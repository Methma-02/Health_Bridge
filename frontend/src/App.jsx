import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RecoveryContext, RecoveryProvider } from './RecoveryContext';

import MDashboard from './mainDash';
import Dashboard from './pages/dashboard';
import BabyDetails from './pages/babyDetails';
import WeightChart from './pages/WeightChart';
import HeightChart from './pages/HeightChart';
import Immunization from './pages/Immunization';
import SensoryScreening from './pages/sensoryScreening';
import DevelopmentMilestones from './pages/developmentMilestones';
import ChildHealthRecord from './pages/childHealthRecord';
import StudentHealthRecords from './pages/studentHealthRecords';
import Referral from './pages/referal';

import LandingPage from './landingPage';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';
import ResetPasswordPage from './ResetPasswordPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import OTPInput from './OTPInput';
import Homepage from './Homepage';

// Password Recovery Flow component
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
          <Router>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/homepage" element={<Homepage />} />

              {/* Password Recovery Routes */}
              <Route path="/forgot-password" element={<PasswordRecoveryFlow />} />
              <Route path="/otp" element={<Navigate to="/forgot-password" />} />
              <Route path="/reset-password" element={<Navigate to="/forgot-password" />} />

              {/* Main Dashboard */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<BabyDetails />} />
                <Route path="babyDetails" element={<BabyDetails />} />
                <Route path="weightChart" element={<WeightChart />} />
                <Route path="heightChart" element={<HeightChart />} />
                <Route path="immunization" element={<Immunization />} />
                <Route path="sensoryScreening" element={<SensoryScreening />} />
                <Route path="developmentMilestones" element={<DevelopmentMilestones />} />
                <Route path="childHealthRecord" element={<ChildHealthRecord />} />
                <Route path="studentHealthRecords" element={<StudentHealthRecords />} />
                <Route path="referral" element={<Referral />} />
              </Route>
            </Routes>
          </Router>
        </RecoveryProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;

