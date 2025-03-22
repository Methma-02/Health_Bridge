import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Linkedin, Instagram, ArrowUp, ArrowDown } from "lucide-react";
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="scroll-buttons">
          <button onClick={scrollToTop} className="scroll-button scroll-top">
            <ArrowUp className="h-6 w-6" />
          </button>
          <button onClick={scrollToBottom} className="scroll-button scroll-bottom">
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
        
        <div className="footer-content">
          <div className="footer-column">
            <h3>Contact Us</h3>
            <div className="footer-links">
              <a href="mailto:healthbridge.official25@gmail.com" className="footer-link">
                <Mail className="footer-icon" />
                <span>healthbridge.official25@gmail.com</span>
              </a>
              <a href="tel:+94743715955" className="footer-link">
                <Phone className="footer-icon" />
                <span>+94 74 371 5955</span>
              </a>
              <a href="tel:+94710780371" className="footer-link">
                <Phone className="footer-icon" />
                <span>+94 71 078 0371</span>
              </a>
            </div>
          </div>
          
          <div className="footer-column center-column">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/share/15fPLQWJUw/" target="_blank" rel="noopener noreferrer">
                <Facebook />
              </a>
              <a href="https://www.linkedin.com/company/healthbridgeoffical/" target="_blank" rel="noopener noreferrer">
                <Linkedin />
              </a>
              <a href="https://www.instagram.com/healthbridge2025/?hl=en" target="_blank" rel="noopener noreferrer">
                <Instagram />
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <a href="https://youtu.be/your-unlisted-video-id" className="quick-link" target="_blank" rel="noopener noreferrer">How To Use</a>
              <a href="https://healthbridgemarketing.netlify.app/" className="quick-link" target="_blank" rel="noopener noreferrer">Marketing Website</a>
              <Link to="/privacy-policy" className="quick-link">Privacy Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Health Bridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;