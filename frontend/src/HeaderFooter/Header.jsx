import React, { useState } from 'react';
import { 
  User, 
  AlertCircle
} from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="health-bridge-header">
      <div className="logo-container">
        <a href="/" className="logo-link">
          <img src="src/HeaderFooter/1.png" alt="Health Bridge Logo" className="logo-image" />
          <span className="logo-text">Health Bridge</span>
        </a>
      </div>
      
      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AlertCircle />
        </button>
        
        <div className="nav-links">
          <a href="/mothers-dashboard">Mother's Dashboard</a>
          <a href="/childrens-dashboard">Child's Dashboard</a>
          <a href="/symptom-recorder">Symptom Recorder</a>
          <a href="/donation-center">Donation Center</a>
          <a href="/emergency-alert" className="emergency-link">
            Emergency Alert
          </a>
          <a href="/profile" className="profile-link">
            <User />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;