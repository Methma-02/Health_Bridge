// frontend/src/components/EmergencyAlert/EmergencyTracker.jsx
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

  const getStatusColor = () => {
    switch (emergency.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-red-600">Emergency Alert</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className={`rounded-md p-3 mb-4 ${getStatusColor()}`}>
        <p className="font-medium">{getStatusText()}</p>
        <p className="text-sm mt-1">
          {emergency.createdAt && `Created at ${new Date(emergency.createdAt).toLocaleTimeString()}`}
        </p>
      </div>

      {/* Map display */}
      <div 
        id="emergency-map" 
        className="w-full h-48 bg-gray-200 rounded-md mb-4"
      ></div>
      
      {emergency.status === 'accepted' && (
        <div className="mb-4">
          <h3 className="font-medium text-green-600 mb-2">Hospital Information</h3>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium">{emergency.acceptedBy?.name}</p>
            <p className="text-sm text-gray-600">{emergency.acceptedBy?.address}</p>
            
            <div className="mt-3 flex justify-between">
              <button 
                onClick={() => setShowChat(!showChat)} 
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {(emergency.status === 'pending' || emergency.status === 'accepted') && (
        <button
          onClick={handleCancel}
          disabled={loading}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 mt-4 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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