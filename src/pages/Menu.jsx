import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../Components/Card";

const Menu = () => {
  // 🔹 Top-level categories
  const menuItems = [
    { id: 1, title: "Pizza", category: "Main Course", image: "src/Images/item-2.webp" },
    { id: 2, title: "Burger", category: "Starters", image: "src/Images/item-3.webp" },
    { id: 3, title: "Cake", category: "Desserts", image: "src/Images/item-4.webp" },
    { id: 4, title: "Pasta", category: "Main Course", image: "src/Images/pasta.jpg" },
    { id: 5, title: "Coffee", category: "Beverages", image: "src/Images/item-5.webp" },
    { id: 5, title: "Sandwiches", category: "Beverages", image: "src/Images/Sandwich.jpg" },
    { id: 5, title: "Momos", category: "Beverages", image: "src/Images/Momos.jpg" },
  ];

  // 🔹 Subcategory data
  const subcategories = {
    Pizza: [
      { id: 1, title: "Margherita Pizza", category: "Pizza", price: "₹299", image: "/Images/item-2.webp" },
      { id: 2, title: "Paneer Makhani Pizza", category: "Pizza", price: "₹249", image: "/Images/Pizza1.webp" },
      { id: 3, title: "Farm House", category: "Pizza", price: "₹249", image: "/Images/Pizza4.webp" },
    ],
    Pasta: [
      { id: 4, title: "Pasta Alfredo", price: "₹249", image: "/Images/pasta.jpg" },
      { id: 5, title: "Red Sauce Pasta", price: "₹229", image: "/Images/pasta2.jpg" },
    ],
    Cake: [
      { id: 6, title: "Chocolate Cake", price: "₹149", image: "/Images/item-4.webp" },
      { id: 7, title: "Vanilla Cake", price: "₹129", image: "/Images/cake2.jpg" },
    ],
  };

  const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

  // 🔹 States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  // 🔹 Filter logic for main categories
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // 🔹 Click main category → show subcategory items
  const showSubcategoryItems = (item) => {
    setSelectedSubcategory(item.title);
    setSelectedItemDetails(null);
    if (subcategories[item.title]) {
      setSelectedItems(subcategories[item.title]);
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="mt-16 px-7 py-15 sm:py-20 text-center bg-gray-100">
        <div className="herodata">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Our Delicious Menu 🍽️</h2>
          <p className="text-l sm:text-xl">Choose from our freshly prepared dishes</p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="filterbuttons my-8">
        <div className="filterbuttonsdata flex flex-wrap gap-5 justify-center px-2">
          {categories.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedCategory(item);
                setSelectedSubcategory(null);
                setSelectedItemDetails(null);
              }}
              className="py-2 px-4 bg-gray-200 rounded font-medium hover:bg-red-500 transition-colors cursor-pointer hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Main Category Cards */}
      {!selectedSubcategory && (
        <section className="itemdetails">
          <div className="flex flex-wrap text-center justify-center gap-10 lg:gap-20 mx-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  image={item.image}
                  title={item.title}
                  description={`Tasty ${item.title} made fresh for you`}
                  onClick={() => showSubcategoryItems(item)}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Subcategory Cards */}
      {selectedSubcategory && !selectedItemDetails && (
        <section className="mt-10">
          <h3 className="text-3xl font-bold text-center mb-6">{selectedSubcategory} Options</h3>
          <div className="flex flex-wrap text-center justify-center gap-10 lg:gap-20 mx-3">
            {selectedItems.map((subItem) => (
              <motion.div
                key={subItem.id}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedItemDetails(subItem)}
                className="cursor-pointer"
              >
                <Card
                  image={subItem.image}
                  title={subItem.title}
                  description={subItem.price ? subItem.price : ""}
                />
              </motion.div>
            ))}
          </div>

          {/* Back Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ⬅ Back to Categories
            </button>
          </div>
        </section>
      )}

      {/* Subcategory Item Details */}
      {selectedItemDetails && (
        <section className="mt-10 text-center">
          <h3 className="text-3xl font-bold mb-4">{selectedItemDetails.title}</h3>
          <img
            src={selectedItemDetails.image}
            alt={selectedItemDetails.title}
            className="mx-auto w-64 h-64 object-cover rounded"
          />
          {selectedItemDetails.price && <p className="text-lg mt-4">{selectedItemDetails.price}</p>}

          {/* Back to subcategory list */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setSelectedItemDetails(null)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ⬅ Back to {selectedSubcategory} Options
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Menu;
