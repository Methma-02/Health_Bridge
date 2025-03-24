// src/components/NewRequestForm.jsx 
import React, { useState } from 'react';

function NewRequestForm({ request = null, isEditing = false, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    requesterName: request?.userName || '',
    requesterPhone: request?.requesterPhone || '',
    requesterEmail: request?.requesterEmail || '',
    title: request?.title || '',
    description: request?.description || '',
    dueDate: request?.dueDate || '',
    itemsNeeded: request?.itemsNeeded || '',
    itemCondition: request?.itemCondition || 'New',
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="new-request-form">
      <h2>{isEditing ? 'Edit Request' : 'Create New Request'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="requesterName">Your Name</label>
          <input
            id="requesterName"
            name="requesterName"
            type="text"
            value={formData.requesterName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="requesterEmail">Your Email</label>
          <input
            id="requesterEmail"
            name="requesterEmail"
            type="email"
            value={formData.requesterEmail}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="requesterPhone">Your Phone</label>
          <input
            id="requesterPhone"
            name="requesterPhone"
            type="tel"
            value={formData.requesterPhone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Request Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Baby clothes for newborn"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide details about what you need..."
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Expected Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="itemsNeeded">Number of Items Needed</label>
          <input
            id="itemsNeeded"
            name="itemsNeeded"
            type="number"
            min="1"
            value={formData.itemsNeeded}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="itemCondition">Preferred Condition</label>
          <select
            id="itemCondition"
            name="itemCondition"
            value={formData.itemCondition}
            onChange={handleChange}
            required
          >
            <option value="New">New Only</option>
            <option value="Like New">Like New</option>
            <option value="Gently Used">Gently Used</option>
            <option value="Any">Any Condition</option>
          </select>
        </div>

        <div className="contact-info-message">
          <p>
            Your contact information will only be shared with donors who confirm a donation to your request.
            You'll coordinate directly with donors to arrange delivery or pickup.
          </p>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {isEditing ? 'Update Request' : 'Create Request'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewRequestForm;