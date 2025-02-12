import React, { useState } from 'react';
import LandingPage from './landingPage';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigation} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigation} />}
      {currentPage === 'register' && <RegistrationPage onNavigate={handleNavigation} />}
    </div>
  );
}

export default App;