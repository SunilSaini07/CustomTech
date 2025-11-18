import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";

const Home = () => {
  // Global Effect for smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = "auto");
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper Component: Renders text with a gradient effect.
  // Kept here because it's used throughout the body content.
  const GradientText = ({ children, className = "" }) => (
    <span
      className={`bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-500 font-extrabold ${className}`}
    >
      {children}
    </span>
  );

  useEffect(() => {
    const cards = document.querySelectorAll(".solution-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Navigation Items for both Navbar and content
  const navItems = ["Home", "Industries", "Services", "Solutions", "About Us"];

  // --- Section Data --- (All original data arrays remain here)
  const industryData = [
    {
      title: "Healthcare",
      icon: "M9 12h6m-6 4h6m2-8a2 2 0 100-4h-3a2 2 0 100 4h3zM7 12a2 2 0 100-4h3a2 2 0 100 4H7zM4 16h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2z",
      description:
        "We bring innovation and precision to healthcare technology, ensuring compliance (HIPAA, HL7) and seamless user experience.",
      solutions: [
        "Custom EMAR Software",
        "Pharmacy Management",
        "Patient Tracking Portals",
      ],
    },
    {
      title: "eCommerce",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
      description:
        "We craft powerful eCommerce platforms that combine performance, usability, and conversion optimization.",
      solutions: [
        "Advanced E-Commerce Development",
        "Product Search & Recommendations",
        "Secure Payment Integration",
      ],
    },
    {
      title: "Other Industries",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z",
      description:
        "Specializing in B2B/B2C, Wellness, and Automation systems to streamline operations and accelerate growth across sectors.",
      solutions: [
        "CRM, HRMS, ATS Platforms",
        "Wellness & Fitness Apps",
        "SaaS & Automation Systems",
      ],
    },
  ];

  const serviceData = [
    "Custom Web and Mobile App Development",
    "AI-driven Product Engineering",
    "Cloud and API Integration",
    "UI/UX Design and Digital Experience Optimization",
    "Enterprise Solutions for Web, iOS, and Android",
    "Maintenance and Post-Launch Support",
  ];

  const solutionData = [
    
    {
      title: "Wellness & Fitness Platforms",
      description:
        "Encourage engagement, tracking, and personalized lifestyle management.",
    },
    {
      title: "Learning & Quiz Apps",
      description:
        "Drive knowledge sharing and gamified, flexible learning experiences.",
    },
    {
      title: "B2B & B2C Platforms",
      description:
        "Enable secure transactions, communication, and limitless scalability.",
    },
    {
      title: "Custom Business Process Automation",
      description:
        "Digitize core operations for peak efficiency and deep insight.",
    }
  ];
  // --- END Section Data ---

  // Main component render
  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter antialiased">
      {/* Header & Navigation - Renders the imported Navbar component */}
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={navItems}
      />

      <main>
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-15 overflow-hidden">
          {/* Animated Particle Layer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
            {Array.from({ length: 35 }).map((_, i) => (
              <span
                key={i}
                className="heroParticle absolute rounded-full opacity-60"
                style={{
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  background:
                    Math.random() > 0.5
                      ? "rgba(56, 189, 248, 0.8)" // cyan
                      : "rgba(168, 85, 247, 0.8)", // purple
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                  filter: "blur(1px)",
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div>
              <p className="text-xl text-cyan-400 font-medium mb-4">
                Roots. Future. Evolution.
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight animate-heroFloat">
                Build Your Digital <br className="hidden sm:inline" />
                <GradientText className="text-7xl sm:text-8xl lg:text-9xl">
                  Future
                </GradientText>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
                Custom web and mobile applications designed to scale, perform,
                and deliver measurable business impact.
              </p>
              <a
                href="#contact"
                className="inline-block px-10 py-4 text-lg font-semibold rounded-full shadow-lg transition duration-500 transform hover:scale-105
                       bg-linear-to-r from-cyan-500 to-purple-600 text-white hover:shadow-cyan-500/50"
              >
                Start Your Project
              </a>
            </div>

            {/* Existing Blur Glow Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-2xl absolute top-0 left-1/4 transform -translate-x-1/2 animate-blob"></div>
              <div className="w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-2xl absolute bottom-0 right-1/4 transform translate-x-1/2 animate-blob animation-delay-4000"></div>
            </div>
          </div>
        </section>

        {/* 2. Intro/About Section */}
        <section
          id="about"
          className="py-20 bg-gray-50 border-t border-b border-gray-200 revealParent"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Section With Reveal Animation */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 revealItem">
                  Custom Software, <br />
                  <GradientText>Engineered for Scale.</GradientText>
                </h2>

                <p className="text-gray-600 text-lg mb-6 revealItem">
                  At CustomTechCT USA, we specialize in building custom web and
                  mobile applications designed to scale, perform, and deliver
                  measurable business impact. Since 2017, our team has helped
                  startups, enterprises, and global brands transform their
                  digital ideas into powerful products.
                </p>

                <p className="text-gray-600 text-lg revealItem">
                  We combine creativity with technology to deliver seamless user
                  experiences and cutting-edge functionality across a diverse
                  range of industries. Our experts ensure every solution is
                  tailored to your unique business goals.
                </p>
              </div>

              {/* Card with hover animations */}
              <div className="p-8 rounded-xl bg-white shadow-lg shadow-purple-500/10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="grid grid-cols-2 gap-6">
                  {["Startups", "Enterprises", "Global Brands", "B2B/B2C"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-center space-x-3 group transition-all duration-500 hover:translate-x-1"
                      >
                        <svg
                          className={`w-6 h-6 text-cyan-400 shrink-0 iconAnim${index}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                              index === 0
                                ? "M13 10V3L4 14h7v7l9-11h-7z"
                                : index === 1
                                ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2c4.142 0 7.636 2.378 9.35 5.75m-18.7 0C3.004 9.689 2 11.83 2 14c0 3.314 2.686 6 6 6h11a3 3 0 000-6 4 4 0 00-4-4h-3z"
                                : index === 2
                                ? "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.033 3-9s-1.343-9-3-9-3 4.033-3 9 1.343 9 3 9z"
                                : "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2l-2 4h12l-2-4h2a2 2 0 002-2V9z"
                            }
                          />
                        </svg>
                        <span className="text-gray-700 font-medium">
                          {item}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6 text-center text-gray-500 italic fadeInSlow">
                  "From idea validation to deployment and ongoing support."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Industries Section */}
        <section
          id="industries"
          className="py-20 relative overflow-hidden themeBgShift"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16  animate-heroFloat">
              Industries: <GradientText>Focused Expertise</GradientText>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {industryData.map((industry, index) => (
                <div
                  key={industry.title}
                  className="industryCard p-8 rounded-xl bg-white border border-gray-200 shadow-lg shadow-cyan-500/10 transform hover:scale-[1.02] transition duration-500 group opacity-0 translate-y-6"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="iconPulse p-3 rounded-full bg-linear-to-r from-cyan-500 to-purple-500 text-white">
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
                          d={industry.icon}
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-cyan-500 transition">
                      {industry.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-6">{industry.description}</p>
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2 text-purple-400">
                      Key Solutions:
                    </p>
                    <ul className="space-y-1 text-gray-600">
                      {industry.solutions.map((sol) => (
                        <li key={sol} className="flex items-start">
                          <span className="text-cyan-500 mr-2">&bull;</span>{" "}
                          {sol}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Services Section */}
        <section
          id="services"
          className="py-20 bg-gray-50 border-t border-b border-gray-200 animated-bg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 animate-heroFloat">
              Our <GradientText>Core Services</GradientText>
            </h2>
            <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16 delay-200 animate-heroFloat ">
              Comprehensive technology services to turn your ideas into
              market-ready digital products.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceData.map((service, index) => (
                <div
                  key={service}
                  className="service-card p-6 rounded-lg bg-white border border-gray-200 flex items-start space-x-4"
                >
                  <div className="shrink-0 p-2 rounded-full bg-cyan-500/20 text-cyan-400 icon-animate">
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
                          index === 0
                            ? "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                            : index === 1
                            ? "M9 19V6a1 1 0 011-1h4a1 1 0 011 1v13m-6 0h6m-6 0h.01M10 12h4m-4 4h4"
                            : index === 2
                            ? "M4 7v10m-4 0h4m-4 0l4-4m4 4h16a2 2 0 002-2v-4a2 2 0 00-2-2H8a2 2 0 00-2 2v4a2 2 0 002 2z"
                            : index === 3
                            ? "M9 17v-5m3 5v-5m3 5v-5M9 8h6M6 21h12a2 2 0 002-2v-5.586a1 1 0 00-.293-.707l-3.293-3.293A1 1 0 0014.586 9H5.414a1 1 0 00-.707.293l-3.293 3.293A1 1 0 002 15.414V19a2 2 0 002 2z"
                            : index === 4
                            ? "M4 5a2 2 0 002 2h12a2 2 0 002-2M4 5a2 2 0 012-2h12a2 2 0 012 2M4 5h16"
                            : "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        }
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-700">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Solutions Section */}
        <section id="solutions" className="py-20 solutions-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 animate-heroFloat">
              Specialized <GradientText>Digital Solutions</GradientText>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {solutionData.map((solution, index) => (
                <div
                  key={solution.title}
                  className="solution-card p-8 rounded-xl bg-white border border-purple-200 shadow-lg shadow-purple-500/10"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 flex items-center">
                    <span className="text-cyan-400 mr-2 text-3xl font-light leading-none animate-pulse-slow">
                      &#10022;
                    </span>
                    {solution.title}
                  </h3>
                  <p className="text-gray-600">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Contact/CTA Footer */}
<section
  id="contact"
  className="py-20 bg-gray-100 border-t border-gray-200 relative overflow-hidden"
>
  <div className="absolute inset-0 opacity-[0.18] pointer-events-none animate-bgGlow"
       style={{ background: "radial-gradient(circle at center, rgba(6,182,212,0.5), rgba(168,85,247,0.4), transparent)" }}
  ></div>

  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up-cta">
    <h2 className="text-4xl font-bold mb-4 blur-reveal">
      Ready to <GradientText>Transform?</GradientText>
    </h2>

    <p className="text-xl text-gray-400 mb-8 blur-reveal delay-150">
      Let's turn your concept into a high-performing digital solution.
      Contact us today for a consultation.
    </p>

    <a
      href="#"
      className="cta-btn particle-btn inline-block px-10 py-4 text-lg font-semibold rounded-full shadow-lg bg-linear-to-r from-cyan-500 to-purple-600 text-white relative overflow-hidden group"
    >
      <span className="relative z-10">Request a Consultation</span>
      <span className="particles"></span>
    </a>
  </div>
</section>

      </main>

     {/* Footer */}
<footer className="footer-animate py-8 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
  <div className="footer-glow pointer-events-none absolute inset-0"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-footer">
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500 mb-4">
      <Link to="/industries" className="footer-link">Industries</Link>
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

    </div>
  );
};

document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".particle-btn").forEach(btn => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--x", `${e.clientX - rect.left}px`);
    btn.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});


export default Home;
