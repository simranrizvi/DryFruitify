"use client";

import React from "react";
import { motion } from "framer-motion";

const Paraller = () => {
  return (
    <section
      className="h-[90vh] w-full bg-center bg-no-repeat bg-cover 
      bg-[linear-gradient(to_right,rgba(0,0,0,0.6),rgba(0,0,0,0.3)),url('/bestt.jpg')] 
      flex items-center"
    >
      <div
        className="px-6 sm:px-10 md:px-16 lg:px-24 py-[80px] 
        text-center md:text-left w-full"
      >
        {/* Small Heading */}
        <motion.p
          className="font-bold text-[20px] sm:text-[22px] md:text-[25px] text-white"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          VIP Dry Fruits
        </motion.p>

        {/* Main Heading */}
        <motion.h4
          className="py-[20px] sm:py-[25px] text-amber-400 font-extrabold 
          text-[28px] sm:text-[36px] md:text-[44px] leading-tight"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Get 10% Off <br className="hidden sm:block" /> On All Premium Dry Fruits
        </motion.h4>

        {/* Description */}
        <motion.p
          className="text-[15px] sm:text-[17px] md:text-[18px] font-normal text-white max-w-[600px] mx-auto md:mx-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Enjoy handpicked, high-quality dry fruits packed with freshness. <br className="hidden sm:block" />
          Perfect for gifting, health, and everyday snacking.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 sm:gap-5 mt-[40px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <a href="#">
            <button className="py-3 px-8 text-white border-2 border-amber-700 hover:bg-amber-300 hover:text-amber-900 transition-colors duration-300 rounded-full cursor-pointer w-[160px]">
              View More
            </button>
          </a>

          <a href="product">
            <button className="cursor-pointer text-white border-2 border-white py-3 px-8 hover:bg-amber-300 hover:text-amber-900 transition-colors duration-300 rounded-full w-[160px]">
              Shop Now
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Paraller;
