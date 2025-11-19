import React from 'react'
import Home from './components/Home.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Industries from './components/Industries.jsx';
import Services from './components/Services.jsx';
import Solutions from './components/Solutions.jsx';
import Contact from './components/Contact.jsx';
import About from './components/Aboutus.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Layout from './components/Layout.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import EcommerceService from './components/Ecommerce.jsx';
// import { div } from 'framer-motion/client';

const router = createBrowserRouter([

  {
    element : <Layout/>,
  children :[
  { path: "/", element: <Home />,},
  { path: "/home", element: <Home />},
  { path: "/industries", element: <Industries />},
  { path: "/services",   element: <Services />,},
  { path: "/solutions",  element: <Solutions />,},
  { path: "/contact",    element: <Contact/>,},
  { path: "/about us",    element: <About/>,},
  { path: "/about",    element: <About/>,},
  { path: "/aboutus",    element: <About/>,},
  { path: "/industries/ecommerce-development",    element: <EcommerceService/>,},
  { path: "/service/ecommerce-development",    element: <EcommerceService/>,},
  { path: "*",    element: <NotFoundPage/>,},
  ],

  },
]);

const App = () => {
  return (

    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
