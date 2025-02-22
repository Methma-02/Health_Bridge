import { useState } from 'react';
import './RequestModal.css';

const RequestModal = ({ donation, onSubmit, onClose, defaultItemImg }) => {
  const [requestData, setRequestData] = useState({
    name: '',
    contactNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({
      ...requestData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      donationId: donation.id,
      ...requestData
    });
  };

  return (
    <div className="modal-overlay">
      <div className="request-modal">
        <div className="modal-header">
          <h2>Request Donation</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="donation-summary">
          <div className="donation-image-small">
            {donation.image ? (
              <img src={donation.image} alt={donation.itemName} />
            ) : (
              <img src={defaultItemImg} alt="No image available" className="no-image" />
            )}
          </div>
          <div className="donation-brief">
            <h3>{donation.itemName}</h3>
            <p>Condition: {donation.condition}</p>
            <p>From: {donation.postedBy}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={requestData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number*</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={requestData.contactNumber}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message to Donor</label>
            <textarea
              id="message"
              name="message"
              value={requestData.message}
              onChange={handleChange}
              placeholder="Explain why you need this item or ask any questions"
              rows="4"
            ></textarea>
          </div>
          
          <div className="request-note">
            <p>Your contact information will be shared with the donor so they can arrange the pickup with you.</p>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;