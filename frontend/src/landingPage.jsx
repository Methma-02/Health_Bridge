import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { gsap } from "gsap";

// Background elements that can be shared across pages
const BackgroundElements = () => {
  return (
    <>
      {/* Floating medical icons and maternal/child elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top right decorative element */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#eef2ff] opacity-50"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        {/* Bottom left decorative element */}
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#eef2ff] opacity-50"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        {/* Maternal healthcare symbol */}
        <motion.div 
          className="absolute top-1/4 left-[5%] text-6xl opacity-10"
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          👩‍👧
        </motion.div>
        
        {/* Baby symbol */}
        <motion.div 
          className="absolute top-1/3 right-[8%] text-5xl opacity-10"
          animate={{
            y: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        >
          👶
        </motion.div>
        
        {/* Heartbeat line (stylized) */}
        <motion.div 
          className="absolute bottom-1/4 left-[15%] w-32 h-12 opacity-10"
          animate={{
            x: [0, 10, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <path 
              d="M0,10 L10,10 L15,2 L20,18 L25,0 L30,20 L35,10 L100,10" 
              fill="none" 
              stroke="#4f46e5" 
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
        
        {/* Stethoscope symbol */}
        <motion.div 
          className="absolute bottom-1/3 right-[15%] text-5xl opacity-10"
          animate={{
            rotate: [0, 5, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        >
          🩺
        </motion.div>
        
        {/* Hospital symbol */}
        <motion.div 
          className="absolute top-2/3 left-[30%] text-5xl opacity-10"
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 3
          }}
        >
          🏥
        </motion.div>
      </div>
      
      {/* Subtle particle background */}
      <ParticlesBackground />
    </>
  );
};

// Particles component extracted for reuse
const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
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
              value_area: 1200
            }
          },
          color: {
            value: ["#4f46e5", "#10b981", "#f97316"]
          },
          shape: {
            type: ["circle", "triangle"],
            polygon: {
              sides: 6
            }
          },
          opacity: {
            value: 0.1,
            random: true
          },
          size: {
            value: 3,
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
            color: "#4f46e5",
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
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const [hoverButton, setHoverButton] = useState(null);

  // Handle navigation with transition
  const handleNavigation = (route) => {
    // Add page transition
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.5,
      onComplete: () => navigate(route)
    });
  };

  useEffect(() => {
    // Clean title animation
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Staggered animations for content
    const elements = containerRef.current.children;
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
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(elements);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f9f9f9] text-[#333]">
      {/* Shared background elements */}
      <BackgroundElements />
      
      {/* Content container */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-6 z-10">
        <div ref={containerRef} className="max-w-4xl text-center">
          {/* Clean modern logo/title */}
          <div ref={titleRef} className="mb-12">
            <h1 className="text-6xl font-extrabold mb-2 text-[#4f46e5]">
              Health Bridge
            </h1>
            <div className="w-24 h-1 bg-[#10b981] mx-auto rounded-full"></div>
          </div>
          
          {/* Professional subtitle */}
          <motion.p 
            className="text-2xl font-semibold text-[#111] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Bridging the Gap in 
            <span className="text-[#10b981] ml-2">
              Maternal & Child Healthcare
            </span>
          </motion.p>
          
          {/* Clean description card */}
          <motion.div 
            className="p-8 mb-12 rounded-xl bg-white shadow-md border border-[#eef2ff]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg text-[#666] leading-relaxed">
              At <span className="font-bold text-[#4f46e5]">Health Bridge</span>, we believe every mother and child deserves seamless, secure, and accessible healthcare.  
              Our platform <b className="text-[#10b981]">digitizes pregnancy health records and child development tracking</b>, ensuring that mothers, healthcare providers, and medical officers stay connected for better health outcomes.
            </p>
          </motion.div>
          
          {/* Key features with clean design */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {[
              { title: "Secure", icon: "🔒", desc: "End-to-end encryption" },
              { title: "Accessible", icon: "🌐", desc: "Available 24/7" },
              { title: "Connected", icon: "🔄", desc: "Real-time updates" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="w-48 p-6 flex flex-col items-center justify-center rounded-xl bg-white shadow-sm border border-[#eef2ff] hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-3xl mb-3">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-[#333] mb-1">{feature.title}</h3>
                <p className="text-sm text-[#666]">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Clean CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.button
              onClick={() => handleNavigation("/login")}
              onMouseEnter={() => setHoverButton("login")}
              onMouseLeave={() => setHoverButton(null)}
              className="px-10 py-4 text-lg font-medium text-white rounded-lg shadow-sm transition-all duration-300"
              style={{ 
                background: "linear-gradient(135deg, #4f46e5, #818cf8)",
                transform: hoverButton === "login" ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hoverButton === "login" 
                  ? "0 10px 20px rgba(79, 70, 229, 0.2)" 
                  : "0 4px 6px rgba(79, 70, 229, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
            
            <motion.button
              onClick={() => handleNavigation("/register")}
              onMouseEnter={() => setHoverButton("register")}
              onMouseLeave={() => setHoverButton(null)}
              className="px-10 py-4 text-lg font-medium rounded-lg border-2 transition-all duration-300"
              style={{ 
                borderColor: "#10b981",
                color: "#10b981",
                backgroundColor: hoverButton === "register" ? "rgba(16, 185, 129, 0.05)" : "transparent",
                transform: hoverButton === "register" ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hoverButton === "register" 
                  ? "0 10px 20px rgba(16, 185, 129, 0.1)" 
                  : "0 4px 6px rgba(16, 185, 129, 0)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </motion.div>
        </div>
        
        {/* Social Media Links with clean design */}
        <motion.div 
          className="flex space-x-10"
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
    </div>
  );
};

export default LandingPage;