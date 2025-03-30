import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RecoveryContext, RecoveryProvider } from './RecoveryContext';
import axios from 'axios';

// Import components
import FloatingWidget from './components/EmergencyAlert/FloatingWidget';
import EmergencyTracker from './components/EmergencyAlert/EmergencyTracker';
import HospitalChat from './components/EmergencyAlert/HospitalChat';
import EmergencyDemoController from './components/Demo/EmergencyDemoController';
import { EmergencyProvider } from './components/context/EmergencyContext';

import Form2 from "./components/PregnancyPartB/Pregnancy"
import P_Dashboard from "./components/P_Dashboard/P_Dashboard";
import Registration from "./components/RegistrationInformation/RegistrationInformation";
import ClinicCareTables from "./components/ClinicCare/Tables"; 
import PostnatalCare from "./components/PostnatalCare/PostnatalCare";
import Refferal from "./components/Refferal/Refferal";

import Title from './components/Title';
import Dashboard from './components/Dashboard';
import TabNavigation from './components/TabNavigation';
import RequestList from './components/RequestList';
import MyRequests from './components/MyRequests';
import MyDonations from './components/MyDonations';
import Modal from './components/Modal';
import NewRequestForm from './components/NewRequestForm';
import DonationForm from './components/DonationForm';
import RequestDetails from './components/RequestDetails';
import RegistrationModal from './components/RegistrationModal';
import { isUserRegistered, saveUserRegistration, getUserRegistration } from './utils/userStorage';

// Import pages from test/dev
import MDashboard from './mainDash';
import WeightChart from './pages/WeightChart';
import HeightChart from './pages/HeightChart';
import Immunization from './pages/Immunization';
import SensoryScreening from './pages/sensoryScreening';
import DevelopmentMilestones from './pages/developmentMilestones';
import ChildHealthRecord from './pages/childHealthRecord';
import StudentHealthRecords from './pages/studentHealthRecords';
import Referral from './pages/referal';
import LandingPage from './landingPage';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';
import ResetPasswordPage from './ResetPasswordPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import OTPInput from './OTPInput';
import Homepage from './Homepage';
import SymptomTracker from "./text";

import PrivacyPolicy from "./PrivacyPolicy";

import Header from './HeaderFooter/Header';
import Footer from './HeaderFooter/Footer';

// API base URL
const API_URL = import.meta.env.VITE_API_URL;;

// Password Recovery Flow component
function PasswordRecoveryFlow() {
  const { page } = useContext(RecoveryContext);

  return (
    <>
      {page === "forgotPassword" && <ForgotPasswordPage />}
      {page === "otp" && <OTPInput />}
      {page === "resetPassword" && <ResetPasswordPage />}
    </>
  );
}

