import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HeaderFooter/Header';
import Footer from './HeaderFooter/Footer';
import { Heart, Calendar, FileText, Gift, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import './Homepage.css';

const Homepage = () => {
  const servicesRef = useRef(null);
  const servicesContainerRef = useRef(null);
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    { 
      name: 'Pregnancy Form', 
      icon: <FileText size={40} color="#60a5fa" />,
      description: 'Comprehensive digital form for tracking pregnancy progress',
      path: '/pregnancy-form'
    },
    { 
      name: 'Child Health Development Record', 
      icon: <Calendar size={40} color="#60a5fa" />,
      description: 'Detailed health tracking for children',
      path: '/child-health'
    },
    { 
      name: 'Symptom Recorder', 
      icon: <Heart size={40} color="#60a5fa" />,
      description: 'Monitor and log health symptoms easily',
      path: '/symptom-recorder'
    },
    { 
      name: 'Donation Center', 
      icon: <Gift size={40} color="#60a5fa" />,
      description: 'Support maternal and child health initiatives',
      path: '/donation-center'
    },
    { 
      name: 'Emergency Alert', 
      icon: <AlertCircle size={40} color="#f472b6" />,
      description: 'Instant emergency support and notifications',
      path: '/emergency-alert'
    }
  ];

  const scrollLeft = () => {
    if (servicesContainerRef.current) {
      const container = servicesContainerRef.current;
      const cardWidth = container.querySelector('.service-card').offsetWidth;
      const newPosition = Math.max(scrollPosition - cardWidth, 0);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (servicesContainerRef.current) {
      const container = servicesContainerRef.current;
      const cardWidth = container.querySelector('.service-card').offsetWidth;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(scrollPosition + cardWidth, maxScroll);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const handleScroll = () => {
    if (servicesContainerRef.current) {
      setScrollPosition(servicesContainerRef.current.scrollLeft);
    }
  };

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

      {/* Services Section with Carousel Navigation */}
      <section ref={servicesRef} className="services-section">
        <h2>Our Services</h2>
        <div className="services-carousel-container">
          {/* Changed from ChevronLeft to ArrowLeft for consistency with footer buttons */}
          <button 
            className="carousel-nav-button carousel-prev"
            onClick={scrollLeft}
            aria-label="Previous services"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div 
            ref={servicesContainerRef}
            className="services-grid"
            onScroll={handleScroll}
          >
            {services.map((service, index) => (
              <div key={index} className="service-card">
                {service.icon}
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <button onClick={() => navigate(service.path)}>Learn More</button>
              </div>
            ))}
          </div>
          
          {/* Changed from ChevronRight to ArrowRight for consistency with footer buttons */}
          <button 
            className="carousel-nav-button carousel-next"
            onClick={scrollRight}
            aria-label="Next services"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
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