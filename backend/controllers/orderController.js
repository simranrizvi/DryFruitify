import { Order } from '../models/order.js';
import Cart from '../models/cart.js';

export const placeOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map(item => ({
        product: item.product, // MongoDB ObjectId
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get orders', error });
  }
};
