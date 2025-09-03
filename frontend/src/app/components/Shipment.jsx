"use client";
import React from 'react';
import { FaMoneyCheckAlt, FaShippingFast } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Shipment = () => {
  const cards = [
    {
  icon: <FaMoneyCheckAlt />,
  title: 'Money Back Guarantee',
  desc: 'If you are not satisfied with your order, we offer a hassle-free money back guarantee within 7 days.',
},
{
  icon: <FaShippingFast />,
  title: 'Fast Shipping',
  desc: 'We ensure quick delivery so your fresh and premium dry fruits reach you on time.',
},
{
  icon: <BsClockHistory />,
  title: '24/7 Customer Service',
  desc: 'Our dedicated support team is available 24/7 to assist you with orders and inquiries.',
},
  ];

  // Container variant with stagger for sequential animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25 }
    }
  };

  // Card animation variant
  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120 } }
  };

  // Icon animation variant
  const iconVariants = {
    hover: { scale: 1.3, rotate: [0, 15, -15, 0], color: '#f59e0b', transition: { duration: 0.6, repeat: Infinity, repeatType: 'mirror' } }
  };

  return (
    <div className="py-20 bg-gray-50">
      <motion.h1
        className='text-center font-bold text-[40px] text-amber-800'
         initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
      >
        Why Shop With Us
      </motion.h1>

      <motion.section
        className='w-full max-w-[80%] mx-auto grid grid-cols-3 place-items-center gap-10 pt-20 pb-20'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className='flex flex-col justify-center items-center w-full max-w-[250px] bg-white p-8 rounded-xl shadow-lg cursor-pointer'
            variants={cardVariants}
            whileHover={{ scale: 1.07, rotate: 2, boxShadow: '0px 20px 40px rgba(0,0,0,0.2)' }}
          >
            <motion.div
              className='text-7xl text-amber-700 mb-4'
              variants={iconVariants}
              whileHover="hover"
            >
              {card.icon}
            </motion.div>
            <h2 className='text-amber-700 font-bold text-[22px] mt-2 text-center'>{card.title}</h2>
            <p className='mt-4 text-center text-gray-700 text-sm'>{card.desc}</p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default Shipment;
