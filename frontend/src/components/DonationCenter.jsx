// DonationCenter.jsx
import { useState, useEffect, useRef } from 'react';
import DonationForm from './DonationForm';
import DonationsList from './DonationsList';
import RequestModal from './RequestModal';
import './DonationCenter.css';

// Import sample images
import babyCarrierImg from '../assets/baby-carrier.jpg';
import breastPumpImg from '../assets/breast-pump.jpg';
import babyClothesImg from '../assets/baby-clothes.jpg';
import defaultItemImg from '../assets/default-item.jpg';

// MOH Divisions list from the provided document
const MOH_DIVISIONS = [
  // Colombo District
  "Colombo", "Dehiwala", "Ratmalana", "Moratuwa", "Kesbewa", "Maharagama", "Kaduwela", 
  "Avissawella", "Homagama", "Padukka", "Seethawaka", "Thimbirigasyaya", "Kolonnawa", 
  "Kotte", "Hanwella",
  
  // Gampaha District
  "Gampaha", "Minuwangoda", "Attanagalla", "Divulapitiya", "Mirigama", "Negombo", 
  "Katana", "Wattala", "Ja-Ela", "Mahara", "Biyagama", "Dompe",
  
  // Kalutara District
  "Kalutara", "Panadura", "Bandaragama", "Horana", "Ingiriya", "Matugama", "Agalawatta", 
  "Bulathsinhala", "Millaniya", "Beruwala", "Dodangoda", "Walallawita", "Palindanuwara",
  
  // Kandy District
  "Kandy", "Akurana", "Harispattuwa", "Pathadumbara", "Udunuwara", "Yatinuwara", 
  "Udapalatha", "Ganga Ihala Korale", "Hatharaliyadda", "Panvila", "Minipe", "Medadumbara",
  
  // Matale District
  "Matale", "Dambulla", "Galewela", "Naula", "Palapathwela", "Rattota", "Ukuwela", "Yatawatta",
  
  // Nuwara Eliya District
  "Nuwara Eliya", "Ambagamuwa", "Hanguranketha", "Kothmale", "Walapane", "Maskeliya",
  
  // Galle District
  "Galle", "Ambalangoda", "Balapitiya", "Elpitiya", "Hikkaduwa", "Karandeniya", "Nagoda", 
  "Neluwa", "Bope-Poddala", "Imaduwa", "Baddegama", "Yakkalamulla", "Thawalama", "Akmeemana", 
  "Habaraduwa",
  
  // Matara District
  "Matara", "Akuressa", "Athuraliya", "Devinuwara", "Hakmana", "Kamburupitiya", 
  "Kirinda-Puhulwella", "Kotapola", "Malimbada", "Mulatiyana", "Pasgoda", "Pitabeddara", 
  "Thihagoda", "Weligama",
  
  // Hambantota District
  "Hambantota", "Ambalantota", "Angunakolapelessa", "Beliatta", "Hambantota Town", 
  "Katuwana", "Lunugamvehera", "Okewela", "Sooriyawewa", "Tangalle", "Tissamaharama", 
  "Weeraketiya",
  
  // Jaffna District
  "Jaffna", "Chavakachcheri", "Delft", "Karainagar", "Karaveddy", "Nallur", "Point Pedro", 
  "Sandilipay", "Tellippalai", "Uduvil", "Vadamarachchi North", "Vadamarachchi South-West", 
  "Valikamam East", "Valikamam North", "Valikamam South", "Valikamam West",
  
  // Kilinochchi District
  "Kilinochchi", "Kandavalai", "Karachchi", "Poonakary",
  
  // Mannar District
  "Mannar", "Manthai West", "Musali", "Nanaddan",
  
  // Mullaitivu District
  "Mullaitivu", "Maritimepattu", "Oddusuddan", "Puthukudiyiruppu", "Thunukkai",
  
  // Vavuniya District
  "Vavuniya", "Vavuniya North", "Vavuniya South", "Vengalacheddikulam",
  
  // Trincomalee District
  "Trincomalee", "Gomarankadawala", "Kantalai", "Kinniya", "Kuchchaveli", "Morawewa", 
  "Muttur", "Padavi Sri Pura", "Seruvila", "Thambalagamuwa",
  
  // Batticaloa District
  "Batticaloa", "Eravur", "Kattankudy", "Koralaipattu", "Koralaipattu West", 
  "Manmunai North", "Manmunai South-West", "Manmunai West", "Porativu Pattu", "Eravur Pattu",
  
  // Ampara District
  "Ampara", "Akkaraipattu", "Alayadiwembu", "Damana", "Dehiattakandiya", "Irakkamam", 
  "Kalmunai", "Karaitivu", "Lahugala", "Mahaoya", "Nintavur", "Padiyatalawa", 
  "Sammanthurai", "Thirukkovil", "Uhana",
  
  // Kurunegala District
  "Kurunegala", "Alawwa", "Bingiriya", "Ganewatta", "Giribawa", "Ibbagamuwa", 
  "Kuliyapitiya", "Kobeigane", "Kotavehera", "Mawathagama", "Narammala", "Nikaweratiya", 
  "Panduwasnuwara", "Polgahawela", "Polpithigama", "Rasnayakapura", "Rideegama", 
  "Udubaddawa", "Wariyapola",
  
  // Puttalam District
  "Puttalam", "Anamaduwa", "Arachchikattuwa", "Chilaw", "Dankotuwa", "Kalpitiya", 
  "Karuwalagaswewa", "Mahakumbukkadawala", "Mahawewa", "Mundalama", "Nawagattegama", 
  "Pallama", "Vanathavilluwa", "Wennappuwa",
  
  // Anuradhapura District
  "Anuradhapura", "Galenbindunuwewa", "Galnewa", "Horowpothana", "Ipalogama", 
  "Kahatagasdigiliya", "Kebithigollewa", "Kekirawa", "Medawachchiya", "Mihintale", 
  "Nochchiyagama", "Nuwaragam Palatha Central", "Nuwaragam Palatha East", "Padaviya", 
  "Palagala", "Palugaswewa", "Rajanganaya", "Rambewa", "Thalawa", "Thirappane",
  
  // Polonnaruwa District
  "Polonnaruwa", "Dimbulagala", "Elahera", "Hingurakgoda", "Lankapura", "Medirigiriya", 
  "Thamankaduwa", "Welikanda",
  
  // Badulla District
  "Badulla", "Bandarawela", "Ella", "Hali-Ela", "Haputale", "Kandaketiya", "Lunugala", 
  "Mahiyanganaya", "Meegahakivula", "Passara", "Rideemaliyadda", "Soranathota", 
  "Uva-Paranagama", "Welimada",
  
  // Monaragala District
  "Monaragala", "Badalkumbura", "Bibile", "Buttala", "Katharagama", "Madulla", 
  "Medagama", "Siyambalanduwa", "Thanamalvila", "Wellawaya",
  
  // Ratnapura District
  "Ratnapura", "Ayagama", "Balangoda", "Eheliyagoda", "Elapatha", "Embilipitiya", 
  "Godakawela", "Imbulpe", "Kahawatta", "Kiriella", "Kolonna", "Kuruwita", "Nivithigala", 
  "Opanayaka", "Pelmadulla", "Weligepola",
  
  // Kegalle District
  "Kegalle", "Aranayaka", "Bulathkohupitiya", "Dehiovita", "Deraniyagala", "Galigamuwa", 
  "Kegalle Town", "Mawanella", "Rambukkana", "Ruwanwella", "Warakapola", "Yatiyantota"
].sort();

