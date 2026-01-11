import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-20">
      {/* Hero Section */}
      <motion.section
        className="relative py-24 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 text-center px-4 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
          >
            We're passionate about delivering delicious meals made with love and care. 
            Every dish tells a story of quality, freshness, and dedication.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section
        className="max-w-5xl mx-auto py-20 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Story
        </motion.h2>
        <motion.p
          className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Started in 2020, we began with a small kitchen and a big dream —
          to bring tasty, fresh, and affordable food to everyone.
          Today, we proudly serve thousands of happy customers every month with the same passion and dedication.
        </motion.p>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="bg-gradient-to-b from-white to-gray-50 py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          <motion.div
            className="p-8 rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To make fresh, tasty meals accessible and affordable for everyone, 
              ensuring quality and satisfaction in every bite.
            </p>
          </motion.div>
          <motion.div
            className="p-8 rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become the most loved food delivery brand across the country, 
              spreading joy through delicious food and exceptional service.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Team */}
      <motion.section
        className="py-20 px-6 text-center bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Chef Rahul", role: "Head Chef", image: "Images/About-1.webp" },
            { name: "Priya Sharma", role: "Pastry Chef", image: "Images/About-2.webp" },
            { name: "Vikram Singh", role: "Delivery Head", image: "Images/About-3.jpg" },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              whileHover={{ scale: 1.05, y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-red-200 shadow-lg"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-gray-600 font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="bg-gradient-to-b from-white to-gray-50 py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🌱", title: "Fresh Ingredients", desc: "Daily sourced, farm-fresh ingredients" },
            { icon: "⚡", title: "Fast Delivery", desc: "Quick and reliable delivery service" },
            { icon: "💰", title: "Affordable Prices", desc: "Great value for your money" },
            { icon: "😋", title: "Great Taste", desc: "Authentic flavors you'll love" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call To Action */}
      <motion.section
        className="relative bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white text-center py-20 px-6 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Hungry already? Let's get your order ready{" "}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="inline-block"
            >
              🍴
            </motion.span>
          </motion.h2>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                View Menu
              </motion.button>
            </Link>
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                Order Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
