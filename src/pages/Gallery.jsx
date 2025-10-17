import { motion } from "framer-motion";

const Gallery = () => {
  const images = [
    { src: "src/Images/gallery-1.webp", alt: "Delicious Pizza" },
    { src: "src/Images/gallery-2.webp", alt: "Tasty Burgers" },
    { src: "src/Images/gallery-3.jpg", alt: "Refreshing Drinks" },
    { src: "src/Images/gallery-4.jpg", alt: "Pasta Love" },
    { src: "src/Images/gallery-5.jpg", alt: "Sweet Desserts" },
    { src: "src/Images/gallery-6.webp", alt: "Restaurant Ambience" },
  ];

  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Gallery 📸
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-md"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.6 }}
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover rounded-xl group-hover:scale-110 transition duration-500"
              />

{/*.inset-0 = top:0; right:0; bottom:0; left:0;.*/}
              {/* Overlay */}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold transition duration-500">
                {img.alt}
              </div> */
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Gallery;
