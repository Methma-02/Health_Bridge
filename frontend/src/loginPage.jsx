import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import * as api from './api';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    // Modal animation
    const formElement = formRef.current;
    if (formElement) {
      formElement.style.opacity = 0;
      formElement.style.transform = 'translateY(20px) scale(0.95)';
      
      setTimeout(() => {
        formElement.style.opacity = 1;
        formElement.style.transform = 'translateY(0) scale(1)';
        formElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      }, 50);
    }

    return () => {
      if (formElement) {
        formElement.style.transition = '';
      }
    };
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

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors for the field being changed
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));

    // Validate password on change
    if (name === 'password') {
      const validation = validatePassword(value);
      if (!validation.isValid) {
        setErrors(prev => ({
          ...prev,
          password: validation.errors
        }));
      }
    }
  };

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const { token } = await api.googleLogin(credentialResponse.credential);
      login(token);
      navigate('/dashboard');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Google login failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle regular login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginErrors = {};

    // Email validation
    if (!loginData.email.trim() || !/\S+@\S+\.\S+/.test(loginData.email)) {
      loginErrors.email = "Valid email is required";
    }

    // Password validation
    const passwordValidation = validatePassword(loginData.password);
    if (!passwordValidation.isValid) {
      loginErrors.password = passwordValidation.errors;
    }

    if (Object.keys(loginErrors).length > 0) {
      setErrors(loginErrors);
      setIsLoading(false);
      return;
    }

    try {
      // API call to login
      const { token } = await api.login(loginData);
      login(token);
      navigate('/dashboard');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || 'Login failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const resetErrors = {};

    if (!loginData.email.trim() || !/\S+@\S+\.\S+/.test(loginData.email)) {
      resetErrors.email = "Valid email is required for password reset";
      setErrors(resetErrors);
      setIsLoading(false);
      return;
    }

    try {
      await api.requestPasswordReset(loginData.email);
      // Show success message
      alert('Password reset instructions have been sent to your email.');
      setShowForgotPassword(false);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to send reset instructions. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Overlay that sits on top of the landing page
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Modal content */}
      <div ref={formRef} className="relative z-10 max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={showForgotPassword ? 'forgot' : 'login'}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              aria-label="Close login modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              {/* Header with primary color */}
              <div className="text-center relative mb-8">
                <h2 className="text-3xl font-bold text-[#333]">
                  {showForgotPassword ? 'Reset Password' : 'Login'}
                </h2>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#4f46e5] to-[#818cf8] rounded-full"></div>
              </div>

              {errors.submit && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 bg-red-100 border border-red-300 text-red-600 rounded-lg"
                >
                  {errors.submit}
                </motion.div>
              )}

              <form 
                onSubmit={showForgotPassword ? handleForgotPassword : handleLogin} 
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1">
                    Email
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#eef2ff] focus:border-[#4f46e5] text-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 transition-all duration-300"
                      required
                      disabled={isLoading}
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-red-500 text-sm"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {!showForgotPassword && (
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-1">
                      Password
                    </label>
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="relative group"
                    >
                      <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
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
                )}

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
                        {showForgotPassword ? 'Sending...' : 'Logging in...'}
                      </span>
                    ) : (
                      showForgotPassword ? 'Reset Password' : 'Login'
                    )}
                  </span>
                </motion.button>
              </form>

              {!showForgotPassword && (
                <>
                  <div className="mt-6 relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#eef2ff]" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-[#666]">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => {
                            setErrors(prev => ({
                              ...prev,
                              submit: 'Google login failed. Please try again.'
                            }));
                          }}
                          useOneTap={false}
                          theme="filled_blue"
                          size="large"
                          width="100%"
                          text="continue_with"
                          shape="rectangular"
                        />
                      </motion.div>
                    </GoogleOAuthProvider>
                  </div>

                  <div className="mt-6 text-center">
                    <motion.button
                      onClick={() => setShowForgotPassword(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="text-sm text-[#4f46e5] hover:text-[#4338ca] transition-colors duration-300"
                      disabled={isLoading}
                    >
                      Forgot Password?
                    </motion.button>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-[#666] text-sm">
                      Don't have an account?{' '}
                      <motion.button 
                        onClick={() => navigate('/register')}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="text-[#4f46e5] hover:text-[#4338ca] transition-colors duration-300 font-medium"
                        disabled={isLoading}
                      >
                        Register
                      </motion.button>
                    </p>
                  </div>
                </>
              )}

              {showForgotPassword && (
                <motion.button
                  onClick={() => setShowForgotPassword(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 w-full text-center text-sm text-[#4f46e5] hover:text-[#4338ca] transition-colors duration-300"
                  disabled={isLoading}
                >
                  Back to Login
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;