import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "Images/gallery-1.webp", alt: "Delicious Pizza" },
    { src: "Images/gallery-2.webp", alt: "Tasty Burgers" },
    { src: "Images/gallery-3.jpg", alt: "Refreshing Drinks" },
    { src: "Images/gallery-4.jpg", alt: "Pasta Love" },
    { src: "Images/gallery-5.jpg", alt: "Sweet Desserts" },
    { src: "Images/gallery-6.webp", alt: "Restaurant Ambience" },
  ];

  return (
    <div className="mt-20">
      <motion.section
        className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Our Gallery 📸
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Take a visual journey through our delicious offerings and beautiful restaurant
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 20 },
                  show: { opacity: 1, scale: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedImage(img)}
              >
                {/* Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modal for Full Image */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-2xl"
              />
              <p className="text-white text-center mt-4 text-xl font-semibold">
                {selectedImage.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default Gallery;
