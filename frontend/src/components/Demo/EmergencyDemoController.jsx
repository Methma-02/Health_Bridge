import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import FloatingWidget from '../EmergencyAlert/FloatingWidget';
import HospitalDashboard from './HospitalDashbaord';

const EmergencyDemoController = () => {
  const [viewMode, setViewMode] = useState('patient'); // 'patient' or 'hospital'
  const { activeEmergency, setActiveEmergency } = useEmergency();

  return (
    <div className="demo-controller" style={styles.demoController}>
      <div className="demo-tabs" style={styles.demoTabs}>
        <button 
          className={`demo-tab ${viewMode === 'patient' ? 'active' : ''}`}
          onClick={() => setViewMode('patient')}
          style={{
            ...styles.tabButton,
            ...(viewMode === 'patient' ? styles.activeTabButton : {}),
          }}
        >
          Patient View
        </button>
        <button 
          className={`demo-tab ${viewMode === 'hospital' ? 'active' : ''}`}
          onClick={() => setViewMode('hospital')}
          style={{
            ...styles.tabButton,
            ...(viewMode === 'hospital' ? styles.activeTabButton : {}),
          }}
        >
          Hospital View
        </button>
      </div>
      
      <div className="demo-view-container" style={styles.demoViewContainer}>
        {viewMode === 'patient' ? (
          <div className="patient-view">
            <div className="dashboard" style={styles.dashboard}>
              <h1 style={styles.dashboardTitle}>Patient Dashboard</h1>
              <div style={styles.dashboardContent}>
                <p style={styles.dashboardText}>
                  Press the emergency button if you need immediate medical assistance.
                </p>
                <p style={styles.dashboardText}>
                  This will alert nearby hospitals of your emergency.
                </p>
                <div style={styles.emergencyInstructions}>
                  <div style={styles.instructionItem}>
                    <span style={styles.instructionIcon}>🚨</span>
                    <span style={styles.instructionText}>
                      In case of emergency, press the button below.
                    </span>
                  </div>
                  <div style={styles.instructionItem}>
                    <span style={styles.instructionIcon}>🚑</span>
                    <span style={styles.instructionText}>
                      An ambulance will be dispatched to your location.
                    </span>
                  </div>
                  <div style={styles.instructionItem}>
                    <span style={styles.instructionIcon}>🏥</span>
                    <span style={styles.instructionText}>
                      Nearby hospitals will be notified immediately.
                    </span>
                  </div>
                </div>
              </div>
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

// Inline styles for the component
const styles = {
  demoController: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '2rem',
  },
  demoTabs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  tabButton: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: '#e5e7eb',
    color: '#374151',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeTabButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  demoViewContainer: {
    width: '100%',
    maxWidth: '1200px',
    flex: 1,
  },
  dashboard: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  dashboardTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  dashboardContent: {
    color: '#4b5563',
    lineHeight: '1.6',
  },
  dashboardText: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
  },
  emergencyInstructions: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  instructionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  instructionIcon: {
    fontSize: '1.5rem',
  },
  instructionText: {
    fontSize: '1rem',
    color: '#374151',
  },
};