"use client";
import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const OurTeam = () => {
  // Card animation variants with left/right effect
  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Stagger container for multiple cards
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 }, // ek ke baad ek animate hoga
    },
  };

  return (
    <div>
      <section className="w-full max-w-[80%] mx-auto flex flex-col items-center justify-center my-20">
        {/* Animated heading */}
        <motion.h2
          className="font-bold text-[50px] text-amber-800"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          Our Team
        </motion.h2>

        <motion.p
          className="font-normal text-[16px] py-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Lacus vestibulum sed arcu non sit eru racdi odio euismod.
        </motion.p>

        {/* Team Cards Grid */}
        <motion.div
          className="grid grid-cols-4 gap-6 w-full mx-auto mt-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Person 1 - Left */}
          <motion.div
            className="max-w-[248px] flex flex-col items-center bg-white border-2 border-amber-300"
            variants={cardVariantsLeft}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <div className="bg-amber-400 w-full h-60 flex justify-center items-center">
              <Image
                src="/"
                alt="Team Member"
                width={160}
                height={160}
                className="rounded-full object-cover border-2 border-transparent hover:border-8 hover:border-amber-700 transition-all duration-300"
              />
            </div>
            <div className="w-60 flex flex-col justify-center items-center my-7">
              <h2 className="font-bold text-[30px] text-amber-700 mb-5">
                Syeda Maheen
              </h2>
              <p>Markeeting Head</p>
              <div className="flex gap-4 text-2xl text-amber-700 mt-4">
                <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              </div>
            </div>
          </motion.div>

          {/* Person 2 - Left */}
          <motion.div
            className="max-w-[248px] flex flex-col items-center bg-white border-2 border-amber-300"
            variants={cardVariantsLeft}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <div className="bg-amber-400 w-full h-60 flex justify-center items-center">
              <Image
                src="/"
                alt="Team Member"
                width={160}
                height={160}
                className="rounded-full object-cover border-2 border-transparent hover:border-8 hover:border-amber-700 transition-all duration-300"
              />
            </div>
            <div className="w-60 flex flex-col justify-center items-center my-7">
              <h2 className="font-bold text-[30px] text-amber-700 mb-5">
                Syed MUhammad Imran
              </h2>
              <p>Manager</p>
              <div className="flex gap-4 text-2xl text-amber-700 mt-4">
                <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              </div>
            </div>
          </motion.div>

          {/* Person 3 - Right */}
          <motion.div
            className="max-w-[248px] flex flex-col items-center bg-white border-2 border-amber-300"
            variants={cardVariantsRight}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <div className="bg-amber-400 w-full h-60 flex justify-center items-center">
              <Image
                src="/2"
                alt="Team Member"
                width={160}
                height={160}
                className="rounded-full object-cover border-2 border-transparent hover:border-8 hover:border-amber-700 transition-all duration-300"
              />
            </div>
            <div className="w-60 flex flex-col justify-center items-center my-7">
              <h2 className="font-bold text-[30px] text-amber-700 mb-5">
                Syed Hasnain
              </h2>
              <p>Product Manager</p>
              <div className="flex gap-4 text-2xl text-amber-700 mt-4">
                <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              </div>
            </div>
          </motion.div>

          {/* Person 4 - Right */}
          <motion.div
            className="max-w-[248px] flex flex-col items-center bg-white border-2 border-amber-300"
            variants={cardVariantsRight}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.25)",
            }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <div className="bg-amber-400 w-full h-60 flex justify-center items-center">
              <Image
                src="/"
                alt="Team Member"
                width={160}
                height={160}
                className="rounded-full object-cover border-2 border-transparent hover:border-8 hover:border-amber-700 transition-all duration-300"
              />
            </div>
            <div className="w-60 flex flex-col justify-center items-center my-7">
              <h2 className="font-bold text-[30px] text-amber-700 mb-5">
                Muhammad Ali{" "}
              </h2>
              <p>customer Support</p>
              <div className="flex gap-4 text-2xl text-amber-700 mt-4">
                <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default OurTeam;
