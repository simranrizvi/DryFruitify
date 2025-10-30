"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);

    await addToCart(product._id, 1);

    setLoading(false);
    setIsAdded(true);

    // 🎉 Toast alert
    toast.success("🛒 Added to Cart Successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });

    // reset after 2s
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
    >
      {/* border animations */}
      <motion.span
        variants={{
          initial: { width: 0 },
          hover: { width: "100%", transition: { duration: 0.15, ease: "easeInOut" } },
        }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#ffd700]"
      />
      <motion.span
        variants={{
          initial: { height: 0 },
          hover: { height: "100%", transition: { duration: 0.15, ease: "easeInOut" } },
        }}
        className="absolute top-0 right-0 w-[2px] bg-[#ffd700]"
      />
      <motion.span
        variants={{
          initial: { width: 0 },
          hover: { width: "100%", transition: { duration: 0.15, ease: "easeInOut" } },
        }}
        className="absolute top-0 right-0 h-[2px] bg-[#9F4103]"
      />
      <motion.span
        variants={{
          initial: { height: 0 },
          hover: { height: "100%", transition: { duration: 0.15, ease: "easeInOut" } },
        }}
        className="absolute bottom-0 left-0 w-[2px] bg-[#9F4103]"
      />

      <Link href={`/product/${product._id}`}>
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
      </Link>

      <h2 className="text-lg text-amber-700 font-semibold mt-3">{product.title}</h2>
      <p className="text-gray-700 mb-3">{product.description}</p>
      <p className="text-gray-700 mb-3">${product.price}</p>

      {/* 👇 Enhanced Button */}
      <button
        type="button"
        className={`w-full py-2 rounded-full font-medium transition 
          ${isAdded ? "bg-green-600" : "bg-amber-800 hover:bg-amber-900"} 
          text-white cursor-pointer flex items-center justify-center gap-2`}
        onClick={handleAdd}
        disabled={loading}
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : isAdded ? (
          "✅ Added to Cart"
        ) : (
          "Add to Cart"
        )}
      </button>

      {/* Toast Container (1 hi jagah load hoga) */}
      
    </motion.div>
  );
}
