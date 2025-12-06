import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Navbar from "./Navbar";

const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ["Home", "Industries", "Services", "Solutions", "About Us"];

  const [contactHero, setContactHero] = useState([
    {
      id: 1,
      title: "Let's Build Something Remarkable",
      description:
        "Share your vision and let our team help shape it into a real digital product that performs, scales and creates measurable value.",
      updatedAt: "2025-12-02T17:06:01",
    },
  ]);

  const [aboutData, setAboutData] = useState([
    {
      buttonLink: "/services",
      buttonText: "Explore Work",
      description1:
        "A team of engineers, UI innovators and solution architects crafting systems for startups, enterprises and global brands since 2017.",
      description2:
        "We focus on purposeful digital value, long-term scalability and product efficiency through modern technology and thoughtful design.",
      id: 1,
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2920/2920219.png",
      title: "Inside CustomTechCT",
      updatedAt: "2025-12-02T17:30:12",
    },
  ]);

  const iconMap = {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
  };

  const [infoCards, setInfoCards] = useState([
    {
      id: 1,
      title: "Email",
      mainTitle: "Get in Touch",
      info: "hello@customtechct.com",
      icon: "FaEnvelope",
      glow: "from-cyan-500",
      updatedAt: "2025-12-02T22:45:36",
    },
    {
      id: 2,
      title: "Phone",
      mainTitle: "-----------",
      info: "+1 (555) 123-4567",
      icon: "FaPhoneAlt",
      glow: "from-purple-500",
      updatedAt: "2025-12-02T22:45:55",
    },
    {
      id: 3,
      title: "Office",
      mainTitle: "---------",
      info: "1200 Market St, San Francisco, CA",
      glow: "from-blue-500",
      icon: "FaMapMarkerAlt",
      updatedAt: "2025-12-02T22:45:55",
    },
  ]);

  const [mainTitle, setMainTitle] = useState("Get in Touch");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => (document.documentElement.style.scrollBehavior = "auto");
  }, []);

  const GradientText = ({ children, className = "" }) => (
    <span
      className={`bg-clip-text text-transparent bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 font-extrabold ${className}`}
    >
      {children}
    </span>
  );

  // Magnetic Button Motion
  const magneticMotion = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [15, -15]);
    const rotateY = useTransform(x, [-50, 50], [-15, 15]);
    return { x, y, rotateX, rotateY };
  };
  const magnet = magneticMotion();

  // ---------------------------------------
  // ADDED: Form states + submit handler
  // ---------------------------------------
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const payload = { fullname, email, message };

    try {
      const res = await fetch("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to submit");
      }

      setStatus("Message sent successfully");
      setFullname("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("Something went wrong");
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/contact/hero")
      .then((res) => res.json())
      .then((data) => setContactHero(data))
      .catch((err) => console.error("Failed to fetch Contact Hero:", err));

    fetch("http://localhost:8080/api/contact/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Failed to fetch About Section:", err));

    fetch("http://localhost:8080/api/contact/info")
      .then((res) => res.json())
      .then((data) => {
        setInfoCards(data);
        if (data.length > 0) setMainTitle(data[0].mainTitle);
      })
      .catch((err) => console.error("Failed to fetch contact info:", err));
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={navItems}
      />
      <div className="relative min-h-screen bg-white overflow-hidden text-gray-800 font-inter">
        {/* Ambient floating aura blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-linear-to-r from-cyan-400/15 via-blue-400/15 to-purple-400/15 blur-xl"
              style={{
                width: `${Math.random() * 65 + 35}px`,
                height: `${Math.random() * 65 + 35}px`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: "120%", opacity: 0 }}
              animate={{
                y: "-40%",
                opacity: Math.random() * 0.34 + 0.12,
              }}
              transition={{
                duration: Math.random() * 16 + 14,
                repeat: Infinity,
                ease: "easeOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Soft Lens Spotlight Layer */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_70%)]"></div>

        {/* Hero Section */}
        <section className="relative text-center pt-40 pb-24">
          <motion.div
            className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.18),transparent_70%)]"
            animate={{ opacity: [4, 6, 4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <motion.div
            className="max-w-5xl mx-auto px-6 relative z-10"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight">
              {contactHero[0]?.title.split(" ").slice(0, 3).join(" ")}{" "}
              <GradientText>
                {contactHero[0]?.title.split(" ").slice(3).join(" ")}
              </GradientText>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {contactHero[0]?.description}
            </p>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_70%)]" />

          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <motion.img
                src={aboutData[0]?.imageUrl}
                alt="About Illustration"
                className="w-96 mx-auto lg:mx-0 drop-shadow-2xl"
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-5 leading-tight">
                {aboutData[0]?.title.split(" ")[0]}{" "}
                <GradientText>
                  {aboutData[0]?.title.split(" ").slice(1).join(" ")}
                </GradientText>
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                {aboutData[0]?.description1}
              </p>
              <p className="text-gray-600 text-lg">
                {aboutData[0]?.description2}
              </p>

              <motion.div
                className="inline-block mt-8"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={aboutData[0]?.buttonLink}
                  className="px-8 py-3 text-white font-semibold rounded-full bg-linear-to-r from-cyan-500 to-purple-600 shadow-lg hover:shadow-2xl flex items-center gap-2"
                >
                  {aboutData[0]?.buttonText} <FaArrowRight />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-linear-to-r from-gray-50 via-white to-gray-100 relative overflow-hidden">
          <motion.h2
            className="text-4xl font-bold text-center mb-14"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {mainTitle.split(" ").slice(0,2).join(" ")}{" "}
            <GradientText>
              {mainTitle.split(" ").slice(2).join(" ")}
            </GradientText>
          </motion.h2>

          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12 relative z-10">
            {/* Info Cards */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {/* {[
                {
                  Icon: FaEnvelope,
                  title: "Email",
                  info: "hello@customtechct.com",
                  glow: "from-cyan-500",
                },
                {
                  Icon: FaPhoneAlt,
                  title: "Phone",
                  info: "+1 (555) 123-4567",
                  glow: "from-purple-500",
                },
                {
                  Icon: FaMapMarkerAlt,
                  title: "Office",
                  info: "1200 Market St, San Francisco, CA",
                  glow: "from-blue-500",
                },
              ].map(({ Icon, title, info, glow }, i) => ( */}

              {infoCards.map((item, i) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl relative overflow-hidden group transition"
                  >
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-r ${item.glow} to-transparent transition`}
                    ></div>
                    {IconComponent && (
                      <IconComponent className="text-3xl mb-4 text-gray-700" />
                    )}
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.info}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="group lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.4),transparent_70%)]"></div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-600 text-sm">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full p-3 mt-1 rounded-lg border focus:ring-2 focus:ring-cyan-400 outline-none transition"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 text-sm">Email</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 mt-1 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="text-gray-600 text-sm">Message</label>
                <textarea
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="w-full p-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none transition"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mt-8 text-center">
                <motion.button
                  type="submit"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    magnet.x.set(e.clientX - rect.left - rect.width / 0);
                    magnet.y.set(e.clientY - rect.top - rect.height / 0);
                  }}
                  onMouseLeave={() => {
                    magnet.x.set(0);
                    magnet.y.set(0);
                  }}
                  style={{
                    x: magnet.x,
                    y: magnet.y,
                    rotateX: magnet.rotateX,
                    rotateY: magnet.rotateY,
                  }}
                  className="px-10 py-4 bg-linear-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl cursor-pointe "
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message →
                </motion.button>

                {status && (
                  <p className="mt-4 text-gray-700 text-sm">{status}</p>
                )}
              </div>
            </motion.form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white pt-16 pb-10 mt-10">
          <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-3">CustomTechCT</h3>
              <p className="text-sm text-gray-400 mb-4">
                Digital products built for long-term value, scale and
                performance.
              </p>
              <div className="flex space-x-4 text-xl">
                <FaLinkedin className="hover:text-cyan-500 cursor-pointer transition" />
                <FaFacebook className="hover:text-blue-500 cursor-pointer transition" />
                <FaTwitter className="hover:text-sky-400 cursor-pointer transition" />
                <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white transition">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="hover:text-white transition">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/aboutus" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>hello@customtechct.com</li>
                <li>+1 (555) 123-4567</li>
                <li>1200 Market St, San Francisco, CA</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12 text-sm text-gray-500">
            © {new Date().getFullYear()} CustomTechCT USA. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
