import React, { useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { gsap } from "gsap";

const LandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    // Floating animation for the title
    gsap.to(titleRef.current, {
      y: "-15px",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Staggered fade-in animations for content
    const elements = containerRef.current.children;
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    return () => {
      gsap.killTweensOf(titleRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      {/* Particle background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#ffffff"
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 0.5,
              random: true
            },
            size: {
              value: 3,
              random: true
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              outMode: "out"
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse"
              },
              onclick: {
                enable: true,
                mode: "push"
              }
            }
          },
          retina_detect: true
        }}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-cyan-400 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Content container */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-6 z-10">
        <div ref={containerRef} className="max-w-4xl text-center">
          {/* Floating logo/title with glow effect */}
          <motion.div 
            ref={titleRef}
            className="mb-12"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
           <h1 className="text-6xl font-extrabold mb-2">
    {"Health Bridge".split('').map((letter, index) => (
      <span 
        key={index}
        className="inline-block transform hover:scale-105 transition-transform duration-300 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
      >
        {letter}
      </span>
    ))}
  </h1>
  <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-75 shadow-lg shadow-cyan-500/50"></div>
</motion.div>
          
          {/* Animated subtitle */}
          <motion.p 
            className="text-2xl font-semibold text-blue-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Bridging the Gap in Maternal & Child Healthcare
          </motion.p>
          
          {/* Description with animated background */}
          <motion.div 
            className="relative p-6 mb-10 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg text-blue-50 leading-relaxed">
              At <span className="font-bold text-cyan-300">Health Bridge</span>, we believe every mother and child deserves seamless, secure, and accessible healthcare.  
              Our platform <b className="text-purple-300">digitizes pregnancy health records and child development tracking</b>, ensuring that mothers, healthcare providers, and medical officers stay connected for better health outcomes.
            </p>
          </motion.div>
          
          {/* Key values with hover effects */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {["Secure", "Accessible", "Connected"].map((value, index) => (
              <motion.div
                key={index}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-md border border-white/10 font-semibold text-lg cursor-default"
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(90deg, rgba(99,102,241,0.4) 0%, rgba(126,34,206,0.4) 100%)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {value}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Buttons with hover and click effects */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.button
              onClick={() => navigate("/login")}
              className="px-10 py-4 text-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg shadow-cyan-500/50 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
            
            <motion.button
              onClick={() => navigate("/register")}
              className="px-10 py-4 text-lg font-medium bg-transparent border-2 border-purple-400 text-purple-300 rounded-full shadow-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Register</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </motion.div>
        </div>
        
        {/* Social Media Links with hover animations */}
        <motion.div 
          className="flex space-x-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {[
            { Icon: FaLinkedin, color: "text-blue-400", hover: "hover:text-blue-300", url: "https://www.linkedin.com/company/healthbridgeoffical/?viewAsMember=true" },
            { Icon: FaInstagram, color: "text-pink-400", hover: "hover:text-pink-300", url: "https://www.instagram.com/healthbridge2025?igsh=a2hzNm44bXJ3dzN4" },
            { Icon: FaFacebook, color: "text-blue-400", hover: "hover:text-blue-300", url: "https://www.facebook.com/share/15fPLQWJUw/" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} ${social.hover} text-4xl transition-all relative group`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.Icon />
              <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;