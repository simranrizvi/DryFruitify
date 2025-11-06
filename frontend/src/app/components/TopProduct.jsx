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
    <section className="bg-gradient-to-b from-amber-50 to-white min-h-screen flex items-start justify-center pt-16 mb-30">
      <div className="max-w-[80%] text-center">
        {/* Heading */}
        <motion.h2
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-[42px] text-amber-900 font-extrabold mt-10"
        >
          Premium Dry Fruits Collection
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={subtextVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-5 text-[16px] text-gray-600 tracking-wide"
        >
          Discover handpicked dry fruits and exotic nuts, packed with freshness
          and premium taste to make every bite healthy & luxurious.
        </motion.p>

        {/* Category Buttons */}
        <div className="flex justify-center gap-5 mt-12">
          <button className="py-3 px-8 bg-amber-600 text-white font-medium shadow-lg rounded-full hover:bg-amber-700 transition">
            Dry Seeds
          </button>
          <button className="border-2 border-amber-700 py-3 px-8 rounded-full text-amber-700 font-medium hover:bg-amber-100 transition">
            Spicy Masalas
          </button>
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16"
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
              className="relative h-[350px] w-[210px] rounded-xl p-3 bg-gradient-to-br from-white to-amber-50 cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
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
                src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${product.image}`} // ✅ dynamic backend image path
                alt={product.title}
                className="w-55 h-55 object-cover rounded-lg shadow-md"
              />

              {/* Product Content */}
              <div className="mt-4 text-left">
                <h3 className="text-lg font-bold text-amber-800">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description}
                </p>
                <p className="text-xl font-semibold text-amber-900 mt-3">
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
