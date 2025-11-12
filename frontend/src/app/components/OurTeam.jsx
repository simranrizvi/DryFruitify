"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const OurTeam = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants for desktop only
  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const teamMembers = [
    { name: "Syeda Maheen", role: "Marketing Head", img: "/" },
    { name: "Syed Muhammad Imran", role: "Manager", img: "/" },
    { name: "Syed Hasnain", role: "Product Manager", img: "/2" },
    { name: "Muhammad Ali", role: "Customer Support", img: "/" },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-20 my-20 flex flex-col items-center">
      {/* Section Title */}
      <h2 className="font-bold text-4xl sm:text-3xl xs:text-2xl text-amber-800 text-center">
        Our Team
      </h2>

      <p className="text-center text-base sm:text-sm xs:text-xs text-gray-600 mt-2">
        Lacus vestibulum sed arcu non sit eru racdi odio euismod.
      </p>

      {/* Team Cards */}
      {isMobile ? (
        // Mobile / Tablet: simple static cards
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 w-full">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white border-2 border-amber-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-amber-400 w-full flex justify-center items-center py-6">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="rounded-full object-cover border-2 border-transparent xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-36 md:h-36"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center py-4 px-2 w-full">
                <h2 className="font-bold text-xl sm:text-lg xs:text-base text-amber-700 mb-1">
                  {member.name}
                </h2>
                <p className="text-sm sm:text-xs xs:text-[10px] text-gray-700">
                  {member.role}
                </p>
                <div className="flex gap-3 sm:gap-2 mt-3 text-amber-700 text-lg sm:text-base xs:text-sm">
                  <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                  <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop: motion.div with animation + hover
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-white border-2 border-amber-300 rounded-lg overflow-hidden shadow-sm transition-shadow duration-300"
              variants={index % 2 === 0 ? cardVariantsLeft : cardVariantsRight}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 25px rgba(0,0,0,0.25)",
              }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <div className="bg-amber-400 w-full flex justify-center items-center py-6">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="rounded-full object-cover border-2 border-transparent xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-36 md:h-36"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-center py-4 px-2 w-full">
                <h2 className="font-bold text-xl sm:text-lg xs:text-base text-amber-700 mb-1">
                  {member.name}
                </h2>
                <p className="text-sm sm:text-xs xs:text-[10px] text-gray-700">
                  {member.role}
                </p>
                <div className="flex gap-3 sm:gap-2 mt-3 text-amber-700 text-lg sm:text-base xs:text-sm">
                  <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                  <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default OurTeam;
