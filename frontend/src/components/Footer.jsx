import React from 'react';
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
      <div className="container mx-auto footer-container">
        <div className="scroll-buttons">
          <button onClick={scrollToTop} className="scroll-button scroll-top">
            <ArrowUp className="h-6 w-6" />
          </button>
          <button onClick={scrollToBottom} className="scroll-button scroll-bottom">
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
        
        {/* Footer layout in columns */}
        <div className="footer-columns">
          <div className="footer-column">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <div className="space-y-2">
              <a href="mailto:info@healthbridge.lk" className="footer-link">
                <Mail className="footer-icon" />
                info@healthbridge.lk
              </a>
              <p> </p>
              <a href="tel:+94112345678" className="footer-link">
                <Phone className="footer-icon" />
                +94 11 234 5678
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="footer-social">
              <a href="#" className="footer-link"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="footer-link"><Linkedin className="h-6 w-6" /></a>
              <a href="#" className="footer-link"><Instagram className="h-6 w-6" /></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <div className="space-y-2">
              <a href="/about" className="footer-link">How To Use</a>
              <a href="/marketing" className="footer-link">Marketing Website</a>
              <a href="/privacy" className="footer-link">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        {/* Centered copyright text */}
        <div className="footer-divider text-center">
          <p>&copy; {new Date().getFullYear()} Health Bridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;