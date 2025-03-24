import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './authContext';
import * as api from './api';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State to manage form inputs
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

   // State to manage loading status during login
  const [isLoading, setIsLoading] = useState(false);

  // State to track password validation requirements
  const [passwordRequirements, setPasswordRequirements] = useState(false);

  const formRef = useRef(null);  // Reference to the form element for animation

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;    // Load Google Client ID from environment variables
  console.log("Google Client ID:", googleClientId);


  // Apply animation effect when component mounts
  useEffect(() => { 
    // Card animation only - removed bubble animations
    const formElement = formRef.current;
    if (formElement) {
      formElement.style.opacity = 0;
      formElement.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        formElement.style.opacity = 1;
        formElement.style.transform = 'translateY(0)';
        formElement.style.transition = 'opacity 1s ease, transform 1s ease';
      }, 100);
    }

    return () => {
      if (formElement) {
        formElement.style.transition = '';
      }
    };
  }, []);

  // Function to validate password against security criteria
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
  
     // Add any failed validation messages to errors array
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
      console.log("Google login success:", credentialResponse);
      const { token } = await api.googleLogin(credentialResponse.credential);
      login(token);
      navigate('/homepage');
    } catch (error) {
      console.error("Google login error:", error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Google login failed. Please try again.'
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
      console.log("Attempting login with:", loginData);
      // API call to login
      const { token } = await api.login(loginData);
      login(token);
      navigate('/homepage');
    } catch (error) {
      console.error("Login error details:", error);
  setErrors(prev => ({
    ...prev,
    submit: error.message || error.data?.error || 'Login failed. Please try again.'
  }));
} finally {
  setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#4338ca] via-[#4f46e5] to-[#eef2ff] flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Network graph-like pattern in background - kept this but removed the bubbles */}
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
      <div ref={formRef} className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.3)]"
        >
          {/* Header with primary color */}
          <div className="text-center relative mb-8">
            <h2 className="text-3xl font-bold text-[#333]">Login</h2>
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
            onSubmit={handleLogin} 
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

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password"
                className="text-sm text-[#4f46e5] hover:text-[#4338ca] transition-colors duration-300"
              >
                Forgot your password?
              </Link>
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
                    Logging in...
                  </span>
                ) : (
                  'Login'
                )}
              </span>
            </motion.button>
          </form>

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
                  onError={(error) => {
                    console.error("Google login error:", error);
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
            <p className="text-[#666] text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register"
                className="text-[#4f46e5] hover:text-[#4338ca] transition-colors duration-300 font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;