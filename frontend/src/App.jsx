import React, { useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Heart, Calendar, FileText, Gift, AlertCircle } from 'lucide-react';
import './Homepage.css';

const Homepage = () => {
  const servicesRef = useRef(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    { 
      name: 'Pregnancy Form', 
      icon: <FileText size={40} color="#60a5fa" />,
      description: 'Comprehensive digital form for tracking pregnancy progress'
    },
    { 
      name: 'Child Health Development Record', 
      icon: <Calendar size={40} color="#60a5fa" />,
      description: 'Detailed health tracking for children'
    },
    { 
      name: 'Symptom Recorder', 
      icon: <Heart size={40} color="#60a5fa" />,
      description: 'Monitor and log health symptoms easily'
    },
    { 
      name: 'Donation Center', 
      icon: <Gift size={40} color="#60a5fa" />,
      description: 'Support maternal and child health initiatives'
    },
    { 
      name: 'Emergency Alert', 
      icon: <AlertCircle size={40} color="#f472b6" />,
      description: 'Instant emergency support and notifications'
    }
  ];

  return (
    <div className="health-bridge-homepage">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>A Digital Bridge to Safer Motherhood</h2>
          <p>
            Empowering mothers and children in Sri Lanka with digital healthcare solutions for a healthier tomorrow.
          </p>
          <button 
            className="cta-button"
            onClick={scrollToServices}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              {service.icon}
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <button>Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Sri Lanka Section */}
      <section className="sri-lanka-section">
        <h2>Proudly Serving Sri Lanka</h2>
        <p>
          Bringing together traditional Sri Lankan healthcare wisdom with modern 
          digital solutions to create a brighter future for mothers and children 
          across the island.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;