// src/pages/ForgotPasswordPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from './RecoveryContext';
import * as api from './api';
import { motion } from 'framer-motion';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { email, setEmail, setPage } = useContext(RecoveryContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Check if email exists using forgotPassword API
      const result = await api.forgotPassword(email);
      
      if (result.exists) {
        // Show success message and navigate to reset password page
        setSuccessMessage('Email verified! You can now reset your password.');
        setTimeout(() => {
          setPage('reset-password');
          navigate('/reset-password');
        }, 1500);
      } else {
        setError('Email not found. Please check your email address.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#4338ca] via-[#4f46e5] to-[#eef2ff] flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background and UI elements */}
      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.3)]"
        >
          <div className="text-center relative mb-8">
            <h2 className="text-3xl font-bold text-[#333]">Forgot Password</h2>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] rounded-full"></div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-100 border border-red-300 text-red-600 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-green-100 border border-green-300 text-green-600 rounded-lg"
            >
              {successMessage}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1">
                Email Address
              </label>
              <motion.div whileHover={{ scale: 1.01 }} className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300"
                  required
                  disabled={isLoading}
                  placeholder="your.email@example.com"
                />
              </motion.div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg relative overflow-hidden group disabled:opacity-70"
              disabled={isLoading}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] group-hover:from-[#4338ca] group-hover:to-[#4f46e5] transition-all duration-300"></span>
              <span className="relative text-white font-medium">
                {isLoading ? 'Verifying Email...' : 'Verify Email'}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;