import { useContext, useMemo, useState } from "react";
import { useAllItems } from "../hooks/useAllItems";
import { useCategoryItems } from "../hooks/useCategoryItems";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { API_BASE_URL } from "../api/axiosInstance";

const CATEGORIES = [
  { label: "All", value: null },
  { label: "Fast Food", value: "FastFoodFavorites" },
  { label: "Indian Curries", value: "IndianCurries" },
  { label: "Biryani & Rice", value: "BiryanisAndRice" },
  { label: "Tandoori & Breads", value: "TandooriAndBreads" },
  { label: "Thalis & Combos", value: "ThalisAndCombos" },
  { label: "Street Food", value: "StreetFood" },
  { label: "Desserts", value: "Desserts" },
  { label: "Beverages", value: "Beverages" },
];

const Menu = () => {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState({});

  const { data: allItems = {}, isLoading } = useAllItems();
  const { data: categoryItems = [] } = useCategoryItems(category);
  const { Items: wishlistItems } = useSelector((state) => state.wishlist);

  const flatAllItems = Object.values(allItems).flat();

  const baseItems = useMemo(() => {
    let items = category !== null ? categoryItems : flatAllItems;

    if (search.trim()) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return items;
  }, [category, categoryItems, flatAllItems, search]);

  const dispatch = useDispatch();
  
  const handleCart = (item) => {
    const selectedIndex = selectedSize[item.id] ?? 0;
    const selectedPricing = item.pricing[selectedIndex];

    const cartItem = {
      id: item.id,
      name: item.name,
      image_url: item.image_url,
      size: selectedPricing.size,
      price: selectedPricing.price,
    };
    dispatch(addToCart(cartItem));
    toast.success(
      `${item.name} (${selectedPricing.size}) added to cart`,
      {
        duration: 2000,
      }
    );
  };

  const handleWishlist = (item) => {
    const selectedIndex = selectedSize[item.id] ?? 0;
    const selectedPricing = item.pricing[selectedIndex];

    const wishlistItem = {
      id: item.id,
      name: item.name,
      image_url: item.image_url,
      size: selectedPricing.size,
      price: selectedPricing.price,
    };

    const isInWishlist = wishlistItems.some(
      (w) => w.id === wishlistItem.id && w.size === wishlistItem.size
    );

    if (isInWishlist) {
      dispatch(removeFromWishlist(wishlistItem));
      toast.success(`${item.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(wishlistItem));
      toast.success(`${item.name} added to wishlist ❤️`);
    }
  };

  const isItemInWishlist = (item) => {
    const selectedIndex = selectedSize[item.id] ?? 0;
    const selectedPricing = item.pricing[selectedIndex];
    return wishlistItems.some(
      (w) => w.id === item.id && w.size === selectedPricing.size
    );
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🍽️
          </motion.div>
          <p className="text-xl font-semibold text-gray-600">Loading delicious menu...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 md:px-10 py-20 mt-20">
      {/* HEADER */}
      <motion.div
        className="max-w-7xl mx-auto mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our wide range of freshly prepared dishes, made with love and the finest ingredients
          </p>
        </div>

        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search for your favorite dish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-lg shadow-lg transition-all"
          />
        </motion.div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* CATEGORY */}
        <motion.aside
          className="w-full md:w-64 flex md:flex-col gap-2 sm:gap-3 overflow-x-auto md:overflow-visible md:sticky md:self-start md:top-24 scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {CATEGORIES.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setCategory(item.value)}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold whitespace-nowrap transition-all duration-300 shadow-md text-sm sm:text-base
                ${
                  item.value === category
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-red-200"
                    : "bg-white hover:bg-gray-50 text-gray-700 hover:shadow-lg border border-gray-200"
                }`}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.aside>

        {/* ITEMS */}
        <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {baseItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 sm:h-52 md:h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={`${API_BASE_URL}${item.image_url}`}
                  alt={item.name}
                  className="h-full w-full object-contain p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300"
                />
                <motion.button
                  onClick={() => handleWishlist(item)}
                  className={`absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-opacity hover:bg-red-500 hover:text-white ${
                    isItemInWishlist(item) ? "opacity-100 bg-red-500 text-white" : "opacity-0 group-hover:opacity-100"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart 
                    className={isItemInWishlist(item) ? "text-white" : "text-red-500 group-hover:text-white"} 
                    size={14} 
                  />
                </motion.button>
              </div>

              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {/* SIZE SELECTION */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {item.pricing.map((p, i) => {
                    const isSelected = (selectedSize[item.id] ?? 0) === i;

                    return (
                      <motion.button
                        key={i}
                        onClick={() =>
                          setSelectedSize((prev) => ({
                            ...prev,
                            [item.id]: i,
                          }))
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border-2 transition-all
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-md"
                              : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                      >
                        {p.size}
                      </motion.button>
                    );
                  })}
                </div>

                {/* PRICE */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <span className="text-xs text-gray-500">Starting at</span>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                      ₹{item.pricing[selectedSize[item.id] ?? 0].price}
                    </p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-auto flex gap-2 sm:gap-3">
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCart(item);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <FaShoppingCart size={12} />
                    <span className="hidden xs:inline">Add to Cart</span>
                    <span className="xs:hidden">Add</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleWishlist(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                      isItemInWishlist(item)
                        ? "text-white bg-red-600 hover:bg-red-700 border-red-600"
                        : "text-red-600 bg-red-50 hover:bg-red-100 border-red-200"
                    }`}
                  >
                    <FaHeart size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Empty State */}
      {baseItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter</p>
        </motion.div>
      )}
    </section>
  );
};

export default Menu;
