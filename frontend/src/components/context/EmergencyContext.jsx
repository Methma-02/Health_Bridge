import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getActiveEmergencies } from '../services/emergencyService';

const EmergencyContext = createContext();

export const useEmergency = () => useContext(EmergencyContext);

export const EmergencyProvider = ({ children }) => {
  const [activeEmergency, setActiveEmergency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      transports: ['websocket'], // Force WebSocket transport
      withCredentials: true, // Include credentials if needed
    });

    // Log socket connection status
    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    setSocket(socketInstance);

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Check for active emergencies when component mounts
  useEffect(() => {
    const checkActiveEmergency = async () => {
      try {
        setLoading(true);
        const response = await getActiveEmergencies(); // Fetch all active emergencies
        if (response.success && response.data) {
          setActiveEmergency(response.data[0]); // Set the first active emergency (or handle multiple)
          
          // If there's an active emergency, join the socket room
          if (socket && response.data[0]?._id) {
            socket.emit('joinEmergencyRoom', response.data[0]._id);
          }
        }
      } catch (error) {
        console.error('Error checking active emergency:', error);
      } finally {
        setLoading(false);
      }
    };

    checkActiveEmergency();
  }, [socket]);

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleEmergencyStatusUpdate = (data) => {
      if (data.emergencyId === (activeEmergency?._id)) {
        setActiveEmergency(prev => ({
          ...prev,
          ...data.updates
        }));
      }
    };

    const handleEmergencyAccepted = (data) => {
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
    };

    const handleEmergencyCanceled = (data) => {
      if (data.emergencyId === (activeEmergency?._id)) {
        setActiveEmergency(prev => ({
          ...prev,
          status: 'canceled'
        }));
      }
    };

    const handleNewMessage = (data) => {
      setMessages(prev => [...prev, data]);
    };

    // Add event listeners
    socket.on('emergencyStatusUpdate', handleEmergencyStatusUpdate);
    socket.on('emergencyAccepted', handleEmergencyAccepted);
    socket.on('emergencyCanceled', handleEmergencyCanceled);
    socket.on('newMessage', handleNewMessage);

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      socket.off('emergencyStatusUpdate', handleEmergencyStatusUpdate);
      socket.off('emergencyAccepted', handleEmergencyAccepted);
      socket.off('emergencyCanceled', handleEmergencyCanceled);
      socket.off('newMessage', handleNewMessage);
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