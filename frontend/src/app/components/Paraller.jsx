"use client";

import React from 'react'
import { motion } from "framer-motion"

const Paraller = () => {
  return (
    <div>
      <section className="h-[90vh] w-full bg-relative bg-center bg-no-repeat bg-cover 
      bg-[linear-gradient(to_right,rgba(0,0,0,0.6),rgba(0,0,0,0.3)),url('/bestt.jpg')]">

        <div className='py-[100px] px-24'>
          
          {/* Small Heading */}
          <motion.p 
            className='font-bold text-[25px] text-white'
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }} // 👈 dobara trigger karega
          >
            VIP Dry Fruits
          </motion.p>
          
          {/* Main Heading */}
          <motion.h4 
            className='py-[30px] text-amber-400 font-extrabold text-[44px]'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Get 10% Off <br/> On All Premium Dry Fruits
          </motion.h4>
          
          {/* Description */}
          <motion.p 
            className='text-[18px] font-normal text-white'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Enjoy handpicked, high-quality dry fruits packed with freshness. <br/>
            Perfect for gifting, health, and everyday snacking. 
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className='flex gap-5 mt-[60px]'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }} 
            viewport={{ once: false, amount: 0.3 }}
          >
            <a href="#">
              <button className="py-3 px-8 text-white border-2 border-amber-700 hover:bg-amber-300 transition-colors duration-300 rounded-full cursor-pointer">
                View More
              </button>
            </a>

            <a href="product">
              <button className="cursor-pointer text-white border-2 border-white py-3 px-8 hover:bg-amber-300 transition-colors duration-300 rounded-full">
                Shop Now
              </button>
            </a>
          </motion.div>
        </div>

      </section>
    </div>
  )
}

export default Paraller
