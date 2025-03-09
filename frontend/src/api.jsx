import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
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
    const response = await api.post('/auth/register', userData);
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
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Login failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export const googleLogin = async (credential) => {
  try {
    const response = await api.post('/auth/google', { credential });
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Google login failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};


// For checking if email exists
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    // Return a simple object with 'exists' property set to true if we get here
    // because successful API response means the email exists
    return { exists: true, ...response.data };
  } catch (error) {
    // If error is 404, it means email not found, so we return exists: false
    if (error.response?.status === 404) {
      return { exists: false };
    }
    // For any other error, throw it
    console.error('Forgot password API error:', error);
    throw {
      message: error.response?.data?.error || error.message || 'Error checking email',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// For resetting the password
export const resetPassword = async (email, password) => {
  try {
    // Make sure we're sending both email and password as strings
    // The error suggests the backend is expecting string data
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    const response = await api.post('/auth/reset-password', {
      email: String(email),
      password: String(password)
    });
    
    return response.data;
  } catch (error) {
    console.error('Reset password API error:', error);
    // Make sure we're properly extracting the error message
    throw {
      message: error.response?.data?.error || error.message || 'Password reset failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// For resetting password with a token (if you want to support email links in the future)
export const resetPasswordWithToken = async (token, password) => {
  try {
    if (!token || !password) {
      throw new Error("Token and password are required");
    }
    
    const response = await api.post('/auth/reset-password', {
      token: String(token),
      password: String(password)
    });
    
    return response.data;
  } catch (error) {
    console.error('Reset password API error:', error);
    throw {
      message: error.response?.data?.error || error.message || 'Password reset failed',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

// Verify a reset password token before showing the reset form
export const verifyResetToken = async (token) => {
  try {
    const response = await api.get(`/auth/verify-reset-token/${token}`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || error.message || 'Invalid or expired token',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

export default api;