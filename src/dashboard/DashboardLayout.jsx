import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen md:flex">
      {/* Mobile menu button */}
      <div className="bg-gray-800 text-gray-100 flex justify-end md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-4 focus:outline-none focus:bg-gray-700"
        >
          <FaBars />
        </button>
      </div>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen md:ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
