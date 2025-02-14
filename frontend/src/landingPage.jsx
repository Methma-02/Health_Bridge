import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col justify-center items-center px-4">
      {/* Container for content */}
      <div className="max-w-3xl text-center">
        {/* Welcome Heading */}
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6">
          🩺 Welcome to <span className="text-blue-600">Health Bridge</span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl font-semibold text-gray-700 mb-4">
          Bridging the Gap in Maternal & Child Healthcare
        </p>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          At <span className="font-bold text-blue-700">Health Bridge</span>, we believe every mother and child deserves seamless, secure, and accessible healthcare.  
          Our platform <b>digitizes pregnancy health records and child development tracking</b>, ensuring that mothers, healthcare providers, and medical officers stay connected for better health outcomes.
        </p>

        {/* Key Values */}
        <div className="flex justify-center space-x-6 text-lg font-semibold text-blue-700 mb-10">
          <span className="flex items-center space-x-2">
            🔹 <span>Secure</span>
          </span>
          <span className="flex items-center space-x-2">
            🔹 <span>Accessible</span>
          </span>
          <span className="flex items-center space-x-2">
            🔹 <span>Connected</span>
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => onNavigate("login")}
            className="px-8 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => onNavigate("register")}
            className="px-8 py-3 text-lg font-medium bg-white text-blue-600 border-2 border-blue-600 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-20 flex space-x-10">
        <a
          href="https://www.linkedin.com/company/healthbridgeoffical/?viewAsMember=true" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 text-5xl transition-all"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/healthbridge2025?igsh=a2hzNm44bXJ3dzN4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-800 text-5xl transition-all"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/share/15fPLQWJUw/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-5xl transition-all"
        >
          <FaFacebook />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
