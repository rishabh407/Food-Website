import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../CreateContext/DataContext";

const ItemDetails = () => {
  const { categoryName } = useParams();
  const { subcategories } = useContext(DataContext);
  const items = subcategories[categoryName];

  // If no items found
  if (!items) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
        <p className="text-2xl text-gray-500 text-center">
          ❌ No items found for <span className="font-semibold">"{categoryName}"</span>
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 pt-25 pb-15 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-gray-800">
        {categoryName} Menu
      </h1>

      {/* Items Grid */}
      <div
        className="
          grid gap-6
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
        "
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="
              bg-white rounded-2xl shadow-lg overflow-hidden 
              hover:scale-[1.03] transform transition-transform duration-300
              flex flex-col
            "
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 sm:h-56 md:h-60 object-cover"
              />
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-semibold px-2 py-1 rounded-lg shadow">
                {item.price}
              </span>
            </div>

            {/* Item Info */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {item.title}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mb-4 flex-grow">
                Delicious and freshly made {item.category}.
              </p>
              <button
                className="
                  mt-auto bg-blue-600 hover:bg-blue-700 
                  text-white font-semibold py-2 rounded-xl 
                  transition duration-300 text-sm sm:text-base
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetails;
