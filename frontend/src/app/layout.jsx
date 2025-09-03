
"use client";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {

  // 👉 Force scroll to top on page load / reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer/>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
