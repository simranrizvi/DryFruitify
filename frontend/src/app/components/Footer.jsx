"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-amber-800 text-white py-12 mt-20">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-yellow-400 cursor-pointer">
            VIP Dry Fruits
          </h1>
          <p>
            Delivering handpicked, premium quality dry fruits with care and
            freshness. Join our community for exclusive offers and healthy
            living tips.
          </p>
          <div className="flex gap-4 text-2xl mt-2">
            <a href="#" className="hover:text-yellow-300 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-yellow-300 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              About
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              Services
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              Our Team
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            Our Services
          </h2>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-yellow-300 cursor-pointer transition">
              Premium Dry Fruits
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              Customized Gift Boxes
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              Nationwide Fast Delivery
            </li>
            <li className="hover:text-yellow-300 cursor-pointer transition">
              Corporate & Event Orders
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">
            Contact Us
          </h2>
          <p>Email: imranrizvi.com</p>
          <p>Phone: +92 3488575863</p>
          <p>Address: Gulshan e Iqbal</p>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-yellow-300">
        &copy; {new Date().getFullYear()} VIPBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
