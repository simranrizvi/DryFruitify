"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="h-screen w-full bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="text-center flex flex-col items-center px-4 sm:px-6 lg:px-0">
        {/* Blur Box Wrapper */}
        <div className="bg-black/15 backdrop-blur-[2px] rounded-2xl p-4 sm:p-6 md:p-8">
          {/* Animated heading */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-white font-spicy font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide"
          >
            Premium Dry Fruits
          </motion.h1>

          <motion.hr
            className="border-t-2 border-red-500 w-36 sm:w-44 md:w-52 mt-2 mx-auto"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 208, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          />

          <motion.p
            className="text-[rgb(244,179,35)] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            FLAT 15% OFF
          </motion.p>

          <motion.hr
            className="border-t-2 border-red-500 w-36 sm:w-44 md:w-52 mx-auto mt-2"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 208, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <motion.p
            className="mt-3 text-[rgb(244,179,35)] font-normal text-lg sm:text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            USE COUPON : <span className="text-white font-semibold">DRY15</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
