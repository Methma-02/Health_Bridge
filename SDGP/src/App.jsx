import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import RegistrationInformation from './components/RegistrationInformation/RegistrationInformation'; 
import ClinicCare from './components/ClinicCare/ClinicCare';
import PostnatalCare from './components/PostnatalCare/PostnatalCare';
import Refferal from './components/Refferal/Refferal';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/registration" element={<RegistrationInformation />} />
        <Route path="/clinic-care" element={<ClinicCare />} />
        <Route path="/postnatal-care" element={<PostnatalCare />} />
        <Route path="/refferal" element={<Refferal/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
