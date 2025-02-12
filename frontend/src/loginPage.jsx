import React, { useState } from 'react';

const LoginPage = ({ onNavigate }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length === 0) {
      errors.push("Password is required");
    } else {
      if (password.length < 6) {
        errors.push("Password must be at least 6 characters long");
      }
      
      if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number");
      }
      
      if (!/[a-zA-Z]/.test(password)) {
        errors.push("Password must contain at least one letter");
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for password
    if (name === 'password') {
      const passwordValidation = validatePassword(value);
      
      if (!passwordValidation.isValid) {
        setErrors(prev => ({
          ...prev,
          password: passwordValidation.errors
        }));
      } else {
        // Clear password errors if valid
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.password;
          return newErrors;
        });
      }
    }
    
    // Update login data
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
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
      return;
    }

    // If validation passes, proceed with login
    console.log("Login Attempt:", loginData);
    // Here you would typically make an API call to login
  };

  // Handle forgot password submission
  const handleForgotPassword = (e) => {
    e.preventDefault();
    const resetErrors = {};

    // Email validation for password reset
    if (!loginData.email.trim() || !/\S+@\S+\.\S+/.test(loginData.email)) {
      resetErrors.email = "Valid email is required for password reset";
    }

    if (Object.keys(resetErrors).length > 0) {
      setErrors(resetErrors);
      return;
    }

    console.log("Password Reset Request:", loginData.email);
    // Here you would typically make an API call to initiate password reset
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {showForgotPassword ? 'Reset Password' : 'Login'}
        </h2>

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
              />
              {errors.password && errors.password.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">{error}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {showForgotPassword ? 'Reset Password' : 'Login'}
          </button>
        </form>

        {!showForgotPassword && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {!showForgotPassword && (
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => onNavigate('register')}
              className="text-blue-600 hover:underline"
            >
              Register
            </button>
          </p>
        )}

        {showForgotPassword && (
          <button
            onClick={() => setShowForgotPassword(false)}
            className="mt-4 w-full text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;