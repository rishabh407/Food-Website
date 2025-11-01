// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-16">
      {/* Hero Section */}
      <motion.section
        className="py-20 bg-gray-100 text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We’re passionate about delivering delicious meals made with love and care.
        </p>
      </motion.section>

      {/* Our Story */}
      <motion.section
        className="max-w-5xl mx-auto py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Started in 2020, we began with a small kitchen and a big dream —
          to bring tasty, fresh, and affordable food to everyone.
          Today, we proudly serve thousands of happy customers every month.
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="bg-gray-50 py-16 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 text-center">
          <div className="p-6 shadow rounded-lg bg-white hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3">🎯 Our Mission</h3>
            <p className="text-gray-600">
              To make fresh, tasty meals accessible and affordable for everyone.
            </p>
          </div>
          <div className="p-6 shadow rounded-lg bg-white hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-3">🚀 Our Vision</h3>
            <p className="text-gray-600">
              To become the most loved food delivery brand across the country.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Our Team */}
      <motion.section
        className="py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { name: "Chef Rahul", role: "Head Chef",image: "Images/About-1.webp"  },
            { name: "Priya Sharma", role: "Pastry Chef",image: "Images/About-2.webp"  },
            { name: "Vikram Singh", role: "Delivery Head",image: "Images/About-3.jpg"  },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >


  {/* Profile Image */}
  <img
    src={member.image}
    alt={member.name}
    className="relative w-30 h-30 rounded-full object-cover mx-auto border-4 border-white shadow-md"
  />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="bg-gray-100 py-16 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🌱", title: "Fresh Ingredients" },
            { icon: "⚡", title: "Fast Delivery" },
            { icon: "💰", title: "Affordable Prices" },
            { icon: "😋", title: "Great Taste" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 shadow rounded-lg bg-white hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.icon} {item.title}
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call To Action */}
      <motion.section
        className="bg-red-500 text-white text-center py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">
          Hungry already? Let’s get your order ready 🍴
        </h2>
        <div className="space-x-4">
          <Link
            to="/menu"
            className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            View Menu
          </Link>
          <Link
            to="/order"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Order Now
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
