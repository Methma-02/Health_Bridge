import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as api from './api';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Get email from localStorage if available
    const email = localStorage.getItem('resetEmail');
    if (email) {
      setFormData(prev => ({ ...prev, email }));
    }
  }, []);

  // Enhanced password validation
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when field is changed
    setValidationErrors(prev => ({
      ...prev,
      [name]: undefined
    }));

    // Validate password on change
    if (name === 'password') {
      const validation = validatePassword(value);
      if (!validation.isValid) {
        setValidationErrors(prev => ({
          ...prev,
          password: validation.errors
        }));
      }
    }

    // Validate confirm password
    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      const newPassword = name === 'password' ? value : formData.password;
      const confirmValue = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      if (newPassword !== confirmValue) {
        setValidationErrors(prev => ({
          ...prev,
          confirmPassword: ["Passwords do not match"]
        }));
      } else {
        setValidationErrors(prev => ({
          ...prev,
          confirmPassword: undefined
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate all fields before submission
    const passwordValidation = validatePassword(formData.password);
    const errors = {};

    if (!formData.email) {
      errors.email = ["Email is required"];
    }

    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = ["Passwords do not match"];
    }

    // If there are validation errors, stop submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      // We're not passing a token since our backend doesn't have token functionality set up yet
      // Just sending email and password for now
      await api.resetPassword(formData.email, formData.password);
      setSuccess(true);
      
      // Clean up localStorage
      localStorage.removeItem('resetEmail');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Password reset failed:', err);
      setError(err.message || 'An error occurred. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  // Display requirements for password
  const renderPasswordRequirements = () => {
    const requirements = [
      { test: /^.{8,}$/, label: "At least 8 characters" },
      { test: /[A-Z]/, label: "At least one uppercase letter" },
      { test: /[a-z]/, label: "At least one lowercase letter" },
      { test: /[0-9]/, label: "At least one number" },
      { test: /[!@#$%^&*(),.?":{}|<>]/, label: "At least one special character" }
    ];

    return (
      <div className="mt-2 text-xs space-y-1">
        <p className="text-gray-500 font-medium">Password requirements:</p>
        <ul className="space-y-1">
          {requirements.map((req, index) => (
            <li 
              key={index}
              className={`flex items-center ${
                formData.password && req.test.test(formData.password)
                  ? "text-green-600" 
                  : "text-gray-500"
              }`}
            >
              <span className="mr-1">
                {formData.password && req.test.test(formData.password) ? "✓" : "○"}
              </span>
              {req.label}
            </li>
          ))}
        </ul>
      </div>
    );
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
              Reset Password
            </h2>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] rounded-full"></div>
          </div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-100 border border-green-300 text-green-600 rounded-lg text-center"
            >
              <p className="font-medium mb-2">Password successfully reset!</p>
              <p>Redirecting to login page...</p>
            </motion.div>
          ) : (
            <>
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300"
                      required
                      disabled={isLoading || !!localStorage.getItem('resetEmail')}
                      placeholder="your.email@example.com"
                    />
                    {validationErrors.email && (
                      <div className="text-red-500 text-xs mt-1">
                        {validationErrors.email.map((err, idx) => (
                          <div key={idx}>{err}</div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    New Password
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300 pr-12"
                      required
                      disabled={isLoading}
                      placeholder="Create a new password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#4f46e5] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                    
                    {validationErrors.password && (
                      <div className="text-red-500 text-xs mt-1">
                        {validationErrors.password.map((err, idx) => (
                          <div key={idx}>{err}</div>
                        ))}
                      </div>
                    )}
                    
                    {renderPasswordRequirements()}
                  </motion.div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    Confirm New Password
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300"
                      required
                      disabled={isLoading}
                      placeholder="Confirm your new password"
                    />
                    {validationErrors.confirmPassword && (
                      <div className="text-red-500 text-xs mt-1">
                        {validationErrors.confirmPassword.map((err, idx) => (
                          <div key={idx}>{err}</div>
                        ))}
                      </div>
                    )}
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
                        Processing...
                      </span>
                    ) : (
                      'Reset Password'
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

export default ResetPasswordPage;