import React from "react";
import Link from "next/link";
import ProductCard from "../../components/ProductCard";

// 🟢 Fetch Single Product
async function getProduct(id) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.msg || "Failed to fetch product");
  }

  return res.json();
}

// 🟢 Fetch Related Products (same category)
async function getRelatedProducts(category, currentId) {
  const res = await fetch(
    `http://localhost:5000/api/products?category=${category}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch related products");
  }

  const products = await res.json();
  return products.filter((p) => p._id !== currentId);
}

export default async function ProductDetailPage({ params }) {
  const { id } = params;

  const product = await getProduct(id);
  const relatedProducts = await getRelatedProducts(
    product.category,
    product._id
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 🔥 Hero Section */}
      {/* 🔥 Hero Section */}
<div className="w-full bg-white text-center py-12 border-b border-gray-200">
  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
    {product.title}
  </h1>
  <p className="mt-4 text-2xl font-semibold text-green-600">
    ${product.price}
  </p>
</div>

      {/* 🔥 Product Details */}
      <div className="w-[90%] mx-auto py-12 flex flex-col md:flex-row gap-10">
        {/* LEFT - Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.title}
            className="w-full rounded-2xl shadow-md object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* RIGHT - Info */}
        <div className="md:w-1/2 w-full flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
          <p className="text-2xl font-semibold text-green-600 mb-6">
            ${product.price}
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105 w-fit">
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* 🔥 Related Products */}
      <div className="w-[75%] mx-auto py-12">
        <h3 className="text-3xl font-bold text-center mb-10">
          Related <span className="text-yellow-500">Products</span>
        </h3>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="transform transition duration-300 hover:scale-105"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
}
