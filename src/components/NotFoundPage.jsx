import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const NotFoundPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navItems = ["Home", "Industries", "Services", "Solutions", "Contact"];

  const gradientText = (text) => (
    <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-md">
      {text}
    </span>
  );

  return (
    <div className="min-h-screen bg-white font-inter text-gray-800 relative overflow-hidden">

      {/* Navbar */}
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={navItems}
      />

      {/* Floating Gradient Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45, scale: 1.2 }}
          transition={{ duration: 2 }}
          className="absolute w-140 h-140 bg-cyan-300/30 blur-[160px] rounded-full -top-20 -left-20 animate-pulse"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.40, scale: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute w-160 h-160 bg-purple-400/30 blur-[180px] rounded-full bottom-0 right-0 animate-bounce"
        />

        {/* Floating Orbs */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-32 h-32 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full top-52 left-10 shadow-lg"
        />

        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-24 h-24 bg-white/20 backdrop-blur-2xl border border-white/40 rounded-full right-16 top-80 shadow-md"
        />
      </div>

      {/* Main Content */}
      <div className="pt-5 pb-24 px-6 max-w-5xl mx-auto text-center relative">

        {/* Animated 404 Text */}
        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[11rem] font-extrabold tracking-tight drop-shadow-2xl"
        >
          {gradientText("404")}
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="text-4xl font-semibold mt-4"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-gray-600 text-lg mt-4 max-w-xl mx-auto leading-relaxed"
        >
          The page you’re searching for isn’t available. But don’t worry—we’ll help you find the right direction.
        </motion.p>

        {/* Floating Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3 }}
          className="mt-14"
        >
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
            alt="Not Found Illustration"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-64 mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <Link
            to="/"
            className="px-9 py-3.5 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 
            text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.07] transition duration-300"
          >
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="px-9 py-3.5 rounded-full bg-white/70 backdrop-blur-xl border border-gray-300 
            text-gray-800 font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.07] transition duration-300"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>

      {/* Animated Wave Footer */}
      <footer className="relative mt-20">
        <svg
          className="absolute left-0 w-full -top-1"
          viewBox="0 0 1440 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
            d="M0 90L80 80C160 70 320 50 480 40C640 30 800 30 960 50C1120 70 1280 110 1360 130L1440 150V0H1360C1280 0 1120 0 960 0C800 0 640 0 480 0C320 0 160 0 80 0H0V90Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" x2="1440" y1="0" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
        </svg>

        <div className="text-center text-gray-600 py-10 text-sm bg-white">
          © {new Date().getFullYear()} CustomTechCT USA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
