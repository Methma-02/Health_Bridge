import React, { useState } from 'react';
import LandingPage from './landingPage';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './authContext'; // Ensure this is correct
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <BrowserRouter>
          {currentPage === 'landing' && <LandingPage onNavigate={handleNavigation} />}
          {currentPage === 'login' && <LoginPage onNavigate={handleNavigation} />}
          {currentPage === 'register' && <RegistrationPage onNavigate={handleNavigation} />}
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
