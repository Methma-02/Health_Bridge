import { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  
  const toggleSection = (sectionNumber) => {
    setActiveSection(activeSection === sectionNumber ? null : sectionNumber);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last Updated: March 17, 2025</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">At Health Bridge, we prioritize your privacy and data security. This document outlines our commitment to protecting your personal information.</p>
        </div>
      </div>
      
      {/* Table of Contents */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Quick Navigation</h2>
        <ul className="space-y-2">
          <li><a href="#section1" className="text-blue-600 hover:underline">1. Information We Collect</a></li>
          <li><a href="#section2" className="text-blue-600 hover:underline">2. How We Use Your Information</a></li>
          <li><a href="#section3" className="text-blue-600 hover:underline">3. Data Security</a></li>
          <li><a href="#section4" className="text-blue-600 hover:underline">4. Data Sharing & Third-Party Access</a></li>
          <li><a href="#section5" className="text-blue-600 hover:underline">5. Your Rights & Control</a></li>
          <li><a href="#section6" className="text-blue-600 hover:underline">6. Updates to This Policy</a></li>
          <li><a href="#section7" className="text-blue-600 hover:underline">7. Contact Us</a></li>
          <li><a href="#section8" className="text-blue-600 hover:underline">8. Cookies & Local Storage</a></li>
          <li><a href="#section9" className="text-blue-600 hover:underline">9. Children's Privacy</a></li>
        </ul>
      </div>
      
      <div className="mb-6">
        <p>Welcome to <strong>Health Bridge</strong>, a platform designed to digitalize pregnancy forms, child health records, symptom tracking, donation center management, and emergency alerts. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
      </div>
      
      {/* Section 1 */}
      <div id="section1" className="mb-6">
        <button 
          onClick={() => toggleSection(1)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <span>{activeSection === 1 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 1 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-2">We collect and store the following data:</p>
          <ul className="list-disc pl-8 mb-3 space-y-1">
            <li><strong>Pregnancy & Child Health Records:</strong> Information provided by users regarding pregnancy and child health for digital record-keeping.</li>
            <li><strong>Symptom Tracker Data:</strong> Symptoms and their intensity, as entered by users.</li>
            <li><strong>Donation Information:</strong> Details of donations, including donor contact information (if provided voluntarily).</li>
            <li><strong>Emergency Alert Information:</strong> Contact details necessary for alert notifications to hospitals or emergency contacts.</li>
            <li><strong>Account Information:</strong> Email address, name, and password (stored securely).</li>
          </ul>
          <p>We do <strong>not</strong> collect unnecessary personal data beyond what is required for the above features.</p>
        </div>
      </div>
      
      {/* Section 2 */}
      <div id="section2" className="mb-6">
        <button 
          onClick={() => toggleSection(2)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <span>{activeSection === 2 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 2 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-2">Your data is used strictly for the following purposes:</p>
          <ul className="list-disc pl-8 mb-3 space-y-1">
            <li><strong>Pregnancy & Child Health Records:</strong> To help manage medical records efficiently.</li>
            <li><strong>Symptom Tracker:</strong> To analyze and provide insights for better healthcare decisions.</li>
            <li><strong>Donation Center:</strong> To facilitate medical donations and maintain transaction records.</li>
            <li><strong>Emergency Alerts:</strong> To notify hospitals or emergency contacts when an alert is triggered.</li>
          </ul>
          <p>We <strong>do not</strong> sell, share, or use your data for advertising or any purpose beyond these functionalities.</p>
        </div>
      </div>
      
      {/* Section 3 */}
      <div id="section3" className="mb-6">
        <button 
          onClick={() => toggleSection(3)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">3. Data Security</h2>
          <span>{activeSection === 3 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 3 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-3">We implement security measures to protect your information from unauthorized access, loss, or misuse. However, no system is 100% secure. Users are advised to keep their login credentials confidential.</p>
          <p className="mb-3">Our security measures include:</p>
          <ul className="list-disc pl-8 mb-3 space-y-1">
            <li><strong>Encryption:</strong> All sensitive data is encrypted during transmission and storage.</li>
            <li><strong>Access Controls:</strong> Strict access controls limit who can view your information.</li>
            <li><strong>Data Minimization:</strong> We only collect and retain information necessary for our services.</li>
          </ul>
        </div>
      </div>
      
      {/* Section 4 */}
      <div id="section4" className="mb-6">
        <button 
          onClick={() => toggleSection(4)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">4. Data Sharing & Third-Party Access</h2>
          <span>{activeSection === 4 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 4 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-2">We <strong>only</strong> share information when required for:</p>
          <ul className="list-disc pl-8 mb-3 space-y-1">
            <li><strong>Medical Professionals:</strong> When users request healthcare assistance.</li>
            <li><strong>Emergency Services:</strong> If an alert is triggered.</li>
            <li><strong>Legal Compliance:</strong> If required by law or government authorities.</li>
            <li><strong>Service Providers:</strong> Third-party vendors who help us operate our services (with strict data protection agreements).</li>
          </ul>
          <p>We do <strong>not</strong> share data with third-party advertisers or unrelated entities.</p>
        </div>
      </div>
      
      {/* Section 5 */}
      <div id="section5" className="mb-6">
        <button 
          onClick={() => toggleSection(5)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">5. Your Rights & Control</h2>
          <span>{activeSection === 5 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 5 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-2">Users have the right to:</p>
          <ul className="list-disc pl-8 mb-3 space-y-1">
            <li><strong>Access:</strong> Review their stored data.</li>
            <li><strong>Rectification:</strong> Request corrections of their information.</li>
            <li><strong>Deletion:</strong> Request deletion of their information.</li>
            <li><strong>Restriction:</strong> Limit how we use their data.</li>
            <li><strong>Data Portability:</strong> Receive their data in a structured, machine-readable format.</li>
            <li><strong>Objection:</strong> Object to certain types of processing.</li>
          </ul>
          <p>For any requests, please contact <a href="mailto:healthbridge.official25@gmail.com" className="text-blue-600 hover:underline">healthbridge.official25@gmail.com</a>.</p>
        </div>
      </div>
      
      {/* Section 6 */}
      <div id="section6" className="mb-6">
        <button 
          onClick={() => toggleSection(6)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">6. Updates to This Policy</h2>
          <span>{activeSection === 6 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 6 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-3">We may update this policy to comply with new regulations or improve security. Changes will be posted here with a new <strong>Last Updated</strong> date.</p>
          <p className="mb-3">For significant changes, we will notify users via email or through an in-app notification.</p>
          <p>Your continued use of our services after policy changes constitutes acceptance of the updated terms.</p>
        </div>
      </div>
      
      {/* Section 7 */}
      <div id="section7" className="mb-6">
        <button 
          onClick={() => toggleSection(7)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">7. Contact Us</h2>
          <span>{activeSection === 7 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 7 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-3">For questions regarding this Privacy Policy, reach out to <a href="mailto:healthbridge.official25@gmail.com" className="text-blue-600 hover:underline">healthbridge.official25@gmail.com</a>.</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>Email: <a href="mailto:healthbridge.official25@gmail.com" className="text-blue-600 hover:underline">healthbridge.official25@gmail.com</a></p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
      </div>
      
      {/* Section 8 - New */}
      <div id="section8" className="mb-6">
        <button 
          onClick={() => toggleSection(8)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">8.Local Storage</h2>
          <span>{activeSection === 8 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 8 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-3">We use local storage for the following purposes:</p>
          <ul className="list-disc pl-8 mb-3 space-y-1">
            <li><strong>Essential:</strong> Required for the application to function properly.</li>
            <li><strong>Functional:</strong> Remember your preferences and settings.</li>
            <li><strong>Analytics:</strong> Help us understand how users interact with our platform.</li>
          </ul>
          <p className="mb-3">You can manage preferences through your browser settings. Disabling certain parts may affect functionality.</p>
        </div>
      </div>
      
           {/* Section 9 - New */}
           <div id="section9" className="mb-6">
        <button 
          onClick={() => toggleSection(9)} 
          className="w-full flex justify-between items-center text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
        >
          <h2 className="text-xl font-semibold">9. Children's Privacy</h2>
          <span>{activeSection === 9 ? '−' : '+'}</span>
        </button>
        
        <div className={`mt-3 pl-4 transition-all duration-300 ${activeSection === 9 ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <p className="mb-3">We do not knowingly collect or store personal information from children under 13 without parental consent.</p>
          <p className="mb-3">If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to delete such information promptly.</p>
        </div>
      </div>
      
      
      {/* Closing Statement */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Thank you for trusting Health Bridge with your personal information. We are committed to protecting your privacy and ensuring the security of your data. If you have any questions or concerns, please do not hesitate to contact us.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;