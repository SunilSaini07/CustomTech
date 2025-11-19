import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Services = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => (document.documentElement.style.scrollBehavior = 'auto');
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const GradientText = ({ children, className = '' }) => (
    <span
      className={`bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 font-extrabold ${className}`}
    >
      {children}
    </span>
  );

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          entry.target.querySelector(".heading-underline")?.classList.add("in-view");
        }
      });
    },
    { threshold: 0.3 }
  );

  const cta = document.getElementById("ctaContent");
  if (cta) observer.observe(cta);

  return () => observer.disconnect();
}, []);


useEffect(() => {
  // Scroll Reveal Observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".serviceCard").forEach((card) => {
    revealObserver.observe(card);
  });

  // Particle Sparkle Generator
  const container = document.getElementById("sparkleContainer");

 let amount = 7; 

let particleInterval = setInterval(() => {
  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";

    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 3500);
  }
}, 250);



 // Magnetic Button Interaction
document.querySelectorAll(".magnetic-btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 6;
    const y = (e.clientY - rect.top - rect.height / 2) / 6;
    btn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0) scale(1)";
  });
});


  return () => clearInterval(particleInterval);
}, []);



  const navItems = ['Home', 'Industries', 'Services', 'Solutions', 'About Us'];

  const services = [
    
    {
      title: 'Custom Web & Mobile App Development',
      description:
        'We build robust, scalable web and mobile apps designed for performance, reliability, and long-term scalability. Every product is engineered from the ground up to meet your business goals.',
      features: [
        'Full-stack Web Development',
        'Native & Cross-Platform Mobile Apps',
        'MVP Development for Startups',
        'Enterprise-grade Application Architecture',
      ],
      gradient: 'from-cyan-50 to-white',
    },
    {
      title: 'AI-Driven Product Engineering',
      description:
        'Leverage AI and automation to create smarter digital products. Our team integrates advanced analytics, machine learning, and natural language processing into scalable applications.',
      features: [
        'Predictive Data Analytics',
        'ML Model Integration',
        'AI Chatbots & Virtual Assistants',
        'Process Automation & Optimization',
      ],
      gradient: 'from-purple-50 to-white',
    },
    {
      title: 'Cloud & API Integration',
      description:
        'We help organizations move faster with modern cloud-native solutions. From secure APIs to full cloud migration, our integrations keep your systems scalable, efficient, and connected.',
      features: [
        'Custom API Development',
        '3rd-Party Service Integration',
        'Cloud Architecture & Migration',
        'Microservices Deployment',
      ],
      gradient: 'from-blue-50 to-white',
    },
    {
      title: 'UI/UX Design & Digital Experience',
      description:
        'We design immersive, user-centered interfaces that drive engagement and delight users across every platform. Every pixel is purposeful — focused on conversion and clarity.',
      features: [
        'User Journey Mapping',
        'Interactive Prototypes & Wireframes',
        'Design Systems & Branding',
        'Usability Testing & Optimization',
      ],
      gradient: 'from-cyan-100 to-white',
    },
    {
      title: 'Enterprise Solutions & SaaS Platforms',
      description:
        'Our enterprise-grade solutions power digital ecosystems with automation, analytics, and scalability. We build products that empower teams, streamline processes, and deliver measurable ROI.',
      features: [
        'ERP, CRM, HRMS, and ATS Systems',
        'Workflow Automation Platforms',
        'Multi-Tenant SaaS Architecture',
        'Custom Enterprise Portals',
      ],
      gradient: 'from-gray-50 to-white',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter antialiased">
      {/* Navbar */}
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navItems={navItems} />

      



      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 border-b border-gray-200 pt-32 pb-24">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-160 h-160 bg-cyan-400 rounded-full blur-3xl absolute -top-10 left-1/4 animate-ping"></div>
          <div className="w-140 h-140 bg-purple-500 rounded-full blur-3xl absolute bottom-0 right-1/4 animate-ping delay-700"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
            Our <GradientText>Services</GradientText>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We turn complex ideas into intuitive digital products.  
            Our end-to-end services combine creativity, engineering, and intelligence —  
            delivering measurable business results and delightful user experiences.
          </p>
        </div>
      </section>

      {/* Services Section */}
<section id="servicesSection" className="py-24 bg-white relative overflow-hidden">

  {/* Particle Sparkles */}
  <div id="sparkleContainer" className="pointer-events-none absolute inset-0 overflow-hidden"></div>

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
    {services.map((service, i) => (
      <div
        key={service.title}
        className={`serviceCard opacity-0 translate-y-6 group relative rounded-2xl border border-gray-100 bg-linear-to-r ${service.gradient} p-8 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-700`}
      >
        <div className="absolute -top-5 -right-5 w-24 h-24 bg-linear-to-r from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-80 group-hover:opacity-50 transition-opacity"></div>
        <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
        <p className="text-gray-600 mb-5 leading-relaxed">{service.description}</p>
        <ul className="space-y-2 text-gray-700 mb-8">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <span className="text-cyan-500 mr-2 mt-1.5">•</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Magnetic Button */}
        <Link
          to="/contact"
          className="magnetic-btn inline-block px-6 py-2.5 rounded-full text-white font-semibold bg-linear-to-r from-cyan-500 to-purple-600 hover:shadow-lg transition-all"
        >
          Learn More
        </Link>
      </div>
    ))}

    {/* Animated Highlight Card */}
    <div className="serviceCard opacity-0 translate-y-6 relative rounded-2xl border-cyan-300 overflow-hidden p-8 flex flex-col justify-center items-center text-center bg-linear-to-r from-cyan-500 via-purple-500 to-blue-600 text-white shadow-xl animate-gradient-move hover:scale-[1.02] transition-all duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_40%)]"></div>
      <h2 className="text-2xl font-bold mb-4">Advanced E-Commerce Development</h2>
      <p className="text-lg text-white/90 mb-6 max-w-sm">
       We design high-converting commerce experiences that blend performance, analytics and modern engagement.
      </p>
      <Link
        to="/service/ecommerce-development"
        className="magnetic-btn inline-block px-8 py-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white/20 transition text-white font-semibold"
      >
        Explore Innovation →
      </Link>
    </div>
  </div>
</section>


     {/* CTA Section */}
<section
  id="cta"
  className="py-28 bg-linear-to-r from-gray-50 via-white to-gray-100 text-center relative overflow-hidden"
>
  {/* Floating background blobs */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="blob-1 w-80 h-80 bg-cyan-300 rounded-full blur-3xl absolute top-0 left-1/2 -translate-x-1/2 opacity-20"></div>
    <div className="blob-2 w-72 h-72 bg-purple-400 rounded-full blur-3xl absolute bottom-0 right-1/3 opacity-20"></div>
  </div>

  <div
    id="ctaContent"
    className="relative z-10 max-w-3xl mx-auto px-6 opacity-0 translate-y-6 transition-all duration-1200 ease-out"
  >
    <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-snug inline-block relative heading-underline">
      Let’s Build Your Next <GradientText>Digital Success Story</GradientText>
    </h2>

    <p className="text-lg text-gray-600 mb-10 leading-relaxed">
      Whether you need a prototype or a full-scale enterprise platform,
      our team can help design, develop, and deliver your next big idea with precision and impact.
    </p>

    <Link
      to="/contact"
      className="cta-border relative inline-block px-10 py-4 text-lg font-semibold rounded-full bg-linear-to-r from-cyan-500 to-purple-600 text-white hover:scale-[1.07] transition-transform overflow-hidden"
    >
      <span className="relative z-10">Start Your Project</span>
      <span className="flow-border"></span>
    </Link>
  </div>
</section>



     {/* Footer */}
<footer className="footer-animate py-8 bg-gray-50 border-t border-gray-200 relative overflow-hidden">
  <div className="footer-glow pointer-events-none absolute inset-0"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-footer">
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500 mb-4">
      <Link to="/" className="footer-link">Home</Link>
      <Link to="/industries" className="footer-link">Industries</Link>
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


      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradientMove 6s ease infinite;
          }
        `}
      </style>
    </div>
  );
};



export default Services;
