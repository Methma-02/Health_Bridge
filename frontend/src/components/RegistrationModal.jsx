import React, { useState } from 'react';

function RegistrationModal({ onRegister }) {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!registrationNumber.trim()) {
      setError('Please enter your registration number');
      return;
    }
    
    onRegister(registrationNumber);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content registration-modal">
        <h2>Welcome to Donation Center</h2>
        <p>Please enter your registration number to continue. This helps us keep track of your requests and donations.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="registrationNumber">Registration Number</label>
            <input
              id="registrationNumber"
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Enter your registration number"
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Continue
            </button>
          </div>
        </form>
        
        <div className="registration-info">
          <p>Your registration number links your requests and donations to your profile.</p>
          <p>If you don't have a registration number, please contact your healthcare provider.</p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal;