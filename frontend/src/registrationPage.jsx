import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import * as api from './api';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    mohDivision: '',
    governmentRegNumber: '',
    workPlace: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    let strength = 0;
  
    if (!password) {
      errors.push("Password is required");
      return { isValid: false, errors, strength: 0 };
    }
  
    const requirements = [
      {
        test: password.length < 8,
        message: "Password must be at least 8 characters long",
        strengthValue: 1
      },
      {
        test: !/[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter",
        strengthValue: 1
      },
      {
        test: !/[a-z]/.test(password),
        message: "Password must contain at least one lowercase letter",
        strengthValue: 1
      },
      {
        test: !/[0-9]/.test(password),
        message: "Password must contain at least one number",
        strengthValue: 1
      },
      {
        test: !/[!@#$%^&*(),.?":{}|<>]/.test(password),
        message: "Password must contain at least one special character",
        strengthValue: 1
      }
    ];
  
    requirements.forEach(({ test, message, strengthValue }) => {
      if (test) {
        errors.push(message);
      } else {
        strength += strengthValue;
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors,
      strength
    };
  };

  // Form validation function
  const validateForm = (data) => {
    const errors = {};

    // Required fields validation
    if (!data.role) {
      errors.role = "Please select a role";
    }

    if (!data.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    // Password validation
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors;
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Role-specific validations
    if (data.role === 'mother' || data.role === 'phm') {
      if (!data.mohDivision?.trim()) {
        errors.mohDivision = "MOH Division is required";
      }
    }

    if (['physician', 'nurse', 'midwife', 'phm'].includes(data.role)) {
      if (!data.governmentRegNumber?.trim()) {
        errors.governmentRegNumber = "Government registration number is required";
      }
    }

    if (['physician', 'nurse', 'midwife'].includes(data.role)) {
      if (!data.workPlace?.trim()) {
        errors.workPlace = "Work place is required";
      }
    }

    return errors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear the specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Special handling for password
    if (name === 'password') {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        setErrors(prev => ({
          ...prev,
          password: passwordValidation.errors
        }));
      }
      setPasswordStrength(passwordValidation.strength);
    }

    // Check password match when confirming password
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: "Passwords do not match"
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});  // Clear previous errors

    try {
      // Validate form data
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }

      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;

      const response = await api.register(registrationData);

      if (response.token) {
        login(response.token);
        navigate('/homepage');
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      // Handle specific error cases
      if (error.status === 409) {
        setErrors({ email: 'This email is already registered' });
      } else if (error.status === 400 && error.data?.errors) {
        setErrors(error.data.errors);
      } else {
        setErrors({
          submit: error.message || 'Registration failed. Please try again.'
        });
      }
      
      console.error('Registration error:', error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get strength indicator color based on password strength
  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Get strength indicator label
  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  // Get input element style based on error state
  const getInputStyle = (fieldName) => {
    const baseStyle = "mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500";
    return errors[fieldName] 
      ? `${baseStyle} border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500` 
      : `${baseStyle} border-gray-300`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">Create an Account</h2>
        <p className="text-center text-gray-600 mb-6">Join our healthcare platform today</p>
        
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={getInputStyle('role')}
              required
            >
              <option value="">Select your role</option>
              <option value="mother">Mother</option>
              <option value="physician">Physician</option>
              <option value="nurse">Nurse</option>
              <option value="midwife">Midwife</option>
              <option value="phm">Public Health Midwife</option>
            </select>
            {errors.role && <p className="mt-1 text-red-600 text-sm">{errors.role}</p>}
          </div>

          {/* Personal Information Section */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-3">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={getInputStyle('fullName')}
                  placeholder="Enter your full name"
                  required
                />
                {errors.fullName && <p className="mt-1 text-red-600 text-sm">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputStyle('email')}
                  placeholder="your.email@example.com"
                  required
                />
                {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={getInputStyle('phone')}
                  placeholder="10-digit phone number"
                  required
                />
                {errors.phone && <p className="mt-1 text-red-600 text-sm">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-3">Create Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={getInputStyle('password')}
                  required
                />
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Password Strength:</span>
                      <span className="text-xs font-medium">{getStrengthLabel()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full ${getStrengthColor()}`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {errors.password && errors.password.map((error, index) => (
                  <p key={index} className="mt-1 text-red-600 text-sm">{error}</p>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={getInputStyle('confirmPassword')}
                  required
                />
                {errors.confirmPassword && <p className="mt-1 text-red-600 text-sm">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Conditional Fields */}
          {(formData.role === 'mother' || formData.role === 'phm' || 
            ['physician', 'nurse', 'midwife'].includes(formData.role)) && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-md font-medium text-gray-700 mb-3">Additional Information</h3>
              <div className="space-y-4">
                {(formData.role === 'mother' || formData.role === 'phm') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      MOH Division <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="mohDivision"
                      value={formData.mohDivision}
                      onChange={handleChange}
                      className={getInputStyle('mohDivision')}
                      placeholder="Enter your MOH division"
                      required
                    />
                    {errors.mohDivision && <p className="mt-1 text-red-600 text-sm">{errors.mohDivision}</p>}
                  </div>
                )}

                {['physician', 'nurse', 'midwife'].includes(formData.role) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Work Place <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="workPlace"
                      value={formData.workPlace}
                      onChange={handleChange}
                      className={getInputStyle('workPlace')}
                      placeholder="Enter your work place"
                      required
                    />
                    {errors.workPlace && <p className="mt-1 text-red-600 text-sm">{errors.workPlace}</p>}
                  </div>
                )}

                {['physician', 'nurse', 'midwife', 'phm'].includes(formData.role) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Government Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="governmentRegNumber"
                      value={formData.governmentRegNumber}
                      onChange={handleChange}
                      className={getInputStyle('governmentRegNumber')}
                      placeholder="Enter your registration number"
                      required
                    />
                    {errors.governmentRegNumber && <p className="mt-1 text-red-600 text-sm">{errors.governmentRegNumber}</p>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                      bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                      transition-colors disabled:bg-indigo-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
