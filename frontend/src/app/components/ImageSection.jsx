"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const ImageSection = () => {
  return (
    <div>
      <motion.section
        className="w-full max-w-[80%] mx-auto grid grid-cols-3 mb-[100px] mt-[100px] space-x-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Large Image */}
        <motion.div className="relative group overflow-hidden rounded-sm" variants={imageVariants}>
          <Image
            src="/dried-walnut.jpg"
            alt="logo"
            width={300}
            height={300}
            className="h-[600px] w-full object-cover"
          />

          {/* Text Overlay */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/85 w-[300px] py-4 pl-3 rounded z-20"
            variants={textVariants}
          >
            <h4 className="font-bold text-[30px] text-amber-300">The Flavors of Spices</h4>
            <p className="text-[20px] font-bold text-white">
              50% FLAT OFFER <br />
              ALL PRODUCTS
            </p>
            <a href="#">
              <motion.button
                className="cursor-pointer mt-9 text-white border-2 border-amber-600 py-2 px-6 hover:bg-amber-300 transition-colors duration-300 rounded-full"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Shop Now
              </motion.button>
            </a>
          </motion.div>

          {/* Tailwind Hover Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/65 -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out z-10"></div>
        </motion.div>

        {/* Right Two Columns */}
        <div className="grid grid-rows-2 gap-5">
          {[{ src: "/crispyApple.jpg", title: "Crispy Apple" }, { src: "/dried-almond.jpg", title: "Almond" }].map(
            (item, index) => (
              <motion.div key={index} className="relative group overflow-hidden" variants={imageVariants}>
                <Image
                  src={item.src}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="h-[280px] w-full object-cover rounded-sm"
                />

                {/* Text Overlay */}
                <motion.div
                  className="absolute bottom-6 right-6 bg-black/85 flex flex-col text-center w-[180px] py-4 px-3 rounded z-20 items-center"
                  variants={textVariants}
                >
                  <h4 className="font-bold text-[25px] text-white">{item.title}</h4>
                  <a href="product">
                    <motion.button
                      className="cursor-pointer mt-4 text-white border-2 border-amber-600 py-2 px-6 hover:bg-amber-300 transition-colors duration-300 rounded-full"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Shop Now
                    </motion.button>
                  </a>
                </motion.div>

                {/* Tailwind Hover Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/65 bg-opacity-30 -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out z-10"></div>
              </motion.div>
            )
          )}
        </div>

        <div className="grid grid-rows-2 gap-5">
          {[{ src: "/apricote.jpg", title: "Apricote" }, { src: "/DriedMalburries.jpg", title: "Malburries" }].map(
            (item, index) => (
              <motion.div key={index} className="relative group overflow-hidden" variants={imageVariants}>
                <Image
                  src={item.src}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="h-[280px] w-full object-cover rounded-sm"
                />

                {/* Text Overlay */}
                <motion.div
                  className="absolute bottom-6 right-6 bg-black/85 flex flex-col text-center w-[180px] py-4 px-3 rounded z-20 items-center"
                  variants={textVariants}
                >
                  <h4 className="font-bold text-[25px] text-white">{item.title}</h4>
                  <a href="#">
                    <motion.button
                      className="cursor-pointer mt-4 text-white border-2 border-amber-600 py-2 px-6 hover:bg-amber-300 transition-colors duration-300 rounded-full"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Shop Now
                    </motion.button>
                  </a>
                </motion.div>

                {/* Tailwind Hover Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/65 bg-opacity-30 -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out z-10"></div>
              </motion.div>
            )
          )}
        </div>
      </motion.section>

      {/* Cardon Section */}
       <section className="h-[85vh] relative w-full overflow-hidden">
      {/* Background Video */}
      <motion.video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video.mp4"   // 👈 apna video public folder me rakho
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: false }}
      />

      {/* Dark Overlay */}
       <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>

      {/* Content */}
      <div className="relative h-full z-10 flex flex-col justify-center items-center">
        <motion.h4
          className="font-bold text-[50px] text-white"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.8 } }}
          viewport={{ once: false }}
        >
          Cardamom / Clove / Cumin
        </motion.h4>

        <motion.h6
          className="font-bold text-[70px] text-amber-300"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }}
          viewport={{ once: false }}
        >
          50% OFF
        </motion.h6>

        <motion.p
          className="font-normal text-[30px] text-amber-300"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.5 } }}
          viewport={{ once: false }}
        >
          ALL PRODUCTS
        </motion.p>

        <div className="flex gap-5 mt-[30px]">
          <motion.a whileHover={{ scale: 1.05 }}>
            <button className="py-3 px-8 text-white border-2 border-amber-700 hover:bg-amber-300 transition-colors duration-300 rounded-full cursor-pointer">
              View More
            </button>
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }}>
            <button className="cursor-pointer text-white border-2 border-white py-3 px-8 hover:bg-amber-300 transition-colors duration-300 rounded-full">
              Shop Now
            </button>
          </motion.a>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ImageSection;