// Donation Center component
function DonationCenter() {
  // State management for donation center
  const [activeTab, setActiveTab] = useState('active');
  const [requests, setRequests] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [userDonations, setUserDonations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRegistered, setIsRegistered] = useState(isUserRegistered());
  const [registrationNumber, setRegistrationNumber] = useState(getUserRegistration() || '');
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeRequests: 0,
    mothersHelped: 0,
    itemsNeeded: 0
  });

  // Load all requests and stats
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/requests`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchRequests();
    fetchStats();
  }, []);

  // Load user data when registered
  useEffect(() => {
    if (isRegistered && registrationNumber) {
      const fetchUserRequests = async () => {
        try {
          const response = await axios.get(`${API_URL}/requests/user/${registrationNumber}`);
          setUserRequests(response.data);
        } catch (error) {
          console.error('Error fetching user requests:', error);
        }
      };

      const fetchUserDonations = async () => {
        try {
          const response = await axios.get(`${API_URL}/donations/user/${registrationNumber}`);
          setUserDonations(response.data);
        } catch (error) {
          console.error('Error fetching user donations:', error);
        }
      };

      fetchUserRequests();
      fetchUserDonations();
    }
  }, [isRegistered, registrationNumber]);

  // Modal handling functions
  const openModal = (content, request = null) => {
    setModalContent(content);
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setSelectedRequest(null);
  };

  // Registration handling
  const handleRegister = (regNumber) => {
    setRegistrationNumber(regNumber);
    saveUserRegistration(regNumber);
    setIsRegistered(true);
  };

  // Handle user logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out? This will hide your requests and donations until you log back in with your registration number.')) {
      setIsRegistered(false);
      setRegistrationNumber('');
      setUserRequests([]);
      setUserDonations([]);
      localStorage.removeItem('donationCenter_userRegistration');
    }
  };

  // Create new request
  const handleCreateRequest = async (newRequest) => {
    try {
      const requestToCreate = {
        ...newRequest,
        status: 'Active',
        registrationNumber: registrationNumber
      };

      const response = await axios.post(`${API_URL}/requests`, requestToCreate);
      const createdRequest = response.data;

      setUserRequests([createdRequest, ...userRequests]);
      setRequests([createdRequest, ...requests]);

      // Refresh stats
      const statsResponse = await axios.get(`${API_URL}/stats`);
      setStats(statsResponse.data);

      closeModal();
      alert('Your request has been created successfully!');
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create request. Please try again.');
    }
  };

  // Handle donation submission
  const handleDonate = async (donationData) => {
    if (!isRegistered) {
      alert("Please register with your registration number before making a donation.");
      return;
    }

    try {
      const donationToCreate = {
        requestId: selectedRequest._id,
        requestTitle: selectedRequest.title,
        requesterName: selectedRequest.userName,
        requesterEmail: selectedRequest.requesterEmail,
        requesterPhone: selectedRequest.requesterPhone,
        quantity: parseInt(donationData.quantity),
        condition: donationData.condition,
        notes: donationData.notes,
        donorName: donationData.donorName,
        donorEmail: donationData.donorEmail,
        donorPhone: donationData.donorPhone,
        registrationNumber: registrationNumber
      };

      const response = await axios.post(`${API_URL}/donations`, donationToCreate);
      const createdDonation = response.data;

      const requestsResponse = await axios.get(`${API_URL}/requests`);
      setRequests(requestsResponse.data);

      const userRequestsResponse = await axios.get(`${API_URL}/requests/user/${registrationNumber}`);
      setUserRequests(userRequestsResponse.data);

      const userDonationsResponse = await axios.get(`${API_URL}/donations/user/${registrationNumber}`);
      setUserDonations(userDonationsResponse.data);

      const statsResponse = await axios.get(`${API_URL}/stats`);
      setStats(statsResponse.data);

      closeModal();

      alert(`Thank you for your donation! 
        Please contact the requester directly to arrange delivery or pickup:
        Name: ${selectedRequest.userName}
        Email: ${selectedRequest.requesterEmail}
        Phone: ${selectedRequest.requesterPhone}

        Your donation has been recorded in your donation history.`);
    } catch (error) {
      console.error('Error creating donation:', error);
      alert('Failed to submit donation. Please try again.');
    }
  };

 // Complete a request
  const completeRequest = async (requestId) => {
    try {
      await axios.patch(`${API_URL}/requests/${requestId}/status`, { status: 'Fulfilled' });

      // Refresh requests
      const requestsResponse = await axios.get(`${API_URL}/requests`);
      setRequests(requestsResponse.data);

      // Refresh user requests
      const userRequestsResponse = await axios.get(`${API_URL}/requests/user/${registrationNumber}`);
      setUserRequests(userRequestsResponse.data);

      // Refresh stats
      const statsResponse = await axios.get(`${API_URL}/stats`);
      setStats(statsResponse.data);

      alert('Request marked as complete!');
    } catch (error) {
      console.error('Error completing request:', error);
      alert('Failed to mark request as complete. Please try again.');
    }
  };

  // Edit a request
  const editRequest = async (requestId, updatedData) => {
    try {
      const response = await axios.patch(`${API_URL}/requests/${requestId}`, updatedData);
      const updatedRequest = response.data;

      // Refresh requests
      const requestsResponse = await axios.get(`${API_URL}/requests`);
      setRequests(requestsResponse.data);

      // Refresh user requests
      const userRequestsResponse = await axios.get(`${API_URL}/requests/user/${registrationNumber}`);
      setUserRequests(userRequestsResponse.data);

      closeModal();
      alert('Request updated successfully!');
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Failed to update request. Please try again.');
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'active':
        return <RequestList
          requests={requests}
          onViewDetails={(request) => openModal('requestDetails', request)}
          onDonate={(request) => openModal('donate', request)}
        />;
      case 'myRequests':
        return isRegistered ? (
          <MyRequests
            requests={userRequests}
            onEdit={(request) => openModal('editRequest', request)}
            onComplete={completeRequest}
          />
        ) : (
          <div className="not-registered-message">
            <p>Please register to see your requests.</p>
            <button onClick={() => openModal('registration')}>Register</button>
          </div>
        );
      case 'myDonations':
        return isRegistered ? (
          <MyDonations donations={userDonations} />
        ) : (
          <div className="not-registered-message">
            <p>Please register to see your donations.</p>
            <button onClick={() => openModal('registration')}>Register</button>
          </div>
        );
      default:
        return <RequestList requests={requests} />;
    }
  };

  // Render modal content based on selected type
  const renderModalContent = () => {
    switch (modalContent) {
      case 'registration':
        return <RegistrationModal onRegister={handleRegister} />;
      case 'newRequest':
        return <NewRequestForm onSubmit={handleCreateRequest} onCancel={closeModal} />;
      case 'donate':
        return <DonationForm
          request={selectedRequest}
          onSubmit={handleDonate}
          onCancel={closeModal}
        />;
      case 'requestDetails':
        return <RequestDetails
          request={selectedRequest}
          onDonate={() => setModalContent('donate')}
          onClose={closeModal}
        />;
      case 'editRequest':
        return <NewRequestForm
          request={selectedRequest}
          isEditing={true}
          onSubmit={(data) => editRequest(selectedRequest._id, data)}
          onCancel={closeModal}
        />;
      default:
        return null;
    }
  };

  return (
    <>
    <Header />
    <div className="app-container">
      <main className="main-content">
        <Title />

        {/* User registration status */}
        {isRegistered && (
          <div className="user-registration-status">
            <p>Registered with number: {registrationNumber}</p>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}

        <Dashboard stats={stats} />

        <div className="content-container">
          <div className="content-header">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'myRequests' && isRegistered && (
              <button
                className="new-request-button"
                onClick={() => openModal('newRequest')}
              >
                New Request
              </button>
            )}
            {!isRegistered && (
              <button
                className="register-button"
                onClick={() => openModal('registration')}
              >
                Register
              </button>
            )}
          </div>

          {renderContent()}
        </div>

        {/* First-time visitor registration modal */}
        {!isRegistered && !modalOpen && (
          <RegistrationModal onRegister={handleRegister} />
        )}

        {/* Regular modal for other content */}
        {modalOpen && (
          <Modal onClose={closeModal}>
            {renderModalContent()}
          </Modal>
        )}
      </main>
    </div>
    <Footer />
    </>
  );
}
function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RecoveryProvider>
        <EmergencyProvider>
            <Routes>
              {/* Authentication Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/homepage" element={<Homepage />} />

              {/* Password Recovery Routes */}
              <Route path="/forgot-password" element={<PasswordRecoveryFlow />} />
              <Route path="/otp" element={<Navigate to="/forgot-password" />} />
              <Route path="/reset-password" element={<Navigate to="/forgot-password" />} />

              {/* Dashboard */}
              <Route path="/MDashboard" element={<MDashboard />} />

              {/* Pages for Baby and Child */}
              <Route path="/weightChart" element={<WeightChart />} />
              <Route path="/heightChart" element={<HeightChart />} />
              <Route path="/immunization" element={<Immunization />} />
              <Route path="/sensoryScreening" element={<SensoryScreening />} />
              <Route path="/developmentMilestones" element={<DevelopmentMilestones />} />
              <Route path="/childHealthRecord" element={<ChildHealthRecord />} />
              <Route path="/studentHealthRecords" element={<StudentHealthRecords />} />
              <Route path="/referral" element={<Referral />} />

              {/* Pregnancy Care & Clinic */}
              <Route path="/p-dashboard" element={<P_Dashboard />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/clinic-care" element={<ClinicCareTables />} />
              <Route path="/postnatal-care" element={<PostnatalCare />} />
              <Route path="/refferal" element={<Refferal />} />
              <Route path="/PartB" element={<Form2 />} />

              {/* Donation Center Route */}
              <Route path="/donation-center" element={<DonationCenter />} />

              {/* Emergency Routes */}
              <Route path="/e-controller" element={<EmergencyDemoController />} />
              <Route path="/emergency-tracker" element={<EmergencyTracker />} />
              <Route path="/hospital-chat" element={<HospitalChat />} />
              <Route path="/emergency-demo" element={<EmergencyDemoController />} />

              <Route path="/symptom-tracker" element={<SymptomTracker />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
            <FloatingWidget/>
          </EmergencyProvider>
        </RecoveryProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
