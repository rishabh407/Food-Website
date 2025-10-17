import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}   // Start hidden below
      whileInView={{ y: 0, opacity: 1 }} // Animate when visible
      viewport={{ once: true }}          // Runs only once
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-900 text-white py-8 mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4">Foodies</h2>
          <p className="text-gray-400">
            Delicious meals made with love. Order online or visit us today.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">📍 Sant Nagar Verka Amritsar</p>
          <p className="text-gray-400">📞 +91 7696472517</p>
          <p className="text-gray-400">✉️ support@foodies.com</p>
        </div>

      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Foodies. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;

