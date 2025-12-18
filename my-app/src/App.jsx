import React from 'react'
import {  Router, Routes, Route, BrowserRouter} from "react-router-dom";

// Global Components

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";  
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import { Toaster } from "react-hot-toast";
import ScrollToTop from './OtherUIEffectDesigns/ScrolltoTop';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Gallery from './pages/Gallery';
import Wishlist from './pages/Wishlist';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop/>    
          <Toaster
        position="top-right"
        reverseOrder={false}
      />
        {/* Navbar on all pages */}
        <Navbar/>
        
        {/* Page Content */}
         {/* 👇 This ensures every new page starts from the top */}
        {/* <ScrollToTop/> */}
        <Routes>
              {/* 👇 This ensures every new page starts from the top */}
          <Route path="/" element={<Home/>}></Route>
          <Route path="/menu" element={<Menu/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/gallery" element={<Gallery/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>  
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/wishlist" element={<Wishlist/>}></Route>     
        </Routes>

        
        {/* Footer on all pages*/}
        <Footer/>
        </BrowserRouter>
        </>
  )
}

export default App

