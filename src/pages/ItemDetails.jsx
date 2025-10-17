// import React, { useContext } from 'react'
// import DataContext from '../CreateContext/DataContext'
// import { useParams } from 'react-router-dom';

// const ItemDetails = () => {
//   const { categoryName } = useParams();
//   const{subcategories}=useContext(DataContext);
//   const items=subcategories[categoryName];
//   if (!items) {
//   return <p>No items found for {items}</p>; // or show a loader
// }
// // console.log(categoryName);
//   return (
//     <div className='flex flex-col text-5xl text-black'>
//       {items.map((item,index)=>(
//         <li key={index}>
//         <p>{item.title}</p>
//         </li>
//       ))}
//       <p>{categoryName}</p>
//     </div>
//   )
// }

// export default ItemDetails


import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from '../CreateContext/DataContext'

const ItemDetails = () => {
  const { categoryName } = useParams();
  const { subcategories } = useContext(DataContext);

  const items = subcategories[categoryName];

  if (!items) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-500">
          ❌ No items found for "{categoryName}"
        </p>
      </div>
    );
  }
  // console.log(items)
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        {categoryName} Menu
      </h1>

      {/* Grid of items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-blue-600 font-bold mt-2">{item.price}</p>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition">
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
