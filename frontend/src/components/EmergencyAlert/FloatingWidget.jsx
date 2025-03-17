// frontend/src/components/EmergencyAlert/FloatingWidget.jsx (continued)
import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import EmergencyForm from './EnergencyForm';
import EmergencyTracker from './EmergencyTracker';

const FloatingWidget = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeEmergency, loading } = useEmergency();

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-[350px] max-h-[80vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
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
        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
      >
        {activeEmergency ? (
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Active Alert
          </span>
        ) : (
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Emergency Help
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingWidget;