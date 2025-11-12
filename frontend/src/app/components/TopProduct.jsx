"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/src/app/lib/axios"; // ✅ central axios instance import

const TopProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await api.get("/api/products/top"); // ✅ baseURL handle karega
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching top products:", err);
      }
    };
    fetchTopProducts();
  }, []);

  const headingVariant = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const subtextVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
  };

  const containerVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white min-h-screen flex items-start justify-center pt-16 pb-12">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] text-center">
        {/* Heading */}
        <motion.h2
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-[28px] sm:text-[34px] md:text-[42px] text-amber-900 font-extrabold mt-6 sm:mt-10"
        >
          Premium Dry Fruits Collection
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={subtextVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-3 sm:mt-5 text-[14px] sm:text-[16px] text-gray-600 tracking-wide px-3 sm:px-0"
        >
          Discover handpicked dry fruits and exotic nuts, packed with freshness
          and premium taste to make every bite healthy & luxurious.
        </motion.p>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mt-8 sm:mt-12">
          <button className="py-2.5 sm:py-3 px-6 sm:px-8 bg-amber-600 text-white font-medium shadow-lg rounded-full hover:bg-amber-700 transition text-sm sm:text-base">
            Dry Seeds
          </button>
          <button className="border-2 border-amber-700 py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-amber-700 font-medium hover:bg-amber-100 transition text-sm sm:text-base">
            Shop Now
          </button>
        </div>

        {/* Product Grid */}
        <motion.div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            gap-6 sm:gap-8 mt-12 sm:mt-16 justify-items-center
          "
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id || index}
              variants={cardVariant}
              initial="initial"
              whileHover="hover"
              className="relative 
              w-[85%] sm:w-[220px] md:w-[210px] 
              h-auto sm:h-[350px] 
              rounded-xl p-3 bg-gradient-to-br from-white to-amber-50 
              cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl 
              hover:scale-105 transition-transform duration-300"
            >
              {/* Border Animation */}
              <motion.span
                variants={{
                  initial: { width: 0 },
                  hover: {
                    width: "100%",
                    transition: { duration: 0.45, ease: "easeInOut" },
                  },
                }}
                className="absolute bottom-0 left-0 h-[2px] bg-[#ffd700]"
              />
              <motion.span
                variants={{
                  initial: { height: 0 },
                  hover: {
                    height: "100%",
                    transition: { duration: 0.45, ease: "easeInOut" },
                  },
                }}
                className="absolute top-0 right-0 w-[2px] bg-[#ffd700]"
              />
              <motion.span
                variants={{
                  initial: { width: 0 },
                  hover: {
                    width: "100%",
                    transition: { duration: 0.45, ease: "easeInOut" },
                  },
                }}
                className="absolute top-0 right-0 h-[2px] bg-[#9F4103]"
              />
              <motion.span
                variants={{
                  initial: { height: 0 },
                  hover: {
                    height: "100%",
                    transition: { duration: 0.45, ease: "easeInOut" },
                  },
                }}
                className="absolute bottom-0 left-0 w-[2px] bg-[#9F4103]"
              />

              {/* Product Image */}
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={`${
                  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
                }${product.image}`}
                alt={product.title}
                className="w-full sm:w-[180px] md:w-full h-[200px] sm:h-[200px] md:h-[220px] object-cover rounded-lg shadow-md"
              />

              {/* Product Content */}
              <div className="mt-3 sm:mt-4 text-left px-1">
                <h3 className="text-[16px] sm:text-lg font-bold text-amber-800 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-[13px] sm:text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-[16px] sm:text-xl font-semibold text-amber-900 mt-2 sm:mt-3">
                  Rs {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopProduct;
