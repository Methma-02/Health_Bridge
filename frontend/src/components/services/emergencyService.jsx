// frontend/src/services/emergencyService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createEmergencyAlert = async (userId, latitude, longitude, additionalInfo = '') => {
  try {
    const response = await axios.post(`${API_URL}/emergency`, {
      userId,
      latitude,
      longitude,
      additionalInfo
    });
    return response.data;
  } catch (error) {
    console.error('Error creating emergency alert:', error);
    throw error;
  }
};

export const getEmergencyDetails = async (emergencyId) => {
  try {
    const response = await axios.get(`${API_URL}/emergency/${emergencyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching emergency details:', error);
    throw error;
  }
};

export const cancelEmergency = async (emergencyId) => {
  try {
    const response = await axios.post(`${API_URL}/emergency/cancel/${emergencyId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling emergency:', error);
    throw error;
  }
};

export const getUserActiveEmergency = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/emergency/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { success: false, data: null };
    }
    console.error('Error fetching active emergency:', error);
    throw error;
  }
};