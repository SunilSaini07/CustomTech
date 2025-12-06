import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const EcommerceService = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [hero, setHero] = useState([
    {
      id: 1,
      title: "Advanced E-Commerce Development",
      description:
        "Tailored commerce solutions built for performance, reliability and long-term growth.",
      button1Link: "/contact",
      button1Text: "Start a Project",
      button2Link: "/contact",
      button2Text: "Talk to Sales",
      updatedAt: "2025-12-03T10:30:19",
    },
  ]);

  const [coreFeatures, setCoreFeatures] = useState([
    {
      id: 1,
      title: "Core Features",
      featureText: "Custom eCommerce platform development",
      updatedAt: "2025-12-03T11:14:12",
    },
    {
      id: 2,
      title: "Core Features",
      featureText: "AI-powered product search and recommendations",
      updatedAt: "2025-12-03T11:14:12",
    },
    {
      id: 3,
      title: "Core Features",
      featureText: "Secure multi-currency payment integration",
      updatedAt: "2025-12-03T11:14:12",
    },
    {
      id: 4,
      title: "Core Features",
      featureText: "Inventory and order management",
      updatedAt: "2025-12-03T11:14:12",
    },
    {
      id: 5,
      title: "Core Features",
      featureText: "Subscription management",
      updatedAt: "2025-12-03T11:14:12",
    },
    {
      id: 6,
      title: "Core Features",
      featureText: "Mobile app integration for iOS and Android",
      updatedAt: "2025-12-03T11:14:12",
    },
  ]);

  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Advanced Modules",
      moduleText: "Custom admin panel with role-based access",
      updatedAt: "2025-12-03T11:37:50",
    },
    {
      id: 2,
      title: "Advanced Modules",
      moduleText: "Warehouse management system (WMS)",
      updatedAt: "2025-12-03T11:37:50",
    },
    {
      id: 3,
      title: "Advanced Modules",
      moduleText: "Influencer and affiliate management",
      updatedAt: "2025-12-03T11:37:50",
    },
    {
      id: 4,
      title: "Advanced Modules",
      moduleText: "Loyalty, wallet, and rewards system",
      updatedAt: "2025-12-03T11:37:50",
    },
    {
      id: 5,
      title: "Advanced Modules",
      moduleText: "CRM and marketing automation",
      updatedAt: "2025-12-03T11:37:50",
    },
    {
      id: 6,
      title: "Advanced Modules",
      moduleText: "B2B, B2C, and multi-vendor capabilities",
      updatedAt: "2025-12-03T11:37:50",
    },
  ]);

  const [cta, setCta] = useState([
    {
      id: 1,
      title: "Built to Scale. Built for Your Business",
      description:
        "Let’s build a commerce platform that grows with your brand.",
      buttonText: "Start Your Project",
      buttonLink: "/contact",
      updatedAt: "2025-12-03T11:57:47",
    },
  ]);

  const GradientText = ({ children, className = "" }) => (
    <span
      className={`bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 font-extrabold ${className}`}
    >
      {children}
    </span>
  );

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = "auto");
  }, []);

  // scroll animation hook
  const useScrollFadeUp = () => {
    const ref = useRef(null);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("show");
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    return ref;
  };

  //Fetch data from API
  useEffect(() => {
    fetch("http://localhost:8080/api/ecommerce/hero")
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch((err) => console.error("Failed to fetch ecommerce hero:", err));

    fetch("http://localhost:8080/api/ecommerce/core")
      .then((res) => res.json())
      .then((data) => setCoreFeatures(data))
      .catch((err) => console.error("Failed to load core features:", err));

    fetch("http://localhost:8080/api/ecommerce/modules")
      .then((res) => res.json())
      .then((data) => setModules(data))
      .catch((err) => console.error("Failed to fetch Advanced Modules:", err));

    fetch("http://localhost:8080/api/ecommerce/cta")
      .then((res) => res.json())
      .then((data) => setCta(data))
      .catch((err) => console.error("Failed to fetch CTA:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter antialiased">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={["Home", "Industries", "Services", "Solutions", "About Us"]}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-50 border-b border-gray-200 pt-36 pb-28 animate-bg-cycle z-100">
        {/* animated corporate + startup blend */}
        <div className="absolute inset-0 opacity-40 pointer-events-none select-none">
          {/* blob 1 */}
          <div
            className="rounded-full blur-3xl animate-float-soft"
            style={{
              width: 450,
              height: 450,
              background: "rgba(56,189,248,0.12)",
              left: "33%",
              top: -48,
              position: "absolute",
            }}
          />
          {/* blob 2 */}
          <div
            className="rounded-full blur-3xl animate-float-soft"
            style={{
              width: 380,
              height: 380,
              background: "rgba(139,92,246,0.12)",
              right: "25%",
              bottom: 24,
              position: "absolute",
              animationDelay: "700ms",
            }}
          />
          {/* blob 3 */}
          <div
            className="rounded-full blur-3xl animate-float-soft"
            style={{
              width: 360,
              height: 360,
              background: "rgba(59,130,246,0.08)",
              right: "33%",
              top: "25%",
              position: "absolute",
              animationDelay: "1200ms",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1
            className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 opacity-0"
            style={{
              animationName: "blurFadeIn",
              animationDuration: "900ms",
              animationFillMode: "forwards",
              animationTimingFunction: "ease-out",
            }}
          >
            {hero[0].title.split(" ").slice(0, 1).join(" ")} {" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 font-extrabold">
            {hero[0].title.split(" ").slice(1, 2).join(" ")} {" "}
            </span>
            <span>{hero[0].title.split(" ").slice(2).join(" ")} {" "}</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed opacity-0"
            style={{
              animationName: "blurFadeIn",
              animationDuration: "900ms",
              animationFillMode: "forwards",
              animationTimingFunction: "ease-out",
              animationDelay: "200ms",
            }}
          >
            {hero[0].description}
          </p>

          <div
            className="flex justify-center gap-4 mt-10 opacity-0"
            style={{
              animationName: "blurFadeIn",
              animationDuration: "900ms",
              animationFillMode: "forwards",
              animationTimingFunction: "ease-out",
              animationDelay: "350ms",
            }}
          >
            <Link
              to={hero[0].button1Link}
              className="px-8 py-3 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-xl transition transform hover:scale-[1.05]"
              style={{ transition: "transform .25s ease" }}
            >
              {hero[0].button1Text}
            </Link>

            <Link
              to={hero[0].button2Link}
              className="px-8 py-3 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:shadow-md transition"
              style={{ transition: "box-shadow .2s ease" }}
            >
              {hero[0].button2Text}
            </Link>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-24 bg-white relative">
        {/* floating bubbles bg */}
        <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="bubble blur-[2px] "
              style={{
                width: i % 3 === 0 ? 55 : i % 3 === 1 ? 26 : 36,
                height: i % 3 === 0 ? 55 : i % 3 === 1 ? 26 : 36,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 85}%`,
                background:
                  i % 2 === 0
                    ? "rgba(56,189,248,0.45)"
                    : "rgba(139,92,246,0.40)",
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${12 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            {coreFeatures[0].title.split(" ").slice(0,1).join(" ")}{" "}
            <GradientText> {coreFeatures[0].title.split(" ").slice(1).join(" ")}{" "}</GradientText>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coreFeatures.map((item, index) => {
              const ref = useScrollFadeUp();

              return (
                <div
                  key={item}
                  ref={ref}
                  className="scroll-fade-up p-8 bg-gray-50/10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {item.featureText}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADVANCED MODULES */}
      <section className="py-24 bg-gray-50 border-t border-gray-200 relative">
        {/* floating bubbles bg */}
        <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="bubble blur-[2px]"
              style={{
                width: i % 3 === 0 ? 55 : i % 3 === 1 ? 26 : 36,
                height: i % 3 === 0 ? 55 : i % 3 === 1 ? 26 : 36,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 100}%`,
                background:
                  i % 2 === 0
                    ? "rgba(56,189,248,0.45)"
                    : "rgba(139,92,246,0.40)",
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${12 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            {modules[0].title.split(" ").slice(0,1).join(" ")}{" "}
             <GradientText>{modules[0].title.split(" ").slice(1).join(" ")}</GradientText>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {modules.map((item, index) => {
              const ref = useScrollFadeUp();

              return (
                <div
                  key={item}
                  ref={ref}
                  className="scroll-fade-up p-8 bg-gray-50/10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {item.moduleText}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-linear-to-r from-gray-50 via-white to-gray-100 text-center relative overflow-hidden">
        {/* animated blobs */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-25">
          <div className="w-80 h-80 bg-cyan-300 rounded-full blur-3xl absolute top-10 left-1/2 -translate-x-1/2 animate-ping"></div>
          <div className="w-72 h-72 bg-purple-400 rounded-full blur-3xl absolute bottom-0 right-1/3 animate-ping delay-500"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-snug cta-animate">
            {cta[0].title.split(" ").slice(0,5).join(" ")}{" "}
             <GradientText>
              {cta[0].title.split(" ").slice(5).join(" ")}
              </GradientText>
          </h2>

          <p
            className="text-lg text-gray-600 mb-10 leading-relaxed cta-animate"
            style={{ animationDelay: "200ms" }}
          >
            {cta[0].description}
          </p>

          <Link
            to={cta[0].buttonLink}
            className="px-10 py-4 text-lg font-semibold rounded-full bg-linear-to-r from-cyan-500 to-purple-600 text-white shadow-md
             hover:scale-[1.07] transition-transform hover-scale"
            style={{ animationDelay: "350ms" }}
          >
            {cta[0].buttonText}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-animate py-8 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
        <div className="footer-glow pointer-events-none absolute inset-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-footer">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500 mb-4">
            <Link to="/" className="footer-link">
              Home
            </Link>
            <Link to="/industries" className="footer-link">
              Industries
            </Link>
            <Link to="/services" className="footer-link">
              Services
            </Link>
            <Link to="/solutions" className="footer-link">
              Solutions
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
          </div>

          <p className="text-gray-500 text-sm opacity-90 hover:opacity-100 transition">
            &copy; {new Date().getFullYear()} Custom Tech Lab. All rights
            reserved.
          </p>

          <p className="text-gray-600 text-xs mt-1 tracking-wide opacity-80 hover:opacity-100 transition">
            Roots. Future. Evolution. | CustomTechCT USA.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceService;
