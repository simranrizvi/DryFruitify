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
  const firstColumn = [{ src: "/dried-walnut.jpg", title: "The Flavors of Spices" }];
  const secondColumn = [
    { src: "/crispyApple.jpg", title: "Crispy Apple" },
    { src: "/dried-almond.jpg", title: "Almond" },
  ];
  const thirdColumn = [
    { src: "/apricote.jpg", title: "Apricote" },
    { src: "/DriedMalburries.jpg", title: "Malburries" },
  ];

  return (
    <div>
      <motion.section
        className="w-full max-w-[80%] mx-auto mb-[100px] mt-[100px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* First Column */}
        {firstColumn.map((item, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-sm"
            variants={imageVariants}
          >
            <Image
              src={item.src}
              alt={item.title}
              width={300}
              height={300}
              className="w-full h-[200px] sm:h-[300px] md:h-[600px] object-cover rounded-sm"
            />

            {/* Text Overlay */}
            <motion.div
              className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 bg-black/85 w-[300px] sm:w-[240px] xs:w-[180px] py-3 sm:py-4 xs:py-3 pl-3 rounded z-20"
              variants={textVariants}
            >
              <h4 className="font-bold text-[30px] sm:text-[24px] xs:text-[18px] text-amber-300">
                {item.title}
              </h4>
              <p className="text-[20px] sm:text-[16px] xs:text-[14px] font-bold text-white">
                50% FLAT OFFER <br />
                ALL PRODUCTS
              </p>
              <a href="#">
                <motion.button
                  className="cursor-pointer mt-6 sm:mt-4 xs:mt-3 text-white border-2 border-amber-600 py-2 px-6 sm:py-1 sm:px-4 xs:py-1 xs:px-3 hover:bg-amber-300 transition-colors duration-300 rounded-full text-sm sm:text-xs xs:text-[10px]"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Shop Now
                </motion.button>
              </a>
            </motion.div>

            <div className="absolute top-0 left-0 w-full h-full bg-black/65 -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out z-10"></div>
          </motion.div>
        ))}

        {/* Second Column */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-1 md:gap-5">
          {secondColumn.map((item, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden"
              variants={imageVariants}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={300}
                height={300}
                className="w-full h-[120px] sm:h-[180px] md:h-[280px] object-cover rounded-sm"
              />

              <motion.div
                className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-black/85 flex flex-col text-center w-[180px] sm:w-[160px] xs:w-[140px] py-3 sm:py-4 xs:py-3 px-3 rounded z-20 items-center"
                variants={textVariants}
              >
                <h4 className="font-bold text-[25px] sm:text-[20px] xs:text-[16px] text-white">
                  {item.title}
                </h4>
                <a href="product">
                  <motion.button
                    className="cursor-pointer mt-3 sm:mt-2 xs:mt-1 text-white border-2 border-amber-600 py-2 px-6 sm:py-1 sm:px-4 xs:py-1 xs:px-3 hover:bg-amber-300 transition-colors duration-300 rounded-full text-sm sm:text-xs xs:text-[10px]"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Shop Now
                  </motion.button>
                </a>
              </motion.div>

              <div className="absolute top-0 left-0 w-full h-full bg-black/65 bg-opacity-30 -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out z-10"></div>
            </motion.div>
          ))}
        </div>

        {/* Third Column */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-1 md:gap-5">
          {thirdColumn.map((item, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden"
              variants={imageVariants}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={300}
                height={300}
                className="w-full h-[120px] sm:h-[180px] md:h-[280px] object-cover rounded-sm"
              />

              <motion.div
                className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-black/85 flex flex-col text-center w-[180px] sm:w-[160px] md:w-[200px] xs:w-[140px] py-3 sm:py-4 xs:py-3 px-3 rounded z-20 items-center"
                variants={textVariants}
              >
                <h4 className="font-bold text-[25px] sm:text-[20px] xs:text-[16px] text-white">
                  {item.title}
                </h4>
                <a href="#">
                  <motion.button
                    className="cursor-pointer mt-3 sm:mt-2 xs:mt-1 text-white border-2 border-amber-600 py-2 px-6 sm:py-1 sm:px-4 xs:py-1 xs:px-3 hover:bg-amber-300 transition-colors duration-300 rounded-full text-sm sm:text-xs xs:text-[10px]"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Shop Now
                  </motion.button>
                </a>
              </motion.div>

              <div className="absolute top-0 left-0 w-full h-full bg-black/65 bg-opacity-30 -translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out z-10"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ImageSection;
