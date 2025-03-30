import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',  //Global Headers: Sets the Content-Type to "application/json" for all requests
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; //automatically attach the Authorization header with a JWT token if it exists in localStorage
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {   //Unauthorized
      localStorage.removeItem('authToken');  //Removes the expired token from localStorage
      window.location.href = '/login';       //Redirects the user to the login page (/login)
    }
    return Promise.reject({
      message: error.response?.data?.message || error.message || 'Request failed',
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData); //Sends a POST request to /auth/register to create a new user account
    return response.data;
  } catch (error) {
    throw {
      message: error.message || 'Registration failed',
      status: error.status,
      data: error.data
    };
  }
};

export const login = async (credentials) => {
  try {
    console.log("Sending login request to:", `${api.defaults.baseURL}/auth/login`);
    console.log("With credentials:", { email: credentials.email, password: "****" });
    
    const response = await api.post('/auth/login', credentials);  //Sends a POST request to /auth/login with the user’s email and password
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw {
      message: error.response?.data?.error || error.message || 'Login failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const googleLogin = async (credential) => {
  try {
    const response = await api.post('/auth/google', { credential }); //Sends a Google authentication token (credential) to the backend for verification
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Google login failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// Password recovery functions
export const sendOTP = async (email, OTP) => {
  try {
    const response = await api.post('/auth/send-otp', { recipient_email: email, OTP });
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Failed to send OTP',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// In api.jsx
export const resetPassword = async (email, newPassword) => {
  try {
    console.log("Resetting password for email:", email);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, { 
      email, 
      newPassword 
    });
    console.log("Reset password response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Reset password error in API:", error);
    throw {
      message: error.response?.data?.error || error.message || 'Failed to reset password',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};
// Export API instance as default
export default api;