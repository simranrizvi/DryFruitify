"use client";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ✨ reusable classes for nav links
  const linkClass = (path) =>
    `${pathname === path ? "text-yellow-500 underline underline-offset-8" : "text-black"} 
     hover:text-yellow-500 transition duration-300`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/product?keyword=${searchTerm}`;
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[85%] fixed top-8 left-0 right-0 mx-auto 
                 rounded-full z-50 px-6 pr-8 flex justify-between items-center 
                 shadow-md bg-white border border-gray-200"
    >
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold tracking-wide transition duration-300">
        <Image src="/logo.png" alt="VIP Dry Fruits Logo" width={65} height={65} />
      </Link>

     

      {/* Nav Links */}
      <div className="flex gap-9 pr-6 items-center text-base">
        <Link className={linkClass("/")} href="/">Home</Link>
        <Link className={linkClass("/product")} href="/product">Shop</Link>
        <Link className={linkClass("/contactUs")} href="/contactUs">Contact Us</Link>
        <Link className={linkClass("/about")} href="/about">About Us</Link>

         {/* Search Box */}
      <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none px-2 text-sm text-black"
        />
        <button type="submit" className="text-yellow-500 font-semibold">Search</button>
      </form>

        {/* Cart Icon */}
        <Link href="/cart" className="relative hover:text-yellow-500 transition duration-300">
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* User Icon Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenUserMenu((prev) => !prev)}
            className="hover:text-yellow-500 transition duration-300"
          >
            <FaUserCircle size={26} />
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50">
              {isLoggedIn ? (
                <>
                  <p className="px-4 py-2 text-sm text-gray-700">👤 {user?.name || "User"}</p>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                  <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
