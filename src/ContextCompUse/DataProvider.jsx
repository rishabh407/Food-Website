import React from 'react'
import DataContext from '../CreateContext/DataContext';

// ✅ All Main Menu Items
const menuItems = [
  { id: 1, title: "Pizza", category: "Main Course", image: "src/Images/item-2.webp", price: "₹199" },
  { id: 2, title: "Burger", category:"Starters", image: "src/Images/item-3.webp", price: "₹59" },
  { id: 3, title: "Cake", category: "Desserts", image: "src/Images/item-4.webp", price: "₹49" },
  { id: 4, title: "Pasta", category: "Main Course", image: "src/Images/pasta.jpg", price: "₹199" },
  { id: 5, title: "Coffee", category: "Beverages", image: "src/Images/item-5.webp", price: "₹99" },
  { id: 6, title: "Sandwiches", category:"Starters", image: "src/Images/Sandwich.jpg", price: "₹179" },
  { id: 7, title: "Momos", category:"Starters", image: "src/Images/Momos.jpg", price: "₹99" },
];

// ✅ All Subcategories
const subcategories = {
  Pizza: [
    { id: 1, title: "Margherita Pizza", category: "Pizza", price: "₹299", image: "src/Images/Pizza1.webp"},
    { id: 2, title: "Paneer Makhani Pizza", category: "Pizza", price: "₹249", image: "src/Images/Pizza2.webp" },
    { id: 3, title: "Farm House", category: "Pizza", price: "₹249", image: "src/Images/Pizza3.webp" },
  ],
  Pasta: [
    { id: 4, title: "Pasta Alfredo", category: "Pasta", price: "₹249", image: "src/Images/pasta.jpg" },
    { id: 5, title: "Red Sauce Pasta", category: "Pasta", price: "₹229", image: "src/Images/pasta2.jpg" },
  ],
  Cake: [
    { id: 6, title: "Chocolate Cake", category: "Cake", price: "₹149", image: "src/Images/item-4.webp" },
    { id: 7, title: "Vanilla Cake", category: "Cake", price: "₹129", image: "src/Images/cake2.jpg" },
  ],
};
const DataProvider = ({children}) => {

  return (
   <DataContext.Provider value={{menuItems,subcategories}}>
    {children}
   </DataContext.Provider>
  )
}

export default DataProvider;
