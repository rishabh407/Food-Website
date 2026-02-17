import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Changed lg:grid-cols-4 to lg:grid-cols-3 for better spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🍔</span>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Foodies
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-sm">
              Delicious meals made with love. Order online or visit us today for the best dining experience.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:justify-self-center">
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Menu", path: "/menu" },
                { name: "About", path: "/about" },
                { name: "Gallery", path: "/gallery" },
                { name: "Cart", path: "/cart" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:justify-self-end">
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Sant Nagar Verka Amritsar</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-red-500 flex-shrink-0" />
                <a href="tel:+917696472517" className="hover:text-red-400 transition-colors text-sm sm:text-base">
                  +91 7696472517
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-red-500 flex-shrink-0" />
                <a href="mailto:support@foodies.com" className="hover:text-red-400 transition-colors text-sm sm:text-base">
                  support@foodies.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm sm:text-base">
                  <p>Mon - Sun: 10:00 AM - 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Foodies. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="#" className="hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;