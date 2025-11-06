"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBox, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";

const links = [
  { name: "Dashboard", href: "/admin", icon: <FaChartLine /> },
  { name: "Products", href: "/admin/products", icon: <FaBox /> },
  { name: "Orders", href: "/admin/orders", icon: <FaShoppingCart /> },
  { name: "Users", href: "/admin/users", icon: <FaUsers /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 p-2 rounded-md ${
              pathname === link.href ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
