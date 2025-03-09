// src/pages/ResetPasswordPage.js
import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RecoveryContext } from './RecoveryContext';
import * as api from './api';
import { motion } from 'framer-motion';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL params if available
  const { email, setPage } = useContext(RecoveryContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      let result;
      
      // If we have a token in the URL, use that for reset
      if (token) {
        result = await api.resetPasswordWithToken(token, newPassword);
      } 
      // Otherwise use the email from context
      else if (email) {
        result = await api.resetPassword(email, newPassword);
      } else {
        throw new Error('Missing token or email for password reset');
      }

      // Show success message and redirect to login
      setSuccess(true);
      console.log('Password reset successful:', result);
      
      setTimeout(() => {
        setPage('login');
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message || 'An error occurred while resetting your password. Please try again.');
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
            <h2 className="text-3xl font-bold text-[#333]">Reset Password</h2>
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

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-green-100 border border-green-300 text-green-600 rounded-lg"
            >
              Password reset successful! Redirecting to login...
            </motion.div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {!token && !email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-yellow-100 border border-yellow-300 text-yellow-600 rounded-lg"
                >
                  Missing required information for password reset. Please start from the forgot password page.
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#333] mb-1">
                  New Password
                </label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative group">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300"
                    required
                    disabled={isLoading || (!token && !email)}
                    placeholder="Enter new password"
                    minLength="8"
                  />
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333] mb-1">
                  Confirm Password
                </label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative group">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300"
                    required
                    disabled={isLoading || (!token && !email)}
                    placeholder="Confirm new password"
                    minLength="8"
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg relative overflow-hidden group disabled:opacity-70"
                disabled={isLoading || (!token && !email)}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] group-hover:from-[#4338ca] group-hover:to-[#4f46e5] transition-all duration-300"></span>
                <span className="relative text-white font-medium">
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </span>
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;