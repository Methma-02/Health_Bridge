// frontend/src/components/EmergencyAlert/EmergencyForm.jsx
import React, { useState } from 'react';
import { createEmergencyAlert } from '../services/emergencyService';
import { getCurrentPosition } from '../services/locationService';
import { useEmergency } from '../context/EmergencyContext';

const EmergencyForm = ({ userId, onClose }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setActiveEmergency } = useEmergency();

  const handleInitialClick = () => {
    setIsConfirming(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get current location
      const position = await getCurrentPosition();
      
      // Create emergency alert
      const response = await createEmergencyAlert(
        userId,
        position.latitude,
        position.longitude,
        additionalInfo
      );
      
      if (response.success) {
        setActiveEmergency(response.data);
      } else {
        setError('Failed to create emergency alert. Please try again.');
      }
    } catch (err) {
      console.error('Error creating emergency:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (isConfirming) {
      setIsConfirming(false);
    } else {
      onClose();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-red-600">
          {isConfirming ? 'Confirm Emergency' : 'Emergency Alert'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {!isConfirming ? (
        <div>
          <p className="text-gray-700 mb-4">
            Press the button below if you need immediate medical assistance. This will alert nearby hospitals.
          </p>
          <button
            onClick={handleInitialClick}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            I Need Emergency Help
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-yellow-700">
              You are about to send an emergency alert to nearby hospitals. Please confirm this is an emergency.
            </p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information (Optional)
            </label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Describe your emergency or symptoms..."
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
              rows={3}
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Confirm & Send Alert'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyForm;