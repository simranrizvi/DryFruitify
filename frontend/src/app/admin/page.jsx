"use client";

import { useEffect, useState } from "react";
import api from "@/src/app/lib/axios";
import StatsCard from "@/src/app/components/StatsCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, products, orders, sales] = await Promise.all([
          api.get("/users"),
          api.get("/products"),
          api.get("/admin/orders/all"),
          api.get("/admin/sales-summary"),
        ]);

        setStats({
          users: users.data.length,
          products: products.data.length,
          orders: orders.data.length,
        });
        setSalesData(sales.data);
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err.message);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingCart,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          📊 Admin Dashboard
        </h1>
        <p className="text-gray-500">Overview of platform performance</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h2 className="text-3xl font-bold mt-2 text-gray-800">
                  {card.value}
                </h2>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-md`}
              >
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            📈 Monthly Sales
          </h2>
          <DollarSign className="text-blue-500 w-5 h-5" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
