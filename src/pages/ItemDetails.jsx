import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import DataContext from "../CreateContext/DataContext";
import CartProvider from "../ContextCompUse/CartProvider";
import CartContext from "../CreateContext/CartContext";
import { useState } from "react";

const ItemDetails = () => {
  const { categoryName } = useParams();
  const { subcategories } = useContext(DataContext);
  const items = subcategories[categoryName];
  const {dispatch}=useContext(CartContext);
  const{selecteditems,setselecteditems}=useContext(CartContext);
//  Handle AddToCart Using Function
//  Storing all itemsid to check which item is clicked or   not. 
const [addedItems, setAddedItems] = useState({});
// *******For Handling The Added Items Successfully Line****

// ****************************************************
//***********Working in progress */
// Not Proper Maintained
// const [showNotification, setShowNotification] = useState(false);
//   const[addedItemsCount,setcount]=useState(0);
// *********************************************************
const [clickedItems, setClickedItems] = useState([]);
  const handlecart=(item)=>{
         // ✅ 1. Stop if already clicked
  if (clickedItems.includes(item.id)) return;

  // ✅ 2. Add to clicked list (fix: use item.id, not id)
  setClickedItems([...clickedItems, item.id]);

  // ✅ 3. Dispatch to reducer (add to cart)
  dispatch({ type: "ADD_ITEM", payload: item });

  // ✅ 4. Change only this item's button text
  setAddedItems((prev) => ({
    ...prev,
    [item.id]: true, // mark only this item as added
  }));

  // ✅ 5. Add to selected items list
  // ✅ Add item only once to selectedItems
  setselecteditems((prev) => {
    const alreadyExists = prev.some((i) => i.id === item.id);
    if (alreadyExists) return prev;
    return [...prev, item];
  });
  //********************************************
  // setShowNotification(true);
      // setInterval(() => {
      //   setShowNotification(false);
      //   setcount(addedItemsCount+1);  
      // }, 1000);
  };
  // console.log(selecteditems);
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
    <>
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
                onClick={()=>handlecart(item)}
              >
            {addedItems[item.id]?<p> Added Successfully</p>:<p>Add To Cart</p>}               
              </button>
            </div>
          </div>
        ))}
      </div>
<div className="navigatetocartdetails flex justify-end mt-4 gap-5">
  <NavLink to="/menu">
    <button
      className="
        bg-gradient-to-r from-blue-600 to-blue-500
        hover:from-blue-700 hover:to-blue-600
        text-white font-semibold
        py-2 px-6
        rounded-xl
        shadow-lg
        transition-all duration-300
        transform hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
      "
    >
      Back
    </button>
  </NavLink>
  <NavLink to="/order">
    <button
      className="
        bg-gradient-to-r from-blue-600 to-blue-500
        hover:from-blue-700 hover:to-blue-600
        text-white font-semibold
        py-2 px-6
        rounded-xl
        shadow-lg
        transition-all duration-300
        transform hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
      "
    >
      Checkout Cart
    </button>
  </NavLink>
  
</div>
{/* Proper Notification Message With Designing */}
{/* Notification Message */}
{/* <div className="fixed top-20 right-10 z-50">
  <div
    className={`
      bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg
      flex items-center gap-2
      transform transition-all duration-300
      ${showNotification ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}
    `}
  >
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <p>{addedItemsCount} Item Added Successfully</p>
  </div>
</div> */}


    </div>
    </>
  );
};

export default ItemDetails;
