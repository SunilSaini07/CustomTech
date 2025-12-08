import React from "react";
import Home from "./components/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Industries from "./components/Industries.jsx";
import Services from "./components/Services.jsx";
import Solutions from "./components/Solutions.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/Aboutus.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Layout from "./components/Layout.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import EcommerceService from "./components/Ecommerce.jsx";
import Users from "./dashboard/Users.jsx";
import DashboardLayout from "./dashboard/DashboardLayout.jsx";
import DashboardHome from "./dashboard/DashboardHome.jsx";
import HomePage from "./dashboard/pages/HomePage.jsx";
import Login from "./dashboard/Login.jsx";
import ProtectedRoute from "./dashboard/ProtectedRoute.jsx";
// import { div } from 'framer-motion/client';

import { Toaster } from "react-hot-toast";
import IndustriesPage from "./dashboard/pages/IndustriesPage.jsx";
import ServicesPage from "./dashboard/pages/ServicesPage.jsx";
import SolutionsPage from "./dashboard/pages/SolutionsPage.jsx";
import AboutPage from "./dashboard/pages/AboutPage.jsx";
import ContactPage from "./dashboard/pages/ContactPage.jsx";
import EcommercePage from "./dashboard/pages/EcommercePage.jsx";
import SettingsPage from "./dashboard/pages/SettingsPage.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/industries", element: <Industries /> },
      { path: "/services", element: <Services /> },
      { path: "/solutions", element: <Solutions /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about us", element: <About /> },
      { path: "/about", element: <About /> },
      { path: "/aboutus", element: <About /> },
      {
        path: "/industries/ecommerce-development",
        element: <EcommerceService />,
      },
      { path: "/service/ecommerce-development", element: <EcommerceService /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // Admin dashboard routes
  {
    path: "/admin",
    children: [
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute />, // Protect all nested routes
        children: [
          { element: <DashboardLayout />, 
            children: [
              { index: true, element: <DashboardHome /> },
              { path: "users-messages", element: <Users /> },
              { path: "home", element: <HomePage /> },
              { path: "industries", element: <IndustriesPage /> },
              { path: "services", element: <ServicesPage /> },
              { path: "solutions", element: <SolutionsPage /> },
              { path: "aboutus", element: <AboutPage /> },
              { path: "contact", element: <ContactPage /> },
              { path: "advanced-ecommerce", element: <EcommercePage /> },
              { path: "settings", element: <SettingsPage /> },
            ]
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      
      <RouterProvider router={router} />
    </>
  );
};

export default App;
