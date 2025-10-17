import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Global Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages - Make sure all imports use consistent path casing
import Home from './Pages/Home';
import Menu from "./Pages/Menu";     // Changed from ./pages/ to ./Pages/
import About from "./Pages/About";   // Changed from ./pages/ to ./Pages/
import Gallery from "./Pages/Gallery"; // Changed from ./pages/ to ./Pages/
import Contact from "./Pages/Contact"; // Changed from ./pages/ to ./Pages/
import Order from "./Pages/Order";   // Changed from ./pages/ to ./Pages/

const App = () => {
  return (
    <Router>
        {/* Navbar on all pages */}
        <Navbar/>
        
        {/* Page Content */}
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/menu" element={<Menu/>}></Route>        {/* Fixed path */}
          <Route path="/about" element={<About/>}></Route>      {/* Fixed path */}
          <Route path="/gallery" element={<Gallery/>}></Route>  {/* Fixed path */}
          <Route path="/contact" element={<Contact/>}></Route>  {/* Fixed path */}
          <Route path="/order" element={<Order/>}></Route>      {/* Fixed path */}
          {/* <Route path="/menu:id" element={<ItemDetails/>}></Route> */}
        </Routes>
        
        {/* Footer on all pages*/}
        <Footer/>
      </Router>
  )
}

export default App

