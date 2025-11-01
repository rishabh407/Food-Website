import React from 'react'
import {  Router, Routes, Route, BrowserRouter} from "react-router-dom";


// Global Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages - Make sure all imports use consistent path casing

import Gallery from "./Pages/Gallery"; // Changed from ./pages/ to ./Pages/
import Contact from "./Pages/Contact"; // Changed from ./pages/ to ./Pages/
import Order from "./Pages/Order";   // Changed from ./pages/ to ./Pages/
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import ItemDetails from './pages/ItemDetails';
import ScrollToTop from './OtherUIEffectDesigns/ScrolltoTop';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop/>
        {/* Navbar on all pages */}
        <Navbar/>
        
        {/* Page Content */}
         {/* 👇 This ensures every new page starts from the top */}
        {/* <ScrollToTop/> */}
        <Routes>
              {/* 👇 This ensures every new page starts from the top */}
          <Route path="/" element={<Home/>}></Route>
          <Route path="/menu" element={<Menu/>}></Route>        {/* Fixed path */}
          <Route path="/about" element={<About/>}></Route>      {/* Fixed path */}
          <Route path="/gallery" element={<Gallery/>}></Route>  {/* Fixed path */}
          <Route path="/contact" element={<Contact/>}></Route>  {/* Fixed path */}
          <Route path="/order" element={<Order/>}></Route>      {/* Fixed path */}
           <Route path="/menu/:categoryName" element={<ItemDetails />} />
        </Routes>

        
        {/* Footer on all pages*/}
        <Footer/>
        </BrowserRouter>
        </>
  )
}

export default App

