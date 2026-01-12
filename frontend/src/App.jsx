import React, { useEffect, useState } from 'react'
import {  Routes, Route, BrowserRouter, useFetcher} from "react-router-dom";
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
import { useAuth } from './Context/AuthContext';
import { useDispatch } from 'react-redux';
import { fetchCartAsync } from './redux/cartActions';
import api from './api/axiosInstance';
import { fetchWishlistAsync } from './redux/wishlistactions';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Dashboard from './pages/Account';
import Orders from './pages/Orders';
const App = () => {
  const { userdata,setuserdata } = useAuth(); // 👈 auth state
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [authType, setAuthType] = useState("login"); // login | register
  const dispatch=useDispatch();
  const [totalorders, settotalorders] = useState(0);
useEffect(()=>{
    const restoreAuth=async()=>{
      try{
          const res=await api.get("/me",
        { withCredentials: true }
      );
      setuserdata(res.data.user);
      setShowAuthModal(false);
      }
      catch(error){
           console.log(error.message);      
      }
    }
    restoreAuth();
  },[setuserdata]);
  // Fetch cart on refresh
  useEffect(() => {
  if (userdata) {
    dispatch(fetchCartAsync());
    dispatch(fetchWishlistAsync());
    const fetchtotalorder=async()=>{
    const res=await api.get("totalorders");
    settotalorders(res.data.totalorders);
   }
   fetchtotalorder();
  }
}, [userdata]);

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
          <Route path="/profile" element={<Profile/>}></Route>   
          <Route path="/account" element={<Dashboard/>}></Route>      
          <Route path="/orders" element={<Orders/>}></Route>   
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

