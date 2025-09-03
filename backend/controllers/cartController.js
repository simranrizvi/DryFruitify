import Cart from '../models/cart.js';

// ✅ Add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // <-- updated

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

// ✅ Get user cart
// ✅ Get user cart (fixed)
export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // 🛠️ Remove items jinke product null hain
    cart.items = cart.items.filter(item => item.product !== null);

    await cart.save(); // optional, taake DB bhi clean ho jaye

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};


// ✅ Update cart item quantity
export const updateCartItem = async (req, res) => {
  const userId = req.user._id; // <-- updated
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((item) => item.product.toString() === productId);

    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};

// ✅ Remove item from cart
export const removeCartItem = async (req, res) => {
  const userId = req.user._id; // <-- updated
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item', error });
  }
};
export const clearCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });
    if(cart){
      cart.items = [];
      await cart.save();
    }
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error });
  }
};
