"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PremiumQuality = () => {
  return (
    <>
      {/* spacer to force scroll and trigger animation */}
      <div className="h-[600px]" />

      <section className="flex justify-center items-center min-h-screen bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.25 },
            },
          }}
          className="grid grid-cols-4 gap-6"
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center"
            >
              <div className="relative w-full h-[150px] overflow-hidden">
                <Image
                  src="/1_800x.jpg"
                  alt="img"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mt-4">Card {i}</h3>
              <p className="text-center text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default PremiumQuality;
