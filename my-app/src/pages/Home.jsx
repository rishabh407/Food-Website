import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAllItems } from "../hooks/useAllItems";
import { useCategoryItems } from "../hooks/useCategoryItems";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { API_BASE_URL } from "../api/axiosInstance";

const Home = () => {
  /* ================= SLIDER CONTROLS ================= */
  const beveragesSliderRef = useRef(null);
  const tandooriSliderRef = useRef(null);

  const [beveragesLeftArrow, setBeveragesLeftArrow] = useState(false);
  const [beveragesRightArrow, setBeveragesRightArrow] = useState(true);
  const [tandooriLeftArrow, setTandooriLeftArrow] = useState(false);
  const [tandooriRightArrow, setTandooriRightArrow] = useState(true);

  const handleBeveragesScroll = () => {
    const slider = beveragesSliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    if (scrollLeft <= 0) {
      setBeveragesLeftArrow(false);
      setBeveragesRightArrow(true);
    } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
      setBeveragesLeftArrow(true);
      setBeveragesRightArrow(false);
    } else {
      setBeveragesLeftArrow(true);
      setBeveragesRightArrow(true);
    }
  };

  const handleTandooriScroll = () => {
    const slider = tandooriSliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    if (scrollLeft <= 0) {
      setTandooriLeftArrow(false);
      setTandooriRightArrow(true);
    } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
      setTandooriLeftArrow(true);
      setTandooriRightArrow(false);
    } else {
      setTandooriLeftArrow(true);
      setTandooriRightArrow(true);
    }
  };

  /* ================= DATA ================= */
  const category = "Beverages";
  const categoryTandooriAndBreads = "TandooriAndBreads";
  const { data: allItems = {}, isLoading } = useAllItems();
  const { data: categoryItems = [] } = useCategoryItems(category);
  const { data: categoryItemsTandooriAndBreads = [] } = useCategoryItems(categoryTandooriAndBreads);
  const featuredItems = Object.values(allItems).flat().slice(0, 8);

  /* ================= DEBUG: Check API URL ================= */
  useEffect(() => {
    console.log('🔍 DEBUG INFO:');
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Env Var (VITE_API_BASE_URL):', import.meta.env.VITE_API_BASE_URL);
    if (featuredItems.length > 0) {
      console.log('Sample Image URL:', `${API_BASE_URL}${featuredItems[0].image_url}`);
    }
  }, [featuredItems]);

  /* ================= INITIAL ARROW STATE ================= */
  useEffect(() => {
    const beveragesSlider = beveragesSliderRef.current;
    const tandooriSlider = tandooriSliderRef.current;

    if (beveragesSlider) {
      const { scrollWidth, clientWidth } = beveragesSlider;
      if (scrollWidth > clientWidth) {
        setBeveragesLeftArrow(false);
        setBeveragesRightArrow(true);
      } else {
        setBeveragesLeftArrow(false);
        setBeveragesRightArrow(false);
      }
    }

    if (tandooriSlider) {
      const { scrollWidth, clientWidth } = tandooriSlider;
      if (scrollWidth > clientWidth) {
        setTandooriLeftArrow(false);
        setTandooriRightArrow(true);
      } else {
        setTandooriLeftArrow(false);
        setTandooriRightArrow(false);
      }
    }
  }, [categoryItems, categoryItemsTandooriAndBreads]);

  if (isLoading) {
    return (
      <div className="mt-24 text-center text-xl font-semibold">
        Loading delicious food... 🍕
      </div>
    );
  }

  return (
    <div className="mt-20">
      {/* ================= HERO ================= */}
      <motion.section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent animate-gradient">
                Delicious Food,
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Delivered Fast
              </span>
              <span className="inline-block ml-2 sm:ml-4 animate-bounce text-2xl sm:text-4xl md:text-5xl">🍔</span>
            </motion.h1>

            <motion.p
              className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Fresh ingredients, tasty meals, and lightning-fast delivery. 
              <span className="block mt-2 text-sm sm:text-base md:text-lg text-gray-500">
                Experience the perfect blend of flavor and convenience
              </span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <NavLink
                to="/menu"
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Menu
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </NavLink>
              <NavLink
                to="/menu"
                className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:scale-105"
              >
                Order Now
              </NavLink>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-12 md:mt-16 max-w-3xl mx-auto px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { number: "10K+", label: "Happy Customers" },
                { number: "500+", label: "Dishes" },
                { number: "30min", label: "Avg Delivery" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= FEATURED ================= */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-white to-gray-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Dishes ⭐
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our most popular and delicious dishes, handpicked just for you
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {featuredItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200"
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={`${API_BASE_URL}${item.image_url}`}
                    alt={item.name}
                    className="h-full w-full object-contain p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-base sm:text-lg font-semibold text-red-600">
                      ₹{item.pricing[0].price}
                    </p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Starting at
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ================= BEVERAGES SLIDER ================= */}
      <motion.section
        className="py-20 relative bg-gradient-to-br from-blue-50 via-white to-cyan-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
            <span className="text-3xl sm:text-4xl">🥤</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Refreshing Beverages
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg ml-0 sm:ml-8 md:ml-12">
            Quench your thirst with our delicious drinks
          </p>
        </div>

        {/* LEFT ARROW */}
            {beveragesLeftArrow && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() =>
              beveragesSliderRef.current?.scrollBy({ left: -350, behavior: "smooth" })
            }
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 sm:p-3 md:p-4 hover:bg-blue-50 hover:scale-110 transition-all duration-300 border border-gray-200"
          >
            <FaArrowLeft className="text-blue-600 text-sm sm:text-base md:text-lg" />
          </motion.button>
        )}

        {/* RIGHT ARROW */}
        {beveragesRightArrow && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() =>
              beveragesSliderRef.current?.scrollBy({ left: 350, behavior: "smooth" })
            }
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 sm:p-3 md:p-4 hover:bg-blue-50 hover:scale-110 transition-all duration-300 border border-gray-200"
          >
            <FaArrowRight className="text-blue-600 text-sm sm:text-base md:text-lg" />
          </motion.button>
        )}

        <div className="overflow-hidden">
          <ul
            ref={beveragesSliderRef}
            onScroll={handleBeveragesScroll}
            className="flex gap-4 sm:gap-5 md:gap-6 px-3 sm:px-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory max-w-7xl mx-auto pb-6 sm:pb-8 scrollbar-hide"
          >
            {categoryItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[340px] bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl snap-start overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={`${API_BASE_URL}${item.image_url}`}
                    alt={item.name}
                    className="h-full w-full object-contain p-4 sm:p-5 md:p-6 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  {item.pricing && item.pricing.length > 0 && (
                    <p className="text-base sm:text-lg font-semibold text-blue-600">
                      ₹{item.pricing[0].price}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ******* TANDOORANDBREADS *************/}
      <motion.section
        className="py-20 relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
            <span className="text-3xl sm:text-4xl">🤤</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Tandoor & Breads
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg ml-0 sm:ml-8 md:ml-12">
            Freshly baked breads and sizzling tandoori delights
          </p>
        </div>

        {/* LEFT ARROW */}
        {tandooriLeftArrow && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() =>
              tandooriSliderRef.current?.scrollBy({ left: -350, behavior: "smooth" })
            }
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 sm:p-3 md:p-4 hover:bg-orange-50 hover:scale-110 transition-all duration-300 border border-gray-200"
          >
            <FaArrowLeft className="text-orange-600 text-sm sm:text-base md:text-lg" />
          </motion.button>
        )}

        {/* RIGHT ARROW */}
        {tandooriRightArrow && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() =>
              tandooriSliderRef.current?.scrollBy({ left: 350, behavior: "smooth" })
            }
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2 sm:p-3 md:p-4 hover:bg-orange-50 hover:scale-110 transition-all duration-300 border border-gray-200"
          >
            <FaArrowRight className="text-orange-600 text-sm sm:text-base md:text-lg" />
          </motion.button>
        )}

        <div className="overflow-hidden">
          <ul
            ref={tandooriSliderRef}
            onScroll={handleTandooriScroll}
            className="flex gap-4 sm:gap-5 md:gap-6 px-3 sm:px-4 overflow-x-scroll scroll-smooth snap-x snap-mandatory max-w-7xl mx-auto pb-6 sm:pb-8 scrollbar-hide"
          >
            {categoryItemsTandooriAndBreads.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[260px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[340px] bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl snap-start overflow-hidden border border-gray-100 hover:border-orange-200 transition-all duration-300 group"
              >
                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={`${API_BASE_URL}${item.image_url}`}
                    alt={item.name}
                    className="h-full w-full object-contain p-4 sm:p-5 md:p-6 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  {item.pricing && item.pricing.length > 0 && (
                    <p className="text-base sm:text-lg font-semibold text-orange-600">
                      ₹{item.pricing[0].price}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>
      {/* ************************************ */}
            {/* ================= WHY CHOOSE US ================= */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're committed to providing you with the best dining experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                emoji: "🌱",
                title: "Fresh Ingredients",
                desc: "Only the freshest farm-picked ingredients delivered daily to ensure quality and taste.",
                color: "from-green-500 to-emerald-500"
              },
              {
                emoji: "⚡",
                title: "Fast Delivery",
                desc: "Hot and fresh food delivered quickly to your doorstep. Average delivery time: 30 minutes.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                emoji: "😋",
                title: "Great Taste",
                desc: "Loved by thousands of happy customers. Authentic flavors that keep you coming back.",
                color: "from-red-500 to-pink-500"
              },
              {
                emoji: "💰",
                title: "Best Prices",
                desc: "Affordable prices without compromising on quality. Great value for your money.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                emoji: "👨‍🍳",
                title: "Expert Chefs",
                desc: "Our experienced chefs prepare every dish with passion and attention to detail.",
                color: "from-purple-500 to-indigo-500"
              },
              {
                emoji: "⭐",
                title: "Top Rated",
                desc: "Consistently rated 5 stars by our customers. Your satisfaction is our priority.",
                color: "from-amber-500 to-yellow-500"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {item.emoji}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= CTA ================= */}
      <motion.section
        className="relative py-20 px-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white text-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Animated Background Elements */}
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
          <motion.div
            className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Hungry? Let's Fix That{" "}
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="inline-block text-2xl sm:text-3xl md:text-4xl"
            >
              🍕
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our delicious menu and order your favorite dishes now!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NavLink
              to="/menu"
              className="inline-block bg-white text-red-600 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              Explore Menu →
            </NavLink>
          </motion.div>
        </div>
      </motion.section>
    </div>

    
  );
};

export default Home;
