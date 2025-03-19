// frontend/src/components/EmergencyAlert/FloatingWidget.jsx
import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import EmergencyForm from './EnergencyForm';
import EmergencyTracker from './EmergencyTracker';
import '../../emergency-alert-system.css';

const FloatingWidget = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeEmergency, loading } = useEmergency();

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="emergency-widget">
      {isOpen && (
        <div className="emergency-widget-content">
          {loading ? (
            <div className="emergency-loader-container">
              <div className="emergency-loader"></div>
            </div>
          ) : (
            <>
              {activeEmergency ? (
                <EmergencyTracker emergency={activeEmergency} onClose={() => setIsOpen(false)} />
              ) : (
                <EmergencyForm userId={userId} onClose={() => setIsOpen(false)} />
              )}
            </>
          )}
        </div>
      )}
      <button
        onClick={toggleWidget}
        className="emergency-widget-button"
      >
        {activeEmergency ? (
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Active Alert
          </span>
        ) : (
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Emergency Help
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingWidget;
