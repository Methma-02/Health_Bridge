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
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const submitErrors = {};

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      submitErrors.password = passwordValidation.errors;
    }

    // Other validations
    if (!formData.fullName.trim()) {
      submitErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      submitErrors.email = "Valid email is required";
    }

    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      submitErrors.phone = "Valid 10-digit phone number is required";
    }

    if (formData.password !== formData.confirmPassword) {
      submitErrors.confirmPassword = "Passwords do not match";
    }

    // Role-specific validations
    if (formData.role === 'mother') {
      if (!formData.mohDivision) {
        submitErrors.mohDivision = "MOH Division is required for mothers";
      }
    }

    if (['physician', 'nurse', 'midwife'].includes(formData.role)) {
      if (!formData.governmentRegNumber) {
        submitErrors.governmentRegNumber = "Government registration number is required";
      }
      if (!formData.workPlace) {
        submitErrors.workPlace = "Work place is required";
      }
    }

    if (formData.role === 'phm') {
      if (!formData.mohDivision) {
        submitErrors.mohDivision = "MOH Division is required for Public Health Midwife";
      }
      if (!formData.governmentRegNumber) {
        submitErrors.governmentRegNumber = "Government registration number is required";
      }
    }

    // If there are errors, stop submission
    if (Object.keys(submitErrors).length > 0) {
      setErrors(submitErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Sanitize password before submission
      const sanitizedPassword = formData.password.replace(/[^a-zA-Z0-9]/g, '');
      const sanitizedFormData = {
        ...formData,
        password: sanitizedPassword
      };

      const { token } = await api.register(sanitizedFormData);
      login(token);
      navigate('/dashboard');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || 'Registration failed. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            >
              <option value="">Select Role</option>
              <option value="mother">Mother</option>
              <option value="physician">Physician</option>
              <option value="nurse">Nurse</option>
              <option value="midwife">Midwife</option>
              <option value="phm">Public Health Midwife</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          {/* Common Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Password Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
            {errors.password && errors.password.map((error, index) => (
              <p key={index} className="text-red-500 text-sm">{error}</p>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Conditional Fields */}
          {(formData.role === 'mother' || formData.role === 'phm') && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                MOH Division
              </label>
              <input
                type="text"
                name="mohDivision"
                value={formData.mohDivision}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                required
              />
              {errors.mohDivision && <p className="text-red-500 text-sm">{errors.mohDivision}</p>}
            </div>
          )}

          {['physician', 'nurse', 'midwife'].includes(formData.role) && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Place
              </label>
              <input
                type="text"
                name="workPlace"
                value={formData.workPlace}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                required
              />
              {errors.workPlace && <p className="text-red-500 text-sm">{errors.workPlace}</p>}
            </div>
          )}

          {['physician', 'nurse', 'midwife', 'phm'].includes(formData.role) && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Government Registration Number
              </label>
              <input
                type="text"
                name="governmentRegNumber"
                value={formData.governmentRegNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                required
              />
              {errors.governmentRegNumber && <p className="text-red-500 text-sm">{errors.governmentRegNumber}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;