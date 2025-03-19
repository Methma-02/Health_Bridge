import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MDashboard from './mainDash';
import Dashboard from './pages/dashboard';
import WeightChart from './pages/WeightChart';
import HeightChart from './pages/HeightChart';
import Immunization from './pages/Immunization';
import SensoryScreening from './pages/sensoryScreening';
import DevelopmentMilestones from './pages/developmentMilestones';
import ChildHealthRecord from './pages/childHealthRecord';
import StudentHealthRecords from './pages/studentHealthRecords';
import Referral from './pages/referal';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<MDashboard />} />

        {/* Each page wrapped inside the Dashboard layout */}
        <Route path="/Weightchart" element={<Dashboard><WeightChart /></Dashboard>} />
        <Route path="/heightchart" element={<Dashboard><HeightChart /></Dashboard>} />
        <Route path="/immunization" element={<Dashboard><Immunization /></Dashboard>} />
        <Route path="/sensoryscreening" element={<Dashboard><SensoryScreening /></Dashboard>} />
        <Route path="/developmentmilestones" element={<Dashboard><DevelopmentMilestones /></Dashboard>} />
        <Route path="/childhealthrecord" element={<Dashboard><ChildHealthRecord /></Dashboard>} />
        <Route path="/studenthealthrecords" element={<Dashboard><StudentHealthRecords /></Dashboard>} />
        <Route path="/referral" element={<Dashboard><Referral /></Dashboard>} />
      </Routes>
    </Router>
  );
};

export default App;
