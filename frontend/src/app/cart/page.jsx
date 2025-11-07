"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchCart,
  updateItem,
  removeItem,
} from "@/src/features/cart/cartSlice";
import { checkAuth } from "@/src/features/auth/authSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoggedIn, authCheckCompleted } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(true);

  // ✅ Step 1: Auth check + fetch cart
  useEffect(() => {
    const loadData = async () => {
      const result = await dispatch(checkAuth());
      if (result.meta.requestStatus === "fulfilled") {
        await dispatch(fetchCart());
      }
      setLoading(false);
    };
    loadData();
  }, [dispatch]);

  // ✅ Step 2: Redirect ONLY after auth check done
  useEffect(() => {
    if (authCheckCompleted && !isLoggedIn) {
      router.push("/login");
    }
  }, [authCheckCompleted, isLoggedIn, router]);

  // ✅ Step 3: Show loading UI until auth check finishes
  if (loading || !authCheckCompleted) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading your cart...
      </div>
    );
  }

  // ✅ Step 4: If not logged in — don't render anything; redirect already triggered
  if (!isLoggedIn) return null;

  // ✅ Cart total
  const grandTotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="p-6 max-w-[80%] mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-amber-700 mt-20 text-center">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <div className="overflow-x-auto shadow-2xl pb-8">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="text-black bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Item</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <motion.tr
                  key={item.product?._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      {item.product?.image ? (
                        <img
                          src={
                            item.product.image.startsWith("http")
                              ? item.product.image
                              : `https://khalista.onrender.com${item.product.image}`
                          }
                          alt={item.product?.name || "Product"}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                          N/A
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">
                          {item.product?.name || "Unnamed"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.product?.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center">
                    ${item.product?.price?.toFixed(2) || "0.00"}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                        onClick={() =>
                          dispatch(
                            updateItem({
                              productId: item.product?._id,
                              quantity: (item.quantity || 1) - 1,
                            })
                          )
                        }
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity || 0}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                        onClick={() =>
                          dispatch(
                            updateItem({
                              productId: item.product?._id,
                              quantity: (item.quantity || 0) + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center">
                    $
                    {(item.product?.price || 0 * item.quantity || 0).toFixed(2)}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => dispatch(removeItem(item.product?._id))}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FiX size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col justify-end mt-6 items-end gap-6">
            <div className="text-xl font-bold">
              Grand Total: Rs {grandTotal.toFixed(2)}
            </div>
            <button
              onClick={handleCheckout}
              className="px-16 py-2 rounded border border-amber-700 text-black hover:bg-amber-300 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
