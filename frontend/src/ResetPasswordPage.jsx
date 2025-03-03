import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as api from './api';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenStatus, setTokenStatus] = useState({
    verified: false,
    checking: true,
    error: null
  });

  // Verify token when component mounts
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Only verify if we have a token
        if (!token) {
          setTokenStatus({
            verified: false,
            checking: false,
            error: "No reset token provided."
          });
          return;
        }

        // Call API to verify token
        await api.verifyResetToken(token);
        setTokenStatus({
          verified: true,
          checking: false,
          error: null
        });
      } catch (error) {
        console.error("Token verification failed:", error);
        setTokenStatus({
          verified: false,
          checking: false,
          error: error.message || "This password reset link is invalid or has expired."
        });
      }
    };

    verifyToken();
  }, [token]);

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    
    if (!password) {
      errors.push("Password is required");
      return { isValid: false, errors };
    }
  
    const requirements = [
      {
        test: password.length < 8,
        message: "Password must be at least 8 characters long"
      },
      {
        test: !/[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter"
      },
      {
        test: !/[a-z]/.test(password),
        message: "Password must contain at least one lowercase letter"
      },
      {
        test: !/[0-9]/.test(password),
        message: "Password must contain at least one number"
      },
      {
        test: !/[!@#$%^&*(),.?":{}|<>]/.test(password),
        message: "Password must contain at least one special character"
      }
    ];
  
    requirements.forEach(({ test, message }) => {
      if (test) {
        errors.push(message);
      }
    });
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    
    // Clear errors for the field being changed
    setErrors(prev => ({
      ...prev,
      password: undefined
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    
    // Clear errors for the field being changed
    setErrors(prev => ({
      ...prev,
      confirmPassword: undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await api.resetPassword(token, password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error("Password reset failed:", error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to reset password. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while verifying token
  if (tokenStatus.checking) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-[#4338ca] via-[#4f46e5] to-[#eef2ff] flex items-center justify-center px-4 py-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] max-w-md w-full">
          <div className="flex flex-col items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-[#4f46e5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-[#333]">Verifying reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if token is invalid
  if (!tokenStatus.verified) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-[#4338ca] via-[#4f46e5] to-[#eef2ff] flex items-center justify-center px-4 py-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] max-w-md w-full">
          <div className="text-center relative mb-8">
            <h2 className="text-3xl font-bold text-[#333]">
              Invalid Reset Link
            </h2>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] rounded-full"></div>
          </div>
          
          <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg mb-6">
            <p>{tokenStatus.error || "This password reset link is invalid or has expired."}</p>
            <p className="mt-2">Please request a new password reset link.</p>
          </div>
          
          <motion.button
            onClick={() => navigate('/forgot-password')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] group-hover:from-[#4338ca] group-hover:to-[#4f46e5] transition-all duration-300"></span>
            <span className="relative text-white font-medium">
              Request New Reset Link
            </span>
          </motion.button>
          
          <div className="mt-6 text-center">
            <motion.button
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm text-[#4f46e5] hover:text-[#4338ca] transition-colors duration-300"
            >
              Back to Login
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#4338ca] via-[#4f46e5] to-[#eef2ff] flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Network graph-like pattern in background */}
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
              Reset Password
            </h2>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] rounded-full"></div>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg mb-4"
            >
              <p className="font-medium">Password reset successful!</p>
              <p className="mt-1">Your password has been updated. Redirecting to login page...</p>
            </motion.div>
          ) : (
            <>
              {errors.submit && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-100 border border-red-300 text-red-600 rounded-lg"
                >
                  {errors.submit}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    New Password
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300"
                      required
                      disabled={isLoading}
                      placeholder="••••••••••••"
                    />
                  </motion.div>
                  {errors.password && Array.isArray(errors.password) ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 p-3 rounded-lg bg-[#eef2ff] border border-[#818cf8]/30"
                    >
                      {errors.password.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm flex items-center mb-1 last:mb-0">
                          <span className="mr-2 text-xs">❌</span> {error}
                        </p>
                      ))}
                    </motion.div>
                  ) : errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-red-500 text-sm"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    Confirm Password
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300"
                      required
                      disabled={isLoading}
                      placeholder="••••••••••••"
                    />
                  </motion.div>
                  {errors.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-red-500 text-sm"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-lg relative overflow-hidden group disabled:opacity-70"
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] group-hover:from-[#4338ca] group-hover:to-[#4f46e5] transition-all duration-300"></span>
                  <span className="relative text-white font-medium flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Reset Password"
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
            >
              Back to Login
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;