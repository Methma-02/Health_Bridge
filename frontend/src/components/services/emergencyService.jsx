import axios from 'axios';

// Get the API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create an axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor to handle errors consistently
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Log the full error with details
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const createEmergencyAlert = async (latitude, longitude, additionalInfo = '') => {
  try {
    const response = await apiClient.post('/emergency', {
      latitude,
      longitude,
      additionalInfo
    });
    return response.data;
  } catch (error) {
    console.error('Error creating emergency alert:', error);
    
    // Provide better error details to the user
    const errorMessage = error.response?.data?.message || 
                        'Unable to create emergency alert. Please try again.';
    
    throw new Error(errorMessage);
  }
};

export const getEmergencyDetails = async (emergencyId) => {
  try {
    const response = await apiClient.get(`/emergency/${emergencyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching emergency details:', error);
    throw error;
  }
};

export const cancelEmergency = async (emergencyId) => {
  try {
    const response = await apiClient.post(`/emergency/cancel/${emergencyId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling emergency:', error);
    throw error;
  }
};


export const getActiveEmergencies = async () => {
  try {
    const response = await apiClient.get('/emergency/active');
    return response.data;
  } catch (error) {
    console.error('Error fetching active emergencies:', error);
    throw error;
  }
};

export const getUserActiveEmergency = async (userId) => {
  try {
    const response = await apiClient.get(`/emergency/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { success: false, data: null };
    }
    
    // Only throw for unexpected errors, not for 404
    if (error.response && error.response.status !== 404) {
      console.error('Error fetching active emergency:', error);
      throw error;
    }
    
    return { success: false, data: null };
  }

  
};