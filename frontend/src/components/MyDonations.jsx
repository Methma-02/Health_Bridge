// src/components/MyDonations.jsx
import React from 'react';

function MyDonations({ donations }) {
  return (
    <div className="my-donations">
      {donations.length === 0 ? (
        <p className="no-donations">You haven't made any donations yet.</p>
      ) : (
        <>
          <h2>Your Donation History</h2>
          <div className="donations-list">
            {donations.map(donation => (
              <div key={donation._id} className="donation-card">
                <h3>Donation to: {donation.requestTitle}</h3>
                <div className="donation-details">
                  <p><strong>Quantity:</strong> {donation.quantity} items</p>
                  <p><strong>Condition:</strong> {donation.condition}</p>
                  <p><strong>Date:</strong> {donation.date}</p>
                  {donation.notes && (
                    <p><strong>Notes:</strong> {donation.notes}</p>
                  )}
                </div>
                <div className="requester-contact">
                  <h4>Requester Contact</h4>
                  <p><strong>Name:</strong> {donation.requesterName}</p>
                  <p><strong>Email:</strong> {donation.requesterEmail}</p>
                  <p><strong>Phone:</strong> {donation.requesterPhone}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyDonations;