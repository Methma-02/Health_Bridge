import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HeaderFooter/Header';
import Footer from './HeaderFooter/Footer';
import { Heart, Calendar, FileText, Gift, AlertCircle, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import './Homepage.css';

const Homepage = () => {
  const servicesRef = useRef(null);
  const missionRef = useRef(null);
  const aboutRef = useRef(null);
  const howItWorksRef = useRef(null);
  const servicesContainerRef = useRef(null);
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to scroll to top and bottom of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pass scroll functions to Footer
  useEffect(() => {
    // Make the scroll functions globally accessible for the Footer component
    window.scrollToTop = scrollToTop;
    window.scrollToBottom = scrollToBottom;
    
    // Cleanup on unmount
    return () => {
      delete window.scrollToTop;
      delete window.scrollToBottom;
    };
  }, []);

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

  const steps = [
    {
      title: "Register & Create Your Profile",
      description: "Sign up with your details to create a secure profile. Whether you're a mother or a healthcare professional, Health Bridge customizes your experience based on your role.",
      icon: "📝"
    },
    {
      title: "Log & Monitor Your Health",
      description: "Mothers can log symptoms, track their severity with an easy slider, and note the time of occurrence (morning, afternoon, evening, night).",
      icon: "📊"
    },
    {
      title: "Access & Update Health Records",
      description: "Doctors, nurses, and midwives can securely access and update patient records, ensuring seamless care and informed medical decisions.",
      icon: "👩‍⚕️"
    },
    {
      title: "Get Alerts & Emergency Support",
      description: "In case of urgent health concerns, mothers can send emergency alerts for quick medical assistance.",
      icon: "🚨"
    },
    {
      title: "Explore Additional Features",
      description: "Support the community through the Donation Center or access valuable maternal health resources.",
      icon: "🎁"
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
          <div className="hero-buttons">
            <button 
              className="cta-button primary-button"
              onClick={() => scrollToSection(servicesRef)}
            >
              Get Started
            </button>
            <button 
              className="cta-button secondary-button"
              onClick={() => scrollToSection(missionRef)}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section ref={missionRef} className="mission-vision-section">
        <div className="container">
          <div className="mission-box">
            <h2>Our Mission</h2>
            <p>
              To revolutionize maternal and child healthcare in Sri Lanka by providing a secure, digital platform that empowers mothers, doctors, and healthcare professionals with real-time access to essential health records, symptom tracking, and emergency support—ensuring a healthier future for every mother and child.
            </p>
          </div>
          <div className="vision-box">
            <h2>Our Vision</h2>
            <p>
              A future where every mother and child in Sri Lanka receives seamless, technology-driven healthcare support, eliminating the challenges of manual records and ensuring timely, informed medical care for all.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section with Carousel Navigation */}
      <section ref={servicesRef} className="services-section">
        <h2>Our Services</h2>
        <div className="services-carousel-container">
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
          
          <button 
            className="carousel-nav-button carousel-next"
            onClick={scrollRight}
            aria-label="Next services"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="about-section">
  <div className="container">
    <h2>About Us</h2>
    <h3>Health Bridge: Connecting Mothers & Healthcare for a Healthier Future</h3>
    
    <div className="about-content">
      <div className="about-text">
        <p>
          At Health Bridge, we believe that every mother and child deserve access to seamless, technology-driven healthcare. Our platform was created to <strong>digitize maternal and child health records in Sri Lanka</strong>, ensuring that mothers, doctors, and healthcare professionals can easily track, update, and manage essential medical information.
        </p>
        
        <p>
          Traditionally, pregnancy and child health records have been maintained on paper, making them difficult to store, update, and access. <strong>Health Bridge eliminates these challenges</strong> by providing a secure, digital platform where:
        </p>
        
        <div className="benefits-list">
          <div className="benefit-item">
            <div className="benefit-icon">
              <Check size={18} color="white" />
            </div>
            <p><strong>Mothers</strong> can log symptoms, track their health, and stay informed.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <Check size={18} color="white" />
            </div>
            <p><strong>Doctors and healthcare professionals</strong> can access patient records in real-time for better decision-making.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">
              <Check size={18} color="white" />
            </div>
            <p><strong>Emergency alerts and donation support</strong> ensure timely assistance when needed.</p>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="how-it-works-section">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h3>Step {index + 1}: {step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="centered-text highlight-text">
            <em>Health Bridge makes maternal and child healthcare simple, accessible, and secure.</em> <strong>Start your journey today!</strong>
          </p>
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