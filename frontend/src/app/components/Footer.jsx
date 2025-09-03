"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-amber-800 text-white py-16 mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Logo & Description */}
       <motion.div
  className="flex flex-col gap-4"
  whileHover={{ scale: 1.05 }}
>
  <h1 className="text-3xl font-bold text-yellow-400 cursor-pointer">VIP Dry Fruits</h1>
  <p>
    Delivering handpicked, premium quality dry fruits with care and freshness. 
    Join our community for exclusive offers and healthy living tips.
  </p>
  <div className="flex gap-4 text-2xl mt-2">
    <motion.a whileHover={{ scale: 1.3, rotate: 10 }} href="#">
      <FaFacebook />
    </motion.a>
    <motion.a whileHover={{ scale: 1.3, rotate: 10 }} href="#">
      <FaTwitter />
    </motion.a>
    <motion.a whileHover={{ scale: 1.3, rotate: 10 }} href="#">
      <FaInstagram />
    </motion.a>
    <motion.a whileHover={{ scale: 1.3, rotate: 10 }} href="#">
      <FaLinkedin />
    </motion.a>
  </div>
</motion.div>


        {/* Quick Links */}
        <motion.div
          className="flex flex-col gap-4"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">Quick Links</h2>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-yellow-300 cursor-pointer transition">Home</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">About</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Services</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Our Team</li>
            <li className="hover:text-yellow-300 cursor-pointer transition">Contact</li>
          </ul>
        </motion.div>

        {/* Services */}
       <motion.div
  className="flex flex-col gap-4"
  whileHover={{ scale: 1.05 }}
>
  <h2 className="text-xl font-semibold text-yellow-400 mb-2">Our Services</h2>
  <ul className="flex flex-col gap-2">
    <li className="hover:text-yellow-300 cursor-pointer transition">Premium Dry Fruits</li>
    <li className="hover:text-yellow-300 cursor-pointer transition">Customized Gift Boxes</li>
    <li className="hover:text-yellow-300 cursor-pointer transition">Nationwide Fast Delivery</li>
    <li className="hover:text-yellow-300 cursor-pointer transition">Corporate & Event Orders</li>
  </ul>
</motion.div>

        {/* Contact */}
        <motion.div
          className="flex flex-col gap-4"
         
        >
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">Contact Us</h2>
          <p>Email: imranrizvi.com</p>
          <p>Phone: 923488575863</p>
          <p>Address: Gulshan e Iqbal</p>
        </motion.div>

      </div>

      <motion.div
        className="mt-12 text-center text-sm text-yellow-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        &copy; {new Date().getFullYear()} VIPBrand. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
