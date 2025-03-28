import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AlertCircle, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [headerHeight, setHeaderHeight] = useState(64);

  // Handle scroll effect for header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      
      // Update header height based on scroll state
      setHeaderHeight(isScrolled ? 50 : 64);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page loads scrolled
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <>
      <header className={`health-bridge-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo-container">
            <NavLink to="/homepage" className="logo-link" aria-label="Health Bridge Home">
              <img src="/src/HeaderFooter/1.png" alt="" className="logo-image" />
              <span className="logo-text">Health Bridge</span>
            </NavLink>
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
              <NavLink 
                to="/p-dashboard" 
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                Mother's Dashboard
              </NavLink>
              <NavLink 
                to="/Mdashboard" 
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                Child's Dashboard
              </NavLink>
              <NavLink 
                to="/symptom-tracker" 
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                Symptom Recorder
              </NavLink>
              <NavLink 
                to="/donation-center" 
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                Donation Center
              </NavLink>
              <NavLink 
                to="/emergency-demo" 
                className={({ isActive }) => 
                  `nav-item emergency-link ${isActive ? 'active' : ''}`
                }
              >
                <AlertCircle size={16} />
                <span>Emergency Alert</span>
              </NavLink>
            </div>
          </nav>

          {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </div>
      </header>
      
      <div className="header-spacer" style={{ height: `${headerHeight}px` }}></div>
    </>
  );
};

export default Header;