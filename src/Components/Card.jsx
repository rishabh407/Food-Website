import React from 'react'

const Card = ({image,title,description,price}) => {
  return (
        <div className="shadow-lg h-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <img src={image} alt={title} className="object-cover w-full h-56" />
      <div className="flex flex-col py-7">
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="text-[0.8rem] sm:text-[1rem] px-2">{description}</p>
        <p className="text-red-500 font-bold">{price}</p>
        {/* <button className='bg-red-500 text-white px-4 py-2 max-w-30 mx-auto rounded cursor-pointer'>Order Now</button> */}
      </div>
    </div>
  )
}

export default Card
