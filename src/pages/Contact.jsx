import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
     initial={{opacity:0,y:100}}
     whileInView={{opacity:1,y:0}}
     viewport={{once:true,amount:0.1}}
     transition={{duration:1}}
     className="mt-16 px-6 lg:px-20 py-16 bg-gray-50">
      {/* Heading */}
      <div
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
        <p className="text-gray-600 mt-4">
          Have questions or feedback? Send us a message — we'd love to hear from you!
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left: Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>

        {/* Right: Contact Info & Map */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📍 Address</h3>
            <p className="text-gray-600">Sant Nagar, Verka, Amritsar, Punjab, India</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📞 Phone</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">✉️ Email</h3>
            <p className="text-gray-600">support@foodies.com</p>
          </div>
          {/* Google Map Embed */}
          <iframe
            title="Location Map"
            src="https://www.google.com/maps?q=Sant+Nagar,+Verka,+Amritsar,+Punjab,+India&output=embed"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-2xl shadow-md"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;

