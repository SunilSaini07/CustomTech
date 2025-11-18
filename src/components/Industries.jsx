import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Industries = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = "auto");
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const GradientText = ({ children, className = "" }) => (
    <span
      className={`bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 font-extrabold ${className}`}
    >
      {children}
    </span>
  );

  const navItems = ["Home", "Industries", "Services", "Solutions", "About Us"];

  const industryData = [
    {
      title: "eCommerce",
      subtitle: "Performance-Driven Digital Commerce",
      description:
        "We design high-converting commerce experiences that blend performance, analytics and modern engagement.",
      solutions: [
        "Advanced E-Commerce & Custom Stores",
        "AI Product Search & Recommendation Engine",
        "Secure Payment Gateways",
        "Inventory, Order & Subscription Management",
        "Mobile App Integration",
      ],
      note: "Optimized for performance, scalability and conversion.",
      bg: "bg-gradient-to-r from-purple-50 to-white",
    },
    {
      title: "Healthcare",
      subtitle: "Innovation and Compliance in Digital Health",
      description:
        "We build transformative healthcare technology — empowering hospitals, assisted living facilities, and pharmacies with systems that improve patient care and operational efficiency.",
      solutions: [
        "Custom EMAR Software Development",
        "Pharmacy Management Platforms",
        "Medicine Search & Inventory Systems",
        "Appointment and Patient Tracking Portals",
        "Healthcare Staff Coordination Apps",
      ],
      note: "All healthcare applications meet HIPAA and HL7 compliance.",
      bg: "bg-gradient-to-r from-cyan-50 to-white",
    },
    {
      title: "Other Industries",
      subtitle: "Smart Digital Ecosystems",
      description:
        "We bring innovation across sectors, helping businesses move from legacy systems to scalable platforms.",
      solutions: [
        "CRM, HRMS, ATS",
        "Fitness & Wellness Apps",
        "Learning Platforms",
        "Portals",
        "SaaS & Automation",
      ],
      note: "Designed for security, scale and long-term adaptability.",
      bg: "bg-gradient-to-r from-blue-50 to-white",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter antialiased relative">
      {/* ---------- Visual Effects Layer (Bubbles + Sparkles) ---------- */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Large slow floating bubbles (behind content) */}
        {[...Array(10)].map((_, i) => (
          <span
            key={`bubble-${i}`}
            className="premiumBubble"
            style={{
              left: `${5 + Math.random() * 90}%`,
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              animationDelay: `${-Math.random() * 6}s`,
              background: `radial-gradient(circle at 30% 30%, rgba(56,189,248,0.18), rgba(139,92,246,0.08))`,
            }}
          />
        ))}

        {/* Small colorful particles (front of bubbles, subtle) */}
        {[...Array(24)].map((_, i) => (
          <span
            key={`particle-${i}`}
            className="spark particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 90}%`,
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 6}s`,
              background: `linear-gradient(135deg, rgba(56,189,248,0.95), rgba(139,92,246,0.85))`,
              opacity: 0.95,
            }}
          />
        ))}
      </div>
      {/* ---------- Navbar ---------- */}
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={navItems}
      />
      {/* ---------- Hero Section ---------- */}
      <section
        className="relative pt-32 pb-24 bg-gray-50 overflow-hidden border-b border-gray-200"
        style={{ zIndex: 10 }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl"
            style={{
              width: "28rem",
              height: "28rem",
              top: "3rem",
              background: "radial-gradient(circle,#06b6d4,transparent 60%)",
              opacity: 0.24,
              animation: "slowFloat 12s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          
          <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-160 h-160 bg-cyan-400 rounded-full blur-[900px] absolute -top-10 left-1/4 animate-ping delay-700"></div>
          <div className="w-140 h-140 bg-purple-500 rounded-full blur-[900px] absolute bottom-0 right-1/4 animate-ping delay-700"></div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight">
            <GradientText>Industries</GradientText> We Empower
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We help businesses across industries harness technology for
            transformation. From digital health to next-gen commerce, our
            solutions scale, automate, and innovate.
          </p>
        </div>
      </section>
      {/* ---------- Industry Sections ---------- */}
      {industryData.map((ind, i) => (
        <section
          key={ind.title}
          className={`${ind.bg} border-b border-gray-100`}
        >
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">
            {/* Text */}
            <div className={`${i % 2 !== 0 ? "md:order-2" : ""} fadeUp`}>
              <h2 className="text-4xl font-bold mb-2">{ind.title}</h2>
              <h3 className="text-xl text-cyan-600 font-medium mb-5">
                {ind.subtitle}
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {ind.description}
              </p>

              <div className="mb-4">
                <p className="text-sm font-semibold text-purple-400 mb-2">
                  Key Solutions:
                </p>
                <ul className="space-y-1 text-gray-700">
                  {ind.solutions.map((sol) => (
                    <li key={sol} className="flex items-start">
                      <span className="text-cyan-500 mr-2 mt-1.5">•</span>
                      {sol}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-gray-500 italic">{ind.note}</p>
            </div>

            {/* Visual Card */}
            <div
              className={`relative rounded-2xl shadow-xl bg-white/60 border border-white/50 backdrop-blur-lg p-10 text-center transform transition-transform duration-500 premiumCard ${
                i % 2 !== 0 ? "md:order-1" : ""
              } fadeUp`}
              style={{ willChange: "transform, box-shadow" }}
            >
              <h4 className="text-2xl font-semibold mb-4">
                <GradientText>{ind.title}</GradientText> Solutions
              </h4>
              <p className="text-gray-600 text-base mb-6">
                Learn how we help organizations in the {ind.title.toLowerCase()}{" "}
                sector achieve measurable results and long-term digital success.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 rounded-full text-white font-semibold bg-linear-to-r from-cyan-500 to-purple-600 hover:scale-105 transform transition"
              >
                Discuss Your Project
              </Link>

              {/* small accent */}
              <div
                className="absolute -top-5 -right-1 rounded-full opacity-50 animate-ping"
                style={{
                  width: 70,
                  height: 70,
                  background: "linear-gradient(135deg,#06b6d4,#8b5cf6)",
                  filter: "blur(30px)",
                }}
              />
            </div>
          </div>
        </section>
      ))}
      {/* ---------- CTA ---------- */}
      <section className="py-24 bg-linear-to-r from-gray-50 via-white to-gray-100 text-center">
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to <GradientText>Transform Your Industry?</GradientText>
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Let’s build digital products that create measurable impact.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 text-lg font-semibold rounded-full bg-linear-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 transition-transform"
          >
            Get in Touch
          </Link>
        </div>
      </section>
      {/* Footer */}
<footer className="footer-animate py-8 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
  <div className="footer-glow pointer-events-none absolute inset-0"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-footer">
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500 mb-4">
      <Link to="/" className="footer-link">Home</Link>
      <Link to="/services" className="footer-link">Services</Link>
      <Link to="/solutions" className="footer-link">Solutions</Link>
      <Link to="/contact" className="footer-link">Contact</Link>
      <Link to="/aboutus" className="footer-link">About Us</Link>
    </div>

    <p className="text-gray-500 text-sm opacity-90 hover:opacity-100 transition">
      &copy; {new Date().getFullYear()} Custom Tech Lab. All rights reserved.
    </p>

    <p className="text-gray-600 text-xs mt-1 tracking-wide opacity-80 hover:opacity-100 transition">
      Roots. Future. Evolution. | CustomTechCT USA.
    </p>
  </div>
</footer>

      {/* ---------- Inline CSS (animations & helpers) ---------- */}
      <style>{`
        /* ---------- Bubble / particle animations ---------- */
        .premiumBubble {
          position: absolute;
          top: 10%;
          border-radius: 9999px;
          opacity: 0.28;
          filter: blur(12px);
          transform: translate3d(0,0,0);
          animation-name: floatBubble;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        @keyframes floatBubble {
          0% { transform: translateY(0) scale(0.98); opacity: 0.18; }
          50% { transform: translateY(-40px) scale(1.08); opacity: 0.28; }
          100% { transform: translateY(-80px) scale(0.98); opacity: 0.16; }
        }

        /* small spark particles */
        .spark {
          position: absolute;
          border-radius: 9999px;
          mix-blend-mode: screen;
          filter: blur(0.6px);
          animation-name: sparkFloat;
          animation-duration: 6s;
          animation-iteration-count: infinite;
          animation-timing-function: ease;
        }
        @keyframes sparkFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.95; }
          50% { transform: translateY(-60px) scale(1.08); opacity: 0.9; }
          100% { transform: translateY(-140px) scale(0.95); opacity: 0; }
        }

        /* slower ambient float used on hero background */
        @keyframes slowFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0); }
        }

        /* premium card hover */
        .premiumCard:hover {
          transform: translateY(-8px) rotateX(1.2deg) rotateY(-1deg);
          box-shadow: 0 18px 60px rgba(2,6,23,0.12);
        }

        /* fade-up reveal (applies immediately; for scroll reveal you can add IntersectionObserver later) */
        .fadeUp {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUpAnim 0.9s cubic-bezier(.2,.9,.3,1) forwards;
        }
        @keyframes fadeUpAnim {
          to { opacity: 1; transform: translateY(0); }
        }

        /* make sure the visuals sit behind content */
        .min-h-screen { position: relative; }



        

      `}</style>
    </div>
  );
};

export default Industries;
