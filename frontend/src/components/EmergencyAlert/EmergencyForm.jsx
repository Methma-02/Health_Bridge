import React, { useState } from 'react';
import { createEmergencyAlert } from '../services/emergencyService';
import { getCurrentPosition } from '../services/locationService';
import { useEmergency } from '../context/EmergencyContext';

const EmergencyForm = ({ onClose }) => {
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
      
      // Try to get current location
      let position;
      try {
        position = await getCurrentPosition();
      } catch (locationError) {
        setError(locationError.message);
        return;
      }
      
      // Create emergency alert without userId
      const response = await createEmergencyAlert(
        position.latitude,
        position.longitude,
        additionalInfo
      );
      
      if (response.success) {
        setActiveEmergency(response.data);
        onClose(); // Close the form if successful
      } else {
        setError(response.message || 'Failed to create emergency alert. Please try again.');
      }
    } catch (err) {
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

  // Function to display location permission guidance
  const showLocationHelp = () => {
    return (
      <div className="location-help">
        <h3>Enable Location Access</h3>
        <p>To use emergency services, please enable location access:</p>
        <ol>
          <li>Click the lock/info icon in your browser's address bar</li>
          <li>Find "Location" permissions</li>
          <li>Set to "Allow"</li>
          <li>Refresh the page</li>
        </ol>
      </div>
    );
  };

  return (
    <div className="emergency-form">
      <div className="emergency-form-header">
        <h2 className="emergency-form-title">
          {isConfirming ? 'Confirm Emergency' : 'Emergency Alert'}
        </h2>
        <button onClick={onClose} className="emergency-form-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {error && error.includes('location') ? (
        <div className="emergency-alert-error">
          <p className="emergency-alert-error-text">{error}</p>
          {showLocationHelp()}
        </div>
      ) : error ? (
        <div className="emergency-alert-error">
          <p className="emergency-alert-error-text">{error}</p>
        </div>
      ) : null}
      
      {!isConfirming ? (
        <div>
          <p className="emergency-form-description">
            Press the button below if you need immediate medical assistance. This will alert nearby hospitals.
          </p>
          <button
            onClick={handleInitialClick}
            className="emergency-button-primary"
          >
            I Need Emergency Help
          </button>
        </div>
      ) : (
        <div>
          <div className="emergency-alert-warning">
            <p className="emergency-alert-warning-text">
              You are about to send an emergency alert to nearby hospitals. Please confirm this is an emergency.
            </p>
          </div>
          
          <div className="emergency-form-group">
            <label htmlFor="additionalInfo" className="emergency-form-label">
              Additional Information (Optional)
            </label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Describe your emergency or symptoms..."
              className="emergency-form-textarea"
              rows={3}
            />
          </div>
          
          <div className="emergency-buttons-container">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="emergency-button-primary emergency-button-flex"
            >
              {loading ? (
                <span className="emergency-button-loading">
                  <svg className="emergency-button-loading-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Sending...
                </span>
              ) : 'Confirm & Send Alert'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="emergency-button-secondary emergency-button-flex"
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