// src/components/DonationForm.jsx
import React, { useState } from 'react';

function DonationForm({ request, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    // Donor contact information
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    
    // Donation details
    quantity: 1,
    condition: 'New',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const remainingItems = request.itemsNeeded - request.currentDonations;

  return (
    <div className="donation-form">
      <h2>Donate to: {request.title}</h2>
      <p className="request-by">Requested by: {request.userName}</p>
      
      <div className="request-status">
        <p>{remainingItems} items still needed</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <h3>Your Contact Information</h3>
        <div className="form-group">
          <label htmlFor="donorName">Your Name</label>
          <input
            id="donorName"
            name="donorName"
            type="text"
            value={formData.donorName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="donorEmail">Email</label>
          <input
            id="donorEmail"
            name="donorEmail"
            type="email"
            value={formData.donorEmail}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="donorPhone">Phone Number</label>
          <input
            id="donorPhone"
            name="donorPhone"
            type="tel"
            value={formData.donorPhone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <h3>Donation Details</h3>
        <div className="form-group">
          <label htmlFor="quantity">Quantity to Donate</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            max={remainingItems}
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="condition">Condition</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Gently Used">Gently Used</option>
          </select>
          {request.itemCondition !== 'Any' && (
            <p className="condition-note">
              Note: This request prefers items in {request.itemCondition} condition.
            </p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Message to Requester (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any details about your donation or coordination preferences..."
            rows="3"
          ></textarea>
        </div>
        
        <div className="contact-info-message">
          <p>
            Once your donation is confirmed, you'll receive the requester's contact information to arrange delivery or pickup directly.
          </p>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Confirm Donation
          </button>
        </div>
      </form>
    </div>
  );
}

export default DonationForm;