const DonationCenter = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [allDonations, setAllDonations] = useState([]); // Store all donations
  const [filteredDonations, setFilteredDonations] = useState([]); // Store filtered donations
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [userMohDivision, setUserMohDivision] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [requestedDonations, setRequestedDonations] = useState([]);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showMohChangeModal, setShowMohChangeModal] = useState(false);
  const [userInfoForm, setUserInfoForm] = useState({
    fullName: '',
    mohDivision: ''
  });
  
  // For the searchable dropdown
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDivisions, setFilteredDivisions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // For MOH change modal
  const [mohChangeSearchTerm, setMohChangeSearchTerm] = useState('');
  const [mohChangeFilteredDivisions, setMohChangeFilteredDivisions] = useState([]);
  const [mohChangeShowDropdown, setMohChangeShowDropdown] = useState(false);
  
  const searchInputRef = useRef(null);
  const mohChangeSearchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const mohChangeDropdownRef = useRef(null);

  useEffect(() => {
    // Check if user info exists in localStorage
    const savedUserName = localStorage.getItem('userName');
    const savedMohDivision = localStorage.getItem('userMohDivision');

    if (savedUserName && savedMohDivision) {
      // User has visited before, use saved data
      setUserName(savedUserName);
      setUserMohDivision(savedMohDivision);
      loadDonations();
    } else {
      // First-time user, show the user info modal
      setShowUserInfoModal(true);
      setIsLoading(false);
    }
    
    // Add click outside listener for dropdowns
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      
      if (mohChangeDropdownRef.current && !mohChangeDropdownRef.current.contains(event.target) && 
          mohChangeSearchInputRef.current && !mohChangeSearchInputRef.current.contains(event.target)) {
        setMohChangeShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter MOH divisions based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = MOH_DIVISIONS.filter(division => 
        division.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDivisions(filtered);
    } else {
      setFilteredDivisions(MOH_DIVISIONS);
    }
  }, [searchTerm]);
  
  // Filter MOH divisions for the change modal
  useEffect(() => {
    if (mohChangeSearchTerm) {
      const filtered = MOH_DIVISIONS.filter(division => 
        division.toLowerCase().includes(mohChangeSearchTerm.toLowerCase())
      );
      setMohChangeFilteredDivisions(filtered);
    } else {
      setMohChangeFilteredDivisions(MOH_DIVISIONS);
    }
  }, [mohChangeSearchTerm]);

  // Add an effect to filter donations whenever userMohDivision changes
  useEffect(() => {
    if (allDonations.length > 0 && userMohDivision) {
      filterDonationsByMohDivision();
    }
  }, [allDonations, userMohDivision]);

  // Function to filter donations by MOH division
  const filterDonationsByMohDivision = () => {
    const filtered = allDonations.filter(donation => 
      donation.mohDivision === userMohDivision
    );
    setFilteredDonations(filtered);
  };

  const loadDonations = () => {
    // This would normally fetch from your backend
    setIsLoading(true);
    setTimeout(() => {
      // Sample data with different MOH divisions
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
          mohDivision: 'Colombo',
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
          mohDivision: 'Dehiwala',
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
          mohDivision: 'Colombo',
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
          mohDivision: 'Kesbewa',
          image: null // No image uploaded example
        },
        {
          id: 5,
          itemName: 'Baby Stroller',
          condition: 'Good',
          description: 'Lightweight stroller, folds easily for transport. Clean and in good working condition.',
          pickupLocation: 'Near Haputale Town Center',
          contactDetails: 'Phone: 077-111-2222',
          datePosted: '2025-02-22',
          postedBy: 'Chamari Weerasinghe',
          mohDivision: 'Haputale',
          image: null
        },
        {
          id: 6,
          itemName: 'Nursing Pillow',
          condition: 'Like New',
          description: 'Used for only 2 months. Clean and in excellent condition.',
          pickupLocation: 'Near Haputale Railway Station',
          contactDetails: 'Phone: 077-333-4444',
          datePosted: '2025-02-25',
          postedBy: 'Dilini Rajapaksa',
          mohDivision: 'Haputale',
          image: null
        }
      ];
      
      setAllDonations(mockDonations);
      // Filter will happen automatically via useEffect
      setIsLoading(false);
      setRequestedDonations([]);
    }, 1000);
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!userInfoForm.fullName || !userInfoForm.mohDivision) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Save to state
    setUserName(userInfoForm.fullName);
    setUserMohDivision(userInfoForm.mohDivision);
    
    // Save to localStorage for future visits
    localStorage.setItem('userName', userInfoForm.fullName);
    localStorage.setItem('userMohDivision', userInfoForm.mohDivision);
    
    // Close modal and load donations
    setShowUserInfoModal(false);
    loadDonations();
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfoForm({
      ...userInfoForm,
      [name]: value
    });
  };
  
  const handleMohDivisionSelect = (division) => {
    setUserInfoForm({
      ...userInfoForm,
      mohDivision: division
    });
    setSearchTerm(division);
    setShowDropdown(false);
  };
  
  const handleChangeMohDivision = () => {
    setMohChangeSearchTerm(userMohDivision);
    setShowMohChangeModal(true);
  };
  
  const handleMohDivisionChange = (division) => {
    setUserMohDivision(division);
    localStorage.setItem('userMohDivision', division);
    setShowMohChangeModal(false);
    
    // No need to reload, just re-filter the existing donations
    // The useEffect will handle this
  };

  const handleDonationSubmit = (newDonation) => {
    // This would send data to your backend in a real app
    const donationWithDetails = {
      ...newDonation,
      id: allDonations.length + 1,
      datePosted: new Date().toISOString().split('T')[0],
      postedBy: userName, // Use the saved user name
      mohDivision: userMohDivision,
      // If an image was uploaded, use it, otherwise set to null
      image: newDonation.imageFile ? URL.createObjectURL(newDonation.imageFile) : null
    };
    
    // Add the new donation to all donations and the filtered donations will update automatically
    setAllDonations(prev => [donationWithDetails, ...prev]);
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

  // User Info Modal Component with Searchable MOH Division
  const UserInfoModal = () => {
    return (
      <div className="modal-overlay">
        <div className="user-info-modal">
          <div className="modal-header">
            <h2>Welcome to the Donation Center</h2>
          </div>
          
          <div className="modal-content">
            <p>To connect you with donations in your area, please provide your information:</p>
            
            <form onSubmit={handleUserInfoSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Your Full Name*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userInfoForm.fullName}
                  onChange={handleUserInfoChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="mohDivision">Your MOH Division*</label>
                <div className="searchable-dropdown">
                  <input
                    type="text"
                    ref={searchInputRef}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onClick={() => setShowDropdown(true)}
                    placeholder="Search for your MOH Division"
                    autoComplete="off"
                  />
                  {showDropdown && (
                    <ul className="dropdown-list" ref={dropdownRef}>
                      {filteredDivisions.length > 0 ? (
                        filteredDivisions.map((division, index) => (
                          <li 
                            key={index}
                            onClick={() => handleMohDivisionSelect(division)}
                            className={userInfoForm.mohDivision === division ? 'selected' : ''}
                          >
                            {division}
                          </li>
                        ))
                      ) : (
                        <li className="no-results">No MOH Divisions found</li>
                      )}
                    </ul>
                  )}
                  <input 
                    type="hidden" 
                    name="mohDivision" 
                    value={userInfoForm.mohDivision} 
                    required
                  />
                </div>
                {userInfoForm.mohDivision && (
                  <div className="selected-division">
                    Selected: <span>{userInfoForm.mohDivision}</span>
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Continue to Donation Center
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  // Change MOH Division Modal
  const ChangeMohDivisionModal = () => {
    return (
      <div className="modal-overlay">
        <div className="moh-change-modal">
          <div className="modal-header">
            <h2>Change MOH Division</h2>
            <button className="close-button" onClick={() => setShowMohChangeModal(false)}>×</button>
          </div>
          
          <div className="modal-content">
            <p>Select your new MOH Division:</p>
            
            <div className="form-group">
              <div className="searchable-dropdown">
                <input
                  type="text"
                  ref={mohChangeSearchInputRef}
                  value={mohChangeSearchTerm}
                  onChange={(e) => {
                    setMohChangeSearchTerm(e.target.value);
                    setMohChangeShowDropdown(true);
                  }}
                  onClick={() => setMohChangeShowDropdown(true)}
                  placeholder="Search for your MOH Division"
                  autoComplete="off"
                />
                {mohChangeShowDropdown && (
                  <ul className="dropdown-list" ref={mohChangeDropdownRef}>
                    {mohChangeFilteredDivisions.length > 0 ? (
                      mohChangeFilteredDivisions.map((division, index) => (
                        <li 
                          key={index}
                          onClick={() => handleMohDivisionChange(division)}
                          className={userMohDivision === division ? 'selected' : ''}
                        >
                          {division}
                        </li>
                      ))
                    ) : (
                      <li className="no-results">No MOH Divisions found</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={() => setShowMohChangeModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="donation-center-container">
      <div className="donation-center-header">
        <div className="header-content">
          <h1>Donation Center</h1>
          <p>Connect with mothers in your MOH division to share essential items for your little ones.</p>
          {userMohDivision && (
            <div className="user-info-indicator">
              <div className="moh-division-indicator">
                <span className="moh-division-label">Your MOH Division:</span>
                <span className="moh-division-value">{userMohDivision}</span>
                <button 
                  className="change-moh-button" 
                  onClick={handleChangeMohDivision}
                  title="Change MOH Division"
                >
                  Change
                </button>
              </div>
              <div className="user-name-indicator">
                <span className="user-name-label">Welcome,</span>
                <span className="user-name-value">{userName}</span>
              </div>
            </div>
          )}
          {userMohDivision && (
            <button 
              className="donate-button"
              onClick={() => setShowDonationForm(true)}
            >
              Donate an Item
            </button>
          )}
        </div>
      </div>

      {showUserInfoModal && <UserInfoModal />}
      {showMohChangeModal && <ChangeMohDivisionModal />}

      {isLoading && !showUserInfoModal ? (
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
            userMohDivision && (
              <DonationsList 
                donations={filteredDonations} // Use the filtered donations here
                requestedDonations={requestedDonations}
                onRequestItem={(donation) => {
                setSelectedDonation(donation);
                setShowRequestModal(true);
              }}
              defaultItemImg={defaultItemImg}
              mohDivision={userMohDivision} // Pass the current MOH division
              userName={userName} // Pass the current user's name
            />
          )
        )}
        </>
      )}

      {showRequestModal && selectedDonation && (
        <RequestModal
          donation={selectedDonation}
          onSubmit={handleRequestSubmit}
          onClose={() => setShowRequestModal(false)}
          defaultItemImg={defaultItemImg}
          userName={userName}
        />
      )}
    </div>
  );
};

export default DonationCenter;