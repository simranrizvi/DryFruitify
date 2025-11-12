"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart, fetchCart } from "@/src/features/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAdd = async () => {
    setLoading(true);

    await dispatch(addToCart({ productId: product._id, quantity: 1 }));

    setLoading(false);
    setIsAdded(true);

    toast.success("🛒 Product Added to Cart!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: { background: "#FFA500", color: "#fff" },
    });

    setTimeout(() => setIsAdded(false), 500);
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
    >
      {/* 🔹 Border hover animation */}
      <motion.span
        variants={{
          initial: { width: 0 },
          hover: { width: "100%", transition: { duration: 0.15 } },
        }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#ffd700]"
      />
      <motion.span
        variants={{
          initial: { height: 0 },
          hover: { height: "100%", transition: { duration: 0.15 } },
        }}
        className="absolute top-0 right-0 w-[2px] bg-[#ffd700]"
      />
      <motion.span
        variants={{
          initial: { width: 0 },
          hover: { width: "100%", transition: { duration: 0.15 } },
        }}
        className="absolute top-0 right-0 h-[2px] bg-[#9F4103]"
      />
      <motion.span
        variants={{
          initial: { height: 0 },
          hover: { height: "100%", transition: { duration: 0.15 } },
        }}
        className="absolute bottom-0 left-0 w-[2px] bg-[#9F4103]"
      />

      {/* 🔹 Product Image */}
      <Link href={`/product/${product._id}`} className="block">
        <div className="relative w-full h-36 sm:h-44 md:h-52 overflow-hidden rounded-md">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover rounded-md transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>

      {/* 🔹 Product Info */}
      <div className="flex-grow mt-3 flex flex-col justify-between">
        <div>
          <h2 className="text-sm sm:text-base md:text-lg text-amber-700 font-semibold truncate">
            {product.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
          <p className="text-sm sm:text-base text-gray-800 font-semibold mt-2">
            Rs {product.price}
          </p>
        </div>

        {/* 🔹 Add to Cart Button */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={loading}
          className={`w-full mt-3 py-1.5 sm:py-2 rounded-full font-medium transition text-white flex items-center justify-center gap-2 text-xs sm:text-sm 
            ${isAdded ? "bg-yellow-500" : "bg-amber-800 hover:bg-amber-900"}`}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : isAdded ? (
            "✅ Added"
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>

      {/* Toast container (once per component tree ideally, but safe here) */}
      <ToastContainer />
    </motion.div>
  );
}
