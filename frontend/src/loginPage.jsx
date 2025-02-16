import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import * as api from './api';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

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

  // Enhanced password validation
  const validatePassword = (password) => {
    const errors = [];
    
    if (!password) {
      errors.push("Password is required");
      return { isValid: false, errors };
    }

    const requirements = [
      {
        test: password.length >= 12,
        message: "Password must be at least 12 characters long"
      },
      {
        test: /[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter"
      },
      {
        test: /[a-z]/.test(password),
        message: "Password must contain at least one lowercase letter"
      },
      {
        test: /[0-9]/.test(password),
        message: "Password must contain at least one number"
      },
      {
        test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        message: "Password must contain at least one special character"
      }
    ];

    requirements.forEach(({ test, message }) => {
      if (!test) {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {showForgotPassword ? 'Reset Password' : 'Login'}
        </h2>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <form 
          onSubmit={showForgotPassword ? handleForgotPassword : handleLogin} 
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {!showForgotPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                required
                disabled={isLoading}
              />
              {errors.password && Array.isArray(errors.password) ? (
                errors.password.map((error, index) => (
                  <p key={index} className="text-red-500 text-sm">{error}</p>
                ))
              ) : errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (showForgotPassword ? 'Reset Password' : 'Login')}
          </button>
        </form>

        {!showForgotPassword && (
          <>
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4">
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      setErrors(prev => ({
                        ...prev,
                        submit: 'Google login failed. Please try again.'
                      }));
                    }}
                    useOneTap={false}
                    theme="outline"
                    size="large"
                    width="100%"
                    text="continue_with"
                    shape="rectangular"
                  />
                </GoogleOAuthProvider>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:underline"
                disabled={isLoading}
              >
                Register
              </button>
            </p>
          </>
        )}

        {showForgotPassword && (
          <button
            onClick={() => setShowForgotPassword(false)}
            className="mt-4 w-full text-sm text-blue-600 hover:underline"
            disabled={isLoading}
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;