import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import EmergencyForm from './EmergencyForm';
import EmergencyTracker from './EmergencyTracker';
import '../../emergency-alert-system.css';

const FloatingWidget = () => {
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
                <EmergencyForm onClose={() => setIsOpen(false)} />
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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingWidget;