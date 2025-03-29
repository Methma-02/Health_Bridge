import React from 'react';

function MyRequests({ requests, onEdit, onComplete }) {
  const sortedRequests = [...requests].sort((a, b) => {
    // Active and Urgent first, then Fulfilled
    if (a.status !== 'Fulfilled' && b.status === 'Fulfilled') return -1;
    if (a.status === 'Fulfilled' && b.status !== 'Fulfilled') return 1;
    // Then by date (newest first)
    return new Date(b.datePosted) - new Date(a.datePosted);
  });

  return (
    <div className="my-requests">
      {sortedRequests.length === 0 ? (
        <p className="no-requests">You haven't created any requests yet.</p>
      ) : (
        sortedRequests.map(request => (
          <div key={request._id} className="my-request-card">
            <div className="request-header">
              <h3>{request.title}</h3>
              <span className={`status-badge ${request.status.toLowerCase()}`}>
                {request.status}
              </span>
            </div>
            
            <p className="request-description">{request.description}</p>
            
            <div className="progress-container">
            <div 
                className="progress-bar" 
                style={{ width: `${Math.min(Math.round((request.currentDonations / request.itemsNeeded) * 100), 100)}%` }}
              ></div>
              <p className="progress-text">
                {request.currentDonations} of {request.itemsNeeded} items received
              </p>
            </div>
            
            <div className="request-footer">
              <p className="date-posted">Posted: {request.datePosted}</p>
              <div className="request-actions">
                {request.status !== 'Fulfilled' && (
                  <>
                    <button 
                      className="edit-button" 
                      onClick={() => onEdit(request)}
                    >
                      Edit
                    </button>
                    <button 
                      className="complete-button" 
                      onClick={() => onComplete(request._id)}
                    >
                      Mark Complete
                    </button>
                  </>
                )}
                {request.status === 'Fulfilled' && (
                  <span className="fulfilled-message">Request fulfilled!</span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRequests;