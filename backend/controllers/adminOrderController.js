// controllers/adminOrderController.js
import { Order } from "../models/order.js";

// Get all orders (for admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Update order payment and delivery status (for admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Optional: Update delivery or payment status
    if (req.body.isPaid !== undefined) {
      order.isPaid = req.body.isPaid;
      order.paidAt = req.body.isPaid ? new Date() : null;
    }

    if (req.body.isDelivered !== undefined) {
      order.isDelivered = req.body.isDelivered;
      order.deliveredAt = req.body.isDelivered ? new Date() : null;
    }

    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

// Delete an order (for admin)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};

export const getSalesData = async (req, res) => {
  try {
    const orders = await Order.find({});
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales, totalOrders: orders.length });
  } catch (err) {
    res.status(500).json({ message: "Error calculating sales" });
  }
};
