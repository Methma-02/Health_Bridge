import React, { useState, useEffect, useRef } from 'react';
import { useEmergency } from '../context/EmergencyContext';

const HospitalChat = ({ emergencyId }) => {
  const { messages, sendMessage } = useEmergency();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="hospital-chat">
      <div className="hospital-chat-header">
        <h3 className="hospital-chat-title">Hospital Communication</h3>
      </div>
      
      <div className="hospital-chat-messages">
        {messages.length === 0 ? (
          <div className="hospital-chat-empty">
            <p>No messages yet</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`hospital-chat-message ${
                msg.sender === 'user' ? 'hospital-chat-message-user' : 'hospital-chat-message-hospital'
              }`}
            >
              <div 
                className={`hospital-chat-bubble ${
                  msg.sender === 'user' 
                    ? 'hospital-chat-bubble-user' 
                    : 'hospital-chat-bubble-hospital'
                }`}
              >
                <p className="hospital-chat-text">{msg.message}</p>
                <p className="hospital-chat-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="hospital-chat-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="hospital-chat-input"
        />
        <button
          type="submit"
          className="hospital-chat-submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default HospitalChat;