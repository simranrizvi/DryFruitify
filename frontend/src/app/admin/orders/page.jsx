"use client";
import { useEffect, useState } from "react";
import api from "@/src/app/lib/axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/admin/orders/all");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, field) => {
    await api.put(`/admin/orders/${id}`, { field });
    fetchOrders();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">User</th>
            <th className="p-3">Total</th>
            <th className="p-3">Paid</th>
            <th className="p-3">Delivered</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td className="p-3">{o.user?.email}</td>
              <td className="p-3">${o.totalPrice}</td>
              <td className="p-3">{o.isPaid ? "✅" : "❌"}</td>
              <td className="p-3">{o.isDelivered ? "✅" : "❌"}</td>
              <td className="p-3 flex gap-3">
                {!o.isPaid && (
                  <button
                    onClick={() => updateStatus(o._id, "isPaid")}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Mark Paid
                  </button>
                )}
                {!o.isDelivered && (
                  <button
                    onClick={() => updateStatus(o._id, "isDelivered")}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
