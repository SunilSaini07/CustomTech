import React, { useEffect, useRef } from "react";
import logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";

// Gradient title helper
const GradientText = ({ children, className = "" }) => (
  <span
    className={`bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-500 font-extrabold ${className}`}
  >
    {children}
  </span>
);

const Navbar = ({ isMenuOpen, setIsMenuOpen, navItems }) => {
  const navRef = useRef(null);

  // Magnetic Hover Effect
  const handleMagnetic = (e) => {
    const link = e.target;
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    link.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const resetMagnetic = (e) => {
    e.target.style.transform = "translate(0,0)";
  };

  // Background Color Animation
  useEffect(() => {
    const navbar = navRef.current;
    navbar.animate(
      [
        { background: "rgba(255,255,255,0.70)" },
        { background: "rgba(255,255,255,0.85)" },
        { background: "rgba(255,255,255,0.70)" },
      ],
      {
        duration: 6000,
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 backdrop-blur-md shadow-md shadow-gray-200/40 transition-all duration-900 animate-fade-slide "
    >
      <style>{`
        @keyframes fadeSlideDown {
          0% {opacity: 0; transform: translateY(-30px);}
          100% {opacity: 1; transform: translateY(0);}
        }
        .animate-fade-slide {
          animation: fadeSlideDown 0.9s ease forwards;
        }
        .logo-animate {
          animation: floatLogo 4s ease-in-out infinite;
        }
        @keyframes floatLogo {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          
          <div className="flex items-center space-x-2 text-xl font-bold tracking-tight select-none ">
            
            <img
              src={logo}
              alt="Custom Tech Lab Logo"
              className="logo-animate"
              style={{ width: "3em" }}
            />
            <GradientText className="text-2xl logo-animate">Custom Tech Lab</GradientText>

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                   onMouseMove={handleMagnetic}
                   onMouseLeave={resetMagnetic}
                className={({ isActive }) =>
                  `relative group font-medium transition duration-300 ${
                    isActive
                      ? "text-cyan-500"
                      : "text-gray-600 hover:text-cyan-500"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item}
                    <span
                      className={`
              absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transition-transform duration-300
              ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
            `}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {navItems.map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `block px-4 py-3 transition duration-300 ${
                  isActive
                    ? "text-cyan-500 font-semibold bg-gray-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
