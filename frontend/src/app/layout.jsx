// app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Providers from "./providers"; // ✅ Redux Provider import karo
import { ToastContainer } from "react-toastify";

// 👇 Poppins setup
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        {/* ✅ Wrap sab kuch Redux Provider ke andar */}
        <Providers>
          <Navbar />
          <main>{children}</main>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            style={{ background: "#FFA500", color: "#fff" }} // orange toast
          />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
