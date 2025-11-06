"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/src/app/components/ui/card";
import { TrendingUp, Users, Package, ShoppingCart } from "lucide-react";

export default function StatsCard({ title, value }) {
  // Icon choose karne ke liye small mapping logic
  const icons = {
    "Total Users": <Users className="w-6 h-6 text-blue-600" />,
    "Total Products": <Package className="w-6 h-6 text-green-600" />,
    "Total Orders": <ShoppingCart className="w-6 h-6 text-purple-600" />,
  };

  const icon = icons[title] || <TrendingUp className="w-6 h-6 text-gray-600" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
          </div>
          <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
