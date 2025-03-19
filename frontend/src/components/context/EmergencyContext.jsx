// frontend/src/contexts/EmergencyContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getUserActiveEmergency } from '../services/emergencyService';

const EmergencyContext = createContext();

export const useEmergency = () => useContext(EmergencyContext);

export const EmergencyProvider = ({ children, userId }) => {
  const [activeEmergency, setActiveEmergency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_API_URL || 'http://localhost:3000');
    setSocket(socketInstance);

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, []);

  // Check for active emergencies when component mounts
  useEffect(() => {
    if (!userId) return;

    const checkActiveEmergency = async () => {
      try {
        setLoading(true);
        const response = await getUserActiveEmergency(userId);
        if (response.success && response.data) {
          setActiveEmergency(response.data);
          
          // If there's an active emergency, join the socket room
          if (socket && response.data._id) {
            socket.emit('joinEmergencyRoom', response.data._id);
          }
        }
      } catch (error) {
        console.error('Error checking active emergency:', error);
      } finally {
        setLoading(false);
      }
    };

    checkActiveEmergency();
  }, [userId, socket]);

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('emergencyStatusUpdate', (data) => {
      if (data.emergencyId === (activeEmergency?._id)) {
        setActiveEmergency(prev => ({
          ...prev,
          ...data.updates
        }));
      }
    });

    socket.on('emergencyAccepted', (data) => {
      if (data.emergencyId === (activeEmergency?._id)) {
        setActiveEmergency(prev => ({
          ...prev,
          status: 'accepted',
          acceptedBy: {
            _id: data.hospitalId,
            name: data.hospitalName
          }
        }));
      }
    });

    socket.on('emergencyCanceled', (data) => {
      if (data.emergencyId === (activeEmergency?._id)) {
        setActiveEmergency(prev => ({
          ...prev,
          status: 'canceled'
        }));
      }
    });

    socket.on('newMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('emergencyStatusUpdate');
      socket.off('emergencyAccepted');
      socket.off('emergencyCanceled');
      socket.off('newMessage');
    };
  }, [socket, activeEmergency]);

  const sendMessage = (message) => {
    if (!socket || !activeEmergency) return;
    
    socket.emit('sendMessage', {
      emergencyId: activeEmergency._id,
      sender: 'user',
      message
    });
  };

  const value = {
    activeEmergency,
    setActiveEmergency,
    loading,
    messages,
    sendMessage
  };

  return (
    <EmergencyContext.Provider value={value}>
      {children}
    </EmergencyContext.Provider>
  );
};