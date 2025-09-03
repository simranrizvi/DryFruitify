"use client"
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, setCart, fetchCart } = useCart(); // add setCart
  const router = useRouter();

  const initialForm = {
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };

  const [form, setForm] = useState(initialForm);

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(cart.length === 0) return alert("Cart is empty");

    const orderData = {
      orderItems: cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddress: form,
      paymentMethod: 'COD',
      totalPrice: total
    };

    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();

    if(res.ok){
      alert("Order Placed Successfully!");
      // Clear cart in backend
      await fetch('http://localhost:5000/api/cart/clear', { method: 'DELETE', credentials: 'include' });
      fetchCart(); // refresh cart from backend
      setCart([]); // Clear cart in frontend immediately
      setForm(initialForm); // Clear form
      router.push("/"); // redirect to home
    } else {
      alert(data.message || "Failed to place order");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* LEFT - Products summary */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-amber-700">Your Order</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Your cart is empty</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="text-right p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.product._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-2 flex items-center gap-2">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded"/>
                    <span className="font-medium">{item.product.name}</span>
                  </td>
                  <td className="text-center p-2">{item.quantity}</td>
                  <td className="text-right p-2 font-semibold">${(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td className="p-2 font-bold">Total</td>
                <td></td>
                <td className="text-right p-2 font-bold text-amber-700">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* RIGHT - Checkout form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-amber-700">Shipping Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>

          <button type="submit" className="w-full py-2 bg-amber-800 text-white rounded hover:bg-amber-900 transition">
            Place Order
          </button>
        </form>
      </div>

    </div>
  );
}
