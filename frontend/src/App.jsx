import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmergencyProvider } from './components/context/EmergencyContext';
import FloatingWidget from './components/EmergencyAlert/FloatingWidget';
import { initializeOneSignal } from './components/services/notificationService';
import EmergencyForm from './components/EmergencyAlert/EmergencyForm'; 
import EmergencyTracker from './components/EmergencyAlert/EmergencyTracker'; 
import HospitalChat from './components/EmergencyAlert/HospitalChat';
import './emergency-alert-system.css';

const App = () => {
  const [notificationsInitialized, setNotificationsInitialized] = useState(false);

  useEffect(() => {
    // Only initialize OneSignal once
    if (!notificationsInitialized) {
      const setupNotifications = async () => {
        try {
          await initializeOneSignal();
          setNotificationsInitialized(true);
        } catch (error) {
          console.error("Failed to initialize notifications:", error);
        }
      };
      
      setupNotifications();
    }
  }, [notificationsInitialized]);

  return (
    <BrowserRouter>
      <EmergencyProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<EmergencyForm />}/>
            <Route path="/emergency-form" element={<EmergencyForm />} />
            <Route path="/emergency-tracker" element={<EmergencyTracker />} />
            <Route path="/hospital-chat" element={<HospitalChat />} />
          </Routes>
          
          {/* Emergency Alert Widget - visible on all pages */}
          <FloatingWidget />
        </div>
      </EmergencyProvider>
    </BrowserRouter>
  );
};

export default App;