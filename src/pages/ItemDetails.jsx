import React, { useContext } from 'react'
import DataContext from '../CreateContext/DataContext'
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
  const { categoryName } = useParams();
  const{subcategories}=useContext(DataContext);
  const items=subcategories[categoryName];
  if (!items) {
  return <p>No items found for {items}</p>; // or show a loader
}
// console.log(categoryName);
  return (
    <div className='flex flex-col text-5xl text-black'>
      {items.map((item,index)=>(
        <li key={index}>
        <p>{item.title}</p>
        </li>
      ))}
      <p>{categoryName}</p>
    </div>
  )
}

export default ItemDetails
