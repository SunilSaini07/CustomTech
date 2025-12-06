import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaEnvelope, FaChevronDown, FaChevronUp, FaFileAlt, FaCog, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [openPages, setOpenPages] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setSidebarOpen(false); // Close sidebar on mobile
    navigate('/admin/login');
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div className={`fixed inset-0 bg-black opacity-50 z-30 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>

      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-5 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <FaTimes />
          </button>
        </div>

      <nav className="flex flex-col gap-3">

        {/* Dashboard */}
        <Link
          to="/admin"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <FaHome />
          Dashboard Home
        </Link>


        {/* Pages Dropdown */}
        <button
          onClick={() => setOpenPages(!openPages)}
          className="flex justify-between items-center w-full hover:text-gray-300"
        >
          <span className="flex items-center gap-5 cursor-pointer">
            <FaFileAlt />
            Pages
          </span>
          {openPages ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Dropdown Animation */}
        <AnimatePresence>
          {openPages && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-8 flex flex-col gap-5 mt-1 overflow-hidden"
            >
              <Link to="/admin/home" className="hover:text-gray-300"> Home  </Link>
              <Link to="/admin/industries" className="hover:text-gray-300">Industries </Link>
              <Link to="/admin/services" className="hover:text-gray-300">Services </Link>
              <Link to="/admin/solutions" className="hover:text-gray-300">Solutions </Link>
              <Link to="/admin/advanced-ecommerce" className="hover:text-gray-300">Ecommerce </Link>
              <Link to="/admin/aboutus" className="hover:text-gray-300">About </Link>
              <Link to="/admin/contact" className="hover:text-gray-300">Contact </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <Link
          to="/admin/users-messages"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <FaEnvelope />
          Messages
        </Link>

        {/* Settings Example */}
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 hover:text-gray-300 mt-4"
        >
          <FaCog className="animate-spin"/>
          Settings
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:text-red-400 text-red-500 mt-auto pt-4 border-t border-gray-700 cursor-pointer"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
      </div>
    </>
  );
}

export default Sidebar;
