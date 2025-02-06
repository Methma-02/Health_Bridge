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

export default App;