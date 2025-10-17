// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Menu", path: "/menu" },
//     { name: "About", path: "/about" },
//     { name: "Gallery", path: "/gallery" },
//     { name: "Contact", path: "/contact" },
//     { name: "Order", path: "/order" },
//   ];

//   return (

//     <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//         <Link to="/" className="text-2xl font-bold  text-red-500">
//           Foodies
//         </Link>
      
//        {/* Desktop Menu (visible on sm and larger) */}
//          <div className="hidden sm:flex space-x-6">
//         {navLinks.map((link)=>(
//             <Link key={link.name}
//             to={link.path}
//             className="text-gray-700 hover:text-red-500 transition">
//                 {link.name}
//             </Link>
//         ))}      
//         </div>   
//         <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>
//      {/* Mobile Menu Toggle (only visible on small screens) */}
//       <div
//         className={`sm:hidden transition-all shadow-lg bg-white duration-300 overflow-hidden ${
//           isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         {navLinks.map((link) => (
//           <Link
//             key={link.name}
//             to={link.path}
//             className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//             onClick={() => setIsOpen(false)}
//           >
//             {link.name}
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Order", path: "/order" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}   // Start above screen
      animate={{ y: 0, opacity: 1 }}      // Slide down smoothly
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Foodies
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-red-500 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="sm:hidden bg-white shadow-lg overflow-hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
