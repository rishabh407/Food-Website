import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const Carousel = ({ items }) => {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // duplicate items for seamless infinite scroll
  const displayItems = [...items, ...items];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollSpeed = 1.5;// pixels per frame
    let reqId;

    const scroll = () => {
      if (!isPaused) {
        carousel.scrollLeft += scrollSpeed;

        // reset scroll seamlessly
        if (carousel.scrollLeft >= carousel.scrollWidth / 4) {
          carousel.scrollLeft = 0;
        }
      }
      reqId = requestAnimationFrame(scroll);
    };

    scroll(); // start auto-scroll

    return () => cancelAnimationFrame(reqId);
  }, [isPaused]);

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden flex gap-6 cursor-grab"
      style={{ scrollBehavior: "auto" }} // use auto to avoid jumps
    >
      {displayItems.map((item, index) => (
        <motion.div
          key={index}
          className="min-w-[220px] bg-white rounded-2xl shadow-lg p-4 text-center"
          whileHover={{ scale: 1.10}}
          onMouseEnter={() => setIsPaused(true)} // pause on hover
          onMouseLeave={() => setIsPaused(false)} // resume
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-50 object-cover rounded-xl"
          />
          <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-500">{item.price}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Carousel;


