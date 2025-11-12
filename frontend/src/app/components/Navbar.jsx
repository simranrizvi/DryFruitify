"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, checkAuth } from "@/src/features/auth/authSlice";
import { fetchCart } from "@/src/features/cart/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { items: cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchCart());
  }, [dispatch]);

  const linkClass = (path) =>
    `${pathname === path ? "text-yellow-500 underline underline-offset-8" : "text-gray-800"} 
     hover:text-yellow-500 transition duration-300`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/product?keyword=${searchTerm}`;
      setOpenMenu(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpenUserMenu(false);
  };

  return (
    <motion.nav
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="fixed top-3 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] md:w-[85%] 
  bg-white border border-gray-200 shadow-md rounded-full z-50 
  flex items-center justify-between px-4 sm:px-6 md:px-8 sm:py-0 md:py-1"
>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold">
        <Image src="/logo.png" alt="VIP Dry Fruits Logo" width={50} height={50} className="w-10 sm:w-12" />
      </Link>

      {/* Hamburger Menu (Mobile) */}
      <button
        className="md:hidden text-gray-700 hover:text-yellow-500 transition duration-300"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {openMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 font-semibold text-base">
        <Link href="/" className={linkClass("/")}>Home</Link>
        <Link href="/product" className={linkClass("/product")}>Shop</Link>
        <Link href="/contactUs" className={linkClass("/contactUs")}>Contact</Link>
        <Link href="/about" className={linkClass("/about")}>About</Link>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-100 rounded-full px-3 py-1 border border-yellow-200"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none px-2 text-sm text-gray-800 w-[100px] lg:w-[150px]"
          />
          <button type="submit" className="text-yellow-500 font-semibold text-sm">Go</button>
        </form>

        {/* Cart */}
        <Link href="/cart" className="relative hover:text-yellow-500 transition duration-300">
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setOpenUserMenu((prev) => !prev)}
            className="hover:text-yellow-500 transition duration-300"
          >
            <FaUserCircle size={24} />
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50">
              {isLoggedIn ? (
                <>
                  <p className="px-4 py-2 text-sm text-gray-700">👤 {user?.name || "User"}</p>
                  <button
                    onClick={handleLogout}
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

      {/* Mobile Menu */}
      {openMenu && (
        <div className="absolute top-[70px] left-0 w-full bg-white border-t border-gray-200 shadow-lg 
        flex flex-col items-center gap-5 py- text-base font-semibold md:hidden z-40">
          <Link href="/" onClick={() => setOpenMenu(false)} className={linkClass("/")}>Home</Link>
          <Link href="/product" onClick={() => setOpenMenu(false)} className={linkClass("/product")}>Shop</Link>
          <Link href="/contactUs" onClick={() => setOpenMenu(false)} className={linkClass("/contactUs")}>Contact</Link>
          <Link href="/about" onClick={() => setOpenMenu(false)} className={linkClass("/about")}>About</Link>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100 rounded-full px-3 py-1 border border-yellow-200"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none px-2 text-sm text-gray-800 w-[140px]"
            />
            <button type="submit" className="text-yellow-500 font-semibold text-sm">Go</button>
          </form>

          {/* Cart & User */}
          <div className="flex items-center gap-6">
            <Link href="/cart" onClick={() => setOpenMenu(false)} className="relative hover:text-yellow-500 transition duration-300">
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setOpenUserMenu((prev) => !prev)}
                className="hover:text-yellow-500 transition duration-300"
              >
                <FaUserCircle size={24} />
              </button>

              {openUserMenu && (
                <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50">
                  {isLoggedIn ? (
                    <>
                      <p className="px-4 py-2 text-sm text-gray-700">👤 {user?.name || "User"}</p>
                      <button
                        onClick={handleLogout}
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
        </div>
      )}
    </motion.nav>
  );
}
