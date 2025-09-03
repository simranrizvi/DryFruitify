"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSend, FiPhone, FiMail, FiMapPin, FiMessageCircle, FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      await new Promise((r) => setTimeout(r, 1500)); // simulate API call delay

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const supportLinks = [
    { title: "Returns", href: "/support/returns", icon: <FiShoppingBag className="text-xl" /> },
    { title: "Shipping", href: "/support/shipping", icon: <FiShoppingBag className="text-xl" /> },
    { title: "Payment Issues", href: "/support/payment-issues", icon: <FiShoppingBag className="text-xl" /> },
    { title: "Product Inquiry", href: "/support/product-inquiry", icon: <FiShoppingBag className="text-xl" /> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('/about.webp')",
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white"
          >
            We're <span className="text-amber-400">Here To</span> Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl mt-4 text-white/90 text-lg sm:text-xl"
          >
            Get in touch with our friendly support team for assistance with your orders
          </motion.p>
        </div>
      </section>

      {/* Support Categories */}
      <section className="container mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
        {supportLinks.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              className="group block bg-gradient-to-br h-48 from-amber-50 to-white  shadow-xl  rounded-2xl p-6 text-center hover:shadow-xlg  transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-amber-900">{item.title}</h3>
              <p className="mt-2 text-sm text-black opacity-80 group-hover:opacity-100 transition-opacity">
                Get support with your {item.title.toLowerCase()}
              </p>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-4 py-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" from-white/90 to-amber-50 p-8 rounded-3xl  shadow-2xl"
        >
          <div className="flex items-center mb-6">
            <div className="h-10 w-1  mr-3 rounded-full"></div>
            <h2 className="text-2xl font-bold text-amber-900">Send Us a Message</h2>
          </div>

          {isSubmitted && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-amber-100 border border-amber-400 text-amber-800 font-semibold rounded-xl p-4 mb-6 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Thank you! Your message has been sent. We'll respond within 24 hours.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-amber-900">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full  rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent outline-none transition-all ${
                  errors.name ? "border-red-500" : "border-amber-200"
                }`}
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium text-amber-900">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent outline-none transition-all ${
                  errors.email ? "border-red-500" : "border-amber-200"
                }`}
                placeholder="Your email address"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium text-amber-900">Message</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full  rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent outline-none transition-all ${
                  errors.message ? "border-red-500" : "border-amber-200"
                }`}
                placeholder="How can we help you today?"
              />
              {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <FiSend className="ml-1" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Map & Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col rounded-3xl overflow-hidden shadow-lg"
        >
          <div className="relative h-64 sm:h-80 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.9790607916784!2d67.07389711494549!3d24.894903153926347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e4eb72f7487%3A0x74aebbc646a972a8!2sClifton%2C%20Karachi%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1691757000000!5m2!1sen!2s"
              className="w-full h-full"
              loading="lazy"
              style={{ border: 0 }}
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none"></div>
          </div>

          <div className="bg-gradient-to-b pt-8  flex flex-col gap-5">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <div className="h-6 w-1 text-[#7B3306] mr-3 rounded-full"></div>
              Visit Our Store
            </h3>
            
            <div className="flex items-center gap-4 p-3  rounded-lg">
              <div className="p-2  rounded-full">
                <FiMapPin className="text-[#7B3306]" />
              </div>
              <span>123 Digital St, Clifton, Karachi, Pakistan</span>
            </div>
            
            <div className="flex items-center gap-4 p-3  rounded-lg">
              <div className="p-2 rounded-full">
                <FiPhone className="text-[#7B3306]" />
              </div>
              <span>+92 300 1234567</span>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg">
              <div className="p-2 rounded-full">
                <FiMail className="text-[#7B3306]" />
              </div>
              <span>support@shoppingstore.com</span>
            </div>
            
            
          </div>
        </motion.div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6"
      >
        <Link
          href={`https://wa.me/923488575863`}
          target="_blank"
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all group"
        >
          <FiMessageCircle size={24} />
          <span className="absolute right-16 bg-amber-900 text-white text-xs font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
            Chat with us
          </span>
        </Link>
      </motion.div>
    </main>
  );
}