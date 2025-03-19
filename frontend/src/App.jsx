// frontend/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmergencyProvider } from './components/context/EmergencyContext';
import FloatingWidget from './components/EmergencyAlert/FloatingWidget';
import { initializeOneSignal, setUserExternalId } from './components/services/notificationService';
import EmergencyForm from './components/EmergencyAlert/EnergencyForm';
import EmergencyTracker from './components/EmergencyAlert/EmergencyTracker';
import HospitalChat from './components/EmergencyAlert/HospitalChat';
//import { useAuth } from './components/context/AuthContext';

const App = () => {
  
  const userId = 'user123'; // Replace with actual user ID
  //const { user } = useAuth();

  useEffect(() => {
    // Initialize OneSignal when the app loads
    initializeOneSignal();
    
    // Set user ID for OneSignal
    if (userId) {
      setUserExternalId(userId);
    }
  }, [userId]);

  return (
    <BrowserRouter>
      <EmergencyProvider userId={userId}>
        <div className="App">
          <Routes>
            {/* Your existing routes */}
            <Route path="/" element={<YourExistingComponents />} />
            {/* Other routes */}
          </Routes>
          
          {/* Emergency Alert Widget - visible on all pages */}
          <FloatingWidget userId={userId} />
        </div>
      </EmergencyProvider>
    </BrowserRouter>
  );
};

export default App;