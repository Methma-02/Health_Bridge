import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

// Import images
import landingPage2 from "./images/landingPage2.png";
import logo from "./images/logo.png";
import landingPageVideo from "./videos/logingPage.mp4";
import landingPage from "./images/landingPage3.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const [hoverButton, setHoverButton] = useState(null);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Animation for page transition when navigating
  const handleNavigation = (route) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      onComplete: () => navigate(route)
    });
  };

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Staggered animation for all content elements
    const elements = contentRef.current.children;
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        stagger: 0.15,
        ease: "power2.out"
      }
    );

    return () => {
      gsap.killTweensOf(headerRef.current);
      gsap.killTweensOf(elements);
    };
  }, []);

  const features = [
    {
      title: "Digital Health Records",
      description: "No more lost files or outdated data. Access your records securely anytime, anywhere.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Symptom Tracker",
      description: "Record symptoms & get insights to better understand your health patterns.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Emergency Alerts",
      description: "Tap once, get immediate help. Quick response system for emergencies.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      title: "Donation Support",
      description: "Help mothers in need with essential baby care items through our platform.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    }
  ];

  const testimonials = [
    {
      quote: "Health Bridge changed how I track my pregnancy. I never worry about lost records anymore!",
      author: "Sarah J.",
      role: "Expectant Mother"
    },
    {
      quote: "The emergency alert feature saved critical time when my patient needed urgent care. This is revolutionary.",
      author: "Dr. Michael T.",
      role: "Obstetrician"
    },
    {
      quote: "Being able to coordinate donations directly to mothers in need makes a real difference in our community.",
      author: "Priya K.",
      role: "Volunteer Coordinator"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#4338ca] via-[#4f46e5] to-[#eef2ff] text-white">
      {/* Particles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 1000
              }
            },
            color: {
              value: "#ffffff"
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 0.2,
              random: false
            },
            size: {
              value: 2,
              random: true
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: "none",
              random: true,
              outMode: "out"
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.1,
              width: 1
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              },
              onclick: {
                enable: false
              }
            },
            modes: {
              grab: {
                distance: 150,
                line_linked: {
                  opacity: 0.3
                }
              }
            }
          },
          retina_detect: true
        }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      {/* Background network grid pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {Array.from({ length: 20 }).map((_, i) => (
            <circle 
              key={i} 
              cx={Math.random() * 100 + "%"} 
              cy={Math.random() * 100 + "%"} 
              r="1" 
              fill="white" 
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <line 
              key={i}
              x1={Math.random() * 100 + "%"} 
              y1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"} 
              y2={Math.random() * 100 + "%"}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Header */}
<header ref={headerRef} className="w-full fixed top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo and Name */}
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center">
          <img src={logo} alt="Health Bridge Logo" className="h-8 w-auto mr-2" />
          <span className="text-2xl font-bold text-[#4f46e5]">Health Bridge</span>
        </div>

        
        {/* Navigation links */}
        <div className="hidden md:ml-10 md:flex md:space-x-8">
          <a href="#features" className="border-transparent text-[#666] hover:text-[#333] hover:border-[#4f46e5] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300">
            Features
          </a>
          <a href="#benefits" className="border-transparent text-[#666] hover:text-[#333] hover:border-[#4f46e5] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300">
            Benefits
          </a>
          <a href="#testimonials" className="border-transparent text-[#666] hover:text-[#333] hover:border-[#4f46e5] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300">
            Testimonials
          </a>
          <a href="#faq" className="border-transparent text-[#666] hover:text-[#333] hover:border-[#4f46e5] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-300">
            FAQ
          </a>
        </div>
      </div>
      {/* Auth buttons */}
      <div className="flex items-center space-x-4">
        <motion.button
          onClick={() => handleNavigation("/login")}
          className="text-[#4f46e5] border border-[#4f46e5] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#eef2ff] transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Login
        </motion.button>
        <motion.button
          onClick={() => handleNavigation("/register")}
          className="bg-gradient-to-r from-[#4f46e5] to-[#818cf8] hover:from-[#4338ca] hover:to-[#4f46e5] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Register
        </motion.button>
      </div>
    </div>
  </div>
</header>

      {/* Main content area */}
      <main className="relative pt-16">
        {/* Hero section */}
        


        <section className="relative min-h-screen flex flex-col justify-center">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={landingPageVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay to darken the video */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="lg:flex lg:items-center lg:justify-between">
              {/* Text content */}
              <div className="lg:w-1/2 lg:pr-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
                    <span className="block">The Future of</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-[#eef2ff]">Maternal & Infant Care</span>
                    <span className="block text-2xl md:text-3xl mt-2 font-bold">—At Your Fingertips</span>
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-[#eef2ff] max-w-2xl">
                    Digital health tracking, emergency alerts & donation support for mothers in Sri Lanka. Taking healthcare to the next level with innovative technology.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <motion.button
                      onClick={() => handleNavigation("/register")}
                      onMouseEnter={() => setHoverButton("getStarted")}
                      onMouseLeave={() => setHoverButton(null)}
                      className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-[#4f46e5] bg-white hover:bg-[#f0f0f0] transition-all duration-300"
                      style={{
                        transform: hoverButton === "getStarted" ? "translateY(-2px)" : "translateY(0)",
                        boxShadow: hoverButton === "getStarted" 
                          ? "0 10px 20px rgba(255, 255, 255, 0.2)" 
                          : "0 4px 6px rgba(255, 255, 255, 0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Try It Now – It's Free!
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        const featuresSection = document.getElementById("features");
                        featuresSection.scrollIntoView({ behavior: "smooth" });
                      }}
                      onMouseEnter={() => setHoverButton("learnMore")}
                      onMouseLeave={() => setHoverButton(null)}
                      className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 transition-all duration-300"
                      style={{
                        transform: hoverButton === "learnMore" ? "translateY(-2px)" : "translateY(0)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>

                {/* Social Media Links */}
                <motion.div 
                  className="mt-12 flex space-x-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  {[
                    { Icon: FaLinkedin, color: "#4f46e5", hoverColor: "#818cf8", url: "https://www.linkedin.com/company/healthbridgeoffical/?viewAsMember=true" },
                    { Icon: FaInstagram, color: "#f97316", hoverColor: "#fb923c", url: "https://www.instagram.com/healthbridge2025?igsh=a2hzNm44bXJ3dzN4" },
                    { Icon: FaFacebook, color: "#4f46e5", hoverColor: "#818cf8", url: "https://www.facebook.com/share/15fPLQWJUw/" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-3xl transition-all duration-300 p-3 rounded-full"
                      style={{ color: social.color }}
                      whileHover={{ 
                        color: social.hoverColor,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.Icon />
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Hero image - app mockup */}
              <div className="mt-12 lg:mt-0 lg:w-1/2">
                <motion.div
                  className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <img
                    src="/api/placeholder/600/400"
                    alt="Health Bridge app interface"
                    className="w-full h-auto rounded-xl"
                  />
                  {/* Animated pulse indicator to draw attention */}
                  <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                    <span className="absolute w-4 h-4 rounded-full bg-[#4f46e5]"></span>
                    <span className="animate-ping absolute w-4 h-4 rounded-full bg-[#4f46e5] opacity-75"></span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        

        {/* Benefits section with stats */}
        <section id="benefits" className="py-20 bg-[#f9f9f9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-[#4f46e5] font-semibold tracking-wide uppercase">Benefits</h2>
              <p className="mt-2 text-3xl font-extrabold text-[#333] sm:text-4xl">Why Choose Health Bridge?</p>
              <p className="mt-4 max-w-2xl text-xl text-[#666] mx-auto">
                Transforming healthcare experiences with measurable outcomes.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { stat: '94%', description: 'Of users report better health tracking' },
                  { stat: '45%', description: 'Reduction in emergency response time' },
                  { stat: '3.5x', description: 'More donations successfully delivered' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white overflow-hidden shadow-lg rounded-lg border border-[#eef2ff] hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.8 }}
                  >
                    <div className="px-4 py-8 sm:p-8 text-center">
                      <div className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#4338ca] to-[#4f46e5]">{item.stat}</div>
                      <div className="mt-3 text-lg font-medium text-[#666]">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* App demo section */}
        <section className="py-20 bg-gradient-to-r from-[#4338ca] to-[#4f46e5] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2 pr-0 lg:pr-12">
                <h2 className="text-3xl font-bold">See How Health Bridge Works</h2>
                <p className="mt-4 text-lg text-indigo-100">
                  A futuristic health management system designed with maternal care in mind. Watch our 30-second demo to see all features in action.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-indigo-100 mr-2">✓</span>
                    <span>Track health metrics with intuitive dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-indigo-100 mr-2">✓</span>
                    <span>Trigger emergency alerts with a single tap</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-indigo-100 mr-2">✓</span>
                    <span>Connect with healthcare providers instantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-indigo-100 mr-2">✓</span>
                    <span>Manage donations through secure transactions</span>
                  </li>
                </ul>
              </div>
              <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
                <motion.div 
                  className="w-full max-w-md bg-white p-2 rounded-2xl shadow-xl overflow-hidden relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Video placeholder - would be actual video in production */}
                  <div className="aspect-w-16 aspect-h-9 bg-[#eef2ff] rounded-xl flex items-center justify-center">
                    <div className="text-[#4f46e5] text-lg">Demo Video (30 sec)</div>
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer">
                        <svg className="h-8 w-8 text-[#4f46e5]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-[#4f46e5] font-semibold tracking-wide uppercase">Testimonials</h2>
              <p className="mt-2 text-3xl font-extrabold text-[#333] sm:text-4xl">What Our Users Say</p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#f9f9f9] p-8 rounded-xl shadow-sm border border-[#eef2ff] relative"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.8 }}
                  >
                    {/* Large quote mark */}
                    <div className="absolute top-4 left-4 text-[#eef2ff] text-6xl leading-none">"</div>
                    
                    <p className="text-lg text-[#666] italic relative z-10 pt-4">{testimonial.quote}</p>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#4338ca] to-[#4f46e5] flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.author.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-[#333]">{testimonial.author}</p>
                        <p className="text-sm text-[#666]">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Limited-time offer */}
        <section className="py-12 bg-[#eef2ff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="bg-cover bg-center rounded-2xl shadow-xl overflow-hidden"
              style={{ backgroundImage: `url(${landingPage2})` }}
            >
              <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:flex lg:items-center lg:justify-between">
                  <div className="lg:flex-1">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      <span className="block">Welcome to Health Bridge!</span>
                      <span className="block text-indigo-100">Join today & get free access to all services!</span>
                    </h2>
                    <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-100">
                      Don't miss this opportunity to transform your healthcare experience.
                    </p>
                    <div className="mt-8 flex">
                      <div className="inline-flex rounded-md shadow">
                        <motion.button
                          onClick={() => handleNavigation("/register")}
                          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#4f46e5] bg-white hover:bg-indigo-50 transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Sign Up For Early Access
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
<section id="faq" className="py-20 bg-white relative">
  {/* Background Image */}
  <div className="absolute inset-0 z-0 opacity-10">
    <img src={landingPage} alt="Background" className="w-full h-full object-cover" />
  </div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center">
      <h2 className="text-base text-[#4f46e5] font-semibold tracking-wide uppercase">FAQ</h2>
      <p className="mt-2 text-3xl font-extrabold text-[#333] sm:text-4xl">Frequently Asked Questions</p>
      <p className="mt-4 max-w-2xl text-xl text-[#666] mx-auto">
        Everything you need to know about Health Bridge.
      </p>
    </div>

    <div className="mt-12 max-w-3xl mx-auto space-y-6">
      {/* FAQ Items */}
      {[
        {
          question: "Is Health Bridge secure?",
          answer: "Yes, Health Bridge uses state-of-the-art encryption and follows strict data privacy protocols to ensure your information is safe."
        },
        {
          question: "How does the emergency alert system work?",
          answer: "With a single tap, the app sends your location and medical details to nearby healthcare providers and emergency services."
        },
        {
          question: "Can I access my records offline?",
          answer: "Yes, Health Bridge allows you to download and access your health records offline for convenience."
        },
        {
          question: "How do donations work?",
          answer: "You can donate directly through the app, and we ensure that 100% of your contribution goes to mothers in need."
        },
        {
          question: "Is Health Bridge free to use?",
          answer: "Yes, Health Bridge is completely free for all users. We believe in making healthcare accessible to everyone."
        }
      ].map((faq, index) => (
        <motion.div
          key={index}
          className="bg-[#f9f9f9] p-6 rounded-lg border border-[#eef2ff]"
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.1)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.8 }}
        >
          <h3 className="text-lg font-medium text-[#333]">{faq.question}</h3>
          <p className="mt-2 text-base text-[#666]">{faq.answer}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-[#6d28d9] to-[#3b82f6] text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* About Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">About Health Bridge</h3>
        <p className="text-sm text-[#f8fafc]">
          Health Bridge is a revolutionary platform designed to transform maternal and infant care through innovative technology.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#features" className="text-sm text-[#f8fafc] hover:text-white">Features</a></li>
          <li><a href="#benefits" className="text-sm text-[#f8fafc] hover:text-white">Benefits</a></li>
          <li><a href="#testimonials" className="text-sm text-[#f8fafc] hover:text-white">Testimonials</a></li>
          <li><a href="#faq" className="text-sm text-[#f8fafc] hover:text-white">FAQ</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <ul className="space-y-2">
          <li className="text-sm text-[#f8fafc]">Email: support@healthbridge.com</li>
          <li className="text-sm text-[#f8fafc]">Phone: +94 11 123 4567</li>
          <li className="text-sm text-[#f8fafc]">Address: Colombo, Sri Lanka</li>
        </ul>
      </div>

      {/* Social Media Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/company/healthbridgeoffical/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-[#f8fafc] hover:text-white">
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a href="https://www.instagram.com/healthbridge2025?igsh=a2hzNm44bXJ3dzN4" target="_blank" rel="noopener noreferrer" className="text-[#f8fafc] hover:text-white">
            <FaInstagram className="h-6 w-6" />
          </a>
          <a href="https://www.facebook.com/share/15fPLQWJUw/" target="_blank" rel="noopener noreferrer" className="text-[#f8fafc] hover:text-white">
            <FaFacebook className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-8 border-t border-[#f8fafc] pt-8 text-center">
      <p className="text-sm text-[#f8fafc]">
        &copy; {new Date().getFullYear()} Health Bridge. All rights reserved.
      </p>
    </div>
  </div>
</footer>
      </main>
    </div>
  );
};

export default LandingPage;