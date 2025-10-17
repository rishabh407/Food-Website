import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../Components/Card";
import { useContext } from "react";
import DataContext from "../CreateContext/DataContext";
import { NavLink } from "react-router-dom";
// import menuItems from "../OtherUIEffectDesigns/menuitems";
const Menu = () => {
// With The Help Of Context We Can Easily Get Item Details.
  const {menuItems,subcategories} = useContext(DataContext);
  const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

  // 🔹 States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const[categoryitem,showSubcategoryItems]=useState(null);
  // 🔹 Filter logic for main categories
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // 🔹 Click main category → show subcategory items
  //  console.log(categoryitem);
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
                // setSelectedSubcategory(null);
                // setSelectedItemDetails(null);
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
          <div className="flex flex-wrap text-center justify-center gap-10 lg:gap-20 mx-3 ">
            {filteredItems.map((item, index) => (
              <NavLink key={item.id} to={`/menu/${item.title}`}>
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="hover:cursor-pointer"
                onClick={() => showSubcategoryItems(item)}
              >
                <Card
                  image={item.image}
                  title={item.title}
                  description={`Tasty ${item.title} made fresh for you`}
                />
              </motion.div>
              </NavLink>
            ))}
          </div>
        </section>
      )}

    </>
  );
};

export default Menu;
