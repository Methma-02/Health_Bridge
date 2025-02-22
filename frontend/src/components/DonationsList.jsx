import './DonationsList.css';

const DonationsList = ({ donations, requestedDonations, onRequestItem, defaultItemImg }) => {
  return (
    <div className="donations-list-container">
      <h2>Available Donations in Your Region</h2>
      
      {donations.length === 0 ? (
        <div className="no-donations-message">
          <p>There are no donations available in your region at the moment.</p>
          <p>Be the first to donate and help a mother in need!</p>
        </div>
      ) : (
        <div className="donations-grid">
          {donations.map(donation => {
            const isRequested = requestedDonations.includes(donation.id);
            
            return (
              <div key={donation.id} className="donation-card">
                <div className="donation-image">
                  {donation.image ? (
                    <img src={donation.image} alt={donation.itemName} />
                  ) : (
                    <div className="no-image-container">
                      <img src={defaultItemImg} alt="No image available" />
                      <div className="no-image-overlay">
                        <span>No image provided</span>
                      </div>
                    </div>
                  )}
                  <span className="condition-badge">{donation.condition}</span>
                </div>
                
                <div className="donation-details">
                  <h3>{donation.itemName}</h3>
                  <div className="donation-meta">
                    <span className="posted-date">Posted: {donation.datePosted}</span>
                    <span className="donor-name">By: {donation.postedBy}</span>
                  </div>
                  
                  <p className="donation-description">{donation.description}</p>
                  
                  <div className="location-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{donation.pickupLocation}</span>
                  </div>
                  
                  {isRequested ? (
                    <button 
                      className="request-button requested"
                      disabled
                    >
                      Request Sent
                    </button>
                  ) : (
                    <button 
                      className="request-button"
                      onClick={() => onRequestItem(donation)}
                    >
                      Request Item
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DonationsList;