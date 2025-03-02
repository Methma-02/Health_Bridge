import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Video Background component that can be reused across pages
const VideoBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <video
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/login.mov" type="video/quicktime" />
        {/* Fallback for browsers that don't support .mov */}
        Your browser does not support the video tag.
      </video>
      {/* Overlay to ensure content is readable */}
      <div className="absolute inset-0 bg-white bg-opacity-70"></div>
    </div>
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
    <div className="relative min-h-screen overflow-hidden text-[#333]">
      {/* Video background */}
      <VideoBackground />
      
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
            className="p-8 mb-12 rounded-xl bg-white shadow-md border border-[#eef2ff] bg-opacity-80"
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
                className="w-48 p-6 flex flex-col items-center justify-center rounded-xl bg-white shadow-sm border border-[#eef2ff] hover:shadow-md transition-shadow duration-300 bg-opacity-90"
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
              className="text-3xl transition-all duration-300 p-3 rounded-full bg-white bg-opacity-70"
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