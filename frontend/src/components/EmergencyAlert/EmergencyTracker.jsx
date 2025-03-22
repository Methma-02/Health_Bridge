import React, { useState, useEffect } from 'react';
import { cancelEmergency } from '../services/emergencyService';
import { useEmergency } from '../context/EmergencyContext';
import HospitalChat from './HospitalChat';

const EmergencyTracker = ({ emergency, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const { setActiveEmergency } = useEmergency();
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Initialize Google Maps
  useEffect(() => {
    const loadMap = () => {
      const mapElement = document.getElementById('emergency-map');
      if (!mapElement) return;

      const newMap = new window.google.maps.Map(mapElement, {
        center: { 
          lat: emergency.location.coordinates[1], 
          lng: emergency.location.coordinates[0] 
        },
        zoom: 13,
      });

      // Add marker for user location
      new window.google.maps.Marker({
        position: { 
          lat: emergency.location.coordinates[1], 
          lng: emergency.location.coordinates[0] 
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
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, [emergency]);

  // Update directions if hospital accepted
  useEffect(() => {
    if (!map || !directionsRenderer || !emergency.acceptedBy) return;

    const directionsService = new window.google.maps.DirectionsService();

    const origin = new window.google.maps.LatLng(
      emergency.acceptedBy.location.coordinates[1],
      emergency.acceptedBy.location.coordinates[0]
    );

    const destination = new window.google.maps.LatLng(
      emergency.location.coordinates[1],
      emergency.location.coordinates[0]
    );

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          
          // Add marker for hospital
          new window.google.maps.Marker({
            position: origin,
            map: map,
            title: emergency.acceptedBy.name,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }
          });
        }
      }
    );
  }, [map, directionsRenderer, emergency.acceptedBy]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this emergency alert?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await cancelEmergency(emergency._id);
      
      if (response.success) {
        setActiveEmergency(null);
        onClose();
      } else {
        setError('Failed to cancel emergency alert. Please try again.');
      }
    } catch (err) {
      console.error('Error canceling emergency:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = () => {
    switch (emergency.status) {
      case 'pending':
        return 'emergency-status-pending';
      case 'accepted':
        return 'emergency-status-accepted';
      case 'canceled':
        return 'emergency-status-canceled';
      case 'completed':
        return 'emergency-status-completed';
      default:
        return '';
    }
  };

  const getStatusText = () => {
    switch (emergency.status) {
      case 'pending':
        return 'Waiting for hospital response...';
      case 'accepted':
        return `Help is on the way from ${emergency.acceptedBy?.name || 'a hospital'}`;
      case 'canceled':
        return 'This emergency has been canceled';
      case 'completed':
        return 'This emergency has been completed';
      default:
        return 'Unknown status';
    }
  };

  return (
    <div className="emergency-tracker">
      <div className="emergency-tracker-header">
        <h2 className="emergency-tracker-title">Emergency Alert</h2>
        <button onClick={onClose} className="emergency-form-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className={`emergency-status ${getStatusClass()}`}>
        <p className="emergency-status-text">{getStatusText()}</p>
        <p className="emergency-status-time">
          {emergency.createdAt && `Created at ${new Date(emergency.createdAt).toLocaleTimeString()}`}
        </p>
      </div>

      {/* Map display */}
      <div id="emergency-map" className="emergency-map"></div>
      
      {emergency.status === 'accepted' && (
        <div className="emergency-hospital-info">
          <h3 className="emergency-hospital-header">Hospital Information</h3>
          <div className="emergency-hospital-card">
            <p className="emergency-hospital-name">{emergency.acceptedBy?.name}</p>
            <p className="emergency-hospital-address">{emergency.acceptedBy?.address}</p>
            
            <div className="emergency-hospital-actions">
              <button 
                onClick={() => setShowChat(!showChat)} 
                className="emergency-chat-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {showChat ? 'Hide Chat' : 'Chat with Hospital'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showChat && emergency.status === 'accepted' && (
        <HospitalChat emergencyId={emergency._id} />
      )}

      {error && (
        <div className="emergency-alert-error">
          <p className="emergency-alert-error-text">{error}</p>
        </div>
      )}
      
      {(emergency.status === 'pending' || emergency.status === 'accepted') && (
        <button
          onClick={handleCancel}
          disabled={loading}
          className="emergency-button-secondary"
        >
          {loading ? (
            <span className="emergency-button-loading">
              <svg className="emergency-button-loading-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Processing...
            </span>
          ) : 'Cancel Emergency Alert'}
        </button>
      )}
    </div>
  );
};

export default EmergencyTracker;