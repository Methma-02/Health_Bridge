// src/components/RequestDetails.jsx
import React from 'react';

function RequestDetails({ request, onDonate, onClose }) {
  const progressPercentage = Math.min(
    Math.round((request.currentDonations / request.itemsNeeded) * 100),
    100
  );

  return (
    <div className="request-details">
      <h2>{request.title}</h2>
      
      <div className="request-meta">
        <span className={`status-badge ${request.status.toLowerCase()}`}>
          {request.status}
        </span>
        <p className="date-posted">Posted: {request.datePosted}</p>
      </div>
      
      <div className="requestor-info">
        <div>
          <p className="requestor-name">{request.userName}</p>
          <p className="due-date">Due date: {request.dueDate}</p>
        </div>
      </div>
      
      <div className="description-section">
        <h3>Request Details</h3>
        <p>{request.description}</p>
      </div>
      
      <div className="item-details">
        <h3>Item Information</h3>
        <p><strong>Quantity Needed:</strong> {request.itemsNeeded}</p>
        <p><strong>Preferred Condition:</strong> {request.itemCondition}</p>
      </div>
      
      <div className="progress-section">
        <h3>Donation Progress</h3>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <p className="progress-text">
            {request.currentDonations} of {request.itemsNeeded} items received ({progressPercentage}%)
          </p>
        </div>
      </div>
      
      <div className="contact-info-message">
        <p>
          Contact information will be shared after you confirm your donation.
          You'll coordinate directly with the requester to arrange delivery or pickup.
        </p>
      </div>
      
      {request.status !== 'Fulfilled' && (
        <div className="action-buttons">
          <button className="donate-button" onClick={onDonate}>
            Donate Now
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      )}
      
      {request.status === 'Fulfilled' && (
        <div className="fulfilled-message-container">
          <p className="fulfilled-message">This request has been fully fulfilled!</p>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default RequestDetails;