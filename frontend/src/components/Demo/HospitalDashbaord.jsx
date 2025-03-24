import React, { useState, useEffect } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import HospitalChat from '../EmergencyAlert/HospitalChat';

const HospitalDashboard = () => {
  const { activeEmergency, setActiveEmergency, messages, sendMessage, completeEmergency } = useEmergency();
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [emergencyView, setEmergencyView] = useState('list'); // 'list' or 'detail'
  const [hospitalName] = useState('University Medical Center');
  const [hospitalInfo] = useState({
    _id: 'hospital123',
    name: 'University Medical Center',
    address: '500 University Ave, Medical District',
    location: {
      coordinates: [-122.4194, 37.7749] // Example coordinates
    }
  });

  // Initialize Google Maps
  useEffect(() => {

    const loadMap = () => {
      const mapElement = document.getElementById('map-placeholder');
      if (!mapElement) return;

      const newMap = new window.google.maps.Map(mapElement, {
        center: {
          lat: activeEmergency.location.coordinates[1],
          lng: activeEmergency.location.coordinates[0]
        },
          zoom: 13,
      });

      // Add marker for user location
      new window.google.maps.Marker({
        position: {
          lat: activeEmergency.location.coordinates[1],
          lng: activeEmergency.location.coordinates[0]
        },
        map: newMap,
        title: 'Your Location',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }
      });

      // Initialize directions renderer
      const renderer = new window.google.maps.DirectionsRenderer({
        map: newMap,
        suppressMarkers: true
      });

      setMap(newMap);
      setDirectionsRenderer(renderer);
    };

    // Load Google Maps API
    if (!window.google || !window.google.maps) {
      console.log("Not google");
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, [activeEmergency]);


  // Function to accept the emergency
  const handleAcceptEmergency = () => {
    if (!activeEmergency) return;

    // In a real implementation, this would call an API
    // Instead we'll update the emergency data in our context
    const updatedEmergency = {
      ...activeEmergency,
      status: 'accepted',
      acceptedBy: hospitalInfo
    };

    setActiveEmergency(updatedEmergency);

    // Send an automatic message to the patient
    setTimeout(() => {
      sendMessage("This is University Medical Center. We've received your emergency alert and are dispatching help immediately. Please stay where you are.");
    }, 1000);

    setEmergencyView('detail');
  };

  // Handle completing an emergency
  const handleCompleteEmergency = () => {
    if (!activeEmergency) return;

    // Send final message to patient
    sendMessage("Emergency response has been completed. We hope you're feeling better. Please don't hesitate to reach out if you need any follow-up care.");

    // Call the complete emergency function from context
    completeEmergency(activeEmergency._id);

    // Optional: Return to the empty state or list view after a short delay
    setTimeout(() => {
      setActiveEmergency(null);
      setEmergencyView('list');
    }, 3000);
  };

  // Calculate estimated arrival time (demo purposes)
  const getEstimatedArrival = () => {
    const now = new Date();
    const arrivalTime = new Date(now.getTime() + 8 * 60000); // 8 minutes from now
    return arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!activeEmergency) {
    return (
      <div className="hospital-dashboard">
        <div className="hospital-header">
          <h1>{hospitalName}</h1>
          <span className="hospital-status online">Online</span>
        </div>

        <div className="hospital-no-emergencies">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h2>No Active Emergencies</h2>
          <p>The emergency dashboard is actively monitoring for alerts.</p>
          <p className="tip">To test the system, switch to Patient View and create an emergency alert.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hospital-dashboard">
      <div className="hospital-header">
        <h1>{hospitalName}</h1>
        <span className="hospital-status online">Online</span>
      </div>

      {emergencyView === 'list' ? (
        <div className="hospital-emergency-list">
          <h2>Emergency Alerts</h2>

          <div className="emergency-card new-alert">
            <div className="emergency-card-header">
              <span className="emergency-type">Medical Emergency</span>
              <span className="emergency-time">{new Date(activeEmergency.createdAt || Date.now()).toLocaleTimeString()}</span>
            </div>

            <div className="emergency-card-details">
              <div className="emergency-location">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  {activeEmergency.location
                    ? `Location: ${activeEmergency.location.coordinates[1].toFixed(4)}, ${activeEmergency.location.coordinates[0].toFixed(4)}`
                    : "Location information pending..."}
                </span>
              </div>

              {activeEmergency.additionalInfo && (
                <div className="emergency-info">
                  <p><strong>Patient notes:</strong> {activeEmergency.additionalInfo}</p>
                </div>
              )}

              <div className="emergency-distance">
                <p>Estimated distance: 1.7 km</p>
                <p>Estimated arrival: 8 minutes</p>
              </div>
            </div>

            <div className="emergency-actions">
              <button
                className="emergency-accept-btn"
                onClick={handleAcceptEmergency}
              >
                Accept Emergency
              </button>
              <button className="emergency-deny-btn">
                Decline (Redirect)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hospital-emergency-detail">
          <div className="detail-header">
            <h2>Active Emergency</h2>
            <span className="emergency-status">Status: {activeEmergency.status}</span>
          </div>

          <div className="detail-container">
            <div className="detail-info">
              <div className="detail-card">
                <h3>Emergency Details</h3>
                <p><strong>Time Received:</strong> {new Date(activeEmergency.createdAt || Date.now()).toLocaleTimeString()}</p>
                <p><strong>Time Accepted:</strong> {new Date().toLocaleTimeString()}</p>
                <p><strong>Estimated Arrival:</strong> {getEstimatedArrival()}</p>
                <p><strong>Location:</strong> {activeEmergency.location
                  ? `${activeEmergency.location.coordinates[1].toFixed(4)}, ${activeEmergency.location.coordinates[0].toFixed(4)}`
                  : "Location unavailable"}
                </p>

                {activeEmergency.additionalInfo && (
                  <div className="patient-notes">
                    <h4>Patient Notes</h4>
                    <p>{activeEmergency.additionalInfo}</p>
                  </div>
                )}
              </div>

              <div className="detail-map">
                <h3>Patient Location</h3>
                <div id="map-placeholder" className='emergency-map'></div>
              </div>
            </div>

            <div className="hospital-communication">
              <h3>Patient Communication</h3>
              <HospitalChat emergencyId={activeEmergency._id} />
            </div>

            <div className="hospital-actions">
              <button className="hospital-action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Send Instructions
              </button>
              <button className="hospital-action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Patient
              </button>
              <button
                className="hospital-action-btn complete"
                onClick={handleCompleteEmergency}
              >
                Complete Emergency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;