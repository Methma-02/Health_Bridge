import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      
      // Add or remove body class based on scroll state
      if (isScrolled) {
        document.body.classList.add('header-scrolled');
      } else {
        document.body.classList.remove('header-scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page loads scrolled
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('header-scrolled');
    };
  }, []);

  // Close menu when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [location.pathname]);

  // Toggle menu and manage body scroll
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  return (
    <header className={`health-bridge-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/homepage" className="logo-link" aria-label="Health Bridge Home">
            <img src="/src/HeaderFooter/1.png" alt="" className="logo-image" />
            <span className="logo-text">Health Bridge</span>
          </Link>
        </div>
        
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="nav-links">
            <Link to="/p-dashboard" className="nav-item">Mother's Dashboard</Link>
            <Link to="/Mdashboard" className="nav-item">Child's Dashboard</Link>
            <Link to="/symptom-recorder" className="nav-item">Symptom Recorder</Link>
            <Link to="/donation-center" className="nav-item">Donation Center</Link>
            <Link to="/emergency-demo" className="nav-item emergency-link">
              <AlertCircle size={16} />
              <span>Emergency Alert</span>
            </Link>
          </div>
        </nav>

        {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
      </div>
    </header>
  );
};

export default Header;