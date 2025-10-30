// app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Providers from "./providers"; // ✅ Redux Provider import karo

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
          <CartProvider>
            <AuthProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </AuthProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
