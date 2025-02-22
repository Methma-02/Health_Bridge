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
        navigate('/dashboard');
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

      // Log error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Registration error:', error);
      }
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
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