import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

// Create authentication context to manage user authentication state
const AuthContext = createContext(null);

// AuthProvider component to wrap the application and provide authentication state

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // Store authenticated user details
  const [loading, setLoading] = useState(true);  // Loading state to check if authentication is being processed

  useEffect(() => {
    const token = localStorage.getItem('authToken');  // Check for a stored authentication token in local storage
    if (token) {
      try {
        const decoded = jwtDecode(token);  // Decode the JWT token to get user information
        if (decoded.exp * 1000 < Date.now()) {  // Check if the token has expired
          localStorage.removeItem('authToken');  // If expired, remove token and clear user state
          setUser(null);
        } else {
          setUser(decoded);  // If valid, set the user state with decoded information
        }
      } catch (error) {
        localStorage.removeItem('authToken');  // If token decoding fails, remove it and reset user state
        setUser(null);
      }
    }
    setLoading(false);   // Mark authentication check as complete
  }, []);

  // Function to log in a user by storing the token and decoding user data
  const login = (token) => {  // Save token to local storage
    localStorage.setItem('authToken', token);
    const decoded = jwtDecode(token);  // Decode token to get user details
    setUser(decoded);  // Set user state
  };

  // Function to log out a user by removing token and resetting state
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Provide authentication state and functions to the application
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
