import { useState, useEffect } from 'react';
import DonationForm from './DonationForm';
import DonationsList from './DonationsList';
import RequestModal from './RequestModal';
import './DonationCenter.css';

// Import sample images
import babyCarrierImg from '../assets/baby-carrier.jpg';
import breastPumpImg from '../assets/breast-pump.jpg';
import babyClothesImg from '../assets/baby-clothes.jpg';
import defaultItemImg from '../assets/default-item.jpg';

const DonationCenter = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [userMohDivision, setUserMohDivision] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [requestedDonations, setRequestedDonations] = useState([]);

  useEffect(() => {
    // This would normally fetch from your backend
    setTimeout(() => {
      setUserMohDivision('Colombo Central MOH');
      const mockDonations = [
        {
          id: 1,
          itemName: 'Baby Carrier',
          condition: 'Gently Used',
          description: 'Ergonomic baby carrier, suitable for infants 3-36 months. Comfortable and well-maintained.',
          pickupLocation: 'Near Colombo Central MOH Office',
          contactDetails: 'Phone: 077-123-4567, Email: mother1@example.com',
          datePosted: '2025-02-15',
          postedBy: 'Amara Silva',
          mohDivision: 'Colombo Central MOH',
          image: babyCarrierImg
        },
        {
          id: 2,
          itemName: 'Breast Pump',
          condition: 'Like New',
          description: 'Electric breast pump, used only a few times. Comes with all parts and manual.',
          pickupLocation: 'Near Unity Plaza',
          contactDetails: 'Phone: 077-987-6543',
          datePosted: '2025-02-17',
          postedBy: 'Kumari Perera',
          mohDivision: 'Colombo Central MOH',
          image: breastPumpImg
        },
        {
          id: 3,
          itemName: 'Baby Clothes Bundle (0-6 months)',
          condition: 'Good',
          description: 'Collection of 15 baby outfits, washed and ready to use.',
          pickupLocation: 'Near Colombo Central Hospital',
          contactDetails: 'Email: mother3@example.com',
          datePosted: '2025-02-18',
          postedBy: 'Nilmini Fernando',
          mohDivision: 'Colombo Central MOH',
          image: babyClothesImg
        },
        {
          id: 4,
          itemName: 'Baby Bottles Set',
          condition: 'New',
          description: 'Set of 4 baby bottles, never used. Still in original packaging.',
          pickupLocation: 'Near Maradana Junction',
          contactDetails: 'Phone: 077-555-1234',
          datePosted: '2025-02-20',
          postedBy: 'Priya Mendis',
          mohDivision: 'Colombo Central MOH',
          image: null // No image uploaded example
        }
      ];
      setDonations(mockDonations);
      setIsLoading(false);
      setRequestedDonations([]);
    }, 1000);
  }, []);

  const handleDonationSubmit = (newDonation) => {
    // This would send data to your backend in a real app
    const donationWithDetails = {
      ...newDonation,
      id: donations.length + 1,
      datePosted: new Date().toISOString().split('T')[0],
      postedBy: 'Current User Name', // Would come from auth
      mohDivision: userMohDivision,
      // If an image was uploaded, use it, otherwise set to null
      image: newDonation.imageFile ? URL.createObjectURL(newDonation.imageFile) : null
    };
    
    setDonations([donationWithDetails, ...donations]);
    setShowDonationForm(false);
  };

  const handleRequestSubmit = (requestDetails) => {
    // This would send request to backend
    console.log('Request submitted:', requestDetails);
    
    // Add this donation ID to the list of requested donations
    setRequestedDonations([...requestedDonations, selectedDonation.id]);
    
    // Show confirmation message
    alert(`Your request for ${selectedDonation.itemName} has been sent to ${selectedDonation.postedBy}!`);
    setShowRequestModal(false);
  };

  return (
    <div className="donation-center-container">
      <div className="donation-center-header">
        <div className="header-content">
          <h1>Donation Center</h1>
          <p>Connect with mothers in your MOH division to share essential items for your little ones.</p>
          <div className="moh-division-indicator">
            <span className="moh-division-label">Your MOH Division:</span>
            <span className="moh-division-value">{userMohDivision}</span>
          </div>
          <p></p>
          <button 
            className="donate-button"
            onClick={() => setShowDonationForm(true)}
          >
            Donate an Item
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading donations in your MOH division...</p>
        </div>
      ) : (
        <>
          {showDonationForm ? (
            <DonationForm 
              onSubmit={handleDonationSubmit}
              onCancel={() => setShowDonationForm(false)}
              defaultItemImg={defaultItemImg}
            />
          ) : (
            <DonationsList 
              donations={donations}
              requestedDonations={requestedDonations}
              onRequestItem={(donation) => {
                setSelectedDonation(donation);
                setShowRequestModal(true);
              }}
              defaultItemImg={defaultItemImg}
            />
          )}
        </>
      )}

      {showRequestModal && selectedDonation && (
        <RequestModal
          donation={selectedDonation}
          onSubmit={handleRequestSubmit}
          onClose={() => setShowRequestModal(false)}
          defaultItemImg={defaultItemImg}
        />
      )}
    </div>
  );
};

export default DonationCenter;