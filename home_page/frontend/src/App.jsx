import React from 'react';
import { 
  Baby, 
  Stethoscope, 
  HandHeart, 
  Bell, 
  Mail, 
  Phone, 
  User,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="header">
        <div className="container mx-auto header-container">
          <div className="flex items-center justify-between">
            <div className="logo-container">
              <img src="src/assets/1.png" alt="Health Bridge Logo" className="logo-image" />
              <span className="logo-text">Health Bridge</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/mother" className="nav-link">Pregnancy Form</a>
              <a href="/child" className="nav-link">Child Health Development Record</a>
              <a href="/symptoms" className="nav-link">Symptom Recorder</a>
              <a href="/donate" className="nav-link">Donation Center</a>
              <a href="/emergency" className="nav-link">Emergency Alert</a>
              <a href="/profile" className="nav-link">
                <User className="h-6 w-6" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container mx-auto px-4 hero-content">
          <h1 className="hero-title">A Digital Bridge to Safer Motherhood</h1>
          <p className="hero-description">
            Empowering mothers and children in Sri Lanka with digital healthcare solutions for a healthier tomorrow.
          </p>
        </div>
      </section>

      <section className="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: User, title: "Pregnancy Form", desc: "Track your pregnancy journey with digital records and personalized care.", link: "/mother" },
              { icon: Baby, title: "Child Health Development Record", desc: "Monitor your child's growth and development milestones.", link: "/child" },
              { icon: Stethoscope, title: "Symptom Recorder", desc: "Record and track health symptoms for better medical care.", link: "/symptoms" },
              { icon: HandHeart, title: "Donation Center", desc: "Support mothers and children in need through our donation platform.", link: "/donate" },
              { icon: Bell, title: "Emergency Alert", desc: "Quick access to emergency services when you need them most.", link: "/emergency" },
            ].map((service, index) => (
              <div key={index} className="service-card">
                <service.icon className="service-icon" />
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.desc}</p>
                <a href={service.link} className="service-link">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="heritage">
        <div className="container mx-auto px-4">
          <div className="heritage-container">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Proudly Serving Sri Lanka</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bringing together traditional Sri Lankan healthcare wisdom with modern digital solutions 
              to create a brighter future for mothers and children across the island.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container mx-auto footer-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <a href="mailto:info@healthbridge.lk" className="footer-link">
                  <Mail className="footer-icon" />
                  info@healthbridge.lk
                </a>
                <a href="tel:+94112345678" className="footer-link">
                  <Phone className="footer-icon" />
                  +94 11 234 5678
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="footer-social">
                <a href="#" className="footer-link"><Facebook className="h-6 w-6" /></a>
                <a href="#" className="footer-link"><Linkedin className="h-6 w-6" /></a>
                <a href="#" className="footer-link"><Instagram className="h-6 w-6" /></a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/about" className="footer-link">How To Use</a>
                <a href="/marketing" className="footer-link">Marketing Website</a>
                <a href="/privacy" className="footer-link">Privacy Policy</a>
              </div>
            </div>
          </div>
          
          <div className="footer-divider text-center">
            <p>&copy; {new Date().getFullYear()} Health Bridge. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className="scroll-button scroll-top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>

      <button
        onClick={scrollToBottom}
        className="scroll-button scroll-bottom"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </div>
  );
};

export default HomePage;