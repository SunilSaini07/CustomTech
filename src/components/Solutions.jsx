import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Navbar from "./Navbar";
// import { div } from "framer-motion/client";

const Solutions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Home", "Industries", "Services", "Solutions", "About Us"];

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 400], [0, -80]);

  const GradientText = ({ children, className = "" }) => (
    <span
      className={`bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 font-extrabold ${className}`}
    >
      {children}
    </span>
  );

  // State for Hero Section
  const [hero, setHero] = useState({
    id: 1,
    title: "Smarter Solutions for the Future",
    description:
      "We bring automation, innovation, and intelligent builds that scale with your vision.",
  });

  // State for Solution Cards
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Wellness & Fitness Platforms",
      description: "Design engaging wellness apps that combine activity tracking, gamification, and community engagement.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
      bgGradient: "from-purple-50 to-white",
    },
    {
      id: 2,
      title: "Learning & Quiz Applications",
      description:
        "Gamified learning and interactive tools tailored for educational institutions and enterprise upskilling.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      bgGradient: "from-cyan-50 to-white",
    },
    {
      id: 3,
      title: "B2B & B2C Portals",
      description:
        "Custom scalable marketplace and transaction portals that enhance digital communication and efficiency.",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1162/1162411.png",
      bgGradient: "from-gray-50 to-white",
    },
  ]);

  // State for CTA Section
  const [cta, setCta] = useState({
    id: 1,
    title: "Business Process Automation",
    description:
      "Streamline workflows, enhance decision-making and scale growth using intelligent automation.",
    buttonText: "Explore Automation → ",
    buttonLink: "/contact",
  });

  const floatParticles = Array.from({ length: 14 }, () => ({
    left: Math.random() * 100,
    size: Math.random() * 18 + 6,
    top: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  //Smooth Scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = "auto");
  }, []);

  // Fetch data from backend APIs
  useEffect(() => {
    // Hero Section
    fetch("https://customtectlab-backend.up.railway.app/api/solutions/hero")
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch((err) => console.error("Failed to fetch Solutions Hero:", err));

    // Cards Section
    fetch("https://customtectlab-backend.up.railway.app/api/solutions/cards")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          bg: item.bgGradient,
        }));
        setCards(formatted);
      })
      .catch((err) => console.error("Failed to fetch Solutions Cards:", err));

    // CTA Section
    fetch("https://customtectlab-backend.up.railway.app/api/solutions/cta")
      .then((res) => res.json())
      .then((data) => setCta(data))
      .catch((err) => console.error("Failed to fetch Solutions CTA:", err));
  }, []);

  return (
    <div>
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={navItems}
      />
      <div className="min-h-screen bg-white text-gray-800 font-inter overflow-x-hidden relative">
        {/* HERO */}
        <section className="relative bg-linear-to-r from-cyan-500 to-purple-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_70%)]"></div>

          <motion.div
            className="max-w-7xl mx-auto px-6 py-30 text-center relative z-10 pb-[12em]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              {hero.title.split(" ").slice(0, 1).join(" ")}{" "}
              <GradientText>
                {hero.title.split(" ").slice(1, 2).join(" ")}{" "}
              </GradientText>
              {hero.title.split(" ").slice(2).join(" ")}
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white/90">
              {hero.description}
            </p>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-white rounded-t-[3rem]"></div>
        </section>

        {/* SOLUTIONS */}
        <section className="py-15 relative overflow-hidden">
          {/* Animated Bubbles */}
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            {floatParticles.map((p, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-linear-to-r from-cyan-400 to-purple-500 opacity-50"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.left}%`,
                  top: `${Math.random() * 100}%`,
                  filter: "blur(3px)",
                }}
                animate={{
                  y: ["0%", "-120%"],
                  x: [
                    "0%",
                    `${Math.random() < 0.5 ? "-" : ""}${Math.random() * 15}%`,
                  ],
                  opacity: [0.25, 0.7, 0.25],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 5,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Cards */}
          <div className="max-w-6xl mx-auto px-6 space-y-24 relative z-10">
            {cards.map((sol, index) => (
              <motion.div
                key={sol.title}
                className={`flex flex-col lg:flex-row ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                } items-center gap-12`}
                initial={{ opacity: 0, y: 60, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 140 }}
                >
                  <img
                    src={sol.imageUrl}
                    alt={sol.title}
                    className="w-56 h-56 object-contain mx-auto drop-shadow-xl"
                  />
                </motion.div>

                <motion.div
                  className={`flex-1 p-10 rounded-3xl bg-linear-to-r ${sol.bg} shadow-lg`}
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0px 15px 40px rgba(0,0,0,0.15)",
                  }}
                >
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    {sol.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {sol.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          className="relative bg-gray-900 text-white overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.2),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.2),transparent_70%)]"></div>

          <div className="max-w-6xl mx-auto px-6 py-32 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <GradientText>{cta.title}</GradientText>
            </h2>
            <p className="max-w-3xl mx-auto text-white/80 mb-10 text-lg">
              {cta.description}
            </p>

            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to={cta.buttonLink}
                className="px-10 py-4 rounded-full bg-linear-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg"
              >
                {cta.buttonText}
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_70%)]"></div>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 relative z-10">
            <div>
              <h3 className="text-2xl font-bold mb-4">CustomTechCT</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering digital growth through creative tech solutions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/industries" className="hover:text-white">
                    Industries
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Connect</h4>
              <div className="flex space-x-4 mt-3">
                {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
                  (Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                    >
                      <Icon />
                    </motion.a>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 mt-12 text-sm">
            © {new Date().getFullYear()} CustomTechCT USA. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Solutions;
