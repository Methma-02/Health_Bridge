// src/components/RequestList.jsx
import React from 'react';
import RequestCard from './RequestCard';

function RequestList({ requests, onViewDetails, onDonate }) {
  // Filter out fulfilled requests and sort by status (Urgent first)
  const activeRequests = requests
    .filter(req => req.status !== 'Fulfilled')
    .sort((a, b) => {
      if (a.status === 'Urgent' && b.status !== 'Urgent') return -1;
      if (a.status !== 'Urgent' && b.status === 'Urgent') return 1;
      return new Date(b.datePosted) - new Date(a.datePosted);
    });

  return (
    <div className="request-list">
      {activeRequests.length === 0 ? (
        <p className="no-requests">No active requests at this time.</p>
      ) : (
        activeRequests.map(request => (
          <RequestCard 
            key={request.id} 
            request={request} 
            onViewDetails={() => onViewDetails(request)}
            onDonate={() => onDonate(request)}
          />
        ))
      )}
    </div>
  );
}

export default RequestList;