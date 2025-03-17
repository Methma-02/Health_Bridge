// backend/services/googleMapsService.js
const axios = require('axios');
const config = require('../config');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const findNearbyHospitals = async (latitude, longitude, radius = 10000) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hospital&key=${GOOGLE_MAPS_API_KEY}`
    );
    
    return response.data.results.map(hospital => ({
      name: hospital.name,
      placeId: hospital.place_id,
      location: {
        type: 'Point',
        coordinates: [hospital.geometry.location.lng, hospital.geometry.location.lat]
      },
      address: hospital.vicinity,
      rating: hospital.rating
    }));
  } catch (error) {
    console.error('Error finding nearby hospitals:', error);
    throw error;
  }
};

module.exports = {
  findNearbyHospitals
};