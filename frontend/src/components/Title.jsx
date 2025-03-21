// src/components/Tile.jsx
import React from 'react';
import { getUserRegistration } from '../utils/userStorage';

function Title() {
  const registrationNumber = getUserRegistration();
  
  return (
    <header className="header">
      <div className="logo">
        <h1>Donation Center</h1>
        <p>Connecting mothers in need with generous donors</p>
      </div>
      {registrationNumber && (
        <div className="user-info">
          <span>Registration: {registrationNumber}</span>
        </div>
      )}
    </header>
  );
}

export default Title;