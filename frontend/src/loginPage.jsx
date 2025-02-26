import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import * as api from './api';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const LoginPage = () => {
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
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const orbRef3 = useRef(null);

  useEffect(() => {
    // Background orb animations
    gsap.to(orbRef1.current, {
      x: "10vw",
      y: "5vh",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(orbRef2.current, {
      x: "-8vw",
      y: "-7vh",
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });
    
    gsap.to(orbRef3.current, {
      x: "7vw",
      y: "-5vh",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    // Card animation
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    return () => {
      gsap.killTweensOf([orbRef1.current, orbRef2.current, orbRef3.current, formRef.current]);
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
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Animated background elements */}
      <div ref={orbRef1} className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
      <div ref={orbRef2} className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
      <div ref={orbRef3} className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-cyan-500 opacity-20 blur-3xl"></div>
      
      {/* Network graph-like pattern in background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
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
      <div ref={formRef} className="relative z-10 max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={showForgotPassword ? 'forgot' : 'login'}
            initial={{ opacity: 0, x: showForgotPassword ? -300 : 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: showForgotPassword ? 300 : -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-gray-900/70 to-indigo-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
          >
            {/* Glowing header */}
            <div className="text-center relative mb-8">
              <h2 className="text-3xl font-bold text-white">
                {showForgotPassword ? 'Reset Password' : 'Login'}
              </h2>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
            </div>

            {errors.submit && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-900/50 backdrop-blur-sm border border-red-500/50 text-red-200 rounded-lg"
              >
                {errors.submit}
              </motion.div>
            )}

            <form 
              onSubmit={showForgotPassword ? handleForgotPassword : handleLogin} 
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">
                  Email
                </label>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-indigo-900/30 border border-indigo-500/30 focus:border-cyan-400/70 text-white rounded-lg shadow-inner backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
                    required
                    disabled={isLoading}
                    placeholder="your.email@example.com"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-purple-400/0 to-blue-400/0 group-hover:from-cyan-400/20 group-hover:via-purple-400/20 group-hover:to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-red-300 text-sm"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {!showForgotPassword && (
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">
                    Password
                  </label>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-indigo-900/30 border border-indigo-500/30 focus:border-cyan-400/70 text-white rounded-lg shadow-inner backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
                      required
                      disabled={isLoading}
                      placeholder="••••••••••••"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 via-purple-400/0 to-blue-400/0 group-hover:from-cyan-400/20 group-hover:via-purple-400/20 group-hover:to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </motion.div>
                  {errors.password && Array.isArray(errors.password) ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 p-3 rounded-lg bg-indigo-900/40 border border-indigo-500/30"
                    >
                      {errors.password.map((error, index) => (
                        <p key={index} className="text-red-300 text-sm flex items-center mb-1 last:mb-0">
                          <span className="mr-2 text-xs">❌</span> {error}
                        </p>
                      ))}
                    </motion.div>
                  ) : errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-red-300 text-sm"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-lg relative overflow-hidden group disabled:opacity-70"
                disabled={isLoading}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300"></span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/60 to-cyan-500/60 blur-lg translate-y-3 opacity-40 group-hover:opacity-60 transition-opacity duration-300"></span>
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
                    <div className="w-full border-t border-indigo-500/30" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-gradient-to-r from-gray-900/70 via-indigo-900/70 to-gray-900/70 text-indigo-200">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-blue-300 hover:text-cyan-300 transition-colors duration-300"
                    disabled={isLoading}
                  >
                    Forgot Password?
                  </motion.button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-indigo-200 text-sm">
                    Don't have an account?{' '}
                    <motion.button 
                      onClick={() => navigate('/register')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-300 hover:text-cyan-300 transition-colors duration-300 font-medium"
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full text-center text-sm text-blue-300 hover:text-cyan-300 transition-colors duration-300"
                disabled={isLoading}
              >
                Back to Login
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;