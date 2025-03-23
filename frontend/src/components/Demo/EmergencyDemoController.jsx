// components/Demo/EmergencyDemoController.jsx
import React, { useState, useEffect } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import FloatingWidget from '../EmergencyAlert/FloatingWidget';
import HospitalDashboard from './HospitalDashbaord';

const EmergencyDemoController = () => {
  const [viewMode, setViewMode] = useState('patient'); // 'patient' or 'hospital'
  const { activeEmergency, setActiveEmergency } = useEmergency();
  
  return (
    <div className="demo-controller">
      <div className="demo-tabs">
        <button 
          className={`demo-tab ${viewMode === 'patient' ? 'active' : ''}`}
          onClick={() => setViewMode('patient')}
        >
          Patient View
        </button>
        <button 
          className={`demo-tab ${viewMode === 'hospital' ? 'active' : ''}`}
          onClick={() => setViewMode('hospital')}
        >
          Hospital View
        </button>
      </div>
      
      <div className="demo-view-container">
        {viewMode === 'patient' ? (
          <div className="patient-view">
            <div className="dashboard">
              <h1>Patient Dashboard</h1>
              <p>Press the emergency button if you need immediate medical assistance.</p>
              <p>This will alert nearby hospitals of your emergency.</p>
            </div>
            <FloatingWidget />
          </div>
        ) : (
          <HospitalDashboard />
        )}
      </div>
    </div>
  );
};

export default EmergencyDemoController;