// backend/services/googleMapsService.js
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Mock data for simulated hospitals
const MOCK_HOSPITALS = [
  {
    name: "Memorial Hospital",
    placeId: "memorial_hospital_01",
    location: {
      type: 'Point',
      coordinates: [-73.935542, 40.730810] // Slightly offset from emergency
    },
    address: "123 Healthcare Ave, New York, NY",
    rating: 4.5
  },
  {
    name: "City Medical Center",
    placeId: "city_medical_02",
    location: {
      type: 'Point',
      coordinates: [-73.932242, 40.732610] // Different location
    },
    address: "456 Medicine Blvd, New York, NY",
    rating: 4.2
  },
  {
    name: "University Hospital",
    placeId: "university_hospital_03",
    location: {
      type: 'Point',
      coordinates: [-73.937742, 40.728410] // Different location
    },
    address: "789 Health St, New York, NY",
    rating: 4.7
  }
];

const findNearbyHospitals = async (latitude, longitude, radius = 10000) => {
  try {
    console.log(`[SIMULATION] Finding hospitals near ${latitude}, ${longitude}`);
    
    // In a real scenario, we would make the API call
    // For simulation, we'll return our mock data
    
    // Uncomment this for real implementation:
    /*
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
    */
    
    // Return mock data for simulation
    return MOCK_HOSPITALS;
  } catch (error) {
    console.error('Error finding nearby hospitals:', error);
    throw error;
  }
};

module.exports = {
  findNearbyHospitals
};