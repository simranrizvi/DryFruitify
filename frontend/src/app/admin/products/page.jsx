"use client";
import { useEffect, useState } from "react";
import api from "@/src/app/lib/axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    countInStock: "",
    image: null,
  });

  // 🔹 Backend Base URL (for images)
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Submit (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    try {
      if (editProduct) {
        await api.put(`/products/${editProduct._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      setEditProduct(null);
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        countInStock: "",
        image: null,
      });
      fetchProducts();
    } catch (err) {
      console.error("Product save failed:", err);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  // ✅ Edit Modal
  const openEditModal = (product) => {
    setEditProduct(product);
    setForm({
      title: product.title,
      description: product.description || "",
      price: product.price,
      category: product.category || "",
      brand: product.brand || "",
      countInStock: product.countInStock,
      image: null,
    });
    setShowModal(true);
  };

  // ✅ Create Modal
  const openCreateModal = () => {
    setEditProduct(null);
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      countInStock: "",
      image: null,
    });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  {p.image ? (
                    <img
                      src={`${BASE_URL}${p.image}`}
                      alt={p.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.countInStock}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => openEditModal(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border rounded p-2"
                required
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border rounded p-2"
                rows={3}
              />

              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border rounded p-2"
              />

              <input
                type="text"
                placeholder="Brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full border rounded p-2"
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border rounded p-2"
                required
              />

              <input
                type="number"
                placeholder="Stock"
                value={form.countInStock}
                onChange={(e) =>
                  setForm({ ...form, countInStock: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="w-full border rounded p-2"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
