import React, { createContext, useState } from 'react';

// Create the context
export const RecoveryContext = createContext();

// Create the provider component
export const RecoveryProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState(null);
  const [page, setPage] = useState('forgot-password');
  
  // Values to be provided by the context
  const value = {
    email,
    setEmail,
    otp,
    setOTP,
    page,
    setPage
  };

  return (
    <RecoveryContext.Provider value={value}>
      {children}
    </RecoveryContext.Provider>
  );
};

export default RecoveryProvider;