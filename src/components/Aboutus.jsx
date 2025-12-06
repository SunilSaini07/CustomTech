import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "../assets/Logo.png";
import { FaGlobeAmericas, FaHeartbeat, FaRocket } from "react-icons/fa";

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Home", "Industries", "Services", "Solutions", "Contact"];

  const [aboutHero, setAboutHero] = useState({
    id: 1,
    title: "Building Products That Move the World Forward",
    description:
      "We blend creativity, engineering, and user-centered thinking to build meaningful digital experiences for brands around the world.",
  });

  const [mission, setMission] = useState({
    id: 1,
    title: "Our Mission",
    description1:
      "We help businesses think differently and create solutions that feel simple, helpful, and scalable.",
    description2:
      "Every decision we make is guided by clarity, creativity, and measurable value.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/4064/4064205.png",
    buttonLink: "/services",
    buttonText: "Explore Services",
  });

  const [values, setValues] = useState({
    title: "What We Stand For",
    description: "Principles that define how we think, work, and innovate.",
  });

  const iconMap = {
    FaRocket: <FaRocket className="text-4xl text-cyan-500" />,
    FaHeartbeat: <FaHeartbeat className="text-4xl text-purple-500" />,
    FaGlobeAmericas: <FaGlobeAmericas className="text-4xl text-blue-500" />,
  };

  const [valueCards, setValueCards] = useState([
    {
      description: "Fresh thinking, smarter solutions, continuous evolution.",
      icon: "FaRocket",
      id: 1,
      title: "Innovation",
    },
    {
      description: "Design built around emotion, empathy, and clarity.",
      icon: "FaHeartbeat",
      id: 2,
      title: "Human Connection",
    },
    {
      description: "Products that scale and perform in every market.",
      icon: "FaGlobeAmericas",
      id: 3,
      title: "Global Reach",
    },
  ]);

  const [aboutCTA, setAboutCTA] = useState(
    {
      buttonLink: "/contact",
      buttonText: "Contact Us",
      description:
        "Share your idea and let's explore what we can build together.",
      id: 1,
      title: "Ready to Create Something Special?",
    },
  );

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = "auto");
  }, []);

  const gradientText = (text) => (
    <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600">
      {text}
    </span>
  );

  const iconFloat = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const magnetic = {
    whileHover: { scale: 1.06, rotate: 0.5, y: -4 },
    whileTap: { scale: 0.95 },
  };

  //Fetch data from backend
  useEffect(() => {
    fetch("https://customtectlab-backend.up.railway.app/api/about/hero")
      .then((res) => res.json())
      .then((data) => setAboutHero(data))
      .catch((err) => console.error("Failed to fetch About Hero:", err));

    fetch("https://customtectlab-backend.up.railway.app/api/about/mission")
      .then((res) => res.json())
      .then((data) => setMission(data))
      .catch((err) => console.error("Failed to fetch Mission:", err));

    fetch("https://customtectlab-backend.up.railway.app/api/about/values")
      .then((res) => res.json())
      .then((data) => {
        if (data) setValues(data);
      })
      .catch((err) => console.error("Failed to fetch Values section:", err));

    fetch("https://customtectlab-backend.up.railway.app/api/about/cards")
      .then((res) => res.json())
      .then((data) => {
        setValueCards(data);
      })
      .catch((err) =>
        console.error("Failed to fetch About Values Cards:", err)
      );

    fetch("https://customtectlab-backend.up.railway.app/api/about/cta")
      .then((res) => res.json())
      .then((data) => setAboutCTA(data[0]))
      .catch((err) => console.error("Failed to fetch About CTA:", err));
  }, []);

  return (
    <div>
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={navItems}
      />
      <div className="min-h-screen bg-white font-inter text-gray-800 overflow-hidden relative">
        {/* Global floating spark particles */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          {[...Array(40)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: Math.random() * 800 }}
              animate={{ opacity: [0, 1, 0], y: -60 }}
              transition={{
                duration: 7 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6,
              }}
              className="absolute w-1 h-1 rounded-full bg-linear-to-r from-cyan-400 to-purple-600 shadow-md"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        {/* ================= HERO ================= */}
        <section className="relative pt-40 pb-36 overflow-hidden">
          {/* liquid morphing gradient blob background */}
          <motion.div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-linear-to-r from-cyan-400/25 via-blue-400/25 to-purple-500/25 blur-[120px] rounded-full"
            animate={{
              borderRadius: [
                "62% 38% 70% 30% / 39% 68% 32% 61%",
                "30% 70% 40% 60% / 55% 35% 65% 45%",
                "62% 38% 70% 30% / 39% 68% 32% 61%",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-5xl mx-auto text-center px-6 relative z-10"
          >
            <motion.h1
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.9 }}
              className="text-6xl font-extrabold leading-tight"
            >
              {aboutHero.title.split(" ").slice(0, 3).join(" ")} <br />
              {aboutHero.title.split(" ").slice(3, 5).join(" ")}{" "}
              {gradientText("Forward")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {aboutHero.description}
            </motion.p>
          </motion.div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* image block with parallax hover */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <motion.img
                src={mission.imageUrl}
                alt={mission.title}
                className="w-96 mx-auto drop-shadow-xl rounded-2xl transition-all duration-700 group-hover:scale-105"
                whileHover={{ rotate: 1 }}
              />

              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-xl transition"></div>
            </motion.div>

            {/* text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                {mission.title.split(" ").slice(0, 1).join(" ")}{" "}
                {gradientText(mission.title.split(" ").slice(1).join(" "))}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {mission.description1}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {mission.description2}
              </p>

              <motion.div {...magnetic}>
                <Link
                  to={mission.buttonLink}
                  className="inline-block mt-8 px-9 py-3 text-white font-semibold rounded-full
                 bg-linear-to-r from-cyan-500 to-purple-600 shadow-lg hover:shadow-2xl transition duration-300 backdrop-blur-md"
                >
                  {mission.buttonText}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="py-28 bg-gray-50 relative overflow-hidden">
          {/* soft floating blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[500px] h-[500px] bg-cyan-400/15 blur-[150px] rounded-full -top-32 -left-20"></div>
            <div className="absolute w-[450px] h-[450px] bg-purple-500/15 blur-[140px] rounded-full bottom-0 right-0"></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-bold mb-4"
            >
              {values.title}
            </motion.h2>

            <p className="text-gray-600 text-lg mb-14 max-w-3xl mx-auto">
              {values.description}
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              {
                // [
                //   {
                //     icon: <FaRocket className="text-4xl text-cyan-500" />,
                //     title: "Innovation",
                //     desc: "Fresh thinking, smarter solutions, continuous evolution.",
                //   },
                //   {
                //     icon: <FaHeartbeat className="text-4xl text-purple-500" />,
                //     title: "Human Connection",
                //     desc: "Design built around emotion, empathy, and clarity.",
                //   },
                //   {
                //     icon: <FaGlobeAmericas className="text-4xl text-blue-500" />,
                //     title: "Global Reach",
                //     desc: "Products that scale and perform in every market.",
                //   },
                // ]
                valueCards.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ scale: 1.06, y: -6 }}
                    className="relative bg-white shadow-md rounded-3xl p-10 overflow-hidden border border-white transition-all group"
                  >
                    {/* animated icon */}
                    <motion.div
                      variants={iconFloat}
                      initial="initial"
                      animate="animate"
                      className="mb-5 inline-block"
                    >
                      {iconMap[value.icon]}
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>

                    {/* neon shine */}
                    <span className="absolute inset-0 bg-linear-to-r from-cyan-500/0 via-purple-500/15 to-purple-500/0 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></span>
                  </motion.div>
                ))
              }
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-24 text-center bg-linear-to-r from-cyan-500 to-purple-600 text-white rounded-t-[60px] relative overflow-hidden">
          {/* animated waves */}
          <motion.div
            className="absolute inset-0 opacity-25"
            animate={{ backgroundPosition: ["-20% 50%", "120% 50%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:  `url(${Logo})`,
              // backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6 relative z-10"
          >
            {aboutCTA.title}
          </motion.h2>

          <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8 relative z-10">
            {aboutCTA.description}
          </p>

          <motion.div {...magnetic} className="relative z-10">
            <Link
              to={aboutCTA.buttonLink}
              className="inline-block px-10 py-4 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg backdrop-blur-md"
            >
              {aboutCTA.buttonText}
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
