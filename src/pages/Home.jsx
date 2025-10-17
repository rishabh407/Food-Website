import React from 'react'
import menuItems from '../OtherUIEffectDesigns/menuitems';
import Carousel from '../Components/Carousel';
import Card from '../Components/Card'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Home = () => {

  return (
    <div className='mt-16'>

      {/* Hero Section */}
      <motion.section
        className='py-16 bg-gray-100 px-4 text-center'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h1 className='text-4xl md:text-6xl font-bold text-gray-800 mb-8'>
          Delicious Food, Delivered Fast 🍴
        </h1>
        <p className='text-[1.1rem] mb-8 text-[#545353]'>
          Fresh ingredients, tasty meals, and quick service - right to your door.
        </p>
        <div className="buttons space-x-4">
          <Link to='/menu' className='px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition rounded-lg'>View Menu</Link>
          <Link to='/order' className='px-4 py-2 text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition'>Order Now</Link>
        </div>
      </motion.section>

      {/* Featured Dishes */}

      <motion.section
  className="text-center py-10 px-4 overflow-hidden"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-3xl font-bold mb-10">Featured Dishes</h2>

<Carousel items={menuItems} />


</motion.section>
      {/* Why Choose Us */}
      <motion.section
        className="bg-gray-50 py-16 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-2">🌱 Fresh Ingredients</h3>
            <p className="text-gray-600">We use only the freshest farm produce.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Delivery</h3>
            <p className="text-gray-600">Get your food hot and quick at your door.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">😋 Great Taste</h3>
            <p className="text-gray-600">Mouth-watering dishes loved by everyone.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Reviews */}
      <motion.section
        className='text-center py-10 px-4 max-w-6xl mx-auto'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h2 className='text-4xl font-bold mb-15'>What Our Customers Say</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {["Rohit", "Aditi", "Karan"].map((name, index) => (
            <motion.div
              key={index}
              className='shadow-lg px-6 py-9'
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <p className='text-gray-600 mb-4'>“Amazing taste and fast delivery. Highly recommend the food!”</p>
              <h4 className='text-red-500 text-[0.9rem] font-medium mb-2'>{name}</h4>
              <p>⭐⭐⭐⭐⭐</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call To Action */}
      <motion.section
        className="bg-red-500 text-white text-center py-16 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-8">Hungry? Order Now!</h2>
        <Link
          to="/order"
          className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Place Your Order
        </Link>
      </motion.section>
    </div>
  )
}

export default Home

