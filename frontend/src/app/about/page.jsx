"use client";

import { motion } from "framer-motion";
import { FaBullseye, FaLightbulb, FaUsers } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] sm:h-[60vh] md:h-[65vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.35)), url('/about.webp')",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white text-center tracking-wide px-4"
        >
          About <span className="text-yellow-400 drop-shadow-lg">Our Store</span>
        </motion.h1>
      </div>

      {/* Brand Story */}
      <section className="py-16 sm:py-20 px-4 sm:px-10 md:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-12 text-amber-700"
        >
          Our Story
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Quality First",
              desc: "We source only premium dry fruits directly from farmers.",
            },
            {
              title: "Customer Trust",
              desc: "Thousands of happy customers all over the country.",
            },
            {
              title: "Innovation",
              desc: "Blending tradition with modern packaging and delivery.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/80 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-lg border border-amber-100 hover:scale-[1.05] hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-amber-700">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Image + Text Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-10 md:px-20 bg-gradient-to-r from-white to-amber-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/about.jpeg"
              alt="Dry Fruits"
              className="rounded-3xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-amber-700">
              Tradition Meets Taste
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              For generations, we’ve been dedicated to bringing you the{" "}
              <span className="text-yellow-500 font-semibold">
                finest dry fruits
              </span>{" "}
              sourced from trusted farms. Every almond, cashew, and raisin tells
              a story of purity, freshness, and love.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              Our goal is not just to deliver a product, but to{" "}
              <span className="text-amber-600 font-semibold">
                share a healthy lifestyle
              </span>{" "}
              and premium experience with every customer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-gray-100 px-4 sm:px-10 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 text-center">
          {[
            {
              icon: <FaBullseye className="text-5xl sm:text-6xl text-yellow-500 mx-auto" />,
              title: "Our Mission",
              desc: "To deliver health, taste, and quality in every bite.",
            },
            {
              icon: <FaLightbulb className="text-5xl sm:text-6xl text-yellow-500 mx-auto" />,
              title: "Our Vision",
              desc: "To be the #1 trusted dry fruit brand worldwide.",
            },
            {
              icon: <FaUsers className="text-5xl sm:text-6xl text-yellow-500 mx-auto" />,
              title: "Our Values",
              desc: "Honesty, Transparency, and Commitment to Excellence.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {item.icon}
              <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-amber-700">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Animated Counters */}
      <section className="py-16 sm:py-20 px-4 sm:px-10 md:px-20 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { number: 10, label: "Years of Excellence" },
            { number: 250, label: "Products Delivered" },
            { number: 5000, label: "Happy Customers" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gradient-to-b from-white to-amber-50 p-6 sm:p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
            >
              <h3>
                <span className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-yellow-500 drop-shadow-sm">
                  {stat.number}+
                </span>
              </h3>
              <p className="mt-2 sm:mt-3 text-gray-700 text-sm sm:text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 text-center text-white overflow-hidden px-4">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-60 sm:h-60 bg-white/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-xl sm:max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
            Taste the Premium Quality of Nature 🌿
          </h2>
          <p className="text-sm sm:text-lg text-white/90 mb-6 sm:mb-8">
            Join thousands of happy customers who trust us for fresh, organic dry fruits delivered to their doorstep.
          </p>
          <motion.a
            href="/product"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-yellow-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-md sm:shadow-xl hover:shadow-2xl transition"
          >
            Explore Our Collection
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
