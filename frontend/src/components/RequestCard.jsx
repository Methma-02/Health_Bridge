// src/components/RequestCard.jsx
import React from 'react';

function RequestCard({ request, onViewDetails, onDonate }) {
  const progressPercentage = Math.min(
    Math.round((request.currentDonations / request.itemsNeeded) * 100),
    100
  );

  return (
    <div className="request-card">
      <div className="request-header">
        <h3>{request.title}</h3>
        <span className={`status-badge ${request.status.toLowerCase()}`}>
          {request.status}
        </span>
      </div>
      
      <div className="requestor-info">
        <div>
          <p className="requestor-name">{request.userName}</p>
          <p className="due-date">Due date: {request.dueDate}</p>
        </div>
      </div>
      
      <p className="request-description">{request.description}</p>
      
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <p className="progress-text">
          {request.currentDonations} of {request.itemsNeeded} items received
        </p>
      </div>
      
      <div className="request-footer">
        <p className="date-posted">Posted: {request.datePosted}</p>
        <div className="request-actions">
          <button className="view-button" onClick={() => onViewDetails(request)}>View Details</button>
          <button 
            className="donate-button" 
            onClick={() => onDonate(request)}
            disabled={request.status === 'Fulfilled'}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;