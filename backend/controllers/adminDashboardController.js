import { Order } from "../models/order.js";

export const getSalesSummary = async (req, res) => {
  try {
    // Get total revenue per month
    const sales = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // Month names for better UI
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const formatted = sales.map((s) => ({
      month: months[s._id - 1],
      revenue: s.revenue,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
