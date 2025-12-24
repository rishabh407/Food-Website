import React, { useState } from 'react'
import {  Routes, Route, BrowserRouter} from "react-router-dom";

// Global Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";  
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import { Toaster } from "react-hot-toast";
import ScrollToTop from './OtherUIEffectDesigns/ScrollToTop';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Gallery from './pages/Gallery';
import Wishlist from './pages/Wishlist';

// 👇 MODAL
import AuthModal from './Components/AuthModal';

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [authType, setAuthType] = useState("login"); // login | register
  return (
    <>
    <BrowserRouter>
    <ScrollToTop/>    
          <Toaster
        position="top-right"
        reverseOrder={false}
      />
        {/* Navbar on all pages */}

        {/* <Navbar/> */}
      {/* Navbar always visible */}
      <Navbar
        onLoginClick={() => {
          setAuthType("login");
          setShowAuthModal(true);
        }}
        onRegisterClick={() => {
          setAuthType("register");
          setShowAuthModal(true);
        }}
      /><Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/menu" element={<Menu onLoginClick={() => {
          setAuthType("login");
          setShowAuthModal(true);
        }}/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/gallery" element={<Gallery/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>  
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/wishlist" element={<Wishlist/>}></Route>     
        </Routes>        

                {/* AUTH MODAL (OVER HOME) */}
      <AuthModal
        isOpen={showAuthModal}
        type={authType}
        setAuthType={setAuthType}
        // 👈 ADD THIS
        onClose={() => setShowAuthModal(false)}
      />

        {/* Footer on all pages*/}
        <Footer/>
        </BrowserRouter>
        </>
  )
}

export default App

