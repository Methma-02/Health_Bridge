import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as api from './api';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Verify if the email exists and request password reset
      const response = await api.forgotPassword(email);
      if (response.exists) {
        setSuccess(true);
        // Store email in localStorage for the reset page
        localStorage.setItem('resetEmail', email);
      } else {
        setError('Email not found');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || 'An error occurred. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#4338ca] via-[#4f46e5] to-[#eef2ff] flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Network graph pattern (unchanged) */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {Array.from({ length: 20 }).map((_, i) => (
            <circle 
              key={i} 
              cx={Math.random() * 100 + "%"} 
              cy={Math.random() * 100 + "%"} 
              r="1" 
              fill="white" 
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <line 
              key={i}
              x1={Math.random() * 100 + "%"} 
              y1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"} 
              y2={Math.random() * 100 + "%"}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.3)]"
        >
          {/* Header with primary color */}
          <div className="text-center relative mb-8">
            <h2 className="text-3xl font-bold text-[#333]">
              Forgot Password
            </h2>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] rounded-full"></div>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-600 rounded-lg">
                <p className="font-medium">Password reset requested!</p>
                <p className="mt-2">If an account with that email exists, we'll send instructions to reset your password.</p>
              </div>
              <motion.button
                onClick={() => navigate('/reset-password')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg relative overflow-hidden group mt-4"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] group-hover:from-[#4338ca] group-hover:to-[#4f46e5] transition-all duration-300"></span>
                <span className="relative text-white font-medium">
                  Continue to Reset Password
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <>
              <p className="text-[#333] mb-6">
                Enter your email address to reset your password.
              </p>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-100 border border-red-300 text-red-600 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    Email Address
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
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
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      'Request Reset Link'
                    )}
                  </span>
                </motion.button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <motion.button
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm text-[#4f46e5] hover:text-[#4338ca] transition-colors duration-300"
              disabled={isLoading}
            >
              Back to Login
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;