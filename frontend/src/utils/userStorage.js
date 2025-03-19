// src/utils/userStorage.js
/**
 * Utility functions to handle user identification and data persistence
 * using registration numbers and local storage
 */

// Save user registration to local storage
export const saveUserRegistration = (registrationNumber) => {
  localStorage.setItem('donationCenter_userRegistration', registrationNumber);
  return registrationNumber;
};

// Get current user registration from local storage
export const getUserRegistration = () => {
  return localStorage.getItem('donationCenter_userRegistration');
};

// Check if user has registered
export const isUserRegistered = () => {
  return !!getUserRegistration();
};

// Save user requests to local storage
export const saveUserRequests = (requests, registrationNumber) => {
  const key = `donationCenter_requests_${registrationNumber || getUserRegistration()}`;
  localStorage.setItem(key, JSON.stringify(requests));
};

// Get user requests from local storage
export const getUserRequests = (registrationNumber) => {
  const key = `donationCenter_requests_${registrationNumber || getUserRegistration()}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

// Save user donations to local storage
export const saveUserDonations = (donations, registrationNumber) => {
  const key = `donationCenter_donations_${registrationNumber || getUserRegistration()}`;
  localStorage.setItem(key, JSON.stringify(donations));
};

// Get user donations from local storage
export const getUserDonations = (registrationNumber) => {
  const key = `donationCenter_donations_${registrationNumber || getUserRegistration()}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

// Clear all user data (for logout functionality)
export const clearUserData = () => {
  const registrationNumber = getUserRegistration();
  if (registrationNumber) {
    localStorage.removeItem(`donationCenter_requests_${registrationNumber}`);
    localStorage.removeItem(`donationCenter_donations_${registrationNumber}`);
    localStorage.removeItem('donationCenter_userRegistration');
  }
};